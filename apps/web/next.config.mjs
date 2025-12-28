/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@workspace/ui", "@workspace/database", "@workspace/storage", "@workspace/queue"],
};

export default nextConfig;
