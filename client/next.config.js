/** @type {import('next').NextConfig} */
const nextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },

  images: {
    remotePatterns: [
      {
        hostname: "cdn.discordapp.com",
        pathname: "**",
        protocol: "https",
      },
    ],
  },
};

module.exports = nextConfig;
