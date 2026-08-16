import type { NextConfig } from "next";

const repoName = "pokemon-tcg-pocket";
const isPagesBuild = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  agentRules: false,
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  basePath: isPagesBuild ? `/${repoName}` : "",
  assetPrefix: isPagesBuild ? `/${repoName}/` : ""
};

export default nextConfig;
