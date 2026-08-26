import type { RatioResult, RatioTone } from "@/data/types";
import { villeCa2025, boaCa2025 } from "@/data/figures";

function pct(num: number, den: number) {
  return (num / den) * 100;
}

function epargneTone(rate: number): { tone: RatioTone; reading: string } {
  if (rate < 5) {
    return {
      tone: "critique",
      reading:
        "Sous 5 % : la collectivité ne finance plus ses investissements sur épargne (seuil FNESR).",
    };
  }
  if (rate < 8) {
    return {
      tone: "alerte",
      reading: "Sous 8 % : seuil d’alerte FNESR sur l’épargne brute.",
    };
  }
  if (rate > 20) {
    return {
      tone: "sous-investissement",
      reading:
        "Au-dessus de 20 % : possible sous-investissement dans les politiques publiques (seuil FNESR).",
    };
  }
  if (rate >= 14 && rate <= 16) {
    return {
      tone: "bon",
      reading: "Autour de 15 % : niveau jugé bon par la grille FNESR.",
    };
  }
  return {
    tone: "intermédiaire",
    reading:
      "Entre le seuil d’alerte (8 %) et le bon niveau (~15 %). Ni alerte, ni cible haute.",
  };
}

function masseTone(rate: number): { tone: RatioTone; reading: string } {
  if (rate < 50) {
    return {
      tone: "hors-cible",
      reading:
        "Sous 50 % des dépenses de fonctionnement : signal d’externalisation importante (FNESR).",
    };
  }
  if (rate > 60) {
    return {
      tone: "alerte",
      reading:
        "Au-dessus de 60 % : les équipes n’ont plus les moyens opérationnels (seuil FNESR).",
    };
  }
  return {
    tone: "cible",
    reading: "Dans la cible FNESR de 50–60 % des dépenses de fonctionnement.",
  };
}

export function villeRatios(): RatioResult[] {
  const rf = villeCa2025.recettesFonctionnement.euros!;
  const df = villeCa2025.depensesFonctionnementHorsFrais.euros!;
  const eb = villeCa2025.epargneBrute.euros!;
  const personnel = villeCa2025.depensesPersonnel.euros!;
  const epargneRate = pct(eb, rf);
  const masseRate = pct(personnel, df);
  const e = epargneTone(epargneRate);
  const m = masseTone(masseRate);

  return [
    {
      id: "ville-epargne-brute",
      label: "Épargne brute / recettes de fonctionnement",
      entity: "ville",
      value: epargneRate,
      unit: "percent",
      tone: e.tone,
      reading: e.reading,
      formula: "épargne brute ÷ recettes de fonctionnement (CA 2025, k€ × 1 000)",
      source: villeCa2025.epargneBrute.source,
      missing: null,
    },
    {
      id: "ville-masse-salariale",
      label: "Masse salariale / fonctionnement",
      entity: "ville",
      value: masseRate,
      unit: "percent",
      tone: m.tone,
      reading: `${m.reading} Dénominateur : total des dépenses de fonctionnement du rapport (hors frais financiers et CRFIP).`,
      formula:
        "dépenses de personnel ÷ dépenses de fonctionnement hors frais financiers et CRFIP",
      source: villeCa2025.depensesPersonnel.source,
      missing: null,
    },
    {
      id: "ville-capacite-avec-cessions",
      label: "Capacité de désendettement (avec cessions)",
      entity: "ville",
      value: villeCa2025.capaciteAvecCessions.years,
      unit: "years",
      tone: villeCa2025.capaciteAvecCessions.years! < 12 ? "bon" : "alerte",
      reading:
        villeCa2025.capaciteAvecCessions.years! < 12
          ? "Sous le seuil prudentiel de 12 ans (intervention possible des services de l’État au-delà)."
          : "Au-delà de 12 ans : seuil d’intervention des services de l’État (FNESR).",
      formula: "encours de dette ÷ épargne brute (ratio publié, avec cessions)",
      source: villeCa2025.capaciteAvecCessions.source,
      missing: null,
    },
    {
      id: "ville-capacite-hors-cessions",
      label: "Capacité de désendettement (hors cessions)",
      entity: "ville",
      value: villeCa2025.capaciteHorsCessions.years,
      unit: "years",
      tone: villeCa2025.capaciteHorsCessions.years! < 12 ? "bon" : "alerte",
      reading:
        "Même indicateur hors produits de cessions. Reste sous 12 ans.",
      formula: "encours de dette ÷ épargne brute hors cessions (ratio publié)",
      source: villeCa2025.capaciteHorsCessions.source,
      missing: null,
    },
    {
      id: "ville-cessions",
      label: "Cessions et équilibre du fonctionnement",
      entity: "ville",
      value: villeCa2025.cessions.euros,
      unit: "euros",
      tone: "intermédiaire",
      reading:
        "Cessions inscrites en produits de fonctionnement. L’épargne brute hors cessions reste positive (25,7 M€) : elles n’équilibrent pas à elles seules la section.",
      formula: "produits de cessions d’actifs (rapport CA) ; test FNESR = équilibrent-elles le fonctionnement ?",
      source: villeCa2025.cessions.source,
      missing: null,
    },
    {
      id: "ville-entretien",
      label: "Entretien courant",
      entity: "ville",
      value: villeCa2025.entretienCourant.euros,
      unit: "euros",
      tone: "intermédiaire",
      reading:
        "Somme des articles 615 de la maquette CA 2025 Ville (terrains, bâtiments, voiries, réseaux, matériel, mobiliers, maintenance). Le chapitre 011 (47,5 M€) reste plus large (fluides, prestations). Le « gros entretien bâtiments » (7,66 M€) est de l’investissement, hors ce total.",
      formula:
        "61521 + 615221 + 615231 + 615232 + 61551 + 61558 + 6156 (réalisations, 04. Maquette CA 2025 Ville)",
      source: villeCa2025.entretienCourant.source,
      missing: null,
    },
    {
      id: "ville-heures-sup",
      label: "Heures supplémentaires",
      entity: "ville",
      value: null,
      unit: "euros",
      tone: "inconnu",
      reading:
        "À surveiller : peuvent masquer un sous-recrutement (FNESR). Aucune ligne « heures supplémentaires » dans la maquette CA 2025 Ville (articles 641).",
      formula: "heures supplémentaires — non isolées dans les articles 641",
      source: {
        pieceId: "3a04-maquette-ca-ville",
        page: 37,
        label: "04. Maquette CA 2025 Ville, articles 641, détail du personnel",
      },
      missing:
        "Heures supplémentaires non isolées dans 04. Maquette compte administratif 2025 (Ville).",
    },
  ];
}

