import type { Metadata } from "next";
import { Suspense } from "react";
import { ExplorerApp } from "@/components/explorer-app";

export const metadata: Metadata = { title: "Explorateur" };

export default function ExplorerPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-8 pt-5">
      <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-rouge">
        Compte de gestion · maquette CA
      </p>
      <h1 className="mt-1.5 font-heading text-3xl font-bold">
        Explorateur budgétaire
        <span className="text-rouge">.</span>
      </h1>
      <p className="mt-1.5 max-w-3xl text-sm text-ink/80">
        Chapitre → compte → ligne, sourcé du CG DGFIP et de la maquette CA —
        pas des agrégats du rapport de vote.
      </p>
      <Suspense
        fallback={
          <p className="mt-4 text-sm text-ink/70">
            Chargement de l’index (compte de gestion + maquette CA)…
          </p>
        }
      >
        <ExplorerApp />
      </Suspense>
    </div>
  );
}
