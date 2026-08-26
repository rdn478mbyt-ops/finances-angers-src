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

  return NextResponse.json(
    {
      error: "PDF hors bundle Hobby — fichier trop lourd pour git (100 Mo).",
      file,
      detail:
        "Déposer 33._Promesse.pdf et 34._Promesse_dachat.pdf dans public/pieces/ ou /workspace/finances-pdfs/, ou pousser le miroir GitHub privé rdn478mbyt-ops/finances-angers-pieces avec GITHUB_TOKEN.",
    },
    { status: 503 },
  );
}
