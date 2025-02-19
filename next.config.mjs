/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: {
    appIsrStatus: false,
  },
  images: {
    minimumCacheTTL: 31536000,
  },
};

export default nextConfig;
