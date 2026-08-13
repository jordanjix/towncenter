// Every field of a target sheet, including the empty ones. An empty field
// carries the action that would fill it, or a written reason why nothing can.
// Pure module: no network, no database, no DOM.

import type { TargetRow } from "@/app/queries";
import type { SourceKey } from "@/components/ui";
import { formatEuros, formatRatingTenths } from "@/lib/format";
import type { Translate } from "@/lib/i18n/messages";

import {
  stateLabel,
  proximityLabel,
  shortDate,
  dateFromDay,
  formatNumber,
} from "./text";

/** The action that would fill a field. `kind` values are ASCII keys. */
export type FieldAction =
  | { kind: "api"; prompt: string }
  /** `field` is the key passed to `noteTargetFieldAction`, not a label. */
  | { kind: "input"; field: "website" | "phone"; prompt: string }
  | { kind: "resurvey"; prompt: string }
  /** Nothing can fill it, and the reason is spelled out. */
  | { kind: "none"; reason: string };

export type TargetField = {
  /** ASCII key: React `key` and `data-field`. Never translated. */
  key: string;
  /** Visible label. */
  name: string;
  /** Already formatted. `null` means empty, and then `action` carries the sheet. */
  value: string | null;
  sources: readonly SourceKey[];
  /** Always present when `value` is null. */
  action: FieldAction | null;
  /** Shown above the "See all fields" fold. */
  primary: boolean;
};

export type FieldGroup = {
  /** ASCII key. */
  key: "registry" | "google" | "audit" | "log";
  /** Visible label. */
  name: string;
  fields: TargetField[];
};

function nothingToSay(reason: string): FieldAction {
  return { kind: "none", reason };
}

function field(
  key: string,
  name: string,
  value: string | null,
  sources: readonly SourceKey[],
  action: FieldAction,
  primary = false,
): TargetField {
  return { key, name, value, sources, action: value === null ? action : null, primary };
}

function text(value: string | null | undefined): string | null {
  if (typeof value !== "string") return null;
  const cleaned = value.trim();
  return cleaned === "" ? null : cleaned;
}

/**
 * The website address actually used, and who supplied it.
 *
 * A hand-typed value wins over Google: if you typed one, Google was silent or
 * wrong. `enrichOne()` applies the same rule and the two must agree, otherwise
 * the sheet shows an address the audit will never read.
 */
export function chosenSite(
  target: TargetRow,
): { url: string; source: SourceKey } | null {
  const manual = text(target.manualWebsiteUrl);
  if (manual) return { url: manual, source: "log" };
  const google = text(target.websiteUrl);
  if (google) return { url: google, source: "google" };
  return null;
}

/** Same rule for the phone number. */
export function chosenPhone(
  target: TargetRow,
): { number: string; source: SourceKey } | null {
  const manual = text(target.manualPhone);
  if (manual) return { number: manual, source: "log" };
  const google = text(target.phone);
  if (google) return { number: google, source: "google" };
  return null;
}

function registryGroup(t: Translate, target: TargetRow): FieldGroup {
  const years = dateFromDay(target.companyCreatedAt);
  const resurvey: FieldAction = {
    kind: "resurvey",
    prompt: t("field.prompt.survey"),
  };

  return {
    key: "registry",
    name: t("field.group.registry"),
    fields: [
      field(
        "siret",
        t("field.siret"),
        target.siret,
        ["sirene"],
        nothingToSay(t("field.reason.alwaysPresent")),
      ),
      field(
        "siren",
        t("field.siren"),
        target.siren,
        ["sirene"],
        nothingToSay(t("field.reason.alwaysPresent")),
      ),
      field(
        "legalName",
        t("field.legalName"),
        text(target.legalName),
        ["sirene"],
        resurvey,
      ),
      field(
        "naf",
        t("field.naf"),
        [text(target.naf), text(target.nafLabel)].filter(Boolean).join(" · ") || null,
        ["sirene"],
        resurvey,
      ),
      field(
        "address",
        t("field.address"),
        [target.address, target.postalCode, target.city].filter(Boolean).join(" · ") || null,
        ["sirene"],
        resurvey,
      ),
      field("founded", t("field.founded"), years, ["sirene"], resurvey),
      field(
        "establishments",
        t("field.establishments"),
        target.establishmentCount === null ? null : formatNumber(target.establishmentCount, 0),
        ["sirene"],
        resurvey,
      ),
      field(
        "headcount",
        t("field.headcount"),
        // `NN` is the INSEE code for "not filed", not a band.
        text(target.employeeRange) === "NN" ? null : text(target.employeeRange),
        ["sirene"],
        nothingToSay(t("field.reason.noBand")),
      ),
      field(
        "category",
        t("field.category"),
        text(target.companyCategory),
        ["sirene"],
        nothingToSay(t("field.reason.notClassified")),
      ),
      field(
        "revenue",
        t("field.revenue"),
        target.revenueCents === null
          ? null
          : `${formatEuros(target.revenueCents, { decimals: "never" })}${target.financesYear ? ` (${target.financesYear})` : ""}`,
        ["sirene"],
        // SIRENE returns `ca: 0` for "accounts not filed". That is an answer,
        // not a gap, so there is no button to offer.
        nothingToSay(t("field.reason.noAccounts.answer")),
        true,
      ),
      field(
        "netIncome",
        t("field.netIncome"),
        target.netIncomeCents === null
          ? null
          : formatEuros(target.netIncomeCents, { decimals: "never" }),
        ["sirene"],
        nothingToSay(t("field.reason.noAccounts")),
      ),
      field(
        "directors",
        t("field.directors"),
        target.directors.length === 0
          ? null
          : target.directors
              .map((person) =>
                `${[person.firstNames, person.lastName].filter(Boolean).join(" ")} — ${person.title.toLowerCase()}`.trim(),
              )
              .join(" · "),
        ["sirene"],
        resurvey,
      ),
    ],
  };
}

