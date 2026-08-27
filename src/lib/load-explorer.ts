import type { ExplorerData } from "@/data/explorer-types";

function isExplorerData(data: unknown): data is ExplorerData {
  if (!data || typeof data !== "object") return false;
  const value = data as ExplorerData;
  return (
    Array.isArray(value.chapters) &&
    value.chapters.length >= 10 &&
    Array.isArray(value.accounts) &&
    Array.isArray(value.lines)
  );
}

export async function loadExplorerIndex(): Promise<ExplorerData | null> {
  try {
    const res = await fetch("/explorer/index.json.gz", { cache: "force-cache" });
    if (!res.ok) return null;
    const buf = await res.arrayBuffer();
    if (buf.byteLength < 1000 || typeof DecompressionStream === "undefined") return null;
    const stream = new Response(buf).body;
    if (!stream) return null;
    const unzipped = stream.pipeThrough(new DecompressionStream("gzip"));
    const text = await new Response(unzipped).text();
    const data = JSON.parse(text) as unknown;
    return isExplorerData(data) ? data : null;
  } catch {
    return null;
  }
}
