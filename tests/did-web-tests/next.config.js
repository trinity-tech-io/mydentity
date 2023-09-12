const { join } = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  output: 'export',
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@elastosfoundation/did-js-sdk": join(__dirname, "./node_modules/@elastosfoundation/did-js-sdk/dist/es/did.browser.js"),
      "@elastosfoundation/elastos-connectivity-sdk-js": join(__dirname, "./node_modules/@elastosfoundation/elastos-connectivity-sdk-js/dist.esm/index.js")
    }
    return config
  }
}
module.exports = nextConfig
