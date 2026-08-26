import type { Source } from "@/data/types";
import { villeCa2025 } from "@/data/figures";
import { boaRatios, villeRatios } from "@/lib/ratios";
import { formatPercent, formatYears } from "@/lib/format";

export type BannerPill = {
  label: string;
  tone: "vert" | "jaune" | "rouge" | "violet";
};

export type BannerFigure = {
  kicker: string;
  label: string;
  value: string;
  punct: "rouge" | "rose" | "jaune" | "vert-1" | "violet";
  source: Source | null;
  missing?: string | null;
  pills?: BannerPill[];
  href: string;
};

const epargnePills: BannerPill[] = [
  { label: "15 %", tone: "vert" },
  { label: "8 %", tone: "jaune" },
  { label: "5 %", tone: "rouge" },
];

function epargneFigure(): BannerFigure {
  const ratio = villeRatios().find((r) => r.id === "ville-epargne-brute")!;
  return {
    kicker: "Chiffre à retenir",
    label: "Épargne brute · Ville",
    value: formatPercent(ratio.value!),
    punct: "jaune",
    source: villeCa2025.epargneBrute.source,
    pills: epargnePills,
    href: "/#ratios",
  };
}

export function getBannerFigure(pathname: string): BannerFigure {
  const ville = villeRatios();
  if (pathname.startsWith("/ville/investissement")) {
    const capa = ville.find((r) => r.id === "ville-capacite-avec-cessions")!;
    return {
      kicker: "Chiffre à retenir",
      label: "Désendettement · Ville",
      value: formatYears(capa.value!),
      punct: "vert-1",
      source: villeCa2025.capaciteAvecCessions.source,
      pills: [{ label: "12 ans · seuil d’État", tone: "rouge" }],
      href: "/ville/investissement",
    };
  }
  if (pathname.startsWith("/ville/fonctionnement")) {
    const masse = ville.find((r) => r.id === "ville-masse-salariale")!;
    return {
      kicker: "Chiffre à retenir",
      label: "Masse salariale · Ville",
      value: formatPercent(masse.value!),
      punct: "vert-1",
      source: villeCa2025.depensesPersonnel.source,
      pills: [
        { label: "50 % plancher", tone: "vert" },
        { label: "60 % plafond", tone: "vert" },
      ],
      href: "/ville/fonctionnement",
    };
  }
  if (pathname.startsWith("/boa")) {
    const boa = boaRatios().find((r) => r.id === "boa-epargne-brute")!;
    return {
      kicker: "Chiffre à retenir",
      label: "Épargne brute · BOA",
      value: formatPercent(boa.value!),
      punct: "violet",
      source: boa.source,
      pills: epargnePills,
      href: "/boa/fonctionnement",
    };
  }
  if (pathname.startsWith("/comparaisons")) {
    return {
      kicker: "Chiffre à retenir",
      label: "Épargne brute · Ville / BOA",
      value: formatPercent(ville.find((r) => r.id === "ville-epargne-brute")!.value!),
      punct: "jaune",
      source: villeCa2025.epargneBrute.source,
      pills: epargnePills,
      href: "/comparaisons",
    };
  }
  return epargneFigure();
}
