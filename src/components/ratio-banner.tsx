"use client";

import { usePathname } from "next/navigation";
import { getBannerFigure, type BannerPill } from "@/lib/banner-figure";
import { SourceCite } from "@/components/source-cite";
import { cn } from "@/lib/utils";

const pillClass: Record<BannerPill["tone"], string> = {
  vert: "bg-vert-1 text-white",
  jaune: "bg-jaune text-ink",
  rouge: "bg-rouge text-white",
  violet: "bg-violet text-white",
};

const punctClass = {
  rouge: "text-rouge",
  rose: "text-rose",
  jaune: "text-jaune",
  "vert-1": "text-vert-1",
  violet: "text-violet",
} as const;

export function RatioBanner() {
  const pathname = usePathname();
  const figure = getBannerFigure(pathname);

  return (
    <div className="z-30 border-t border-white/10 bg-ink text-white lg:sticky lg:bottom-0">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-2.5 sm:flex-row sm:items-center sm:gap-6">
        <p className="shrink-0 text-[11px] font-medium uppercase tracking-[0.16em] text-white/70">
          {figure.kicker}
          <span className="text-rose">.</span>
        </p>
        <div className="min-w-0 flex-1">
          <a href={figure.href} className="block hover:opacity-95">
            <p className="text-sm text-white/80">{figure.label}</p>
            <p className="font-heading text-3xl font-bold leading-none tracking-tight tabular-nums lg:text-4xl">
              {figure.value}
              <span className={cn("ms-0.5", punctClass[figure.punct])}>.</span>
            </p>
            {figure.missing ? (
              <p className="mt-1 text-xs text-white/80">{figure.missing}</p>
            ) : (
              <span className="mt-1 block">
                <SourceCite source={figure.source} tone="onDark" />
              </span>
            )}
          </a>
        </div>
        {figure.pills ? (
          <ul className="flex flex-wrap gap-1.5 sm:max-w-xs sm:justify-end">
            {figure.pills.map((pill) => (
              <li
                key={pill.label}
                className={cn(
                  "rounded-full px-2.5 py-0.5 text-[11px] font-medium",
                  pillClass[pill.tone],
                )}
              >
                {pill.label}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}
