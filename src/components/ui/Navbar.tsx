"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 检查是否为活动路径
  const isActive = (path: string) => {
    return pathname === path;
  };

  // 关闭菜单的函数
  const closeMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-light">
            Greyhound Sanctuary
          </Link>
          
          {/* 桌面导航 - 只在大屏幕显示 */}
          <div className="hidden lg:flex space-x-8">
            <Link
              href="/home"
              className={`text-lg font-light transition-colors ${
                isActive("/home") ? "text-gray-900" : "text-gray-700 hover:text-gray-900"
              }`}
            >
              Home
            </Link>
            <Link
              href="/about"
              className={`text-lg font-light transition-colors ${
                isActive("/about") ? "text-gray-900" : "text-gray-700 hover:text-gray-900"
              }`}
            >
              About
            </Link>
            <Link
              href="/foster-adopt"
              className={`text-lg font-light transition-colors ${
                isActive("/foster-adopt") ? "text-gray-900" : "text-gray-700 hover:text-gray-900"
              }`}
            >
              Foster & Adopt
            </Link>
          </div>
          
          {/* 汉堡菜单按钮 - 只在移动设备显示 */}
          <button
            className="lg:hidden p-2 rounded-md"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <div className={`w-6 h-0.5 bg-gray-900 mb-1.5 transition-all duration-300 ${
              isMobileMenuOpen ? "transform rotate-45 translate-y-2" : ""
            }`} />
            <div className={`w-6 h-0.5 bg-gray-900 transition-all duration-300 ${
              isMobileMenuOpen ? "opacity-0" : ""
            }`} />
            <div className={`w-6 h-0.5 bg-gray-900 mt-1.5 transition-all duration-300 ${
              isMobileMenuOpen ? "transform -rotate-45 -translate-y-2" : ""
            }`} />
          </button>
        </div>
      </div>
      
      {/* 移动导航菜单 */}
      <div className={`lg:hidden absolute left-0 right-0 bg-white shadow-lg transition-all duration-300 overflow-hidden ${
        isMobileMenuOpen ? "max-h-48" : "max-h-0"
      }`}>
        <div className="px-4 py-3">
          <Link
            href="/home"
            className="block py-2 text-gray-900 font-medium border-b border-gray-100"
            onClick={closeMenu}
          >
            Home
          </Link>
          <Link
            href="/about"
            className="block py-2 text-gray-900 font-medium border-b border-gray-100"
            onClick={closeMenu}
          >
            About
          </Link>
          <Link
            href="/foster-adopt"
            className="block py-2 text-gray-900 font-medium"
            onClick={closeMenu}
          >
            Foster & Adopt
          </Link>
        </div>
      </div>
    </nav>
  );
} 