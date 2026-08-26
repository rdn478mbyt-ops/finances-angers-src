import type { RatioResult } from "@/data/types";
import { formatEuros, formatPercent, formatYears } from "@/lib/format";
import { SourceCite } from "./source-cite";
import { GaugeWrap } from "./threshold-gauge";
import { cn } from "@/lib/utils";

const toneClass: Record<RatioResult["tone"], string> = {
  bon: "bg-vert-1/10 text-vert-1 border-vert-1/30",
  cible: "bg-vert-1/10 text-vert-1 border-vert-1/30",
  intermédiaire: "bg-jaune/35 text-ink border-jaune",
  alerte: "bg-rose/20 text-rouge border-rose",
  critique: "bg-rouge/10 text-rouge border-rouge/40",
  "sous-investissement": "bg-violet/10 text-violet border-violet/30",
  "hors-cible": "bg-jaune/30 text-ink border-jaune",
  inconnu: "bg-muted text-ink/80 border-border",
};

const toneLabel: Record<RatioResult["tone"], string> = {
  bon: "Bon",
  cible: "Dans la cible",
  intermédiaire: "Intermédiaire",
  alerte: "Alerte",
  critique: "Critique",
  "sous-investissement": "Sous-investissement possible",
  "hors-cible": "Hors cible",
  inconnu: "Non calculable",
};

function display(ratio: RatioResult) {
  if (ratio.value === null) return "non calculable";
  if (ratio.unit === "percent") return formatPercent(ratio.value);
  if (ratio.unit === "years") return formatYears(ratio.value);
  return formatEuros(ratio.value);
}

export function RatioCard({ ratio, compact = false }: { ratio: RatioResult; compact?: boolean }) {
  return (
    <article
      className={cn(
        "flex flex-col gap-3 rounded-xl border bg-white p-4 shadow-[0_1px_8px_rgba(15,23,42,0.06)]",
        compact && "p-3",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-ink/70">
            {ratio.entity === "ville" ? "Ville" : ratio.entity === "boa" ? "BOA" : "Ville + BOA"}
          </p>
          <h3 className="mt-1 font-heading text-lg font-semibold leading-tight text-ink">
            {ratio.label}
          </h3>
        </div>
        <span
          className={cn(
            "shrink-0 rounded-full border px-2.5 py-0.5 text-[11px] font-medium",
            toneClass[ratio.tone],
          )}
        >
          {toneLabel[ratio.tone]}
        </span>
      </div>
      <p className="font-heading text-3xl font-bold tracking-tight text-ink tabular-nums">
        {display(ratio)}
      </p>
      <GaugeWrap id={ratio.id} value={ratio.value} />
      {!compact && (
        <>
          <p className="text-sm leading-relaxed text-ink/80">{ratio.reading}</p>
          <p className="text-xs leading-relaxed text-ink/80">{ratio.formula}</p>
        </>
      )}
      {ratio.source ? <SourceCite source={ratio.source} /> : null}
      {ratio.missing ? (
        <p className="rounded-md bg-rose/10 px-2 py-1.5 text-xs text-ink">{ratio.missing}</p>
      ) : null}
    </article>
  );
}
