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
          {
            protocol: 'https',
            hostname: 'img.clerk.com',
            port: ''
          },
          {
            protocol: 'https',
            hostname: 'firebasestorage.googleapis.com',
            port: '',
          },
          {
            protocol: 'https',
            hostname: 'www.kindpng.com',
            port: '',
          }
        ],
      },
};

export default nextConfig;
