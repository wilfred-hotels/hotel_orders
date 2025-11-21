import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // recommended
  images: {
    domains: ["images.unsplash.com", "source.unsplash.com", "placehold.co"],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
