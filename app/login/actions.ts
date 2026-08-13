"use server";

import type { Route } from "next";
import { redirect } from "next/navigation";
import { z } from "zod";

import {
  createSession,
  destroySession,
  loginAttemptAllowed,
  registerLoginFailure,
  registerLoginSuccess,
} from "@/lib/auth";
import {
  createAccount,
  signupState,
  normalizeEmail,
  verifyCredentials,
} from "@/lib/accounts";
import { actions as actionsDict } from "@/lib/i18n/dicts/actions";
import { getT } from "@/lib/i18n/server";
import type { MessageKey, Translate } from "@/lib/i18n/messages";
import { PASSWORD_MAX, checkPasswordShape } from "@/lib/password";

// a "use server" module may export only async functions, so the state types
// live next door in state.ts
import type { SignInState, SignupFormState } from "./state";

// zod schemas are module constants, so their custom messages are dictionary keys
function localize(t: Translate, message: string): string {
  return message in actionsDict.en ? t(message as MessageKey) : message;
}

const signInSchema = z.object({
  email: z.string().min(1, "actions.login.emailRequired").max(320),
  password: z.string().min(1, "actions.login.passwordRequired").max(PASSWORD_MAX),
  next: z.string().max(2048).optional(),
});

const signUpSchema = z.object({
  email: z
    .string()
    .min(1, "actions.login.emailRequired")
    .max(320)
    // rejects the empty string and the obvious shapes; it does not try to
    // validate an address for real, the only test that counts is that mail lands
    .refine((value) => z.string().email().safeParse(value.trim()).success, {
      message: "actions.signup.emailInvalid",
    }),
  password: z.string().min(1, "actions.signup.passwordRequired").max(PASSWORD_MAX),
  displayName: z.string().max(120).optional(),
});

/**
 * Backslash or control character: forbidden in a return path. Written as code
 * points rather than a character class, because a regex containing real control
 * bytes is invisible on review.
 */
function hasDangerousChar(value: string): boolean {
  for (const char of value) {
    const code = char.codePointAt(0) ?? 0;
    if (code === 0x5c || code < 0x20 || code === 0x7f) return true;
  }
  return false;
}

/**
 * Accepts only an internal path: blocks open redirects.
 *
 * "starts with / but not //" is not enough: the browser normalises backslashes
 * to slashes and strips control characters BEFORE resolving the URL, so
 * `"/\\evil.com"` resolves to `https://evil.com/`. Those characters are refused
 * outright.
 */
function internalPath(value: string | undefined): Route {
  if (!value) return "/";
  if (hasDangerousChar(value)) return "/";
  if (!value.startsWith("/") || value.startsWith("//")) return "/";
  return value as Route;
}

function field(form: FormData, name: string): string {
  const value = form.get(name);
  return typeof value === "string" ? value.trim() : "";
}

// The password is NOT trimmed: a trailing space is part of the secret, and
// trimming here would let sign-up and sign-in diverge the day one of them
// forgot to.
function rawPassword(form: FormData): string {
  const value = form.get("password");
  return typeof value === "string" ? value : "";
}

export async function signInAction(
  _previous: SignInState,
  formData: FormData,
): Promise<SignInState> {
  const t = await getT();
  const email = field(formData, "email");

  const parsed = signInSchema.safeParse({
    email,
    password: rawPassword(formData),
    next: field(formData, "next") || undefined,
  });

  if (!parsed.success) {
    const issue = parsed.error.issues[0]?.message;
    return {
      error: issue ? localize(t, issue) : t("actions.error.entryRefused"),
      email,
    };
  }

  // rate limited PER ADDRESS: a global counter would shut the gate on everyone
  // after ten deliberate failures on an invented address
  if (!loginAttemptAllowed(parsed.data.email)) {
    return { error: t("actions.login.tooManyAttempts"), email };
  }

  let account;
  try {
    account = await verifyCredentials(parsed.data.email, parsed.data.password);
  } catch (error) {
    // database unreachable, AUTH_SECRET missing: a configuration fault, not the
    // user's. Said without revealing what is missing, and logged, because
    // otherwise nobody will ever know why.
    console.error("[signin]", error);
    return { error: t("actions.login.notConfigured"), email };
  }

  if (!account) {
    registerLoginFailure(parsed.data.email);
    // The SAME refusal for an unknown address and a wrong password. Telling them
    // apart turns the form into an oracle for who uses this instance;
    // verifyCredentials also spends the same time in both cases, otherwise the
    // response latency would say what the message does not.
    return { error: t("actions.login.wrongCredentials"), email };
  }

  registerLoginSuccess(parsed.data.email);
  await createSession(account.id);
  redirect(internalPath(parsed.data.next));
}

export async function signUpAction(
  _previous: SignupFormState,
  formData: FormData,
): Promise<SignupFormState> {
  const t = await getT();
  const email = field(formData, "email");
  const displayName = field(formData, "displayName");
  const base = { email, displayName, error: null, fields: {} };

  const parsed = signUpSchema.safeParse({
    email,
    password: rawPassword(formData),
    displayName: displayName || undefined,
  });

  if (!parsed.success) {
    const fields: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "_");
      if (!(key in fields)) fields[key] = localize(t, issue.message);
    }
    return { ...base, fields };
  }

  // The gate is re-checked here, not only on the page: a Server Action is a
  // directly reachable HTTP endpoint whose id is readable in the client bundle,
  // so hiding the form when sign-ups are closed closes nothing.
  const state = await signupState();
  if (!state.open) {
    return { ...base, error: state.reason };
  }

  // the same rules as the live list on screen, and THESE are authoritative
  // (see components/gate/Requirements.tsx)
  const refusal = checkPasswordShape(
    parsed.data.password,
    normalizeEmail(parsed.data.email),
    t,
  );
  if (refusal) {
    return { ...base, fields: { password: refusal.message } };
  }

  let result;
  try {
    result = await createAccount({
      email: parsed.data.email,
      password: parsed.data.password,
      displayName: parsed.data.displayName ?? null,
    });
  } catch (error) {
    console.error("[signup]", error);
    return { ...base, error: t("actions.signup.failed") };
  }

  if (!result.ok) {
    if (result.field === "_") return { ...base, error: result.message };
    return { ...base, fields: { [result.field]: result.message } };
  }

  await createSession(result.account.id);
  redirect("/onboarding");
}

export async function signOutAction(): Promise<void> {
  await destroySession();
  redirect("/login");
}
