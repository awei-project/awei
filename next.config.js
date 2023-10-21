/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["page.tsx", "tsx"],
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true, // @latticexyz/common type issue
  },
};

module.exports = nextConfig;
