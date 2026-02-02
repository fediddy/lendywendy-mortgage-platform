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
  Star,
  Users,
  DollarSign,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CityHero } from "@/components/location";
import { TrustSignals, TestimonialCards, CtaSection } from "@/components/shared";
import { StructuredData } from "@/components/seo/StructuredData";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import {
  getCityBySlug,
  getAllCitySlugs,
  getMajorCities,
  type CaliforniaCity,
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
    title: city.metaTitle,
    description: city.metaDescription,
    keywords: [
      `${city.name} mortgage`,
      `${city.name} home loans`,
      `mortgage lenders ${city.name}`,
      `${city.name} mortgage rates`,
      `buy a home ${city.name}`,
      `refinance ${city.name}`,
      `FHA loans ${city.name}`,
      `VA loans ${city.name}`,
      `first-time homebuyer ${city.name}`,
    ],
    openGraph: {
      title: city.metaTitle,
      description: city.metaDescription,
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

  // Generate FAQ items specific to this city
  const faqItems = [
    {
      question: `What are current mortgage rates in ${city.name}?`,
      answer: `Mortgage rates in ${city.name} change daily based on market conditions. As of today, rates typically range from 6.125% to 7.5% APR for conventional loans, depending on credit score, down payment, and loan type. Use LendyWendy to get personalized rates from ${city.name} lenders in minutes.`,
    },
    {
      question: `How much do I need for a down payment to buy a home in ${city.name}?`,
      answer: `With ${city.name}'s median home price of ${city.medianHomePrice}, down payment requirements vary by loan type: VA and USDA offer $0 down for eligible borrowers, FHA requires 3.5% (approximately $${Math.round(parseInt(city.medianHomePrice.replace(/[$,]/g, '')) * 0.035).toLocaleString()}), and conventional loans start at 3% for first-time buyers.`,
    },
    {
      question: `What credit score do I need to buy a home in ${city.name}?`,
      answer: `Credit requirements for ${city.name} home loans vary: FHA loans accept 580+ credit scores, conventional loans require 620+, and jumbo loans (common in ${city.name} given the ${city.medianHomePrice} median price) typically require 700+. LendyWendy matches you with lenders who specialize in your credit profile.`,
    },
    {
      question: `How long does it take to buy a home in ${city.name}?`,
      answer: `In ${city.name}'s market, homes average ${city.avgDaysOnMarket} days on market. The entire homebuying process typically takes 30-60 days from offer acceptance to closing. Pre-approval from LendyWendy takes just minutes and makes your offer more competitive.`,
    },
  ];

  const majorCities = getMajorCities().filter((c) => c.slug !== city.slug);

  return (
    <>
      {/* Structured Data for Local SEO */}
      <StructuredData
        type="location"
        pageTitle={city.metaTitle}
        pageDescription={city.metaDescription}
        pageUrl={`/california/${city.slug}`}
        breadcrumbs={[
          { name: "California", url: "/california" },
          { name: city.name, url: `/california/${city.slug}` },
        ]}
        faqItems={faqItems}
        locationName={city.name}
      />

      <main className="min-h-screen" itemScope itemType="https://schema.org/WebPage">
        {/* City Hero */}
        <CityHero city={city} />

        <div className="container mx-auto px-4 py-12 space-y-16">
          {/* Breadcrumbs */}
          <Breadcrumbs
            items={[
              { name: "California", url: "/california" },
              { name: city.name, url: `/california/${city.slug}` },
            ]}
          />

          {/* About Section */}
          <section aria-labelledby="about-heading">
            <h2 id="about-heading" className="text-3xl font-bold mb-6 text-navy-900">
              About {city.name} Real Estate Market
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-gray-600 mb-4">{city.description}</p>
                <h3 className="font-semibold text-navy-900 mb-3">Market Highlights</h3>
                <ul className="space-y-2">
                  {city.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-600">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-navy-900 mb-3">Popular Neighborhoods</h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {city.neighborhoods.map((neighborhood, i) => (
                    <span
                      key={i}
                      className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full text-sm"
                    >
                      {neighborhood}
                    </span>
                  ))}
                </div>
                <div className="bg-gold-50 border border-gold-200 rounded-xl p-4">
                  <h4 className="font-semibold text-navy-900 mb-2 flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-gold-500" />
                    Median Household Income
                  </h4>
                  <p className="text-2xl font-bold text-navy-900">{city.medianHouseholdIncome}</p>
                  <p className="text-sm text-gray-500">{city.county}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Loan Types Section */}
          <section aria-labelledby="loans-heading" className="bg-gray-50 -mx-4 px-4 py-12 md:-mx-8 md:px-8 lg:-mx-16 lg:px-16">
            <div className="max-w-5xl mx-auto">
              <h2 id="loans-heading" className="text-3xl font-bold mb-6 text-navy-900 text-center">
                Mortgage Options in {city.name}
              </h2>
              <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
                LendyWendy matches {city.name} homebuyers with local lenders offering these loan programs
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <Link
                  href="/residential"
                  className="bg-white rounded-xl p-6 border border-gray-100 hover:border-gold-300 hover:shadow-lg transition-all"
                >
                  <Home className="h-8 w-8 text-gold-500 mb-4" />
                  <h3 className="font-semibold text-navy-900 mb-2">Residential Loans</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Conventional, FHA, VA, and Jumbo loans for {city.name} homebuyers
                  </p>
                  <span className="text-gold-600 text-sm font-medium flex items-center gap-1">
                    Learn More <ChevronRight className="h-4 w-4" />
                  </span>
                </Link>
                <Link
                  href="/investment"
                  className="bg-white rounded-xl p-6 border border-gray-100 hover:border-gold-300 hover:shadow-lg transition-all"
                >
                  <TrendingUp className="h-8 w-8 text-gold-500 mb-4" />
                  <h3 className="font-semibold text-navy-900 mb-2">Investment Loans</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    DSCR, fix-and-flip, and rental property loans for {city.name} investors
                  </p>
                  <span className="text-gold-600 text-sm font-medium flex items-center gap-1">
                    Learn More <ChevronRight className="h-4 w-4" />
                  </span>
                </Link>
                <Link
                  href="/commercial"
                  className="bg-white rounded-xl p-6 border border-gray-100 hover:border-gold-300 hover:shadow-lg transition-all"
                >
                  <Building2 className="h-8 w-8 text-gold-500 mb-4" />
                  <h3 className="font-semibold text-navy-900 mb-2">Commercial Loans</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    SBA, multi-family, and commercial property loans in {city.name}
                  </p>
                  <span className="text-gold-600 text-sm font-medium flex items-center gap-1">
                    Learn More <ChevronRight className="h-4 w-4" />
                  </span>
                </Link>
              </div>
            </div>
          </section>

          {/* Testimonials */}
          <section aria-labelledby="testimonials-heading">
            <h2 id="testimonials-heading" className="text-3xl font-bold mb-6 text-navy-900">
              What California Homebuyers Say
            </h2>
            <TestimonialCards limit={3} />
          </section>

          {/* FAQ Section */}
          <section aria-labelledby="faq-heading" itemScope itemType="https://schema.org/FAQPage">
            <h2 id="faq-heading" className="text-3xl font-bold mb-6 text-navy-900">
              {city.name} Mortgage FAQs
            </h2>
            <div className="space-y-4">
              {faqItems.map((item, index) => (
                <details
                  key={index}
                  className="group bg-gray-50 rounded-xl border border-gray-200 overflow-hidden"
                  itemScope
                  itemProp="mainEntity"
                  itemType="https://schema.org/Question"
                >
                  <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-100 transition-colors">
                    <h3 className="font-semibold text-navy-900 text-sm pr-4" itemProp="name">
                      {item.question}
                    </h3>
                    <ChevronRight className="h-5 w-5 text-gray-400 group-open:rotate-90 transition-transform flex-shrink-0" />
                  </summary>
                  <div
                    className="px-4 pb-4 text-sm text-gray-600"
                    itemScope
                    itemProp="acceptedAnswer"
                    itemType="https://schema.org/Answer"
                  >
                    <p itemProp="text">{item.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </section>

          {/* Other Cities */}
          <section aria-labelledby="other-cities-heading">
            <h2 id="other-cities-heading" className="text-2xl font-bold mb-6 text-navy-900">
              Explore Other California Markets
            </h2>
            <div className="flex flex-wrap gap-2">
              {majorCities.map((otherCity) => (
                <Link
                  key={otherCity.slug}
                  href={`/california/${otherCity.slug}`}
                  className="flex items-center gap-1.5 bg-gray-100 hover:bg-gold-50 hover:border-gold-300 text-gray-700 hover:text-navy-900 px-4 py-2 rounded-full text-sm border border-transparent transition-all"
                >
                  <MapPin className="h-4 w-4 text-gold-500" />
                  {otherCity.name}
                </Link>
              ))}
            </div>
          </section>
        </div>

        {/* Trust Signals */}
        <TrustSignals variant="light" showStats={true} showCredentials={true} />

        {/* Final CTA */}
        <CtaSection
          variant="primary"
          title={`Ready to buy a home in ${city.name}?`}
          description={`Get matched with top ${city.name} mortgage lenders in 60 seconds. Compare rates and save thousands.`}
        />
      </main>
    </>
  );
}
