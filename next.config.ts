import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: { ignoreDuringBuilds: true },
  images: {
    domains: ["images.unsplash.com", "source.unsplash.com"],
  },
};

export default nextConfig;
