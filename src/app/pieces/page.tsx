import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { allPieces } from "@/data/documents";
import type { DocumentStatus } from "@/data/types";
import { PiecesSearch } from "@/components/pieces-search";
import { NOMENCLATURE_ACTES } from "@/data/nomenclature";

export const metadata: Metadata = { title: "Pièces" };

const statusLabel: Record<DocumentStatus, string> = {
  available: "Disponible",
  external: "Lien officiel",
  integrating: "En cours d’intégration",
  missing: "Document manquant",
  offbundle: "Hors bundle",
};

export default function PiecesPage() {
  const groups = [
    { title: "Comptes, DM et maquettes", kinds: ["ca", "dm", "gestion"] },
    { title: "Règles et orientations", kinds: ["rbf", "cctp", "dob"] },
    { title: "Conseil du 27 mars 2026", kinds: ["pv", "delib", "liste"] },
    { title: "Autres pièces du fonds", kinds: ["convention", "autre"] },
  ] as const;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="font-heading text-4xl font-bold">
        Fonds documentaire
        <span className="text-rouge">.</span>
      </h1>
      <p className="mt-3 max-w-3xl text-ink/80">
        Pièces du conseil nommées par leur fichier réel (01. CCTP, 04. Maquette
        CA 2025, 06. Maquette DM n°1, 02. Règlement budgétaire et financier…).{" "}
        {NOMENCLATURE_ACTES} Les 46 PDF du fonds se téléchargent ici. Les deux
        pièces foncieres volumineuses (33. Promesse, 34. Promesse d’achat) ont
        un bouton de téléchargement sur leur fiche.
      </p>
      <PiecesSearch />
      {groups.map((group) => {
        const docs = allPieces.filter((p) =>
          (group.kinds as readonly string[]).includes(p.kind),
        );
        if (docs.length === 0) return null;
        return (
          <section key={group.title} className="mt-10">
            <h2 className="font-heading text-2xl font-semibold">{group.title}</h2>
            <ul className="mt-4 divide-y divide-line overflow-hidden rounded-xl border bg-white shadow-[0_1px_8px_rgba(15,23,42,0.06)]">
              {docs.map((doc) => (
                <li key={doc.id} className="flex flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-medium">{doc.title}</p>
                    {doc.nomenclature ? (
                      <p className="text-xs text-ink/70">{doc.nomenclature}</p>
                    ) : null}
                    {doc.note ? <p className="text-xs text-ink/70">{doc.note}</p> : null}
                  </div>
                  <div className="flex shrink-0 flex-wrap items-center gap-2">
                    <Badge
                      variant="outline"
                      className={
                        doc.status === "available"
                          ? "border-vert-1/40 text-vert-1"
                          : doc.status === "missing"
                            ? "border-rouge/40 text-rouge"
                            : doc.status === "offbundle"
                              ? "border-violet/40 text-violet"
                              : doc.status === "integrating"
                                ? "border-jaune bg-jaune/30 text-ink"
                                : ""
                      }
                    >
                      {statusLabel[doc.status]}
                    </Badge>
                    <Link href={`/pieces/${doc.id}`} className="text-sm text-ink underline decoration-rose/40 hover:text-rouge">
                      Fiche
                    </Link>
                    {doc.href ? (
                      <a
                        href={doc.href}
                        download={doc.status === "offbundle" ? undefined : true}
                        target={doc.status === "offbundle" ? "_blank" : undefined}
                        rel={doc.status === "offbundle" ? "noreferrer" : undefined}
                        className="text-sm text-ink underline decoration-rose/40 underline-offset-2 hover:text-rouge"
                      >
                        {doc.status === "offbundle" ? "GitHub Release" : "Télécharger"}
                      </a>
                    ) : null}
                    {doc.externalUrl ? (
                      <a
                        href={doc.externalUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm text-ink underline decoration-rose/40 hover:text-rouge"
                      >
                        Source
                      </a>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
