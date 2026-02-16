import type { NextConfig } from "next";

const nextConfig = {
  /* config options here */
  output: 'export', // 启用静态导出用于 GitHub Pages

  // GitHub Pages 需要禁用图片优化（静态导出不支持 Next.js 图片优化）
  images: {
    unoptimized: true,
  },

  // 如果仓库名不是 username.github.io，需要设置 basePath
  // basePath: '/your-repo-name',

  // 确保路由正常工作
  trailingSlash: true,

  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
};

export default nextConfig;
