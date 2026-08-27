import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 90],
  },
  transpilePackages: ["pdfjs-dist"],
  async redirects() {
    return [{ source: "/comptes", destination: "/explorer", permanent: false }];
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
      {
        source: "/explorer/index.json.gz",
        headers: [
          { key: "Content-Type", value: "application/gzip" },
          { key: "Cache-Control", value: "public, max-age=86400" },
        ],
      },
    ];
  },
};

export default nextConfig;
