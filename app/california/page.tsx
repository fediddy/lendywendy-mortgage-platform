import { Metadata } from "next";
import Link from "next/link";
import {
  MapPin,
  ArrowRight,
  Home,
  TrendingUp,
  Building2,
  CheckCircle,
  Shield,
  Zap,
  DollarSign,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { TrustSignals, CtaSection } from "@/components/shared";
import { StructuredData } from "@/components/seo/StructuredData";
import { getMajorCities, getSecondaryCities } from "@/lib/california-cities";

export const metadata: Metadata = {
  title: "California Mortgage Lenders | Home Loans by City | LendyWendy",
  description:
    "Find mortgage lenders in your California city. Los Angeles, San Francisco, San Diego, Sacramento, and more. Compare rates from local lenders. NMLS #1945913.",
  keywords: [
    "California mortgage",
    "California home loans",
    "mortgage lenders California",
    "California mortgage rates",
    "Los Angeles mortgage",
    "San Francisco mortgage",
    "San Diego mortgage",
    "Sacramento mortgage",
  ],
  openGraph: {
    title: "California Mortgage Lenders by City | LendyWendy",
    description:
      "Find mortgage lenders in your California city. Compare rates from local lenders statewide.",
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
        pageTitle="California Mortgage Lenders | LendyWendy"
        pageDescription="Find mortgage lenders in your California city. Compare rates from local lenders statewide."
        pageUrl="/california"
      />

      <main className="min-h-screen">
        {/* Hero */}
        <section className="bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-gold-500/20 border border-gold-500/30 text-gold-400 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
                <MapPin className="h-4 w-4" />
                Serving All California Markets
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
                California Mortgage Lenders
                <br />
                <span className="text-gold-400">By City</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Find local mortgage lenders in your California city. From Los
                Angeles to San Francisco, we connect you with top-rated lenders
                who know your market.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-gold-500 hover:bg-gold-600 text-navy-900 font-bold"
                  asChild
                >
                  <Link href="/get-quote">
                    Get Matched Now <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10"
                  asChild
                >
                  <Link href="/readiness-score">Check My Readiness</Link>
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap justify-center gap-6 mt-10 pt-8 border-t border-white/10">
                <span className="flex items-center gap-2 text-sm text-gray-400">
                  <Shield className="h-4 w-4 text-green-400" />
                  NMLS #1945913
                </span>
                <span className="flex items-center gap-2 text-sm text-gray-400">
                  <Zap className="h-4 w-4 text-gold-400" />
                  AI-Powered Matching
                </span>
                <span className="flex items-center gap-2 text-sm text-gray-400">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  500+ Lenders Statewide
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Major Markets */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-navy-900 text-center mb-4">
                Major California Markets
              </h2>
              <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
                Explore mortgage options in California&apos;s largest metropolitan
                areas
              </p>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {majorCities.map((city) => (
                  <Link
                    key={city.slug}
                    href={`/california/${city.slug}`}
                    className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold-300 hover:shadow-xl transition-all group"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-navy-900 group-hover:text-gold-600 transition-colors">
                          {city.name}
                        </h3>
                        <p className="text-sm text-gray-500">{city.county}</p>
                      </div>
                      <MapPin className="h-6 w-6 text-gold-500" />
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-gray-500">Median Price</p>
                        <p className="font-bold text-navy-900">
                          {city.medianHomePrice}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">YoY Change</p>
                        <p className="font-bold text-green-600">
                          {city.yearOverYearChange}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {city.loanTypes.slice(0, 4).map((loan, i) => (
                        <span
                          key={i}
                          className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs"
                        >
                          {loan}
                        </span>
                      ))}
                    </div>

                    <span className="text-gold-600 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
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
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-navy-900 text-center mb-4">
                More California Cities
              </h2>
              <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
                Find mortgage lenders in cities across the Golden State
              </p>

              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {secondaryCities.map((city) => (
                  <Link
                    key={city.slug}
                    href={`/california/${city.slug}`}
                    className="flex items-center gap-3 bg-gray-50 hover:bg-gold-50 rounded-xl p-4 border border-gray-100 hover:border-gold-300 transition-all group"
                  >
                    <MapPin className="h-5 w-5 text-gold-500 flex-shrink-0" />
                    <div className="min-w-0">
                      <h3 className="font-semibold text-navy-900 group-hover:text-gold-600 transition-colors truncate">
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
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold text-navy-900 text-center mb-4">
                Mortgage Options Across California
              </h2>
              <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
                Whatever your financing needs, LendyWendy connects you with
                California lenders who can help
              </p>

              <div className="grid md:grid-cols-3 gap-6">
                <Link
                  href="/residential"
                  className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold-300 hover:shadow-lg transition-all text-center"
                >
                  <Home className="h-12 w-12 text-gold-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-navy-900 mb-2">
                    Residential
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Conventional, FHA, VA, USDA, and Jumbo loans for California
                    homebuyers
                  </p>
                  <span className="text-gold-600 font-medium">
                    Explore Options →
                  </span>
                </Link>

                <Link
                  href="/investment"
                  className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold-300 hover:shadow-lg transition-all text-center"
                >
                  <TrendingUp className="h-12 w-12 text-gold-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-navy-900 mb-2">
                    Investment
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    DSCR, fix-and-flip, portfolio, and bridge loans for
                    California investors
                  </p>
                  <span className="text-gold-600 font-medium">
                    Explore Options →
                  </span>
                </Link>

                <Link
                  href="/commercial"
                  className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-gold-300 hover:shadow-lg transition-all text-center"
                >
                  <Building2 className="h-12 w-12 text-gold-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-navy-900 mb-2">
                    Commercial
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    SBA, multi-family, construction, and CRE loans across
                    California
                  </p>
                  <span className="text-gold-600 font-medium">
                    Explore Options →
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Signals */}
        <TrustSignals variant="light" showStats={true} showCredentials={true} />

        {/* CTA */}
        <CtaSection
          variant="primary"
          title="Ready to find your California lender?"
          description="Get matched with top-rated mortgage lenders in your city. It takes 60 seconds."
        />
      </main>
    </>
  );
}
