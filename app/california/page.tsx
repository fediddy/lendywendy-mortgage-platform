import { Metadata } from "next";
import Link from "next/link";
import {
  MapPin,
  ArrowRight,
  TrendingUp,
  Building2,
  CheckCircle,
  Shield,
  Clock,
  FileX,
  DollarSign,
  Home,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { StructuredData } from "@/components/seo/StructuredData";
import { getMajorCities, getSecondaryCities } from "@/lib/california-cities";

export const metadata: Metadata = {
  title: "California Investment Property Lenders | DSCR Loans by City | LendyWendy",
  description:
    "Find investment property lenders in your California city. DSCR loans, fix-and-flip, bridge financing. Los Angeles, San Francisco, San Diego, and more.",
  keywords: [
    "California DSCR loans",
    "California investment property",
    "mortgage lenders California",
    "Los Angeles DSCR loan",
    "San Francisco investment loan",
    "San Diego fix and flip",
    "California hard money lenders",
  ],
  openGraph: {
    title: "California Investment Property Lenders by City | LendyWendy",
    description:
      "Find DSCR and investment property lenders in your California city. Compare rates from local lenders statewide.",
    url: "https://lendywendy.com/california",
  },
};

export default function CaliforniaPage() {
  const majorCities = getMajorCities();
  const secondaryCities = getSecondaryCities();

  return (
    <>
      <StructuredData
        type="service"
        pageTitle="California Investment Property Lenders | LendyWendy"
        pageDescription="Find investment property lenders in your California city. Compare DSCR rates from local lenders statewide."
        pageUrl="/california"
      />

      <main className="min-h-screen bg-white">
        {/* Hero */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-teal-600/5 to-transparent" />
          <div className="container mx-auto px-4 relative">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-teal-600/10 border border-teal-600/30 text-teal-600 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
                <MapPin className="h-4 w-4" />
                Serving All California Markets
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 text-gray-900">
                California Investment
                <br />
                <span className="text-teal-600">Property Lenders</span>
              </h1>
              <p className="text-xl text-gray-500 mb-8 max-w-2xl mx-auto">
                Find DSCR and investment property lenders in your California city.
                From Los Angeles to San Francisco, we connect you with lenders who know your market.
              </p>

              {/* Key Benefits */}
              <div className="flex flex-wrap justify-center gap-4 mb-10">
                <div className="flex items-center gap-2 text-gray-600 bg-gray-50 px-4 py-2 rounded-full border border-gray-200">
                  <Clock className="h-4 w-4 text-teal-600" />
                  <span>Close in 14 days</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 bg-gray-50 px-4 py-2 rounded-full border border-gray-200">
                  <FileX className="h-4 w-4 text-emerald-600" />
                  <span>No tax returns</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 bg-gray-50 px-4 py-2 rounded-full border border-gray-200">
                  <DollarSign className="h-4 w-4 text-teal-600" />
                  <span>Rates from 6.25%</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-teal-600 hover:bg-teal-700 text-white font-bold"
                  asChild
                >
                  <Link href="/get-quote">
                    Compare Rates <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-gray-200 text-gray-900 hover:bg-gray-100"
                  asChild
                >
                  <Link href="/investment">View Loan Programs</Link>
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap justify-center gap-6 mt-10 pt-8 border-t border-gray-200">
                <span className="flex items-center gap-2 text-sm text-gray-500">
                  <Shield className="h-4 w-4 text-emerald-600" />
                  Equal Housing Opportunity
                </span>
                <span className="flex items-center gap-2 text-sm text-gray-500">
                  <TrendingUp className="h-4 w-4 text-teal-600" />
                  $847M+ Funded
                </span>
                <span className="flex items-center gap-2 text-sm text-gray-500">
                  <CheckCircle className="h-4 w-4 text-emerald-600" />
                  2,400+ Properties
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Major Markets */}
        <section className="py-20 border-t border-gray-200">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
                Major California Markets
              </h2>
              <p className="text-gray-500 text-center mb-10 max-w-2xl mx-auto">
                Find investment property lenders in California&apos;s top markets
              </p>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {majorCities.map((city) => (
                  <Link
                    key={city.slug}
                    href={`/california/${city.slug}`}
                    className="bg-gray-50 rounded-2xl p-6 border border-gray-200 hover:border-teal-600/50 transition-all group cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-teal-600 transition-colors">
                          {city.name}
                        </h3>
                        <p className="text-sm text-gray-500">{city.county}</p>
                      </div>
                      <MapPin className="h-6 w-6 text-teal-600" />
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-gray-500">Median Price</p>
                        <p className="font-bold text-gray-900">
                          {city.medianHomePrice}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">YoY Change</p>
                        <p className="font-bold text-emerald-600">
                          {city.yearOverYearChange}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {city.loanTypes.slice(0, 4).map((loan, i) => (
                        <span
                          key={i}
                          className="bg-gray-100 text-gray-500 px-2 py-0.5 rounded text-xs"
                        >
                          {loan}
                        </span>
                      ))}
                    </div>

                    <span className="text-teal-600 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                      View {city.name} Lenders{" "}
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Secondary Markets */}
        <section className="py-20 border-t border-gray-200">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
                More California Cities
              </h2>
              <p className="text-gray-500 text-center mb-10 max-w-2xl mx-auto">
                Find investment property lenders across the Golden State
              </p>

              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {secondaryCities.map((city) => (
                  <Link
                    key={city.slug}
                    href={`/california/${city.slug}`}
                    className="flex items-center gap-3 bg-gray-50 hover:bg-gray-100 rounded-xl p-4 border border-gray-200 hover:border-teal-600/50 transition-all group cursor-pointer"
                  >
                    <MapPin className="h-5 w-5 text-teal-600 flex-shrink-0" />
                    <div className="min-w-0">
                      <h3 className="font-semibold text-gray-900 group-hover:text-teal-600 transition-colors truncate">
                        {city.name}
                      </h3>
                      <p className="text-xs text-gray-500 truncate">
                        {city.medianHomePrice}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Loan Types Section */}
        <section className="py-20 border-t border-gray-200 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
                Financing for Every Strategy
              </h2>
              <p className="text-gray-500 text-center mb-10 max-w-2xl mx-auto">
                LendyWendy connects you with California lenders for all investment strategies
              </p>

              <div className="grid md:grid-cols-3 gap-6">
                <Link
                  href="/investment"
                  className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-teal-600/50 transition-all text-center cursor-pointer group"
                >
                  <TrendingUp className="h-12 w-12 text-teal-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors">
                    DSCR Loans
                  </h3>
                  <p className="text-gray-500 text-sm mb-4">
                    Qualify on rental income. No tax returns, no W-2s, no employment verification.
                  </p>
                  <span className="text-teal-600 font-medium">
                    Rates from 6.25% →
                  </span>
                </Link>

                <Link
                  href="/investment"
                  className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-teal-600/50 transition-all text-center cursor-pointer group"
                >
                  <Home className="h-12 w-12 text-teal-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors">
                    Fix & Flip
                  </h3>
                  <p className="text-gray-500 text-sm mb-4">
                    Fast funding for acquisitions and rehab. Close in as little as 7 days.
                  </p>
                  <span className="text-teal-600 font-medium">
                    Up to 90% LTV →
                  </span>
                </Link>

                <Link
                  href="/investment"
                  className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-teal-600/50 transition-all text-center cursor-pointer group"
                >
                  <Building2 className="h-12 w-12 text-teal-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors">
                    Portfolio Loans
                  </h3>
                  <p className="text-gray-500 text-sm mb-4">
                    Finance 5-100+ properties under one loan. Simplify your portfolio.
                  </p>
                  <span className="text-teal-600 font-medium">
                    Single application →
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 border-t border-gray-200">
          <div className="container mx-auto px-4 text-center">
            <Shield className="h-12 w-12 text-teal-600 mx-auto mb-6" />
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Ready to Find Your California Lender?
            </h2>
            <p className="text-xl text-gray-500 mb-8 max-w-2xl mx-auto">
              Get matched with investment property lenders in your city. It takes 60 seconds.
            </p>
            <Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-white font-bold text-lg px-10" asChild>
              <Link href="/get-quote">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <p className="text-sm text-gray-500 mt-4">
              Equal Housing Opportunity | No credit impact to get matched
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
