import Link from "next/link";
import { RatioCard } from "@/components/ratio-card";
import { MissingDocs } from "@/components/missing-docs";
import { FaceAFace } from "@/components/face-a-face";
import { ScaleBars } from "@/components/scale-bars";
import { HorizonFnesr, AujourdhuiBadge } from "@/components/horizon-fnesr";
import { villeRatios, boaRatios, knownRatios } from "@/lib/ratios";
import { formatEuros, formatMillions } from "@/lib/format";
import { villeCa2025, villeAffectation2025, boaCa2025, dm1_2026 } from "@/data/figures";
import { SourceCite } from "@/components/source-cite";
import { fhesrAujourdhui } from "@/data/nomenclature";
import { caVsDmRows, DF_MAX, EB_MAX, villeBoaRows } from "@/lib/chart-data";

export default function HomePage() {
  const ville = villeRatios();
  const boa = boaRatios();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
      <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-rouge">
        Outil de travail · élus d’opposition
      </p>
      <h1 className="mt-3 max-w-4xl font-heading text-4xl font-bold leading-[1.05] text-ink sm:text-5xl">
        Finances de la Ville d’Angers
        <span className="text-rouge">.</span>
      </h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink/80">
        Lecture des actes publics — compte administratif 2025, affectation,
        DM n°1 2026. Deux sections, deux entités. Chaque chiffre porte sa
        pièce et sa page. Pas une vitrine.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href="/explorer?entity=ville&section=fonctionnement"
          className="rounded-full bg-rouge px-4 py-2 text-sm font-medium text-white shadow-[0_1px_6px_rgba(232,66,80,0.35)] hover:bg-rouge/90"
        >
          Explorateur budgétaire
        </Link>
        <Link
          href="/pieces/3a04-maquette-ca-ville"
          className="rounded-full border border-line bg-white px-4 py-2 text-sm font-medium hover:border-rose"
        >
          Ouvrir le CA 2025
        </Link>
        <Link
          href="/pieces/3a06-maquette-dm1-ville"
          className="rounded-full border border-line bg-white px-4 py-2 text-sm font-medium hover:border-rose"
        >
          Ouvrir la DM n°1 2026
        </Link>
        <Link
          href="/comparaisons"
          className="rounded-full border border-line bg-white px-4 py-2 text-sm font-medium hover:border-rose"
        >
          Comparer Ville / BOA
        </Link>
      </div>

      <section className="mt-12">
        <h2 className="font-heading text-3xl font-bold">
          Fonctionnement | investissement
          <span className="text-vert-1">.</span>
        </h2>
        <p className="mt-2 max-w-3xl text-sm text-ink/80">
          Clic = explorateur (chapitre → compte), sourcé du CG et de la maquette.
        </p>
        <div className="mt-5">
          <FaceAFace
            left={{
              title: "Ville · fonctionnement",
              href: "/explorer?entity=ville&section=fonctionnement",
              rows: [
                { label: "Recettes", value: formatMillions(villeCa2025.recettesFonctionnement.euros!), source: villeCa2025.recettesFonctionnement.source },
                { label: "Dépenses (hors frais)", value: formatMillions(villeCa2025.depensesFonctionnementHorsFrais.euros!), source: villeCa2025.depensesFonctionnementHorsFrais.source },
                { label: "Épargne brute", value: formatMillions(villeCa2025.epargneBrute.euros!), source: villeCa2025.epargneBrute.source },
                { label: "Intérêts", value: formatMillions(villeCa2025.fraisFinanciers.euros!), source: villeCa2025.fraisFinanciers.source },
              ],
            }}
            right={{
              title: "Ville · investissement",
              href: "/explorer?entity=ville&section=investissement",
              rows: [
                { label: "Dépenses hors dette", value: formatMillions(villeCa2025.depensesInvestissementHorsDette.euros!), source: villeCa2025.depensesInvestissementHorsDette.source },
                { label: "Capital remboursé", value: formatMillions(villeCa2025.amortissementCapital.euros!), source: villeCa2025.amortissementCapital.source },
                { label: "Nouveaux emprunts", value: formatMillions(villeCa2025.empruntNouveau.euros!), source: villeCa2025.empruntNouveau.source },
                { label: "Encours 31/12", value: formatMillions(villeCa2025.encoursDette.euros!), source: villeCa2025.encoursDette.source },
              ],
            }}
          />
        </div>
      </section>

      <section id="ratios" className="mt-14">
        <div className="flex flex-wrap items-center gap-2">
          <AujourdhuiBadge />
          <h2 className="font-heading text-3xl font-bold">
            Grille FNESR
            <span className="text-rose">.</span>
          </h2>
        </div>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ink/80">
          {fhesrAujourdhui.lead} Seuils : épargne brute bon ~15 %, alerte &lt; 8 %,
          plus d’autofinancement &lt; 5 %, possible sous-investissement &gt; 20 %.
          Masse salariale : 50–60 %. Désendettement : 12 ans. Capital = investissement,
          intérêts = fonctionnement. Le détail par chapitre et compte n’est pas
          dans ces agrégats :{" "}
          <Link href="/explorer" className="underline decoration-rose/40 hover:text-rouge">
            explorateur
          </Link>{" "}
          (compte de gestion + maquette).
        </p>
        <h3 className="mt-8 font-heading text-xl font-semibold">Budget principal (Ville)</h3>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {knownRatios(ville).map((ratio) => (
            <RatioCard key={ratio.id} ratio={ratio} />
          ))}
        </div>
        <h3 className="mt-10 font-heading text-xl font-semibold">Boucle optique angevine</h3>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {knownRatios(boa).map((ratio) => (
            <RatioCard key={ratio.id} ratio={ratio} compact />
          ))}
        </div>
        <HorizonFnesr ratios={[...ville, ...boa]} />
      </section>

      <section className="mt-14 space-y-6">
        <h2 className="font-heading text-3xl font-bold">
          Ville / BOA · CA / DM
          <span className="text-violet">.</span>
        </h2>
        <p className="max-w-3xl text-sm text-ink/80">
          Barres empilées, même échelle. Survol = pièce et page. Pas de camembert.
          CA 2025 et DM n°1 2026 sont deux exercices distincts.
        </p>
        <ScaleBars
          title="Ville vs BOA · clôture 2025"
          caption="Même échelle (épargne brute Ville). L’épargne BOA (33 263 €) est visible au zoom, pas à l’échelle de la Ville."
          maxEuros={EB_MAX}
          rows={villeBoaRows()}
        />
        <ScaleBars
          title="CA 2025 vs DM n°1 2026"
          caption="Même échelle (dépenses de fonctionnement CA 2025). La DM est un ajustement d’exercice 2026, pas une exécution 2025."
          maxEuros={DF_MAX}
          rows={caVsDmRows()}
        />
      </section>

      <section className="mt-14 grid gap-4 md:grid-cols-2">
        <article className="rounded-xl border bg-white p-5 shadow-[0_1px_8px_rgba(15,23,42,0.06)]">
          <p className="text-[11px] uppercase tracking-[0.16em] text-ink/70">BOA</p>
          <h3 className="mt-1 font-heading text-2xl font-semibold">Résultat 2025</h3>
          <dl className="mt-4 space-y-2 text-sm">
            <Row label="Résultat de fonctionnement" value={formatEuros(boaCa2025.resultatFonctionnementExercice.euros, true)} source={boaCa2025.resultatFonctionnementExercice.source} />
            <Row label="Résultat d’investissement" value={formatEuros(boaCa2025.resultatInvestissementExercice.euros, true)} source={boaCa2025.resultatInvestissementExercice.source} />
            <Row label="Excédent cumulé de fonctionnement" value={formatEuros(boaCa2025.excesFonctionnementCumule.euros, true)} source={boaCa2025.excesFonctionnementCumule.source} />
          </dl>
          <p className="mt-3 text-xs text-ink/80">
            Recettes réelles d’exploitation {formatEuros(boaCa2025.recettesFonctionnement.euros!, true)},
            épargne brute {formatEuros(boaCa2025.epargneBrute.euros!, true)}{" "}
            <SourceCite source={boaCa2025.epargneBrute.source} />.
          </p>
          <Link href="/explorer?entity=boa&section=fonctionnement" className="mt-4 inline-block text-sm text-ink underline decoration-rose/40 hover:text-rouge">
            Explorateur BOA →
          </Link>
        </article>
        <article className="rounded-xl border bg-white p-5 shadow-[0_1px_8px_rgba(15,23,42,0.06)]">
          <p className="text-[11px] uppercase tracking-[0.16em] text-ink/70">DM n°1 · 2026</p>
          <h3 className="mt-1 font-heading text-2xl font-semibold">Ajustements votés</h3>
          <dl className="mt-4 space-y-2 text-sm">
            <Row label="Nouvelles dépenses de fonctionnement" value={formatEuros(dm1_2026.fonctionnementNouvellesDepenses.euros)} source={dm1_2026.fonctionnementNouvellesDepenses.source} />
            <Row label="Nouvelles dépenses d’investissement" value={formatEuros(dm1_2026.investissementNouvellesDepenses.euros)} source={dm1_2026.investissementNouvellesDepenses.source} />
            <Row label="Total DM (équilibrée)" value={formatEuros(dm1_2026.totalDm.euros)} source={dm1_2026.totalDm.source} />
          </dl>
          <p className="mt-3 text-xs text-ink/80">
            Exercice 2026, distinct du CA 2025. Maquette :{" "}
            <Link href="/pieces/3a06-maquette-dm1-ville" className="underline decoration-rose/40 hover:text-rouge">
              06. Maquette DM n°1
            </Link>
            .
          </p>
          <Link href="/comparaisons" className="mt-4 inline-block text-sm text-ink underline decoration-rose/40 hover:text-rouge">
            CA 2025 vs DM n°1 →
          </Link>
        </article>
      </section>

      <p className="mt-4 text-sm text-ink/80">
        Résultat global de clôture 2025 (Ville + BOA) avant restes à réaliser :{" "}
        <strong>{formatEuros(villeAffectation2025.resultatGlobalAvantRar.euros, true)}</strong>
        . Après RAR : {formatEuros(villeAffectation2025.resultatGlobalApresRar.euros, true)}.{" "}
        <SourceCite source={villeAffectation2025.resultatGlobalAvantRar.source} />
      </p>

      <div className="mt-14">
        <MissingDocs />
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  source,
}: {
  label: string;
  value: string;
  source: { pieceId: string; page: number | null; label: string } | null;
}) {
  return (
    <div className="flex items-baseline justify-between gap-3 border-b border-line/80 py-1.5">
      <dt className="text-ink/70">{label}</dt>
      <dd className="text-right">
        <span className="font-sans font-bold tabular-nums">{value}</span>
        <span className="mt-0.5 block">
          <SourceCite source={source} />
        </span>
      </dd>
    </div>
  );
}
