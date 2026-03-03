/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "github.com" },
      { protocol: "https", hostname: "img.freepik.com" },
      { protocol: "https", hostname: "jiroshi-static-dev.s3.ap-south-1.amazonaws.com" },
      { protocol: "https", hostname: "jiroshi-media-dev.s3.ap-south-1.amazonaws.com" },
      { protocol: "https", hostname: "jiroshi-static-prod.s3.ap-south-1.amazonaws.com" },
      { protocol: "https", hostname: "jiroshi-media-prod.s3.ap-south-1.amazonaws.com" }
    ],
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors 'none';",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;