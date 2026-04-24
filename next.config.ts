import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Server-side rendering enabled so /api/blogs route works in Vercel.
  // For local development run: npm run dev (port 3000)
  // For production deployment: push to the GitHub repo connected to Vercel.
};

export default nextConfig;
