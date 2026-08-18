"use client";

import { useActionState } from "react";

import { Button, Field, FieldLabel, Input } from "@/components/ui";

import { useT } from "@/lib/i18n/client";

import { forgotPasswordAction } from "./actions";
import { INITIAL_FORGOT_STATE } from "./state";

import styles from "@/components/gate/gate.module.css";

export function ForgotPassword() {
  const [state, action, inProgress] = useActionState(
    forgotPasswordAction,
    INITIAL_FORGOT_STATE,
  );
  const t = useT();

  // The SAME screen whether the address exists or not: this form must never
  // become an oracle for who uses this instance.
  if (state.done) {
    return (
      <p className={styles.notice} role="status">
        {t("reset.forgot.done")}
      </p>
    );
  }

  return (
    // suppressHydrationWarning: password managers tag the form itself
    // (data-dashlane-rid and similar) before React hydrates.
    <form action={action} noValidate suppressHydrationWarning>
      {state.error ? (
        <p className={styles.alert} role="alert">
          {state.error}
        </p>
      ) : null}

      <div className={styles.fields}>
        <Field>
          <FieldLabel htmlFor="forgot-email">{t("reset.forgot.email")}</FieldLabel>
          <Input
            id="forgot-email"
            name="email"
            type="email"
            autoComplete="username"
            autoFocus
            required
            maxLength={320}
            defaultValue={state.email}
          />
        </Field>
      </div>

      <div style={{ marginTop: "24px" }}>
        <Button type="submit" variant="primary" fullWidth disabled={inProgress}>
          {inProgress ? t("reset.forgot.sending") : t("reset.forgot.submit")}
        </Button>
      </div>
    </form>
  );
}
