import { M57_BANNER, M57_BANNER_DETAIL } from "@/data/nomenclature";
import Link from "next/link";

export function M57Banner() {
  return (
    <p className="border-b border-vert-1/25 bg-vert-2 text-[12px] leading-snug text-ink backdrop-blur-sm">
      <span className="mx-auto flex max-w-6xl flex-wrap items-baseline gap-x-2 px-4 py-1.5">
        <span className="font-medium">{M57_BANNER}</span>
        <span className="text-ink/70" aria-hidden>
          ·
        </span>
        <span className="text-ink/80">{M57_BANNER_DETAIL}</span>
        <Link href="/methode#prochain-budget" className="text-ink underline decoration-vert-1/60 underline-offset-2 hover:text-rouge">
          Méthode
        </Link>
      </span>
    </p>
  );
}
