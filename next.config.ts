import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Placeholder catalog photography (src/lib/mock-data.ts only — real
      // products added via the admin panel use Firebase Storage below).
      { protocol: "https", hostname: "loremflickr.com" },
      // Firebase Storage download URLs
      { protocol: "https", hostname: "firebasestorage.googleapis.com" },
      // Alternate Firebase Storage domain used by new-style buckets (*.firebasestorage.app)
      { protocol: "https", hostname: "storage.googleapis.com" },
    ],
  },
};

export default nextConfig;
