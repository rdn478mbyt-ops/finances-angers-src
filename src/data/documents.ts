import type { DocumentKind, DocumentStatus, Entity } from "./types";
import { NOMENCLATURE_ACTES, NOMENCLATURE_BOA } from "./nomenclature";

export type Piece = {
  id: string;
  title: string;
  entity: Entity;
  kind: DocumentKind;
  status: DocumentStatus;
  href?: string;
  file?: string;
  externalUrl?: string;
  code?: string;
  note?: string;
  session?: string;
  nomenclature?: string;
};

export const pieces: Piece[] = [
  {
    id: "del-2026-164",
    title: "Compte administratif 2025 — rapport de présentation (Ville + BOA, vote)",
    entity: "both",
    kind: "ca",
    status: "available",
    href: "/pieces/del-2026-164-ca-2025.pdf",
    file: "del-2026-164-ca-2025.pdf",
    externalUrl: "https://www.angers.fr/ressources_opendata/actes/156726.pdf",
    session: "Conseil municipal du 29 juin 2026",
    nomenclature: NOMENCLATURE_ACTES,
    note: "27 pages. Rapport de présentation et vote. Maquette de travail : 04. Maquette compte administratif 2025.",
  },
  {
    id: "del-2026-163",
    title: "Compte de gestion 2025 — approbation",
    entity: "both",
    kind: "gestion",
    status: "available",
    href: "/pieces/del-2026-163-compte-gestion-2025.pdf",
    file: "del-2026-163-compte-gestion-2025.pdf",
    externalUrl: "https://www.angers.fr/ressources_opendata/actes/156723.pdf",
    session: "Conseil municipal du 29 juin 2026",
    nomenclature: NOMENCLATURE_ACTES,
    note: "Acte d’approbation (2 pages). Comptes de gestion intégraux : 03. Compte de gestion Ville / BOA.",
  },
  {
    id: "del-2026-165",
    title: "Affectation du résultat 2025 (Ville + BOA)",
    entity: "both",
    kind: "ca",
    status: "available",
    href: "/pieces/del-2026-165-affectation-2025.pdf",
    file: "del-2026-165-affectation-2025.pdf",
    externalUrl: "https://www.angers.fr/ressources_opendata/actes/156724.pdf",
    session: "Conseil municipal du 29 juin 2026",
    nomenclature: NOMENCLATURE_ACTES,
  },
  {
    id: "del-2026-166",
    title: "Décision modificative n°1 — exercice 2026 (Ville + BOA)",
    entity: "both",
    kind: "dm",
    status: "available",
    href: "/pieces/del-2026-166-dm1-2026.pdf",
    file: "del-2026-166-dm1-2026.pdf",
    externalUrl: "https://www.angers.fr/ressources_opendata/actes/156725.pdf",
    session: "Conseil municipal du 29 juin 2026",
    nomenclature: NOMENCLATURE_ACTES,
    note: "3 pages. Maquettes : 06. Maquette DM n°1 (Ville) et 06. Maquette DM n°1 — BOA. Exercice 2026, distinct du CA 2025.",
  },
  {
    id: "del-2026-162",
    title: "Règlement budgétaire et financier — approbation",
    entity: "ville",
    kind: "rbf",
    status: "available",
    href: "/pieces/del-2026-162-rbf.pdf",
    file: "del-2026-162-rbf.pdf",
    externalUrl: "https://www.angers.fr/ressources_opendata/actes/156803.pdf",
    session: "Conseil municipal du 29 juin 2026",
    note: "Acte d’approbation (2 pages). Texte intégral : 02. Règlement budgétaire et financier.",
  },
  {
    id: "del-2026-2",
    title: "Débat d’orientation budgétaire 2026",
    entity: "ville",
    kind: "dob",
    status: "available",
    href: "/pieces/del-2026-2-dob-2026.pdf",
    file: "del-2026-2-dob-2026.pdf",
    externalUrl: "https://www.angers.fr/ressources_opendata/actes/152450.pdf",
    session: "Conseil municipal du 26 janvier 2026",
    nomenclature:
      "Rapport d’orientation 2026. Le DOB qualifie le BP (délais de débat) et la BOA d’instruction M4. Cet outil ne présente pas le CA 2025 / la DM n°1 comme déjà passés au prochain budget.",
    note: "Rapport DOB 20 pages, y compris PPI 2026-2028 annoncé au sommaire.",
  },
  {
    id: "liste-2026-06-29",
    title: "Liste des délibérations examinées — 29 juin 2026",
    entity: "conseil",
    kind: "liste",
    status: "available",
    href: "/pieces/2026-06-29-liste-deliberations.pdf",
    file: "2026-06-29-liste-deliberations.pdf",
    externalUrl:
      "https://www.angers.fr/fileadmin/plugin/tx_listconseil/2026.06.30_-_liste_des_deliberations_examinees.pdf",
  },
  {
    id: "cahier-2026-03-27",
    title: "Cahier des délibérations — 27 mars 2026 (publication presse)",
    entity: "conseil",
    kind: "delib",
    status: "available",
    href: "/pieces/2026-03-27-cahier-deliberations.pdf",
    file: "2026-03-27-cahier-deliberations.pdf",
    externalUrl:
      "https://presse.angers.fr/private/uploads/piecesjointes/cahier-des-deliberations-cm-2703.pdf",
    session: "Conseil municipal du 27 mars 2026 (installation)",
    nomenclature: "Conseil d’installation — hors maquette du prochain budget.",
  },
  {
    id: "cahier-2026-06-29",
    title: "Cahier des délibérations exécutoires — 29 juin 2026",
    entity: "conseil",
    kind: "delib",
    status: "external",
    externalUrl:
      "https://www.angers.fr/fileadmin/plugin/tx_listconseil/2026.07.02_-_a_publier_-_cahier_des_deliberations_executoires__anonymise_.pdf",
    note: "22 Mo, 139 pages. Conservé en lien officiel, non recopié dans le dépôt (volume).",
  },
  {
    id: "3a04-maquette-ca-ville",
    code: "04",
    title: "04. Maquette compte administratif 2025 — Ville",
    entity: "ville",
    kind: "ca",
    status: "available",
    href: "/pieces/04._Maquette_compte_administratif_2025.pdf",
    file: "04._Maquette_compte_administratif_2025.pdf",
    session: "Conseil municipal du 29 juin 2026",
    nomenclature: NOMENCLATURE_ACTES,
    note: "Maquette de travail du budget principal. Articles 615 (entretien) p. 35-36. Distinct du rapport de vote DEL-2026-164.",
  },
  {
    id: "3a04-maquette-ca-boa",
    code: "04",
    title: "04. Maquette compte administratif 2025 — BOA",
    entity: "boa",
    kind: "ca",
    status: "available",
    href: "/pieces/04._Maquette_compte_administratif_2025_-_BOA.pdf",
    file: "04._Maquette_compte_administratif_2025_-_BOA.pdf",
    session: "Conseil municipal du 29 juin 2026",
    nomenclature: NOMENCLATURE_BOA,
    note: "Budget annexe, instruction M4 (DOB 2026). Exploitation p. 7 : recettes réelles 87 631,18 €, dépenses réelles 54 368,03 €.",
  },
  {
    id: "3a06-maquette-dm1-ville",
    code: "06",
    title: "06. Maquette DM n°1 — Ville",
    entity: "ville",
    kind: "dm",
    status: "available",
    href: "/pieces/06._Maquette_DM_n1.pdf",
    file: "06._Maquette_DM_n1.pdf",
    session: "Conseil municipal du 29 juin 2026",
    nomenclature: NOMENCLATURE_ACTES,
    note: "Décision modificative n°1, exercice 2026. Distinct du CA 2025.",
  },
  {
    id: "3a06-maquette-dm1-boa",
    code: "06",
    title: "06. Maquette DM n°1 — BOA",
    entity: "boa",
    kind: "dm",
    status: "available",
    href: "/pieces/06._Maquette_DM_n1_-_BOA.pdf",
    file: "06._Maquette_DM_n1_-_BOA.pdf",
    session: "Conseil municipal du 29 juin 2026",
    nomenclature: NOMENCLATURE_BOA,
    note: "Ajustements d’exploitation p. 5 : +26 751,11 € de dépenses, −60 879,15 € de recettes.",
  },
  {
    id: "3a03-cg-ville",
    code: "03",
    title: "03. Compte de gestion — Ville",
    entity: "ville",
    kind: "gestion",
    status: "available",
    href: "/pieces/03._Compte_de_gestion_Ville.pdf",
    file: "03._Compte_de_gestion_Ville.pdf",
    session: "Conseil municipal du 29 juin 2026",
    note: "Compte de gestion intégral. L’acte d’approbation est DEL-2026-163.",
  },
  {
    id: "3a03-cg-boa",
    code: "03",
    title: "03. Compte de gestion — BOA",
    entity: "boa",
    kind: "gestion",
    status: "available",
    href: "/pieces/03._Compte_de_gestion_BOA.pdf",
    file: "03._Compte_de_gestion_BOA.pdf",
    nomenclature: NOMENCLATURE_BOA,
    session: "Conseil municipal du 29 juin 2026",
    note: "Compte de gestion du budget annexe. L’acte d’approbation est DEL-2026-163.",
  },
  {
    id: "3a02-rbf",
    code: "02",
    title: "02. Règlement budgétaire et financier",
    entity: "ville",
    kind: "rbf",
    status: "available",
    href: "/pieces/02._Reglement_budgetaire_et_fnancier.pdf",
    file: "02._Reglement_budgetaire_et_fnancier.pdf",
    session: "Conseil municipal du 29 juin 2026",
    note: "Texte intégral. L’acte d’approbation est DEL-2026-162.",
  },
  {
    id: "3a01-cctp",
    code: "01",
    title: "01. Cahier des clauses techniques particulières",
    entity: "ville",
    kind: "cctp",
    status: "available",
    href: "/pieces/01._Cahier_des_clauses_techniques_particulieres.pdf",
    file: "01._Cahier_des_clauses_techniques_particulieres.pdf",
    session: "Conseil municipal du 27 mars 2026",
  },
  {
    id: "pv-27-mars",
    title: "Procès-verbal du conseil municipal du 27 mars 2026",
    entity: "conseil",
    kind: "pv",
    status: "available",
    href: "/pieces/Proces-verbal_du_conseil_municipal_du_27_mars_2026.pdf",
    file: "Proces-verbal_du_conseil_municipal_du_27_mars_2026.pdf",
    session: "Conseil municipal du 27 mars 2026",
    note: "Scan image : la recherche plein texte peut être vide ; le PDF se télécharge.",
  },
  {
    id: "odj-27-mars",
    title: "02. Ordre du jour — 27 mars 2026",
    entity: "conseil",
    kind: "delib",
    status: "available",
    href: "/pieces/02._Ordre_du_jour.pdf",
    file: "02._Ordre_du_jour.pdf",
    session: "Conseil municipal du 27 mars 2026",
  },
  {
    id: "cahier-27-mars-copie",
    code: "03",
    title: "03. Cahier des délibérations — 27 mars 2026",
    entity: "conseil",
    kind: "delib",
    status: "available",
    href: "/pieces/03._Cahier_des_deliberations.pdf",
    file: "03._Cahier_des_deliberations.pdf",
    session: "Conseil municipal du 27 mars 2026",
    note: "Copie de travail du fonds. Publication presse : cahier-2026-03-27.",
  },
  {
    id: "deports-27-mars",
    code: "04",
    title: "04. Tableau de propositions de déports — 27 mars 2026",
    entity: "conseil",
    kind: "liste",
    status: "available",
    href: "/pieces/04._Tableau_de_propositions_de_deports.pdf",
    file: "04._Tableau_de_propositions_de_deports.pdf",
    session: "Conseil municipal du 27 mars 2026",
  },
  {
    id: "missing-cfu",
    title: "Compte financier unique (CFU)",
    entity: "both",
    kind: "ca",
    status: "missing",
    note: "Non publié pour 2025 : la Ville a encore voté CA + compte de gestion séparés (29 juin 2026).",
  },
  {
    id: "missing-budget-vert",
    title: "Budget vert / annexe environnementale",
    entity: "ville",
    kind: "autre",
    status: "missing",
    note: "Le rapport CA 2025 évoque ~27 M€ examinés au titre de l’annexe environnementale (p. 19) sans publier l’annexe.",
  },
  {
    id: "missing-egalite",
    title: "Rapport à l’égalité femmes-hommes",
    entity: "ville",
    kind: "autre",
    status: "missing",
    note: "Obligatoire > 20 000 habitants, présenté avant le budget. Absent des actes CA/DM récupérés.",
  },
  {
    id: "missing-apcp",
    title: "État des AP / CP (hors mentions du DOB)",
    entity: "ville",
    kind: "autre",
    status: "missing",
    note: "Le DOB 2026 annonce un PPI 2026-2028. Un état APCP autonome n’est pas dans le fonds intégré.",
  },
];

