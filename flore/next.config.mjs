/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow building even with TypeScript warnings
  typescript: {
    ignoreBuildErrors: false,
  },
  // Experimental: allow server actions (for streaming)
  experimental: {},
}

export default nextConfig
