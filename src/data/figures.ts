import type { Amount, Source } from "./types";

const ca: Source = {
  pieceId: "del-2026-164",
  page: 5,
  label: "DEL-2026-164, rapport CA 2025, p. 5 du PDF",
};

function amount(
  euros: number,
  page: number,
  precision: Amount["precision"] = "k_times_1000",
): Amount {
  return {
    euros,
    precision,
    source: {
      pieceId: "del-2026-164",
      page,
      label: `DEL-2026-164, rapport CA 2025, p. ${page} du PDF`,
    },
    missing: null,
  };
}

function missing(reason: string): Amount {
  return { euros: null, precision: "exact", source: null, missing: reason };
}

/** Budget principal — Ville. Chiffres du rapport de présentation (nomenclature des pièces). */
export const villeCa2025 = {
  entity: "ville" as const,
  exercice: 2025,
  piece: "del-2026-164",
  recettesFonctionnement: amount(260_704_000, 5),
  recettesFonctionnement2024: amount(255_534_000, 5),
  depensesFonctionnementHorsFrais: amount(226_575_000, 5),
  depensesFonctionnementHorsFrais2024: amount(223_197_000, 5),
  depensesPersonnel: amount(130_412_000, 11),
  depensesPersonnel2024: amount(128_372_000, 11),
  subventions: amount(42_457_000, 11),
  subventionCcas: amount(17_800_000, 11),
  autresDepensesFonctionnement: amount(53_706_000, 11),
  chapitre011: amount(47_500_000, 12),
  entretienCourant: {
    euros: 5_290_249.24,
    precision: "exact" as const,
    source: {
      pieceId: "3a04-maquette-ca-ville",
      page: 35,
      label: "04. Maquette CA 2025 Ville, articles 615, p. 35-36",
    },
    missing: null,
  },
  epargneGestion: amount(34_128_000, 5),
  fraisFinanciers: amount(3_626_000, 5),
  epargneBrute: amount(30_503_000, 5),
  epargneBrute2024: amount(28_114_000, 5),
  epargneBruteHorsCessionsM: {
    euros: 25_700_000,
    precision: "rounded_m" as const,
    source: {
      pieceId: "del-2026-164",
      page: 4,
      label: "DEL-2026-164, graphique épargne brute hors cessions, p. 4",
    },
    missing: null,
  },
  amortissementCapital: amount(14_062_000, 5),
  epargneNette: amount(16_440_000, 5),
  depensesInvestissementHorsDette: amount(43_683_000, 5),
  recettesInvestissement: amount(23_300_000, 5),
  empruntNouveau: amount(11_800_000, 5),
  encoursDette: {
    euros: 172_200_000,
    precision: "rounded_m" as const,
    source: {
      pieceId: "del-2026-164",
      page: 20,
      label: "DEL-2026-164, encours au 31/12/2025, p. 20",
    },
    missing: null,
  },
  capaciteAvecCessions: {
    years: 5.6,
    source: {
      pieceId: "del-2026-164",
      page: 21,
      label: "DEL-2026-164, capacité de désendettement avec cessions, p. 21",
    },
  },
  capaciteHorsCessions: {
    years: 6.7,
    source: {
      pieceId: "del-2026-164",
      page: 3,
      label: "DEL-2026-164, capacité hors cessions, p. 3",
    },
  },
  cessions: {
    euros: 4_900_000,
    precision: "rounded_m" as const,
    source: {
      pieceId: "del-2026-164",
      page: 10,
      label: "DEL-2026-164, cessions d’actifs, p. 10",
    },
    missing: null,
  },
  impotEtTaxes: amount(159_138_000, 6),
  taxeFonciereTh: amount(131_560_000, 6),
  dotations: amount(69_597_000, 6),
  dgf: amount(55_805_000, 8),
  produitsServices: amount(18_800_000, 10),
  investissementOperations: amount(33_091_504, 15, "exact"),
  grosEntretienBatiments: amount(7_660_166, 15, "exact"),
  raccordementBoa: amount(581_807, 15, "exact"),
  bpDepensesFonctionnement: {
    euros: 228_400_000,
    precision: "rounded_m" as const,
    source: { pieceId: "del-2026-164", page: 3, label: "DEL-2026-164, p. 3 — crédits BP 2025" },
    missing: null,
  },
};

