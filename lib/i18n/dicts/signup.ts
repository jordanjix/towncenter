// Sign-up, onboarding and the live password requirements.
// `fr` is typed against `en`: a missing or extra key fails `tsc`.

const en = {
  "signup.metaTitle": "Create an account — Towncenter",
  "signup.closed.title": "Accounts are closed",
  "signup.closed.subtitle": "This instance is not taking new accounts right now.",
  "signup.closed.back": "Back to sign in",
  "signup.claim.title": "Claim this instance",
  "signup.claim.subtitle": "You are the first here. This account will own the territory.",
  "signup.create.title": "Create your account",
  "signup.create.subtitle": "One account, one territory. Nothing is shared between them.",
  "signup.haveAccount": "Already have an account?",
  "signup.signIn": "Sign in",
  "signup.firstNotice":
    "This instance has no account yet. The one you create now becomes its owner, and everything already surveyed here belongs to it.",
  "signup.name": "Name",
  "signup.nameHint": "Optional. It only shows in the account menu.",
  "signup.creating": "Creating…",
  "signup.createSubmit": "Create account",
  "requirements.length": "{n} characters or more",
  "requirements.noEmail": "Does not contain your email address",
  "requirements.met": " — met",
  "requirements.notMet": " — not met yet",
  "onboarding.metaTitle": "Setup — Towncenter",
  "onboarding.title": "Set up your territory",
  "onboarding.subtitle":
    "Three things to do before the map becomes useful. Each one is backed by a measured fact — skip any step and come back to it.",
  "onboarding.step.key": "Connect Google Places",
  "onboarding.step.grid": "Review your price grid",
  "onboarding.step.sector": "Survey your first sector",
  "onboarding.continue": "Continue →",
  "onboarding.key.env": "The key is provided by the server environment",
  "onboarding.key.envNothing": "Nothing to do here.",
  "onboarding.key.configured": "Your key is configured:",
  "onboarding.key.remove": "Remove the key",
  "onboarding.key.intro":
    "Enrichment needs a Google Places API key. Without it, the map still works — surveying, scoring and the ledger need no key at all — but no business will ever get a website address, and the in-house site audit has nothing to read.",
  "onboarding.key.cardTitle": "Your key",
  "onboarding.key.note":
    "Stored on this instance, used server-side only. One billed request is made when you click “Check the key”.",
  "onboarding.key.skip": "Skip for now →",
  "onboarding.key.label": "Google Places API key",
  "onboarding.key.check": "Check the key",
  "onboarding.key.saving": "Saving…",
  "onboarding.key.save": "Save and continue",
  "onboarding.key.tooShort": "A Google Places key is at least 20 characters.",
  "onboarding.key.whitespace": "The key must not contain whitespace.",
  "onboarding.key.unreadable": "Unreadable key.",
  "onboarding.key.accepted": "Key accepted by Google. You can save it.",
  "onboarding.grid.badge": "Price grid",
  "onboarding.grid.intro":
    "Every amount on the map comes from your grid: the loot on a target, the treasure of a sector. The default grid ships with the product — one freelancer’s real rates, a starting point.",
  "onboarding.grid.custom": "You have already saved a custom grid.",
  "onboarding.grid.default":
    "You are on the default grid. Open the pricing screen to change it, or keep the default and continue.",
  "onboarding.grid.open": "Open the pricing screen",
  "onboarding.grid.keep": "Keep the default grid →",
  "onboarding.sector.badge": "First sector",
  "onboarding.sector.intro":
    "Draw a sector on the map. It fills with every business actually registered there — the French national company register knows them, and it is free and key-less. Each one becomes a target carrying two numbers: the loot and the resistance.",
  "onboarding.sector.surveyedOne": "You have already surveyed 1 sector.",
  "onboarding.sector.surveyedMany": "You have already surveyed {n} sectors.",
  "onboarding.sector.back": "Back to the map",
  "onboarding.sector.enter": "Enter the map",
} as const;

