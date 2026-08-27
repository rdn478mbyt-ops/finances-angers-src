import type { Metadata } from "next";
import { Suspense } from "react";
import { ExplorerApp } from "@/components/explorer-app";

export const metadata: Metadata = { title: "Explorateur" };

export default function ExplorerPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-rouge">
        Compte de gestion · maquette CA
      </p>
      <h1 className="mt-3 font-heading text-4xl font-bold">
        Explorateur budgétaire
        <span className="text-rouge">.</span>
      </h1>
      <p className="mt-3 max-w-3xl text-ink/80">
        Lecture chapitre → compte → ligne, sourcée du compte de gestion DGFIP
        (état II-3 / II-4) et de la maquette du compte administratif — pas des
        agrégats du rapport de vote. CG Ville : 77 pages, ~458 n° de comptes,
        ~5 100 montants. Maquette CA Ville : 474 pages, ~47 000 montants
        (présentation croisée, y compris zéros). Ici : chapitres du vote,
        articles à montant, lignes fonction non nulles.
      </p>
      <Suspense
        fallback={
          <p className="mt-8 text-sm text-ink/70">
            Chargement de l’index (compte de gestion + maquette CA)…
          </p>
        }
      >
        <ExplorerApp />
      </Suspense>
    </div>
  );
}
