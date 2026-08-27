import type { Metadata } from "next";
import Link from "next/link";
import { SectionNav } from "@/components/section-nav";
import { SourceCite } from "@/components/source-cite";
import { boaCa2025, villeAffectation2025 } from "@/data/figures";
import { formatEuros } from "@/lib/format";
import { boaRatios, knownRatios } from "@/lib/ratios";
import { RatioCard } from "@/components/ratio-card";
import { NonCalculableList } from "@/components/non-calculable-list";

export const metadata: Metadata = { title: "BOA · fonctionnement" };

export default function BoaFonctionnementPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <SectionNav current="/boa/fonctionnement" />
      <h1 className="mt-6 font-heading text-4xl font-bold">
        BOA · fonctionnement 2025
        <span className="text-rouge">.</span>
      </h1>
      <p className="mt-3 max-w-2xl text-ink/80">
        Boucle optique angevine, budget annexe (instruction M4, DOB 2026). Les
        soldes d’affectation restent dans DEL-2026-165. Recettes, dépenses et
        épargne brute : 04. Maquette compte administratif 2025 — BOA, p. 7.
      </p>
      <p className="mt-4 text-sm text-ink/80">
        Explorateur BOA :{" "}
        <Link
          href="/explorer?entity=boa&section=fonctionnement&flow=depense"
          className="underline decoration-rose/40 hover:text-rouge"
        >
          dépenses d’exploitation
        </Link>
        ,{" "}
        <Link
          href="/explorer?entity=boa&section=fonctionnement&flow=depense&chapitre=012"
          className="underline decoration-rose/40 hover:text-rouge"
        >
          chapitre 012 personnel
        </Link>
        .
      </p>
      <div className="mt-8 overflow-x-auto rounded-xl border bg-white shadow-[0_1px_8px_rgba(15,23,42,0.06)]">
        <table className="w-full text-sm">
          <tbody>
            <Line label="Résultat de fonctionnement de l’exercice" value={formatEuros(boaCa2025.resultatFonctionnementExercice.euros, true)} source={boaCa2025.resultatFonctionnementExercice.source} />
            <Line label="Excédent cumulé de fonctionnement" value={formatEuros(boaCa2025.excesFonctionnementCumule.euros, true)} source={boaCa2025.excesFonctionnementCumule.source} />
            <Line label="Affectation compte 1068" value="0 €" source={villeAffectation2025.affectation1068Ville.source} />
            <Line label="Recettes réelles d’exploitation" value={formatEuros(boaCa2025.recettesFonctionnement.euros, true)} source={boaCa2025.recettesFonctionnement.source} />
            <Line label="Dépenses réelles d’exploitation" value={formatEuros(boaCa2025.depensesFonctionnement.euros, true)} source={boaCa2025.depensesFonctionnement.source} />
            <Line label="Personnel (chapitre 012)" value={formatEuros(boaCa2025.depensesPersonnel.euros, true)} source={boaCa2025.depensesPersonnel.source} />
            <Line label="Épargne brute (RF − DF réelles)" value={formatEuros(boaCa2025.epargneBrute.euros, true)} source={boaCa2025.epargneBrute.source} />
          </tbody>
        </table>
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {knownRatios(boaRatios()).map((r) => (
          <RatioCard key={r.id} ratio={r} />
        ))}
      </div>
      <NonCalculableList ratios={boaRatios()} />
    </div>
  );
}

function Line({
  label,
  value,
  source,
  missing,
}: {
  label: string;
  value: string;
  source: { pieceId: string; page: number | null; label: string } | null;
  missing?: string | null;
}) {
  return (
    <tr className="border-t border-line">
      <td className="px-4 py-3">{label}</td>
      <td className="px-4 py-3 font-heading font-semibold tabular-nums">{value}</td>
      <td className="px-4 py-3">
        {missing ? <span className="text-xs text-rouge">{missing}</span> : <SourceCite source={source} />}
      </td>
    </tr>
  );
}
