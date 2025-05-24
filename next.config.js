/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    // Add fallbacks for Node.js core modules
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      http: require.resolve('stream-http'),
      https: require.resolve('https-browserify'),
      os: require.resolve('os-browserify/browser'),
      path: require.resolve('path-browserify'),
    };

    return config;
  },
  // Allow images from various sources
  images: {
    domains: [
      'ipfs.io',
      'ipfs.infura.io',
      'gateway.pinata.cloud',
      'nft-cdn.alchemy.com',
      'res.cloudinary.com',
      'picsum.photos',
      'source.unsplash.com',
    ],
  },
  // Environment variables that should be exposed to the client
  env: {
    NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
    NEXT_PUBLIC_DEFAULT_CHAIN: process.env.NEXT_PUBLIC_DEFAULT_CHAIN || 'sepolia',
  },
  // Enable experimental features
  experimental: {
    esmExternals: 'loose',
    serverComponentsExternalPackages: ['@toruslabs/solana-embed'],
  },
};

module.exports = nextConfig;
