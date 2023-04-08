/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    appDir: true,
  },
  rewrites: async () => [
    {
      source: "/api/:path*",
      destination: "http://localhost:3001/:path*",
    },
  ],
};

module.exports = nextConfig;
