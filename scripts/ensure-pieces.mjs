#!/usr/bin/env node
import { Buffer } from "node:buffer";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url"
import { gunzipSync } from "node:zlib";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const PIECES = join(ROOT, "public", "pieces");
const FONTS = join(ROOT, "public", "fonts");
const BASE =
  process.env.FINANCES_PIECES_BASE ??
  "https://finances-angers-fonds.vercel.app";
const SEARCH_INDEX_B64 = join(ROOT, "scripts", "search-index.b64");
const SEARCH_INDEX_GZ = join(ROOT, "public", "search", "index.json.gz");
const EXPLORER_INDEX_B64 = join(ROOT, "scripts", "explorer-index.b64");
const EXPLORER_INDEX_GZ = join(ROOT, "public", "explorer", "index.json.gz");

const FILES = [
  ["01._Rapport_sur_les_orientations_budgetaires_2026.pdf", "01._Rapport_sur_les_orientations_budgetaires_2026.pdf"],
  ["02._Note_de_synthese_BP_2026.pdf", "02._Note_de_synthese_BP_2026.pdf"],
  ["03._Deliberation_BP_2026.pdf", "03._Deliberation_BP_2026.pdf"],
  ["04._Annexe_a_la_deliberation_BP_2026.pdf", "04._Annexe_a_la_deliberation_BP_2026.pdf"],
  ["05._Rapport_de_presentation_CA_2024.pdf", "05._Rapport_de_presentation_CA_2024.pdf"],
  ["06._Note_de_synthese_CA_2024.pdf", "06._Note_de_synthese_CA_2024.pdf"],
  ["07._Annexe_a_la_deliberation_CA_2024.pdf", "07._Annexe_a_la_deliberation_CA_2024.pdf"],
  ["08._Cadrage_financier_pluriannuel_2026-2029.pdf", "08._Cadrage_financier_pluriannuel_2026-2029.pdf"],
  ["09._Programme_pluriannuel_dinvestissement_2026-2029.pdf", "09._Programme_pluriannuel_dinvestissement_2026-2029.pdf"],
  ["10._Plan_de_tresorerie_2026.pdf", "10._Plan_de_tresorerie_2026.pdf"],
  ["11._Etat_annuel_des_garanties_demprunt_2026.pdf", "11._Etat_annuel_des_garanties_demprunt_2026.pdf"],
  ["12._Rapport_sur_la_dette_2026.pdf", "12._Rapport_sur_la_dette_2026.pdf"],
  ["13._Rapport_sur_les_conventions_de_tresorerie.pdf", "13._Rapport_sur_les_conventions_de_tresorerie.pdf"],
  ["14._Rapport_sur_les_decisions_modificatives_2025.pdf", "14._Rapport_sur_les_decisions_modificatives_2025.pdf"],
  ["15._Rapport_dorientations_budgetaires_ALM_2026.pdf", "15._Rapport_dorientations_budgetaires_ALM_2026.pdf"],
  ["16._Budget_annexe_eau_assainissement_2026.pdf", "16._Budget_annexe_eau_assainissement_2026.pdf"],
  ["17._Budget_annexe_dechets_2026.pdf", "17._Budget_annexe_dechets_2026.pdf"],
  ["18._Budget_annexe_transports_2026.pdf", "18._Budget_annexe_transports_2026.pdf"],
  ["19._Budget_annexe_stationnement_2026.pdf", "19._Budget_annexe_stationnement_2026.pdf"],
  ["20._Rapport_annuel_sur_le_prix_et_la_qualite_du_service_public_de_leau.pdf", "20._Rapport_annuel_sur_le_prix_et_la_qualite_du_service_public_de_leau.pdf"],
  ["21._Rapport_annuel_sur_le_prix_et_la_qualite_du_service_public_de_lassainissement.pdf", "21._Rapport_annuel_sur_le_prix_et_la_qualite_du_service_public_de_lassainissement.pdf"],
  ["22._Rapport_annuel_sur_le_prix_et_la_qualite_du_service_public_de_prevention_et_de_gestion_des_dechets.pdf", "22._Rapport_annuel_sur_le_prix_et_la_qualite_du_service_public_de_prevention_et_de_gestion_des_dechets.pdf"],
  ["23._Rapport_annuel_sur_le_prix_et_la_qualite_du_service_public_de_mobilite.pdf", "23._Rapport_annuel_sur_le_prix_et_la_qualite_du_service_public_de_mobilite.pdf"],
  ["24._Rapport_dactivite_Angers_Loire_Metropole_2024.pdf", "24._Rapport_dactivite_Angers_Loire_Metropole_2024.pdf"],
  ["25._Rapport_dorientations_strategiques_Angers_Loire_Metropole.pdf", "25._Rapport_dorientations_strategiques_Angers_Loire_Metropole.pdf"],
  ["26._Pacte_financier_ALM.pdf", "26._Pacte_financier_ALM.pdf"],
  ["27._Rapport_sur_la_situation_en_matiere_de_developpement_durable.pdf", "27._Rapport_sur_la_situation_en_matiere_de_developpement_durable.pdf"],
  ["28._Rapport_egalite_femmes-hommes.pdf", "28._Rapport_egalite_femmes-hommes.pdf"],
  ["29._Bilan_des_emissions_de_gaz_a_effet_de_serre.pdf", "29._Bilan_des_emissions_de_gaz_a_effet_de_serre.pdf"],
  ["30._Schema_directeur_immobilier.pdf", "30._Schema_directeur_immobilier.pdf"],
  ["31._Plan_local_urbanisme_intercommunal.pdf", "31._Plan_local_urbanisme_intercommunal.pdf"],
  ["32._Rapport_sur_les_aides_aux_entreprises.pdf", "32._Rapport_sur_les_aides_aux_entreprises.pdf"],
  ["33._Etat_de_la_dette_Ville.pdf", "33._Etat_de_la_dette_Ville.pdf"],
  ["34._Etat_de_la_dette_ALM.pdf", "34._Etat_de_la_dette_ALM.pdf"],
  ["35._Tableau_des_effectifs.pdf", "35._Tableau_des_effectifs.pdf"],
  ["36._Rapport_social_unique.pdf", "36._Rapport_social_unique.pdf"],
  ["37._Compte_administratif_Ville_2024.pdf", "37._Compte_administratif_Ville_2024.pdf"],
  ["38._Compte_administratif_ALM_2024.pdf", "38._Compte_administratif_ALM_2024.pdf"],
  ["39._Budget_primitif_Ville_2026.pdf", "39._Budget_primitif_Ville_2026.pdf"],
  ["40._Budget_primitif_ALM_2026.pdf", "40._Budget_primitif_ALM_2026.pdf"],
  ["41._Annexe_BP_Ville.pdf", "41._Annexe_BP_Ville.pdf"],
  ["42._Annexe_BP_ALM.pdf", "42._Annexe_BP_ALM.pdf"],
];

