/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove ignoreBuildErrors - fix TypeScript errors instead
  typescript: {
    ignoreBuildErrors: false,
  },
  // Enable image optimization for better performance
  images: {
    unoptimized: false,
    remotePatterns: [],
    formats: ['image/webp', 'image/avif'],
  },
}

export default nextConfig
