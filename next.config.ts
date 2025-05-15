import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  reactStrictMode: true,
  serverRuntimeConfig: {
    token_api: process.env.TOKEN_API,
    api_domain: process.env.API_DOMAIN,
  },
};

export default nextConfig;
