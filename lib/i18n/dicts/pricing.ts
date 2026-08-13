// The pricing screen: grid editor, witness quote, reset, save errors.

const en = {
  "pricing.metaTitle": "Pricing · Towncenter",
  "pricing.title": "Pricing",
  "pricing.backToMap": "Back to the map",
  "pricing.witness.base": "A young shop · 12 reviews · no website · no usable photo",
  "pricing.witness.fullSite": "A typical shop · one address · 235 reviews · no website",
  "pricing.witness.multiPage": "A restaurant · a nine-page site, unreachable · 180 reviews",
  "pricing.witness.multiAddress": "A three-shop chain · one owner · no website",
  "pricing.witness.recurringBase": "A typical shop · one address · 235 reviews · no website",
  "pricing.field.base.tab": "Base",
  "pricing.field.base.label": "Base tier",
  "pricing.field.base.when":
    "One address, few reviews, no usable photo — the lowest deal you would sign.",
  "pricing.field.fullSite.tab": "Full site",
  "pricing.field.fullSite.label": "Full site",
  "pricing.field.fullSite.when":
    "One address, a site to build. The offer that sells most often, and the yardstick a target's dot size on the map is measured against.",
  "pricing.field.multiPage.tab": "Multi-page",
  "pricing.field.multiPage.label": "Multi-page site",
  "pricing.field.multiPage.when":
    "From six pages: detailed menu, forms, booking — a structure rather than a storefront.",
  "pricing.field.multiAddress.tab": "Multi-address",
  "pricing.field.multiAddress.label": "Multi-address site",
  "pricing.field.multiAddress.when":
    "Two to five addresses. The work changes in nature, not just in volume.",
  "pricing.field.recurringBase.tab": "Monthly",
  "pricing.field.recurringBase.label": "Monthly base",
  "pricing.field.recurringBase.when":
    "Hosting, domain, backups, small fixes. Deliberately low: it keeps the relationship open, it is not where the margin is.",
  "pricing.arrow.previous": "Previous: {label}",
  "pricing.arrow.next": "Next: {label}",
  "pricing.save": "Save the grid",
  "pricing.saving": "Saving…",
  "pricing.saved": "Saved. The map already follows.",
  "pricing.done.saved": "Grid saved",
  "pricing.done.notSaved": "Grid not saved",
  "pricing.done.follows": "Every price on the map already follows it.",
  "pricing.done.stay": "Stay here",
  "pricing.reset": "Reset",
  "pricing.resetting": "Resetting…",
  "pricing.witness.offGrid": "Off-grid",
  "pricing.witness.upkeep": "Hosting & upkeep, {months} months",
  "pricing.witness.worth": "Worth over {months} months",
  "pricing.witness.lastReadable":
    "Last readable grid — a field is empty or out of range.",
  "pricing.witness.matchesSaved": "Matches the saved grid.",
  "pricing.witness.deltaVsSaved": "{delta} vs saved",
  "pricing.witness.default": "default {amount}",
  "pricing.error.save": "Grid not saved. Try again.",
  "pricing.error.reset": "Grid not reset. Try again.",
  "pricing.form.euros": "Enter an amount in euros, e.g. 2000 or 2000.50.",
  "pricing.form.wholeNumber": "Enter a whole number.",
  "pricing.form.positiveDiscount": "Enter the discount as a positive amount.",
} as const;

const fr: Record<keyof typeof en, string> = {
  "pricing.metaTitle": "Tarifs · Towncenter",
  "pricing.title": "Tarifs",
  "pricing.backToMap": "Retour à la carte",
  "pricing.witness.base":
    "Une jeune boutique · 12 avis · pas de site web · aucune photo exploitable",
  "pricing.witness.fullSite":
    "Une boutique classique · une adresse · 235 avis · pas de site web",
  "pricing.witness.multiPage":
    "Un restaurant · un site de neuf pages, inaccessible · 180 avis",
  "pricing.witness.multiAddress":
    "Une chaîne de trois boutiques · un seul propriétaire · pas de site web",
  "pricing.witness.recurringBase":
    "Une boutique classique · une adresse · 235 avis · pas de site web",
  "pricing.field.base.tab": "Base",
  "pricing.field.base.label": "Palier de base",
  "pricing.field.base.when":
    "Une adresse, peu d’avis, aucune photo exploitable — la plus petite affaire que vous signeriez.",
  "pricing.field.fullSite.tab": "Site complet",
  "pricing.field.fullSite.label": "Site complet",
  "pricing.field.fullSite.when":
    "Une adresse, un site à construire. L’offre qui se vend le plus souvent, et l’étalon qui fixe la taille du point d’une cible sur la carte.",
  "pricing.field.multiPage.tab": "Multi-pages",
  "pricing.field.multiPage.label": "Site multi-pages",
  "pricing.field.multiPage.when":
    "À partir de six pages : menu détaillé, formulaires, réservation — une structure plutôt qu’une vitrine.",
  "pricing.field.multiAddress.tab": "Multi-adresses",
  "pricing.field.multiAddress.label": "Site multi-adresses",
  "pricing.field.multiAddress.when":
    "De deux à cinq adresses. Le travail change de nature, pas seulement de volume.",
  "pricing.field.recurringBase.tab": "Mensuel",
  "pricing.field.recurringBase.label": "Base mensuelle",
  "pricing.field.recurringBase.when":
    "Hébergement, domaine, sauvegardes, petites corrections. Volontairement bas : il garde la relation ouverte, ce n’est pas là que se fait la marge.",
  "pricing.arrow.previous": "Précédent : {label}",
  "pricing.arrow.next": "Suivant : {label}",
  "pricing.save": "Enregistrer la grille",
  "pricing.saving": "Enregistrement…",
  "pricing.saved": "Enregistré. La carte suit déjà.",
  "pricing.done.saved": "Grille enregistrée",
  "pricing.done.notSaved": "Grille non enregistrée",
  "pricing.done.follows": "Tous les prix de la carte la suivent déjà.",
  "pricing.done.stay": "Rester ici",
  "pricing.reset": "Réinitialiser",
  "pricing.resetting": "Réinitialisation…",
  "pricing.witness.offGrid": "Hors grille",
  "pricing.witness.upkeep": "Hébergement et entretien, {months} mois",
  "pricing.witness.worth": "Valeur sur {months} mois",
  "pricing.witness.lastReadable":
    "Dernière grille lisible — un champ est vide ou hors limites.",
  "pricing.witness.matchesSaved": "Identique à la grille enregistrée.",
  "pricing.witness.deltaVsSaved": "{delta} vs grille enregistrée",
  "pricing.witness.default": "par défaut {amount}",
  "pricing.error.save": "Grille non enregistrée. Réessayez.",
  "pricing.error.reset": "Grille non réinitialisée. Réessayez.",
  "pricing.form.euros":
    "Saisissez un montant en euros, par exemple 2000 ou 2000,50.",
  "pricing.form.wholeNumber": "Saisissez un nombre entier.",
  "pricing.form.positiveDiscount": "Saisissez la remise en montant positif.",
};

export const pricing = { en, fr };
