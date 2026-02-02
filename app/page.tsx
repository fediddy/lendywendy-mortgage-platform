"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { StructuredData } from "@/components/seo/StructuredData";
import {
  Home,
  Building2,
  TrendingUp,
  ArrowRight,
  Shield,
  Clock,
  Users,
  Zap,
  Phone,
  ChevronRight,
  ChevronDown,
  Star,
  MapPin,
  BadgeCheck,
  CheckCircle2,
  XCircle,
  Sparkles,
  Calculator,
  FileCheck,
  Award,
  ArrowUpRight,
  DollarSign,
  Percent,
  Timer,
  UserCheck,
  Lock,
  HeartHandshake,
  ThumbsUp,
  Ban,
  CircleDollarSign,
  PiggyBank,
  Landmark,
  Target,
  BookOpen,
} from "lucide-react";

export default function HomePage() {
  const [activeLoanType, setActiveLoanType] = useState("residential");
  const [mounted, setMounted] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const loanTypes = {
    residential: {
      title: "Home Loans",
      desc: "Buy your dream home or refinance smarter",
      rate: "6.125%",
      products: [
        { name: "Conventional", desc: "3% down, 620+ credit" },
        { name: "FHA", desc: "3.5% down, 580+ credit" },
        { name: "VA", desc: "$0 down for veterans" },
        { name: "Jumbo", desc: "Loans up to $5M+" },
        { name: "Refinance", desc: "Lower your rate or cash out" },
      ],
      href: "/residential",
      icon: Home,
      color: "from-blue-500 to-blue-600",
    },
    investment: {
      title: "Investment Loans",
      desc: "Scale your portfolio with investor-friendly financing",
      rate: "7.5%",
      products: [
        { name: "DSCR", desc: "Qualify on rental income" },
        { name: "Fix & Flip", desc: "Close in 7-14 days" },
        { name: "Bridge", desc: "Short-term acquisition" },
        { name: "Portfolio", desc: "5-100+ properties" },
        { name: "Hard Money", desc: "Asset-based, fast close" },
      ],
      href: "/investment",
      icon: TrendingUp,
      color: "from-emerald-500 to-emerald-600",
    },
    commercial: {
      title: "Commercial Loans",
      desc: "Finance your business real estate goals",
      rate: "7.0%",
      products: [
        { name: "SBA 7(a)", desc: "Up to $5M, 10-25yr terms" },
        { name: "SBA 504", desc: "Real estate & equipment" },
        { name: "Multi-Family", desc: "5+ unit buildings" },
        { name: "Mixed-Use", desc: "Retail + residential" },
        { name: "Construction", desc: "Ground-up financing" },
      ],
      href: "/commercial",
      icon: Building2,
      color: "from-violet-500 to-violet-600",
    },
  };

  const faqs = [
    {
      q: "What credit score do I need?",
      a: "FHA loans: 580+ (3.5% down) or 500-579 (10% down). Conventional: 620+. VA: typically 620+. Jumbo: usually 700+. Our AI matches you with lenders for your credit profile."
    },
    {
      q: "How much down payment do I need?",
      a: "VA and USDA: $0 down for eligible borrowers. FHA: 3.5% down. Conventional: 3% for first-time buyers. Jumbo: 10-20%. California down payment assistance may be available."
    },
    {
      q: "Is LendyWendy free?",
      a: "Yes, 100% free for borrowers. We're compensated by lenders when a loan closes. No hidden fees, no obligation to you."
    },
    {
      q: "Will this affect my credit score?",
      a: "No. Using our AI advisor or Readiness Score does NOT impact your credit. Only a soft inquiry (no effect). Hard inquiry only when you formally apply with a lender."
    },
    {
      q: "How fast can I get pre-approved?",
      a: "Pre-qualification: 2 minutes with our AI. Full pre-approval: 24-48 hours after docs. Some loans (fix-and-flip) can close in 7-14 days."
    },
  ];

  return (
    <>
      <StructuredData
        type="home"
        pageTitle="LendyWendy | California Mortgage Rates | AI-Powered Lender Matching"
        pageDescription="Get matched with California's best mortgage lenders in 60 seconds. Home loans, investment property, commercial financing. No spam, no obligation. NMLS #1945913."
        pageUrl="/"
      />

      <main className="min-h-screen bg-slate-950 text-white overflow-hidden">
        {/* Ambient background */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-amber-500/8 rounded-full blur-[128px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-violet-500/8 rounded-full blur-[128px]" />
        </div>

        {/* ============ HERO ============ */}
        <section className="relative pt-8 pb-16 lg:pt-12 lg:pb-24">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              {/* Trust bar - top */}
              <div className={`flex flex-wrap items-center justify-center gap-4 md:gap-8 mb-10 text-sm transition-all duration-700 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-slate-300"><span className="text-white font-semibold">4.9/5</span> from 2,500+ reviews</span>
                </div>
                <div className="hidden md:block w-px h-4 bg-slate-700" />
                <div className="flex items-center gap-2 text-slate-300">
                  <Shield className="h-4 w-4 text-emerald-400" />
                  NMLS #1945913
                </div>
                <div className="hidden md:block w-px h-4 bg-slate-700" />
                <div className="flex items-center gap-2 text-slate-300">
                  <BadgeCheck className="h-4 w-4 text-blue-400" />
                  California Licensed
                </div>
              </div>

              {/* Main hero content */}
              <div className="text-center mb-12">
                <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6 transition-all duration-700 delay-100 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                  Stop calling lenders.
                  <br />
                  <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 bg-clip-text text-transparent">
                    Let them compete for you.
                  </span>
                </h1>
                <p className={`text-xl text-slate-400 max-w-2xl mx-auto mb-8 transition-all duration-700 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                  Tell us what you need in <span className="text-white font-medium">60 seconds</span>. We match you with California&apos;s top mortgage lenders who fight for your business.
                </p>

                {/* CTA buttons */}
                <div className={`flex flex-col sm:flex-row gap-4 justify-center mb-10 transition-all duration-700 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold text-lg h-14 px-8 rounded-xl shadow-lg shadow-amber-500/25 hover:shadow-xl hover:shadow-amber-500/30 hover:scale-[1.02] transition-all cursor-pointer"
                    asChild
                  >
                    <Link href="/get-quote">
                      Get My Free Quote <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-slate-700 bg-slate-900/50 text-white hover:bg-slate-800 hover:border-slate-600 font-medium text-lg h-14 px-8 rounded-xl transition-all cursor-pointer"
                    asChild
                  >
                    <Link href="/readiness-score">
                      <Target className="mr-2 h-5 w-5 text-violet-400" />
                      Check Readiness Score
                    </Link>
                  </Button>
                </div>

                {/* Quick trust points */}
                <div className={`flex flex-wrap justify-center gap-6 text-sm text-slate-400 transition-all duration-700 delay-400 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    No credit pull
                  </span>
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    100% free
                  </span>
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    No spam calls
                  </span>
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    Max 3 lenders contact you
                  </span>
                </div>
              </div>

              {/* Stats cards */}
              <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto transition-all duration-700 delay-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                {[
                  { value: "$2.4B+", label: "Loans Funded", icon: CircleDollarSign },
                  { value: "10,000+", label: "Happy Customers", icon: Users },
                  { value: "15 min", label: "Avg. Pre-Approval", icon: Timer },
                  { value: "$847", label: "Avg. Monthly Savings", icon: PiggyBank },
                ].map((stat, i) => (
                  <div key={i} className="bg-slate-900/60 backdrop-blur-sm border border-slate-800 rounded-2xl p-4 text-center hover:border-slate-700 transition-colors cursor-default">
                    <stat.icon className="h-6 w-6 text-amber-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-xs text-slate-500">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============ HOW IT WORKS ============ */}
        <section className="relative py-16 lg:py-24 border-t border-slate-800/50">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm font-medium mb-4">
                  <Zap className="h-4 w-4" />
                  Simple 3-step process
                </span>
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                  How LendyWendy Works
                </h2>
                <p className="text-slate-400 max-w-xl mx-auto">
                  No more cold calling banks. No more comparing rates yourself. We handle everything.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 relative">
                {/* Connector line */}
                <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-amber-500/50 via-violet-500/50 to-emerald-500/50" />

                {[
                  {
                    step: "1",
                    icon: Sparkles,
                    title: "Tell us your goals",
                    desc: "Answer a few quick questions about what you're looking for. Takes 60 seconds. No credit pull.",
                    color: "bg-amber-500",
                  },
                  {
                    step: "2",
                    icon: Users,
                    title: "Get matched instantly",
                    desc: "Our AI finds the 3 best California lenders for your exact situation. No spam, guaranteed.",
                    color: "bg-violet-500",
                  },
                  {
                    step: "3",
                    icon: Award,
                    title: "Compare & choose",
                    desc: "Lenders compete for your business. You pick the best rate and close with confidence.",
                    color: "bg-emerald-500",
                  },
                ].map((item, i) => (
                  <div key={i} className="relative">
                    <div className="bg-slate-900/60 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-all h-full">
                      <div className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center mb-4 relative z-10`}>
                        <item.icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="text-xs text-slate-500 font-medium mb-1">STEP {item.step}</div>
                      <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                      <p className="text-slate-400 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center mt-10">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold h-12 px-8 rounded-xl cursor-pointer"
                  asChild
                >
                  <Link href="/get-quote">
                    Start Now — It&apos;s Free <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* ============ WHY LENDYWENDY (COMPARISON) ============ */}
        <section className="relative py-16 lg:py-24 border-t border-slate-800/50">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium mb-4">
                  <Ban className="h-4 w-4" />
                  Why we&apos;re different
                </span>
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                  National sites sell your info.
                  <br />
                  <span className="text-amber-400">We protect it.</span>
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Other sites */}
                <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <XCircle className="h-6 w-6 text-red-400" />
                    <span className="font-semibold text-slate-400">Other mortgage sites</span>
                  </div>
                  <ul className="space-y-4">
                    {[
                      "Sell your info to 10+ lenders",
                      "Endless spam calls for weeks",
                      "Out-of-state call centers",
                      "One-size-fits-all rates",
                      "No help with complex loans",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-slate-500">
                        <XCircle className="h-5 w-5 text-red-400/60 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* LendyWendy */}
                <div className="bg-gradient-to-br from-amber-500/10 to-violet-500/10 border border-amber-500/30 rounded-2xl p-6 relative">
                  <div className="absolute top-0 right-0 bg-amber-500 text-slate-950 text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-xl">
                    LENDYWENDY
                  </div>
                  <div className="flex items-center gap-2 mb-6">
                    <CheckCircle2 className="h-6 w-6 text-amber-400" />
                    <span className="font-semibold text-white">The LendyWendy way</span>
                  </div>
                  <ul className="space-y-4">
                    {[
                      "You control who contacts you",
                      "Max 3 lenders, hand-picked for you",
                      "California-based local experts",
                      "AI finds your best loan type",
                      "DSCR, Non-QM, Commercial — we do it all",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-slate-200">
                        <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ LOAN TYPES ============ */}
        <section className="relative py-16 lg:py-24 border-t border-slate-800/50">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-10">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-4">
                  <Landmark className="h-4 w-4" />
                  Comprehensive coverage
                </span>
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                  Every Loan Type. One Place.
                </h2>
                <p className="text-slate-400">
                  First-time buyer? Seasoned investor? Business owner? We&apos;ve got you covered.
                </p>
              </div>

              {/* Loan type tabs */}
              <div className="flex justify-center mb-8">
                <div className="inline-flex p-1.5 bg-slate-900/80 backdrop-blur-sm rounded-xl border border-slate-800">
                  {Object.entries(loanTypes).map(([key, loan]) => (
                    <button
                      key={key}
                      onClick={() => setActiveLoanType(key)}
                      className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm transition-all cursor-pointer ${
                        activeLoanType === key
                          ? "bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 shadow-lg"
                          : "text-slate-400 hover:text-white hover:bg-slate-800"
                      }`}
                    >
                      <loan.icon className="h-4 w-4" />
                      {loan.title}
                    </button>
                  ))}
                </div>
              </div>

              {/* Loan content */}
              {(() => {
                const loan = loanTypes[activeLoanType as keyof typeof loanTypes];
                return (
                  <div className="bg-slate-900/60 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 lg:p-8">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-6">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2">{loan.title}</h3>
                        <p className="text-slate-400">{loan.desc}</p>
                      </div>
                      <div className="flex items-baseline gap-2 bg-slate-800/50 px-5 py-3 rounded-xl border border-slate-700">
                        <span className="text-sm text-slate-400">Rates from</span>
                        <span className="text-2xl font-bold text-amber-400">{loan.rate}</span>
                        <span className="text-sm text-slate-500">APR*</span>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
                      {loan.products.map((product, i) => (
                        <div key={i} className="flex items-start gap-3 bg-slate-800/30 rounded-xl p-3 border border-slate-700/50 hover:border-slate-600 transition-colors">
                          <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <div className="font-medium text-white text-sm">{product.name}</div>
                            <div className="text-xs text-slate-500">{product.desc}</div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button
                        className="bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold h-11 px-6 rounded-xl cursor-pointer"
                        asChild
                      >
                        <Link href="/get-quote">
                          Get Matched Now <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        className="border-slate-700 bg-slate-800/50 text-white hover:bg-slate-700 h-11 px-6 rounded-xl cursor-pointer"
                        asChild
                      >
                        <Link href={loan.href}>
                          Learn More <ArrowUpRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>

                    <p className="text-xs text-slate-600 mt-4">
                      *Rates for illustration. Your rate depends on credit, loan amount, property type, and market.
                    </p>
                  </div>
                );
              })()}
            </div>
          </div>
        </section>

        {/* ============ READINESS SCORE CTA ============ */}
        <section className="relative py-16 lg:py-24 border-t border-slate-800/50 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-transparent to-violet-500/5" />
          <div className="container mx-auto px-4 relative">
            <div className="max-w-5xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-10 items-center">
                <div>
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-4">
                    <Target className="h-4 w-4" />
                    Not ready to apply yet?
                  </span>
                  <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                    Check Your Mortgage Readiness Score
                  </h2>
                  <p className="text-slate-400 mb-6">
                    Our free 2-minute assessment tells you exactly where you stand. Get personalized tips to improve your approval odds — <strong className="text-white">no lender contact, no credit pull</strong>.
                  </p>
                  <ul className="space-y-3 mb-8">
                    {[
                      "See your estimated approval odds",
                      "Get personalized improvement tips",
                      "Know what loan types fit your situation",
                      "Identify issues before applying",
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-slate-300">
                        <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-emerald-500 to-emerald-400 hover:from-emerald-400 hover:to-emerald-300 text-slate-950 font-bold h-14 px-8 rounded-xl cursor-pointer"
                    asChild
                  >
                    <Link href="/readiness-score">
                      Check My Score — Free <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>

                {/* Score visualization */}
                <div className="flex justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-violet-500/20 rounded-full blur-3xl" />
                    <div className="relative w-56 h-56 rounded-full bg-slate-900/80 backdrop-blur-xl border border-slate-700 flex flex-col items-center justify-center">
                      <div className="text-6xl font-bold text-white mb-1">87</div>
                      <div className="text-emerald-400 font-semibold">Great</div>
                      <div className="text-xs text-slate-500 mt-1">Readiness Score</div>
                    </div>
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-slate-900 border border-slate-700 rounded-full text-sm text-slate-400">
                      Takes 2 minutes
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ TESTIMONIALS ============ */}
        <section className="relative py-16 lg:py-24 border-t border-slate-800/50">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-medium mb-4">
                  <ThumbsUp className="h-4 w-4" />
                  Real results
                </span>
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                  Trusted by 10,000+ Californians
                </h2>
                <div className="flex items-center justify-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-slate-400">4.9/5 from 2,500+ reviews</span>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-5">
                {[
                  {
                    quote: "Pre-approved in 5 minutes. Rate was 0.375% lower than my bank. Saved over $200/month!",
                    name: "Maria S.",
                    detail: "First-time buyer, San Diego",
                    type: "FHA Loan",
                    saved: "$72K lifetime",
                  },
                  {
                    quote: "Finally found a lender who does DSCR loans for my rental portfolio. Closed 5 properties in 3 months.",
                    name: "James T.",
                    detail: "Real estate investor, LA",
                    type: "DSCR Loan",
                    saved: "$156K lifetime",
                  },
                  {
                    quote: "The Readiness Score showed me exactly what to fix. Bought my first home 3 months later.",
                    name: "Sarah K.",
                    detail: "Homeowner, Sacramento",
                    type: "Conventional",
                    saved: "$48K lifetime",
                  },
                ].map((t, i) => (
                  <div key={i} className="bg-slate-900/60 backdrop-blur-sm border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-all">
                    <div className="flex gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-slate-300 text-sm mb-4">&quot;{t.quote}&quot;</p>
                    <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                      <div>
                        <p className="font-semibold text-white text-sm">{t.name}</p>
                        <p className="text-xs text-slate-500">{t.detail}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-slate-500">{t.type}</p>
                        <p className="font-semibold text-emerald-400 text-sm">{t.saved}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============ CALIFORNIA COVERAGE ============ */}
        <section className="relative py-16 lg:py-24 border-t border-slate-800/50">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto text-center">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-4">
                <MapPin className="h-4 w-4" />
                Statewide coverage
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                Local Experts Across California
              </h2>
              <p className="text-slate-400 mb-10 max-w-2xl mx-auto">
                We partner with vetted, licensed loan officers who know your local market.
              </p>

              {/* Major markets */}
              <div className="flex flex-wrap justify-center gap-3 mb-6">
                {[
                  "Los Angeles", "San Francisco", "San Diego", "San Jose", "Sacramento", "Orange County",
                ].map((city) => (
                  <Link
                    key={city}
                    href={`/california/${city.toLowerCase().replace(" ", "-")}`}
                    className="flex items-center gap-2 px-5 py-2.5 bg-slate-900/80 border border-slate-700 rounded-full text-white font-medium hover:bg-slate-800 hover:border-slate-600 transition-all cursor-pointer"
                  >
                    <MapPin className="h-4 w-4 text-amber-400" />
                    {city}
                  </Link>
                ))}
              </div>

              {/* Secondary markets */}
              <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mb-10 text-sm">
                {[
                  "Palo Alto", "Mountain View", "Fremont", "Berkeley", "Walnut Creek",
                  "San Mateo", "Redwood City", "Pleasanton", "Irvine", "Long Beach",
                  "Pasadena", "Santa Monica", "Anaheim", "Riverside",
                ].map((city) => (
                  <Link
                    key={city}
                    href={`/california/${city.toLowerCase().replace(" ", "-")}`}
                    className="text-slate-500 hover:text-white transition-colors cursor-pointer"
                  >
                    {city}
                  </Link>
                ))}
                <Link href="/california" className="text-amber-400 hover:text-amber-300 transition-colors cursor-pointer">
                  View all 29 cities →
                </Link>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-500">
                <span className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-amber-400" />
                  NMLS #1945913
                </span>
                <span className="flex items-center gap-2">
                  <BadgeCheck className="h-5 w-5 text-emerald-400" />
                  California DRE Licensed
                </span>
                <span className="flex items-center gap-2">
                  <Home className="h-5 w-5 text-blue-400" />
                  Equal Housing Opportunity
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ============ FAQ ============ */}
        <section className="relative py-16 lg:py-24 border-t border-slate-800/50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-10">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm font-medium mb-4">
                  <BookOpen className="h-4 w-4" />
                  Common questions
                </span>
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                  Frequently Asked Questions
                </h2>
              </div>

              <div className="space-y-3">
                {faqs.map((faq, i) => (
                  <div
                    key={i}
                    className="bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden hover:border-slate-700 transition-colors"
                  >
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                      className="w-full flex items-center justify-between p-4 text-left cursor-pointer"
                    >
                      <span className="font-medium text-white pr-4">{faq.q}</span>
                      <ChevronDown className={`h-5 w-5 text-slate-500 flex-shrink-0 transition-transform ${expandedFaq === i ? 'rotate-180' : ''}`} />
                    </button>
                    {expandedFaq === i && (
                      <div className="px-4 pb-4 text-slate-400 text-sm">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="text-center mt-8">
                <p className="text-slate-500 text-sm mb-4">Have more questions?</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button variant="outline" className="border-slate-700 bg-slate-800/50 text-white hover:bg-slate-700 cursor-pointer" asChild>
                    <Link href="/readiness-score">
                      <Target className="mr-2 h-4 w-4" />
                      Check Readiness Score
                    </Link>
                  </Button>
                  <Button className="bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 font-bold cursor-pointer" asChild>
                    <Link href="/get-quote">
                      Get My Free Quote
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ FINAL CTA ============ */}
        <section className="relative py-20 lg:py-28 border-t border-slate-800/50">
          <div className="absolute inset-0 bg-gradient-to-t from-amber-500/10 via-transparent to-transparent" />
          <div className="container mx-auto px-4 relative">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
                Ready to find your best rate?
              </h2>
              <p className="text-xl text-slate-400 mb-10">
                Join 10,000+ California homeowners who found better rates. It takes 60 seconds.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold text-lg h-16 px-10 rounded-xl shadow-lg shadow-amber-500/25 hover:shadow-xl hover:shadow-amber-500/30 transition-all cursor-pointer"
                  asChild
                >
                  <Link href="/get-quote">
                    Get My Free Quote <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-slate-700 bg-slate-900/50 text-white hover:bg-slate-800 font-medium text-lg h-16 px-10 rounded-xl cursor-pointer"
                  asChild
                >
                  <Link href="tel:+18005551234">
                    <Phone className="mr-2 h-5 w-5" /> (800) 555-1234
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* ============ FOOTER ============ */}
        <footer className="border-t border-slate-800/50 py-10">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
                    <span className="text-slate-950 font-bold">W</span>
                  </div>
                  <span className="text-white font-semibold">LendyWendy</span>
                </div>
                <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-500">
                  <Link href="/about" className="hover:text-white transition-colors cursor-pointer">About</Link>
                  <Link href="/california" className="hover:text-white transition-colors cursor-pointer">Locations</Link>
                  <Link href="/calculators" className="hover:text-white transition-colors cursor-pointer">Calculators</Link>
                  <Link href="/articles" className="hover:text-white transition-colors cursor-pointer">Resources</Link>
                  <Link href="/contact" className="hover:text-white transition-colors cursor-pointer">Contact</Link>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-slate-800/50 text-center text-xs text-slate-600">
                <p>© 2026 LendyWendy. NMLS #1945913. Equal Housing Opportunity.</p>
                <p className="mt-2">
                  LendyWendy is a mortgage broker licensed in California. We are not a direct lender.
                </p>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
