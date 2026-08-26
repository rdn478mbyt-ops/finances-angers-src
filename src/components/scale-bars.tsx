"use client";

import type { Source } from "@/data/types";
import { formatEuros, formatMillions } from "@/lib/format";
import { SourceCite } from "@/components/source-cite";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export type StackSegment = {
  id: string;
  label: string;
  euros: number;
  color: string;
  source: Source | null;
};

export type ScaleRow = {
  id: string;
  label: string;
  missing?: string | null;
  segments?: StackSegment[];
  euros?: number | null;
  color?: string;
  source?: Source | null;
};

export function ScaleBars({
  title,
  caption,
  maxEuros,
  rows,
}: {
  title: string;
  caption?: string;
  maxEuros: number;
  rows: ScaleRow[];
}) {
  return (
    <section className="rounded-xl border bg-white p-5 shadow-[0_1px_8px_rgba(15,23,42,0.06)]">
      <h3 className="font-heading text-xl font-semibold">{title}</h3>
      {caption ? <p className="mt-1 text-sm text-ink/80">{caption}</p> : null}
      <p className="mt-1 text-xs text-ink/80">Échelle commune : {formatMillions(maxEuros)}</p>
      <ul className="mt-4 space-y-4">
        {rows.map((row) => (
          <li key={row.id}>
            <div className="mb-1 flex items-baseline justify-between gap-2 text-sm">
              <span className="font-medium text-ink">{row.label}</span>
              <span className="font-sans font-bold tabular-nums">
                {row.missing
                  ? "non calculable"
                  : formatDisplay(row)}
              </span>
            </div>
            <Bar maxEuros={maxEuros} row={row} />
            <div className="mt-1">
              {row.missing ? (
                <p className="text-xs text-ink/80">{row.missing}</p>
              ) : row.segments ? (
                <ul className="flex flex-wrap gap-x-3 gap-y-1">
                  {row.segments.map((seg) => (
                    <li key={seg.id} className="text-xs text-ink/80">
                      <span
                        className="mr-1 inline-block size-2 rounded-sm align-middle"
                        style={{ background: seg.color }}
                      />
                      {seg.label} {formatEuros(seg.euros)}{" "}
                      <SourceCite source={seg.source} />
                    </li>
                  ))}
                </ul>
              ) : (
                <SourceCite source={row.source ?? null} />
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

function formatDisplay(row: ScaleRow) {
  const total =
    row.segments?.reduce((s, seg) => s + seg.euros, 0) ?? row.euros ?? 0;
  if (Math.abs(total) >= 1_000_000) return formatMillions(total);
  return formatEuros(total, Math.abs(total) < 100_000);
}

function Bar({ maxEuros, row }: { maxEuros: number; row: ScaleRow }) {
  if (row.missing) {
    return (
      <div
        className="h-7 w-full rounded-md border border-dashed border-ink/25 bg-[repeating-linear-gradient(135deg,#ece8ee_0_6px,#ffffff_6px_12px)]"
        aria-label={`${row.label} : non calculable`}
      />
    );
  }
  const segments = row.segments
    ? row.segments
    : row.euros != null
      ? [
          {
            id: row.id,
            label: row.label,
            euros: Math.abs(row.euros),
            color: row.color ?? "#00a870",
            source: row.source ?? null,
          },
        ]
      : [];
  const total = segments.reduce((s, seg) => s + seg.euros, 0);
  const widthPct = Math.min(100, Math.max(total > 0 ? 1.4 : 0, (total / maxEuros) * 100));

  return (
    <div className="h-7 w-full rounded-md bg-line/80" aria-hidden={false}>
      <div className="flex h-full overflow-hidden rounded-md" style={{ width: `${widthPct}%` }}>
        {segments.map((seg) => {
          const share = total > 0 ? (seg.euros / total) * 100 : 0;
          const tip = [
            seg.label,
            formatEuros(seg.euros),
            seg.source?.label,
          ]
            .filter(Boolean)
            .join(" · ");
          return (
            <Tooltip key={seg.id}>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  className={cn(
                    "h-full min-w-[8px] cursor-pointer border-0 p-0 transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ink",
                  )}
                  style={{ width: `${share}%`, background: seg.color }}
                  aria-label={tip}
                />
              </TooltipTrigger>
              <TooltipContent side="top" className="max-w-xs bg-ink text-white">
                <p className="font-medium">{seg.label}</p>
                <p className="tabular-nums">{formatEuros(seg.euros)}</p>
                {seg.source ? <p>{seg.source.label}</p> : null}
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>
    </div>
  );
}
