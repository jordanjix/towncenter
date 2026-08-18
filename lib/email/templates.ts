// Transactional email bodies. Pure functions over their inputs, safe to import
// from any server module; every user-controlled value goes through escapeHtml
// before landing in the HTML part. Inline-styled HTML by hand: a template
// engine would be a dependency for seven emails.

import { PRO_PLAN } from "@/lib/billing/plans";
import { translator, type Translate } from "@/lib/i18n/messages";

import type { EmailContent } from "./resend";

const PRICE_LABEL = `€${PRO_PLAN.priceCents / 100}/month`;

// callers that predate i18n (billing, scripts/) still get English
const englishT = translator("en");

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

/** "24 August 2026" — dates in emails are moments the user must act before. */
function formatDate(date: Date, t: Translate): string {
  return new Intl.DateTimeFormat(t("email.dateLocale"), {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

function greeting(name: string | null, t: Translate): string {
  return name ? t("email.greeting.named", { name }) : t("email.greeting.anon");
}

function layout(title: string, bodyHtml: string): string {
  return `<!doctype html>
<html>
  <body style="margin:0;padding:24px;background:#f5f5f4;font-family:ui-sans-serif,system-ui,-apple-system,sans-serif;color:#1c1917;">
    <div style="max-width:520px;margin:0 auto;background:#ffffff;border:1px solid #e7e5e4;border-radius:8px;padding:32px;">
      <p style="margin:0 0 24px;font-size:13px;font-weight:600;letter-spacing:0.04em;text-transform:uppercase;color:#78716c;">Towncenter</p>
      <h1 style="margin:0 0 16px;font-size:20px;line-height:1.3;">${title}</h1>
      ${bodyHtml}
    </div>
  </body>
</html>`;
}

function paragraph(html: string): string {
  return `<p style="margin:0 0 16px;font-size:15px;line-height:1.6;">${html}</p>`;
}

function button(href: string, label: string): string {
  return `<p style="margin:24px 0;"><a href="${escapeHtml(href)}" style="display:inline-block;padding:10px 20px;background:#1c1917;color:#ffffff;border-radius:6px;font-size:15px;text-decoration:none;">${label}</a></p>`;
}

export function passwordResetEmail(
  input: {
    name: string | null;
    resetUrl: string;
    expiresMinutes: number;
  },
  t: Translate = englishT,
): EmailContent {
  const subject = t("email.reset.subject");
  const asked = t("email.reset.asked");
  const expires = t("email.reset.expires", { minutes: input.expiresMinutes });
  const ignore = t("email.reset.ignore");
  return {
    subject,
    html: layout(
      subject,
      paragraph(escapeHtml(greeting(input.name, t))) +
        paragraph(`${asked} ${expires}`) +
        button(input.resetUrl, t("email.reset.button")) +
        paragraph(ignore),
    ),
    text: [
      greeting(input.name, t),
      "",
      asked,
      expires,
      "",
      input.resetUrl,
      "",
      ignore,
    ].join("\n"),
  };
}

export function welcomeEmail(
  input: {
    name: string | null;
    /** Days of trial, or null outside the hosted SaaS. */
    trialDays: number | null;
  },
  t: Translate = englishT,
): EmailContent {
  const subject = t("email.welcome.subject");
  const ready = t("email.welcome.ready");
  const trialLine = input.trialDays
    ? t("email.welcome.trial", { days: input.trialDays })
    : t("email.welcome.draw");
  return {
    subject,
    html: layout(
      subject,
      paragraph(escapeHtml(greeting(input.name, t))) +
        paragraph(ready) +
        paragraph(escapeHtml(trialLine)),
    ),
    text: [greeting(input.name, t), "", ready, "", trialLine].join("\n"),
  };
}

export function trialStartedEmail(
  input: {
    name: string | null;
    firstChargeAt: Date;
    billingUrl: string;
  },
  t: Translate = englishT,
): EmailContent {
  const subject = t("email.trialStarted.subject");
  const when = formatDate(input.firstChargeAt, t);
  const started = t("email.trialStarted.started", {
    plan: escapeHtml(PRO_PLAN.name),
  });
  return {
    subject,
    html: layout(
      subject,
      paragraph(escapeHtml(greeting(input.name, t))) +
        paragraph(started) +
        paragraph(
          t("email.trialStarted.firstPayment", {
            price: PRICE_LABEL,
            date: `<strong>${when}</strong>`,
          }),
        ) +
        button(input.billingUrl, t("email.managePlan")),
    ),
    text: [
      greeting(input.name, t),
      "",
      t("email.trialStarted.started", { plan: PRO_PLAN.name }),
      "",
      t("email.trialStarted.firstPayment", { price: PRICE_LABEL, date: when }),
      "",
      input.billingUrl,
    ].join("\n"),
  };
}

export function trialReminderEmail(
  input: {
    name: string | null;
    firstChargeAt: Date;
    billingUrl: string;
  },
  t: Translate = englishT,
): EmailContent {
  const subject = t("email.trialReminder.subject");
  const when = formatDate(input.firstChargeAt, t);
  return {
    subject,
    html: layout(
      subject,
      paragraph(escapeHtml(greeting(input.name, t))) +
        paragraph(
          t("email.trialReminder.ends", {
            date: `<strong>${when}</strong>`,
            price: PRICE_LABEL,
            plan: escapeHtml(PRO_PLAN.name),
          }),
        ) +
        paragraph(t("email.trialReminder.keepGoing")) +
        button(input.billingUrl, t("email.managePlan")),
    ),
    text: [
      greeting(input.name, t),
      "",
      t("email.trialReminder.ends", {
        date: when,
        price: PRICE_LABEL,
        plan: PRO_PLAN.name,
      }),
      "",
      t("email.trialReminder.keepGoingText"),
      input.billingUrl,
    ].join("\n"),
  };
}

export function subscriptionActivatedEmail(
  input: {
    name: string | null;
    periodEnd: Date | null;
  },
  t: Translate = englishT,
): EmailContent {
  const subject = t("email.subActivated.subject", { plan: PRO_PLAN.name });
  const renewal = input.periodEnd
    ? ` ${t("email.subActivated.renews", { date: formatDate(input.periodEnd, t) })}`
    : "";
  const body = t("email.subActivated.body", {
    plan: PRO_PLAN.name,
    price: PRICE_LABEL,
    renewal,
  });
  return {
    subject,
    html: layout(
      subject,
      paragraph(escapeHtml(greeting(input.name, t))) + paragraph(escapeHtml(body)),
    ),
    text: [greeting(input.name, t), "", body].join("\n"),
  };
}

export function subscriptionSuspendedEmail(
  input: {
    name: string | null;
    billingUrl: string;
  },
  t: Translate = englishT,
): EmailContent {
  const subject = t("email.subSuspended.subject");
  const failed = t("email.subSuspended.failed");
  return {
    subject,
    html: layout(
      subject,
      paragraph(escapeHtml(greeting(input.name, t))) +
        paragraph(failed) +
        paragraph(t("email.subSuspended.resub")) +
        button(input.billingUrl, t("email.subSuspended.button")),
    ),
    text: [
      greeting(input.name, t),
      "",
      failed,
      "",
      t("email.subSuspended.resubText"),
      input.billingUrl,
    ].join("\n"),
  };
}

export function subscriptionCanceledEmail(
  input: {
    name: string | null;
    accessUntil: Date | null;
  },
  t: Translate = englishT,
): EmailContent {
  const subject = t("email.subCanceled.subject");
  const until = input.accessUntil
    ? t("email.subCanceled.untilDate", {
        date: formatDate(input.accessUntil, t),
      })
    : t("email.subCanceled.untilNone");
  const body = t("email.subCanceled.body", { until });
  const after = t("email.subCanceled.after");
  return {
    subject,
    html: layout(
      subject,
      paragraph(escapeHtml(greeting(input.name, t))) +
        paragraph(escapeHtml(body)) +
        paragraph(after),
    ),
    text: [greeting(input.name, t), "", body, "", after].join("\n"),
  };
}
