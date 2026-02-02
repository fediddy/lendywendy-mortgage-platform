import Link from "next/link";
import { Star } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-navy-900 text-gray-400 py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="w-9 h-9 bg-gradient-to-br from-navy-700 to-navy-800 rounded-lg flex items-center justify-center text-gold-500 font-bold text-lg border border-navy-600">
                W
              </span>
              <span className="text-xl font-extrabold text-white">
                LendyWendy
              </span>
            </Link>
            <p className="text-sm leading-relaxed mb-4 max-w-xs">
              California&apos;s trusted mortgage matching platform. We connect
              homebuyers with vetted local lenders for the best rates.
            </p>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4 fill-gold-500 text-gold-500"
                />
              ))}
              <span className="text-xs ml-2 text-gray-500">
                4.9/5 Customer Rating
              </span>
            </div>
          </div>

          {/* Loan Programs */}
          <div>
            <h4 className="text-white font-semibold mb-4">Loan Programs</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/residential"
                  className="hover:text-white transition-colors"
                >
                  Residential Mortgages
                </Link>
              </li>
              <li>
                <Link
                  href="/investment"
                  className="hover:text-white transition-colors"
                >
                  Investment Property
                </Link>
              </li>
              <li>
                <Link
                  href="/commercial"
                  className="hover:text-white transition-colors"
                >
                  Commercial Loans
                </Link>
              </li>
              <li>
                <Link
                  href="/non-qm"
                  className="hover:text-white transition-colors"
                >
                  Non-QM Solutions
                </Link>
              </li>
              <li>
                <Link
                  href="/refinance"
                  className="hover:text-white transition-colors"
                >
                  Refinancing
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/readiness-score"
                  className="hover:text-white transition-colors"
                >
                  Mortgage Readiness Score
                </Link>
              </li>
              <li>
                <Link
                  href="/calculators"
                  className="hover:text-white transition-colors"
                >
                  Calculators
                </Link>
              </li>
              <li>
                <Link
                  href="/how-it-works"
                  className="hover:text-white transition-colors"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="hover:text-white transition-colors"
                >
                  FAQ
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
                  className="hover:text-white transition-colors"
                >
                  Los Angeles
                </Link>
              </li>
              <li>
                <Link
                  href="/california/san-francisco"
                  className="hover:text-white transition-colors"
                >
                  San Francisco
                </Link>
              </li>
              <li>
                <Link
                  href="/california/san-diego"
                  className="hover:text-white transition-colors"
                >
                  San Diego
                </Link>
              </li>
              <li>
                <Link
                  href="/california/sacramento"
                  className="hover:text-white transition-colors"
                >
                  Sacramento
                </Link>
              </li>
              <li>
                <Link
                  href="/california/orange-county"
                  className="hover:text-white transition-colors"
                >
                  Orange County
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-navy-700 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p>
            &copy; {new Date().getFullYear()} LendyWendy. All rights reserved.
            NMLS #1945913
          </p>
          <div className="flex flex-wrap gap-6 justify-center">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/licensing" className="hover:text-white transition-colors">
              Licensing
            </Link>
            <span className="text-gray-500">Equal Housing Opportunity</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