export function boaRatios(): RatioResult[] {
  const rf = boaCa2025.recettesFonctionnement.euros!;
  const df = boaCa2025.depensesFonctionnement.euros!;
  const eb = boaCa2025.epargneBrute.euros!;
  const personnel = boaCa2025.depensesPersonnel.euros!;
  const epargneRate = pct(eb, rf);
  const masseRate = pct(personnel, df);
  const e = epargneTone(epargneRate);
  const m = masseTone(masseRate);

  return [
    {
      id: "boa-epargne-brute",
      label: "Épargne brute / recettes de fonctionnement",
      entity: "boa",
      value: epargneRate,
      unit: "percent",
      tone: e.tone,
      reading: `${e.reading} Budget annexe (instruction M4) : recettes réelles d’exploitation 87 631 €.`,
      formula:
        "(recettes réelles − dépenses réelles d’exploitation) ÷ recettes réelles d’exploitation",
      source: boaCa2025.epargneBrute.source,
      missing: null,
    },
    {
      id: "boa-masse-salariale",
      label: "Masse salariale / fonctionnement",
      entity: "boa",
      value: masseRate,
      unit: "percent",
      tone: m.tone,
      reading: `${m.reading} Chapitre 012 sur dépenses réelles d’exploitation.`,
      formula: "chapitre 012 ÷ dépenses réelles d’exploitation",
      source: boaCa2025.depensesPersonnel.source,
      missing: null,
    },
    {
      id: "boa-capacite",
      label: "Capacité de désendettement",
      entity: "boa",
      value: null,
      unit: "years",
      tone: "inconnu",
      reading:
        "Annexes de la dette portées « sans objet » dans la maquette CA 2025 BOA. Pas d’encours à diviser.",
      formula: "encours ÷ épargne brute",
      source: null,
      missing: boaCa2025.encoursDette.missing,
    },
  ];
}

export function allRatios() {
  return [...villeRatios(), ...boaRatios()];
}

export function knownRatios(ratios: RatioResult[]) {
  return ratios.filter((r) => r.value !== null);
}

export function unknownRatios(ratios: RatioResult[]) {
  return ratios.filter((r) => r.value === null);
}
