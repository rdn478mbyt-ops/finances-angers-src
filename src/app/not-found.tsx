import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-20 text-center">
      <h1 className="font-heading text-4xl font-bold">
        Page introuvable
        <span className="text-rouge">.</span>
      </h1>
      <p className="mt-3 text-ink/80">Cette adresse n’existe pas dans l’outil.</p>
      <Link href="/" className="mt-6 inline-block text-ink underline decoration-rose/40 hover:text-rouge">
        Retour à l’accueil
      </Link>
    </div>
  );
}
