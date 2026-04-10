/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    formats: ['image/webp', 'image/avif'],
  },
  allowedDevOrigins: ['192.168.1.7'],
}

export default nextConfig
