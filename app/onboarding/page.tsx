import Link from "next/link";
import type { Metadata } from "next";
import type { Route } from "next";

import { requireUser } from "@/lib/accounts";
import { getOnboardingFacts, type OnboardingFacts } from "@/app/queries";
import { Button, Badge, Card, CardHeader, CardTitle } from "@/components/ui";
import { WorldMap } from "@/components/gate/WorldMap";
import townCentre from "@/components/gate/towncenter.png";
import Image from "next/image";
import { getT } from "@/lib/i18n/server";
import type { Translate } from "@/lib/i18n/messages";

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

const STEPS = ["key", "grid", "sector"] as const;
type StepKey = (typeof STEPS)[number];

function firstIncomplete(facts: OnboardingFacts): StepKey {
  if (facts.placesKeySource === null) return "key";
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

  const params = await props.searchParams;
  const requested = first(params.step);
  const step: StepKey =
    requested && (STEPS as readonly string[]).includes(requested)
      ? (requested as StepKey)
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
            <p className={styles.subtitle}>{t("onboarding.subtitle")}</p>

            <StepRail facts={facts} current={step} />

            <div key={step} className={styles.stepContent}>
              {step === "key" ? (
                <KeyStep facts={facts} />
              ) : step === "grid" ? (
                <GridStep facts={facts} />
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
  key: StepKey;
  label: string;
  done: boolean;
};

function stepsFor(facts: OnboardingFacts, t: Translate): StepMeta[] {
  return [
    { key: "key", label: t("onboarding.step.key"), done: facts.placesKeySource !== null },
    { key: "grid", label: t("onboarding.step.grid"), done: facts.hasCustomGrid },
    { key: "sector", label: t("onboarding.step.sector"), done: facts.sectorCount > 0 },
  ];
}

async function StepRail({ facts, current }: { facts: OnboardingFacts; current: StepKey }) {
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
          {facts.hasCustomGrid ? t("onboarding.continue") : t("onboarding.grid.keep")}
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
