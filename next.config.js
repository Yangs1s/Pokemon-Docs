
/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    serverComponents: true,
    appDir: true,
  },
  images: {
    domains: ['pokeapi.co', 'raw.githubusercontent.com']
  }
}

module.exports = nextConfig


