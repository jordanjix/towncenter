// The billing screen, the quota refusals and the Mollie checkout label.
// `fr` is typed against `en`: a missing or extra key fails `tsc`.

const en = {
  "billing.metaTitle": "Billing · Towncenter",
  "billing.title": "Billing",
  "billing.back": "Back to the map",
  "billing.notice.checkout":
    "The checkout could not be created. Try again, or come back later.",
  "billing.notice.cancel":
    "The cancellation did not go through. Try again, or come back later.",
  "billing.notice.terms":
    "Confirm the professional-use terms before starting the trial.",
  "billing.notice.canceled":
    "Subscription canceled. Access stays open until the paid period ends.",
  "billing.selfHosted.title": "Self-hosted instance",
  "billing.selfHosted.before": "Billing is not enabled here: no",
  "billing.selfHosted.after":
    ", no subscription, and no quota — every limit below is off. This screen only does something on the hosted service.",
  "billing.status.pendingCheckout":
    "Checkout started but never completed. Start the trial to finish it.",
  "billing.status.noCard":
    "No card on file yet. The trial starts the moment one is — nothing is charged today.",
  "billing.status.trialCanceledUntil":
    "Trial canceled — access stays open until {date}, and nothing will ever be charged.",
  "billing.status.trialCanceled": "Trial canceled.",
  "billing.status.trialRunningUntil":
    "Trial running — the first payment of €{price} goes out on {date}. Cancel before then and nothing is charged.",
  "billing.status.trialRunning": "Trial running.",
  "billing.status.expired":
    "The trial or subscription has ended. Everything surveyed stays readable; subscribe to keep going.",
  "billing.status.activeUntil": "Active — renews on {date}.",
  "billing.status.active": "Active.",
  "billing.status.canceledUntil": "Canceled — access stays open until {date}.",
  "billing.status.canceled": "Canceled.",
  "billing.status.suspended":
    "A renewal payment failed and the subscription is suspended. Subscribe again to set up a new mandate.",
  "billing.status.completed":
    "The subscription ran its course. Subscribe again to continue.",
  "billing.testMode":
    "Test mode: payments go through Mollie’s sandbox, no real card is charged.",
  "billing.trialLine":
    "{days}-day free trial — card required, nothing charged until it ends.",
  "billing.perMonth": "/month",
  "billing.limits.harvested": "{n} businesses harvested",
  "billing.limits.enrichments": "{n} Google Places enrichments",
  "billing.limits.audits": "{n} site audits",
  "billing.limits.totalSurface": "{n} km² total surface",
  "billing.limits.perZone": "{n} km² per zone",
  "billing.subscription.title": "Your subscription",
  "billing.usage":
    "{usedKm2} of {maxKm2} km² surveyed {scope} · {harvestUsed} of {harvestLimit} businesses · {enrichUsed} of {enrichLimit} enrichments · {auditUsed} of {auditLimit} audits",
  "billing.usage.thisPeriod": "this period",
  "billing.usage.soFar": "so far",
  "billing.terms.before":
    "I am subscribing for professional use and accept the",
  "billing.terms.link": "terms of service",
  "billing.terms.after": ".",
  "billing.cta.startTrial": "Start the {days}-day free trial",
  "billing.cta.subscribe": "Subscribe — €{price}/month",
  "billing.cta.cancelTrial": "Cancel the trial",
  "billing.cta.cancelSubscription": "Cancel the subscription",
  "billing.note.cardFirst":
    "A card is required to start the trial — €0.00 today, and the first payment only once the trial ends.",
  "billing.note.mollie":
    "Payments are handled by Mollie. Cancel any time — access stays open until the end of the paid period and your existing data stays readable.",
  "billing.checkout.description": "Towncenter {plan} — card setup",
  "billing.quota.startTrial":
    "Start your free trial on the Billing screen to begin surveying.",
  "billing.quota.expired":
    "Your trial or subscription has ended. Subscribe on the Billing screen to keep going — everything already surveyed stays readable.",
  "billing.quota.reached":
    "Quota reached: {used} of {limit} {label} this period. Manage your plan on the Billing screen.",
  "billing.quota.kind.harvest": "businesses harvested",
  "billing.quota.kind.enrich": "Google enrichments",
  "billing.quota.kind.audit": "site audits",
  "billing.quota.kind.area": "km² surveyed",
  "billing.quota.cumulativeArea":
    "Cumulative limit reached: {cumulative} km² already surveyed this period. Adding {area} km² would reach {total} km² (limit: {limit} km²). Manage your plan on the Billing screen.",
} as const;

