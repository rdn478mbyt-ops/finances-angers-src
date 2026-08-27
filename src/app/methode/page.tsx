import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Méthode" };

export default function MethodePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="font-heading text-4xl font-bold">
        Méthode
        <span className="text-rouge">.</span>
      </h1>
      <p className="mt-4 leading-relaxed text-ink/80">
        Cet outil sert aux élus d’opposition pour lire les finances de la Ville
        d’Angers et de la Boucle optique angevine. Il n’est pas une communication
        de majorité. Chaque montant affiché cite une pièce et une page. Si le
        calcul est impossible, le site écrit « non calculable » et nomme la pièce
        manquante.
      </p>
      <h2 id="prochain-budget" className="mt-8 font-heading text-2xl font-semibold">
        Au prochain budget
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-ink/80">
        La nomenclature évolue au prochain budget (virements entre chapitres, plan
        par politiques publiques). Les documents actuels — CA 2025, DM n°1, conseil
        du 27 mars 2026 — sont lus dans la nomenclature des pièces (chapitre 011,
        postes agrégés du rapport). Cet horizon n’est pas l’état des comptes. Le
        DOB 2026 qualifie la BOA d’instruction M4. Le bandeau en tête de site
        rappelle le calendrier.
      </p>
      <h2 className="mt-8 font-heading text-2xl font-semibold">Sources</h2>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed">
        <li>
          Actes publiés sur data.angers.fr / angers.fr : DEL-2026-164 (CA 2025),
          DEL-2026-163 (compte de gestion), DEL-2026-165 (affectation),
          DEL-2026-166 (DM n°1 2026), DEL-2026-162 (RBF), DEL-2026-2 (DOB 2026).
        </li>
        <li>
          Explorateur budgétaire (<Link href="/explorer" className="underline decoration-rose/40 hover:text-rouge">/explorer</Link>) :
          chapitres de l’état II-3 du compte de gestion, articles du II-4 et
          de la maquette, lignes fonction non nulles de la présentation croisée.
          Pas un recyclage des agrégats du rapport DEL-2026-164.
        </li>
        <li>
          Fonds des 46 PDF : 04. Maquette CA 2025 (Ville + BOA), 06. Maquette DM n°1
          (Ville + BOA), 03. Comptes de gestion, 02. Règlement budgétaire et
          financier, 01. CCTP, PV et cahier du 27 mars, conventions 12–50. Deux
          pièces foncières (33. Promesse, 34. Promesse d’achat) sont hors bundle
          · dépôt privé (trop lourdes pour Hobby).
        </li>
        <li>Grille FNESR, atelier du 26 août 2026.</li>
      </ul>
      <h2 className="mt-8 font-heading text-2xl font-semibold">Ratios</h2>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed">
        <li>Épargne brute ÷ recettes de fonctionnement (k€ du rapport × 1 000).</li>
        <li>
          Masse salariale ÷ total des dépenses de fonctionnement du rapport (hors
          frais financiers et CRFIP).
        </li>
        <li>
          Capacité de désendettement : ratios publiés (avec / hors cessions),
          seuil 12 ans.
        </li>
        <li>
          Cessions : alerte FNESR si elles équilibrent le fonctionnement. Ici
          l’épargne hors cessions reste positive.
        </li>
      </ul>
      <h2 className="mt-8 font-heading text-2xl font-semibold">Typographie</h2>
      <p className="mt-3 text-sm leading-relaxed text-ink/80">
        Charte : Brown (texte) et Stinger Variable Fit (titres, chiffre du bandeau).
        Fichiers auto-hébergés dans <code>src/fonts/</code> — pas Plus Jakarta Sans,
        pas Syne. Déposer les woff2 licenciés au même emplacement pour coller
        strictement aux fichiers de fonderie.
      </p>
      <h2 className="mt-8 font-heading text-2xl font-semibold">Identité</h2>
      <p className="mt-3 text-sm leading-relaxed text-ink/80">
        Mot-marque nationale « Le Parti socialiste » et poing-rose (PNG
        transparents). Aucune référence « Demain Angers ».
      </p>
      <p className="mt-8">
        <Link href="/pieces" className="text-ink underline decoration-rose/40 hover:text-rouge">
          Ouvrir le fonds documentaire →
        </Link>
      </p>
    </div>
  );
}
