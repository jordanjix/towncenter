import "server-only";

import { cookies, headers } from "next/headers";

import { DEFAULT_LOCALE, LOCALE_COOKIE, isLocale, type Locale } from "./locale";
import { translator, type Translate } from "./messages";

export async function getLocale(): Promise<Locale> {
  // the benches call actions outside a request, where cookies() throws
  try {
    const raw = (await cookies()).get(LOCALE_COOKIE)?.value;
    if (isLocale(raw)) return raw;

    // no cookie yet: follow the browser's language list, in its order
    const accept = (await headers()).get("accept-language") ?? "";
    for (const part of accept.split(",")) {
      const tag = part.split(";")[0]!.trim().slice(0, 2).toLowerCase();
      if (isLocale(tag)) return tag;
    }
    return DEFAULT_LOCALE;
  } catch {
    return DEFAULT_LOCALE;
  }
}

export async function getT(): Promise<Translate> {
  return translator(await getLocale());
}
