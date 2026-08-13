// User-visible refusals and failures produced inside `lib/`.
// The `en` texts are frozen: the benches assert them character for character.

const en = {
  "lib.password.short":
    "At least {n} characters — length is what protects you, not symbols.",
  "lib.password.long": "{n} characters at most.",
  "lib.password.known":
    "This one is in every leaked-password list. Pick another.",
  "lib.password.email":
    "It contains your email address. Anyone guessing would start there.",
  "lib.accounts.emailRequired": "Enter an email address.",
  "lib.accounts.closed":
    "This instance is not accepting new accounts. Its owner can open them by setting ALLOW_SIGNUPS=true.",
  "lib.accounts.notCreated": "Account not created. Try again.",
  "lib.accounts.emailTaken":
    "An account already uses this address. Sign in instead.",
  "lib.harvest.unreadableSector": "Unreadable sector. Draw it again on the map.",
  "lib.harvest.sectorTooLarge":
    "Sector too large: {area} km² for {max} km² at most. Draw a neighbourhood rather than a town.",
  "lib.harvest.sectorNotOpened": "Sector cannot be opened.",
  "lib.harvest.registerNoAnswer": "The company register did not answer.",
  "lib.harvest.saveFailed": "Could not save.",
  "lib.places.noAnswer": "Google did not answer.",
  "lib.places.timeout": "Google took too long to answer.",
  "lib.places.unreachable": "Could not reach Google Places.",
  "lib.places.keyRejected":
    "Google Places rejected the API key. Check GOOGLE_PLACES_API_KEY.",
  "lib.places.keyRefused":
    "Google Places refused the key: API disabled, billing missing, or usage restriction.",
  "lib.places.badRequest":
    "Google Places rejected the request (invalid parameter or FieldMask).",
  "lib.places.gone": "This place no longer exists on Google.",
  "lib.places.quota": "Google Places quota exceeded. Try again later.",
  "lib.places.status": "Google Places answered {status}.",
} as const;

const fr: Record<keyof typeof en, string> = {
  "lib.password.short":
    "Au moins {n} caractères — c’est la longueur qui vous protège, pas les symboles.",
  "lib.password.long": "{n} caractères au maximum.",
  "lib.password.known":
    "Celui-ci figure dans toutes les listes de mots de passe divulgués. Choisissez-en un autre.",
  "lib.password.email":
    "Il contient votre adresse email. Quiconque chercherait à deviner commencerait par là.",
  "lib.accounts.emailRequired": "Saisissez une adresse email.",
  "lib.accounts.closed":
    "Cette instance n’accepte pas de nouveaux comptes. Son propriétaire peut les ouvrir en définissant ALLOW_SIGNUPS=true.",
  "lib.accounts.notCreated": "Compte non créé. Réessayez.",
  "lib.accounts.emailTaken":
    "Un compte utilise déjà cette adresse. Connectez-vous plutôt.",
  "lib.harvest.unreadableSector":
    "Secteur illisible. Retracez-le sur la carte.",
  "lib.harvest.sectorTooLarge":
    "Secteur trop grand : {area} km² pour {max} km² au maximum. Tracez un quartier plutôt qu’une ville.",
  "lib.harvest.sectorNotOpened": "Le secteur ne peut pas être ouvert.",
  "lib.harvest.registerNoAnswer": "Le registre des entreprises n’a pas répondu.",
  "lib.harvest.saveFailed": "Enregistrement impossible.",
  "lib.places.noAnswer": "Google n’a pas répondu.",
  "lib.places.timeout": "Google a mis trop longtemps à répondre.",
  "lib.places.unreachable": "Google Places est injoignable.",
  "lib.places.keyRejected":
    "Google Places a rejeté la clé API. Vérifiez GOOGLE_PLACES_API_KEY.",
  "lib.places.keyRefused":
    "Google Places a refusé la clé : API désactivée, facturation absente ou restriction d’usage.",
  "lib.places.badRequest":
    "Google Places a rejeté la requête (paramètre ou FieldMask invalide).",
  "lib.places.gone": "Ce lieu n’existe plus sur Google.",
  "lib.places.quota": "Quota Google Places dépassé. Réessayez plus tard.",
  "lib.places.status": "Google Places a répondu {status}.",
};

export const libs = { en, fr };
