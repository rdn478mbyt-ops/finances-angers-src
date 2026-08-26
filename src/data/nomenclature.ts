/** M57 au prochain budget — pas sur CA 2025 / DM n°1 / conseil du 27 mars 2026. */

export const M57_BANNER = "Passage M57 au prochain budget";

export const M57_BANNER_DETAIL =
  "CA 2025, DM n°1 et conseil du 27 mars 2026 : nomenclature des pièces.";

export const NOMENCLATURE_ACTES =
  "Nomenclature des pièces : chapitre 011, postes agrégés du rapport (personnel, subventions, charges générales, opérations d’équipement).";

export const NOMENCLATURE_BOA =
  "Budget annexe — instruction M4 (DOB 2026).";

export const fhesrAujourdhui = {
  badge: "Aujourd’hui",
  title: "Comptes 2025 et DM n°1",
  lead:
    "Ratios calculés sur les pièces publiées. Deux sections, deux entités. Chaque chiffre porte sa pièce et sa page.",
};

export const fhesrHorizon = {
  badge: "À venir",
  title: "Horizon du prochain budget",
  lead:
    "Les virements entre chapitres et le plan par politiques publiques sont un horizon de lecture — pas l’état des comptes 2025 ni de la DM n°1.",
  items: [
    {
      id: "virements-chapitres",
      label: "Virements entre chapitres",
      reading:
        "La souplesse des virements d’un chapitre à l’autre se lit au prochain budget. Rien n’est déduit des actes 2025, de la DM n°1 ni du conseil du 27 mars 2026.",
      missing: "Prochain budget — pièce de nomenclature future, pas les comptes 2025 / DM n°1.",
    },
    {
      id: "politiques-publiques",
      label: "Plan par politiques publiques",
      reading:
        "La présentation par politiques publiques n’est pas celle des rapports 2025 / DM n°1, qui agrègent des postes (personnel, subventions, chapitre 011, opérations d’équipement). Horizon du prochain budget.",
      missing: "Prochain budget — plan par politiques publiques non opposable aux comptes 2025.",
    },
  ],
} as const;
