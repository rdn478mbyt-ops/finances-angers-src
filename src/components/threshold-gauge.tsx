import { cn } from "@/lib/utils";

type Zone = { to: number; color: string };
type Marker = { at: number; label: string; color: string };

/** Jauge à zones FNESR — barre horizontale, pas un camembert. */
export function ThresholdGauge({
  value,
  max,
  zones,
  markers,
  ariaLabel,
}: {
  value: number;
  max: number;
  zones: Zone[];
  markers: Marker[];
  ariaLabel: string;
}) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  let from = 0;
  const slices = zones.map((zone) => {
    const width = Math.max(0, ((zone.to - from) / max) * 100);
    const slice = { color: zone.color, width };
    from = zone.to;
    return slice;
  });

  return (
    <div className="mt-1" aria-label={ariaLabel}>
      <div className="relative h-3.5 overflow-visible rounded-full">
        <div className="flex h-3.5 overflow-hidden rounded-full ring-1 ring-ink/10">
          {slices.map((slice, i) => (
            <span
              key={`${slice.color}-${i}`}
              className="h-full"
              style={{ width: `${slice.width}%`, background: slice.color }}
            />
          ))}
        </div>
        <span
          className="absolute top-1/2 z-10 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-ink shadow-sm"
          style={{ left: `${pct}%` }}
          aria-hidden
        />
      </div>
      <ul className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[11px] font-medium text-ink/80">
        {markers.map((m) => (
          <li key={m.at} className="flex items-center gap-1">
            <span
              className="size-2 rounded-full ring-1 ring-ink/15"
              style={{ background: m.color }}
            />
            {m.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ratioGauge(id: string, value: number | null) {
  if (value == null) {
    return (
      <div
        className="mt-1 h-3.5 rounded-full border border-dashed border-ink/30 bg-[repeating-linear-gradient(135deg,#ece8ee_0_6px,#ffffff_6px_12px)]"
        aria-label="Non calculable"
      />
    );
  }
  if (id.includes("epargne")) {
    return (
      <ThresholdGauge
        value={value}
        max={22}
        ariaLabel={`Épargne brute ${value.toFixed(1)} pour cent`}
        zones={[
          { to: 5, color: "#e84250" },
          { to: 8, color: "#fbe216" },
          { to: 15, color: "#a8d3af" },
          { to: 20, color: "#00a870" },
          { to: 22, color: "#ba4e8e" },
        ]}
        markers={[
          { at: 15, label: "15 %", color: "#00a870" },
          { at: 8, label: "8 %", color: "#fbe216" },
          { at: 5, label: "5 %", color: "#e84250" },
        ]}
      />
    );
  }
  if (id.includes("masse")) {
    return (
      <ThresholdGauge
        value={value}
        max={80}
        ariaLabel={`Masse salariale ${value.toFixed(1)} pour cent`}
        zones={[
          { to: 50, color: "#fbe216" },
          { to: 60, color: "#00a870" },
          { to: 80, color: "#e84250" },
        ]}
        markers={[
          { at: 50, label: "50 %", color: "#00a870" },
          { at: 60, label: "60 %", color: "#00a870" },
        ]}
      />
    );
  }
  if (id.includes("capacite")) {
    return (
      <ThresholdGauge
        value={value}
        max={14}
        ariaLabel={`Désendettement ${value.toFixed(1)} ans`}
        zones={[
          { to: 12, color: "#00a870" },
          { to: 14, color: "#e84250" },
        ]}
        markers={[{ at: 12, label: "12 ans", color: "#e84250" }]}
      />
    );
  }
  return null;
}

export function GaugeWrap({
  id,
  value,
  className,
}: {
  id: string;
  value: number | null;
  className?: string;
}) {
  const g = ratioGauge(id, value);
  if (!g) return null;
  return <div className={cn(className)}>{g}</div>;
}
