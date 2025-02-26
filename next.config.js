/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  // This is crucial - forces static export
  output: 'export',
  // Disable image optimization since we're doing static export
  images: {
    unoptimized: true
  },
  // Add this to ensure Next.js knows it's a static export
  distDir: 'out',
  // Explicitly disable server features
  experimental: {
    appDir: false,
    serverComponents: false,
    serverActions: false
  }
}

module.exports = nextConfig
