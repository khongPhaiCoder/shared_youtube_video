/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  i18n: {
    locales: ["en", "vi"],
    defaultLocale: "en",
    localeDetection: false,
  },

  webpack: (config) => {
    config.resolve = {
      ...config.resolve,
      fallback: {
        fs: false,
        path: false,
        os: false,
      },
    };
    return config;
  },

  generateBuildId: async () => {
    // You can, for example, get the latest git commit hash here
    const build = new Date().getTime();
    return `${build}`;
  },
};

module.exports = nextConfig
