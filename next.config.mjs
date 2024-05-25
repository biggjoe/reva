/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  reactStrictMode: true,
  trailingSlash: true,
  env: {
    BASE_URL: process.env.BASE_URL,
  },    
  webpack: (config) => {
    config.infrastructureLogging = {
        level: "error",
    };

    return config;
},
};

export default nextConfig;
