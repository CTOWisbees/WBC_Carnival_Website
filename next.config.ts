import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Tells Next.js the real project root, fixing the pnpm-lock confusion
  outputFileTracingRoot: path.resolve(__dirname),
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "randomuser.me" },
      { protocol: "https", hostname: "me7aitdbxq.ufs.sh" },
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "i.pravatar.cc" },
      // Django content admin (local dev) — serves uploaded logos/images/media.
      { protocol: "http", hostname: "127.0.0.1", port: "8000" },
      { protocol: "http", hostname: "localhost", port: "8000" },
    ],
  },
};

export default nextConfig;
