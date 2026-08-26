import { Badge } from "@/components/ui/badge";
import { missingRequired, offbundleRequired } from "@/data/documents";
import Link from "next/link";

export function MissingDocs() {
  return (
    <section className="rounded-xl border border-ink/15 bg-white p-5 shadow-[0_1px_8px_rgba(15,23,42,0.04)]">
      <h2 className="font-heading text-xl font-semibold">
        Documents manquants ou hors bundle
        <span className="text-rouge">.</span>
      </h2>
      <ul className="mt-3 space-y-2 text-sm">
        {missingRequired.map((doc) => (
          <li key={doc.id}>
            <Badge variant="outline" className="mr-2 border-rouge/30 text-rouge">
              Manquant
            </Badge>
            <span className="font-medium">{doc.title}</span>
            {doc.note ? <span className="text-ink/80"> — {doc.note}</span> : null}
          </li>
        ))}
        {offbundleRequired.map((doc) => (
          <li key={doc.id}>
            <Badge variant="outline" className="mr-2 border-violet/40 text-violet">
              Hors bundle
            </Badge>
            <span className="font-medium">{doc.title}</span>
            {doc.note ? <span className="text-ink/80"> — {doc.note}</span> : null}{" "}
            <Link href={`/pieces/${doc.id}`} className="text-ink underline decoration-rose/40 underline-offset-2 hover:text-rouge">
              Fiche
            </Link>
            {doc.href ? (
              <>
                {" "}
                <a
                  href={doc.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-ink underline decoration-rose/40 underline-offset-2 hover:text-rouge"
                >
                  Télécharger le PDF
                </a>
              </>
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  );
}
