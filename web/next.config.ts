import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@bottega/server'],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'picsum.photos' },
      { protocol: 'https', hostname: 'fastly.picsum.photos' },
    ],
  },
};

export default nextConfig;
