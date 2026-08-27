import { existsSync, mkdirSync, writeFileSync, statSync, readFileSync, readdirSync } from "node:fs";
import { gzipSync, gunzipSync } from "node:zlib";
import path from "node:path";

const ROOT = process.cwd();
const OUT = path.join(ROOT, "public", "pieces");
const BRAND = path.join(ROOT, "public", "brand");
const FONTS = path.join(ROOT, "src", "fonts");
const SEARCH = path.join(ROOT, "public", "search");
const EXPLORER = path.join(ROOT, "public", "explorer");
const INDEX_PARTS_REMOTE =
  "https://raw.githubusercontent.com/rdn478mbyt-ops/finances-angers-src/main/scripts/search-index";
const SITE = "https://finances-angers-fonds.vercel.app";
const MIRROR = `${SITE}/pieces`;
const ANYBODY =
  "https://raw.githubusercontent.com/google/fonts/main/ofl/anybody/Anybody%5Bwdth%2Cwght%5D.ttf";

const FILES = [
  "01._Cahier_des_clauses_techniques_particulieres.pdf",
  "02._Ordre_du_jour.pdf",
  "02._Reglement_budgetaire_et_fnancier.pdf",
  "03._Cahier_des_deliberations.pdf",
  "03._Compte_de_gestion_BOA.pdf",
  "03._Compte_de_gestion_Ville.pdf",
  "04._Maquette_compte_administratif_2025_-_BOA.pdf",
  "04._Maquette_compte_administratif_2025.pdf",
  "04._Tableau_de_propositions_de_deports.pdf",
  "06._Maquette_DM_n1_-_BOA.pdf",
  "06._Maquette_DM_n1.pdf",
  "12._Convention.pdf",
  "13._Convention.pdf",
  "14._Convention.pdf",
  "15._Convention.pdf",
  "16._Convention.pdf",
  "17._Convention.pdf",
  "18._Convention.pdf",
  "19._Convention.pdf",
  "2026-03-27-cahier-deliberations.pdf",
  "2026-06-29-liste-deliberations.pdf",
  "20._Convention.pdf",
  "22._Budget_previsionnel.pdf",
  "22._Convention.pdf",
  "23._Convention.pdf",
  "24._Fiche_de_presentation.pdf",
  "25._Repartition.pdf",
  "29._Avenant_2026.pdf",
  "29._Convention_2022-2025.pdf",
  "30._Convention.pdf",
  "32._Convention.pdf",
  "33._Avis_de_domaine.pdf",
  "33._Etat_descriptif.pdf",
  "33._Extrait_plan_cadastral.pdf",
  "33._Statuts_ASL.pdf",
  "34._Estimation_avis_des_domaines.pdf",
  "35._Portefeuille_Angers.pdf",
  "35._Portefeuille_Plateforme_Anjou_Portage_foncier.pdf",
  "36._Repartition_subvention_-_114_rue_de_la_Chalouere.pdf",
  "36._Repartition_subvention_-_18_rue_Maille.pdf",
  "36._Repartition_subvention_-_19-21_Boulevard_Carnot.pdf",
  "37._Liste_des_beneficiaires.pdf",
  "38._Projet_dacte.pdf",
  "45._Etat_et_details_des_remises_gracieuses.pdf",
  "47._Projet_davenant_n2.pdf",
  "48._Liste_remises_gracieuses.pdf",
  "50._Liste_des_biens.pdf",
  "del-2026-162-rbf.pdf",
  "del-2026-163-compte-gestion-2025.pdf",
  "del-2026-164-ca-2025.pdf",
  "del-2026-165-affectation-2025.pdf",
  "del-2026-166-dm1-2026.pdf",
  "del-2026-2-dob-2026.pdf",
  "Proces-verbal_du_conseil_municipal_du_27_mars_2026.pdf",
];

mkdirSync(OUT, { recursive: true });
mkdirSync(BRAND, { recursive: true });
mkdirSync(FONTS, { recursive: true });
mkdirSync(SEARCH, { recursive: true });
mkdirSync(EXPLORER, { recursive: true });

