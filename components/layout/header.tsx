"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, TrendingUp, Home, Building2, Calculator, MapPin, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const investmentLoans = [
  { name: "DSCR Loans", href: "/investment/dscr-loans", description: "No tax returns required" },
  { name: "Fix & Flip", href: "/investment/fix-and-flip", description: "7-14 day closing" },
  { name: "Bridge Loans", href: "/investment/bridge-loans", description: "Short-term financing" },
  { name: "Portfolio Loans", href: "/investment/portfolio-loans", description: "5-100+ properties" },
  { name: "Hard Money", href: "/investment/hard-money", description: "Asset-based, 7-day close" },
];

const residentialLoans = [
  { name: "Conventional", href: "/residential/conventional", description: "From 3% down" },
  { name: "FHA Loans", href: "/residential/fha", description: "580 credit score" },
  { name: "VA Loans", href: "/residential/va", description: "$0 down for veterans" },
  { name: "Jumbo Loans", href: "/residential/jumbo", description: "Above $766K" },
];

const commercialLoans = [
  { name: "SBA 7(a)", href: "/commercial/sba-7a-loans", description: "Up to $5M" },
  { name: "SBA 504", href: "/commercial/sba-504-loans", description: "Fixed rates, 10% down" },
  { name: "Conventional CRE", href: "/commercial/conventional-cre", description: "All property types" },
  { name: "Construction", href: "/commercial/construction-loans", description: "Ground-up financing" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="w-9 h-9 bg-gradient-to-br from-teal-600 to-teal-800 rounded-lg flex items-center justify-center text-white font-bold text-lg">
              W
            </span>
            <span className="text-xl font-extrabold text-gray-900">
              Lendy<span className="text-teal-600">Wendy</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {/* Investment Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown("investment")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                href="/investment"
                className="flex items-center gap-1.5 text-gray-600 hover:text-teal-600 font-medium text-sm transition-colors px-3 py-2 rounded-lg hover:bg-gray-100/50"
              >
                <TrendingUp className="h-4 w-4" />
                Investment
                <ChevronDown className="h-3 w-3" />
              </Link>
              {activeDropdown === "investment" && (
                <div className="absolute top-full left-0 pt-2 w-64">
                  <div className="bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden">
                    {investmentLoans.map((loan) => (
                      <Link
                        key={loan.href}
                        href={loan.href}
                        className="block px-4 py-3 hover:bg-gray-100 transition-colors"
                      >
                        <span className="text-gray-900 font-medium text-sm">{loan.name}</span>
                        <span className="text-gray-500 text-xs block">{loan.description}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Residential Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown("residential")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                href="/residential"
                className="flex items-center gap-1.5 text-gray-600 hover:text-teal-600 font-medium text-sm transition-colors px-3 py-2 rounded-lg hover:bg-gray-100/50"
              >
                <Home className="h-4 w-4" />
                Residential
                <ChevronDown className="h-3 w-3" />
              </Link>
              {activeDropdown === "residential" && (
                <div className="absolute top-full left-0 pt-2 w-64">
                  <div className="bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden">
                    {residentialLoans.map((loan) => (
                      <Link
                        key={loan.href}
                        href={loan.href}
                        className="block px-4 py-3 hover:bg-gray-100 transition-colors"
                      >
                        <span className="text-gray-900 font-medium text-sm">{loan.name}</span>
                        <span className="text-gray-500 text-xs block">{loan.description}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Commercial Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown("commercial")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                href="/commercial"
                className="flex items-center gap-1.5 text-gray-600 hover:text-teal-600 font-medium text-sm transition-colors px-3 py-2 rounded-lg hover:bg-gray-100/50"
              >
                <Building2 className="h-4 w-4" />
                Commercial
                <ChevronDown className="h-3 w-3" />
              </Link>
              {activeDropdown === "commercial" && (
                <div className="absolute top-full left-0 pt-2 w-64">
                  <div className="bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden">
                    {commercialLoans.map((loan) => (
                      <Link
                        key={loan.href}
                        href={loan.href}
                        className="block px-4 py-3 hover:bg-gray-100 transition-colors"
                      >
                        <span className="text-gray-900 font-medium text-sm">{loan.name}</span>
                        <span className="text-gray-500 text-xs block">{loan.description}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/california"
              className="flex items-center gap-1.5 text-gray-600 hover:text-teal-600 font-medium text-sm transition-colors px-3 py-2 rounded-lg hover:bg-gray-100/50"
            >
              <MapPin className="h-4 w-4" />
              Markets
            </Link>
            <Link
              href="/calculators"
              className="flex items-center gap-1.5 text-gray-600 hover:text-teal-600 font-medium text-sm transition-colors px-3 py-2 rounded-lg hover:bg-gray-100/50"
            >
              <Calculator className="h-4 w-4" />
              Calculators
            </Link>
            <Button
              asChild
              className="bg-teal-600 hover:bg-teal-700 text-white font-bold px-5 ml-2"
            >
              <Link href="/get-quote">Get Rates</Link>
            </Button>
          </nav>

          {/* Tablet Navigation (simplified) */}
          <nav className="hidden md:flex lg:hidden items-center gap-4">
            <Link
              href="/investment"
              className="flex items-center gap-1.5 text-gray-600 hover:text-teal-600 font-medium text-sm transition-colors"
            >
              <TrendingUp className="h-4 w-4" />
              Investment
            </Link>
            <Link
              href="/residential"
              className="flex items-center gap-1.5 text-gray-600 hover:text-teal-600 font-medium text-sm transition-colors"
            >
              <Home className="h-4 w-4" />
              Residential
            </Link>
            <Link
              href="/commercial"
              className="flex items-center gap-1.5 text-gray-600 hover:text-teal-600 font-medium text-sm transition-colors"
            >
              <Building2 className="h-4 w-4" />
              Commercial
            </Link>
            <Button
              asChild
              className="bg-teal-600 hover:bg-teal-700 text-white font-bold px-5"
            >
              <Link href="/get-quote">Get Rates</Link>
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
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col gap-1">
              {/* Investment Section */}
              <div className="px-2 py-2">
                <Link
                  href="/investment"
                  className="flex items-center gap-2 text-teal-600 font-semibold py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <TrendingUp className="h-5 w-5" />
                  Investment Loans
                </Link>
                <div className="pl-7 space-y-1">
                  {investmentLoans.map((loan) => (
                    <Link
                      key={loan.href}
                      href={loan.href}
                      className="block text-gray-500 hover:text-gray-900 text-sm py-1.5"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {loan.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Residential Section */}
              <div className="px-2 py-2">
                <Link
                  href="/residential"
                  className="flex items-center gap-2 text-teal-600 font-semibold py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Home className="h-5 w-5" />
                  Residential Loans
                </Link>
                <div className="pl-7 space-y-1">
                  {residentialLoans.map((loan) => (
                    <Link
                      key={loan.href}
                      href={loan.href}
                      className="block text-gray-500 hover:text-gray-900 text-sm py-1.5"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {loan.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Commercial Section */}
              <div className="px-2 py-2">
                <Link
                  href="/commercial"
                  className="flex items-center gap-2 text-teal-600 font-semibold py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Building2 className="h-5 w-5" />
                  Commercial Loans
                </Link>
                <div className="pl-7 space-y-1">
                  {commercialLoans.map((loan) => (
                    <Link
                      key={loan.href}
                      href={loan.href}
                      className="block text-gray-500 hover:text-gray-900 text-sm py-1.5"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {loan.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Other Links */}
              <Link
                href="/california"
                className="flex items-center gap-2 text-gray-600 hover:text-teal-600 font-medium py-3 px-2 rounded-lg hover:bg-gray-100 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <MapPin className="h-5 w-5 text-teal-600" />
                California Markets
              </Link>
              <Link
                href="/calculators"
                className="flex items-center gap-2 text-gray-600 hover:text-teal-600 font-medium py-3 px-2 rounded-lg hover:bg-gray-100 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Calculator className="h-5 w-5 text-teal-600" />
                Calculators
              </Link>
              <Button
                asChild
                className="bg-teal-600 hover:bg-teal-700 text-white font-bold w-full mt-3"
              >
                <Link href="/get-quote" onClick={() => setMobileMenuOpen(false)}>
                  Get Investor Rates
                </Link>
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
