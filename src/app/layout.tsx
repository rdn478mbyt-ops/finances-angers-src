import localFont from "next/font/local";
import type { Metadata } from "next";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { RatioBanner } from "@/components/ratio-banner";
import { M57Banner } from "@/components/m57-banner";
import "./globals.css";

const brown = localFont({
  src: [
    { path: "../fonts/satoshi-400.woff2", weight: "400", style: "normal" },
    { path: "../fonts/satoshi-500.woff2", weight: "500", style: "normal" },
    { path: "../fonts/satoshi-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-brown",
  display: "swap",
});

const stinger = localFont({
  src: "../fonts/Anybody-Variable.ttf",
  variable: "--font-stinger",
  display: "swap",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    default: "Finances de la Ville d’Angers — outil d’opposition",
    template: "%s · Finances d’Angers",
  },
  description:
    "Lecture des comptes de la Ville d’Angers et de la Boucle optique angevine pour élus d’opposition. Ratios FNESR, pièces sourcées, sans storytelling de majorité.",
  applicationName: "Finances d’Angers",
  icons: {
    icon: "/brand/poing-rose.png",
    apple: "/brand/poing-rose.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${brown.variable} ${stinger.variable} min-h-full scroll-smooth antialiased`}
    >
      <body className="flex min-h-full flex-col bg-paper font-sans text-ink">
        <TooltipProvider>
          <a
            href="#contenu"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-md focus:bg-white focus:px-3 focus:py-2 focus:text-sm focus:text-ink focus:shadow"
          >
            Aller au contenu
          </a>
          <div className="sticky top-0 z-40">
            <SiteHeader />
            <M57Banner />
          </div>
          <main id="contenu" className="flex-1 scroll-mt-[11rem] pb-8">
            {children}
          </main>
          <RatioBanner />
          <SiteFooter />
        </TooltipProvider>
      </body>
    </html>
  );
}
