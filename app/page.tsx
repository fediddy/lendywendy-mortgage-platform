import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Home, TrendingUp } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl mb-6">
          Welcome to <span className="text-blue-600">LendyWendy</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
          Your trusted partner for all mortgage needs. Whether you're buying your first home,
          investing in property, or expanding your commercial portfolio, we have the expertise
          and solutions to help you succeed.
        </p>
        <div className="flex gap-4 justify-center">
          <Button size="lg" asChild>
            <Link href="/get-quote">Get Free Quote</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="#segments">Explore Solutions</Link>
          </Button>
        </div>
      </section>

      {/* Three Mortgage Segments */}
      <section id="segments" className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center mb-4">
          Mortgage Solutions for Every Need
        </h2>
        <p className="text-xl text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Explore our specialized mortgage services tailored to your unique goals
        </p>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Residential Mortgages */}
          <Card className="hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Home className="w-8 h-8 text-blue-600" />
              </div>
              <CardTitle className="text-2xl">Residential Mortgages</CardTitle>
              <CardDescription className="text-base">
                Make your dream home a reality
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                From first-time homebuyers to refinancing and home equity solutions,
                we guide you every step of the way.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>✓ First-Time Homebuyer Programs</li>
                <li>✓ Refinancing Options</li>
                <li>✓ Home Equity Lines of Credit</li>
                <li>✓ FHA, VA, and Conventional Loans</li>
              </ul>
              <Button className="w-full" variant="default" asChild>
                <Link href="/residential">Learn More</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Investment Property */}
          <Card className="hover:shadow-xl transition-shadow border-blue-200">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl">Investment Property</CardTitle>
              <CardDescription className="text-base">
                Build wealth through real estate
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                Finance your rental properties, vacation homes, or real estate investment
                portfolio with our specialized lending solutions.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>✓ Single & Multi-Family Rentals</li>
                <li>✓ Fix-and-Flip Financing</li>
                <li>✓ Portfolio Loans</li>
                <li>✓ DSCR & Non-QM Loans</li>
              </ul>
              <Button className="w-full" variant="default" asChild>
                <Link href="/investment">Learn More</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Commercial Real Estate */}
          <Card className="hover:shadow-xl transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Building2 className="w-8 h-8 text-purple-600" />
              </div>
              <CardTitle className="text-2xl">Commercial Real Estate</CardTitle>
              <CardDescription className="text-base">
                Grow your business with commercial financing
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                Secure financing for office buildings, retail spaces, industrial properties,
                and multi-unit commercial developments.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>✓ Office & Retail Buildings</li>
                <li>✓ Industrial & Warehouse</li>
                <li>✓ Multi-Family Apartments</li>
                <li>✓ SBA & Bridge Loans</li>
              </ul>
              <Button className="w-full" variant="default" asChild>
                <Link href="/commercial">Learn More</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Connect with our mortgage experts today and take the first step toward your goals
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/get-quote">Get Your Free Quote</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
