import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep @amplitude/ai out of the bundler so its Node-only deps resolve at runtime.
  serverExternalPackages: ["@amplitude/ai"],
  images: { remotePatterns: [{ protocol: "https", hostname: "i.ytimg.com" }] },
  async redirects() {
    return [
      { source: "/journal", destination: "/blog", permanent: true },
      { source: "/journal/:slug", destination: "/blog/:slug", permanent: true },
    ];
  },
};

export default nextConfig;
