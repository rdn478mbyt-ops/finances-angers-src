import type { RatioResult } from "@/data/types";
import { fhesrHorizon } from "@/data/nomenclature";
import { SourceCite } from "@/components/source-cite";
import { unknownRatios } from "@/lib/ratios";

export function NonCalculableList({
  ratios,
  includeHorizon = false,
}: {
  ratios: RatioResult[];
  includeHorizon?: boolean;
}) {
  const unknown = unknownRatios(ratios);
  const horizon = includeHorizon ? fhesrHorizon.items : [];
  if (unknown.length === 0 && horizon.length === 0) return null;

  return (
    <section className="mt-6 rounded-xl border border-dashed border-ink/20 bg-muted/50 px-4 py-3">
      <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-ink/70">
        Non calculable
      </p>
      <p className="mt-1 text-xs text-ink/70">
        Sur les pièces actuelles — une liste, pas des cartes vides.
      </p>
      <ul className="mt-2 divide-y divide-line">
        {unknown.map((ratio) => (
          <li key={ratio.id} className="py-2.5">
            <p className="text-sm font-medium text-ink">{ratio.label}</p>
            <p className="mt-0.5 text-xs leading-relaxed text-ink/80">
              {ratio.missing ?? ratio.reading}
            </p>
            {ratio.source ? (
              <span className="mt-1 block">
                <SourceCite source={ratio.source} />
              </span>
            ) : null}
          </li>
        ))}
        {horizon.map((item) => (
          <li key={item.id} className="py-2.5">
            <p className="text-sm font-medium text-ink">{item.label}</p>
            <p className="mt-0.5 text-xs leading-relaxed text-ink/80">{item.missing}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
