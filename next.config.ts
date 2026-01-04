import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ensure Prisma generated files are included in build
  outputFileTracingIncludes: {
    '/*': ['./app/generated/**/*'],
  },
  // Ensure webpack is used (fallback if env var doesn't work)
  webpack: (config) => {
    return config;
  },
};

export default nextConfig;
