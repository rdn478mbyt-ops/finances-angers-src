import Link from "next/link";
import type { Source } from "@/data/types";
import { SourceCite } from "@/components/source-cite";
import { cn } from "@/lib/utils";

export type FaceRow = {
  label: string;
  value: string;
  source: Source | null;
};

export function FaceAFace({
  left,
  right,
}: {
  left: { title: string; href: string; kicker?: string; rows: FaceRow[] };
  right: { title: string; href: string; kicker?: string; rows: FaceRow[] };
}) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      <Column side="fonctionnement" {...left} />
      <Column side="investissement" {...right} />
    </div>
  );
}

function Column({
  side,
  title,
  href,
  kicker,
  rows,
}: {
  side: "fonctionnement" | "investissement";
  title: string;
  href: string;
  kicker?: string;
  rows: FaceRow[];
}) {
  const aplat = side === "fonctionnement" ? "bg-vert-1" : "bg-violet";
  return (
    <Link
      href={href}
      className={cn(
        "group rounded-xl p-5 text-white shadow-[0_1px_8px_rgba(15,23,42,0.12)] transition-shadow hover:shadow-[0_4px_16px_rgba(15,23,42,0.18)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink",
        aplat,
      )}
    >
      <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/85">
        {kicker ?? (side === "fonctionnement" ? "Fonctionnement" : "Investissement")}
      </p>
      <h3 className="mt-1 font-heading text-2xl font-bold">{title}</h3>
      <dl className="mt-4 space-y-2">
        {rows.map((row) => (
          <div key={row.label} className="flex items-baseline justify-between gap-3 border-b border-white/20 py-1.5 last:border-0">
            <dt className="text-sm text-white/90">{row.label}</dt>
            <dd className="text-right">
              <span className="font-sans text-lg font-bold tabular-nums">{row.value}</span>
              <span className="mt-0.5 block">
                <SourceCite source={row.source} tone="onDark" />
              </span>
            </dd>
          </div>
        ))}
      </dl>
      <p className="mt-4 text-sm font-medium text-white/90 group-hover:underline">
        Détail du compte →
      </p>
    </Link>
  );
}
