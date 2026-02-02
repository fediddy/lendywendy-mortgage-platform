"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="w-9 h-9 bg-gradient-to-br from-navy-800 to-navy-900 rounded-lg flex items-center justify-center text-gold-500 font-bold text-lg">
              W
            </span>
            <span className="text-xl font-extrabold text-navy-900">
              LendyWendy
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/residential"
              className="text-gray-600 hover:text-navy-900 font-medium text-sm transition-colors"
            >
              Residential
            </Link>
            <Link
              href="/investment"
              className="text-gray-600 hover:text-navy-900 font-medium text-sm transition-colors"
            >
              Investment
            </Link>
            <Link
              href="/commercial"
              className="text-gray-600 hover:text-navy-900 font-medium text-sm transition-colors"
            >
              Commercial
            </Link>
            <Link
              href="/calculators"
              className="text-gray-600 hover:text-navy-900 font-medium text-sm transition-colors"
            >
              Calculators
            </Link>
            <Button
              asChild
              className="bg-navy-900 hover:bg-navy-800 text-white font-semibold px-5"
            >
              <Link href="/get-quote">Get My Rate</Link>
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <nav className="flex flex-col gap-4">
              <Link
                href="/residential"
                className="text-gray-600 hover:text-navy-900 font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Residential
              </Link>
              <Link
                href="/investment"
                className="text-gray-600 hover:text-navy-900 font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Investment
              </Link>
              <Link
                href="/commercial"
                className="text-gray-600 hover:text-navy-900 font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Commercial
              </Link>
              <Link
                href="/calculators"
                className="text-gray-600 hover:text-navy-900 font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Calculators
              </Link>
              <Button
                asChild
                className="bg-navy-900 hover:bg-navy-800 text-white font-semibold w-full mt-2"
              >
                <Link href="/get-quote">Get My Rate</Link>
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