const conventionFiles: {
  file: string;
  title: string;
  kind?: DocumentKind;
  entity?: Entity;
}[] = [
  { file: "12._Convention.pdf", title: "12. Convention" },
  { file: "13._Convention.pdf", title: "13. Convention" },
  { file: "14._Convention.pdf", title: "14. Convention" },
  { file: "15._Convention.pdf", title: "15. Convention" },
  { file: "16._Convention.pdf", title: "16. Convention" },
  { file: "17._Convention.pdf", title: "17. Convention" },
  { file: "18._Convention.pdf", title: "18. Convention" },
  { file: "19._Convention.pdf", title: "19. Convention" },
  { file: "20._Convention.pdf", title: "20. Convention" },
  { file: "22._Budget_previsionnel.pdf", title: "22. Budget prévisionnel" },
  { file: "22._Convention.pdf", title: "22. Convention" },
  { file: "23._Convention.pdf", title: "23. Convention" },
  { file: "24._Fiche_de_presentation.pdf", title: "24. Fiche de présentation" },
  { file: "25._Repartition.pdf", title: "25. Répartition" },
  { file: "29._Avenant_2026.pdf", title: "29. Avenant 2026" },
  { file: "29._Convention_2022-2025.pdf", title: "29. Convention 2022-2025" },
  { file: "30._Convention.pdf", title: "30. Convention" },
  { file: "32._Convention.pdf", title: "32. Convention" },
  { file: "33._Avis_de_domaine.pdf", title: "33. Avis de domaine" },
  { file: "33._Etat_descriptif.pdf", title: "33. État descriptif" },
  { file: "33._Extrait_plan_cadastral.pdf", title: "33. Extrait plan cadastral" },
  {
    file: "33._Promesse.pdf",
    title: "33. Promesse",
  },
  { file: "33._Statuts_ASL.pdf", title: "33. Statuts ASL" },
  { file: "34._Estimation_avis_des_domaines.pdf", title: "34. Estimation — avis des domaines" },
  {
    file: "34._Promesse_dachat.pdf",
    title: "34. Promesse d’achat",
  },
  { file: "35._Portefeuille_Angers.pdf", title: "35. Portefeuille Angers" },
  {
    file: "35._Portefeuille_Plateforme_Anjou_Portage_foncier.pdf",
    title: "35. Portefeuille Anjou portage foncier",
  },
  {
    file: "36._Repartition_subvention_-_114_rue_de_la_Chalouere.pdf",
    title: "36. Répartition subvention — 114 rue de la Chalouère",
  },
  {
    file: "36._Repartition_subvention_-_18_rue_Maille.pdf",
    title: "36. Répartition subvention — 18 rue Maillé",
  },
  {
    file: "36._Repartition_subvention_-_19-21_Boulevard_Carnot.pdf",
    title: "36. Répartition subvention — 19-21 boulevard Carnot",
  },
  { file: "37._Liste_des_beneficiaires.pdf", title: "37. Liste des bénéficiaires", kind: "liste" },
  { file: "38._Projet_dacte.pdf", title: "38. Projet d’acte" },
  {
    file: "45._Etat_et_details_des_remises_gracieuses.pdf",
    title: "45. État des remises gracieuses",
    kind: "liste",
  },
  { file: "47._Projet_davenant_n2.pdf", title: "47. Projet d’avenant n°2" },
  { file: "48._Liste_remises_gracieuses.pdf", title: "48. Liste remises gracieuses", kind: "liste" },
  { file: "50._Liste_des_biens.pdf", title: "50. Liste des biens", kind: "liste" },
];

