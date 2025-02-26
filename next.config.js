/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  // For AWS Amplify hosting
  output: 'export',
  // Images are handled statically in this project
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
