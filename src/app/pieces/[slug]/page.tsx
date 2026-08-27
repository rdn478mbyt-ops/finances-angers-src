import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { allPieces, pieceById } from "@/data/documents";
import { PdfPageViewer } from "@/components/pdf-page-viewer";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string | string[] }>;
};

export function generateStaticParams() {
  return allPieces.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const piece = pieceById(slug);
  return { title: piece?.title ?? "Pièce" };
}

function requestedPage(raw: string | string[] | undefined) {
  const value = Array.isArray(raw) ? raw[0] : raw;
  if (!value) return null;
  const n = Number.parseInt(value, 10);
  return Number.isFinite(n) && n > 0 ? n : null;
}

function rbfLabel(file?: string) {
  if (!file?.includes("fnancier")) return null;
  return "Règlement budgétaire et financier";
}

export default async function PiecePage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { page: pageRaw } = await searchParams;
  const page = requestedPage(pageRaw);
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

      {piece.status === "offbundle" ? (
        <p className="mt-5 max-w-2xl rounded-md border border-violet/30 bg-white p-4 text-sm leading-relaxed text-ink">
          <span className="font-medium">Hors bundle · dépôt privé.</span> Fichier
          trop lourd pour l’archive Vercel Hobby. Disponible dans la Release
          privée pour l’équipe. Pas de téléchargement public.
        </p>
      ) : piece.href ? (
        <>
          <p className="mt-5">
            <a
              href={piece.href}
              download={piece.file}
              className="inline-flex rounded-full bg-rouge px-5 py-2.5 text-sm font-medium text-white hover:bg-rouge/90"
            >
              Télécharger le PDF
            </a>
          </p>
          {page ? (
            <p className="mt-3 text-sm text-ink/80">
              Ouverture à la page {page} du PDF (page réellement rendue, pas le haut du fichier).
            </p>
          ) : null}
          <Suspense
            fallback={
              <p className="mt-6 text-sm text-ink/70">Ouverture du PDF…</p>
            }
          >
            <PdfPageViewer href={piece.href} page={page} title={piece.title} />
          </Suspense>
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