async function pull(url, dest, min = 500) {
  if (existsSync(dest) && statSync(dest).size > min) return "ok";
  const res = await fetch(url);
  if (!res.ok) {
    console.warn(`manquant ${url} (${res.status})`);
    return "miss";
  }
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < min) {
    console.warn(`trop petit ${url}`);
    return "miss";
  }
  writeFileSync(dest, buf);
  console.log(`récupéré ${path.relative(ROOT, dest)} (${buf.length} o)`);
  return "got";
}

async function ensure(file) {
  return pull(`${MIRROR}/${encodeURIComponent(file)}`, path.join(OUT, file), 1000);
}

function isWoff2(buf) {
  return Buffer.isBuffer(buf) && buf.length > 1000 && buf.subarray(0, 4).toString("ascii") === "wOF2";
}

const SATOSHI_CDN = {
  "satoshi-400.woff2":
    "https://cdn.fontshare.com/wf/TTX2Z3BF3P6Y5BQT3IV2VNOK6FL22KUT/7QYRJOI3JIMYHGY6CH7SOIFRQLZOLNJ6/KFIAZD4RUMEZIYV6FQ3T3GP5PDBDB6JY.woff2",
  "satoshi-500.woff2":
    "https://cdn.fontshare.com/wf/P2LQKHE6KA6ZP4AAGN72KDWMHH6ZH3TA/ZC32TK2P7FPS5GFTL46EU6KQJA24ZYDB/7AHDUZ4A7LFLVFUIFSARGIWCRQJHISQP.woff2",
  "satoshi-700.woff2":
    "https://cdn.fontshare.com/wf/LAFFD4SDUCDVQEXFPDC7C53EQ4ZELWQI/PXCT3G6LO6ICM5I3NTYENYPWJAECAWDD/GHM6WVH6MILNYOOCXHXB5GTSGNTMGXZR.woff2",
};

async function ensureSatoshi() {
  const names = ["satoshi-400.woff2", "satoshi-500.woff2", "satoshi-700.woff2"];
  for (const name of names) {
    const dest = path.join(FONTS, name);
    if (existsSync(dest) && isWoff2(readFileSync(dest))) continue;

    const b64Name = name.replace(/\.woff2$/, ".b64");
    const localB64 = path.join(ROOT, "scripts", b64Name);
    if (existsSync(localB64)) {
      const b64 = readFileSync(localB64, "utf8").replace(/[^A-Za-z0-9+/=]/g, "");
      const buf = Buffer.from(b64, "base64");
      if (isWoff2(buf)) {
        writeFileSync(dest, buf);
        console.log(`écrit ${path.relative(ROOT, dest)} (${buf.length} o)`);
        continue;
      }
    }

    const cdn = SATOSHI_CDN[name];
    if (cdn) {
      const fr = await fetch(cdn);
      if (fr.ok) {
        const buf = Buffer.from(await fr.arrayBuffer());
        if (isWoff2(buf)) {
          writeFileSync(dest, buf);
          console.log(`fontshare ${path.relative(ROOT, dest)} (${buf.length} o)`);
          continue;
        }
      }
    }

    console.warn(`satoshi manquant ${name}`);
  }
}

