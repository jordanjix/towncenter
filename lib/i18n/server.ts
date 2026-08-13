import "server-only";

import { cookies } from "next/headers";

import { DEFAULT_LOCALE, LOCALE_COOKIE, isLocale, type Locale } from "./locale";
import { translator, type Translate } from "./messages";

export async function getLocale(): Promise<Locale> {
  // the benches call actions outside a request, where cookies() throws
  try {
    const raw = (await cookies()).get(LOCALE_COOKIE)?.value;
    return isLocale(raw) ? raw : DEFAULT_LOCALE;
  } catch {
    return DEFAULT_LOCALE;
  }
}

export async function getT(): Promise<Translate> {
  return translator(await getLocale());
}
