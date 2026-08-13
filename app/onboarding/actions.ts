"use server";

// The setup screen's writes. requireUser() runs on the first line of every
// action: a Server Action is a directly reachable HTTP endpoint.

import { redirect } from "next/navigation";
import { z } from "zod";

import { requireUser } from "@/lib/accounts";
import { getT } from "@/lib/i18n/server";
import type { Translate } from "@/lib/i18n/messages";
import { db, users } from "@/lib/db";
import { eq } from "drizzle-orm";
import {
  checkPlacesKey,
} from "@/lib/sources/places";
import {
  removePlacesKey,
  savePlacesKey,
} from "@/lib/settings";

import type { PlacesKeyState } from "./state";

function keySchema(t: Translate) {
  return z.object({
    key: z
      .string()
      .min(20, t("onboarding.key.tooShort"))
      .max(2048)
      .refine((v) => !/\s/.test(v), {
        message: t("onboarding.key.whitespace"),
      }),
  });
}

function text(form: FormData, name: string): string {
  const value = form.get(name);
  return typeof value === "string" ? value.trim() : "";
}

// one billed request: the cheapest honest proof that a key works before it is saved
export async function testPlacesKeyAction(
  _previous: PlacesKeyState,
  formData: FormData,
): Promise<PlacesKeyState> {
  await requireUser();
  const t = await getT();

  const parsed = keySchema(t).safeParse({ key: text(formData, "key") });
  if (!parsed.success) {
    return {
      status: "error",
      message: null,
      fieldError: parsed.error.issues[0]?.message ?? t("onboarding.key.unreadable"),
    };
  }

  const result = await checkPlacesKey(parsed.data.key, t);
  if (result.ok) {
    return {
      status: "tested",
      message: t("onboarding.key.accepted"),
      fieldError: null,
    };
  }

  return { status: "error", message: result.message, fieldError: null };
}

export async function savePlacesKeyAction(
  _previous: PlacesKeyState,
  formData: FormData,
): Promise<PlacesKeyState> {
  const owner = await requireUser();
  const t = await getT();

  const parsed = keySchema(t).safeParse({ key: text(formData, "key") });
  if (!parsed.success) {
    return {
      status: "error",
      message: null,
      fieldError: parsed.error.issues[0]?.message ?? t("onboarding.key.unreadable"),
    };
  }

  await savePlacesKey(owner.id, parsed.data.key);
  redirect("/onboarding?step=grid");
}

export async function removePlacesKeyAction(): Promise<void> {
  const owner = await requireUser();
  await removePlacesKey(owner.id);
  redirect("/onboarding?step=key");
}

export async function finishOnboardingAction(): Promise<void> {
  const owner = await requireUser();
  await db
    .update(users)
    .set({ onboardedAt: new Date() })
    .where(eq(users.id, owner.id));
  redirect("/");
}
