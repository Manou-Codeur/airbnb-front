/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        hostname: "images.pexels.com",
      },
      {
        hostname: "magazine.bellesdemeures.com",
      },
      {
        hostname: "a0.muscache.com",
      },
      {
        hostname: "i.imgur.com",
      },
    ],
  },
};

module.exports = nextConfig;
