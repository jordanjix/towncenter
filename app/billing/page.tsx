import Link from "next/link";
import type { Metadata } from "next";
import type { Route } from "next";

import { requireUser } from "@/lib/accounts";
import { PRO_PLAN, TRIAL_DAYS } from "@/lib/billing/plans";
import { MAX_ZONE_AREA_KM2 } from "@/lib/limits";
import { LOCALE, TIME_ZONE } from "@/lib/format";
import { getT } from "@/lib/i18n/server";
import type { MessageKey, Translate } from "@/lib/i18n/messages";
import { getBillingFacts, type BillingFacts } from "@/app/queries";
import { Badge, Button, Card } from "@/components/ui";

import { cancelSubscriptionAction, subscribeAction } from "./actions";

import styles from "./billing.module.css";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();
  return {
    title: t("billing.metaTitle"),
    robots: { index: false, follow: false },
  };
}

export const dynamic = "force-dynamic";

function formatDay(iso: string): string {
  return new Intl.DateTimeFormat(LOCALE, {
    timeZone: TIME_ZONE,
    dateStyle: "long",
  }).format(new Date(iso));
}

function first(value: string | string[] | undefined): string | null {
  if (Array.isArray(value)) return value[0] ?? null;
  return value ?? null;
}

const NOTICES: Record<string, { tone: "error" | "ok"; key: MessageKey }> = {
  "error:checkout": { tone: "error", key: "billing.notice.checkout" },
  "error:cancel": { tone: "error", key: "billing.notice.cancel" },
  "error:terms": { tone: "error", key: "billing.notice.terms" },
  "canceled:1": { tone: "ok", key: "billing.notice.canceled" },
};

export default async function BillingPage(props: PageProps<"/billing">) {
  const owner = await requireUser();
  const facts = await getBillingFacts(owner);
  const t = await getT();

  const params = await props.searchParams;
  const error = first(params.error);
  const canceled = first(params.canceled);
  const notice = error
    ? NOTICES[`error:${error}`]
    : canceled
      ? NOTICES[`canceled:${canceled}`]
      : undefined;

  return (
    <main className={styles.page}>
      <header className={styles.head}>
        <Badge asChild>
          <h2>{t("billing.title")}</h2>
        </Badge>
        <Link className={`t-body-s ${styles.back}`} href={"/" as Route}>
          {t("billing.back")}
        </Link>
      </header>

      {notice ? (
        <p className={styles.notice} data-tone={notice.tone}>
          {t(notice.key)}
        </p>
      ) : null}

      {facts.enabled ? <SaasBilling facts={facts} /> : <SelfHosted />}
    </main>
  );
}

async function SelfHosted() {
  const t = await getT();
  return (
    <Card className={styles.card}>
      <h3 className={styles.cardTitle}>{t("billing.selfHosted.title")}</h3>
      <p className="t-body">
        {t("billing.selfHosted.before")} <code>MOLLIE_API_KEY</code>
        {t("billing.selfHosted.after")}
      </p>
    </Card>
  );
}

function statusLine(facts: BillingFacts, t: Translate): string {
  const until = facts.periodEndIso ? formatDay(facts.periodEndIso) : null;
  const trialEnd = facts.trialEndsAtIso ? formatDay(facts.trialEndsAtIso) : null;
  const price = PRO_PLAN.priceCents / 100;

  if (facts.state === "none") {
    return facts.status === "pending"
      ? t("billing.status.pendingCheckout")
      : t("billing.status.noCard");
  }

  if (facts.state === "trial") {
    if (facts.status === "canceled") {
      return trialEnd
        ? t("billing.status.trialCanceledUntil", { date: trialEnd })
        : t("billing.status.trialCanceled");
    }
    return trialEnd
      ? t("billing.status.trialRunningUntil", { price, date: trialEnd })
      : t("billing.status.trialRunning");
  }

  if (facts.state === "expired") {
    return t("billing.status.expired");
  }

  switch (facts.status) {
    case "active":
      return until
        ? t("billing.status.activeUntil", { date: until })
        : t("billing.status.active");
    case "canceled":
      return until
        ? t("billing.status.canceledUntil", { date: until })
        : t("billing.status.canceled");
    case "suspended":
      return t("billing.status.suspended");
    case "completed":
      return t("billing.status.completed");
    default:
      return t("billing.status.active");
  }
}

