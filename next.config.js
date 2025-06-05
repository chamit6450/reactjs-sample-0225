<<<<<<< HEAD
=======
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['picsum.photos'],
<<<<<<< HEAD
  }
=======
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', 'your-production-domain.com'],
    },
  },
>>>>>>> 066e6db (minor fixes)
}

export default nextConfig 
>>>>>>> 45952b9 (minor fixes)
