"use server";

import { after } from "next/server";
import { z } from "zod";

import { actions as actionsDict } from "@/lib/i18n/dicts/actions";
import { getT } from "@/lib/i18n/server";
import type { MessageKey, Translate } from "@/lib/i18n/messages";
import { requestPasswordReset } from "@/lib/passwordReset";

import type { ForgotPasswordState } from "./state";

// zod schemas are module constants, so their custom messages are dictionary keys
function localize(t: Translate, message: string): string {
  return message in actionsDict.en ? t(message as MessageKey) : message;
}

const schema = z.object({
  email: z.string().min(1, "actions.login.emailRequired").max(320),
});

export async function forgotPasswordAction(
  _previous: ForgotPasswordState,
  formData: FormData,
): Promise<ForgotPasswordState> {
  const t = await getT();
  const raw = formData.get("email");
  const email = typeof raw === "string" ? raw.trim() : "";

  const parsed = schema.safeParse({ email });
  if (!parsed.success) {
    const issue = parsed.error.issues[0]?.message;
    return {
      error: issue ? localize(t, issue) : t("actions.error.entryRefused"),
      done: false,
      email,
    };
  }

  // ALL the work — lookup, token, email — runs after the response: the reply
  // takes the same time for a known and an unknown address, and the screen
  // says the same thing in both cases. Same oracle-closing intent as the
  // decoy hash in verifyCredentials.
  after(() =>
    requestPasswordReset(parsed.data.email).catch((error) =>
      console.error("[reset] request failed:", error),
    ),
  );

  return { error: null, done: true, email: parsed.data.email };
}
