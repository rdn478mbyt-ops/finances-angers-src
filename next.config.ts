import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 90],
  },
  async headers() {
    return [
      {
        source: "/search/index.json.gz",
        headers: [
          { key: "Content-Type", value: "application/gzip" },
          { key: "Cache-Control", value: "public, max-age=86400" },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/pieces/33._Promesse.pdf",
        destination: "/api/fonds/33._Promesse.pdf",
      },
      {
        source: "/pieces/34._Promesse_dachat.pdf",
        destination: "/api/fonds/34._Promesse_dachat.pdf",
      },
    ];
  },
};

export default nextConfig;