export const villeAffectation2025 = {
  piece: "del-2026-165",
  excesFonctionnementCumule: {
    euros: 14_859_870.51,
    precision: "exact" as const,
    source: {
      pieceId: "del-2026-165",
      page: 2,
      label: "DEL-2026-165, affectation du résultat 2025, p. 2",
    } satisfies Source,
    missing: null,
  },
  villeExcedentFonctionnement: {
    euros: 14_872_119.4,
    source: { pieceId: "del-2026-165", page: 2, label: "DEL-2026-165, p. 2" },
  },
  villeResultatFonctionnementExercice: {
    euros: 7_768_669.16,
    source: { pieceId: "del-2026-165", page: 2, label: "DEL-2026-165, p. 2" },
  },
  villeResultatInvestissementExercice: {
    euros: -957_797.26,
    source: { pieceId: "del-2026-165", page: 2, label: "DEL-2026-165, p. 2" },
  },
  villeRestesARealiser: {
    euros: -7_525_810.21,
    source: { pieceId: "del-2026-165", page: 3, label: "DEL-2026-165, p. 3" },
  },
  resultatGlobalAvantRar: {
    euros: 13_671_933.57,
    source: { pieceId: "del-2026-165", page: 2, label: "DEL-2026-165, p. 2" },
  },
  resultatGlobalApresRar: {
    euros: 6_143_263.31,
    source: { pieceId: "del-2026-165", page: 2, label: "DEL-2026-165, p. 2" },
  },
  deficitInvestissementCumule: {
    euros: -1_187_936.94,
    source: { pieceId: "del-2026-165", page: 2, label: "DEL-2026-165, p. 2" },
  },
  affectation1068Ville: {
    euros: 8_766_965.21,
    source: { pieceId: "del-2026-165", page: 3, label: "DEL-2026-165, p. 3" },
  },
};

export const boaCa2025 = {
  entity: "boa" as const,
  excesFonctionnementCumule: {
    euros: -12_248.89,
    source: { pieceId: "del-2026-165", page: 2, label: "DEL-2026-165, p. 2" },
  },
  resultatFonctionnementExercice: {
    euros: -20_523.85,
    source: { pieceId: "del-2026-165", page: 3, label: "DEL-2026-165, p. 3" },
  },
  resultatInvestissementExercice: {
    euros: 27_627.95,
    source: { pieceId: "del-2026-165", page: 3, label: "DEL-2026-165, p. 3" },
  },
  restesARealiser: {
    euros: -2_860.05,
    source: { pieceId: "del-2026-165", page: 3, label: "DEL-2026-165, p. 3" },
  },
  recettesFonctionnement: {
    euros: 87_631.18,
    precision: "exact" as const,
    source: {
      pieceId: "3a04-maquette-ca-boa",
      page: 7,
      label: "04. Maquette CA 2025 BOA, recettes réelles d’exploitation, p. 7",
    },
    missing: null,
  },
  depensesFonctionnement: {
    euros: 54_368.03,
    precision: "exact" as const,
    source: {
      pieceId: "3a04-maquette-ca-boa",
      page: 7,
      label: "04. Maquette CA 2025 BOA, dépenses réelles d’exploitation, p. 7",
    },
    missing: null,
  },
  depensesPersonnel: {
    euros: 35_562,
    precision: "exact" as const,
    source: {
      pieceId: "3a04-maquette-ca-boa",
      page: 7,
      label: "04. Maquette CA 2025 BOA, chapitre 012, p. 7",
    },
    missing: null,
  },
  epargneBrute: {
    euros: 33_263.15,
    precision: "exact" as const,
    source: {
      pieceId: "3a04-maquette-ca-boa",
      page: 7,
      label: "04. Maquette CA 2025 BOA, recettes − dépenses réelles d’exploitation, p. 7",
    },
    missing: null,
  },
  encoursDette: missing(
    "Annexes de la dette : sans objet dans 04. Maquette CA 2025 BOA (sommaire). Pas d’encours à rapporter.",
  ),
};

