import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { allPieces, FONCIER_RELEASE_ASSETS, pieceById } from "@/data/documents";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return allPieces.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const piece = pieceById(slug);
  return { title: piece?.title ?? "Pièce" };
}

function rbfLabel(file?: string) {
  if (!file?.includes("fnancier")) return null;
  return "Règlement budgétaire et financier";
}

export default async function PiecePage({ params }: Props) {
  const { slug } = await params;
  const piece = pieceById(slug);
  if (!piece) notFound();
  const readable = rbfLabel(piece.file);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <p className="text-sm">
        <Link href="/pieces" className="text-ink underline decoration-rose/40 hover:text-rouge">
          ← Fonds documentaire
        </Link>
      </p>
      <h1 className="mt-4 font-heading text-3xl font-bold">{piece.title}</h1>
      {readable && !piece.title.includes("Règlement budgétaire et financier") ? (
        <p className="mt-1 text-sm text-ink/80">{readable}</p>
      ) : null}
      {piece.file ? <p className="mt-1 font-mono text-xs text-ink/70">{piece.file}</p> : null}
      {piece.session ? <p className="mt-1 text-sm text-ink/70">{piece.session}</p> : null}
      {piece.nomenclature ? <p className="mt-2 text-sm text-ink/80">{piece.nomenclature}</p> : null}
      {piece.note ? <p className="mt-3 text-sm text-ink/80">{piece.note}</p> : null}

      {piece.href ? (
        <>
          <p className="mt-5 flex flex-wrap gap-2">
            <a
              href={
                piece.status === "offbundle" && piece.file && FONCIER_RELEASE_ASSETS[piece.file]
                  ? FONCIER_RELEASE_ASSETS[piece.file].githubUrl
                  : piece.href
              }
              download={piece.status === "offbundle" ? undefined : piece.file}
              target={piece.status === "offbundle" ? "_blank" : undefined}
              rel={piece.status === "offbundle" ? "noreferrer" : undefined}
              className="inline-flex rounded-full bg-rouge px-5 py-2.5 text-sm font-medium text-white hover:bg-rouge/90"
            >
              {piece.status === "offbundle"
                ? `Télécharger le PDF (${piece.file?.startsWith("33.") ? "52 Mo" : "43 Mo"})`
                : "Télécharger le PDF"}
            </a>
          </p>
          {piece.status === "offbundle" && piece.file && FONCIER_RELEASE_ASSETS[piece.file] ? (
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink/80">
              Téléchargement via GitHub Release (tag fonciers-33-34), pas Vercel
              Hobby, pas angers.fr. Lien de l’asset :{" "}
              <a
                href={FONCIER_RELEASE_ASSETS[piece.file].githubUrl}
                className="break-all underline decoration-rose/40 underline-offset-2 hover:text-rouge"
                target="_blank"
                rel="noreferrer"
              >
                {FONCIER_RELEASE_ASSETS[piece.file].githubUrl}
              </a>
            </p>
          ) : piece.status === "offbundle" ? (
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink/80">
              Téléchargement via GitHub Release, pas Vercel Hobby, pas angers.fr.
            </p>
          ) : (
            <div className="mt-6 overflow-hidden rounded-xl border bg-white shadow-[0_1px_8px_rgba(15,23,42,0.06)]">
              <iframe title={piece.title} src={piece.href} className="h-[80vh] w-full" />
            </div>
          )}
        </>
      ) : piece.externalUrl ? (
        <p className="mt-6">
          <a href={piece.externalUrl} className="text-ink underline" target="_blank" rel="noreferrer">
            Ouvrir la source officielle
          </a>
        </p>
      ) : (
        <p className="mt-6 rounded-md bg-jaune/40 p-4 text-sm text-ink">
          Document non versé dans le fonds. Aucun chiffre n’est substitué.
        </p>
      )}
    </div>
  );
}
