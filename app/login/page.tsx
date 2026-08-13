import { Suspense } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

import { Gate } from "@/components/gate/Gate";
import { signupState, getUser } from "@/lib/accounts";
import { getT } from "@/lib/i18n/server";

import { SignIn } from "./SignInForm";

import styles from "@/components/gate/gate.module.css";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT();
  return {
    title: t("gate.signin.metaTitle"),
    // a gate has no business in a search engine index
    robots: { index: false, follow: false },
  };
}

// the gate reads the database to know whether the instance is waiting for its
// owner, so it cannot be prerendered at build time
export const dynamic = "force-dynamic";

export default async function SignInPage() {
  // "already signed in" is decided HERE, not in the proxy. getUser() re-reads
  // the account from the database, so an orphaned token does not count as a
  // session; the proxy only sees the signature, and relying on it produced an
  // infinite redirect loop in production.
  if (await getUser()) redirect("/");

  const signup = await signupState();

  // A blank instance has nobody to sign in: showing a sign-in form would be a
  // gate with no lock and no key. Send straight to sign-up, which says this is
  // the FIRST account.
  if (signup.isFirstAccount) redirect("/signup");

  const t = await getT();

  return (
    <Gate
      title={t("gate.signin.title")}
      subtitle={t("gate.signin.subtitle")}
      toggle={
        signup.open ? (
          <>
            {t("gate.signin.noAccount")}{" "}
            <Link href="/signup" className={styles.link}>
              {t("gate.signin.createOne")}
            </Link>
          </>
        ) : null
      }
    >
      {/* useSearchParams forces client rendering: without this boundary the
          page's prerender FAILS the build. The fallback is empty on purpose. */}
      <Suspense fallback={null}>
        <SignIn />
      </Suspense>
    </Gate>
  );
}
