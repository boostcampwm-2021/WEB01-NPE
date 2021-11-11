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
        "@api": path.join(__dirname, "src", "lib", "api"),
        "@types": path.join(__dirname, "src", "types"),
      },
      ...config.resolve,
    };

    return config;
  },
};
