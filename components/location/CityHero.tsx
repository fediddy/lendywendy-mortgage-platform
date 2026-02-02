"use client";

import Link from "next/link";
import {
  MapPin,
  Home,
  DollarSign,
  TrendingUp,
  Clock,
  Users,
  ArrowRight,
  CheckCircle,
  Shield,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CaliforniaCity } from "@/lib/california-cities";

interface CityHeroProps {
  city: CaliforniaCity;
}

export function CityHero({ city }: CityHeroProps) {
  return (
    <section
      className="bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 text-white"
      aria-labelledby="city-hero-heading"
      itemScope
      itemType="https://schema.org/Place"
    >
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="max-w-5xl mx-auto">
          {/* Location Badge */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 bg-gold-500/20 border border-gold-500/30 text-gold-400 px-4 py-1.5 rounded-full text-sm font-medium">
              <MapPin className="h-4 w-4" />
              <span itemProp="addressRegion">{city.county}, California</span>
            </div>
          </div>

          {/* Title */}
          <h1
            id="city-hero-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center leading-tight mb-4"
          >
            <span itemProp="name">{city.name}</span> Mortgage Lenders
          </h1>

          {/* Subtitle */}
          <p className="text-lg text-gray-300 text-center mb-6 max-w-2xl mx-auto">
            Get pre-approved for a {city.name} home loan in minutes. Compare rates from top local mortgage lenders.
          </p>

          {/* Market Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <DollarSign className="h-5 w-5 text-gold-400 mx-auto mb-2" />
              <div className="text-xl font-bold text-white">{city.medianHomePrice}</div>
              <div className="text-xs text-gray-400">Median Home Price</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <TrendingUp className="h-5 w-5 text-green-400 mx-auto mb-2" />
              <div className="text-xl font-bold text-white">{city.yearOverYearChange}</div>
              <div className="text-xs text-gray-400">YoY Change</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <Clock className="h-5 w-5 text-gold-400 mx-auto mb-2" />
              <div className="text-xl font-bold text-white">{city.avgDaysOnMarket}</div>
              <div className="text-xs text-gray-400">Avg Days on Market</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <Users className="h-5 w-5 text-gold-400 mx-auto mb-2" />
              <div className="text-xl font-bold text-white">{city.population}</div>
              <div className="text-xs text-gray-400">Population</div>
            </div>
          </div>

          {/* Available Loan Types */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {city.loanTypes.map((loan, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1.5 bg-white/10 text-white px-3 py-1.5 rounded-full text-sm"
              >
                <CheckCircle className="h-3.5 w-3.5 text-green-400" />
                {loan}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="bg-gold-500 hover:bg-gold-600 text-navy-900 font-bold px-8"
              asChild
            >
              <Link href="/get-quote">
                Get {city.name} Rates
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10"
              asChild
            >
              <Link href="/readiness-score">
                Check My Readiness
              </Link>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-6 mt-8 pt-6 border-t border-white/10">
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
              Local {city.name} Lenders
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CityHero;
