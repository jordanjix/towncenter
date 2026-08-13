// The target sheet exported as Markdown, to paste into an agent.
//
// Pure module: no database, no network, no implicit `Date`.
//
// What leaves here leaves the product, so the data rules still apply: no
// personal contact for a director (name and role only); no expired Google
// facts (`TargetRow` already nulls them past 30 days, and this module never
// reconstitutes them); and the resistance always ships with its calibration
// state, so a reader does not take an uncalibrated figure for a measurement.

import type { TargetDetail } from "@/app/queries";
import { SOURCE_ORDER, SOURCES, sourceName } from "@/components/ui";
import { formatEuros, formatRatingTenths } from "@/lib/format";
import type { Translate } from "@/lib/i18n/messages";
import { PRICE_OFFER_LABELS } from "@/lib/scoring";
import { CALIBRATION_MIN_OUTCOMES } from "@/lib/types";

import { chosenSite, chosenPhone } from "./fields";
import { fiveFacts } from "./facts";
import {
  stateLabel,
  eventLabel,
  proximityLabel,
  distance,
  dateFromDay,
  longDate,
  formatNumber,
} from "./text";

/**
 * A Markdown table cell, escaped.
 *
 * A `|` in a business name ("BAR | TABAC" exists) would split the cell and
 * shift the row; a newline from a log note would end the table.
 */
function cell(value: string): string {
  return value.replace(/\|/g, "\\|").replace(/\r?\n/g, " ");
}

/** A missing value is written out, never silently dropped. */
function orElse(value: string | null | undefined, fallbackValue: string): string {
  if (value === null || value === undefined) return fallbackValue;
  const cleaned = value.trim();
  return cleaned === "" ? fallbackValue : cleaned;
}

/**
 * The address on one line, without repeating what it already contains.
 *
 * SIRENE's `address` already carries the postcode and town
 * ("12 RUE DES EXEMPLES 75009 PARIS"), so concatenating the three columns
 * would yield "... 75009 PARIS 75009 PARIS".
 */
function addressOf(
  target: {
    address: string | null;
    postalCode: string | null;
    city: string | null;
  },
  unknown: string,
): string {
  const base = (target.address ?? "").trim();
  const parts: string[] = base === "" ? [] : [base];
  const upper = base.toUpperCase();

  for (const part of [target.postalCode, target.city]) {
    const cleaned = (part ?? "").trim();
    if (cleaned === "" || upper.includes(cleaned.toUpperCase())) continue;
    parts.push(cleaned);
  }

  return parts.length === 0 ? unknown : parts.join(" ");
}

/** `"NN"` is the INSEE code for "headcount not filed", not a band. */
function readableBand(raw: string | null): string | null {
  const cleaned = (raw ?? "").trim();
  if (cleaned === "" || cleaned === "NN") return null;
  return cleaned;
}

/**
 * The full brief for a business, in Markdown.
 *
 * The order follows the sheet, therefore the work: what it is, what it is
 * worth, what to act on, where the figure comes from, what has been said.
 */
