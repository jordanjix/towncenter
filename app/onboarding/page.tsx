import Link from "next/link";
import type { Metadata } from "next";
import type { Route } from "next";

import { requireUser } from "@/lib/accounts";
import { PRO_PLAN, TRIAL_DAYS } from "@/lib/billing/plans";
import { MAX_ZONE_AREA_KM2 } from "@/lib/limits";
import { getT } from "@/lib/i18n/server";
import type { Translate } from "@/lib/i18n/messages";
import { getOnboardingFacts, type OnboardingFacts } from "@/app/queries";
import { Button, Badge, Card, CardHeader, CardTitle } from "@/components/ui";
import { WorldMap } from "@/components/gate/WorldMap";
import townCentre from "@/components/gate/towncenter.png";
import Image from "next/image";

import { PlacesKeyForm } from "./PlacesKeyForm";
import {
  finishOnboardingAction,
  removePlacesKeyAction,
} from "./actions";

import styles from "./onboarding.module.css";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();
  return {
    title: t("onboarding.metaTitle"),
    robots: { index: false, follow: false },
  };
}

export const dynamic = "force-dynamic";

const SELF_HOSTED_STEPS = ["key", "grid", "sector"] as const;
const SAAS_STEPS = ["grid", "upgrade", "sector"] as const;

function firstIncomplete(facts: OnboardingFacts): string {
  if (!facts.isSaaS && facts.placesKeySource === null) return "key";
  if (!facts.hasCustomGrid) return "grid";
  if (facts.sectorCount === 0) return "sector";
  return "sector";
}

function first(value: string | string[] | undefined): string | null {
  if (Array.isArray(value)) return value[0] ?? null;
  return value ?? null;
}

export default async function OnboardingPage(props: PageProps<"/onboarding">) {
  const owner = await requireUser();
  const facts = await getOnboardingFacts(owner);
  const t = await getT();
  const steps = facts.isSaaS ? SAAS_STEPS : SELF_HOSTED_STEPS;

  const params = await props.searchParams;
  const requested = first(params.step);
  const step =
    requested && (steps as readonly string[]).includes(requested)
      ? requested
      : firstIncomplete(facts);

  return (
    <main className={styles.frame}>
      <div className={styles.gate}>
        <div className={styles.column}>
          <Link href="/" className={styles.brand} aria-label="Towncenter">
            <Image
              className={styles.brandMark}
              src={townCentre}
              alt=""
              priority
              placeholder="blur"
            />
            Towncenter
          </Link>

          <div className={styles.center}>
            <h1 className={styles.title}>{t("onboarding.title")}</h1>
            <p className={styles.subtitle}>
              {facts.isSaaS
                ? t("onboarding.subtitleSaaS")
                : t("onboarding.subtitle")}
            </p>

            <StepRail facts={facts} current={step} />

            <div key={step} className={styles.stepContent}>
              {step === "key" ? (
                <KeyStep facts={facts} />
              ) : step === "grid" ? (
                <GridStep facts={facts} />
              ) : step === "upgrade" ? (
                <UpgradeStep />
              ) : (
                <SectorStep facts={facts} />
              )}
            </div>
          </div>

          <div className={styles.footerRule}>
            <span>{t("gate.tagline")}</span>
          </div>
        </div>

        <div className={styles.plan} aria-hidden="true">
          <div className={styles.planFrame}>
            <WorldMap />
          </div>
        </div>
      </div>
    </main>
  );
}

type StepMeta = {
  key: string;
  label: string;
  done: boolean;
};

function stepsFor(facts: OnboardingFacts, t: Translate): StepMeta[] {
  const items: StepMeta[] = [];
  if (!facts.isSaaS) {
    items.push({ key: "key", label: t("onboarding.step.key"), done: facts.placesKeySource !== null });
  }
  items.push({ key: "grid", label: t("onboarding.step.grid"), done: facts.hasCustomGrid });
  if (facts.isSaaS) {
    items.push({ key: "upgrade", label: t("onboarding.step.upgrade"), done: false });
  }
  items.push({ key: "sector", label: t("onboarding.step.sector"), done: facts.sectorCount > 0 });
  return items;
}

async function StepRail({ facts, current }: { facts: OnboardingFacts; current: string }) {
  const t = await getT();
  const steps = stepsFor(facts, t);
  return (
    <ol className={styles.rail}>
      {steps.map((s, i) => {
        const isCurrent = s.key === current;
        return (
          <li
            key={s.key}
            className={styles.railItem}
            data-done={s.done ? "" : undefined}
            data-current={isCurrent ? "" : undefined}
          >
            <Link
              href={`/onboarding?step=${s.key}` as Route}
              className={styles.railLink}
              aria-current={isCurrent ? "step" : undefined}
            >
              <span className={styles.railNumber}>
                {s.done ? <Check /> : i + 1}
              </span>
              <span className={styles.railLabel}>{s.label}</span>
            </Link>
          </li>
        );
      })}
    </ol>
  );
}

function Check() {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 8.5 6.5 12 13 4" />
    </svg>
  );
}