export const FONCIER_RELEASE_TAG = "fonciers-33-34";

export const FONCIER_RELEASE_BASE = `https://github.com/rdn478mbyt-ops/finances-angers-pieces/releases/download/${FONCIER_RELEASE_TAG}`;

const OFFBUNDLE_HREF: Record<string, string> = {
  "33._Promesse.pdf": `${FONCIER_RELEASE_BASE}/33._Promesse.pdf`,
  "34._Promesse_dachat.pdf": `${FONCIER_RELEASE_BASE}/34._Promesse_dachat.pdf`,
};

const OFFBUNDLE: Record<string, string> = {
  "33._Promesse.pdf":
    "Fichier volumineux (52 Mo) : hors git et hors archive Vercel Hobby. Téléchargement GitHub Release (tag fonciers-33-34), pas un lien angers.fr.",
  "34._Promesse_dachat.pdf":
    "Fichier volumineux (43 Mo) : hors git et hors archive Vercel Hobby. Téléchargement GitHub Release (tag fonciers-33-34), pas un lien angers.fr.",
};

function slugFromFile(file: string) {
  return file
    .replace(/\.pdf$/i, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export const fondsConventions: Piece[] = conventionFiles.map((item) => {
  const off = OFFBUNDLE[item.file];
  const kind: DocumentKind =
    item.kind ??
    (item.file.includes("Liste") || item.file.includes("Etat") ? "liste" : "convention");
  return {
    id: slugFromFile(item.file),
    code: item.title.split(".")[0],
    title: item.title,
    entity: item.entity ?? "ville",
    kind,
    status: (off ? "offbundle" : "available") as DocumentStatus,
    href: OFFBUNDLE_HREF[item.file] ?? `/pieces/${item.file}`,
    file: item.file,
    note: off,
    session: "Pièces du conseil (27 mars 2026 et annexes)",
  };
});

export const allPieces = [...pieces, ...fondsConventions];

export function pieceById(id: string) {
  return allPieces.find((p) => p.id === id);
}

export function pieceByFile(file: string) {
  return allPieces.find((p) => p.file === file);
}

export const missingRequired = pieces.filter((p) => p.status === "missing");
export const integratingRequired = pieces.filter((p) => p.status === "integrating");
export const offbundleRequired = allPieces.filter((p) => p.status === "offbundle");
