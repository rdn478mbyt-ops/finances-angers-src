import raw from "./pieces-index.json";

export type PieceIndexDoc = {
  file: string;
  href: string;
  pages: { page: number; text: string }[];
};

export const piecesIndex = raw as PieceIndexDoc[];
