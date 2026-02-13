import Link from "next/link";
import { Star, Shield, BadgeCheck, Home } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-gray-400 py-16 border-t border-slate-800">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="w-9 h-9 bg-gradient-to-br from-teal-500 to-teal-700 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                W
              </span>
              <span className="text-xl font-extrabold text-white">
                Lendy<span className="text-teal-400">Wendy</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed mb-4 max-w-xs">
              California&apos;s trusted investment property lending platform. DSCR loans, fix-and-flip, and portfolio financing for real estate investors.
            </p>
            <div className="flex items-center gap-1">
              <span className="text-xs text-gray-500">
                Trusted lead generation platform
              </span>
            </div>
          </div>

          {/* Investment Loans */}
          <div>
            <h4 className="text-white font-semibold mb-4">Investment Loans</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/investment/dscr-loans"
                  className="hover:text-teal-400 transition-colors"
                >
                  DSCR Loans
                </Link>
              </li>
              <li>
                <Link
                  href="/investment/fix-and-flip"
                  className="hover:text-teal-400 transition-colors"
                >
                  Fix & Flip
                </Link>
              </li>
              <li>
                <Link
                  href="/investment/bridge-loans"
                  className="hover:text-teal-400 transition-colors"
                >
                  Bridge Loans
                </Link>
              </li>
              <li>
                <Link
                  href="/investment/portfolio-loans"
                  className="hover:text-teal-400 transition-colors"
                >
                  Portfolio Loans
                </Link>
              </li>
              <li>
                <Link
                  href="/investment/hard-money"
                  className="hover:text-teal-400 transition-colors"
                >
                  Hard Money
                </Link>
              </li>
            </ul>
          </div>

          {/* Residential & Commercial */}
          <div>
            <h4 className="text-white font-semibold mb-4">More Loans</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/residential/conventional"
                  className="hover:text-teal-400 transition-colors"
                >
                  Conventional
                </Link>
              </li>
              <li>
                <Link
                  href="/residential/fha"
                  className="hover:text-teal-400 transition-colors"
                >
                  FHA Loans
                </Link>
              </li>
              <li>
                <Link
                  href="/residential/va"
                  className="hover:text-teal-400 transition-colors"
                >
                  VA Loans
                </Link>
              </li>
              <li>
                <Link
                  href="/commercial/sba-7a-loans"
                  className="hover:text-teal-400 transition-colors"
                >
                  SBA 7(a)
                </Link>
              </li>
              <li>
                <Link
                  href="/commercial/construction-loans"
                  className="hover:text-teal-400 transition-colors"
                >
                  Construction
                </Link>
              </li>
            </ul>
          </div>

          {/* California Markets */}
          <div>
            <h4 className="text-white font-semibold mb-4">California Markets</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/california/los-angeles"
                  className="hover:text-teal-400 transition-colors"
                >
                  Los Angeles
                </Link>
              </li>
              <li>
                <Link
                  href="/california/san-francisco"
                  className="hover:text-teal-400 transition-colors"
                >
                  San Francisco
                </Link>
              </li>
              <li>
                <Link
                  href="/california/san-diego"
                  className="hover:text-teal-400 transition-colors"
                >
                  San Diego
                </Link>
              </li>
              <li>
                <Link
                  href="/california/sacramento"
                  className="hover:text-teal-400 transition-colors"
                >
                  Sacramento
                </Link>
              </li>
              <li>
                <Link
                  href="/california/oakland"
                  className="hover:text-teal-400 transition-colors"
                >
                  Oakland
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Trust badges */}
        <div className="border-t border-slate-800 pt-8 mb-8">
          <div className="flex flex-wrap justify-center gap-8 text-sm text-slate-500">
            <span className="flex items-center gap-2">
              <Home className="h-4 w-4 text-blue-400" />
              Equal Housing Opportunity
            </span>
          </div>
          <p className="text-center text-xs text-slate-600 mt-4">
            LendyWendy is not a lender. We connect borrowers with licensed mortgage professionals.
          </p>
        </div>

        {/* Bottom */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p>
            &copy; {new Date().getFullYear()} LendyWendy. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-6 justify-center">
            <Link href="/privacy" className="hover:text-teal-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-teal-400 transition-colors">
              Terms of Service
            </Link>
            <Link href="/licensing" className="hover:text-teal-400 transition-colors">
              Licensing
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
