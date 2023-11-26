/**
 * @type {import('next').NextConfig}
 */

const nextConfig = {
  trailingSlash: true,
  reactStrictMode: true,
  swcMinify: true,
};

const withNextIntl = require("next-intl/plugin")(
  // This is the default (also the `src` folder is supported out of the box)
  "./i18n.ts"
);

module.exports = withNextIntl({
  nextConfig,
});
