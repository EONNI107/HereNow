/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['plus.unsplash.com'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'tong.visitkorea.or.kr',
      },
    ],
  },
};

export default nextConfig;
