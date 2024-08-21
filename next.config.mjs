/** @type {import('next').NextConfig} */

import { createProxyMiddleware } from 'http-proxy-middleware';

const nextConfig = {
  async redirects() {
    return [
      {
        source: '/', 
        destination: '/login',
        permanent: true
      }
    ];
  },

  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://sodam.store/:path*',
      },
    ];
  },
};

export default nextConfig;
