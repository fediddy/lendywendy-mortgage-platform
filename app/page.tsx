"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { StructuredData } from "@/components/seo/StructuredData";
import {
  Home,
  Building2,
  TrendingUp,
  MessageCircle,
  CheckCircle,
  ArrowRight,
  Shield,
  Clock,
  Users,
  Zap,
  Target,
  Phone,
  ChevronRight,
  Star,
  MapPin,
  BadgeCheck,
  X,
  Send,
  DollarSign,
  Calculator,
  FileText,
  Award,
  TrendingDown,
  Percent,
  Calendar,
} from "lucide-react";

export default function HomePage() {
  const [activeLoanType, setActiveLoanType] = useState("residential");
  const [chatMessages, setChatMessages] = useState([
    { from: "bot", text: "Hi! I'm Wendy. Looking to buy, refinance, or invest?" },
  ]);
  const [showChat, setShowChat] = useState(false);

  // Enhanced loan type data with comprehensive info for semantic SEO
  const loanTypes = {
    residential: {
      title: "Home Purchase & Refinance Loans",
      subtitle: "Primary residence financing for California homebuyers",
      rateRange: "6.125% - 7.25% APR*",
      whoItsFor: "First-time buyers, move-up buyers, refinancers",
      items: [
        { name: "Conventional Loans", detail: "3% down, 620+ credit, PMI cancellable at 80% LTV" },
        { name: "FHA Loans", detail: "3.5% down, 580+ credit, government-insured" },
        { name: "VA Loans", detail: "$0 down for veterans, no PMI, competitive rates" },
        { name: "USDA Rural Loans", detail: "$0 down for eligible rural areas" },
        { name: "Jumbo Loans", detail: "Loan amounts up to $5M+, 10% down options" },
        { name: "Rate & Term Refinance", detail: "Lower your rate or change loan term" },
        { name: "Cash-Out Refinance", detail: "Access home equity up to 80% LTV" },
        { name: "Streamline Refinance", detail: "FHA/VA fast-track with minimal docs" },
      ],
      requirements: ["Minimum 580 credit (FHA) or 620 (Conventional)", "2 years employment history", "DTI under 43-50% depending on loan type", "Property appraisal required"],
      benefits: ["Lock in today's rates for 30 years", "Build wealth through home equity", "Tax-deductible mortgage interest", "Stable monthly payments"],
      cta: "Get Home Loan Rates",
      href: "/residential",
      processingTime: "21-45 days typical close",
    },
    investment: {
      title: "Investment Property Loans",
      subtitle: "Financing for real estate investors & landlords",
      rateRange: "7.5% - 9.5% APR*",
      whoItsFor: "Real estate investors, landlords, house flippers",
      items: [
        { name: "DSCR Loans", detail: "Qualify on rental income, no tax returns needed" },
        { name: "Fix & Flip Loans", detail: "80-90% LTV, 10-day close, interest-only" },
        { name: "Rental Portfolio Loans", detail: "Finance 5-100+ properties under one loan" },
        { name: "Bridge Loans", detail: "Short-term financing for quick acquisitions" },
        { name: "Hard Money Loans", detail: "Asset-based, close in 7-14 days" },
        { name: "Bank Statement Loans", detail: "12-24 month statements for self-employed" },
        { name: "Foreign National Loans", detail: "No SSN required, 25-30% down" },
        { name: "Blanket Loans", detail: "Multiple properties, single mortgage" },
      ],
      requirements: ["DSCR ratio of 1.0+ (rent covers payment)", "20-25% down payment typical", "6+ months cash reserves", "Property cash flow analysis"],
      benefits: ["No personal income verification (DSCR)", "Unlimited properties in portfolio", "Interest-only payment options", "Close quickly on competitive deals"],
      cta: "Get Investor Rates",
      href: "/investment",
      processingTime: "7-21 days typical close",
    },
    commercial: {
      title: "Commercial & Business Loans",
      subtitle: "Financing for commercial real estate & businesses",
      rateRange: "7.0% - 10.5% APR*",
      whoItsFor: "Business owners, commercial investors, developers",
      items: [
        { name: "Office & Retail Loans", detail: "Stabilized commercial properties" },
        { name: "Multi-Family (5+ units)", detail: "Apartment buildings & complexes" },
        { name: "Mixed-Use Properties", detail: "Residential + commercial combo" },
        { name: "SBA 7(a) Loans", detail: "Up to $5M, 10-25 year terms" },
        { name: "SBA 504 Loans", detail: "Up to $5.5M for real estate & equipment" },
        { name: "Construction Loans", detail: "Ground-up & major rehab financing" },
        { name: "Industrial & Warehouse", detail: "Manufacturing & distribution properties" },
        { name: "Owner-Occupied CRE", detail: "Lower rates when you occupy 51%+" },
      ],
      requirements: ["Business financials (2+ years)", "Personal & business credit review", "25-30% down payment typical", "Property appraisal & environmental"],
      benefits: ["Build business equity vs renting", "Potential rental income from unused space", "Depreciation tax benefits", "Long-term wealth building"],
      cta: "Get Commercial Rates",
      href: "/commercial",
      processingTime: "30-60 days typical close",
    },
  };

  return (
    <>
      {/* Structured Data for SEO - Schema.org JSON-LD */}
      <StructuredData
        type="home"
        pageTitle="LendyWendy | California's AI-Powered Mortgage Matching | Best Rates Guaranteed"
        pageDescription="Stop calling lenders. Let California's top mortgage lenders compete for your business. AI-powered matching finds the best rates for home loans, refinancing, investment property, and commercial mortgages. NMLS #1945913."
        pageUrl="/"
      />

      <main className="min-h-screen" itemScope itemType="https://schema.org/WebPage">
        {/* Hidden semantic content for NLP entity extraction */}
        <div className="sr-only" aria-hidden="true">
          <h2>California Mortgage Services by LendyWendy</h2>
          <p>LendyWendy is a licensed mortgage broker (NMLS #1945913) providing AI-powered mortgage matching services to California homebuyers and real estate investors.</p>
          <p>Our mortgage services include: Conventional loans, FHA loans, VA loans, USDA loans, Jumbo loans, DSCR loans, fix-and-flip loans, commercial mortgages, SBA loans, bridge financing, and Non-QM loans.</p>
          <p>Service areas: Los Angeles, San Francisco, San Diego, Sacramento, San Jose, Orange County, Fresno, Oakland, Long Beach, Bakersfield, Anaheim, Santa Ana, Riverside, Irvine, and all California cities.</p>
          <p>Entity relationships: LendyWendy connects California homebuyers with mortgage lenders. Wendy Landeros is the founder of LendyWendy. LendyWendy provides mortgage pre-approval services.</p>
        </div>

        {/* HERO - Compact, Clear Value Prop */}
        <section
          className="bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 text-white"
          aria-labelledby="hero-heading"
          itemScope
          itemType="https://schema.org/WPHeader"
        >
        <div className="container mx-auto px-4 py-12 lg:py-16">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Left - Message */}
            <div>
              <div className="inline-flex items-center gap-2 bg-gold-500/20 border border-gold-500/30 text-gold-400 px-3 py-1 rounded-full text-sm font-medium mb-4">
                <Zap className="h-4 w-4" />
                California&apos;s fastest mortgage matching
              </div>
              <h1
                id="hero-heading"
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight mb-4"
                itemProp="headline"
              >
                Stop calling lenders.
                <br />
                <span className="text-gold-500">Let them compete for you.</span>
              </h1>
              <p className="text-lg text-gray-300 mb-6 max-w-lg hero-description" itemProp="description">
                Tell us what you need in <time dateTime="PT60S">60 seconds</time>. We&apos;ll match you with pre-vetted <span itemProp="areaServed">California</span> lenders who fight for your business.
              </p>

              {/* Inline Form */}
              <form className="flex flex-col sm:flex-row gap-2 mb-4">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gold-500"
                />
                <Button className="bg-gold-500 hover:bg-gold-600 text-navy-900 font-bold px-6 py-3 h-auto">
                  Get My Rates <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>

              <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-1">
                  <CheckCircle className="h-4 w-4 text-green-400" /> No credit pull
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle className="h-4 w-4 text-green-400" /> 60 seconds
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle className="h-4 w-4 text-green-400" /> 100% free
                </span>
              </div>
            </div>

            {/* Right - Live Chat Demo */}
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-md mx-auto">
                <div className="bg-navy-900 px-4 py-3 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gold-500 flex items-center justify-center text-navy-900 font-bold">W</div>
                  <div>
                    <div className="text-white font-semibold text-sm">Wendy - AI Mortgage Advisor</div>
                    <div className="text-green-400 text-xs flex items-center gap-1">
                      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" /> Online now
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-gray-50 min-h-[200px] space-y-3">
                  <div className="bg-white rounded-xl rounded-tl-sm px-3 py-2 shadow-sm max-w-[80%] text-sm text-gray-700">
                    Hi! I&apos;m Wendy. Looking to <strong>buy</strong>, <strong>refinance</strong>, or <strong>invest</strong>?
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {["🏠 Buy a home", "💰 Refinance", "📈 Invest"].map((opt) => (
                      <button
                        key={opt}
                        className="px-3 py-1.5 bg-navy-900 text-white text-sm rounded-full hover:bg-navy-800 transition-colors"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="p-3 border-t flex gap-2">
                  <input
                    placeholder="Type or click above..."
                    className="flex-1 px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-900"
                  />
                  <Button size="sm" className="bg-gold-500 text-navy-900">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-navy-800 text-white text-xs px-4 py-2 rounded-full border border-navy-700">
                Try it — Wendy answers in seconds
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS - Immediately After Hero */}
      <section
        className="bg-white border-b"
        aria-labelledby="how-it-works-heading"
        itemScope
        itemType="https://schema.org/HowTo"
      >
        <div className="container mx-auto px-4 py-10">
          <header className="text-center mb-8">
            <h2
              id="how-it-works-heading"
              className="text-2xl font-bold text-navy-900 how-it-works"
              itemProp="name"
            >
              How it works — <span itemProp="estimatedCost" itemScope itemType="https://schema.org/MonetaryAmount"><meta itemProp="price" content="0" /><meta itemProp="priceCurrency" content="USD" /></span>3 steps, <time dateTime="PT5M" itemProp="totalTime">5 minutes</time>
            </h2>
          </header>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                step: "1",
                icon: MessageCircle,
                title: "Tell us your goals",
                desc: "Chat with Wendy or fill out a quick form. We need 60 seconds to understand what you're looking for.",
                color: "bg-blue-500",
              },
              {
                step: "2",
                icon: Users,
                title: "Get matched instantly",
                desc: "Our algorithm finds the best local lenders for your exact situation. No cold calls, no spam.",
                color: "bg-green-500",
              },
              {
                step: "3",
                icon: BadgeCheck,
                title: "Compare & choose",
                desc: "Lenders compete for your business. You pick the best rate and close with confidence.",
                color: "bg-gold-500",
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-4">
                <div className={`${item.color} w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <span className="text-white font-bold text-lg">{item.step}</span>
                </div>
                <div>
                  <h3 className="font-bold text-navy-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THE DIFFERENCE - Why We're Not Like Others */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <p className="text-sm font-semibold text-red-500 uppercase tracking-wider mb-2">Why we&apos;re different</p>
              <h2 className="text-2xl lg:text-3xl font-bold text-navy-900">
                National sites send you to call centers.<br />
                <span className="text-gold-600">We connect you with local experts.</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Other Sites */}
              <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
                <div className="flex items-center gap-2 mb-4">
                  <X className="h-6 w-6 text-red-500" />
                  <span className="font-bold text-gray-500">Other mortgage sites</span>
                </div>
                <ul className="space-y-3">
                  {[
                    "Sell your info to 10+ lenders",
                    "Endless spam calls for weeks",
                    "Out-of-state call centers",
                    "One-size-fits-all rates",
                    "No help with complex situations",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-500 text-sm">
                      <X className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* LendyWendy */}
              <div className="bg-navy-900 rounded-xl p-6 border-2 border-gold-500 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-gold-500 text-navy-900 text-xs font-bold px-4 py-1">
                  LENDYWENDY
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle className="h-6 w-6 text-gold-500" />
                  <span className="font-bold">The LendyWendy difference</span>
                </div>
                <ul className="space-y-3">
                  {[
                    "You control who contacts you",
                    "Max 3 lenders, hand-picked for you",
                    "California-based local experts",
                    "AI finds your best loan type",
                    "DSCR, Non-QM, Commercial — we do it all",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-gold-500 flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LOAN TYPES - Compact Tabs */}
      <section
        className="bg-white py-12"
        aria-labelledby="loan-types-heading"
        itemScope
        itemType="https://schema.org/ItemList"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <header className="text-center mb-6">
              <h2
                id="loan-types-heading"
                className="text-2xl font-bold text-navy-900 loan-types"
                itemProp="name"
              >
                Every loan type. One place.
              </h2>
              <p className="text-gray-500" itemProp="description">
                California mortgage options: <strong>Conventional</strong>, <strong>FHA</strong>, <strong>VA</strong>, <strong>USDA</strong>, <strong>Jumbo</strong>, <strong>DSCR</strong>, <strong>Fix &amp; Flip</strong>, <strong>Commercial</strong>, and <strong>SBA loans</strong>
              </p>
            </header>

            {/* Tabs */}
            <div className="flex justify-center gap-2 mb-6">
              {[
                { id: "residential", label: "Residential", icon: Home },
                { id: "investment", label: "Investment", icon: TrendingUp },
                { id: "commercial", label: "Commercial", icon: Building2 },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveLoanType(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm transition-all ${
                    activeLoanType === tab.id
                      ? "bg-navy-900 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Enhanced Content - Rich Information Display */}
            {(() => {
              const loan = loanTypes[activeLoanType as keyof typeof loanTypes];
              return (
                <article
                  className="bg-gray-50 rounded-2xl p-6"
                  itemScope
                  itemType="https://schema.org/FinancialProduct"
                >
                  {/* Header with rate indicator */}
                  <header className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6 pb-4 border-b border-gray-200">
                    <div>
                      <h3 className="font-bold text-xl text-navy-900 mb-1" itemProp="name">
                        {loan.title}
                      </h3>
                      <p className="text-gray-600 text-sm" itemProp="description">{loan.subtitle}</p>
                      <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        <span itemProp="audience">Best for: {loan.whoItsFor}</span>
                      </p>
                    </div>
                    <div className="bg-navy-900 text-white px-4 py-2 rounded-lg text-center flex-shrink-0">
                      <div className="text-xs text-gray-300">Current Rates From</div>
                      <div className="font-bold text-gold-400" itemProp="offers" itemScope itemType="https://schema.org/Offer">
                        <span itemProp="price">{loan.rateRange}</span>
                      </div>
                      <div className="text-[10px] text-gray-400">{loan.processingTime}</div>
                    </div>
                  </header>

                  {/* Loan Products Grid */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-navy-900 mb-3 flex items-center gap-2">
                      <Shield className="h-4 w-4 text-gold-500" />
                      Available Loan Programs
                    </h4>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {loan.items.map((item, i) => (
                        <div
                          key={i}
                          className="bg-white rounded-lg p-3 border border-gray-100 hover:border-gold-300 transition-colors"
                          itemProp="itemOffered"
                          itemScope
                          itemType="https://schema.org/LoanOrCredit"
                        >
                          <div className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                            <div>
                              <span className="font-medium text-navy-900 text-sm" itemProp="name">{item.name}</span>
                              <p className="text-xs text-gray-500" itemProp="description">{item.detail}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Requirements & Benefits */}
                  <div className="grid sm:grid-cols-2 gap-4 mb-6">
                    <div className="bg-white rounded-lg p-4 border border-gray-100">
                      <h4 className="font-semibold text-navy-900 mb-2 flex items-center gap-2 text-sm">
                        <Target className="h-4 w-4 text-blue-500" />
                        Typical Requirements
                      </h4>
                      <ul className="space-y-1.5">
                        {loan.requirements.map((req, i) => (
                          <li key={i} className="text-xs text-gray-600 flex items-start gap-1.5">
                            <ChevronRight className="h-3 w-3 text-gray-400 flex-shrink-0 mt-0.5" />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-gray-100">
                      <h4 className="font-semibold text-navy-900 mb-2 flex items-center gap-2 text-sm">
                        <Zap className="h-4 w-4 text-gold-500" />
                        Key Benefits
                      </h4>
                      <ul className="space-y-1.5">
                        {loan.benefits.map((benefit, i) => (
                          <li key={i} className="text-xs text-gray-600 flex items-start gap-1.5">
                            <Star className="h-3 w-3 text-gold-500 flex-shrink-0 mt-0.5" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* CTAs */}
                  <footer className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
                    <Button className="bg-gold-500 hover:bg-gold-600 text-navy-900 font-bold flex-1" asChild>
                      <Link href={loan.href}>
                        {loan.cta}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="outline" className="border-navy-900 text-navy-900 flex-1" asChild>
                      <Link href="/get-quote">
                        Get Matched With Lenders
                      </Link>
                    </Button>
                  </footer>

                  {/* Rate Disclaimer */}
                  <p className="text-[10px] text-gray-400 mt-3 text-center">
                    *Rates shown are for illustration. Your actual rate depends on credit score, loan amount, property type, and market conditions. Equal Housing Opportunity.
                  </p>
                </article>
              );
            })()}
          </div>
        </div>
      </section>

      {/* NOT READY? Readiness Score Hook */}
      <section className="bg-gradient-to-r from-sage-500 to-emerald-600 py-10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 text-white">
              <p className="text-emerald-200 font-medium mb-2">Not ready to talk to a lender yet?</p>
              <h2 className="text-2xl lg:text-3xl font-bold mb-3">
                Check your Mortgage Readiness Score
              </h2>
              <p className="text-emerald-100 mb-4">
                2-minute quiz tells you where you stand. Get personalized tips to improve your approval odds — no lender contact required.
              </p>
              <Button size="lg" className="bg-white text-sage-500 hover:bg-gray-100 font-bold" asChild>
                <Link href="/readiness-score">
                  <Target className="mr-2 h-5 w-5" />
                  Check My Score Free
                </Link>
              </Button>
            </div>
            <div className="flex-shrink-0">
              <div className="w-32 h-32 bg-white/20 rounded-full flex flex-col items-center justify-center border-4 border-white/40">
                <span className="text-4xl font-extrabold text-white">87</span>
                <span className="text-xs text-emerald-200">Ready!</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF - Quick Trust */}
      <section className="bg-white py-10 border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  quote: "Pre-approved in 5 minutes. Rate was 0.375% lower than my bank.",
                  name: "Maria S.",
                  detail: "First-time buyer, San Diego",
                },
                {
                  quote: "Finally found a lender who does bank statement loans. Closed in 3 weeks.",
                  name: "James T.",
                  detail: "Self-employed investor, LA",
                },
                {
                  quote: "Readiness Score showed me exactly what to fix. Bought my home 3 months later.",
                  name: "Sarah K.",
                  detail: "Homeowner, Sacramento",
                },
              ].map((t, i) => (
                <div key={i} className="bg-gray-50 rounded-xl p-5">
                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-gold-500 text-gold-500" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-700 mb-3">&quot;{t.quote}&quot;</p>
                  <p className="text-sm font-semibold text-navy-900">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* LOCAL CALIFORNIA - Trust + SEO with comprehensive city coverage */}
      <section
        className="bg-gray-50 py-10"
        aria-labelledby="california-heading"
        itemScope
        itemType="https://schema.org/Service"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <header className="text-center mb-6">
              <h2 id="california-heading" className="text-xl font-bold text-navy-900 mb-2" itemProp="name">
                Local California mortgage lenders who know your market
              </h2>
              <p className="text-gray-500 mb-2 text-sm" itemProp="description">
                We partner with licensed, vetted loan officers in every major California metro area
              </p>
              <p className="text-xs text-gray-400">
                <span itemProp="serviceType">Mortgage matching service</span> • <span itemProp="areaServed">California statewide</span>
              </p>
            </header>

            {/* Major metros - Primary cities */}
            <nav aria-label="Major California mortgage markets" className="mb-4">
              <h3 className="text-sm font-semibold text-navy-900 text-center mb-3">Major Markets</h3>
              <div className="flex flex-wrap justify-center gap-2">
                {[
                  { city: "Los Angeles", pop: "3.9M" },
                  { city: "San Francisco", pop: "870K" },
                  { city: "San Diego", pop: "1.4M" },
                  { city: "San Jose", pop: "1.0M" },
                  { city: "Sacramento", pop: "530K" },
                  { city: "Orange County", pop: "3.2M" },
                ].map((item) => (
                  <Link
                    key={item.city}
                    href={`/california/${item.city.toLowerCase().replace(" ", "-")}`}
                    className="flex items-center gap-1.5 bg-navy-900 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-navy-800 transition-all"
                    itemProp="areaServed"
                    itemScope
                    itemType="https://schema.org/City"
                  >
                    <MapPin className="h-4 w-4 text-gold-400" />
                    <span itemProp="name">{item.city}</span>
                  </Link>
                ))}
              </div>
            </nav>

            {/* Secondary markets */}
            <nav aria-label="Additional California mortgage markets">
              <h3 className="text-sm font-semibold text-gray-600 text-center mb-3">Also Serving</h3>
              <div className="flex flex-wrap justify-center gap-2">
                {[
                  "Fresno",
                  "Oakland",
                  "Long Beach",
                  "Bakersfield",
                  "Anaheim",
                  "Santa Ana",
                  "Riverside",
                  "Irvine",
                  "Stockton",
                  "Fremont",
                  "Modesto",
                  "Santa Clarita",
                  "Glendale",
                  "Huntington Beach",
                  "Pasadena",
                  "Torrance",
                ].map((city) => (
                  <Link
                    key={city}
                    href={`/california/${city.toLowerCase().replace(" ", "-")}`}
                    className="flex items-center gap-1 bg-white px-3 py-1.5 rounded-full text-xs text-gray-600 hover:text-navy-900 hover:shadow-md transition-all border"
                    itemProp="areaServed"
                    itemScope
                    itemType="https://schema.org/City"
                  >
                    <MapPin className="h-3 w-3 text-gold-500" />
                    <span itemProp="name">{city}</span>
                  </Link>
                ))}
              </div>
            </nav>

            {/* Trust signals */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex flex-wrap justify-center gap-6 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <Award className="h-4 w-4 text-gold-500" />
                  NMLS #1945913
                </span>
                <span className="flex items-center gap-1">
                  <Shield className="h-4 w-4 text-green-500" />
                  California DRE Licensed
                </span>
                <span className="flex items-center gap-1">
                  <BadgeCheck className="h-4 w-4 text-blue-500" />
                  Equal Housing Opportunity
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION - Visible for users, structured for SEO */}
      <section
        className="bg-white py-12"
        aria-labelledby="faq-heading"
        itemScope
        itemType="https://schema.org/FAQPage"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <header className="text-center mb-8">
              <h2 id="faq-heading" className="text-2xl font-bold text-navy-900 mb-2">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-500 text-sm">
                Common questions about California mortgages and our matching service
              </p>
            </header>

            <div className="space-y-4">
              {[
                {
                  q: "What credit score do I need for a California mortgage?",
                  a: "Credit score requirements vary by loan type: FHA loans accept 580+ (3.5% down) or 500-579 (10% down), Conventional loans require 620+, VA loans typically need 620+, and Jumbo loans usually require 700+. Our AI matches you with lenders who specialize in your credit profile."
                },
                {
                  q: "How much down payment do I need to buy a house in California?",
                  a: "Down payment requirements depend on loan type: VA and USDA loans offer $0 down for eligible borrowers, FHA loans require 3.5% down, Conventional loans start at 3% down for first-time buyers, and Jumbo loans typically require 10-20% down. California down payment assistance programs may also be available."
                },
                {
                  q: "What is a DSCR loan and who qualifies?",
                  a: "A DSCR (Debt Service Coverage Ratio) loan is an investment property loan that qualifies borrowers based on the property's rental income rather than personal income. Real estate investors qualify when the property's rental income covers at least 100% of the mortgage payment. No tax returns or employment verification required."
                },
                {
                  q: "Is LendyWendy free to use?",
                  a: "Yes, LendyWendy is 100% free for borrowers. We're compensated by lenders when a loan closes, so there's never any cost to you for using our matching service or AI advisor. No hidden fees, no obligation."
                },
                {
                  q: "Will checking my mortgage options affect my credit score?",
                  a: "No. Using LendyWendy's AI advisor or Mortgage Readiness Score does not impact your credit score. We only perform a soft inquiry which has no effect on your credit. A hard inquiry only happens when you formally apply with a lender."
                },
                {
                  q: "How fast can I get pre-approved?",
                  a: "Most borrowers receive pre-qualification within 2 minutes using our AI advisor. Full pre-approval with a matched lender typically takes 24-48 hours after document submission. Some loan types like fix-and-flip can close in as fast as 7-14 days."
                },
              ].map((item, index) => (
                <details
                  key={index}
                  className="group bg-gray-50 rounded-xl border border-gray-200 overflow-hidden"
                  itemScope
                  itemProp="mainEntity"
                  itemType="https://schema.org/Question"
                >
                  <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-100 transition-colors">
                    <h3 className="font-semibold text-navy-900 text-sm pr-4" itemProp="name">
                      {item.q}
                    </h3>
                    <ChevronRight className="h-5 w-5 text-gray-400 group-open:rotate-90 transition-transform flex-shrink-0" />
                  </summary>
                  <div
                    className="px-4 pb-4 text-sm text-gray-600"
                    itemScope
                    itemProp="acceptedAnswer"
                    itemType="https://schema.org/Answer"
                  >
                    <p itemProp="text">{item.a}</p>
                  </div>
                </details>
              ))}
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-500 mb-3">Have more questions?</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button variant="outline" className="border-navy-900 text-navy-900" asChild>
                  <Link href="/readiness-score">
                    <Target className="mr-2 h-4 w-4" />
                    Check Your Readiness Score
                  </Link>
                </Button>
                <Button className="bg-gold-500 hover:bg-gold-600 text-navy-900" asChild>
                  <Link href="/get-quote">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Chat with Wendy
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section
        className="bg-navy-900 py-12"
        aria-labelledby="cta-heading"
        itemScope
        itemType="https://schema.org/WebPageElement"
      >
        <div className="container mx-auto px-4 text-center">
          <h2 id="cta-heading" className="text-2xl lg:text-3xl font-bold text-white mb-4">
            Ready to find your best mortgage rate?
          </h2>
          <p className="text-gray-400 mb-6 max-w-lg mx-auto">
            Join thousands of <span itemProp="areaServed">California</span> homebuyers who found better mortgage rates through LendyWendy. It takes <time dateTime="PT60S">60 seconds</time>.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" className="bg-gold-500 hover:bg-gold-600 text-navy-900 font-bold" asChild>
              <Link href="/get-quote" itemProp="potentialAction" itemScope itemType="https://schema.org/Action">
                <span itemProp="name">Get My Rates Now</span> <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10" asChild>
              <Link
                href="tel:+18005551234"
                itemProp="telephone"
              >
                <Phone className="mr-2 h-5 w-5" /> Call (800) 555-1234
              </Link>
            </Button>
          </div>
          <footer className="text-gray-500 text-sm mt-4">
            <p>
              <span itemProp="identifier">NMLS #1945913</span> |{" "}
              <span itemProp="additionalType">Equal Housing Opportunity</span>
            </p>
          </footer>
        </div>
      </section>

      {/* Hidden FAQ Section for SEO - Semantic content for NLP */}
      <section className="sr-only" aria-label="Frequently Asked Questions About California Mortgages">
        <h2>Common Mortgage Questions in California</h2>
        <dl>
          <dt>What credit score do I need for a California mortgage?</dt>
          <dd>FHA loans accept 580+ credit scores with 3.5% down. Conventional loans typically require 620+. VA loans accept most credit profiles for eligible veterans.</dd>

          <dt>How much down payment do I need to buy a house in California?</dt>
          <dd>Down payment requirements vary: VA and USDA loans offer $0 down, FHA requires 3.5%, Conventional starts at 3% for first-time buyers, and Jumbo typically needs 10-20%.</dd>

          <dt>What is a DSCR loan?</dt>
          <dd>A DSCR (Debt Service Coverage Ratio) loan is an investment property loan that qualifies borrowers based on the property&apos;s rental income rather than personal income. No tax returns or W-2s required.</dd>

          <dt>How long does it take to close on a mortgage in California?</dt>
          <dd>Typical closing times: Residential loans 21-45 days, Investment/DSCR loans 7-21 days, Commercial loans 30-60 days, Fix &amp; flip loans 7-14 days.</dd>

          <dt>What are current mortgage rates in California?</dt>
          <dd>Mortgage rates change daily. Current indicative ranges: Residential 6.125-7.25% APR, Investment 7.5-9.5% APR, Commercial 7.0-10.5% APR. Get personalized rates through LendyWendy.</dd>
        </dl>
      </section>
      </main>
    </>
  );
}
