import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.kru.co.ke",
      },
    ],
  },
};

export default nextConfig;
