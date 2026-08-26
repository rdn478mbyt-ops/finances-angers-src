import type { Metadata } from "next";
import { SectionNav } from "@/components/section-nav";
import { SourceCite } from "@/components/source-cite";
import { villeCa2025 } from "@/data/figures";
import { formatEuros, formatMillions, formatPercent } from "@/lib/format";
import { villeRatios, knownRatios } from "@/lib/ratios";
import { RatioCard } from "@/components/ratio-card";
import { NonCalculableList } from "@/components/non-calculable-list";
import { ScaleBars } from "@/components/scale-bars";
import { dfCompositionRow, DF_MAX } from "@/lib/chart-data";

export const metadata: Metadata = { title: "Ville · fonctionnement" };

export default function VilleFonctionnementPage() {
  const ratios = villeRatios().filter((r) =>
    ["ville-epargne-brute", "ville-masse-salariale", "ville-cessions", "ville-entretien", "ville-heures-sup"].includes(r.id),
  );

  const rows = [
    ["Recettes de fonctionnement", villeCa2025.recettesFonctionnement],
    ["Dont impôts et taxes", villeCa2025.impotEtTaxes],
    ["Dont dotations", villeCa2025.dotations],
    ["Dépenses (hors frais financiers et CRFIP)", villeCa2025.depensesFonctionnementHorsFrais],
    ["Personnel", villeCa2025.depensesPersonnel],
    ["Subventions et participations", villeCa2025.subventions],
    ["Dont CCAS", villeCa2025.subventionCcas],
    ["Autres dépenses de fonctionnement", villeCa2025.autresDepensesFonctionnement],
    ["Chapitre 011 (charges générales)", villeCa2025.chapitre011],
    ["Entretien courant (articles 615)", villeCa2025.entretienCourant],
    ["Frais financiers (intérêts)", villeCa2025.fraisFinanciers],
    ["Épargne brute", villeCa2025.epargneBrute],
    ["Cessions d’actifs", villeCa2025.cessions],
  ] as const;

  const masse =
    (villeCa2025.depensesPersonnel.euros! / villeCa2025.depensesFonctionnementHorsFrais.euros!) * 100;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <SectionNav current="/ville/fonctionnement" />
      <h1 className="mt-6 font-heading text-4xl font-bold">
        Ville · fonctionnement 2025
        <span className="text-rouge">.</span>
      </h1>
      <p className="mt-3 max-w-2xl text-ink/80">
        Budget principal. Nomenclature des pièces : chapitre 011, postes agrégés
        du rapport. Les intérêts de la dette sont ici ; le capital est en
        investissement. Masse salariale : {formatPercent(masse)} du
        fonctionnement hors frais financiers.
      </p>
      <div className="mt-8">
        <ScaleBars
          title="Composition des dépenses de fonctionnement"
          caption="Même échelle que le total hors frais financiers. Survol = pièce et page."
          maxEuros={DF_MAX}
          rows={[dfCompositionRow()]}
        />
      </div>
      <div className="mt-8 overflow-x-auto rounded-xl border bg-white shadow-[0_1px_8px_rgba(15,23,42,0.06)]">
        <table className="w-full min-w-[32rem] text-sm">
          <thead className="bg-muted/50 text-left">
            <tr>
              <th className="px-4 py-3 font-heading">Poste</th>
              <th className="px-4 py-3 font-heading">Montant</th>
              <th className="px-4 py-3 font-heading">Source</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([label, amount]) => (
              <tr key={label} className="border-t border-line">
                <td className="px-4 py-2.5">{label}</td>
                <td className="px-4 py-2.5 font-heading font-semibold tabular-nums">
                  {amount.precision === "exact"
                    ? formatEuros(amount.euros!, true)
                    : formatMillions(amount.euros!)}
                </td>
                <td className="px-4 py-2.5">
                  <SourceCite source={amount.source} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {knownRatios(ratios).map((r) => (
          <RatioCard key={r.id} ratio={r} />
        ))}
      </div>
      <NonCalculableList ratios={ratios} />
    </div>
  );
}
