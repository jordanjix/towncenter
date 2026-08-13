// The sign-in / sign-up gate and the account menu.
// `fr` is typed against `en`: a missing or extra key fails `tsc`.

const en = {
  "gate.tagline": "Neighbourhood prospecting, street by street.",
  "gate.signin.metaTitle": "Sign in — Towncenter",
  "gate.signin.title": "Enter the field",
  "gate.signin.subtitle": "Your sectors are where you left them.",
  "gate.signin.noAccount": "No account yet?",
  "gate.signin.createOne": "Create one",
  "gate.signin.email": "Email",
  "gate.signin.password": "Password",
  "gate.signin.showPassword": "Show password",
  "gate.signin.hidePassword": "Hide password",
  "gate.signin.submit": "Enter the field",
  "gate.signin.checking": "Checking…",
  "account.signout": "Sign out",
  "account.signingout": "Signing out…",
  "account.language": "Language",
  "meta.description": "Neighbourhood shop prospecting, street by street.",
} as const;

const fr: Record<keyof typeof en, string> = {
  "gate.tagline": "Prospection de proximité, rue par rue.",
  "gate.signin.metaTitle": "Connexion — Towncenter",
  "gate.signin.title": "Entrer sur le terrain",
  "gate.signin.subtitle": "Vos secteurs sont là où vous les avez laissés.",
  "gate.signin.noAccount": "Pas encore de compte ?",
  "gate.signin.createOne": "Créez-en un",
  "gate.signin.email": "Email",
  "gate.signin.password": "Mot de passe",
  "gate.signin.showPassword": "Afficher le mot de passe",
  "gate.signin.hidePassword": "Masquer le mot de passe",
  "gate.signin.submit": "Entrer sur le terrain",
  "gate.signin.checking": "Vérification…",
  "account.signout": "Se déconnecter",
  "account.signingout": "Déconnexion…",
  "account.language": "Langue",
  "meta.description": "Prospection des commerces de proximité, rue par rue.",
};

export const gate = { en, fr };