async function KeyStep({ facts }: { facts: OnboardingFacts }) {
  const t = await getT();

  if (facts.placesKeySource === "env") {
    return (
      <>
        <Badge asChild><h2>Google Places</h2></Badge>
        <p className="t-body">
          {t("onboarding.key.env")} (<code>GOOGLE_PLACES_API_KEY</code>).{" "}
          {t("onboarding.key.envNothing")}
        </p>
        <Link href="/onboarding?step=grid" className={styles.stepLink}>
          {t("onboarding.continue")}
        </Link>
      </>
    );
  }

  if (facts.placesKeySource === "account") {
    return (
      <>
        <Badge asChild><h2>Google Places</h2></Badge>
        <p className="t-body">
          {t("onboarding.key.configured")} <code>{facts.placesKeyMask}</code>.
        </p>
        <form action={removePlacesKeyAction} className={styles.removeForm}>
          <Button type="submit" variant="quiet" size="compact">
            {t("onboarding.key.remove")}
          </Button>
        </form>
        <Link href="/onboarding?step=grid" className={styles.stepLink}>
          {t("onboarding.continue")}
        </Link>
      </>
    );
  }

  return (
    <>
      <Badge asChild><h2>Google Places</h2></Badge>
      <p className="t-body">{t("onboarding.key.intro")}</p>
      <Card>
        <CardHeader>
          <CardTitle>{t("onboarding.key.cardTitle")}</CardTitle>
        </CardHeader>
        <PlacesKeyForm />
        <p className="t-body-s tone-3">{t("onboarding.key.note")}</p>
      </Card>
      <Link href="/onboarding?step=grid" className={styles.stepLink}>
        {t("onboarding.key.skip")}
      </Link>
    </>
  );
}

async function GridStep({ facts }: { facts: OnboardingFacts }) {
  const t = await getT();
  return (
    <>
      <Badge asChild><h2>{t("onboarding.grid.badge")}</h2></Badge>
      <p className="t-body">{t("onboarding.grid.intro")}</p>
      {facts.hasCustomGrid ? (
        <p className="t-body-s tone-2">{t("onboarding.grid.custom")}</p>
      ) : (
        <p className="t-body-s tone-2">{t("onboarding.grid.default")}</p>
      )}
      <div className={styles.stepActions}>
        <Link href="/pricing" className={styles.stepLink}>
          {t("onboarding.grid.open")}
        </Link>
        <Link href="/onboarding?step=sector" className={styles.stepLink}>
          {facts.hasCustomGrid
            ? t("onboarding.continue")
            : t("onboarding.grid.keep")}
        </Link>
      </div>
    </>
  );
}

async function UpgradeStep() {
  const t = await getT();
  const price = PRO_PLAN.priceCents / 100;
  return (
    <>
      <Badge asChild><h2>{t("onboarding.upgrade.badge")}</h2></Badge>
      <p className="t-body">
        {t("onboarding.upgrade.intro", { days: TRIAL_DAYS, price })}
      </p>
      <Card className={styles.upgradeCard}>
        <div className={styles.upgradePlan}>
          <span className={styles.upgradePlanName}>{PRO_PLAN.name}</span>
          <span className={styles.upgradePrice}>&euro;{price}<span className={styles.upgradePeriod}>{t("billing.perMonth")}</span></span>
        </div>
        <ul className={styles.upgradeLimits}>
          <li>{t("billing.limits.harvested", { n: PRO_PLAN.limits.harvestedTargets.toLocaleString("fr-FR") })}</li>
          <li>{t("billing.limits.enrichments", { n: PRO_PLAN.limits.enrichments })}</li>
          <li>{t("billing.limits.audits", { n: PRO_PLAN.limits.siteAudits })}</li>
          <li>{t("billing.limits.totalSurface", { n: PRO_PLAN.limits.cumulativeAreaKm2 })}</li>
          <li>{t("billing.limits.perZone", { n: MAX_ZONE_AREA_KM2 })}</li>
        </ul>
      </Card>
      <p className="t-body-s tone-2">{t("onboarding.upgrade.note")}</p>
      <div className={styles.stepActions}>
        <a className={styles.upgradeCta} href="/billing">
          {t("onboarding.upgrade.start")}
        </a>
        <Link href="/onboarding?step=sector" className={styles.stepLink}>
          {t("onboarding.upgrade.later")}
        </Link>
      </div>
    </>
  );
}

async function SectorStep({ facts }: { facts: OnboardingFacts }) {
  const t = await getT();
  return (
    <>
      <Badge asChild><h2>{t("onboarding.sector.badge")}</h2></Badge>
      <p className="t-body">{t("onboarding.sector.intro")}</p>
      {facts.sectorCount > 0 ? (
        <p className="t-body-s tone-2">
          {facts.sectorCount === 1
            ? t("onboarding.sector.surveyedOne")
            : t("onboarding.sector.surveyedMany", { n: facts.sectorCount })}
        </p>
      ) : null}
      <form action={finishOnboardingAction}>
        <Button type="submit" variant="primary" fullWidth>
          {facts.sectorCount > 0
            ? t("onboarding.sector.back")
            : t("onboarding.sector.enter")}
        </Button>
      </form>
    </>
  );
}
