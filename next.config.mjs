/** @type {import('next').NextConfig} */

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
        destination: 'https://서버.도메인.넣으면.돼요/:path*',
      },
    ]
  },
};


export default nextConfig;