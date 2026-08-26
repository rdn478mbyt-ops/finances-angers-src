import Link from "next/link";
import { cn } from "@/lib/utils";

const items = [
  { href: "/ville/fonctionnement", label: "Ville · fonctionnement" },
  { href: "/ville/investissement", label: "Ville · investissement" },
  { href: "/boa/fonctionnement", label: "BOA · fonctionnement" },
  { href: "/boa/investissement", label: "BOA · investissement" },
];

export function SectionNav({ current }: { current: string }) {
  return (
    <nav className="flex flex-wrap gap-2" aria-label="Sections budgétaires">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "rounded-full border px-3 py-1 text-sm shadow-[0_1px_4px_rgba(15,23,42,0.04)]",
            current === item.href
              ? "border-rouge bg-rose/10 font-medium text-rouge"
              : "border-line bg-white text-ink/80 hover:border-rose",
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
