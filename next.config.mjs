/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL || "http://localhost:3001",
    API_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000", // Fallback to backend URL
  },
};

export default nextConfig;