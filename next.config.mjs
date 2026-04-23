/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "img.transistorcdn.com" },
      { protocol: "https", hostname: "**.transistor.fm" },
    ],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  transpilePackages: ["three"],
};

export default nextConfig;
