"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Accueil", full: "Accueil" },
  { href: "/ratios", label: "FNESR", full: "Grille FNESR" },
  { href: "/ville/fonctionnement", label: "Ville Fonc.", full: "Ville · fonctionnement" },
  { href: "/ville/investissement", label: "Ville Inv.", full: "Ville · investissement" },
  { href: "/boa/fonctionnement", label: "BOA Fonc.", full: "BOA · fonctionnement" },
  { href: "/boa/investissement", label: "BOA Inv.", full: "BOA · investissement" },
  { href: "/comparaisons", label: "Comparer", full: "Comparaisons" },
  { href: "/pieces", label: "Pièces", full: "Pièces" },
  { href: "/methode", label: "Méthode", full: "Méthode" },
];

function NavLinks({
  onClick,
  stacked,
}: {
  onClick?: () => void;
  stacked?: boolean;
}) {
  const pathname = usePathname();
  return (
    <ul
      className={cn(
        stacked
          ? "flex flex-col gap-1"
          : "flex flex-nowrap items-center gap-x-2.5",
      )}
    >
      {links.map((link) => {
        const active =
          link.href === "/"
            ? pathname === "/"
            : pathname === link.href || pathname.startsWith(`${link.href}/`);
        return (
          <li key={link.href} className="shrink-0">
            <Link
              href={link.href}
              title={link.full}
              onClick={onClick}
              className={cn(
                "block whitespace-nowrap rounded-md px-0.5 py-1 text-[13px] leading-none text-ink/80 hover:text-rouge",
                stacked && "px-2 py-1.5 text-sm",
                active && "font-semibold text-rouge",
              )}
            >
              {stacked ? link.full : link.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="border-b border-line bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-[90rem] items-center gap-3 px-4">
        <Link
          href="/"
          className="flex min-w-0 shrink-0 items-center gap-2.5"
          aria-label="Accueil — finances Ville d’Angers, outil d’opposition"
        >
          <Image
            src="/brand/logo-ps-rose.png"
            alt="Le Parti socialiste"
            width={2481}
            height={984}
            priority
            className="h-8 w-auto object-contain sm:h-9"
          />
          <span className="flex min-w-0 items-baseline gap-2 whitespace-nowrap">
            <span className="font-heading text-sm font-semibold leading-none text-ink">
              Finances d’Angers
            </span>
            <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-ink/70">
              Opposition
            </span>
          </span>
        </Link>
        <nav
          className="ml-auto hidden min-w-0 flex-nowrap overflow-x-auto min-[1180px]:block"
          aria-label="Navigation principale"
        >
          <NavLinks />
        </nav>
        <div className="ml-auto min-[1180px]:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" aria-label="Ouvrir le menu">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[min(100%,22rem)]">
              <SheetHeader>
                <SheetTitle className="font-heading">Navigation</SheetTitle>
              </SheetHeader>
              <nav className="mt-4 px-2" aria-label="Menu mobile">
                <NavLinks stacked onClick={() => setOpen(false)} />
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
