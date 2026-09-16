import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  output: "standalone",

  experimental: {
    typedRoutes: true
  },

  env: {
    NEXT_PUBLIC_GRAPHQL_URL:
      process.env.NEXT_PUBLIC_GRAPHQL_URL ??
      "http://localhost:8000/graphql"
  }
};

export default nextConfig;
