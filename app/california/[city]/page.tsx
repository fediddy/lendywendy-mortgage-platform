import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Home,
  TrendingUp,
  Building2,
  CheckCircle,
  MapPin,
  ArrowRight,
  DollarSign,
  ChevronDown,
  Clock,
  FileX,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { StructuredData } from "@/components/seo/StructuredData";
import {
  getCityBySlug,
  getAllCitySlugs,
  getMajorCities,
} from "@/lib/california-cities";

// Generate static params for all cities
export async function generateStaticParams() {
  const slugs = getAllCitySlugs();
  return slugs.map((city) => ({ city }));
}

// Generate metadata for each city
export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);

  if (!city) {
    return {
      title: "City Not Found | LendyWendy",
    };
  }

  return {
    title: `${city.name} Investment Property Lenders | DSCR Loans | LendyWendy`,
    description: `Find investment property lenders in ${city.name}. DSCR loans, fix-and-flip, bridge financing. Median home price: ${city.medianHomePrice}. Close in 14 days. NMLS #1945913.`,
    keywords: [
      `${city.name} DSCR loan`,
      `${city.name} investment property`,
      `mortgage lenders ${city.name}`,
      `${city.name} fix and flip loan`,
      `${city.name} rental property financing`,
      `${city.name} hard money lender`,
    ],
    openGraph: {
      title: `${city.name} Investment Property Lenders | LendyWendy`,
      description: `Find DSCR and investment property lenders in ${city.name}. Close in 14 days. No tax returns required.`,
      url: `https://lendywendy.com/california/${city.slug}`,
      type: "website",
    },
  };
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);

  if (!city) {
    notFound();
  }

  // Generate FAQ items specific to this city - investor focused
  const faqItems = [
    {
      question: `What DSCR ratio do I need for investment property in ${city.name}?`,
      answer: `Most ${city.name} DSCR lenders require a minimum ratio of 1.0, meaning the property's rental income covers 100% of the mortgage payment. Some lenders offer programs for 0.75 DSCR with higher rates. With ${city.name}'s median home price of ${city.medianHomePrice}, typical monthly rents need to be $${Math.round(parseInt(city.medianHomePrice.replace(/[$,]/g, '')) * 0.007).toLocaleString()}+ to qualify.`,
    },
    {
      question: `How fast can I close on an investment property in ${city.name}?`,
      answer: `DSCR loans in ${city.name} typically close in 14-21 days. Fix-and-flip loans can close in as fast as 7-10 days with the right lender. LendyWendy matches you with ${city.name} lenders who specialize in quick closings for time-sensitive deals.`,
    },
    {
      question: `What down payment is required for investment property in ${city.name}?`,
      answer: `Investment property loans in ${city.name} typically require: DSCR loans 20-25% down, fix-and-flip loans 10-20% down (80-90% LTV), bridge loans 25% down, and portfolio loans vary. With ${city.name}'s ${city.medianHomePrice} median price, expect $${Math.round(parseInt(city.medianHomePrice.replace(/[$,]/g, '')) * 0.20).toLocaleString()} - $${Math.round(parseInt(city.medianHomePrice.replace(/[$,]/g, '')) * 0.25).toLocaleString()} minimum.`,
    },
    {
      question: `Are there no-tax-return investment loans available in ${city.name}?`,
      answer: `Yes! DSCR loans in ${city.name} qualify you based on the property's rental income, not your personal income. No tax returns, W-2s, or employment verification required. This is ideal for self-employed investors and those with complex tax situations.`,
    },
  ];

  const majorCities = getMajorCities().filter((c) => c.slug !== city.slug);

  return (
    <>
      {/* Structured Data for Local SEO */}
      <StructuredData
        type="location"
        pageTitle={`${city.name} Investment Property Lenders | LendyWendy`}
        pageDescription={`Find DSCR and investment property lenders in ${city.name}. Close in 14 days. No tax returns required.`}
        pageUrl={`/california/${city.slug}`}
        breadcrumbs={[
          { name: "California", url: "/california" },
          { name: city.name, url: `/california/${city.slug}` },
        ]}
        faqItems={faqItems}
        locationName={city.name}
      />

      <main className="min-h-screen bg-slate-950">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 to-transparent" />
          <div className="container mx-auto px-4 relative">
            <div className="max-w-4xl mx-auto text-center">
              {/* Breadcrumb */}
              <nav className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-6">
                <Link href="/california" className="hover:text-amber-500 transition-colors">
                  California
                </Link>
                <span>/</span>
                <span className="text-amber-500">{city.name}</span>
              </nav>

              <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-500 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
                <MapPin className="h-4 w-4" />
                {city.county}
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 text-white">
                {city.name} Investment
                <br />
                <span className="text-amber-500">Property Lenders</span>
              </h1>

              <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                Find DSCR loans, fix-and-flip financing, and portfolio lenders in {city.name}.
                No tax returns required. Close in as few as 7 days.
              </p>

              {/* Market Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 max-w-3xl mx-auto">
                <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-800">
                  <p className="text-xs text-gray-500 mb-1">Median Price</p>
                  <p className="text-xl font-bold text-white">{city.medianHomePrice}</p>
                </div>
                <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-800">
                  <p className="text-xs text-gray-500 mb-1">YoY Change</p>
                  <p className="text-xl font-bold text-emerald-500">{city.yearOverYearChange}</p>
                </div>
                <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-800">
                  <p className="text-xs text-gray-500 mb-1">Days on Market</p>
                  <p className="text-xl font-bold text-white">{city.avgDaysOnMarket}</p>
                </div>
                <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-800">
                  <p className="text-xs text-gray-500 mb-1">Median Income</p>
                  <p className="text-xl font-bold text-white">{city.medianHouseholdIncome}</p>
                </div>
              </div>

              {/* Key Benefits */}
              <div className="flex flex-wrap justify-center gap-4 mb-10">
                <div className="flex items-center gap-2 text-gray-300 bg-slate-900/50 px-4 py-2 rounded-full border border-slate-800">
                  <Clock className="h-4 w-4 text-amber-500" />
                  <span>Close in 14 days</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300 bg-slate-900/50 px-4 py-2 rounded-full border border-slate-800">
                  <FileX className="h-4 w-4 text-emerald-500" />
                  <span>No tax returns</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300 bg-slate-900/50 px-4 py-2 rounded-full border border-slate-800">
                  <DollarSign className="h-4 w-4 text-amber-500" />
                  <span>Rates from 6.25%</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold"
                  asChild
                >
                  <Link href="/get-quote">
                    Get {city.name} Rates <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-slate-700 text-white hover:bg-slate-800"
                  asChild
                >
                  <Link href="/investment">View Loan Programs</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-20 border-t border-slate-800">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-white">
                {city.name} Investment Property Market
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <p className="text-gray-400 mb-6">{city.description}</p>
                  <h3 className="font-semibold text-white mb-3">Market Highlights</h3>
                  <ul className="space-y-2">
                    {city.highlights.map((highlight, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-400">
                        <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-3">Popular Investment Areas</h3>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {city.neighborhoods.map((neighborhood, i) => (
                      <span
                        key={i}
                        className="bg-slate-800 text-gray-300 px-3 py-1.5 rounded-full text-sm"
                      >
                        {neighborhood}
                      </span>
                    ))}
                  </div>
                  <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
                    <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-amber-500" />
                      Investor Opportunity
                    </h4>
                    <p className="text-gray-400 text-sm">
                      With {city.yearOverYearChange} YoY appreciation and {city.avgDaysOnMarket} average days on market,
                      {city.name} offers strong potential for DSCR and fix-and-flip investors.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Loan Types Section */}
        <section className="py-20 border-t border-slate-800 bg-slate-900/50">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-white text-center">
                Investment Loan Options in {city.name}
              </h2>
              <p className="text-gray-400 text-center mb-10 max-w-2xl mx-auto">
                LendyWendy matches {city.name} investors with lenders offering these programs
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <Link
                  href="/investment"
                  className="bg-slate-900 rounded-xl p-6 border border-slate-800 hover:border-amber-500/50 transition-all cursor-pointer group"
                >
                  <TrendingUp className="h-8 w-8 text-amber-500 mb-4" />
                  <h3 className="font-semibold text-white mb-2 group-hover:text-amber-500 transition-colors">DSCR Loans</h3>
                  <p className="text-sm text-gray-400 mb-3">
                    Qualify on rental income. No tax returns required for {city.name} investors.
                  </p>
                  <span className="text-amber-500 text-sm font-medium">
                    Rates from 6.25% →
                  </span>
                </Link>
                <Link
                  href="/investment"
                  className="bg-slate-900 rounded-xl p-6 border border-slate-800 hover:border-amber-500/50 transition-all cursor-pointer group"
                >
                  <Home className="h-8 w-8 text-amber-500 mb-4" />
                  <h3 className="font-semibold text-white mb-2 group-hover:text-amber-500 transition-colors">Fix & Flip</h3>
                  <p className="text-sm text-gray-400 mb-3">
                    Fast funding for {city.name} acquisitions and rehab. Close in 7-14 days.
                  </p>
                  <span className="text-amber-500 text-sm font-medium">
                    Up to 90% LTV →
                  </span>
                </Link>
                <Link
                  href="/investment"
                  className="bg-slate-900 rounded-xl p-6 border border-slate-800 hover:border-amber-500/50 transition-all cursor-pointer group"
                >
                  <Building2 className="h-8 w-8 text-amber-500 mb-4" />
                  <h3 className="font-semibold text-white mb-2 group-hover:text-amber-500 transition-colors">Portfolio Loans</h3>
                  <p className="text-sm text-gray-400 mb-3">
                    Finance 5-100+ {city.name} properties under one loan.
                  </p>
                  <span className="text-amber-500 text-sm font-medium">
                    Single application →
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 border-t border-slate-800">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-10 text-white text-center">
                {city.name} Investment Loan FAQs
              </h2>
              <div className="space-y-4">
                {faqItems.map((item, index) => (
                  <details
                    key={index}
                    className="group bg-slate-900 rounded-xl border border-slate-800 overflow-hidden"
                  >
                    <summary className="flex items-center justify-between p-5 cursor-pointer hover:bg-slate-800/50 transition-colors">
                      <h3 className="font-semibold text-white pr-4">
                        {item.question}
                      </h3>
                      <ChevronDown className="h-5 w-5 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" />
                    </summary>
                    <div className="px-5 pb-5 text-gray-400">
                      <p>{item.answer}</p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Other Cities */}
        <section className="py-20 border-t border-slate-800">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl font-bold mb-6 text-white">
                Explore Other California Markets
              </h2>
              <div className="flex flex-wrap gap-2">
                {majorCities.map((otherCity) => (
                  <Link
                    key={otherCity.slug}
                    href={`/california/${otherCity.slug}`}
                    className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-gray-300 hover:text-amber-500 px-4 py-2 rounded-full text-sm border border-slate-800 hover:border-amber-500/50 transition-all"
                  >
                    <MapPin className="h-4 w-4 text-amber-500" />
                    {otherCity.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 border-t border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950">
          <div className="container mx-auto px-4 text-center">
            <Shield className="h-12 w-12 text-amber-500 mx-auto mb-6" />
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to Invest in {city.name}?
            </h2>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Get matched with {city.name} investment property lenders in 60 seconds.
              DSCR, fix-and-flip, portfolio - we&apos;ve got you covered.
            </p>
            <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold text-lg px-10" asChild>
              <Link href="/get-quote">
                Get {city.name} Rates <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <p className="text-sm text-gray-500 mt-4">
              NMLS #1945913 | No credit impact to get matched
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
