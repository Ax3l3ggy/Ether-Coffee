/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@scale/scaleui-radix'],
  experimental: {
    esmExternals: true
  }
}

module.exports = nextConfig 