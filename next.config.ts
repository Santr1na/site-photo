import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1"],
  images: {
    deviceSizes: [640, 828, 1080, 1200, 1920],
    imageSizes: [256, 384],
    qualities: [70, 75],
  },
};

export default nextConfig;
