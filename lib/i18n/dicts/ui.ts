// The shared primitives in `components/ui/`: provenance registry, difficulty,
// facts, hold, loot, stamp, theme toggle.

const en = {
  "source.sirene.name": "recherche-entreprises",
  "source.sirene.what":
    "The public company registry (SIRENE), through recherche-entreprises.api.gouv.fr. " +
    "Free, no key, and the only source used while surveying a sector.",
  "source.google.name": "Google Places",
  "source.google.what":
    "Rating, reviews, phone, website address, opening hours and price level. " +
    "Fetched by enrichment only, and purged after 30 days — terms of service.",
  "source.audit.name": "In-house site audit",
  "source.audit.what":
    "The storefront read directly, page by page: HTTPS, mobile viewport, title, " +
    "structured data, default theme, sitemap, photos, agency credit.",
  "source.log.name": "Your log",
  "source.log.what":
    "What you recorded on the ground, dated. Never computed, never rewritten, " +
    "never retroactive.",
  "source.computed.name": "Computed here",
  "source.computed.what":
    "Not a measurement: derived from the facts above by the price grid and the " +
    "scoring, and shown factor by factor so it can be checked by hand.",
  "ui.source.sr": "Source: {name}",
  "ui.band.easy": "Easy",
  "ui.band.approachable": "Approachable",
  "ui.band.solid": "Solid",
  "ui.band.hard": "Hard",
  "ui.band.impregnable": "Impregnable",
  "ui.difficulty.resistance": "Resistance",
  "ui.difficulty.odds": "Odds",
  "ui.difficulty.computedFrom": "Computed from {available} of {total} facts",
  "ui.difficulty.notCalibrated": "Estimate not calibrated (n = {n})",
  "ui.difficulty.gaugeLabel": "Resistance: {value}, {band}",
  "ui.fact.srNotRecorded": "{name}: not recorded",
  "ui.fact.srScore": "{name}: {value} out of 100",
  "ui.fact.notRecorded": "Not recorded — excluded from the calculation.",
  "ui.fact.stale": "to refresh",
  "ui.hold.badge": "Hold",
  "ui.hold.srHold": " hold on {sector}",
  "ui.hold.srNotSurveyed": ", sector {sector} not surveyed yet",
  "ui.hold.gaugeLabel": "Hold on {sector}",
  "ui.hold.detail": "{captures} taken of {surveyed} surveyed",
  "ui.hold.notSurveyed": "Sector not surveyed yet",
  "ui.loot.offGrid": "Off-grid",
  "ui.loot.offGridReason":
    "The work goes beyond the default offer: to price by hand.",
  "ui.loot.unknown": "amount unknown",
  "ui.loot.notPriced": "Not priced",
  "ui.loot.included": "incl.",
  "ui.loot.perMonth": "/month",
  "ui.stamp.taken": "Taken",
  "ui.stamp.withdrawn": "Withdrawn",
  "ui.stamp.outOfPlay": "Spoils out of play",
  "ui.stamp.unchanged": "{sector} unchanged, {value}",
  "ui.stamp.close": "Close",
  "ui.theme.toLight": "Switch to the light theme",
  "ui.theme.toDark": "Switch to the dark theme",
  "ui.theme.light": "Light",
  "ui.theme.dark": "Dark",
} as const;

const fr: Record<keyof typeof en, string> = {
  "source.sirene.name": "recherche-entreprises",
  "source.sirene.what":
    "Le registre public des entreprises (SIRENE), via recherche-entreprises.api.gouv.fr. " +
    "Gratuit, sans clé, et la seule source utilisée pendant le relevé d’un secteur.",
  "source.google.name": "Google Places",
  "source.google.what":
    "Note, avis, téléphone, adresse du site, horaires d’ouverture et niveau de prix. " +
    "Récupérés uniquement à l’enrichissement, et purgés après 30 jours — conditions d’utilisation.",
  "source.audit.name": "Audit du site en interne",
  "source.audit.what":
    "La vitrine lue directement, page par page : HTTPS, viewport mobile, titre, " +
    "données structurées, thème par défaut, sitemap, photos, crédit d’agence.",
  "source.log.name": "Votre journal",
  "source.log.what":
    "Ce que vous avez relevé sur le terrain, daté. Jamais calculé, jamais réécrit, " +
    "jamais rétroactif.",
  "source.computed.name": "Calculé ici",
  "source.computed.what":
    "Pas une mesure : dérivé des faits ci-dessus par la grille tarifaire et le " +
    "score, et présenté facteur par facteur pour pouvoir être vérifié à la main.",
  "ui.source.sr": "Source : {name}",
  "ui.band.easy": "Facile",
  "ui.band.approachable": "Abordable",
  "ui.band.solid": "Solide",
  "ui.band.hard": "Difficile",
  "ui.band.impregnable": "Imprenable",
  "ui.difficulty.resistance": "Résistance",
  "ui.difficulty.odds": "Chances",
  "ui.difficulty.computedFrom": "Calculé à partir de {available} faits sur {total}",
  "ui.difficulty.notCalibrated": "Estimation non calibrée (n = {n})",
  "ui.difficulty.gaugeLabel": "Résistance : {value}, {band}",
  "ui.fact.srNotRecorded": "{name} : non relevé",
  "ui.fact.srScore": "{name} : {value} sur 100",
  "ui.fact.notRecorded": "Non relevé — exclu du calcul.",
  "ui.fact.stale": "à rafraîchir",
  "ui.hold.badge": "Emprise",
  "ui.hold.srHold": " d’emprise sur {sector}",
  "ui.hold.srNotSurveyed": ", secteur {sector} pas encore relevé",
  "ui.hold.gaugeLabel": "Emprise sur {sector}",
  "ui.hold.detail": "{captures} prises sur {surveyed} relevées",
  "ui.hold.notSurveyed": "Secteur pas encore relevé",
  "ui.loot.offGrid": "Hors grille",
  "ui.loot.offGridReason":
    "Le chantier dépasse l’offre par défaut : à chiffrer à la main.",
  "ui.loot.unknown": "montant inconnu",
  "ui.loot.notPriced": "Non chiffré",
  "ui.loot.included": "dont",
  "ui.loot.perMonth": "/mois",
  "ui.stamp.taken": "Prise",
  "ui.stamp.withdrawn": "Retirée",
  "ui.stamp.outOfPlay": "Butin hors jeu",
  "ui.stamp.unchanged": "{sector} inchangé, {value}",
  "ui.stamp.close": "Fermer",
  "ui.theme.toLight": "Passer au thème clair",
  "ui.theme.toDark": "Passer au thème sombre",
  "ui.theme.light": "Clair",
  "ui.theme.dark": "Sombre",
};

export const ui = { en, fr };
