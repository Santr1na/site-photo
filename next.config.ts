import type { NextConfig } from "next";

function pagesBasePath() {
  const value = process.env.NEXT_PUBLIC_BASE_PATH?.trim() ?? "";
  if (!value || value === "/") return undefined;
  return value.startsWith("/") ? value.replace(/\/$/, "") : `/${value}`;
}

const basePath = pagesBasePath();

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  assetPrefix: basePath,
  allowedDevOrigins: ["127.0.0.1"],
  images: {
    unoptimized: true,
    deviceSizes: [640, 828, 1080, 1200, 1920],
    imageSizes: [256, 384],
    qualities: [70, 75],
  },
};

export default nextConfig;
