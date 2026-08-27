import { NextResponse } from "next/server";
import { FONCIER_RELEASE_ASSETS } from "@/data/documents";

export const runtime = "nodejs";

/**
 * Relais 33/34 : 302 vers l’asset GitHub Release.
 * Jamais de stream PDF (Hobby 503), jamais angers.fr.
 */
export async function GET(
  _request: Request,
  context: { params: Promise<{ file: string }> },
) {
  const { file } = await context.params;
  const asset = FONCIER_RELEASE_ASSETS[file];
  if (!asset) {
    return NextResponse.json({ error: "Pièce inconnue." }, { status: 404 });
  }

  const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
  if (token) {
    const signed = await githubAssetLocation(asset.assetId, token);
    if (signed) {
      return NextResponse.redirect(signed, 302);
    }
  }

  const html = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <title>Téléchargement via GitHub Release</title>
  <style>
    body { font: 16px/1.45 system-ui, sans-serif; max-width: 40rem; margin: 3rem auto; padding: 0 1.25rem; color: #16141a; }
    a { color: #e84250; }
    code { font-size: 0.85em; word-break: break-all; }
  </style>
</head>
<body>
  <h1>Téléchargement via GitHub Release</h1>
  <p>${file} (${asset.sizeLabel}) n’est pas servi par Vercel Hobby. Fichier réel, pas un lien angers.fr.</p>
  <p><a href="${asset.githubUrl}">${asset.githubUrl}</a></p>
  <p>Release <code>fonciers-33-34</code> — dépôt <code>rdn478mbyt-ops/finances-angers-pieces</code>.</p>
</body>
</html>`;

  return new NextResponse(html, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

async function githubAssetLocation(assetId: number, token: string) {
  const res = await fetch(
    `https://api.github.com/repos/rdn478mbyt-ops/finances-angers-pieces/releases/assets/${assetId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/octet-stream",
        "User-Agent": "finances-angers",
        "X-GitHub-Api-Version": "2022-11-28",
      },
      redirect: "manual",
      cache: "no-store",
    },
  );
  const location = res.headers.get("location");
  if (res.status >= 300 && res.status < 400 && location) return location;
  return null;
}
