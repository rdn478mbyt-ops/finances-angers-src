import type { Metadata } from "next";
import { SourceCite } from "@/components/source-cite";
import { villeAffectation2025, villeCa2025, boaCa2025 } from "@/data/figures";
import { formatEuros, formatMillions } from "@/lib/format";
import { FaceAFace } from "@/components/face-a-face";
import { ScaleBars } from "@/components/scale-bars";
import { caVsDmRows, DF_MAX, EB_MAX, villeBoaRows } from "@/lib/chart-data";

export const metadata: Metadata = { title: "Comparaisons" };

export default function ComparaisonsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="font-heading text-4xl font-bold">
        Comparaisons
        <span className="text-rouge">.</span>
      </h1>
      <p className="mt-3 max-w-3xl text-ink/80">
        Fonctionnement vs investissement, Ville vs BOA, CA 2025 vs DM n°1 2026.
        La DM n°1 porte sur l’exercice 2026 : ce n’est pas une exécution 2025.
        Les deux actes ont été votés le 29 juin 2026.
      </p>

      <div className="mt-8">
        <FaceAFace
          left={{
            title: "Ville · fonctionnement",
            href: "/ville/fonctionnement",
            rows: [
              { label: "Recettes", value: formatMillions(villeCa2025.recettesFonctionnement.euros!), source: villeCa2025.recettesFonctionnement.source },
              { label: "Dépenses (hors frais)", value: formatMillions(villeCa2025.depensesFonctionnementHorsFrais.euros!), source: villeCa2025.depensesFonctionnementHorsFrais.source },
              { label: "Épargne brute", value: formatMillions(villeCa2025.epargneBrute.euros!), source: villeCa2025.epargneBrute.source },
              { label: "Intérêts", value: formatMillions(villeCa2025.fraisFinanciers.euros!), source: villeCa2025.fraisFinanciers.source },
            ],
          }}
          right={{
            title: "Ville · investissement",
            href: "/ville/investissement",
            rows: [
              { label: "Dépenses hors dette", value: formatMillions(villeCa2025.depensesInvestissementHorsDette.euros!), source: villeCa2025.depensesInvestissementHorsDette.source },
              { label: "Capital remboursé", value: formatMillions(villeCa2025.amortissementCapital.euros!), source: villeCa2025.amortissementCapital.source },
              { label: "Nouveaux emprunts", value: formatMillions(villeCa2025.empruntNouveau.euros!), source: villeCa2025.empruntNouveau.source },
              { label: "Encours 31/12", value: formatMillions(villeCa2025.encoursDette.euros!), source: villeCa2025.encoursDette.source },
            ],
          }}
        />
      </div>

      <div className="mt-8 space-y-6">
        <ScaleBars
          title="Ville vs BOA · même échelle"
          caption="Échelle : épargne brute Ville. Hover = pièce et page."
          maxEuros={EB_MAX}
          rows={villeBoaRows()}
        />
        <ScaleBars
          title="CA 2025 vs DM n°1 2026 · même échelle"
          caption="Échelle : DF CA 2025. Exercices distincts."
          maxEuros={DF_MAX}
          rows={caVsDmRows()}
        />
      </div>

      <h2 className="mt-10 font-heading text-2xl font-semibold">Ville vs BOA · clôture 2025</h2>
      <div className="mt-4 overflow-x-auto rounded-xl border bg-white shadow-[0_1px_8px_rgba(15,23,42,0.06)]">
        <table className="w-full min-w-[40rem] text-sm">
          <thead className="bg-muted/50 text-left">
            <tr>
              <th className="px-4 py-3 font-heading">Indicateur</th>
              <th className="px-4 py-3 font-heading">Ville</th>
              <th className="px-4 py-3 font-heading">BOA</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-line">
              <td className="px-4 py-2.5">Résultat de fonctionnement de l’exercice</td>
              <td className="px-4 py-2.5">
                <div className="font-sans font-bold tabular-nums">
                  {formatEuros(villeAffectation2025.villeResultatFonctionnementExercice.euros, true)}
                </div>
                <SourceCite source={villeAffectation2025.villeResultatFonctionnementExercice.source} />
              </td>
              <td className="px-4 py-2.5">
                <div className="font-sans font-bold tabular-nums">
                  {formatEuros(boaCa2025.resultatFonctionnementExercice.euros, true)}
                </div>
                <SourceCite source={boaCa2025.resultatFonctionnementExercice.source} />
              </td>
            </tr>
            <tr className="border-t border-line">
              <td className="px-4 py-2.5">Résultat d’investissement de l’exercice</td>
              <td className="px-4 py-2.5">
                <div className="font-sans font-bold tabular-nums">
                  {formatEuros(villeAffectation2025.villeResultatInvestissementExercice.euros, true)}
                </div>
                <SourceCite source={villeAffectation2025.villeResultatInvestissementExercice.source} />
              </td>
              <td className="px-4 py-2.5">
                <div className="font-sans font-bold tabular-nums">
                  {formatEuros(boaCa2025.resultatInvestissementExercice.euros, true)}
                </div>
                <SourceCite source={boaCa2025.resultatInvestissementExercice.source} />
              </td>
            </tr>
            <tr className="border-t border-line">
              <td className="px-4 py-2.5">Épargne brute</td>
              <td className="px-4 py-2.5">
                <div className="font-sans font-bold tabular-nums">
                  {formatMillions(villeCa2025.epargneBrute.euros!)}
                </div>
                <SourceCite source={villeCa2025.epargneBrute.source} />
              </td>
              <td className="px-4 py-2.5">
                <div className="font-sans font-bold tabular-nums">
                  {formatEuros(boaCa2025.epargneBrute.euros!, true)}
                </div>
                <SourceCite source={boaCa2025.epargneBrute.source} />
              </td>
            </tr>
            <tr className="border-t border-line">
              <td className="px-4 py-2.5">Encours de dette</td>
              <td className="px-4 py-2.5">
                <div className="font-sans font-bold tabular-nums">
                  {formatMillions(villeCa2025.encoursDette.euros!)}
                </div>
                <SourceCite source={villeCa2025.encoursDette.source} />
              </td>
              <td className="px-4 py-2.5 text-xs text-ink/80">{boaCa2025.encoursDette.missing}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