async function SaasBilling({ facts }: { facts: BillingFacts }) {
  const t = await getT();
  const canSubscribe = facts.state === "none" || facts.state === "expired";
  const canCancel =
    facts.status === "active" &&
    (facts.state === "trial" || facts.state === "active");
  // one trial per account: once consumed, the same checkout charges right away
  const trialAvailable = facts.trialEndsAtIso === null;

  return (
    <>
      {facts.testMode ? (
        <p className={styles.testMode}>{t("billing.testMode")}</p>
      ) : null}

      <Card className={styles.card}>
        <div className={styles.plan}>
          <span className={styles.planName}>{PRO_PLAN.name}</span>
          <span className={styles.price}>
            &euro;{PRO_PLAN.priceCents / 100}
            <span className={styles.period}>{t("billing.perMonth")}</span>
          </span>
        </div>
        <p className="t-body-s tone-2">
          {t("billing.trialLine", { days: TRIAL_DAYS })}
        </p>
        <ul className={styles.limits}>
          <li>{t("billing.limits.harvested", { n: PRO_PLAN.limits.harvestedTargets.toLocaleString(LOCALE) })}</li>
          <li>{t("billing.limits.enrichments", { n: PRO_PLAN.limits.enrichments })}</li>
          <li>{t("billing.limits.audits", { n: PRO_PLAN.limits.siteAudits })}</li>
          <li>{t("billing.limits.totalSurface", { n: PRO_PLAN.limits.cumulativeAreaKm2 })}</li>
          <li>{t("billing.limits.perZone", { n: MAX_ZONE_AREA_KM2 })}</li>
        </ul>
      </Card>

      <Card className={styles.card}>
        <h3 className={styles.cardTitle}>{t("billing.subscription.title")}</h3>
        <p className="t-body">{statusLine(facts, t)}</p>
        <p className="t-body-s tone-2">
          {t("billing.usage", {
            usedKm2: facts.usedKm2.toFixed(1),
            maxKm2: facts.maxKm2,
            scope: facts.current
              ? t("billing.usage.thisPeriod")
              : t("billing.usage.soFar"),
            harvestUsed: facts.usage.harvest.used.toLocaleString(LOCALE),
            harvestLimit: facts.usage.harvest.limit.toLocaleString(LOCALE),
            enrichUsed: facts.usage.enrich.used,
            enrichLimit: facts.usage.enrich.limit,
            auditUsed: facts.usage.audit.used,
            auditLimit: facts.usage.audit.limit,
          })}
        </p>

        <div className={styles.actions}>
          {canSubscribe ? (
            <form action={subscribeAction}>
              <label className={styles.acceptance}>
                <input name="terms" type="checkbox" value="accepted" required />
                <span>
                  {t("billing.terms.before")}{" "}
                  <a href="https://town-center.co/terms" target="_blank">
                    {t("billing.terms.link")}
                  </a>
                  {t("billing.terms.after")}
                </span>
              </label>
              <Button type="submit" variant="primary">
                {trialAvailable
                  ? t("billing.cta.startTrial", { days: TRIAL_DAYS })
                  : t("billing.cta.subscribe", {
                      price: PRO_PLAN.priceCents / 100,
                    })}
              </Button>
            </form>
          ) : null}
          {canCancel ? (
            <form action={cancelSubscriptionAction}>
              <Button type="submit" variant="quiet">
                {facts.state === "trial"
                  ? t("billing.cta.cancelTrial")
                  : t("billing.cta.cancelSubscription")}
              </Button>
            </form>
          ) : null}
        </div>

        <p className="t-body-s tone-3">
          {trialAvailable && canSubscribe
            ? t("billing.note.cardFirst") + " "
            : ""}
          {t("billing.note.mollie")}
        </p>
      </Card>
    </>
  );
}
