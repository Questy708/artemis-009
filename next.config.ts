import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  allowedDevOrigins: [
    "preview-chat-1a6942a2-686b-406e-934b-94d5bd579f4b.space-z.ai",
  ],
};

export default nextConfig;
