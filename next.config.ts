import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

module.exports = {
  serverRuntimeConfig: {
    host: '0.0.0.0',
  },
  devIndicators: {
    autoPrerender: false,
  },
  images: {
    domains: ['http2.mlstatic.com', 'mla-s2-p.mlstatic.com'],
  },
};

export default nextConfig;