const fr: Record<keyof typeof en, string> = {
  "signup.metaTitle": "Créer un compte — Towncenter",
  "signup.closed.title": "Les comptes sont fermés",
  "signup.closed.subtitle":
    "Cette instance n’accepte pas de nouveaux comptes pour le moment.",
  "signup.closed.back": "Retour à la connexion",
  "signup.claim.title": "Revendiquer cette instance",
  "signup.claim.subtitle":
    "Vous êtes le premier ici. Ce compte possédera le territoire.",
  "signup.create.title": "Créer votre compte",
  "signup.create.subtitle":
    "Un compte, un territoire. Rien n’est partagé entre eux.",
  "signup.haveAccount": "Déjà un compte ?",
  "signup.signIn": "Se connecter",
  "signup.firstNotice":
    "Cette instance n’a encore aucun compte. Celui que vous créez maintenant en devient le propriétaire, et tout ce qui a déjà été relevé ici lui appartient.",
  "signup.name": "Nom",
  "signup.nameHint": "Facultatif. Il n’apparaît que dans le menu du compte.",
  "signup.creating": "Création…",
  "signup.createSubmit": "Créer le compte",
  "requirements.length": "{n} caractères ou plus",
  "requirements.noEmail": "Ne contient pas votre adresse email",
  "requirements.met": " — satisfaite",
  "requirements.notMet": " — pas encore satisfaite",
  "onboarding.metaTitle": "Configuration — Towncenter",
  "onboarding.title": "Préparer votre territoire",
  "onboarding.subtitle":
    "Trois choses à faire avant que la carte ne devienne utile. Chacune s’appuie sur un fait mesuré — passez une étape et revenez-y plus tard.",
  "onboarding.step.key": "Connecter Google Places",
  "onboarding.step.grid": "Revoir votre grille tarifaire",
  "onboarding.step.sector": "Relever votre premier secteur",
  "onboarding.continue": "Continuer →",
  "onboarding.key.env": "La clé est fournie par l’environnement du serveur",
  "onboarding.key.envNothing": "Rien à faire ici.",
  "onboarding.key.configured": "Votre clé est configurée :",
  "onboarding.key.remove": "Retirer la clé",
  "onboarding.key.intro":
    "L’enrichissement demande une clé API Google Places. Sans elle, la carte fonctionne toujours — le relevé, la notation et le registre ne demandent aucune clé — mais aucun commerce n’obtiendra jamais d’adresse de site web, et l’audit de site maison n’a rien à lire.",
  "onboarding.key.cardTitle": "Votre clé",
  "onboarding.key.note":
    "Stockée sur cette instance, utilisée côté serveur uniquement. Une requête facturée est émise quand vous cliquez sur « Vérifier la clé ».",
  "onboarding.key.skip": "Passer pour l’instant →",
  "onboarding.key.label": "Clé API Google Places",
  "onboarding.key.check": "Vérifier la clé",
  "onboarding.key.saving": "Enregistrement…",
  "onboarding.key.save": "Enregistrer et continuer",
  "onboarding.key.tooShort":
    "Une clé Google Places compte au moins 20 caractères.",
  "onboarding.key.whitespace": "La clé ne doit pas contenir d’espace.",
  "onboarding.key.unreadable": "Clé illisible.",
  "onboarding.key.accepted":
    "Clé acceptée par Google. Vous pouvez l’enregistrer.",
  "onboarding.grid.badge": "Grille tarifaire",
  "onboarding.grid.intro":
    "Chaque montant sur la carte vient de votre grille : le butin d’une cible, le trésor d’un secteur. La grille par défaut est livrée avec le produit — les tarifs réels d’un indépendant, un point de départ.",
  "onboarding.grid.custom": "Vous avez déjà enregistré une grille personnalisée.",
  "onboarding.grid.default":
    "Vous êtes sur la grille par défaut. Ouvrez l’écran des tarifs pour la modifier, ou gardez-la et continuez.",
  "onboarding.grid.open": "Ouvrir l’écran des tarifs",
  "onboarding.grid.keep": "Garder la grille par défaut →",
  "onboarding.sector.badge": "Premier secteur",
  "onboarding.sector.intro":
    "Dessinez un secteur sur la carte. Il se remplit de tous les commerces réellement immatriculés là — le registre national des entreprises les connaît, et il est gratuit et sans clé. Chacun devient une cible portant deux nombres : le butin et la résistance.",
  "onboarding.sector.surveyedOne": "Vous avez déjà relevé 1 secteur.",
  "onboarding.sector.surveyedMany": "Vous avez déjà relevé {n} secteurs.",
  "onboarding.sector.back": "Retour à la carte",
  "onboarding.sector.enter": "Entrer sur la carte",
};

export const signup = { en, fr };
