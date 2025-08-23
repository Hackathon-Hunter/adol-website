import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Removed "output: export" to enable dynamic routing
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  // distDir: "out", // Not needed without static export
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    unoptimized: true,
  },

  // Enable React strict mode for better development experience
  reactStrictMode: true,

  // Environment variables for ICP
  env: {
    NEXT_PUBLIC_IC_HOST:
      process.env.NODE_ENV === "production"
        ? "https://ic0.app"
        : "http://localhost:4943",
    NEXT_PUBLIC_BACKEND_CANISTER_ID:
      process.env.NEXT_PUBLIC_BACKEND_CANISTER_ID,
  },

  // Webpack configuration for browser compatibility
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Browser fallbacks for Node.js modules
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
};

export default nextConfig;
