import Link from "next/link";
import type { Metadata } from "next";

import { Gate } from "@/components/gate/Gate";
import { getT } from "@/lib/i18n/server";

import { ResetPassword } from "./ResetPasswordForm";

import styles from "@/components/gate/gate.module.css";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();
  return {
    title: t("reset.page.metaTitle"),
    // a gate has no business in a search engine index
    robots: { index: false, follow: false },
  };
}

export const dynamic = "force-dynamic";

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;
  const t = await getT();

  // No token, no form: posting without one can only fail, so say it up front.
  if (!token) {
    return (
      <Gate
        title={t("reset.page.incomplete.title")}
        subtitle={t("reset.page.incomplete.subtitle")}
        toggle={
          <>
            {t("reset.page.incomplete.ask")}{" "}
            <Link href="/forgot-password" className={styles.link}>
              {t("reset.page.incomplete.link")}
            </Link>
          </>
        }
      >
        <p className={styles.notice}>{t("reset.page.incomplete.notice")}</p>
      </Gate>
    );
  }

  return (
    <Gate
      title={t("reset.page.title")}
      subtitle={t("reset.page.subtitle")}
      toggle={
        <>
          {t("reset.page.changedMind")}{" "}
          <Link href="/login" className={styles.link}>
            {t("reset.page.backToSignin")}
          </Link>
        </>
      }
    >
      <ResetPassword token={token} />
    </Gate>
  );
}
