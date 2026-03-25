/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  env: {
    SITE_NAME: "ZXScript",
    SITE_DESCRIPTION: "Gerador de Scripts Luau com IA - Fly, ESP, GUI e muito mais para executors",
  },
};

export default nextConfig;
