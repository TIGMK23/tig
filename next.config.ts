import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Force Turbopack to treat this directory as the workspace root to avoid
    // parent lockfiles (e.g., /Users/mk/package-lock.json) being auto-detected.
    root: __dirname,
  },
};

export default nextConfig;
