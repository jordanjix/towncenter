// The target sheet, the business list and the sectors panel.
// `fr` is typed against `en`: a missing or extra key fails `tsc`.

const en = {
  "sheet.tab.approach": "Approach",
  "sheet.tab.facts": "Facts",
  "sheet.tab.log": "Log",
  "sheet.aria.record": "Record for {name}",
  "sheet.aria.close": "Close the record",
  "sheet.aria.sections": "Record sections",
  "sheet.addressUnknown": "Address unknown",

  "sheet.loot.label": "Spoils over 12 months",
  "sheet.head.breakdown":
    "{price} on signature, then {recurring} a month for twelve months.",
  "sheet.head.toCalculation": "How this figure is built ›",
  "sheet.head.restore": "Put back in play",

  "sheet.offgrid.title": "Off-grid.",
  "sheet.offgrid.body":
    "These are not zero-euro targets: they are the ones where the work goes beyond the default offer. They are priced by hand, after a visit.",

  "sheet.step.undo": "undo",
  "sheet.step.undoFact": "undo this fact",

  "sheet.state.withdrawn":
    "Withdrawn. The spoils are out of play. Only a signature puts it back.",
  "sheet.state.dismissed":
    "Set aside: out of play, never deleted. The log stays intact.",
  "sheet.state.taken": "Taken. It becomes a reference for the whole street.",
  "sheet.state.takenOn":
    "Taken on {date}. It becomes a reference for the whole street.",

  "sheet.offer": "Offer retained: {label}.",
  "sheet.exits": "Exits",
  "sheet.setAside": "Set aside",
  "sheet.cancel": "Cancel",

  "sheet.undo.title": "Undo the last fact?",
  "sheet.undo.line": "{event} on {date}",
  "sheet.undo.warning": "This action cannot be undone.",
  "sheet.undo.keep": "Keep",
  "sheet.undo.erase": "Erase this fact",

  "sheet.take.title": "Record the take?",
  "sheet.take.amountLabel": "Amount actually signed",
  "sheet.take.amountPlaceholder": "3 500",
  "sheet.take.offgridHint": "Off-grid: no reference, the quote is what counts.",
  "sheet.take.gridHint": "The grid announced {amount} on signature.",
  "sheet.take.noteLabel": "What was said",
  "sheet.take.notePlaceholder": "Signed after Tuesday’s visit.",
  "sheet.take.submit": "Record the take",

  "sheet.withdraw.reasonLabel": "The reason, verbatim",
  "sheet.withdraw.placeholder": "Redesigned four months ago.",
  "sheet.withdraw.hint":
    "A withdrawal is a decision, not a defeat. It gets re-read in six months: write down what was said.",
  "sheet.withdraw.submit": "Record the withdrawal",

  "sheet.neighbours.title": "The neighbours, within 300 m",
  "sheet.neighbours.empty":
    "No surveyed business within walking distance. Survey the neighbourhood before calling: one reference you can point at while walking beats ten arguments.",

  "sheet.copy.button": "Copy as prompt",
  "sheet.copy.done": "Copied ✓",
  "sheet.copy.explain":
    "The Markdown brief is on the clipboard: identity, spoils, the five facts, the product of factors, the neighbours and the log. No personal contact details for any director are included.",
  "sheet.copy.refusedTitle": "Clipboard refused",
  "sheet.copy.refusedBody":
    "The browser did not grant clipboard access — that is what happens outside HTTPS. The brief is below, select it.",
  "sheet.copy.close": "Close",

  "sheet.facts.fetch": "Fetch the facts",
  "sheet.facts.refresh": "Refresh the facts",
  "sheet.facts.title": "The five facts",
  "sheet.facts.recordedOn": "recorded on {date}",
  "sheet.facts.noZero":
    "A statistic with no data is not a zero: it is excluded from the calculation, and the note under the arc says how many facts it was built on.",
  "sheet.facts.purged":
    "Google facts purged — past 30 days. Refresh to get them back.",

  "sheet.field.resurvey":
    "Nothing recorded. Only a re-survey of the sector could bring it in.",
  "sheet.field.save": "Save",
  "sheet.field.websitePlaceholder": "boulangerie-durand.fr",
  "sheet.field.phonePlaceholder": "01 99 00 00 00",

  "sheet.record.title": "The record",
  "sheet.record.summary":
    "All {total} fields · {filled} recorded · {empty} empty",

  "sheet.calc.title": "Where this figure comes from",
  "sheet.calc.raw":
    "Raw product {value} odds, clamped then rounded to the nearest 5",
  "sheet.calc.resistance": "Resistance = 100 − {percent}, that is {band}",
  "sheet.calc.clampNote":
    "The product is clamped between 2 % and 85 % odds before rounding: an estimate built on a handful of facts does not have three significant digits, and showing three would be a promise we cannot keep.",

  "sheet.sources.title": "Where all of this comes from",
  "sheet.sources.note":
    "Only the sources this record actually uses are listed. A missing one is not a gap in the product: it is an enrichment that has not run, or a fact nobody has written down yet.",

  "sheet.log.title": "The log",
  "sheet.log.empty": "Nothing has been said yet.",
  "sheet.log.note": "Plain text: what was said, and when.",

  "list.sort.expectancy": "Expected value",
  "list.sort.loot": "Loot",
  "list.sort.odds": "Odds",
  "list.sort.resistance": "Resistance",
  "list.sort.name": "Name",
  "list.sort.surveyed": "Surveyed",
  "list.toolbar.sortBy": "Sort by",
  "list.toolbar.sortAria": "Sort by {label}, {dir}",
  "list.toolbar.highestFirst": "Highest first",
  "list.toolbar.lowestFirst": "Lowest first",
  "list.toolbar.highestFirstLower": "highest first",
  "list.toolbar.lowestFirstLower": "lowest first",
  "list.toolbar.filter": "Filter",
  "list.toolbar.filterAria": "Filter by state, {shown} of {total} shown",
  "list.toolbar.show": "Show",
  "list.offgrid.chip": "Off-grid",
  "list.sr.resistance": "resistance, {band}",
  "list.empty": "No business in this frame. Draw a sector and run the survey.",
  "list.offgrid.title": "Off-grid · to price by hand",
  "list.offgrid.body":
    "The work goes beyond the default offer, so no amount is announced. These are not zero-euro targets — they are the ones worth going to see.",
  "list.rest.one":
    "{n} more business in this frame, not shown here. Tighten the view.",
  "list.rest.many":
    "{n} more businesses in this frame, not shown here. Tighten the view.",
  "list.cut":
    "The read was cut at its ceiling. The spoils shown are therefore a floor.",
  "list.cutTotal":
    "The read was cut at its ceiling: {n} businesses in the frame. The spoils shown are therefore a floor.",

  "sector.of": "Sector of {date}",
  "sector.unnamed": "Unnamed sector",
  "sector.title": "Sectors",
  "sector.draw": "Draw",
  "sector.draw.armed": "Drawing armed",

  "sector.discipline": "Discipline",
  "sector.rule.body":
    "You set yourself a rule: finish one sector before opening another.",
  "sector.rule.progress":
    "{name} — {approached} / {surveyed} approached, that is {percent}. Target {target}.",
  "sector.rule.gauge": "Progress toward the rule",
  "sector.rule.lift": "Lift the rule",
  "sector.rule.lifted":
    "Rule lifted for this session. It is a deliberate cheat, and it is written here.",

  "sector.empty":
    "No sector surveyed yet. Draw a rectangle on the map: it fills with every real business inside it.",
  "sector.running": "Survey running",
  "sector.interrupted": "Survey interrupted",
  "sector.opening": "Opening the sector…",
  "sector.progress.page": "Page {page}",
  "sector.progress.pageOf": "Page {page} of ~{total}",
  "sector.progress.read.one": "business read",
  "sector.progress.read.many": "businesses read",
  "sector.progress.new.one": "{n} new",
  "sector.progress.new.many": "{n} new",

  "sector.hold.gauge": "Hold on {name}",
  "sector.figures": "Hold {hold} · {surveyed} · {taken}",
  "sector.word.surveyed.one": "surveyed",
  "sector.word.surveyed.many": "surveyed",
  "sector.word.taken.one": "taken",
  "sector.word.taken.many": "taken",
  "sector.notSurveyed": "Not surveyed yet",
  "sector.takenHere": "{amount} taken here",

  "sector.rename.title": "Rename {name}",
  "sector.rename.label": "Sector name",
  "sector.rename.placeholder": "Centre-ville",
  "sector.rename.hint":
    "Clearing the field erases the name: the sector goes back to its date.",
  "sector.rename.submit": "Rename",

  "sector.word.business.one": "business",
  "sector.word.business.many": "businesses",
  "sector.word.otherBusiness.one": "other business",
  "sector.word.otherBusiness.many": "other businesses",

  "sector.delete.button": "Delete",
  "sector.delete.title": "Delete this sector?",
  "sector.delete.body":
    "This erases {name} itself, and every business found inside it.",
  "sector.delete.surveyed.one":
    "{count}, along with its notes, stage and full history, will be gone for good.",
  "sector.delete.surveyed.many":
    "{count}, along with their notes, stage and full history, will be gone for good.",
  "sector.delete.none": "There are no businesses recorded here yet.",
  "sector.delete.worth": ", worth {amount}",
  "sector.delete.captures.one": "Among them, {count} marked taken here{worth}.",
  "sector.delete.captures.many": "Among them, {count} marked taken here{worth}.",
  "sector.delete.approached.one":
    "{count} already approached will go with it.",
  "sector.delete.approached.many":
    "{count} already approached will go with it.",
  "sector.delete.warning": "This cannot be undone.",
  "sector.delete.keep": "Keep",
  "sector.delete.submit": "Delete permanently",
} as const;

