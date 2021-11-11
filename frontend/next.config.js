const path = require("path");
/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["avatars.githubusercontent.com"],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack(config, options) {
    config.resolve = {
      alias: {
        "@src": path.join(__dirname, "src"),
        "@components": path.join(__dirname, "src", "components"),
      },
      ...config.resolve,
    };

    return config;
  },
};
