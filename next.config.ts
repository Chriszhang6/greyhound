import type { NextConfig } from "next";

// @ts-ignore - 使用扩展配置
const nextConfig = {
  /* config options here */
  devIndicators: {
    buildActivity: false,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  // 禁用React DevTools
  swcMinify: true,
};

export default nextConfig;
