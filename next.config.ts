

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media2.giphy.com",
      },
      {
        protocol: "https",
        hostname: "cdn.dummyjson.com",
      },
      {
        protocol: "https",
        hostname: 'cdn.svgator.com'
      }
    ],
  },
  output: "standalone",
  distDir: 'out',
};

export default nextConfig;
