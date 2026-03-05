import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Local dev
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
      // Strapi Cloud (production)
      {
        protocol: "https",
        hostname: "*.strapiapp.com",
        pathname: "/uploads/**",
      },
      // Strapi Cloud media CDN
      {
        protocol: "https",
        hostname: "*.media.strapiapp.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
