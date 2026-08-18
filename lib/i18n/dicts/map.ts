// The territory map screen and the daily front.
// `fr` is typed against `en`: a missing or extra key fails `tsc`.

const en = {
  // map canvas and cluster labels
  "map.canvas.aria": "Territory map",
  "map.cluster.label": "{n} businesses · {loot}",
  "map.price.offGrid": "off-grid",

  // opening failures and the paint watchdog
  "map.error.open": "The map could not open: {message}",
  "map.error.openMachine": "The map could not open on this machine.",
  "map.fallback.title": "No map",
  "map.fallback.body":
    "The territory then reads as a list, sorted by expected value — the gestures are exactly the same.",
  "map.silent.title": "The map is not painting",
  "map.silent.body":
    "The base map showed nothing after {seconds} seconds. This is not a territory failure: the businesses are read correctly, only their mapping is missing. An old graphics driver, a network blocking the tiles or a restricted browser is enough.",
  "map.silent.neverAnswered": "The base map never answered on this machine.",
  "map.silent.switchToList": "Switch to the list",
  "map.silent.keepWaiting": "Keep waiting",

  // side rail
  "map.rail.aria": "Side panel",
  "map.rail.sectors": "Sectors",
  "map.rail.businesses": "Businesses",
  "map.rail.openAria": "Open the side panel",
  "map.rail.closeAria": "Close the side panel",

  // search in this area
  "map.search.aria": "Search in this area — read the businesses inside the current view",
  "map.search.label": "Search in this area",
  "map.search.searching": "Searching…",

  // tools menu
  "map.menu.aria": "Settings and account",
  "map.menu.sectorSettings": "Sector settings",
  "map.menu.pricing": "Pricing",
  "map.menu.setup": "Setup",

  // drawing a sector
  "map.draw.aria": "Draw a sector",
  "map.draw.cancelAria": "Cancel the drawing (Esc)",
  "map.draw.hint":
    "Drag to draw a rectangle. {max} km² at most, or the API saturates its 10 000 results and returns an incomplete sector without saying so.",
  "map.draw.tooSmall": "Rectangle too small. Drag to draw a sector.",
  "map.draw.tooLarge":
    "{area} km²: beyond {max} km², the survey would return an incomplete sector without saying so. Cut it smaller.",
  "map.badge.area": "{area} km²",
  "map.badge.refused": "{area} km² — beyond {max} km², the survey is refused",
  "map.badge.refusedCumulative":
    "{area} km² — total would reach {total} km² ({max} km² limit)",
  "map.draw.cumulative":
    "Cumulative limit reached: you have surveyed {done} km² this month. Adding {area} km² would reach {total} km² (limit: {max} km²).",
  "map.draw.hintQuota":
    "Drag to draw a rectangle. {max} km² per sector, {total} km² total per month ({done} km² already surveyed).",
  "map.drawing.sr": "Drawing. Esc to cancel.",
  "map.sector.unnamed": "Unnamed sector",

  // sector settings panel
  "map.settings.activities": "Activities queried",
  "map.settings.sectorName": "Sector name",
  "map.settings.sectorNamePlaceholder": "City centre",
  "map.enrich.start": "Enrich this frame",
  "map.enrich.running": "Enriching…",
  "map.enrich.explain":
    "Google first, then the in-house site audit. Enrichment needs a Google Places key — add one on the Setup screen, or set GOOGLE_PLACES_API_KEY. Google is the only source of a website address, and the audit has nothing to read without one. It advances nobody — it only adds facts.",

  // survey panel
  "map.survey.title": "Survey",
  "map.survey.running": "Survey running",
  "map.survey.progress": "Page {page} · {found} businesses read · {created} new",
  "map.survey.progressOf":
    "Page {page} of ~{pages} · {found} businesses read · {created} new",
  "map.survey.gauge": "Progress",
  "map.survey.requests": "{n} calls made",
  "map.survey.outside": "{n} outside the drawn shape",
  "map.survey.saturated":
    "The sector saturates the API’s 10 000 results: some are missing, and we do not know how many. Cut it smaller.",
  "map.survey.truncated": "A ceiling cut the survey short: businesses are missing.",
  "map.survey.stop": "Stop",
  "map.survey.resume": "Resume page {n}",

  // enrichment panel
  "map.enrichment.title": "Enrichment",
  "map.enrichment.progress": "{enriched} enriched · {remaining} remaining",
  "map.enrichment.unreachable": "{n} with nothing to query",
  "map.enrichment.purged": "{n} purged (30 days)",

  // the hold banner names its ground
  "map.hold.thisSector": "this sector",
  "map.hold.thisView": "this view",

  // floating preview
  "map.preview.aria": "{name}, preview",
  "map.preview.close": "Close the preview",
  "map.preview.noAddress": "Address not recorded",
  "map.preview.loot": "Spoils",
  "map.preview.resistance": "Resistance",
  "map.preview.open": "Open the record",

  // daily front
  "front.title": "Today",
  "front.nothingToday": "nothing to do today",
  "front.empty":
    "Nothing waiting. Survey a sector, or mark the ones you have already seen.",
  "front.explain":
    "Where to start today, drawn from the whole territory — not from the current view. Ordered by commercial urgency: a late follow-up comes before a first call, even a cheaper one.",
  "front.offGrid": "Off-grid",
  "front.action.followUp": "Follow up",
  "front.action.call": "Call",
  "front.action.walkPast": "Walk past",
  "front.action.priceIt": "Price it",
  "front.count.followUp": "{n} to follow up",
  "front.count.call": "{n} to call",
  "front.count.walkPast": "{n} to walk past",
  "front.count.priceIt": "{n} to price",
  "front.reason.engagedNoTrace": "engaged, no trace of contact",
  "front.reason.followupDue": "follow-up due for {n} d",
  "front.reason.resistance": "resistance {p} %",
  // pass-through for scoring text, rendered verbatim in both languages
  "front.reason.verbatim": "{reason}",
  "front.reason.offGridSeat": "seat reserved for off-grid",
} as const;

