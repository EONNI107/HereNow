/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'tong.visitkorea.or.kr',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
      {
        protocol: 'https',
        hostname: 'cuxcqeqwbwfuxipnozwy.supabase.co',
      },
      {
        hostname: 'lh3.googleusercontent.com',
      },
      {
        hostname: 't1.kakaocdn.net',
      },
    ],
  },
};

export default nextConfig;
