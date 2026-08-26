import type { Metadata } from "next";
import { SectionNav } from "@/components/section-nav";
import { SourceCite } from "@/components/source-cite";
import { investissementOperations2025, villeCa2025 } from "@/data/figures";
import { formatEuros, formatMillions } from "@/lib/format";
import { villeRatios } from "@/lib/ratios";
import { RatioCard } from "@/components/ratio-card";
import { ScaleBars } from "@/components/scale-bars";

export const metadata: Metadata = { title: "Ville · investissement" };

export default function VilleInvestissementPage() {
  const capa = villeRatios().filter((r) => r.id.startsWith("ville-capacite"));

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <SectionNav current="/ville/investissement" />
      <h1 className="mt-6 font-heading text-4xl font-bold">
        Ville · investissement 2025
        <span className="text-rouge">.</span>
      </h1>
      <p className="mt-3 max-w-2xl text-ink/80">
        Dépenses d’équipement hors remboursement du capital :{" "}
        {formatMillions(villeCa2025.depensesInvestissementHorsDette.euros!)}. Le
        remboursement du capital ({formatMillions(villeCa2025.amortissementCapital.euros!)})
        reste une dépense d’investissement.
      </p>

      <div className="mt-8">
        <ScaleBars
          title="Investissement · même échelle"
          caption="Échelle : dépenses hors dette. Survol = pièce et page."
          maxEuros={villeCa2025.depensesInvestissementHorsDette.euros!}
          rows={[
            {
              id: "di",
              label: "Dépenses hors dette",
              euros: villeCa2025.depensesInvestissementHorsDette.euros,
              color: "#ba4e8e",
              source: villeCa2025.depensesInvestissementHorsDette.source,
            },
            {
              id: "cap",
              label: "Capital remboursé",
              euros: villeCa2025.amortissementCapital.euros,
              color: "#00a870",
              source: villeCa2025.amortissementCapital.source,
            },
            {
              id: "emp",
              label: "Nouveaux emprunts",
              euros: villeCa2025.empruntNouveau.euros,
              color: "#e84250",
              source: villeCa2025.empruntNouveau.source,
            },
          ]}
        />
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <Kpi
          label="Dépenses hors dette"
          value={formatMillions(villeCa2025.depensesInvestissementHorsDette.euros!)}
          source={villeCa2025.depensesInvestissementHorsDette.source}
        />
        <Kpi
          label="Capital remboursé"
          value={formatMillions(villeCa2025.amortissementCapital.euros!)}
          source={villeCa2025.amortissementCapital.source}
        />
        <Kpi
          label="Encours 31/12/2025"
          value={formatMillions(villeCa2025.encoursDette.euros!)}
          source={villeCa2025.encoursDette.source}
        />
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {capa.map((r) => (
          <RatioCard key={r.id} ratio={r} />
        ))}
      </div>

      <h2 className="mt-10 font-heading text-2xl font-semibold">
        Principales opérations
        <span className="text-violet">.</span>
      </h2>
      <p className="mt-1 text-sm text-ink/80">
        <SourceCite
          source={{
            pieceId: "del-2026-164",
            page: 15,
            label: "DEL-2026-164, p. 15",
          }}
        />
      </p>
      <div className="mt-4 overflow-x-auto rounded-xl border bg-white shadow-[0_1px_8px_rgba(15,23,42,0.06)]">
        <table className="w-full min-w-[28rem] text-sm">
          <thead className="bg-muted/50 text-left">
            <tr>
              <th className="px-4 py-3 font-heading">Opération</th>
              <th className="px-4 py-3 text-right font-heading">CA 2025</th>
            </tr>
          </thead>
          <tbody>
            {investissementOperations2025.map((row) => (
              <tr key={row.label} className="border-t border-line">
                <td className={`px-4 py-2 ${"indent" in row && row.indent ? "pl-10 text-ink/70" : ""}`}>
                  {row.label}
                </td>
                <td className="px-4 py-2 text-right font-heading tabular-nums">
                  {formatEuros(row.euros)}
                </td>
              </tr>
            ))}
            <tr className="border-t-2 border-ink/20">
              <td className="px-4 py-3 font-heading font-semibold">Total investissements</td>
              <td className="px-4 py-3 text-right font-heading font-semibold tabular-nums">
                {formatEuros(villeCa2025.depensesInvestissementHorsDette.euros!)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs text-ink/80">
        Gros entretien bâtiments ({formatEuros(villeCa2025.grosEntretienBatiments.euros!)}) : investissement, pas entretien courant.
      </p>
    </div>
  );
}

function Kpi({
  label,
  value,
  source,
}: {
  label: string;
  value: string;
  source: { pieceId: string; page: number | null; label: string } | null;
}) {
  return (
    <article className="rounded-xl border bg-white p-4 shadow-[0_1px_8px_rgba(15,23,42,0.06)]">
      <p className="text-[11px] uppercase tracking-[0.14em] text-ink/70">{label}</p>
      <p className="mt-1 font-heading text-2xl font-bold tabular-nums">{value}</p>
      <SourceCite source={source} />
    </article>
  );
}
