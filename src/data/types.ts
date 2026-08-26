export type Entity = "ville" | "boa" | "both" | "conseil";

export type DocumentStatus =
  | "available"
  | "external"
  | "integrating"
  | "missing"
  | "offbundle";

export type DocumentKind =
  | "ca"
  | "dm"
  | "gestion"
  | "rbf"
  | "cctp"
  | "pv"
  | "delib"
  | "dob"
  | "convention"
  | "liste"
  | "autre";

export type Source = {
  pieceId: string;
  page: number | null;
  label: string;
};

export type Amount = {
  euros: number | null;
  precision: "exact" | "rounded_m" | "k_times_1000";
  source: Source | null;
  missing: string | null;
};

export type RatioTone =
  | "bon"
  | "intermédiaire"
  | "alerte"
  | "critique"
  | "sous-investissement"
  | "cible"
  | "hors-cible"
  | "inconnu";

export type RatioResult = {
  id: string;
  label: string;
  entity: Entity;
  value: number | null;
  unit: "percent" | "years" | "euros";
  tone: RatioTone;
  reading: string;
  formula: string;
  source: Source | null;
  missing: string | null;
};