const fr: Record<keyof typeof en, string> = {
  "sheet.tab.approach": "Approche",
  "sheet.tab.facts": "Faits",
  "sheet.tab.log": "Journal",
  "sheet.aria.record": "Fiche de {name}",
  "sheet.aria.close": "Fermer la fiche",
  "sheet.aria.sections": "Sections de la fiche",
  "sheet.addressUnknown": "Adresse inconnue",

  "sheet.loot.label": "Butin sur 12 mois",
  "sheet.head.breakdown":
    "{price} à la signature, puis {recurring} par mois pendant douze mois.",
  "sheet.head.toCalculation": "Comment ce chiffre est construit ›",
  "sheet.head.restore": "Remettre en jeu",

  "sheet.offgrid.title": "Hors grille.",
  "sheet.offgrid.body":
    "Ce ne sont pas des cibles à zéro euro : ce sont celles où le travail dépasse l’offre par défaut. Elles se chiffrent à la main, après une visite.",

  "sheet.step.undo": "annuler",
  "sheet.step.undoFact": "annuler ce fait",

  "sheet.state.withdrawn":
    "Retirée. Le butin est hors jeu. Seule une signature le remet en jeu.",
  "sheet.state.dismissed":
    "Écartée : hors jeu, jamais supprimée. Le journal reste intact.",
  "sheet.state.taken":
    "Prise. Elle devient une référence pour toute la rue.",
  "sheet.state.takenOn":
    "Prise le {date}. Elle devient une référence pour toute la rue.",

  "sheet.offer": "Offre retenue : {label}.",
  "sheet.exits": "Sorties",
  "sheet.setAside": "Écarter",
  "sheet.cancel": "Annuler",

  "sheet.undo.title": "Annuler le dernier fait ?",
  "sheet.undo.line": "{event} le {date}",
  "sheet.undo.warning": "Cette action est irréversible.",
  "sheet.undo.keep": "Conserver",
  "sheet.undo.erase": "Effacer ce fait",

  "sheet.take.title": "Enregistrer la prise ?",
  "sheet.take.amountLabel": "Montant réellement signé",
  "sheet.take.amountPlaceholder": "3 500",
  "sheet.take.offgridHint":
    "Hors grille : pas de référence, c’est le devis qui compte.",
  "sheet.take.gridHint": "La grille annonçait {amount} à la signature.",
  "sheet.take.noteLabel": "Ce qui a été dit",
  "sheet.take.notePlaceholder": "Signé après la visite de mardi.",
  "sheet.take.submit": "Enregistrer la prise",

  "sheet.withdraw.reasonLabel": "La raison, mot pour mot",
  "sheet.withdraw.placeholder": "Site refait il y a quatre mois.",
  "sheet.withdraw.hint":
    "Un retrait est une décision, pas une défaite. Il se relit dans six mois : notez ce qui a été dit.",
  "sheet.withdraw.submit": "Enregistrer le retrait",

  "sheet.neighbours.title": "Les voisins, à moins de 300 m",
  "sheet.neighbours.empty":
    "Aucun commerce repéré à distance de marche. Repérez le quartier avant d’appeler : une référence que l’on montre en marchant vaut mieux que dix arguments.",

  "sheet.copy.button": "Copier comme prompt",
  "sheet.copy.done": "Copié ✓",
  "sheet.copy.explain":
    "Le brief Markdown est dans le presse-papiers : identité, butin, les cinq faits, le produit des facteurs, les voisins et le journal. Aucune coordonnée personnelle de dirigeant n’y figure.",
  "sheet.copy.refusedTitle": "Presse-papiers refusé",
  "sheet.copy.refusedBody":
    "Le navigateur n’a pas accordé l’accès au presse-papiers — c’est ce qui arrive hors HTTPS. Le brief est ci-dessous, sélectionnez-le.",
  "sheet.copy.close": "Fermer",

  "sheet.facts.fetch": "Récupérer les faits",
  "sheet.facts.refresh": "Rafraîchir les faits",
  "sheet.facts.title": "Les cinq faits",
  "sheet.facts.recordedOn": "relevé le {date}",
  "sheet.facts.noZero":
    "Une statistique sans donnée n’est pas un zéro : elle est exclue du calcul, et la note sous l’arc dit sur combien de faits il a été construit.",
  "sheet.facts.purged":
    "Faits Google purgés — plus de 30 jours. Rafraîchissez pour les retrouver.",

  "sheet.field.resurvey":
    "Rien de relevé. Seul un nouveau repérage du secteur pourrait le rapporter.",
  "sheet.field.save": "Enregistrer",
  "sheet.field.websitePlaceholder": "boulangerie-durand.fr",
  "sheet.field.phonePlaceholder": "01 99 00 00 00",

  "sheet.record.title": "La fiche",
  "sheet.record.summary":
    "Les {total} champs · {filled} renseignés · {empty} vides",

  "sheet.calc.title": "D’où vient ce chiffre",
  "sheet.calc.raw":
    "Produit brut {value} de chances, borné puis arrondi au multiple de 5 le plus proche",
  "sheet.calc.resistance": "Résistance = 100 − {percent}, soit {band}",
  "sheet.calc.clampNote":
    "Le produit est borné entre 2 % et 85 % de chances avant l’arrondi : une estimation construite sur une poignée de faits n’a pas trois chiffres significatifs, et en afficher trois serait une promesse que nous ne pouvons pas tenir.",

  "sheet.sources.title": "D’où vient tout cela",
  "sheet.sources.note":
    "Seules les sources que cette fiche utilise réellement sont listées. Une source absente n’est pas un trou dans le produit : c’est un enrichissement qui n’a pas tourné, ou un fait que personne n’a encore noté.",

  "sheet.log.title": "Le journal",
  "sheet.log.empty": "Rien n’a encore été dit.",
  "sheet.log.note": "Du texte brut : ce qui a été dit, et quand.",

  "list.sort.expectancy": "Espérance de gain",
  "list.sort.loot": "Butin",
  "list.sort.odds": "Chances",
  "list.sort.resistance": "Résistance",
  "list.sort.name": "Nom",
  "list.sort.surveyed": "Récolte",
  "list.toolbar.sortBy": "Trier par",
  "list.toolbar.sortAria": "Trier par {label}, {dir}",
  "list.toolbar.highestFirst": "Plus haut d’abord",
  "list.toolbar.lowestFirst": "Plus bas d’abord",
  "list.toolbar.highestFirstLower": "plus haut d’abord",
  "list.toolbar.lowestFirstLower": "plus bas d’abord",
  "list.toolbar.filter": "Filtrer",
  "list.toolbar.filterAria": "Filtrer par état, {shown} sur {total} affichés",
  "list.toolbar.show": "Afficher",
  "list.offgrid.chip": "Hors grille",
  "list.sr.resistance": "résistance, {band}",
  "list.empty":
    "Aucun commerce dans ce cadre. Tracez un secteur et lancez le repérage.",
  "list.offgrid.title": "Hors grille · à chiffrer à la main",
  "list.offgrid.body":
    "Le travail dépasse l’offre par défaut, donc aucun montant n’est annoncé. Ce ne sont pas des cibles à zéro euro — ce sont celles qui valent le déplacement.",
  "list.rest.one":
    "{n} commerce de plus dans ce cadre, non affiché ici. Resserrez la vue.",
  "list.rest.many":
    "{n} commerces de plus dans ce cadre, non affichés ici. Resserrez la vue.",
  "list.cut":
    "La lecture a été coupée à son plafond. Le butin affiché est donc un plancher.",
  "list.cutTotal":
    "La lecture a été coupée à son plafond : {n} commerces dans ce cadre. Le butin affiché est donc un plancher.",

  "sector.of": "Secteur du {date}",
  "sector.unnamed": "Secteur sans nom",
  "sector.title": "Secteurs",
  "sector.draw": "Tracer",
  "sector.draw.armed": "Tracé armé",

  "sector.discipline": "Discipline",
  "sector.rule.body":
    "Vous vous êtes fixé une règle : finir un secteur avant d’en ouvrir un autre.",
  "sector.rule.progress":
    "{name} — {approached} / {surveyed} approchés, soit {percent}. Objectif {target}.",
  "sector.rule.gauge": "Progression vers la règle",
  "sector.rule.lift": "Lever la règle",
  "sector.rule.lifted":
    "Règle levée pour cette session. C’est une entorse délibérée, et elle est écrite ici.",

  "sector.empty":
    "Aucun secteur récolté pour l’instant. Tracez un rectangle sur la carte : il se remplit de tous les commerces réels qu’il contient.",
  "sector.running": "Récolte en cours",
  "sector.interrupted": "Récolte interrompue",
  "sector.opening": "Ouverture du secteur…",
  "sector.progress.page": "Page {page}",
  "sector.progress.pageOf": "Page {page} sur ~{total}",
  "sector.progress.read.one": "commerce lu",
  "sector.progress.read.many": "commerces lus",
  "sector.progress.new.one": "{n} nouveau",
  "sector.progress.new.many": "{n} nouveaux",

  "sector.hold.gauge": "Emprise sur {name}",
  "sector.figures": "Emprise {hold} · {surveyed} · {taken}",
  "sector.word.surveyed.one": "repéré",
  "sector.word.surveyed.many": "repérés",
  "sector.word.taken.one": "pris",
  "sector.word.taken.many": "pris",
  "sector.notSurveyed": "Pas encore récolté",
  "sector.takenHere": "{amount} pris ici",

  "sector.rename.title": "Renommer {name}",
  "sector.rename.label": "Nom du secteur",
  "sector.rename.placeholder": "Centre-ville",
  "sector.rename.hint":
    "Vider le champ efface le nom : le secteur revient à sa date.",
  "sector.rename.submit": "Renommer",

  "sector.word.business.one": "commerce",
  "sector.word.business.many": "commerces",
  "sector.word.otherBusiness.one": "autre commerce",
  "sector.word.otherBusiness.many": "autres commerces",

  "sector.delete.button": "Supprimer",
  "sector.delete.title": "Supprimer ce secteur ?",
  "sector.delete.body":
    "Ceci efface {name} lui-même, et chaque commerce trouvé à l’intérieur.",
  "sector.delete.surveyed.one":
    "{count}, ainsi que ses notes, son étape et tout son historique, disparaîtra pour de bon.",
  "sector.delete.surveyed.many":
    "{count}, ainsi que leurs notes, leur étape et tout leur historique, disparaîtront pour de bon.",
  "sector.delete.none": "Aucun commerce n’est encore enregistré ici.",
  "sector.delete.worth": ", pour {amount}",
  "sector.delete.captures.one":
    "Parmi eux, {count} marqué pris ici{worth}.",
  "sector.delete.captures.many":
    "Parmi eux, {count} marqués pris ici{worth}.",
  "sector.delete.approached.one":
    "{count} déjà approché partira avec lui.",
  "sector.delete.approached.many":
    "{count} déjà approchés partiront avec lui.",
  "sector.delete.warning": "C’est irréversible.",
  "sector.delete.keep": "Conserver",
  "sector.delete.submit": "Supprimer définitivement",
};

export const sheet = { en, fr };