async function ensureSearchIndex() {
  const dest = path.join(SEARCH, "index.json.gz");
  if (existsSync(dest) && statSync(dest).size > 100_000) {
    console.log(`index recherche déjà là (${statSync(dest).size} o)`);
    return;
  }

  const jsonPath = path.join(ROOT, "src", "data", "pieces-index.json");
  if (existsSync(jsonPath) && statSync(jsonPath).size > 50_000) {
    writeFileSync(dest, gzipSync(readFileSync(jsonPath)));
    console.log(`index recherche gzip depuis pieces-index.json (${statSync(dest).size} o)`);
    return;
  }

  const localDir = path.join(ROOT, "scripts", "search-index");
  const localParts = existsSync(localDir)
    ? readdirSync(localDir)
        .filter((f) => /^part-\d+\.b64$/.test(f))
        .sort()
    : [];

  let b64 = "";
  if (localParts.length >= 8) {
    b64 = localParts
      .map((n) => readFileSync(path.join(localDir, n), "utf8").replace(/\s/g, ""))
      .join("");
  } else {
    const chunks = [];
    for (let i = 0; i < 16; i += 1) {
      const name = `part-${String(i).padStart(2, "0")}.b64`;
      const res = await fetch(`${INDEX_PARTS_REMOTE}/${name}`);
      if (!res.ok) break;
      chunks.push((await res.text()).replace(/\s/g, ""));
    }
    b64 = chunks.join("");
  }

  if (b64.length < 10_000) {
    console.warn("index recherche manquant — message honnête côté UI, PDF toujours téléchargeables.");
    return;
  }

  const buf = Buffer.from(b64, "base64");
  try {
    const docs = JSON.parse(gunzipSync(buf).toString("utf8"));
    if (!Array.isArray(docs) || docs.length < 20) {
      console.warn(`index recherche trop petit (${Array.isArray(docs) ? docs.length : 0} docs)`);
      return;
    }
  } catch (err) {
    console.warn("index recherche gzip illisible", err);
    return;
  }

  writeFileSync(dest, buf);
  console.log(`index recherche écrit (${buf.length} o)`);
}

function loadExplorerB64() {
  const partDir = path.join(ROOT, "scripts", "explorer-index");
  const localParts = existsSync(partDir)
    ? readdirSync(partDir)
        .filter((f) => /^part-\d+\.b64$/.test(f))
        .sort()
    : [];
  if (localParts.length >= 8) {
    return localParts
      .map((n) => readFileSync(path.join(partDir, n), "utf8").replace(/\s/g, ""))
      .join("");
  }
  const b64Path = path.join(ROOT, "scripts", "explorer-index.b64");
  if (existsSync(b64Path)) {
    return readFileSync(b64Path, "utf8").replace(/\s/g, "");
  }
  return "";
}

function ensureExplorerIndex() {
  const dest = path.join(EXPLORER, "index.json.gz");
  const jsonPath = path.join(ROOT, "src", "data", "explorer.json");
  if (existsSync(dest) && statSync(dest).size > 5_000) {
    console.log(`index explorateur déjà là (${statSync(dest).size} o)`);
    return;
  }
  if (existsSync(jsonPath) && statSync(jsonPath).size > 5_000) {
    writeFileSync(dest, gzipSync(readFileSync(jsonPath)));
    console.log(`index explorateur gzip depuis explorer.json (${statSync(dest).size} o)`);
    return;
  }
  const b64 = loadExplorerB64();
  if (b64.length > 10_000) {
    const buf = Buffer.from(b64, "base64");
    if (buf.length > 5_000 && buf[0] === 0x1f && buf[1] === 0x8b) {
      writeFileSync(dest, buf);
      console.log(`index explorateur depuis scripts/explorer-index (${buf.length} o)`);
      return;
    }
  }
  console.warn("index explorateur manquant — message honnête côté UI.");
}

await ensureSatoshi();
await ensureSearchIndex();
ensureExplorerIndex();

await Promise.all([
  pull(`${SITE}/brand/logo-ps-rose.png`, path.join(BRAND, "logo-ps-rose.png")),
  pull(`${SITE}/brand/poing-rose.png`, path.join(BRAND, "poing-rose.png")),
  pull(`${SITE}/brand/poing-rose-blanc.png`, path.join(BRAND, "poing-rose-blanc.png")),
  pull(ANYBODY, path.join(FONTS, "Anybody-Variable.ttf"), 50_000),
]);

const poing = path.join(BRAND, "poing-rose.png");
const icon = path.join(ROOT, "src/app/icon.png");
if (existsSync(poing) && !existsSync(icon)) {
  writeFileSync(icon, readFileSync(poing));
}

const results = await Promise.all(FILES.map(ensure));
const got = results.filter((r) => r !== "miss").length;
console.log(`pièces présentes : ${got}/${FILES.length}`);
if (got < 40) process.exit(1);
