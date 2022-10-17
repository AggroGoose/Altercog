/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  images: {
    domains: [
      "write.altercog.com",
      "static.ghost.org",
      "images.unsplash.com",
      "lh1.googleusercontent.com",
      "lh2.googleusercontent.com",
      "lh3.googleusercontent.com",
      "lh4.googleusercontent.com",
      "lh5.googleusercontent.com",
      "lh6.googleusercontent.com",
      "lh7.googleusercontent.com",
      "pbs.twimg.com",
    ],
  },
  experimental: {
    images: {
      allowFutureImage: true,
    },
  },
};
