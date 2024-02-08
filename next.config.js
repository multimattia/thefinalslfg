/** @type {import('next').NextConfig} */
const nextConfig = {
  fontLoaders: [
    { loader: "@next/font/google", options: { subsets: ["latin"] } },
  ],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.discordapp.com",
        port: "",
        pathname: "/avatars/**",
      },
    ],
  },
};

module.exports = nextConfig;
