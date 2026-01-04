import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ensure Prisma generated files are included in build
  outputFileTracingIncludes: {
    '/*': ['./app/generated/**/*'],
  },
};

export default nextConfig;
