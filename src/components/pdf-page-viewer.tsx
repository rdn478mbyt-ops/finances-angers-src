"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  href: string;
  page: number | null;
  title: string;
};

function parsePage(value: string | null, fallback: number | null) {
  const n = Number.parseInt(value || "", 10);
  if (Number.isFinite(n) && n > 0) return n;
  if (fallback && fallback > 0) return fallback;
  return 1;
}

export function PdfPageViewer({ href, page, title }: Props) {
  const searchParams = useSearchParams();
  const requested = parsePage(searchParams.get("page"), page);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [pageCount, setPageCount] = useState<number | null>(null);
  const [current, setCurrent] = useState(requested);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    setCurrent(requested);
  }, [requested]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    let cancelled = false;
    let destroy: (() => void) | null = null;

    async function draw() {
      if (!canvas || !wrap) return;
      setStatus("loading");
      const pdfjs = await import("pdfjs-dist");
      pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
      const loadingTask = pdfjs.getDocument({ url: href });
      destroy = () => {
        loadingTask.destroy();
      };
      const pdf = await loadingTask.promise;
      if (cancelled) return;
      setPageCount(pdf.numPages);
      const target = Math.min(Math.max(current, 1), pdf.numPages);
      const pdfPage = await pdf.getPage(target);
      if (cancelled) return;
      const base = pdfPage.getViewport({ scale: 1 });
      const width = wrap.clientWidth || 960;
      const cssScale = width / base.width;
      const outputScale = Math.min(window.devicePixelRatio || 1, 2);
      const viewport = pdfPage.getViewport({ scale: cssScale * outputScale });
      canvas.width = Math.floor(viewport.width);
      canvas.height = Math.floor(viewport.height);
      canvas.style.width = `${Math.floor(viewport.width / outputScale)}px`;
      canvas.style.height = `${Math.floor(viewport.height / outputScale)}px`;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("canvas");
      const render = pdfPage.render({
        canvasContext: ctx,
        viewport,
      });
      await render.promise;
      if (!cancelled) setStatus("ready");
    }

    draw().catch(() => {
      if (!cancelled) setStatus("error");
    });

    return () => {
      cancelled = true;
      destroy?.();
    };
  }, [href, current]);

  const iframeSrc =
    current > 0 ? `${href}#page=${current}&view=FitH&zoom=page-width` : href;

  return (
    <div className="mt-6 overflow-hidden rounded-xl border bg-white shadow-[0_1px_8px_rgba(15,23,42,0.06)]">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line px-3 py-2 text-sm">
        <p className="text-ink/80">
          Page{" "}
          <span className="font-mono font-semibold tabular-nums">{current}</span>
          {pageCount ? (
            <>
              {" "}
              / <span className="tabular-nums">{pageCount}</span>
            </>
          ) : null}
          {requested !== current ? (
            <span className="ml-2 text-ink/60">(demandée {requested})</span>
          ) : null}
        </p>
        <div className="flex items-center gap-1">
          <button
            type="button"
            className="rounded-md border border-line p-1 text-ink/80 hover:border-rose disabled:opacity-40"
            aria-label="Page précédente"
            disabled={current <= 1}
            onClick={() => setCurrent((n) => Math.max(1, n - 1))}
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            type="button"
            className="rounded-md border border-line p-1 text-ink/80 hover:border-rose disabled:opacity-40"
            aria-label="Page suivante"
            disabled={pageCount != null && current >= pageCount}
            onClick={() =>
              setCurrent((n) => (pageCount ? Math.min(pageCount, n + 1) : n + 1))
            }
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>
      {status === "loading" ? (
        <p className="px-4 py-3 text-sm text-ink/70">
          Ouverture réelle à la page {current}…
        </p>
      ) : null}
      {status === "error" ? (
        <iframe title={title} src={iframeSrc} className="h-[80vh] w-full" />
      ) : (
        <div ref={wrapRef} className="overflow-auto bg-muted/40 p-2">
          <canvas ref={canvasRef} className="mx-auto block max-w-full bg-white" />
        </div>
      )}
    </div>
  );
}