const FONTS_FILES = [
  ["Satoshi-Variable.woff2", "Satoshi-Variable.woff2"],
  ["Satoshi-VariableItalic.woff2", "Satoshi-VariableItalic.woff2"],
];

async function exists(path) {
  try {
    await readFile(path);
    return true;
  } catch {
    return false;
  }
}

async function download(url, dest) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  await mkdir(dirname(dest), { recursive: true });
  await writeFile(dest, Buffer.from(await res.arrayBuffer()));
}

async function ensureSearchIndex() {
  try {
    const b64 = (await readFile(SEARCH_INDEX_B64, "utf8")).trim();
    if (!b64 || b64.length < 80) return;
    const gz = Buffer.from(b64, "base64");
    gunzipSync(gz);
    await mkdir(dirname(SEARCH_INDEX_GZ), { recursive: true });
    await writeFile(SEARCH_INDEX_GZ, gz);
    console.log("search index restored from scripts/search-index.b64");
  } catch (err) {
    console.warn("search index skipped:", err instanceof Error ? err.message : err);
  }
}

async function ensureExplorerIndex() {
  try {
    const b64 = (await readFile(EXPLORER_INDEX_B64, "utf8")).trim();
    if (!b64 || b64.length < 80) {
      console.warn("explorer index skipped: missing or empty scripts/explorer-index.b64");
      return;
    }
    const gz = Buffer.from(b64, "base64");
    gunzipSync(gz);
    await mkdir(dirname(EXPLORER_INDEX_GZ), { recursive: true });
    await writeFile(EXPLORER_INDEX_GZ, gz);
    console.log("explorer index restored from scripts/explorer-index.b64");
  } catch (err) {
    console.warn("explorer index skipped:", err instanceof Error ? err.message : err);
  }
}

async function main() {
  await mkdir(PIECES, { recursive: true });
  await mkdir(FONTS, { recursive: true });
  let ok = 0;
  for (const [name, remote] of FILES) {
    const dest = join(PIECES, name);
    if (await exists(dest)) {
      ok += 1;
      continue;
    }
    try {
      await download(`${BASE}/pieces/${remote}`, dest);
      ok += 1;
      console.log("got", name);
    } catch (err) {
      console.warn("skip", name, err instanceof Error ? err.message : err);
    }
  }
  for (const [name, remote] of FONTS_FILES) {
    const dest = join(FONTS, name);
    if (await exists(dest)) continue;
    try {
      await download(`${BASE}/fonts/${remote}`, dest);
      console.log("got font", name);
    } catch (err) {
      console.warn("skip font", name, err instanceof Error ? err.message : err);
    }
  }
  await ensureSearchIndex();
  await ensureExplorerIndex();
  console.log(`pieces ready: ${ok}/${FILES.length}`);
  if (ok < 40) {
    console.error("too few pieces; set FINANCES_PIECES_BASE or check the fonds deployment");
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