const fr: Record<keyof typeof en, string> = {
  "map.canvas.aria": "Carte du territoire",
  "map.cluster.label": "{n} commerces · {loot}",
  "map.price.offGrid": "hors grille",

  "map.error.open": "La carte n’a pas pu s’ouvrir : {message}",
  "map.error.openMachine": "La carte n’a pas pu s’ouvrir sur cette machine.",
  "map.fallback.title": "Pas de carte",
  "map.fallback.body":
    "Le territoire se lit alors en liste, triée par valeur espérée — les gestes sont exactement les mêmes.",
  "map.silent.title": "La carte ne peint rien",
  "map.silent.body":
    "Le fond de carte n’a rien affiché après {seconds} secondes. Ce n’est pas une panne du territoire : les commerces sont bien lus, seule leur mise en carte manque. Un vieux pilote graphique, un réseau qui bloque les tuiles ou un navigateur restreint suffit.",
  "map.silent.neverAnswered": "Le fond de carte n’a jamais répondu sur cette machine.",
  "map.silent.switchToList": "Passer à la liste",
  "map.silent.keepWaiting": "Continuer d’attendre",

  "map.rail.aria": "Panneau latéral",
  "map.rail.sectors": "Secteurs",
  "map.rail.businesses": "Commerces",
  "map.rail.openAria": "Ouvrir le panneau latéral",
  "map.rail.closeAria": "Fermer le panneau latéral",

  "map.search.aria":
    "Chercher dans cette zone — lire les commerces de la vue actuelle",
  "map.search.label": "Chercher dans cette zone",
  "map.search.searching": "Recherche…",

  "map.menu.aria": "Réglages et compte",
  "map.menu.sectorSettings": "Réglages de secteur",
  "map.menu.pricing": "Tarifs",
  "map.menu.setup": "Configuration",

  "map.draw.aria": "Tracer un secteur",
  "map.draw.cancelAria": "Annuler le tracé (Échap)",
  "map.draw.hint":
    "Faites glisser pour tracer un rectangle. {max} km² au plus, sinon l’API sature ses 10 000 résultats et renvoie un secteur incomplet sans le dire.",
  "map.draw.tooSmall": "Rectangle trop petit. Faites glisser pour tracer un secteur.",
  "map.draw.tooLarge":
    "{area} km² : au-delà de {max} km², la récolte renverrait un secteur incomplet sans le dire. Découpez-le plus petit.",
  "map.badge.area": "{area} km²",
  "map.badge.refused": "{area} km² — au-delà de {max} km², la récolte est refusée",
  "map.badge.refusedCumulative":
    "{area} km² — le total atteindrait {total} km² (limite : {max} km²)",
  "map.draw.cumulative":
    "Limite cumulée atteinte : vous avez récolté {done} km² ce mois-ci. Ajouter {area} km² porterait le total à {total} km² (limite : {max} km²).",
  "map.draw.hintQuota":
    "Faites glisser pour tracer un rectangle. {max} km² par secteur, {total} km² au total par mois ({done} km² déjà récoltés).",
  "map.drawing.sr": "Tracé en cours. Échap pour annuler.",
  "map.sector.unnamed": "Secteur sans nom",

  "map.settings.activities": "Activités interrogées",
  "map.settings.sectorName": "Nom du secteur",
  "map.settings.sectorNamePlaceholder": "Centre-ville",
  "map.enrich.start": "Enrichir ce cadre",
  "map.enrich.running": "Enrichissement…",
  "map.enrich.explain":
    "Google d’abord, puis l’audit de site maison. L’enrichissement demande une clé Google Places — ajoutez-la sur l’écran Configuration, ou définissez GOOGLE_PLACES_API_KEY. Google est la seule source d’adresse de site web, et sans elle l’audit n’a rien à lire. Il ne fait avancer personne — il ajoute seulement des faits.",

  "map.survey.title": "Récolte",
  "map.survey.running": "Récolte en cours",
  "map.survey.progress": "Page {page} · {found} commerces lus · {created} nouveaux",
  "map.survey.progressOf":
    "Page {page} sur ~{pages} · {found} commerces lus · {created} nouveaux",
  "map.survey.gauge": "Progression",
  "map.survey.requests": "{n} appels effectués",
  "map.survey.outside": "{n} hors du tracé",
  "map.survey.saturated":
    "Le secteur sature les 10 000 résultats de l’API : il en manque, sans qu’on sache combien. Découpez-le plus petit.",
  "map.survey.truncated": "Un plafond a écourté la récolte : des commerces manquent.",
  "map.survey.stop": "Arrêter",
  "map.survey.resume": "Reprendre la page {n}",

  "map.enrichment.title": "Enrichissement",
  "map.enrichment.progress": "{enriched} enrichies · {remaining} restantes",
  "map.enrichment.unreachable": "{n} sans rien à interroger",
  "map.enrichment.purged": "{n} purgées (30 jours)",

  "map.hold.thisSector": "ce secteur",
  "map.hold.thisView": "cette vue",

  "map.preview.aria": "{name}, aperçu",
  "map.preview.close": "Fermer l’aperçu",
  "map.preview.noAddress": "Adresse non relevée",
  "map.preview.loot": "Butin",
  "map.preview.resistance": "Résistance",
  "map.preview.open": "Ouvrir la fiche",

  "front.title": "Aujourd’hui",
  "front.nothingToday": "rien à faire aujourd’hui",
  "front.empty":
    "Rien en attente. Récoltez un secteur, ou marquez les commerces déjà vus.",
  "front.explain":
    "Par où commencer aujourd’hui, tiré de tout le territoire — pas de la vue actuelle. Trié par urgence commerciale : une relance en retard passe avant un premier appel, même moins cher.",
  "front.offGrid": "Hors grille",
  "front.action.followUp": "Relancer",
  "front.action.call": "Appeler",
  "front.action.walkPast": "Passer devant",
  "front.action.priceIt": "Chiffrer",
  "front.count.followUp": "{n} à relancer",
  "front.count.call": "{n} à appeler",
  "front.count.walkPast": "{n} à passer devant",
  "front.count.priceIt": "{n} à chiffrer",
  "front.reason.engagedNoTrace": "engagée, aucune trace de contact",
  "front.reason.followupDue": "relance attendue depuis {n} j",
  "front.reason.resistance": "résistance {p} %",
  "front.reason.verbatim": "{reason}",
  "front.reason.offGridSeat": "place réservée au hors grille",
};

export const map = { en, fr };
