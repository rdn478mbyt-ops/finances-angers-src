export type PieceIndexDoc = {
  file: string;
  href: string;
  pages: { page: number; text: string }[];
};

/** Scans image, calque texte vide dans l’index OCR. */
export const SCAN_ONLY_FILES = [
  "29._Avenant_2026.pdf",
  "29._Convention_2022-2025.pdf",
  "Proces-verbal_du_conseil_municipal_du_27_mars_2026.pdf",
] as const;
