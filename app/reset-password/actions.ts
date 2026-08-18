"use server";

import { redirect } from "next/navigation";

import { getT } from "@/lib/i18n/server";
import { PASSWORD_MAX } from "@/lib/password";
import { resetPassword } from "@/lib/passwordReset";

import type { ResetPasswordState } from "./state";

export async function resetPasswordAction(
  _previous: ResetPasswordState,
  formData: FormData,
): Promise<ResetPasswordState> {
  const tokenRaw = formData.get("token");
  const token = typeof tokenRaw === "string" ? tokenRaw : "";

  // The password is NOT trimmed: a trailing space is part of the secret, the
  // same rule as sign-in and sign-up.
  const passwordRaw = formData.get("password");
  const password = typeof passwordRaw === "string" ? passwordRaw : "";

  const t = await getT();
  if (password === "") return { error: t("reset.action.choose") };
  if (password.length > PASSWORD_MAX) {
    return { error: t("reset.action.tooLong", { max: PASSWORD_MAX }) };
  }

  const outcome = await resetPassword(token, password);
  if (!outcome.ok) return { error: outcome.message };

  // No auto-login: issuing a session here would race the invalidation instant
  // the reset just wrote. One more sign-in is cheaper than that hole.
  redirect("/login?reset=1");
}
