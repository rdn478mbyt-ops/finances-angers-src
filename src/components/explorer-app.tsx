"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronDown, ChevronRight } from "lucide-react";
import type { ExplorerData } from "@/data/explorer-types";
import {
  accountsForChapter,
  chapterKey,
  filterChapters,
  formatBudgetAmount,
  linesForAccount,
  nomenclatureFor,
  parseEntity,
  parseFlow,
  parseSection,
  piecePageHref,
  sourceKindLabel,
  sourceShortLabel,
  type ExplorerAccount,
  type ExplorerChapter,
  type ExplorerEntity,
  type ExplorerFlow,
  type ExplorerLine,
  type ExplorerSection,
  type ExplorerSource,
} from "@/lib/explorer";
import { loadExplorerIndex } from "@/lib/load-explorer";
import { cn } from "@/lib/utils";

type LoadState =
  | { status: "loading" }
  | { status: "ready"; data: ExplorerData }
  | { status: "missing" };

type QueryState = {
  entity: ExplorerEntity;
  section: ExplorerSection;
  flow: ExplorerFlow;
  chapitre: string;
  compte: string;
  q: string;
  ordre: boolean;
};

function readQuery(params: URLSearchParams): QueryState {
  return {
    entity: parseEntity(params.get("entity")),
    section: parseSection(params.get("section")),
    flow: parseFlow(params.get("flow")),
    chapitre: params.get("chapitre") ?? "",
    compte: params.get("compte") ?? "",
    q: params.get("q") ?? "",
    ordre: params.get("ordre") === "1",
  };
}

function writeQuery(state: QueryState) {
  const p = new URLSearchParams();
  p.set("entity", state.entity);
  p.set("section", state.section);
  p.set("flow", state.flow);
  if (state.chapitre) p.set("chapitre", state.chapitre);
  if (state.compte) p.set("compte", state.compte);
  if (state.q.trim()) p.set("q", state.q.trim());
  if (state.ordre) p.set("ordre", "1");
  return p.toString();
}

