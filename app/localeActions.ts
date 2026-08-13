"use server";

// No requireUser(): the gate itself carries the toggle, and the cookie holds
// no data — an unauthenticated caller can only change their own display
// language.

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

import { LOCALE_COOKIE, isLocale } from "@/lib/i18n/locale";

export async function setLocaleAction(formData: FormData): Promise<void> {
  const locale = formData.get("locale");
  if (!isLocale(locale)) return;

  (await cookies()).set(LOCALE_COOKIE, locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
  revalidatePath("/", "layout");
}
