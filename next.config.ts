import type { NextConfig } from 'next/dist/server/config';

const nextConfig: NextConfig = {
  env: {
    GITHUB_USERNAME: process.env.GITHUB_USERNAME,
    GITHUB_TOKEN: process.env.GITHUB_TOKEN,
  },
};

export default nextConfig;
