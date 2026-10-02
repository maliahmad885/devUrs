import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Standalone output for the Dockerfile; Vercel ignores it.
  output: 'standalone',

  images: {
    formats: ['image/avif', 'image/webp'],
  },

  compress: true,

  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
    webpackBuildWorker: true,
    parallelServerCompiles: true,
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ];
  },

  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
