import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL("https://newapi.mordovklimat.ru/**")],
  },
};

export default nextConfig;
