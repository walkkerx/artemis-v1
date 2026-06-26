import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  allowedDevOrigins: [
    "preview-chat-2e00444f-5b4d-4b5a-947e-01df0b663afe.space-z.ai",
    "*.space-z.ai",
  ],
};

export default nextConfig;
