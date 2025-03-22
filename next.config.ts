import type { NextConfig } from "next";

// @ts-ignore - 使用扩展配置
const nextConfig = {
  /* config options here */
  devIndicators: {
    buildActivity: false,
  },
  // 禁用React DevTools
  swcMinify: true,
};

export default nextConfig;
