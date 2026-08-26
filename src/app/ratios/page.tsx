import type { Metadata } from "next";
import { RatioCard } from "@/components/ratio-card";
import { villeRatios, boaRatios, knownRatios } from "@/lib/ratios";
import { detteNote } from "@/data/figures";
import { SourceCite } from "@/components/source-cite";
import { HorizonFnesr, AujourdhuiBadge } from "@/components/horizon-fnesr";

export const metadata: Metadata = { title: "Grille FNESR" };

export default function RatiosPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="font-heading text-4xl font-bold">
        Grille de lecture opposition
        <span className="text-rouge">.</span>
      </h1>
      <p className="mt-3 max-w-3xl text-ink/80">
        Atelier FNESR-Condorcet, 26 août 2026, Blois. Seuils visuels, pas un
        tract. Deux sections (fonctionnement / investissement), deux entités
        (Ville / BOA). Capital de la dette en investissement, intérêts en
        fonctionnement.
      </p>

      <section className="mt-8 rounded-xl border bg-white p-5 shadow-[0_1px_8px_rgba(15,23,42,0.06)]">
        <h2 className="font-heading text-xl font-semibold">Dette</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm">
          <li>{detteNote.capital}</li>
          <li>{detteNote.interets}</li>
        </ul>
        <div className="mt-2">
          <SourceCite source={detteNote.source} />
        </div>
      </section>

      <section id="ratios" className="mt-10">
        <div className="flex flex-wrap items-center gap-2">
          <AujourdhuiBadge />
          <h2 className="font-heading text-2xl font-semibold">Ville</h2>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {knownRatios(villeRatios()).map((r) => (
            <RatioCard key={r.id} ratio={r} />
          ))}
        </div>
        <h2 className="mt-10 font-heading text-2xl font-semibold">BOA</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {knownRatios(boaRatios()).map((r) => (
            <RatioCard key={r.id} ratio={r} />
          ))}
        </div>
        <HorizonFnesr ratios={[...villeRatios(), ...boaRatios()]} />
      </section>
    </div>
  );
}
