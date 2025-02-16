import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
    return []; //  Redirects have been removed.
    return [
      {
        source: "/",
        destination: "/",
        permanent: true, // Use 'true' for permanent redirects (308)
      },
    ];
  },
};

export default nextConfig;
