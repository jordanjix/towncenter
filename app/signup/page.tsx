import Link from "next/link";
import type { Metadata } from "next";

import { Gate } from "@/components/gate/Gate";
import { redirect } from "next/navigation";

import { signupState, getUser } from "@/lib/accounts";
import { getT } from "@/lib/i18n/server";

import { SignUp } from "./SignUpForm";

import styles from "@/components/gate/gate.module.css";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();
  return {
    title: t("signup.metaTitle"),
    robots: { index: false, follow: false },
  };
}

export const dynamic = "force-dynamic";

export default async function SignUpPage() {
  // same rule as /login: the database decides, not the token signature
  if (await getUser()) redirect("/");

  const state = await signupState();
  const t = await getT();

  // Closed, the page still exists and says why. A 404 would be quieter and
  // worse: whoever was given the address would hunt a broken link. This is
  // self-hosted software, and the reader is often the one who can act.
  if (!state.open) {
    return (
      <Gate
        title={t("signup.closed.title")}
        subtitle={t("signup.closed.subtitle")}
        toggle={
          <Link href="/login" className={styles.link}>
            {t("signup.closed.back")}
          </Link>
        }
      >
        <p className={styles.notice}>{state.reason}</p>
      </Gate>
    );
  }

  return (
    <Gate
      title={state.isFirstAccount ? t("signup.claim.title") : t("signup.create.title")}
      subtitle={
        state.isFirstAccount
          ? t("signup.claim.subtitle")
          : t("signup.create.subtitle")
      }
      toggle={
        state.isFirstAccount ? null : (
          <>
            {t("signup.haveAccount")}{" "}
            <Link href="/login" className={styles.link}>
              {t("signup.signIn")}
            </Link>
          </>
        )
      }
    >
      <SignUp isFirstAccount={state.isFirstAccount} />
    </Gate>
  );
}