function googleGroup(t: Translate, target: TargetRow): FieldGroup {
  const site = chosenSite(target);
  const tel = chosenPhone(target);

  // Google facts are purged past 30 days under Google's terms, so an empty
  // field after a purge is not the same thing as one never queried.
  const prompt = target.googleStale
    ? t("field.prompt.purged")
    : t("field.prompt.google");

  return {
    key: "google",
    name: t("field.group.google"),
    fields: [
      {
        key: "website",
        name: t("field.website"),
        value: site?.url ?? null,
        // The source badge follows WHO SUPPLIED the value, not the column.
        sources: site ? [site.source] : ["google", "log"],
        action: site
          ? null
          : { kind: "input", field: "website", prompt: t("field.prompt.setWebsite") },
        primary: true,
      },
      {
        key: "phone",
        name: t("field.phone"),
        value: tel?.number ?? null,
        sources: tel ? [tel.source] : ["google", "log"],
        action: tel
          ? null
          : { kind: "input", field: "phone", prompt: t("field.prompt.setPhone") },
        primary: true,
      },
      field(
        "rating",
        t("field.rating"),
        target.ratingTenths === null ? null : `${formatRatingTenths(target.ratingTenths)} / 5`,
        ["google"],
        { kind: "api", prompt },
      ),
      field(
        "reviews",
        t("field.reviews"),
        target.reviewCount === null ? null : formatNumber(target.reviewCount, 0),
        ["google"],
        { kind: "api", prompt },
      ),
      field(
        "priceLevel",
        t("field.priceLevel"),
        target.priceLevel === null ? null : "€".repeat(Math.max(1, target.priceLevel)),
        ["google"],
        { kind: "api", prompt },
      ),
      field(
        "hours",
        t("field.hours"),
        target.openingHours?.weekdayDescriptions?.length
          ? t("field.hours.published", {
              n: target.openingHours.weekdayDescriptions.length,
            })
          : null,
        ["google"],
        { kind: "api", prompt },
      ),
      field(
        "status",
        t("field.status"),
        text(target.businessStatus),
        ["google"],
        { kind: "api", prompt },
      ),
      field(
        "lastQueried",
        t("field.lastQueried"),
        shortDate(target.googleFetchedAt),
        ["google"],
        { kind: "api", prompt: t("field.prompt.google") },
      ),
    ],
  };
}

/**
 * The in-house site audit.
 *
 * While the audit has never run, the group is a single row: twelve empty
 * markers would read as a ruined record when nothing was ever asked. Without a
 * website address the audit has nothing to read, so the offered action is
 * manual entry rather than enrichment.
 */
