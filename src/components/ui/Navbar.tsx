"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-light">
            Greyhound Sanctuary
          </Link>
          <div className="flex space-x-8">
            <Link
              href="/home"
              className={`text-lg font-light transition-colors ${
                isActive("/home") ? "text-gray-900" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Home
            </Link>
            <Link
              href="/about"
              className={`text-lg font-light transition-colors ${
                isActive("/about") ? "text-gray-900" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              About
            </Link>
            <Link
              href="/foster-adopt"
              className={`text-lg font-light transition-colors ${
                isActive("/foster-adopt") ? "text-gray-900" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Foster & Adopt
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
} 