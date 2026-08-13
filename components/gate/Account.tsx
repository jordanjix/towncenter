"use client";

// sign-out posts a form rather than following a <Link>: over GET, a prefetch or
// an antivirus following page links would sign the user out without a click.

import { useFormStatus } from "react-dom";

import { setLocaleAction } from "@/app/localeActions";
import { signOutAction } from "@/app/login/actions";
import {
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui";
import type { Account } from "@/lib/accounts";
import { useLocale, useT } from "@/lib/i18n/client";
import type { Locale } from "@/lib/i18n/locale";

import styles from "./account.module.css";

const LOCALE_LABELS: Record<Locale, string> = {
  en: "English",
  fr: "Français",
};

export type AccountRailProps = {
  account: Account;
};

export function AccountRail({ account }: AccountRailProps) {
  const name = account.displayName?.trim() || account.email;
  const t = useT();

  return (
    <form action={signOutAction} className={styles.account}>
      <span className={styles.name} title={account.email}>
        {name}
      </span>
      <button type="submit" className={styles.signout}>
        {t("account.signout")}
      </button>
    </form>
  );
}

// role="none" on the form is required: role="menu" must own its menuitem
// children, and a <form> in between drops sign-out from the announced count.
// The menu must NOT close on this click: it would unmount the form before the
// browser submits it.
export function AccountMenu({ account }: AccountRailProps) {
  const name = account.displayName?.trim() || account.email;
  const locale = useLocale();
  const other: Locale = locale === "fr" ? "en" : "fr";

  return (
    <>
      <DropdownMenuSeparator />
      <DropdownMenuLabel title={account.email}>{name}</DropdownMenuLabel>
      <form action={setLocaleAction} role="none">
        <input type="hidden" name="locale" value={other} />
        <LocaleItem label={LOCALE_LABELS[other]} />
      </form>
      <form action={signOutAction} role="none">
        <SignOutItem />
      </form>
    </>
  );
}

function LocaleItem({ label }: { label: string }) {
  const { pending } = useFormStatus();

  return (
    <DropdownMenuItem asChild onSelect={(event) => event.preventDefault()}>
      <button
        type="button"
        disabled={pending}
        onClick={(event) => event.currentTarget.form?.requestSubmit()}
      >
        {label}
      </button>
    </DropdownMenuItem>
  );
}

// Its own component: `useFormStatus` only reads the form of an ANCESTOR.
function SignOutItem() {
  const { pending } = useFormStatus();
  const t = useT();

  return (
    <DropdownMenuItem asChild onSelect={(event) => event.preventDefault()}>
      <button
        type="button"
        disabled={pending}
        onClick={(event) => event.currentTarget.form?.requestSubmit()}
      >
        {pending ? t("account.signingout") : t("account.signout")}
      </button>
    </DropdownMenuItem>
  );
}
