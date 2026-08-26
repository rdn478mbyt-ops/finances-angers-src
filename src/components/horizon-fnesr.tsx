import { fhesrAujourdhui, fhesrHorizon } from "@/data/nomenclature";
import { Badge } from "@/components/ui/badge";
import { NonCalculableList } from "@/components/non-calculable-list";
import type { RatioResult } from "@/data/types";

export function HorizonFnesr({ ratios = [] }: { ratios?: RatioResult[] }) {
  return (
    <section className="mt-10">
      <div className="flex flex-wrap items-center gap-2">
        <Badge className="bg-violet text-white hover:bg-violet">{fhesrHorizon.badge}</Badge>
        <h3 className="font-heading text-xl font-semibold">{fhesrHorizon.title}</h3>
      </div>
      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ink/80">{fhesrHorizon.lead}</p>
      <NonCalculableList ratios={ratios} includeHorizon />
    </section>
  );
}

export function AujourdhuiBadge() {
  return (
    <Badge className="bg-vert-1 text-white hover:bg-vert-1">{fhesrAujourdhui.badge}</Badge>
  );
}
