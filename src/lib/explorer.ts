import { formatEuros, formatMillions } from "@/lib/format";
import type {
  ExplorerAccount,
  ExplorerChapter,
  ExplorerData,
  ExplorerEntity,
  ExplorerFlow,
  ExplorerLine,
  ExplorerSection,
  ExplorerSource,
} from "@/data/explorer-types";

export type {
  ExplorerAccount,
  ExplorerChapter,
  ExplorerData,
  ExplorerEntity,
  ExplorerFlow,
  ExplorerLine,
  ExplorerSection,
  ExplorerSource,
};

export function piecePageHref(pieceId: string, page?: number | null) {
  if (page != null && page > 0) return `/pieces/${pieceId}?page=${page}`;
  return `/pieces/${pieceId}`;
}

export function chapterKey(row: {
  entity: string;
  section: string;
  flow: string;
  code: string;
}) {
  return `${row.entity}:${row.section}:${row.flow}:${row.code}`;
}

export function accountKey(row: {
  entity: string;
  section: string;
  flow: string;
  chapter: string;
  code: string;
}) {
  return `${row.entity}:${row.section}:${row.flow}:${row.chapter}:${row.code}`;
}

export function normQuery(value: string) {
  return value
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .trim();
}

export function matchesQuery(
  q: string,
  ...parts: Array<string | number | undefined | null>
) {
  if (!q) return true;
  const hay = normQuery(parts.filter((p) => p != null && p !== "").join(" "));
  return hay.includes(q);
}

export function sourceKindLabel(kind: string) {
  switch (kind) {
    case "cg-ii3":
      return "Compte de gestion · état II-3";
    case "cg-ii4":
      return "Compte de gestion · état II-4";
    case "maquette-article":
      return "Maquette CA · détail par article";
    case "maquette-fonction":
      return "Maquette CA · présentation croisée";
    default:
      return "Pièce";
  }
}

export function sourceShortLabel(source: ExplorerSource) {
  const file = source.file
    .replace(/^0\d\._/, "")
    .replace(/_/g, " ")
    .replace(/\.pdf$/i, "");
  return `${file}, p. ${source.page}`;
}

export function formatBudgetAmount(value: number | undefined | null, exact = false) {
  if (value == null || Number.isNaN(value)) return "—";
  if (!exact && Math.abs(value) >= 1_000_000) return formatMillions(value);
  return formatEuros(value, true);
}

export function nomenclatureFor(
  data: ExplorerData,
  entity: ExplorerEntity,
): { cg: string; maquette: string } {
  if (entity === "boa") {
    return {
      cg: data.meta.nomenclature.boaCg,
      maquette: data.meta.nomenclature.boaMaquette,
    };
  }
  return {
    cg: data.meta.nomenclature.villeCg,
    maquette: data.meta.nomenclature.villeMaquette,
  };
}

export function parseEntity(value: string | null): ExplorerEntity {
  return value === "boa" ? "boa" : "ville";
}

export function parseSection(value: string | null): ExplorerSection {
  return value === "investissement" ? "investissement" : "fonctionnement";
}

export function parseFlow(value: string | null): ExplorerFlow {
  return value === "recette" ? "recette" : "depense";
}

export function filterChapters(
  data: ExplorerData,
  opts: {
    entity: ExplorerEntity;
    section: ExplorerSection;
    flow: ExplorerFlow;
    includeOrder: boolean;
    q: string;
  },
) {
  const q = normQuery(opts.q);
  const chapters = data.chapters.filter((ch) => {
    if (ch.entity !== opts.entity) return false;
    if (ch.section !== opts.section) return false;
    if (ch.flow !== opts.flow) return false;
    if (!opts.includeOrder && ch.order) return false;
    return true;
  });

  if (!q) return chapters;

  const matchingAccountKeys = new Set(
    data.accounts
      .filter(
        (a) =>
          a.entity === opts.entity &&
          a.section === opts.section &&
          a.flow === opts.flow &&
          matchesQuery(q, a.code, a.label, a.chapter),
      )
      .map((a) => chapterKey({ ...a, code: a.chapter })),
  );
  const matchingLineKeys = new Set(
    data.lines
      .filter(
        (line) =>
          line.entity === opts.entity &&
          line.section === opts.section &&
          line.flow === opts.flow &&
          matchesQuery(
            q,
            line.code,
            line.label,
            line.chapter,
            line.functionCode,
            line.functionLabel,
          ),
      )
      .map((line) => chapterKey({ ...line, code: line.chapter })),
  );

  return chapters.filter(
    (ch) =>
      matchesQuery(q, ch.code, ch.label) ||
      matchingAccountKeys.has(chapterKey(ch)) ||
      matchingLineKeys.has(chapterKey(ch)),
  );
}

export function accountsForChapter(
  data: ExplorerData,
  chapter: ExplorerChapter,
  q: string,
) {
  const query = normQuery(q);
  return data.accounts.filter((a) => {
    if (
      a.entity !== chapter.entity ||
      a.section !== chapter.section ||
      a.flow !== chapter.flow ||
      a.chapter !== chapter.code
    ) {
      return false;
    }
    if (!query) return true;
    const lineHit = data.lines.some(
      (line) =>
        line.entity === a.entity &&
        line.section === a.section &&
        line.flow === a.flow &&
        line.chapter === a.chapter &&
        line.code === a.code &&
        matchesQuery(
          query,
          line.code,
          line.label,
          line.functionCode,
          line.functionLabel,
        ),
    );
    return matchesQuery(query, a.code, a.label) || lineHit;
  });
}

export function linesForAccount(
  data: ExplorerData,
  account: ExplorerAccount,
  q: string,
) {
  const query = normQuery(q);
  return data.lines.filter((line) => {
    if (
      line.entity !== account.entity ||
      line.section !== account.section ||
      line.flow !== account.flow ||
      line.chapter !== account.chapter ||
      line.code !== account.code
    ) {
      return false;
    }
    return matchesQuery(
      query,
      line.code,
      line.label,
      line.functionCode,
      line.functionLabel,
    );
  });
}
