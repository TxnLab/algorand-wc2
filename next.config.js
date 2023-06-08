/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // @see https://github.com/WalletConnect/walletconnect-monorepo/issues/1908#issuecomment-1487801131
    config.externals.push('pino-pretty', 'lokijs', 'encoding', 'utf-8-validate', 'bufferutil')
    return config
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'walletconnect.com',
        port: ''
      }
    ]
  }
}

module.exports = nextConfig
