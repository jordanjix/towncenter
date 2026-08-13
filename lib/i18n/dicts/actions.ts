// Server Action feedback: refusals, toasts, success summaries.
// `fr` is typed against `en`: a missing or extra key fails `tsc`.

const en = {
  // shared refusals
  "actions.error.businessNotFound": "Business not found.",
  "actions.error.sectorNotFound": "Sector not found.",
  "actions.error.entryRefused": "Entry refused.",

  // zod field messages (schemas are module constants, so they carry these keys)
  "actions.zod.unreadableId": "Unreadable identifier.",
  "actions.zod.unreadableNaf": "Unreadable NAF code.",
  "actions.zod.value500": "500 characters at most.",
  "actions.zod.label120": "120 characters at most.",

  // state labels, quoted inside advance/undo/restore messages
  "actions.state.spotted": "Spotted",
  "actions.state.studied": "Studied",
  "actions.state.engaged": "Engaged",
  "actions.state.taken": "Taken",
  "actions.state.withdrawn": "Withdrawn",
  "actions.state.dismissed": "Set aside",

  // harvest
  "actions.harvest.unreadableSector": "Unreadable sector. Draw it again on the map.",
  "actions.harvest.resumePageMissing": "Cannot resume: the resume page is missing.",
  "actions.harvest.resumePageField": "Give the page to resume from.",
  "actions.harvest.sectorGone": "This sector is finished or missing. Draw a new one.",
  "actions.harvest.drawFirst": "Draw a sector on the map before surveying it.",
  "actions.harvest.noFrameField": "No sector drawn.",
  "actions.harvest.interruptedOn": "Interrupted on page {page}.",
  "actions.harvest.savedSoFar": "The {n} businesses already read are saved.",
  "actions.harvest.nothingLost": "Nothing was lost.",
  "actions.harvest.runAgain": "Run it again to resume from that page.",
  "actions.harvest.outsideShape": "{n} outside the drawn shape",
  "actions.harvest.saturated":
    "the sector saturates the registry’s 10 000 results, cut it smaller",
  "actions.harvest.truncated": "a ceiling cut in, some businesses are missing",
  "actions.harvest.done":
    "Sector surveyed: {found} businesses, {created} of them new{suffix}.",
  "actions.harvest.pages":
    "Pages {first} to {last}: {found} businesses, {created} of them new{suffix}. Continues on page {next}.",

  // enrichment
  "actions.enrich.noKey":
    "No Google key: enrichment cannot run. Set GOOGLE_PLACES_API_KEY, or add your " +
    "key on the Setup screen instead — that one needs no restart. Google is the " +
    "only source of a website address, and without one the in-house site audit " +
    "has nothing to read. Surveying, directors and the map keep working without it.",
  "actions.enrich.unreadableFrame": "Unreadable frame.",
  "actions.enrich.googleNoAnswer": "Google did not answer.",
  "actions.enrich.nothingNew": "Nothing new to query in this frame.",
  "actions.enrich.enrichedOne": "{n} record enriched.",
  "actions.enrich.enrichedMany": "{n} records enriched.",
  "actions.enrich.stillWaiting": "{n} still waiting.",
  "actions.enrich.unreachable":
    "{n} with nothing to query: Google does not know these addresses and no website is attached.",
  "actions.enrich.purged": "{n} records purged (Google data older than 30 days).",
  "actions.enrich.noRecordUpdated": "No record updated.",
  "actions.enrich.recordUnchanged": "The record is unchanged.",
  "actions.enrich.nothingToQuery":
    "Nothing to query: Google does not know this address and no website is attached. The record is left untouched.",
  "actions.enrich.recordEnriched": "{name}: record enriched.",

  // hand-typed fields
  "actions.note.unreadableEntry": "Unreadable entry.",
  "actions.note.badWebsite": "That is not a readable web address.",
  "actions.note.badWebsiteHint": "Try something like boulangerie-durand.fr",
  "actions.note.addressCleared":
    "Address cleared. Whatever Google returns takes over again.",
  "actions.note.addressSaved":
    "Address saved. Fetch the facts to run the site audit on it.",
  "actions.note.phoneCleared": "Phone cleared.",
  "actions.note.phoneSaved": "Phone saved. It counts toward reachability from now on.",

  // advance
  "actions.advance.unreadableAmount": "Unreadable amount.",
  "actions.advance.amountHint": "An amount in euros, for example 3 500 or 3500,00.",
  "actions.advance.isSetAside":
    "{name} is set aside. Put it back in play before advancing it.",
  "actions.advance.alreadyTaken": "{name} is already taken.",
  "actions.advance.alreadyWithdrawn":
    "{name} is already withdrawn. Only a signature puts it back in play.",
  "actions.advance.noBackwards":
    "{name} is already at this step, or beyond. An approach does not go backwards.",
  "actions.advance.amountRequired":
    "Give the amount actually signed: this is the take, not the estimate.",
  "actions.advance.amountRequiredField": "Amount required for a take.",
  "actions.advance.stateChanged":
    "This business changed state in the meantime. Reopen the record.",
  "actions.advance.taken": "{name} is taken.",
  "actions.advance.withdrawn": "{name}: withdrawal recorded.",
  "actions.advance.moved": "{name} moves to “{state}”.",

  // undo
  "actions.undo.setAside":
    "{name} is set aside: its state does not come from the log. Put it back in play first.",
  "actions.undo.nothingToUndo": "{name} has no fact in the log: there is nothing to undo.",
  "actions.undo.onlySpotting":
    "{name} has only its spotting in the log, and a spotting cannot be undone: the business really was found. Set it aside if you no longer want to see it.",
  "actions.undo.alreadyUndone": "This fact was just undone elsewhere. Reopen the record.",
  "actions.undo.takeLeaves": "The {amount} take leaves the signed total.",
  "actions.undo.done": "{name} goes back to “{state}”. The fact was erased from the log.",

  // set aside / back in play
  "actions.dismiss.already": "{name} is already set aside.",
  "actions.dismiss.isTake": "{name} is a take: it is won and cannot be set aside.",
  "actions.dismiss.done": "{name} set aside. The log stays intact.",
  "actions.restore.alreadyInPlay": "{name} is already in play.",
  "actions.restore.done": "{name} is back on the map, in state “{state}”.",

  // sector rename / delete
  "actions.rename.refused": "Name refused.",
  "actions.rename.cleared": "Name cleared: the sector goes back to its date.",
  "actions.rename.done": "Sector renamed “{label}”.",
  "actions.deleteZone.refused": "Sector refused.",
  "actions.deleteZone.done": "Sector deleted.",
  "actions.deleteZone.doneWithOne": "Sector deleted, along with {n} business.",
  "actions.deleteZone.doneWithMany": "Sector deleted, along with {n} businesses.",

  // sign-in / sign-up
  "actions.login.emailRequired": "Enter your email address.",
  "actions.login.passwordRequired": "Enter your password.",
  "actions.login.tooManyAttempts":
    "Too many attempts on this address. Try again in fifteen minutes.",
  "actions.login.notConfigured": "The door is not configured on this server.",
  "actions.login.wrongCredentials": "Wrong email or password.",
  "actions.signup.emailInvalid": "That is not a readable email address.",
  "actions.signup.passwordRequired": "Choose a password.",
  "actions.signup.failed": "Account not created. Try again.",
} as const;

