import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    strictNextHead: true, // Ensures only valid tags are used in <head>
    optimizeCss: true,
  },
  compress: true,
  // poweredByHeader: true,

  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },

  /* redirects */
  async redirects() {
    // return []; //  Redirects have been removed.
    return [
      {
        source: "/(.*)",
        has: [
          {
            type: "host",
            value: "nextgencomputing.vercel.app",
          },
        ],
        destination: "https://nextgencomputing.co.ke/:path*",
        permanent: true, // Use 'true' for permanent redirects (308)
      },
    ];
  },
};

export default nextConfig;
