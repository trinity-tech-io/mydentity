/** @type {import('next').NextConfig} */

const path = require("path");
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig = {
  images: {
    unoptimized: true,
  },
  reactStrictMode: false,
  output: 'export',
  webpack(config, { webpack }) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"]
    });

    // Exclude the optional "rdf-canonize-native" lib used by jsonld, works only in nodejs environments.
    config.plugins.push(new webpack.IgnorePlugin({
      resourceRegExp: /rdf-canonize-native/
    }));

    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
        // Force thwe WHOLE app and dependencies to use a single version of bn/js. (80kb x 14 duplicates...)
        // IMPORTANT: this could have side effects as some libs use bn.js v 4 and some others v5 ... to be continued
        // Commented out because this generates a bn.js not found error on some machines
        // "bn.js": path.resolve(__dirname, '/node_modules/bn.js')
      }
    };

    return config;
  }
}

module.exports = withBundleAnalyzer(nextConfig)
