import Link from "next/link";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

import { Gate } from "@/components/gate/Gate";
import { getUser } from "@/lib/accounts";
import { getT } from "@/lib/i18n/server";

import { ForgotPassword } from "./ForgotPasswordForm";

import styles from "@/components/gate/gate.module.css";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();
  return {
    title: t("reset.forgot.metaTitle"),
    // a gate has no business in a search engine index
    robots: { index: false, follow: false },
  };
}

export const dynamic = "force-dynamic";

export default async function ForgotPasswordPage() {
  if (await getUser()) redirect("/");

  const t = await getT();

  return (
    <Gate
      title={t("reset.forgot.title")}
      subtitle={t("reset.forgot.subtitle")}
      toggle={
        <>
          {t("reset.forgot.remembered")}{" "}
          <Link href="/login" className={styles.link}>
            {t("reset.forgot.signin")}
          </Link>
        </>
      }
    >
      <ForgotPassword />
    </Gate>
  );
}
