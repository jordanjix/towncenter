// The password-reset flow and the transactional emails.
// `fr` is typed against `en`: a missing or extra key fails `tsc`.

const en = {
  "reset.forgot.metaTitle": "Forgot password — Towncenter",
  "reset.forgot.title": "Locked out?",
  "reset.forgot.subtitle":
    "Give the address; if an account uses it, a reset link lands there.",
  "reset.forgot.remembered": "Remembered it?",
  "reset.forgot.signin": "Sign in",
  "reset.forgot.done":
    "If an account uses this address, a reset link is on its way. It works once and expires in thirty minutes — check the spam folder too.",
  "reset.forgot.email": "Email",
  "reset.forgot.sending": "Sending…",
  "reset.forgot.submit": "Send the reset link",
  "reset.signin.passwordChanged": "Password changed. Sign in with the new one.",
  "reset.signin.forgotLink": "Forgot password?",
  "reset.invalidLink":
    "This link is invalid or has expired. Request a new one from the sign-in page.",
  "reset.page.metaTitle": "Reset password — Towncenter",
  "reset.page.incomplete.title": "This link is incomplete",
  "reset.page.incomplete.subtitle":
    "A reset link carries its own key, and this one arrived without it.",
  "reset.page.incomplete.ask": "Ask for a fresh one on",
  "reset.page.incomplete.link": "the reset page",
  "reset.page.incomplete.notice":
    "Links only live thirty minutes; the one in your most recent email is the only one that counts.",
  "reset.page.title": "Choose a new password",
  "reset.page.subtitle": "The old one stops working the moment this one is saved.",
  "reset.page.changedMind": "Changed your mind?",
  "reset.page.backToSignin": "Back to sign-in",
  "reset.form.newPassword": "New password",
  "reset.form.saving": "Saving…",
  "reset.form.submit": "Set the new password",
  "reset.action.choose": "Choose a password.",
  "reset.action.tooLong": "{max} characters at most.",

  // BCP 47 tag for dates inside emails, resolved through `t` like any string
  "email.dateLocale": "en-GB",
  "email.greeting.named": "Hi {name},",
  "email.greeting.anon": "Hi,",

  "email.reset.subject": "Reset your Towncenter password",
  "email.reset.asked":
    "Someone — hopefully you — asked to reset the password on this account.",
  "email.reset.expires":
    "The link below works once and expires in {minutes} minutes.",
  "email.reset.button": "Choose a new password",
  "email.reset.ignore":
    "If you did not ask for this, ignore this email: the password stays as it is.",

  "email.welcome.subject": "Welcome to Towncenter",
  "email.welcome.ready":
    "Your account is ready. Towncenter maps the businesses of a territory so you can work it street by street.",
  "email.welcome.trial":
    "Start your {days}-day free trial from the Billing screen — a card is required but nothing is charged until the trial ends, and you can cancel any time before.",
  "email.welcome.draw": "Draw a zone on the map to survey your first street.",

  "email.managePlan": "Manage your plan",

  "email.trialStarted.subject": "Your Towncenter trial is active",
  "email.trialStarted.started":
    "Your 14-day trial has started with the full {plan} limits. Nothing was charged today.",
  "email.trialStarted.firstPayment":
    "The first payment of {price} runs on {date}. Cancel before that date from the Billing screen and you will never be charged.",

  "email.trialReminder.subject": "Your Towncenter paid period starts in 3 days",
  "email.trialReminder.ends":
    "Your trial ends on {date}. From that date your card is charged {price} for the {plan} plan.",
  "email.trialReminder.keepGoing":
    "To keep going, do nothing. To stop before any payment, cancel from the Billing screen.",
  "email.trialReminder.keepGoingText":
    "To keep going, do nothing. To stop before any payment, cancel from the Billing screen:",

  "email.subActivated.subject": "Your Towncenter {plan} subscription is active",
  "email.subActivated.body":
    "Payment received — the {plan} plan ({price}) is active on your account.{renewal}",
  "email.subActivated.renews": "It renews on {date}.",

  "email.subSuspended.subject":
    "A Towncenter payment failed — subscription suspended",
  "email.subSuspended.failed":
    "A renewal payment failed and your subscription is suspended. Your data is untouched, but surveying stops when the paid period runs out.",
  "email.subSuspended.resub":
    "Subscribe again from the Billing screen to set up a new mandate.",
  "email.subSuspended.resubText":
    "Subscribe again from the Billing screen to set up a new mandate:",
  "email.subSuspended.button": "Fix my subscription",

  "email.subCanceled.subject": "Your Towncenter subscription is canceled",
  "email.subCanceled.body": "Your subscription is canceled. {until}",
  "email.subCanceled.untilDate":
    "You keep full access until {date}; nothing more is charged.",
  "email.subCanceled.untilNone": "Nothing more is charged.",
  "email.subCanceled.after":
    "Your territory stays readable afterwards — only surveying new ground stops. Resubscribe any time from the Billing screen.",
} as const;

