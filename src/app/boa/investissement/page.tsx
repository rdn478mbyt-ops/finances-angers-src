import type { Metadata } from "next";
import Link from "next/link";
import { SectionNav } from "@/components/section-nav";
import { SourceCite } from "@/components/source-cite";
import { boaCa2025, villeCa2025 } from "@/data/figures";
import { formatEuros } from "@/lib/format";

export const metadata: Metadata = { title: "BOA · investissement" };

export default function BoaInvestissementPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <SectionNav current="/boa/investissement" />
      <h1 className="mt-6 font-heading text-4xl font-bold">
        BOA · investissement 2025
        <span className="text-rouge">.</span>
      </h1>
      <p className="mt-3 max-w-2xl text-ink/80">
        Le capital de la dette, s’il existe sur ce budget annexe, relève de
        l’investissement. Les intérêts relèvent du fonctionnement. Les annexes
        de la dette de la maquette CA 2025 BOA sont portées « sans objet ».
      </p>
      <p className="mt-4 text-sm text-ink/80">
        Explorateur :{" "}
        <Link
          href="/explorer?entity=boa&section=investissement"
          className="underline decoration-rose/40 hover:text-rouge"
        >
          investissement BOA
        </Link>
        .
      </p>
      <div className="mt-8 overflow-x-auto rounded-xl border bg-white shadow-[0_1px_8px_rgba(15,23,42,0.06)]">
        <table className="w-full text-sm">
          <tbody>
            <tr className="border-t border-line">
              <td className="px-4 py-3">Résultat d’investissement de l’exercice</td>
              <td className="px-4 py-3 font-heading font-semibold tabular-nums">
                {formatEuros(boaCa2025.resultatInvestissementExercice.euros, true)}
              </td>
              <td className="px-4 py-3">
                <SourceCite source={boaCa2025.resultatInvestissementExercice.source} />
              </td>
            </tr>
            <tr className="border-t border-line">
              <td className="px-4 py-3">Restes à réaliser</td>
              <td className="px-4 py-3 font-heading font-semibold tabular-nums">
                {formatEuros(boaCa2025.restesARealiser.euros, true)}
              </td>
              <td className="px-4 py-3">
                <SourceCite source={boaCa2025.restesARealiser.source} />
              </td>
            </tr>
            <tr className="border-t border-line">
              <td className="px-4 py-3">Encours de dette BOA</td>
              <td className="px-4 py-3 font-heading font-semibold">non calculable</td>
              <td className="px-4 py-3 text-xs text-rouge">{boaCa2025.encoursDette.missing}</td>
            </tr>
            <tr className="border-t border-line">
              <td className="px-4 py-3">Raccordement BOA inscrit au budget principal</td>
              <td className="px-4 py-3 font-heading font-semibold tabular-nums">
                {formatEuros(villeCa2025.raccordementBoa.euros!)}
              </td>
              <td className="px-4 py-3">
                <SourceCite source={villeCa2025.raccordementBoa.source} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-sm text-ink/80">
        La ligne « équipement numérique / raccordement BOA » est une dépense du
        budget principal, pas du budget annexe.
      </p>
    </div>
  );
}
