import { existsSync, createReadStream, statSync } from "node:fs";
import path from "node:path";
import { Readable } from "node:stream";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 60;

const ALLOWED: Record<string, string> = {
  "33._Promesse.pdf": "pieces/33._Promesse.pdf",
  "34._Promesse_dachat.pdf": "pieces/34._Promesse_dachat.pdf",
};

const REPO = "rdn478mbyt-ops/finances-angers-pieces";

function localPaths(file: string) {
  const extra = process.env.FINANCES_PDF_DIR;
  return [
    path.join(process.cwd(), "public", "pieces", file),
    path.join("/workspace/finances-pdfs", file),
    extra ? path.join(extra, file) : "",
  ].filter(Boolean);
}

async function githubRedirect(repoPath: string) {
  const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
  if (!token) return null;
  const api = `https://api.github.com/repos/${REPO}/contents/${repoPath}`;
  const res = await fetch(api, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "User-Agent": "finances-angers",
      "X-GitHub-Api-Version": "2022-11-28",
    },
    cache: "no-store",
  });
  if (!res.ok) return null;
  const data = (await res.json()) as { download_url?: string };
  return data.download_url ?? null;
}

export async function GET(
  _request: Request,
  context: { params: Promise<{ file: string }> },
) {
  const { file } = await context.params;
  const repoPath = ALLOWED[file];
  if (!repoPath) {
    return NextResponse.json({ error: "Pièce inconnue." }, { status: 404 });
  }

  for (const disk of localPaths(file)) {
    if (!existsSync(disk)) continue;
    const stat = statSync(disk);
    const stream = Readable.toWeb(createReadStream(disk));
    return new NextResponse(stream as BodyInit, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Length": String(stat.size),
        "Content-Disposition": `attachment; filename="${file}"`,
        "Cache-Control": "private, max-age=3600",
      },
    });
  }

  const signed = await githubRedirect(repoPath);
  if (signed) {
    return NextResponse.redirect(signed, 302);
  }

  const fiche =
    file.startsWith("33.") ? "/pieces/33-promesse" : "/pieces/34-promesse-dachat";
  const html = `<!doctype html><html lang="fr"><head><meta charset="utf-8"><title>${file}</title></head>
<body style="font-family:ui-sans-serif,system-ui,sans-serif;max-width:40rem;margin:3rem auto;padding:0 1rem;line-height:1.45;color:#16141a">
<h1 style="font-size:1.4rem">Fichier hors bundle Hobby</h1>
<p>Ce n’est pas une pièce absente. <code>${file}</code> pèse trop pour git / l’archive Vercel Hobby (100 Mo) une fois les 46 autres PDF déjà en ligne.</p>
<p>L’élu l’obtient dès que le PDF est poussé dans le miroir privé <code>rdn478mbyt-ops/finances-angers-pieces</code> (variable <code>GITHUB_TOKEN</code> sur le projet finances-angers) ou déposé en local. Pas un lien angers.fr.</p>
<p><a href="${fiche}">Retour à la fiche</a></p>
</body></html>`;

  return new NextResponse(html, {
    status: 503,
    headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" },
  });
}
