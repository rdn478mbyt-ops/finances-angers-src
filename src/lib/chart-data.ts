import { villeCa2025, villeAffectation2025, boaCa2025, dm1_2026 } from "@/data/figures";
import type { ScaleRow } from "@/components/scale-bars";

export function dfCompositionRow(): ScaleRow {
  return {
    id: "df-ville",
    label: "Dépenses de fonctionnement Ville · CA 2025",
    segments: [
      {
        id: "personnel",
        label: "Personnel",
        euros: villeCa2025.depensesPersonnel.euros!,
        color: "#00a870",
        source: villeCa2025.depensesPersonnel.source,
      },
      {
        id: "subventions",
        label: "Subventions",
        euros: villeCa2025.subventions.euros!,
        color: "#ba4e8e",
        source: villeCa2025.subventions.source,
      },
      {
        id: "autres",
        label: "Autres (dont chapitre 011)",
        euros: villeCa2025.autresDepensesFonctionnement.euros!,
        color: "#ef7a97",
        source: villeCa2025.autresDepensesFonctionnement.source,
      },
    ],
  };
}

export function villeBoaRows(): ScaleRow[] {
  return [
    {
      id: "eb-ville",
      label: "Épargne brute Ville",
      euros: villeCa2025.epargneBrute.euros,
      color: "#00a870",
      source: villeCa2025.epargneBrute.source,
    },
    {
      id: "eb-boa",
      label: "Épargne brute BOA",
      euros: boaCa2025.epargneBrute.euros,
      color: "#ba4e8e",
      source: boaCa2025.epargneBrute.source,
    },
    {
      id: "rf-ville",
      label: "Résultat de fonctionnement Ville",
      euros: villeAffectation2025.villeResultatFonctionnementExercice.euros,
      color: "#a8d3af",
      source: villeAffectation2025.villeResultatFonctionnementExercice.source,
    },
    {
      id: "rf-boa",
      label: "Résultat de fonctionnement BOA",
      euros: boaCa2025.resultatFonctionnementExercice.euros,
      color: "#ba4e8e",
      source: boaCa2025.resultatFonctionnementExercice.source,
    },
  ];
}

export function caVsDmRows(): ScaleRow[] {
  return [
    {
      id: "df-ca",
      label: "DF CA 2025 (exécution)",
      segments: [
        {
          id: "personnel",
          label: "Personnel",
          euros: villeCa2025.depensesPersonnel.euros!,
          color: "#00a870",
          source: villeCa2025.depensesPersonnel.source,
        },
        {
          id: "subventions",
          label: "Subventions",
          euros: villeCa2025.subventions.euros!,
          color: "#ba4e8e",
          source: villeCa2025.subventions.source,
        },
        {
          id: "autres",
          label: "Autres",
          euros: villeCa2025.autresDepensesFonctionnement.euros!,
          color: "#ef7a97",
          source: villeCa2025.autresDepensesFonctionnement.source,
        },
      ],
    },
    {
      id: "df-dm",
      label: "Nouvelles DF · DM n°1 2026",
      euros: dm1_2026.fonctionnementNouvellesDepenses.euros,
      color: "#fbe216",
      source: dm1_2026.fonctionnementNouvellesDepenses.source,
    },
    {
      id: "di-ca",
      label: "DI hors dette CA 2025",
      euros: villeCa2025.depensesInvestissementHorsDette.euros,
      color: "#ba4e8e",
      source: villeCa2025.depensesInvestissementHorsDette.source,
    },
    {
      id: "di-dm",
      label: "Nouvelles DI · DM n°1 2026",
      euros: dm1_2026.investissementNouvellesDepenses.euros,
      color: "#e84250",
      source: dm1_2026.investissementNouvellesDepenses.source,
    },
    {
      id: "dm-volume",
      label: "Volume DM n°1 2026 (empilé)",
      segments: [
        {
          id: "ndf",
          label: "Nouvelles DF",
          euros: dm1_2026.fonctionnementNouvellesDepenses.euros!,
          color: "#fbe216",
          source: dm1_2026.fonctionnementNouvellesDepenses.source,
        },
        {
          id: "ndi",
          label: "Nouvelles DI",
          euros: dm1_2026.investissementNouvellesDepenses.euros!,
          color: "#ba4e8e",
          source: dm1_2026.investissementNouvellesDepenses.source,
        },
        {
          id: "nrf",
          label: "Nouvelles RF",
          euros: dm1_2026.fonctionnementNouvellesRecettes.euros!,
          color: "#00a870",
          source: dm1_2026.fonctionnementNouvellesRecettes.source,
        },
        {
          id: "nri",
          label: "Nouvelles RI",
          euros: dm1_2026.investissementNouvellesRecettes.euros!,
          color: "#a8d3af",
          source: dm1_2026.investissementNouvellesRecettes.source,
        },
      ],
    },
  ];
}

export const DF_MAX = villeCa2025.depensesFonctionnementHorsFrais.euros!;
export const EB_MAX = villeCa2025.epargneBrute.euros!;