const fr: Record<keyof typeof en, string> = {
  "billing.metaTitle": "Facturation · Towncenter",
  "billing.title": "Facturation",
  "billing.back": "Retour à la carte",
  "billing.notice.checkout":
    "Le paiement n’a pas pu être créé. Réessayez, ou revenez plus tard.",
  "billing.notice.cancel":
    "La résiliation n’a pas abouti. Réessayez, ou revenez plus tard.",
  "billing.notice.terms":
    "Confirmez les conditions d’usage professionnel avant de démarrer l’essai.",
  "billing.notice.canceled":
    "Abonnement résilié. L’accès reste ouvert jusqu’à la fin de la période payée.",
  "billing.selfHosted.title": "Instance auto-hébergée",
  "billing.selfHosted.before": "La facturation n’est pas activée ici : pas de",
  "billing.selfHosted.after":
    ", pas d’abonnement, pas de quota — toutes les limites ci-dessous sont désactivées. Cet écran n’a d’effet que sur le service hébergé.",
  "billing.status.pendingCheckout":
    "Paiement commencé mais jamais terminé. Démarrez l’essai pour le finaliser.",
  "billing.status.noCard":
    "Aucune carte enregistrée pour l’instant. L’essai démarre dès qu’une carte l’est — rien n’est débité aujourd’hui.",
  "billing.status.trialCanceledUntil":
    "Essai résilié — l’accès reste ouvert jusqu’au {date}, et rien ne sera jamais débité.",
  "billing.status.trialCanceled": "Essai résilié.",
  "billing.status.trialRunningUntil":
    "Essai en cours — le premier paiement de {price} € part le {date}. Résiliez avant cette date et rien n’est débité.",
  "billing.status.trialRunning": "Essai en cours.",
  "billing.status.expired":
    "L’essai ou l’abonnement est terminé. Tout ce qui a été relevé reste lisible ; abonnez-vous pour continuer.",
  "billing.status.activeUntil": "Actif — se renouvelle le {date}.",
  "billing.status.active": "Actif.",
  "billing.status.canceledUntil":
    "Résilié — l’accès reste ouvert jusqu’au {date}.",
  "billing.status.canceled": "Résilié.",
  "billing.status.suspended":
    "Un paiement de renouvellement a échoué et l’abonnement est suspendu. Abonnez-vous à nouveau pour établir un nouveau mandat.",
  "billing.status.completed":
    "L’abonnement est arrivé à son terme. Abonnez-vous à nouveau pour continuer.",
  "billing.testMode":
    "Mode test : les paiements passent par le bac à sable de Mollie, aucune carte réelle n’est débitée.",
  "billing.trialLine":
    "{days} jours d’essai gratuit — carte requise, rien n’est débité avant la fin.",
  "billing.perMonth": "/mois",
  "billing.limits.harvested": "{n} commerces récoltés",
  "billing.limits.enrichments": "{n} enrichissements Google Places",
  "billing.limits.audits": "{n} audits de site",
  "billing.limits.totalSurface": "{n} km² de surface totale",
  "billing.limits.perZone": "{n} km² par zone",
  "billing.subscription.title": "Votre abonnement",
  "billing.usage":
    "{usedKm2} km² relevés sur {maxKm2} {scope} · {harvestUsed} commerces sur {harvestLimit} · {enrichUsed} enrichissements sur {enrichLimit} · {auditUsed} audits sur {auditLimit}",
  "billing.usage.thisPeriod": "cette période",
  "billing.usage.soFar": "jusqu’ici",
  "billing.terms.before":
    "Je m’abonne pour un usage professionnel et j’accepte les",
  "billing.terms.link": "conditions d’utilisation",
  "billing.terms.after": ".",
  "billing.cta.startTrial": "Démarrer l’essai gratuit de {days} jours",
  "billing.cta.subscribe": "S’abonner — {price} €/mois",
  "billing.cta.cancelTrial": "Résilier l’essai",
  "billing.cta.cancelSubscription": "Résilier l’abonnement",
  "billing.note.cardFirst":
    "Une carte est requise pour démarrer l’essai — 0,00 € aujourd’hui, et le premier paiement seulement à la fin de l’essai.",
  "billing.note.mollie":
    "Les paiements sont gérés par Mollie. Résiliez à tout moment — l’accès reste ouvert jusqu’à la fin de la période payée et vos données existantes restent lisibles.",
  "billing.checkout.description": "Towncenter {plan} — enregistrement de la carte",
  "billing.quota.startTrial":
    "Démarrez votre essai gratuit sur l’écran Facturation pour commencer à relever.",
  "billing.quota.expired":
    "Votre essai ou votre abonnement est terminé. Abonnez-vous sur l’écran Facturation pour continuer — tout ce qui a déjà été relevé reste lisible.",
  "billing.quota.reached":
    "Quota atteint : {used} {label} sur {limit} cette période. Gérez votre formule sur l’écran Facturation.",
  "billing.quota.kind.harvest": "commerces récoltés",
  "billing.quota.kind.enrich": "enrichissements Google",
  "billing.quota.kind.audit": "audits de site",
  "billing.quota.kind.area": "km² relevés",
  "billing.quota.cumulativeArea":
    "Limite cumulée atteinte : {cumulative} km² déjà relevés cette période. Ajouter {area} km² porterait le total à {total} km² (limite : {limit} km²). Gérez votre formule sur l’écran Facturation.",
};

export const billing = { en, fr };