export function ExplorerApp() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = useMemo(
    () => readQuery(new URLSearchParams(searchParams.toString())),
    [searchParams],
  );
  const [load, setLoad] = useState<LoadState>({ status: "loading" });
  const [qLocal, setQLocal] = useState(query.q);

  useEffect(() => {
    let cancelled = false;
    loadExplorerIndex()
      .then((data) => {
        if (cancelled) return;
        setLoad(data ? { status: "ready", data } : { status: "missing" });
      })
      .catch(() => {
        if (!cancelled) setLoad({ status: "missing" });
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const replaceQuery = useCallback(
    (patch: Partial<QueryState>) => {
      const next: QueryState = { ...query, ...patch };
      if (
        patch.entity ||
        patch.section ||
        patch.flow ||
        patch.ordre !== undefined
      ) {
        if (patch.chapitre === undefined) next.chapitre = "";
        if (patch.compte === undefined) next.compte = "";
      }
      if (patch.chapitre !== undefined && patch.compte === undefined) {
        next.compte = "";
      }
      const qs = writeQuery(next);
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [pathname, query, router],
  );

  useEffect(() => {
    if (qLocal === query.q) return;
    const t = window.setTimeout(() => replaceQuery({ q: qLocal }), 280);
    return () => window.clearTimeout(t);
  }, [qLocal, query.q, replaceQuery]);

  const chapters = useMemo(() => {
    if (load.status !== "ready") return [];
    return filterChapters(load.data, {
      entity: query.entity,
      section: query.section,
      flow: query.flow,
      includeOrder: query.ordre,
      q: qLocal,
    });
  }, [load, query.entity, query.section, query.flow, query.ordre, qLocal]);

  const initialChapitreRef = useRef(query.chapitre);

  useEffect(() => {
    if (load.status !== "ready" || !initialChapitreRef.current) return;
    const el = document.getElementById(`chapitre-${initialChapitreRef.current}`);
    if (!el) return;
    el.scrollIntoView({ block: "start" });
    initialChapitreRef.current = "";
  }, [load.status, chapters.length]);

  const realizedSum = chapters.reduce((acc, ch) => acc + (ch.realized || 0), 0);
  const names = {
    entity: query.entity === "ville" ? "Ville" : "BOA",
    section: query.section === "fonctionnement" ? "fonctionnement" : "investissement",
    flow: query.flow === "recette" ? "recettes" : "dépenses",
  };
  const aplat = query.section === "fonctionnement" ? "bg-vert-1" : "bg-violet";

  return (
    <div>
      <label className="mt-8 flex items-center gap-2 text-sm text-ink/80">
        <input
          type="checkbox"
          checked={query.ordre}
          onChange={(e) => replaceQuery({ ordre: e.target.checked })}
          className="size-4 accent-rouge"
        />
        Y compris opérations d’ordre (021, 023, 040, 041, 042, 001, 002)
      </label>

      <div className="mt-5">
        <label htmlFor="recherche-explorateur" className="font-heading text-lg font-semibold">
          Recherche
        </label>
        <p className="mt-1 text-sm text-ink/80">
          Libellé ou n° de compte. L’entrée reste chapitre → compte → ligne.
        </p>
        <input
          id="recherche-explorateur"
          value={qLocal}
          onChange={(e) => setQLocal(e.target.value)}
          placeholder="011, fiscalité, 6042, personnel…"
          className="mt-3 h-10 w-full rounded-md border border-line bg-white px-3 text-sm outline-none ring-vert-1 focus:ring-2"
        />
      </div>

      {load.status === "loading" ? (
        <>
          <FilterBar query={query} replaceQuery={replaceQuery} />
          <p className="mt-6 text-sm text-ink/70">
            Chargement de l’index (compte de gestion + maquette CA)…
          </p>
        </>
      ) : null}

      {load.status === "missing" ? (
        <>
          <FilterBar query={query} replaceQuery={replaceQuery} />
          <p className="mt-6 rounded-md bg-jaune/40 p-4 text-sm text-ink">
            Index de l’explorateur absent de cet hébergement. Les PDF du fonds
            restent sur chaque fiche. Aucun chiffre n’est inventé.
          </p>
        </>
      ) : null}

      {load.status === "ready" ? (
        <>
          <p className="mt-6 text-sm text-ink/80">
            Nomenclature de la pièce :{" "}
            <strong>{nomenclatureFor(load.data, query.entity).cg}</strong>
            {" · "}
            {nomenclatureFor(load.data, query.entity).maquette}. Le bandeau du
            site (passage M57 au prochain budget) n’est pas une maquette
            inventée pour ce CA.
          </p>
          <p className="mt-2 text-sm text-ink/80">
            {chapters.length} chapitre{chapters.length > 1 ? "s" : ""} ·{" "}
            {names.entity} · {names.section} · {names.flow}
            {qLocal.trim() ? ` · « ${qLocal.trim()} »` : ""} · réalisé{" "}
            <span className="font-heading font-semibold tabular-nums">
              {formatBudgetAmount(realizedSum, query.entity === "boa")}
            </span>
            .
          </p>

          <FilterBar query={query} replaceQuery={replaceQuery} />

          {chapters.length === 0 ? (
            <p className="mt-6 rounded-md border bg-white p-4 text-sm text-ink/80">
              Aucun chapitre ni compte pour {names.entity} · {names.section} ·{" "}
              {names.flow}
              {qLocal.trim() ? ` et « ${qLocal.trim()} »` : ""}. Changez le
              filtre (Ville / BOA, fonctionnement / investissement, recettes /
              dépenses) ou videz la recherche. Les opérations d’ordre sont
              masquées par défaut.
            </p>
          ) : (
            <ul className="mt-6 overflow-hidden rounded-xl border bg-white shadow-[0_1px_8px_rgba(15,23,42,0.06)]">
              {chapters.map((chapter) => {
                const open = query.chapitre === chapter.code;
                return (
                  <li
                    key={chapterKey(chapter)}
                    id={`chapitre-${chapter.code}`}
                    className="border-t border-line first:border-t-0"
                  >
                    <div className="flex items-stretch">
                      <button
                        type="button"
                        aria-expanded={open}
                        onClick={() =>
                          replaceQuery({
                            chapitre: open ? "" : chapter.code,
                            compte: "",
                          })
                        }
                        className="flex min-w-0 flex-1 items-start gap-3 px-4 py-3 text-left hover:bg-muted/40"
                      >
                        <span className="mt-1 text-ink/50" aria-hidden>
                          {open ? (
                            <ChevronDown className="size-4" />
                          ) : (
                            <ChevronRight className="size-4" />
                          )}
                        </span>
                        <span
                          className={cn(
                            "mt-0.5 inline-block size-2 shrink-0 rounded-full",
                            aplat,
                          )}
                          aria-hidden
                        />
                        <span className="min-w-0 flex-1">
                          <span className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                            <span>
                              <span className="font-mono text-sm font-semibold text-ink">
                                {chapter.code}
                              </span>{" "}
                              <span className="font-heading text-base font-semibold">
                                {chapter.label}
                              </span>
                            </span>
                            <span className="font-heading text-lg font-bold tabular-nums sm:text-right">
                              {formatBudgetAmount(
                                chapter.realized,
                                query.entity === "boa" || Math.abs(chapter.realized) < 1_000_000,
                              )}
                            </span>
                          </span>
                          <span className="mt-1 block text-xs text-ink/70">
                            {chapter.accountCount} compte
                            {chapter.accountCount > 1 ? "s" : ""}
                            {chapter.credits != null
                              ? ` · crédits ${formatBudgetAmount(chapter.credits, true)}`
                              : ""}
                            {chapter.order ? " · opération d’ordre" : ""}
                          </span>
                        </span>
                      </button>
                    </div>
                    <p className="px-4 pb-3 pl-[3.25rem] text-xs">
                      <SourceLink source={chapter.source} />
                    </p>
                    {open ? (
                      <ChapterBody
                        data={load.data}
                        chapter={chapter}
                        query={query}
                        q={qLocal}
                        onOpenAccount={(code) =>
                          replaceQuery({
                            chapitre: chapter.code,
                            compte: query.compte === code ? "" : code,
                          })
                        }
                      />
                    ) : null}
                  </li>
                );
              })}
            </ul>
          )}
        </>
      ) : null}
    </div>
  );
}

function ChapterBody({
  data,
  chapter,
  query,
  q,
  onOpenAccount,
}: {
  data: ExplorerData;
  chapter: ExplorerChapter;
  query: QueryState;
  q: string;
  onOpenAccount: (code: string) => void;
}) {
  const accounts = accountsForChapter(data, chapter, q);
  if (accounts.length === 0) {
    return (
      <p className="border-t border-line bg-muted/30 px-4 py-3 pl-[3.25rem] text-sm text-ink/80">
        Pas d’article nominatif dans le CG II-4 ni dans le détail par article
        de la maquette pour ce chapitre. Le réalisé ci-dessus vient de l’état
        II-3. Ouvrez la pièce à la page citée.
      </p>
    );
  }
  return (
    <ul className="border-t border-line bg-muted/20">
      {accounts.map((account) => {
        const open = query.compte === account.code;
        return (
          <li key={account.code} className="border-t border-line/80 first:border-t-0">
            <button
              type="button"
              aria-expanded={open}
              onClick={() => onOpenAccount(account.code)}
              className="flex w-full items-start gap-3 px-4 py-2.5 pl-[3.25rem] text-left hover:bg-white/80"
            >
              <span className="mt-1 text-ink/40" aria-hidden>
                {open ? (
                  <ChevronDown className="size-4" />
                ) : (
                  <ChevronRight className="size-4" />
                )}
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                  <span>
                    <span className="font-mono text-sm">{account.code}</span>{" "}
                    <span className="text-sm">{account.label}</span>
                  </span>
                  <span className="font-heading text-base font-semibold tabular-nums sm:text-right">
                    {formatBudgetAmount(account.realized, true)}
                  </span>
                </span>
              </span>
            </button>
            <p className="px-4 pb-2 pl-[4.75rem] text-xs">
              <SourceLink source={account.source} />
            </p>
            {open ? (
              <AccountLines data={data} account={account} q={q} />
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}

function AccountLines({
  data,
  account,
  q,
}: {
  data: ExplorerData;
  account: ExplorerAccount;
  q: string;
}) {
  const lines = linesForAccount(data, account, q);
  if (lines.length === 0) {
    return (
      <p className="bg-white px-4 py-3 pl-[4.75rem] text-sm text-ink/80">
        Pas de ventilation par fonction à montant non nul dans la maquette.
        Ouvrez l’article dans la pièce.
      </p>
    );
  }
  return (
    <ul className="bg-white">
      {lines.map((line) => (
        <li
          key={`${line.functionCode}-${line.code}-${line.realized}-${line.source.page}`}
          className="border-t border-line/70"
        >
          <LineRow line={line} />
        </li>
      ))}
    </ul>
  );
}

function LineRow({ line }: { line: ExplorerLine }) {
  const href = piecePageHref(line.source.pieceId, line.source.page);
  const title =
    line.functionLabel && line.functionLabel !== line.label
      ? `${line.functionCode} ${line.functionLabel}`
      : `${line.functionCode}`;
  const article =
    line.label && line.label !== line.code ? `${line.code} · ${line.label}` : line.code;
  return (
    <Link
      href={href}
      className="flex flex-col gap-1 px-4 py-2.5 pl-[4.75rem] hover:bg-muted/50 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
    >
      <span className="min-w-0">
        <span className="block text-sm text-ink">
          <span className="font-mono text-xs text-ink/70">{article}</span>
          {" · "}
          {title}
        </span>
        <span className="mt-0.5 block text-xs text-ink/70">
          {sourceKindLabel(line.source.kind)} · p. {line.source.page}
        </span>
      </span>
      <span className="font-heading text-sm font-semibold tabular-nums sm:text-right">
        {formatBudgetAmount(line.realized, true)}
      </span>
    </Link>
  );
}

function SourceLink({ source }: { source: ExplorerSource }) {
  return (
    <Link
      href={piecePageHref(source.pieceId, source.page)}
      className="text-ink/80 underline decoration-rose/40 hover:text-rouge"
      onClick={(e) => e.stopPropagation()}
    >
      {sourceKindLabel(source.kind)} · {sourceShortLabel(source)}
    </Link>
  );
}

function FilterBar({
  query,
  replaceQuery,
}: {
  query: QueryState;
  replaceQuery: (patch: Partial<QueryState>) => void;
}) {
  return (
    <div className="mt-6 rounded-xl border bg-white p-4 shadow-[0_1px_8px_rgba(15,23,42,0.06)]">
      <p className="font-heading text-sm font-semibold text-ink">Filtres</p>
      <p className="mt-1 text-xs text-ink/70">
        Collectivité, section et sens — visibles ici, pas seulement dans l’URL.
      </p>
      <div className="mt-3 flex flex-wrap items-end gap-x-8 gap-y-3">
        <Segment
          ariaLabel="Collectivité"
          value={query.entity}
          onChange={(entity) => replaceQuery({ entity })}
          options={[
            { value: "ville", label: "Ville" },
            { value: "boa", label: "BOA" },
          ]}
        />
        <Segment
          ariaLabel="Section"
          value={query.section}
          onChange={(section) => replaceQuery({ section })}
          options={[
            { value: "fonctionnement", label: "Fonctionnement" },
            { value: "investissement", label: "Investissement" },
          ]}
        />
        <Segment
          ariaLabel="Sens"
          value={query.flow}
          onChange={(flow) => replaceQuery({ flow })}
          options={[
            { value: "depense", label: "Dépenses" },
            { value: "recette", label: "Recettes" },
          ]}
        />
      </div>
    </div>
  );
}

function Segment<T extends string>({
  value,
  onChange,
  options,
  ariaLabel,
}: {
  value: T;
  onChange: (value: T) => void;
  options: { value: T; label: string }[];
  ariaLabel: string;
}) {
  return (
    <div role="group" aria-label={ariaLabel} className="min-w-[12rem]">
      <p className="mb-1.5 text-[11px] font-medium uppercase tracking-[0.16em] text-ink/60">
        {ariaLabel}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            aria-pressed={value === option.value}
            onClick={() => onChange(option.value)}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-sm shadow-[0_1px_4px_rgba(15,23,42,0.04)]",
              value === option.value
                ? "border-rouge bg-rose/10 font-medium text-rouge"
                : "border-line bg-white text-ink/80 hover:border-rose",
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
