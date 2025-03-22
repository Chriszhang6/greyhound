"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 关闭菜单的函数
  const closeMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-semibold tracking-tight hover:opacity-90 transition-opacity"
          >
            <span className={isScrolled ? "text-gray-900" : "text-white"}>
              Greyhound Sanctuary
            </span>
          </Link>

          {/* Desktop Navigation - 只在>1024px屏幕上显示 */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link
              href="/"
              className={cn(
                "text-sm font-medium hover:opacity-80 transition-opacity",
                isScrolled ? "text-gray-700 hover:text-gray-900" : "text-white"
              )}
            >
              Home
            </Link>
            <Link
              href="/about"
              className={cn(
                "text-sm font-medium hover:opacity-80 transition-opacity",
                isScrolled ? "text-gray-700 hover:text-gray-900" : "text-white"
              )}
            >
              About
            </Link>
            <Link
              href="/foster-adopt"
              className={cn(
                "text-sm font-medium hover:opacity-80 transition-opacity",
                isScrolled ? "text-gray-700 hover:text-gray-900" : "text-white"
              )}
            >
              Foster & Adopt
            </Link>
          </nav>

          {/* Mobile Menu Button - 显示在<=1024px屏幕上 */}
          <button
            className="lg:hidden p-2 rounded-md"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <div
              className={cn(
                "w-6 h-0.5 mb-1.5 transition-all duration-300",
                isScrolled ? "bg-gray-900" : "bg-white",
                isMobileMenuOpen && "transform rotate-45 translate-y-2"
              )}
            />
            <div
              className={cn(
                "w-6 h-0.5 transition-all duration-300",
                isScrolled ? "bg-gray-900" : "bg-white",
                isMobileMenuOpen && "opacity-0"
              )}
            />
            <div
              className={cn(
                "w-6 h-0.5 mt-1.5 transition-all duration-300",
                isScrolled ? "bg-gray-900" : "bg-white",
                isMobileMenuOpen && "transform -rotate-45 -translate-y-2"
              )}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu - 显示在<=1024px屏幕上 */}
      <div
        className={cn(
          "lg:hidden absolute left-0 right-0 top-16 bg-white shadow-lg transition-all duration-300 overflow-hidden",
          isMobileMenuOpen ? "max-h-48" : "max-h-0"
        )}
      >
        <div className="px-4 py-3">
          <Link
            href="/"
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
    </header>
  );
} 