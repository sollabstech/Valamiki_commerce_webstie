import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Placeholder catalog photography (src/lib/mock-data.ts only — real
      // products added via the admin panel use Firebase Storage below).
      { protocol: "https", hostname: "loremflickr.com" },
      { protocol: "https", hostname: "firebasestorage.googleapis.com" },
    ],
  },
};

export default nextConfig;