const fr: Record<keyof typeof en, string> = {
  "reset.forgot.metaTitle": "Mot de passe oublié — Towncenter",
  "reset.forgot.title": "Porte close ?",
  "reset.forgot.subtitle":
    "Indiquez l’adresse ; si un compte l’utilise, un lien de réinitialisation y arrive.",
  "reset.forgot.remembered": "Mot de passe retrouvé ?",
  "reset.forgot.signin": "Connectez-vous",
  "reset.forgot.done":
    "Si un compte utilise cette adresse, un lien de réinitialisation est en route. Il fonctionne une seule fois et expire dans trente minutes — pensez aussi au dossier spam.",
  "reset.forgot.email": "Email",
  "reset.forgot.sending": "Envoi…",
  "reset.forgot.submit": "Envoyer le lien de réinitialisation",
  "reset.signin.passwordChanged":
    "Mot de passe modifié. Connectez-vous avec le nouveau.",
  "reset.signin.forgotLink": "Mot de passe oublié ?",
  "reset.invalidLink":
    "Ce lien est invalide ou a expiré. Demandez-en un nouveau depuis la page de connexion.",
  "reset.page.metaTitle": "Réinitialisation du mot de passe — Towncenter",
  "reset.page.incomplete.title": "Ce lien est incomplet",
  "reset.page.incomplete.subtitle":
    "Un lien de réinitialisation porte sa propre clé, et celui-ci est arrivé sans elle.",
  "reset.page.incomplete.ask": "Demandez-en un nouveau sur",
  "reset.page.incomplete.link": "la page de réinitialisation",
  "reset.page.incomplete.notice":
    "Les liens ne vivent que trente minutes ; seul celui du dernier email reçu compte.",
  "reset.page.title": "Choisissez un nouveau mot de passe",
  "reset.page.subtitle":
    "L’ancien cesse de fonctionner dès que celui-ci est enregistré.",
  "reset.page.changedMind": "Vous avez changé d’avis ?",
  "reset.page.backToSignin": "Retour à la connexion",
  "reset.form.newPassword": "Nouveau mot de passe",
  "reset.form.saving": "Enregistrement…",
  "reset.form.submit": "Enregistrer le nouveau mot de passe",
  "reset.action.choose": "Choisissez un mot de passe.",
  "reset.action.tooLong": "{max} caractères au maximum.",

  "email.dateLocale": "fr-FR",
  "email.greeting.named": "Bonjour {name},",
  "email.greeting.anon": "Bonjour,",

  "email.reset.subject": "Réinitialisez votre mot de passe Towncenter",
  "email.reset.asked":
    "Quelqu’un — vous, espérons-le — a demandé à réinitialiser le mot de passe de ce compte.",
  "email.reset.expires":
    "Le lien ci-dessous fonctionne une seule fois et expire dans {minutes} minutes.",
  "email.reset.button": "Choisir un nouveau mot de passe",
  "email.reset.ignore":
    "Si vous n’êtes pas à l’origine de cette demande, ignorez cet email : le mot de passe reste inchangé.",

  "email.welcome.subject": "Bienvenue sur Towncenter",
  "email.welcome.ready":
    "Votre compte est prêt. Towncenter cartographie les commerces d’un territoire pour le travailler rue par rue.",
  "email.welcome.trial":
    "Démarrez votre essai gratuit de {days} jours depuis l’écran Facturation — une carte est requise mais rien n’est débité avant la fin de l’essai, et vous pouvez annuler à tout moment avant.",
  "email.welcome.draw":
    "Tracez une zone sur la carte pour récolter votre première rue.",

  "email.managePlan": "Gérer votre plan",

  "email.trialStarted.subject": "Votre essai Towncenter est actif",
  "email.trialStarted.started":
    "Votre essai de 14 jours a démarré avec les limites complètes du plan {plan}. Rien n’a été débité aujourd’hui.",
  "email.trialStarted.firstPayment":
    "Le premier paiement de {price} passe le {date}. Annulez avant cette date depuis l’écran Facturation et vous ne serez jamais débité.",

  "email.trialReminder.subject":
    "Votre période payante Towncenter commence dans 3 jours",
  "email.trialReminder.ends":
    "Votre essai se termine le {date}. À partir de cette date, votre carte est débitée de {price} pour le plan {plan}.",
  "email.trialReminder.keepGoing":
    "Pour continuer, ne faites rien. Pour arrêter avant tout paiement, annulez depuis l’écran Facturation.",
  "email.trialReminder.keepGoingText":
    "Pour continuer, ne faites rien. Pour arrêter avant tout paiement, annulez depuis l’écran Facturation :",

  "email.subActivated.subject": "Votre abonnement Towncenter {plan} est actif",
  "email.subActivated.body":
    "Paiement reçu — le plan {plan} ({price}) est actif sur votre compte.{renewal}",
  "email.subActivated.renews": "Il se renouvelle le {date}.",

  "email.subSuspended.subject":
    "Un paiement Towncenter a échoué — abonnement suspendu",
  "email.subSuspended.failed":
    "Un paiement de renouvellement a échoué et votre abonnement est suspendu. Vos données sont intactes, mais la récolte s’arrête à la fin de la période payée.",
  "email.subSuspended.resub":
    "Abonnez-vous de nouveau depuis l’écran Facturation pour établir un nouveau mandat.",
  "email.subSuspended.resubText":
    "Abonnez-vous de nouveau depuis l’écran Facturation pour établir un nouveau mandat :",
  "email.subSuspended.button": "Rétablir mon abonnement",

  "email.subCanceled.subject": "Votre abonnement Towncenter est annulé",
  "email.subCanceled.body": "Votre abonnement est annulé. {until}",
  "email.subCanceled.untilDate":
    "Vous conservez l’accès complet jusqu’au {date} ; rien de plus n’est débité.",
  "email.subCanceled.untilNone": "Rien de plus n’est débité.",
  "email.subCanceled.after":
    "Votre territoire reste lisible ensuite — seule la récolte de nouveaux terrains s’arrête. Réabonnez-vous à tout moment depuis l’écran Facturation.",
};

export const reset = { en, fr };
