import type { Source } from "@/data/types";
import { pieceById } from "@/data/documents";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function SourceCite({
  source,
  tone = "default",
}: {
  source: Source | null;
  tone?: "default" | "onDark";
}) {
  if (!source) return null;
  const piece = pieceById(source.pieceId);
  const pageQuery =
    source.page != null && source.page > 0 ? `?page=${source.page}` : "";
  const href = piece ? `/pieces/${piece.id}${pageQuery}` : undefined;
  const text = source.label;
  const className = cn(
    "font-sans text-xs underline-offset-2 hover:underline",
    tone === "onDark"
      ? "text-white/90 underline decoration-white/40 hover:text-white"
      : "text-ink/80 underline decoration-rose/40 hover:text-rouge",
  );

  if (href) {
    return (
      <Link
        href={href}
        className={className}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noreferrer" : undefined}
      >
        {text}
      </Link>
    );
  }
  return <span className={className}>{text}</span>;
}