export function sheetAsMarkdown(
  t: Translate,
  detail: TargetDetail,
  outcomeCount: number,
  now: Date = new Date(),
): string {
  const { target, log, neighbours } = detail;
  const price = target.score.price;
  const success = target.score.success;
  const offGrid = price.kind === "off-grid";
  const calibrated = outcomeCount >= CALIBRATION_MIN_OUTCOMES;
  const facts = fiveFacts(t, target, now);
  const unknown = t("prompt.unknown");

  const rows: string[] = [];

  rows.push(`# ${target.name}`);
  rows.push("");
  rows.push(t("prompt.intro"));
  rows.push("");

  rows.push(`## ${t("prompt.heading.identity")}`);
  rows.push("");
  rows.push(`- **${t("prompt.identity.business")}**: ${target.name}`);
  if (target.legalName && target.legalName !== target.name) {
    rows.push(`- **${t("prompt.identity.legalName")}**: ${target.legalName}`);
  }
  rows.push(`- **${t("prompt.identity.address")}**: ${addressOf(target, unknown)}`);
  rows.push(`- **${t("prompt.identity.sirenSiret")}**: ${target.siren} / ${target.siret}`);
  rows.push(
    `- **${t("prompt.identity.activity")}**: ${orElse(target.naf, t("prompt.identity.nafUnknown"))} — ${orElse(target.nafLabel, unknown)}`,
  );
  if (target.companyCreatedAt) {
    rows.push(
      `- **${t("prompt.identity.founded")}**: ${orElse(dateFromDay(target.companyCreatedAt), target.companyCreatedAt)}`,
    );
  }
  if (target.establishmentCount !== null) {
    rows.push(
      `- **${t("prompt.identity.establishments")}**: ${target.establishmentCount}`,
    );
  }
  const band = readableBand(target.employeeRange);
  if (band) {
    rows.push(`- **${t("prompt.identity.band")}**: ${band}`);
  }
  if (target.revenueCents !== null && target.financesYear !== null) {
    rows.push(
      `- **${t("prompt.identity.revenueYear", { year: target.financesYear })}**: ${formatEuros(target.revenueCents, { decimals: "never" })}`,
    );
  }
  // The CHOSEN address and number, not Google's: a hand-typed value wins, and
  // the brief must carry what the sheet shows.
  const site = chosenSite(target);
  const tel = chosenPhone(target);
  if (site) {
    rows.push(
      `- **${t("prompt.identity.website")}**: ${site.url}${site.source === "log" ? ` (${t("prompt.identity.byHand")})` : ""}`,
    );
  }
  if (tel) {
    rows.push(
      `- **${t("prompt.identity.phone")}**: ${tel.number}${tel.source === "log" ? ` (${t("prompt.identity.byHand")})` : ""}`,
    );
  }
  if (target.ratingTenths !== null) {
    rows.push(
      `- **Google**: ${t("prompt.identity.google.rating", {
        rating: formatRatingTenths(target.ratingTenths),
        reviews: orElse(
          target.reviewCount === null
            ? null
            : t("prompt.identity.google.reviews", { n: target.reviewCount }),
          t("prompt.identity.google.reviewsUnknown"),
        ),
      })}`,
    );
  } else if (target.googleStale) {
    rows.push(`- **Google**: ${t("prompt.identity.google.purged")}`);
  }

  // Directors: name and ROLE, never a contact. The product stores nothing else.
  if (target.directors.length > 0) {
    const names = target.directors
      .map((person) =>
        `${[person.firstNames, person.lastName].filter(Boolean).join(" ")} (${person.title})`.trim(),
      )
      .join(", ");
    rows.push(`- **${t("prompt.identity.directors")}**: ${names}`);
  }
  rows.push(
    `- **${t("prompt.identity.neighbourhood")}**: ${proximityLabel(t)[target.proximity] ?? target.proximity}`,
  );
  rows.push("");

  rows.push(`## ${t("prompt.heading.worth")}`);
  rows.push("");

  if (offGrid) {
    rows.push(
      `- **${t("prompt.spoils")}**: ${t("prompt.spoils.offgrid", { reason: price.reason })}`,
    );
  } else {
    rows.push(
      `- **${t("prompt.spoils.over12Months")}**: ${formatEuros(price.value12MonthsCents, { decimals: "never" })}`,
    );
    rows.push(
      `- **${t("prompt.offer")}**: ` +
        t("prompt.offer.signature", {
          offer: PRICE_OFFER_LABELS[price.offer],
          price: formatEuros(price.priceCents, { decimals: "never" }),
        }) +
        (price.recurringCents > 0
          ? t("prompt.offer.recurring", {
              amount: formatEuros(price.recurringCents, { decimals: "never" }),
            })
          : ""),
    );
    for (const adjustment of price.adjustments) {
      rows.push(
        `  - ${adjustment.label}: ${adjustment.amountCents >= 0 ? "+" : "−"} ${formatEuros(Math.abs(adjustment.amountCents), { decimals: "never" })}`,
      );
    }
  }

  rows.push(
    `- **${t("prompt.resistance")}**: ${target.resistancePercent} %` +
      (calibrated
        ? ""
        : t("prompt.resistance.uncalibrated", {
            count: outcomeCount,
            min: CALIBRATION_MIN_OUTCOMES,
          })),
  );
  rows.push(`- **${t("prompt.state")}**: ${stateLabel(t)[target.state]}`);
  rows.push("");

  rows.push(`## ${t("prompt.heading.facts")}`);
  rows.push("");
  rows.push(t("prompt.facts.header"));
  rows.push("| --- | --- | --- | --- |");
  for (const fact of facts) {
    const value =
      fact.verbatim.length > 0
        ? fact.verbatim.join(" · ")
        : t("prompt.facts.notRecorded");
    // Full source names, not the ASCII keys: "sirene" leads nowhere for a
    // reader who wants to go back and check.
    const provenance = fact.sources.map((key) => sourceName(t, key)).join(" · ");
    rows.push(
      `| ${cell(fact.name)} | ${cell(value)}${fact.stale ? ` (${t("prompt.facts.expired")})` : ""} | ${cell(orElse(provenance, "—"))} | ${cell(orElse(fact.surveyedOn, "—"))} |`,
    );
  }
  rows.push("");
  rows.push(t("prompt.facts.noZero"));
  rows.push("");

  // Only the sources actually cited by the five facts: listing all five on a
  // business that was never enriched would suggest Google answered something.
  const provenances = SOURCE_ORDER.filter((key) =>
    facts.some((fact) => fact.sources.includes(key)),
  );

  if (provenances.length > 0) {
    rows.push(`## ${t("prompt.heading.sources")}`);
    rows.push("");
    for (const key of provenances) {
      const source = SOURCES[key];
      rows.push(
        `- **${sourceName(t, key)}**${source.href ? ` (${source.href})` : ""} — ${t(`source.${key}.what`)}`,
      );
    }
    rows.push("");
    rows.push(t("prompt.sources.computed"));
    rows.push("");
  }

  rows.push(`## ${t("prompt.heading.resistance")}`);
  rows.push("");
  rows.push(t("prompt.resistance.header"));
  rows.push("| --- | --- |");
  success.factors.forEach((factor, index) => {
    rows.push(
      `| ${cell(factor.label)} | ${index === 0 ? formatNumber(factor.value, 3) : `× ${formatNumber(factor.value, 2)}`} |`,
    );
  });
  rows.push(
    t("prompt.resistance.raw", { value: formatNumber(success.rawProbability, 4) }),
  );
  rows.push(t("prompt.resistance.clamped", { percent: success.percent }));
  rows.push(
    t("prompt.resistance.final", {
      percent: success.percent,
      resistance: target.resistancePercent,
    }),
  );
  rows.push("");
  rows.push(t("prompt.resistance.clampNote"));
  rows.push("");

  rows.push(`## ${t("prompt.heading.neighbours")}`);
  rows.push("");
  if (neighbours.length === 0) {
    rows.push(t("prompt.neighbours.none"));
  } else {
    rows.push(t("prompt.neighbours.lever"));
    rows.push("");
    for (const neighbour of neighbours) {
      rows.push(
        `- ${neighbour.name} — ${distance(neighbour.distanceMeters)} · ${formatEuros(neighbour.expectancyCents, { decimals: "never" })} · ${stateLabel(t)[neighbour.state]}`,
      );
    }
  }
  rows.push("");

  rows.push(`## ${t("prompt.heading.log")}`);
  rows.push("");
  if (log.length === 0) {
    rows.push(t("prompt.log.empty"));
  } else {
    for (const entry of log) {
      const amount =
        entry.valueCents !== null
          ? ` · ${formatEuros(entry.valueCents, { decimals: "never" })}`
          : "";
      const note = entry.note ? ` — ${entry.note.replace(/\r?\n/g, " ")}` : "";
      rows.push(
        `- **${orElse(longDate(entry.occurredAt), t("prompt.log.dateUnknown"))}** · ${eventLabel(t)[entry.kind]}${amount}${note}`,
      );
    }
  }
  rows.push("");

  rows.push(`## ${t("prompt.heading.request")}`);
  rows.push("");
  rows.push(offGrid ? t("prompt.request.offgrid") : t("prompt.request.standard"));
  rows.push("");
  rows.push(t("prompt.request.noInvention"));

  return rows.join("\n");
}
