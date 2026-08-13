"use client";

import { createContext, useContext, useMemo } from "react";

import { DEFAULT_LOCALE, type Locale } from "./locale";
import { translator, type Translate } from "./messages";

// The locale is read once from the cookie by the root layout and handed down
// here, so server and client render the same strings and hydration holds.
const LocaleContext = createContext<Locale>(DEFAULT_LOCALE);

export function I18nProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  return (
    <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>
  );
}

export function useLocale(): Locale {
  return useContext(LocaleContext);
}

export function useT(): Translate {
  const locale = useLocale();
  return useMemo(() => translator(locale), [locale]);
}
