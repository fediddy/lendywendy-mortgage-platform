import { Segment } from "@prisma/client";
import { getSegmentName } from "@/lib/url-utils";
import Link from "next/link";
import {
  Home,
  TrendingUp,
  Building2,
  CheckCircle,
  ArrowRight,
  Shield,
  Zap,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface SegmentHubHeroProps {
  segment: Segment;
  title?: string;
  description?: string;
  showCta?: boolean;
}

const segmentIcons = {
  RESIDENTIAL: Home,
  INVESTMENT: TrendingUp,
  COMMERCIAL: Building2,
};

const segmentConfig: Record<Segment, {
  description: string;
  tagline: string;
  features: string[];
  ctaText: string;
  ctaHref: string;
  rateRange: string;
  audience: string;
}> = {
  RESIDENTIAL: {
    description: "Expert guidance on California home loans, from first-time buyer programs to jumbo refinancing. Get pre-approved in minutes with our AI-powered matching.",
    tagline: "California Home Loans Made Simple",
    features: ["FHA 3.5% Down", "VA $0 Down", "Jumbo to $5M+", "Refinance Options"],
    ctaText: "Get Home Loan Rates",
    ctaHref: "/get-quote?segment=residential",
    rateRange: "From 6.125% APR*",
    audience: "First-time buyers, move-up buyers, refinancers",
  },
  INVESTMENT: {
    description: "Maximize your real estate portfolio with DSCR loans, fix-and-flip financing, and bridge loans. No tax returns needed for qualified investors.",
    tagline: "Financing for Real Estate Investors",
    features: ["DSCR No Tax Returns", "Fix & Flip 10-Day Close", "Portfolio Loans", "Bridge Financing"],
    ctaText: "Get Investor Rates",
    ctaHref: "/get-quote?segment=investment",
    rateRange: "From 7.5% APR*",
    audience: "Real estate investors, landlords, flippers",
  },
  COMMERCIAL: {
    description: "Navigate commercial real estate financing with confidence. SBA loans, multi-family, retail, office, and construction financing across California.",
    tagline: "Commercial & Business Property Loans",
    features: ["SBA 7(a) & 504", "Multi-Family 5+", "Construction", "Owner-Occupied"],
    ctaText: "Get Commercial Rates",
    ctaHref: "/get-quote?segment=commercial",
    rateRange: "From 7.0% APR*",
    audience: "Business owners, commercial investors, developers",
  },
};

export function SegmentHubHero({
  segment,
  title,
  description,
  showCta = true,
}: SegmentHubHeroProps) {
  const Icon = segmentIcons[segment];
  const config = segmentConfig[segment];
  const displayTitle = title || getSegmentName(segment);
  const displayDescription = description || config.description;

  return (
    <section
      className="bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 text-white"
      aria-labelledby="segment-hero-heading"
      itemScope
      itemType="https://schema.org/Service"
    >
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="max-w-4xl mx-auto">
          {/* Tagline Badge */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 bg-gold-500/20 border border-gold-500/30 text-gold-400 px-4 py-1.5 rounded-full text-sm font-medium">
              <Icon className="h-4 w-4" />
              <span>{config.tagline}</span>
            </div>
          </div>

          {/* Title */}
          <h1
            id="segment-hero-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center leading-tight mb-4"
            itemProp="name"
          >
            {displayTitle}
          </h1>

          {/* Description */}
          <p
            className="text-lg text-gray-300 text-center mb-6 max-w-2xl mx-auto"
            itemProp="description"
          >
            {displayDescription}
          </p>

          {/* Audience */}
          <p className="text-sm text-gray-400 text-center mb-6 flex items-center justify-center gap-2">
            <Users className="h-4 w-4" />
            <span itemProp="audience">Best for: {config.audience}</span>
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {config.features.map((feature, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1.5 bg-white/10 text-white px-3 py-1.5 rounded-full text-sm"
              >
                <CheckCircle className="h-3.5 w-3.5 text-green-400" />
                {feature}
              </span>
            ))}
          </div>

          {/* CTA Section */}
          {showCta && (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="bg-gold-500 hover:bg-gold-600 text-navy-900 font-bold px-8"
                asChild
              >
                <Link href={config.ctaHref}>
                  {config.ctaText}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <div className="text-center sm:text-left">
                <div className="text-gold-400 font-bold">{config.rateRange}</div>
                <div className="text-xs text-gray-400">No credit pull to check rates</div>
              </div>
            </div>
          )}

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
              100% Free Service
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
