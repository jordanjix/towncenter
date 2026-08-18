// The merged dictionaries. Each domain lives in `dicts/` and exports
// `{ en, fr }` with `fr` typed against `en`, so key parity is checked file by
// file and this module only assembles.

import type { Locale } from "./locale";
import { actions } from "./dicts/actions";
import { billing } from "./dicts/billing";
import { gate } from "./dicts/gate";
import { inventory } from "./dicts/inventory";
import { libs } from "./dicts/libs";
import { map } from "./dicts/map";
import { pricing } from "./dicts/pricing";
import { reset } from "./dicts/reset";
import { sheet } from "./dicts/sheet";
import { signup } from "./dicts/signup";
import { ui } from "./dicts/ui";

const en = {
  ...actions.en,
  ...billing.en,
  ...gate.en,
  ...inventory.en,
  ...libs.en,
  ...map.en,
  ...pricing.en,
  ...reset.en,
  ...sheet.en,
  ...signup.en,
  ...ui.en,
};

const fr: Record<MessageKey, string> = {
  ...actions.fr,
  ...billing.fr,
  ...gate.fr,
  ...inventory.fr,
  ...libs.fr,
  ...map.fr,
  ...pricing.fr,
  ...reset.fr,
  ...sheet.fr,
  ...signup.fr,
  ...ui.fr,
};

export type MessageKey = keyof typeof en;

const MESSAGES: Record<Locale, Record<MessageKey, string>> = { en, fr };

export type Translate = (
  key: MessageKey,
  params?: Record<string, string | number>,
) => string;

export function translate(
  locale: Locale,
  key: MessageKey,
  params?: Record<string, string | number>,
): string {
  let text: string = MESSAGES[locale][key] ?? MESSAGES.en[key];
  if (params) {
    for (const [name, value] of Object.entries(params)) {
      text = text.replaceAll(`{${name}}`, String(value));
    }
  }
  return text;
}

export function translator(locale: Locale): Translate {
  return (key, params) => translate(locale, key, params);
}