export const dm1_2026 = {
  piece: "del-2026-166",
  exercice: 2026,
  fonctionnementNouvellesRecettes: {
    euros: 75_734,
    source: { pieceId: "del-2026-166", page: 2, label: "DEL-2026-166, DM n°1 2026, p. 2" },
  },
  fonctionnementNouvellesDepenses: {
    euros: 1_616_532,
    source: { pieceId: "del-2026-166", page: 2, label: "DEL-2026-166, p. 2" },
  },
  investissementNouvellesRecettes: {
    euros: 916_131,
    source: { pieceId: "del-2026-166", page: 2, label: "DEL-2026-166, p. 2" },
  },
  investissementNouvellesDepenses: {
    euros: 345_333,
    source: { pieceId: "del-2026-166", page: 2, label: "DEL-2026-166, p. 2" },
  },
  totalDm: {
    euros: 2_457_567,
    source: { pieceId: "del-2026-166", page: 2, label: "DEL-2026-166, p. 2" },
  },
  partBpDepenses: {
    label: "0,7 % des crédits de dépenses du BP 2026",
    source: { pieceId: "del-2026-166", page: 2, label: "DEL-2026-166, p. 2" },
  },
  encoursDette: {
    note: "La délibération indique une stabilité de l’encours de dette entre 2025 et 2026, sans chiffrer l’encours.",
    source: { pieceId: "del-2026-166", page: 2, label: "DEL-2026-166, p. 2" },
  },
  boa: {
    nouvellesDepensesExploitation: {
      euros: 26_751.11,
      precision: "exact" as const,
      source: {
        pieceId: "3a06-maquette-dm1-boa",
        page: 5,
        label: "06. Maquette DM n°1 BOA, dépenses réelles d’exploitation, p. 5",
      },
      missing: null,
    },
    nouvellesRecettesExploitation: {
      euros: -60_879.15,
      precision: "exact" as const,
      source: {
        pieceId: "3a06-maquette-dm1-boa",
        page: 5,
        label: "06. Maquette DM n°1 BOA, recettes réelles d’exploitation, p. 5",
      },
      missing: null,
    },
  },
};

export const investissementOperations2025 = [
  { label: "Renouvellement urbain", euros: 13_740_655 },
  { label: "Dont Voltaire et crèches", euros: 4_389_732, indent: true },
  { label: "Dont piscine Belle-Beille", euros: 2_358_373, indent: true },
  { label: "Dont remise d’ouvrage Monplaisir", euros: 4_515_458, indent: true },
  { label: "Dont remise d’ouvrage Belle-Beille", euros: 2_000_000, indent: true },
  { label: "Médiathèque Toussaint", euros: 2_294_454 },
  { label: "École des arts et du cirque", euros: 1_443_837 },
  { label: "Travaux — autres stades", euros: 1_224_952 },
  { label: "ZAC Saint-Serge / Thiers-Boisnet", euros: 1_199_219 },
  { label: "Marché territoire intelligent", euros: 838_986 },
  { label: "Budget participatif", euros: 693_331 },
  { label: "Angers Rives vivantes", euros: 691_747 },
  { label: "Abbaye du Ronceray", euros: 678_715 },
  { label: "Actions spécifiques sur le végétal", euros: 668_000 },
  { label: "Salles de sports", euros: 616_476 },
  { label: "Équipement numérique / raccordement BOA", euros: 581_807 },
  { label: "Aménagement écoles (santé climat / végétalisation)", euros: 463_737 },
  { label: "Piscines", euros: 433_907 },
  { label: "Vidéoprotection", euros: 332_761 },
  { label: "Lutte déchets abandonnés", euros: 312_389 },
  { label: "Travaux espaces publics", euros: 302_029 },
  { label: "Enfouissement télécom", euros: 277_488 },
  { label: "Acquisition de terrains", euros: 272_761 },
  { label: "Relais mairie Roseraie", euros: 233_616 },
  { label: "Aide au logement", euros: 218_500 },
  { label: "Autres opérations d’investissement", euros: 5_572_136 },
] as const;

export const detteNote = {
  capital: "Remboursement du capital = section d’investissement (14,062 M€ d’amortissement du capital hors OCLT & swap, CA 2025).",
  interets: "Intérêts / frais financiers = section de fonctionnement (3,626 M€ hors ICNE, CA 2025).",
  source: ca,
};