const fr: Record<keyof typeof en, string> = {
  "actions.error.businessNotFound": "Commerce introuvable.",
  "actions.error.sectorNotFound": "Secteur introuvable.",
  "actions.error.entryRefused": "Saisie refusée.",

  "actions.zod.unreadableId": "Identifiant illisible.",
  "actions.zod.unreadableNaf": "Code NAF illisible.",
  "actions.zod.value500": "500 caractères au maximum.",
  "actions.zod.label120": "120 caractères au maximum.",

  "actions.state.spotted": "Repérée",
  "actions.state.studied": "Étudiée",
  "actions.state.engaged": "Engagée",
  "actions.state.taken": "Prise",
  "actions.state.withdrawn": "Retirée",
  "actions.state.dismissed": "Écartée",

  "actions.harvest.unreadableSector": "Secteur illisible. Retracez-le sur la carte.",
  "actions.harvest.resumePageMissing":
    "Impossible de reprendre : la page de reprise manque.",
  "actions.harvest.resumePageField": "Indiquez la page à partir de laquelle reprendre.",
  "actions.harvest.sectorGone":
    "Ce secteur est terminé ou introuvable. Tracez-en un nouveau.",
  "actions.harvest.drawFirst": "Tracez un secteur sur la carte avant de le récolter.",
  "actions.harvest.noFrameField": "Aucun secteur tracé.",
  "actions.harvest.interruptedOn": "Interrompu en page {page}.",
  "actions.harvest.savedSoFar": "Les {n} commerces déjà lus sont enregistrés.",
  "actions.harvest.nothingLost": "Rien n’a été perdu.",
  "actions.harvest.runAgain": "Relancez pour reprendre à cette page.",
  "actions.harvest.outsideShape": "{n} hors du tracé",
  "actions.harvest.saturated":
    "le secteur sature les 10 000 résultats du registre, découpez-le plus petit",
  "actions.harvest.truncated": "un plafond a joué, des commerces manquent",
  "actions.harvest.done":
    "Secteur récolté : {found} commerces, dont {created} nouveaux{suffix}.",
  "actions.harvest.pages":
    "Pages {first} à {last} : {found} commerces, dont {created} nouveaux{suffix}. La suite en page {next}.",

  "actions.enrich.noKey":
    "Aucune clé Google : l’enrichissement ne peut pas tourner. Définissez " +
    "GOOGLE_PLACES_API_KEY, ou ajoutez plutôt votre clé sur l’écran de " +
    "configuration — celui-là ne demande aucun redémarrage. Google est la seule " +
    "source d’adresse de site web, et sans elle l’audit de site interne n’a rien " +
    "à lire. La récolte, les dirigeants et la carte continuent de fonctionner sans.",
  "actions.enrich.unreadableFrame": "Cadre illisible.",
  "actions.enrich.googleNoAnswer": "Google n’a pas répondu.",
  "actions.enrich.nothingNew": "Rien de nouveau à interroger dans ce cadre.",
  "actions.enrich.enrichedOne": "{n} fiche enrichie.",
  "actions.enrich.enrichedMany": "{n} fiches enrichies.",
  "actions.enrich.stillWaiting": "{n} encore en attente.",
  "actions.enrich.unreachable":
    "{n} sans rien à interroger : Google ne connaît pas ces adresses et aucun site web n’est renseigné.",
  "actions.enrich.purged":
    "{n} fiches purgées (données Google de plus de 30 jours).",
  "actions.enrich.noRecordUpdated": "Aucune fiche mise à jour.",
  "actions.enrich.recordUnchanged": "La fiche est inchangée.",
  "actions.enrich.nothingToQuery":
    "Rien à interroger : Google ne connaît pas cette adresse et aucun site web n’est renseigné. La fiche est laissée telle quelle.",
  "actions.enrich.recordEnriched": "{name} : fiche enrichie.",

  "actions.note.unreadableEntry": "Saisie illisible.",
  "actions.note.badWebsite": "Ceci n’est pas une adresse web lisible.",
  "actions.note.badWebsiteHint": "Essayez par exemple boulangerie-durand.fr",
  "actions.note.addressCleared":
    "Adresse effacée. Ce que Google renvoie reprend la main.",
  "actions.note.addressSaved":
    "Adresse enregistrée. Récupérez les faits pour y lancer l’audit de site.",
  "actions.note.phoneCleared": "Téléphone effacé.",
  "actions.note.phoneSaved":
    "Téléphone enregistré. Il compte désormais dans la joignabilité.",

  "actions.advance.unreadableAmount": "Montant illisible.",
  "actions.advance.amountHint": "Un montant en euros, par exemple 3 500 ou 3500,00.",
  "actions.advance.isSetAside":
    "{name} est écartée. Remettez-la en jeu avant de la faire avancer.",
  "actions.advance.alreadyTaken": "{name} est déjà prise.",
  "actions.advance.alreadyWithdrawn":
    "{name} est déjà retirée. Seule une signature la remet en jeu.",
  "actions.advance.noBackwards":
    "{name} est déjà à cette étape, ou au-delà. Une approche ne revient pas en arrière.",
  "actions.advance.amountRequired":
    "Indiquez le montant réellement signé : c’est la prise, pas l’estimation.",
  "actions.advance.amountRequiredField": "Montant requis pour une prise.",
  "actions.advance.stateChanged":
    "Ce commerce a changé d’état entre-temps. Rouvrez la fiche.",
  "actions.advance.taken": "{name} est prise.",
  "actions.advance.withdrawn": "{name} : retrait enregistré.",
  "actions.advance.moved": "{name} passe à « {state} ».",

  "actions.undo.setAside":
    "{name} est écartée : son état ne vient pas du journal. Remettez-la d’abord en jeu.",
  "actions.undo.nothingToUndo":
    "{name} n’a aucun fait au journal : il n’y a rien à annuler.",
  "actions.undo.onlySpotting":
    "{name} n’a que son repérage au journal, et un repérage ne s’annule pas : le commerce a bel et bien été trouvé. Écartez-la si vous ne voulez plus la voir.",
  "actions.undo.alreadyUndone":
    "Ce fait vient d’être annulé ailleurs. Rouvrez la fiche.",
  "actions.undo.takeLeaves": "La prise de {amount} quitte le total signé.",
  "actions.undo.done":
    "{name} revient à « {state} ». Le fait a été effacé du journal.",

  "actions.dismiss.already": "{name} est déjà écartée.",
  "actions.dismiss.isTake":
    "{name} est une prise : elle est gagnée et ne peut pas être écartée.",
  "actions.dismiss.done": "{name} écartée. Le journal reste intact.",
  "actions.restore.alreadyInPlay": "{name} est déjà en jeu.",
  "actions.restore.done":
    "{name} est de retour sur la carte, à l’état « {state} ».",

  "actions.rename.refused": "Nom refusé.",
  "actions.rename.cleared": "Nom effacé : le secteur revient à sa date.",
  "actions.rename.done": "Secteur renommé « {label} ».",
  "actions.deleteZone.refused": "Secteur refusé.",
  "actions.deleteZone.done": "Secteur supprimé.",
  "actions.deleteZone.doneWithOne": "Secteur supprimé, avec {n} commerce.",
  "actions.deleteZone.doneWithMany": "Secteur supprimé, avec {n} commerces.",

  "actions.login.emailRequired": "Saisissez votre adresse email.",
  "actions.login.passwordRequired": "Saisissez votre mot de passe.",
  "actions.login.tooManyAttempts":
    "Trop de tentatives sur cette adresse. Réessayez dans quinze minutes.",
  "actions.login.notConfigured": "La porte n’est pas configurée sur ce serveur.",
  "actions.login.wrongCredentials": "Email ou mot de passe incorrect.",
  "actions.signup.emailInvalid": "Ceci n’est pas une adresse email lisible.",
  "actions.signup.passwordRequired": "Choisissez un mot de passe.",
  "actions.signup.failed": "Compte non créé. Réessayez.",
};

export const actions = { en, fr };
