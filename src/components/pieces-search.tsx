"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { SCAN_ONLY_FILES, type PieceIndexDoc } from "@/data/piece-index";
import { pieceByFile } from "@/data/documents";

type Hit = {
  file: string;
  href: string;
  title: string;
  page: number;
  snippet: string;
};

type LoadState =
  | { status: "loading" }
  | { status: "ready"; docs: PieceIndexDoc[] }
  | { status: "missing" };

function snippetAround(text: string, q: string) {
  const i = text.toLowerCase().indexOf(q.toLowerCase());
  if (i < 0) return text.slice(0, 180);
  const start = Math.max(0, i - 70);
  const end = Math.min(text.length, i + q.length + 110);
  return `${start > 0 ? "…" : ""}${text.slice(start, end)}${end < text.length ? "…" : ""}`;
}

async function loadIndex(): Promise<PieceIndexDoc[] | null> {
  const res = await fetch("/search/index.json.gz", { cache: "force-cache" });
  if (!res.ok) return null;
  const buf = await res.arrayBuffer();
  if (buf.byteLength < 1000) return null;
  if (typeof DecompressionStream === "undefined") return null;
  const stream = new Response(buf).body;
  if (!stream) return null;
  const unzipped = stream.pipeThrough(new DecompressionStream("gzip"));
  const text = await new Response(unzipped).text();
  const docs = JSON.parse(text) as PieceIndexDoc[];
  if (!Array.isArray(docs) || docs.length < 20) return null;
  return docs;
}

export function PiecesSearch() {
  const [q, setQ] = useState("");
  const [load, setLoad] = useState<LoadState>({ status: "loading" });

  useEffect(() => {
    let cancelled = false;
    loadIndex()
      .then((docs) => {
        if (cancelled) return;
        setLoad(docs ? { status: "ready", docs } : { status: "missing" });
      })
      .catch(() => {
        if (!cancelled) setLoad({ status: "missing" });
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const hits = useMemo(() => {
    if (load.status !== "ready") return [] as Hit[];
    const query = q.trim();
    if (query.length < 2) return [] as Hit[];
    const out: Hit[] = [];
    for (const doc of load.docs) {
      const piece = pieceByFile(doc.file);
      for (const page of doc.pages) {
        if (page.text.toLowerCase().includes(query.toLowerCase())) {
          out.push({
            file: doc.file,
            href: piece
              ? `/pieces/${piece.id}?page=${page.page}`
              : `${doc.href}#page=${page.page}`,
            title: piece?.title ?? doc.file,
            page: page.page,
            snippet: snippetAround(page.text, query),
          });
        }
        if (out.length >= 40) return out;
      }
    }
    return out;
  }, [q, load]);

  const scanNote = SCAN_ONLY_FILES.map((file) => pieceByFile(file)?.title ?? file).join(" ; ");

  return (
    <div className="mt-6 rounded-xl border bg-white p-4 shadow-[0_1px_8px_rgba(15,23,42,0.06)]">
      <label htmlFor="recherche-pieces" className="font-heading text-lg font-semibold">
        Recherche plein texte
      </label>
      <p className="mt-1 text-sm text-ink/80">
        Calque texte des PDF versés (noms de fichiers réels). Ce n’est pas une
        OCR magique : un scan image ne remonte rien.
      </p>
      <input
        id="recherche-pieces"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="chapitre 011, épargne brute, BOA…"
        className="mt-3 h-10 w-full rounded-md border border-line bg-white px-3 text-sm outline-none ring-vert-1 focus:ring-2"
      />
      {load.status === "loading" ? (
        <p className="mt-3 text-sm text-ink/70">Chargement de l’index (54 pièces, 1 112 pages)…</p>
      ) : null}
      {load.status === "missing" ? (
        <p className="mt-3 rounded-md bg-jaune/40 p-3 text-sm text-ink">
          Index plein texte absent de cet hébergement. Les PDF restent
          téléchargeables sur chaque fiche. Aucun résultat n’est inventé.
        </p>
      ) : null}
      {load.status === "ready" && q.trim().length >= 2 ? (
        <ul className="mt-4 space-y-3">
          {hits.length === 0 ? (
            <li className="text-sm text-ink/80">
              Aucun passage en calque texte pour « {q.trim()} ». Scans sans
              texte (ouvrir le PDF) : {scanNote}.
            </li>
          ) : (
            hits.map((hit) => (
              <li key={`${hit.file}-${hit.page}-${hit.snippet.slice(0, 24)}`} className="border-t border-line pt-3">
                <Link href={hit.href} className="font-medium text-ink hover:text-rouge">
                  {hit.title}
                </Link>
                <p className="text-xs text-ink/70">
                  p. {hit.page} · {hit.file}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-ink/80">{hit.snippet}</p>
              </li>
            ))
          )}
        </ul>
      ) : null}
    </div>
  );
}
