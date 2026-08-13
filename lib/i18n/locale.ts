// Keys are ASCII and never translated; only the labels in the dictionaries
// move. `lib/format.ts` stays pinned to fr-FR / Europe/Paris regardless of the
// interface language — the two are independent by design.

export const LOCALES = ["en", "fr"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

export const LOCALE_COOKIE = "locale";

export function isLocale(value: unknown): value is Locale {
  return LOCALES.includes(value as Locale);
}
