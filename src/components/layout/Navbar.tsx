"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

          {/* Navigation */}
          <nav className="hidden sm:flex items-center gap-8">
            <Link
              href="/"
              className={cn(
                "text-sm font-medium hover:opacity-80 transition-opacity",
                isScrolled ? "text-gray-600 hover:text-gray-900" : "text-white"
              )}
            >
              Home
            </Link>
            <Link
              href="/about"
              className={cn(
                "text-sm font-medium hover:opacity-80 transition-opacity",
                isScrolled ? "text-gray-600 hover:text-gray-900" : "text-white"
              )}
            >
              About
            </Link>
            <Link
              href="/foster-adopt"
              className={cn(
                "text-sm font-medium hover:opacity-80 transition-opacity",
                isScrolled ? "text-gray-600 hover:text-gray-900" : "text-white"
              )}
            >
              Foster & Adopt
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="sm:hidden p-2 rounded-md"
            onClick={() => {/* 移动端菜单将在后续实现 */}}
          >
            <div
              className={cn(
                "w-6 h-0.5 mb-1.5 transition-colors duration-300",
                isScrolled ? "bg-gray-900" : "bg-white"
              )}
            />
            <div
              className={cn(
                "w-6 h-0.5 transition-colors duration-300",
                isScrolled ? "bg-gray-900" : "bg-white"
              )}
            />
          </button>
        </div>
      </div>
    </header>
  );
} 