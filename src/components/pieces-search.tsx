"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { piecesIndex } from "@/data/piece-index";
import { pieceByFile } from "@/data/documents";

type Hit = {
  file: string;
  href: string;
  title: string;
  page: number;
  snippet: string;
};

function snippetAround(text: string, q: string) {
  const i = text.toLowerCase().indexOf(q.toLowerCase());
  if (i < 0) return text.slice(0, 180);
  const start = Math.max(0, i - 70);
  const end = Math.min(text.length, i + q.length + 110);
  return `${start > 0 ? "…" : ""}${text.slice(start, end)}${end < text.length ? "…" : ""}`;
}

export function PiecesSearch() {
  const [q, setQ] = useState("");
  const hits = useMemo(() => {
    const query = q.trim();
    if (query.length < 2) return [] as Hit[];
    const out: Hit[] = [];
    for (const doc of piecesIndex) {
      const piece = pieceByFile(doc.file);
      for (const page of doc.pages) {
        if (page.text.toLowerCase().includes(query.toLowerCase())) {
          out.push({
            file: doc.file,
            href: piece ? `/pieces/${piece.id}` : doc.href,
            title: piece?.title ?? doc.file,
            page: page.page,
            snippet: snippetAround(page.text, query),
          });
        }
        if (out.length >= 40) return out;
      }
    }
    return out;
  }, [q]);

  return (
    <div className="mt-6 rounded-xl border bg-white p-4 shadow-[0_1px_8px_rgba(15,23,42,0.06)]">
      <label htmlFor="recherche-pieces" className="font-heading text-lg font-semibold">
        Recherche plein texte
      </label>
      <p className="mt-1 text-sm text-ink/80">
        Porte sur les PDF versés dans public/pieces/ (noms de fichiers réels). Les
        scans sans calque texte (PV, certaines conventions) peuvent ne rien
        renvoyer.
      </p>
      <input
        id="recherche-pieces"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="chapitre 011, épargne brute, BOA…"
        className="mt-3 h-10 w-full rounded-md border border-line bg-white px-3 text-sm outline-none ring-vert-1 focus:ring-2"
      />
      {q.trim().length >= 2 ? (
        <ul className="mt-4 space-y-3">
          {hits.length === 0 ? (
            <li className="text-sm text-ink/80">Aucun passage dans les pièces déjà intégrées.</li>
          ) : (
            hits.map((hit) => (
              <li key={`${hit.file}-${hit.page}-${hit.snippet.slice(0, 24)}`} className="border-t border-line pt-3">
                <Link href={hit.href} className="font-medium text-ink hover:text-rouge">
                  {hit.title}
                </Link>
                <p className="text-xs text-ink/70">p. {hit.page} · {hit.file}</p>
                <p className="mt-1 text-sm leading-relaxed text-ink/80">{hit.snippet}</p>
              </li>
            ))
          )}
        </ul>
      ) : null}
    </div>
  );
}
