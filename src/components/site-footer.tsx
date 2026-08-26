import Image from "next/image";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Image
            src="/brand/poing-rose.png"
            alt=""
            width={2006}
            height={2481}
            className="h-10 w-auto object-contain"
          />
          <p className="max-w-md text-sm text-ink/80">
            Outil de travail pour élus d’opposition. Chiffres issus des actes
            publics. Aucune donnée inventée.
          </p>
        </div>
        <nav className="flex gap-4 text-sm">
          <Link href="/methode" className="text-ink underline decoration-rose/40 underline-offset-2 hover:text-rouge">
            Méthode et sources
          </Link>
          <Link href="/pieces" className="text-ink underline decoration-rose/40 underline-offset-2 hover:text-rouge">
            Fonds documentaire
          </Link>
        </nav>
      </div>
    </footer>
  );
}
