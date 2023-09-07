/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
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

    return config;
  }
}

module.exports = nextConfig
