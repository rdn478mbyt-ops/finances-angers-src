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
