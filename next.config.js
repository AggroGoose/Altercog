/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  images: {
    domains: ["write.altercog.com", "static.ghost.org", "images.unsplash.com"],
  },
  experimental: {
    images: {
      allowFutureImage: true,
    },
  },
};