function auditGroup(t: Translate, target: TargetRow): FieldGroup {
  const site = chosenSite(target);
  const audit = target.siteAudit;

  if (!audit) {
    return {
      key: "audit",
      name: t("field.group.audit"),
      fields: [
        {
          key: "audit",
          name: t("field.audit"),
          value: null,
          sources: ["audit"],
          action: site
            ? { kind: "api", prompt: t("field.prompt.google") }
            : {
                kind: "input",
                field: "website",
                prompt: t("field.prompt.noAddress"),
              },
          primary: false,
        },
      ],
    };
  }

  /** One audit marker. `undefined` means the audit could not conclude. */
  const mark = (
    key: string,
    name: string,
    value: boolean | undefined,
    yes: string,
    no: string,
  ): TargetField => ({
    key,
    name,
    value: value === undefined ? null : value ? yes : no,
    sources: ["audit"],
    // `false` is an observation, a missing key is ignorance. Only the second
    // carries an action, and there is no good one: the page was read.
    action:
      value === undefined
        ? nothingToSay(t("field.reason.markerNotFound"))
        : null,
    primary: false,
  });

  const yes = t("field.yes");
  const no = t("field.no");

  return {
    key: "audit",
    name: t("field.group.audit"),
    fields: [
      field("url", t("field.audit.url"), text(audit.url), ["audit"], {
        kind: "input",
        field: "website",
        prompt: t("field.prompt.setWebsite"),
      }),
      field("auditedOn", t("field.audit.on"), shortDate(target.auditedAt), ["audit"], {
        kind: "api",
        prompt: t("field.prompt.google"),
      }),
      field(
        "tech",
        t("field.audit.tech"),
        text(audit.tech),
        ["audit"],
        nothingToSay(t("field.reason.noTechMarker")),
      ),
      mark("https", t("field.audit.https"), audit.https, yes, no),
      mark("viewport", t("field.audit.viewport"), audit.viewport, yes, no),
      mark(
        "title",
        t("field.audit.title"),
        audit.titleFilled,
        t("field.audit.title.filled"),
        t("field.audit.title.empty"),
      ),
      mark(
        "structuredData",
        t("field.audit.structured"),
        audit.structuredData,
        t("field.audit.structured.present"),
        t("field.audit.structured.absent"),
      ),
      mark(
        "theme",
        t("field.audit.theme"),
        audit.defaultTheme,
        t("field.audit.theme.default"),
        t("field.audit.theme.custom"),
      ),
      mark("photos", t("field.audit.photos"), audit.usablePhotos, yes, no),
      mark("agency", t("field.audit.agency"), audit.agencyDetected, yes, no),
      mark("onlineSales", t("field.audit.onlineSales"), audit.onlineSales, yes, no),
      mark(
        "onlineBooking",
        t("field.audit.onlineBooking"),
        audit.onlineBooking,
        yes,
        no,
      ),
      field(
        "sitemap",
        t("field.audit.sitemap"),
        audit.sitemapUrlCount === undefined
          ? null
          : audit.sitemapUrlCount >= 1
            ? t("field.audit.sitemap.urls", {
                n: formatNumber(audit.sitemapUrlCount, 0),
              })
            : t("field.audit.sitemap.none"),
        ["audit"],
        nothingToSay(t("field.reason.sitemapUnreachable")),
      ),
      field(
        "lastChange",
        t("field.audit.lastChange"),
        text(audit.lastModified)?.slice(0, 10) ?? null,
        ["audit"],
        nothingToSay(t("field.reason.noDate")),
      ),
    ],
  };
}

function logGroup(t: Translate, target: TargetRow, entries: number): FieldGroup {
  return {
    key: "log",
    name: t("field.group.log"),
    fields: [
      // `target.state` is a stored key (`spotted`, `engaged`): show the label.
      field(
        "state",
        t("field.state"),
        stateLabel(t)[target.state] ?? target.state,
        ["log"],
        nothingToSay(t("field.reason.alwaysSet")),
      ),
      field("takenOn", t("field.takenOn"), shortDate(target.capturedAt), ["log"], {
        kind: "none",
        reason: t("field.reason.notTaken"),
      }),
      field(
        "logEntries",
        t("field.logEntries"),
        entries === 0 ? null : formatNumber(entries, 0),
        ["log"],
        { kind: "none", reason: t("field.reason.noLog") },
      ),
      field(
        "handEntry",
        t("field.handEntry"),
        shortDate(target.manualNotedAt),
        ["log"],
        { kind: "none", reason: t("field.reason.noHandEntry") },
      ),
      field(
        "neighbourhood",
        t("field.neighbourhood"),
        proximityLabel(t)[target.proximity] ?? target.proximity,
        ["computed"],
        nothingToSay(t("field.reason.computed")),
      ),
    ],
  };
}

/** Every field, grouped by provider. */
export function fieldInventory(
  t: Translate,
  target: TargetRow,
  logEntries: number,
): FieldGroup[] {
  return [
    registryGroup(t, target),
    googleGroup(t, target),
    auditGroup(t, target),
    logGroup(t, target, logEntries),
  ];
}

export function countFields(groups: readonly FieldGroup[]): {
  filled: number;
  total: number;
  empty: number;
} {
  let filled = 0;
  let total = 0;

  for (const group of groups) {
    for (const item of group.fields) {
      total += 1;
      if (item.value !== null) filled += 1;
    }
  }

  return { filled, total, empty: total - filled };
}

/** The fields shown above the fold. */
export function primaryFields(
  groups: readonly FieldGroup[],
): TargetField[] {
  return groups.flatMap((group) => group.fields.filter((item) => item.primary));
}
