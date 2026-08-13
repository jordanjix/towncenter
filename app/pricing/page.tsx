import type { Metadata, Route } from "next";
import Link from "next/link";

import { Badge } from "@/components/ui";
import { requireUser } from "@/lib/accounts";
import type { MessageKey } from "@/lib/i18n/messages";
import { getT } from "@/lib/i18n/server";
import type { ScoringFacts } from "@/lib/types";

import { getPriceGrid } from "../queries";
import { PriceGridForm } from "./PriceGridForm";
import { ResetGrid } from "./ResetGrid";

import "./pricing.css";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();
  return { title: t("pricing.metaTitle") };
}

// Invented businesses, and they must stay invented: this screen has to give the
// SAME result for everyone, otherwise two people comparing grids would in fact
// be comparing two businesses. One per step, each chosen so it triggers the
// offer that step sets — a witness the step cannot move is a dead number.
const COMMON = {
  companyCreatedAt: null,
  revenueCents: null,
  financesYear: null,
  employeeRange: null,
  companyCategory: null,
  priceLevel: null,
  hasPhone: true,
  hasContactForm: false,
  directorCount: 1,
  proximity: "in-zone" as const,
  isOpen: true,
  isDiffusible: true,
  isFranchiseGroupSite: false,
};

const WITNESSES: Record<string, { whoKey: MessageKey; facts: ScoringFacts }> = {
  baseCents: {
    whoKey: "pricing.witness.base",
    facts: {
      ...COMMON,
      openEstablishmentCount: 1,
      ratingTenths: 44,
      reviewCount: 12,
      site: { issue: "no_known_site", usablePhotos: false },
    },
  },
  fullSiteCents: {
    whoKey: "pricing.witness.fullSite",
    facts: {
      ...COMMON,
      openEstablishmentCount: 1,
      ratingTenths: 49,
      reviewCount: 235,
      site: { issue: "no_known_site" },
    },
  },
  multiPageCents: {
    whoKey: "pricing.witness.multiPage",
    facts: {
      ...COMMON,
      openEstablishmentCount: 1,
      ratingTenths: 47,
      reviewCount: 180,
      site: { issue: "site_unreachable", sitemapUrlCount: 9 },
    },
  },
  multiAddressCents: {
    whoKey: "pricing.witness.multiAddress",
    facts: {
      ...COMMON,
      openEstablishmentCount: 3,
      ratingTenths: 46,
      reviewCount: 410,
      site: { issue: "no_known_site" },
    },
  },
  recurringBaseCents: {
    whoKey: "pricing.witness.recurringBase",
    facts: {
      ...COMMON,
      openEstablishmentCount: 1,
      ratingTenths: 49,
      reviewCount: 235,
      site: { issue: "no_known_site" },
    },
  },
};

export default async function PricingPage() {
  const owner = await requireUser();
  const grid = await getPriceGrid(owner);
  const t = await getT();

  const witnesses = Object.fromEntries(
    Object.entries(WITNESSES).map(([key, { whoKey, facts }]) => [
      key,
      { who: t(whoKey), facts },
    ]),
  );

  return (
    <main className="pricing">
      <header className="pricing__head">
        <Badge asChild><h2>{t("pricing.title")}</h2></Badge>
        <div className="pricing__head-act">
          <ResetGrid />
          <Link className="t-body-s pricing__back" href={"/" as Route}>
            {t("pricing.backToMap")}
          </Link>
        </div>
      </header>

      <PriceGridForm grid={grid} witnesses={witnesses} />
    </main>
  );
}
