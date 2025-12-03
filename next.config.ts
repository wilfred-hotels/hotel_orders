/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      // allow images from any subdomain and path under example.com
      {
        protocol: "https",
        hostname: "**.example.com",
        port: "",
        pathname: "/**",
      },
      // allow images from your backend/API domain (onrender.com)
      {
        protocol: "https",
        hostname: "*.onrender.com",
        port: "",
        pathname: "/**",
      },
      // allow images from known third‑party hosts (e.g. Unsplash)
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "source.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
        port: "",
        pathname: "/**",
      },
      // Add additional hostnames as needed...
    ],
    // (optional) you could also add domains fallback — but remotePatterns is preferred
    // domains: ["example.com","images.unsplash.com","onrender.com"]
  },
};

module.exports = nextConfig;
