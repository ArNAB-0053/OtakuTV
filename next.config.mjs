/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'cdn.myanimelist.net',
            port: '',
          },
          {
            protocol: 'https',
            hostname: 'www.youtube.com',
            port: '',
          },
        ],
      },
};

export default nextConfig;
