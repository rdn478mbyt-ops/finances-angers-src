export type ExplorerEntity = "ville" | "boa";
export type ExplorerSection = "fonctionnement" | "investissement";
export type ExplorerFlow = "depense" | "recette";

export type ExplorerSource = {
  pieceId: string;
  file: string;
  page: number;
  kind: string;
};

export type ExplorerChapter = {
  code: string;
  label: string;
  entity: ExplorerEntity;
  section: ExplorerSection;
  flow: ExplorerFlow;
  order: boolean;
  source: ExplorerSource;
  bp?: number;
  dm?: number;
  credits?: number;
  realized: number;
  remainder?: number;
  accountCount: number;
};

export type ExplorerAccount = {
  code: string;
  chapter: string;
  label: string;
  entity: ExplorerEntity;
  section: ExplorerSection;
  flow: ExplorerFlow;
  realized: number;
  credits?: number;
  source: ExplorerSource;
};

export type ExplorerLine = {
  code: string;
  chapter: string;
  label: string;
  functionCode: string;
  functionLabel: string;
  functionFamily?: string;
  entity: ExplorerEntity;
  section: ExplorerSection;
  flow: ExplorerFlow;
  realized: number;
  source: ExplorerSource;
};

export type ExplorerMeta = {
  nomenclature: {
    villeCg: string;
    boaCg: string;
    villeMaquette: string;
    boaMaquette: string;
  };
  note: string;
  counts: {
    chapters: number;
    accounts: number;
    functionLines: number;
  };
};

export type ExplorerData = {
  meta: ExplorerMeta;
  chapters: ExplorerChapter[];
  accounts: ExplorerAccount[];
  lines: ExplorerLine[];
};
