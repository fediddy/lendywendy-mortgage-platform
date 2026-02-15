"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { StructuredData } from "@/components/seo/StructuredData";
import {
  Building2,
  TrendingUp,
  ArrowRight,
  Shield,
  Clock,
  Zap,
  Star,
  MapPin,
  BadgeCheck,
  CheckCircle2,
  Timer,
  Wallet,
  FileX,
  Layers,
  Calculator,
  Target,
  DollarSign,
  CalendarClock,
  Home,
  Briefcase,
  BarChart3,
  ArrowUpRight,
  Users,
  ChevronRight,
} from "lucide-react";

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const [calcValues, setCalcValues] = useState({
    propertyValue: 500000,
    loanAmount: 400000,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  // Simple rate calculation for demo
  const estimatedRate = 7.5;
  const monthlyPayment = Math.round(
    (calcValues.loanAmount * (estimatedRate / 100 / 12) * Math.pow(1 + estimatedRate / 100 / 12, 360)) /
    (Math.pow(1 + estimatedRate / 100 / 12, 360) - 1)
  );
  const ltv = Math.round((calcValues.loanAmount / calcValues.propertyValue) * 100);

  const investorLoans = [
    {
      name: "DSCR Loans",
      tagline: "Qualify on rental income, not your W2",
      features: ["No tax returns", "No employment verification", "1.0+ DSCR ratio", "Up to 80% LTV"],
      rate: "7.5%",
      icon: Wallet,
      highlight: true,
    },
    {
      name: "Fix & Flip",
      tagline: "Close fast, renovate, profit",
      features: ["7-14 day close", "Up to 90% LTC", "Interest-only payments", "Rehab draws included"],
      rate: "10.5%",
      icon: TrendingUp,
    },
    {
      name: "Bridge Loans",
      tagline: "Short-term capital for quick acquisitions",
      features: ["Close in 10 days", "12-24 month terms", "Interest-only", "No prepay penalty"],
      rate: "9.5%",
      icon: CalendarClock,
    },
    {
      name: "Portfolio Loans",
      tagline: "Scale to 100+ properties under one loan",
      features: ["5-100+ properties", "Blanket financing", "Cross-collateralization", "Custom structuring"],
      rate: "7.75%",
      icon: Layers,
    },
  ];

  return (
    <>
      <StructuredData
        type="home"
        pageTitle="LendyWendy | Investor Loans California | DSCR, Fix & Flip, Bridge Financing"
        pageDescription="Close your next investment property in 14 days. DSCR loans with no tax returns, fix-and-flip financing, bridge loans, portfolio lending. Built for California real estate investors."
        pageUrl="/"
      />

      <main className="min-h-screen bg-white text-gray-900 overflow-hidden">

        {/* ============ HERO - INVESTOR FOCUSED ============ */}
        <section className="relative pt-6 pb-16 lg:pt-10 lg:pb-24 overflow-hidden">
          {/* Hero background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
          {/* Decorative orbs */}
          <div className="absolute top-20 right-[10%] w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-[5%] w-[400px] h-[400px] bg-teal-600/8 rounded-full blur-[100px]" />
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-6xl mx-auto">
              {/* Compact trust bar */}
              <div className={`flex flex-wrap items-center justify-center gap-6 mb-8 text-sm transition-all duration-500 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
                <div className="flex items-center gap-2 text-slate-400">
                  <Shield className="h-4 w-4 text-teal-400" />
                  <span>Free Service</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <BarChart3 className="h-4 w-4 text-teal-400" />
                  <span><strong className="text-white">15+</strong> California Lenders</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <Timer className="h-4 w-4 text-teal-400" />
                  <span><strong className="text-white">14-Day</strong> Avg Lender Close</span>
                </div>
              </div>

              {/* Hero content */}
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Left - Message */}
                <div className={`transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-300 text-sm font-medium mb-6">
                    <Zap className="h-4 w-4" />
                    Built for investors who move fast
                  </div>

                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6 text-white">
                    Close your next deal
                    <br />
                    <span className="bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
                      in 14 days.
                    </span>
                  </h1>

                  <p className="text-xl text-slate-400 mb-8 max-w-lg">
                    DSCR loans with <strong className="text-white">no tax returns</strong>. Fix-and-flip in 7 days. Scale to 100+ properties. California investor lending that moves at your speed.
                  </p>

                  {/* Key value props */}
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {[
                      { icon: FileX, text: "No tax returns" },
                      { icon: Timer, text: "7-14 day close" },
                      { icon: Layers, text: "Unlimited properties" },
                      { icon: Wallet, text: "Qualify on rent" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 text-slate-300">
                        <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                          <item.icon className="h-4 w-4 text-teal-400" />
                        </div>
                        <span className="text-sm font-medium">{item.text}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-white font-bold text-lg h-14 px-8 rounded-xl shadow-lg shadow-teal-500/25 hover:shadow-xl hover:shadow-teal-500/30 hover:scale-[1.02] transition-all cursor-pointer"
                      asChild
                    >
                      <Link href="/get-quote">
                        Compare Investor Rates <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-white/20 bg-white/5 text-white hover:bg-white/10 font-medium h-14 px-6 rounded-xl cursor-pointer"
                      asChild
                    >
                      <Link href="/investment">
                        View Loan Programs <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                  </div>
                </div>

                {/* Right - Quick Rate Calculator */}
                <div className={`transition-all duration-700 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                  <div className="bg-white/[0.07] backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl shadow-black/20">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-xl bg-teal-500/20 flex items-center justify-center">
                        <Calculator className="h-5 w-5 text-teal-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">Quick Rate Estimate</h3>
                        <p className="text-xs text-slate-400">Estimate from Our Lender Network</p>
                      </div>
                    </div>

                    <div className="space-y-4 mb-6">
                      <div>
                        <label className="text-sm text-slate-400 mb-2 block">Property Value</label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                          <input
                            type="number"
                            value={calcValues.propertyValue}
                            onChange={(e) => setCalcValues(prev => ({ ...prev, propertyValue: Number(e.target.value) }))}
                            className="w-full bg-white/5 border border-white/10 rounded-xl pl-8 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/50 placeholder-slate-500"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm text-slate-400 mb-2 block">Loan Amount</label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                          <input
                            type="number"
                            value={calcValues.loanAmount}
                            onChange={(e) => setCalcValues(prev => ({ ...prev, loanAmount: Number(e.target.value) }))}
                            className="w-full bg-white/5 border border-white/10 rounded-xl pl-8 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/50 placeholder-slate-500"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-4">
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold text-teal-400">{estimatedRate}%</div>
                          <div className="text-xs text-slate-400">Est. Rate</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-white">${monthlyPayment.toLocaleString()}</div>
                          <div className="text-xs text-slate-400">Monthly</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-white">{ltv}%</div>
                          <div className="text-xs text-slate-400">LTV</div>
                        </div>
                      </div>
                    </div>

                    <Button
                      className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-white font-bold h-12 rounded-xl shadow-lg shadow-teal-500/20 cursor-pointer"
                      asChild
                    >
                      <Link href="/get-quote">
                        Compare Lender Rates <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>

                    <p className="text-xs text-slate-500 text-center mt-3">
                      Rates shown are estimates from our lender network. Actual rates vary by lender, credit score, and property.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Hero bottom wave/curve transition */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none">
              <path d="M0 60V30C240 5 480 0 720 10C960 20 1200 40 1440 30V60H0Z" fill="white" />
            </svg>
          </div>
        </section>

        {/* ============ INVESTOR LOAN PRODUCTS ============ */}
        <section className="relative py-16 lg:py-24">
          {/* Subtle background texture */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-teal-50 rounded-full blur-[150px] opacity-50" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-14">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-700 text-sm font-medium mb-4">
                  <TrendingUp className="h-4 w-4" />
                  Investment Products
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                  Investor Loan Products
                </h2>
                <p className="text-gray-500 max-w-2xl mx-auto text-lg">
                  Purpose-built financing for real estate investors. No W2s. No tax returns. Just results.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {investorLoans.map((loan, i) => (
                  <div
                    key={i}
                    className={`group relative bg-white border rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer ${
                      loan.highlight
                        ? 'border-teal-200 shadow-md shadow-teal-500/5 ring-1 ring-teal-100'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {loan.highlight && (
                      <div className="absolute -top-3 left-6 px-3 py-1 bg-gradient-to-r from-teal-600 to-emerald-600 text-white text-xs font-bold rounded-full shadow-md shadow-teal-600/20">
                        MOST POPULAR
                      </div>
                    )}

                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                          loan.highlight ? 'bg-teal-50 group-hover:bg-teal-100' : 'bg-gray-50 group-hover:bg-gray-100'
                        }`}>
                          <loan.icon className={`h-6 w-6 ${loan.highlight ? 'text-teal-600' : 'text-gray-500 group-hover:text-teal-600'} transition-colors`} />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 text-lg">{loan.name}</h3>
                          <p className="text-sm text-gray-500">{loan.tagline}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-500">From</div>
                        <div className="text-xl font-bold text-teal-600">{loan.rate}</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {loan.features.map((feature, j) => (
                        <div key={j} className="flex items-center gap-2 text-sm text-gray-600">
                          <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                          {feature}
                        </div>
                      ))}
                    </div>

                    <Button
                      variant="outline"
                      className="w-full border-gray-200 bg-gray-50 text-gray-900 hover:bg-teal-50 hover:border-teal-200 hover:text-teal-700 h-10 rounded-xl cursor-pointer transition-colors"
                      asChild
                    >
                      <Link href="/get-quote">
                        Get {loan.name} Rates <ArrowUpRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </section>

        {/* ============ PRIMARY RESIDENCE LOANS ============ */}
        <section className="relative py-16 lg:py-24 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-14">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-sm font-medium mb-4">
                  <Home className="h-4 w-4" />
                  Primary Residence Loans
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                  Buying Your Home? We Do That Too.
                </h2>
                <p className="text-gray-500 max-w-2xl mx-auto text-lg">
                  Conventional, FHA, VA, and Jumbo loans for California homebuyers. First-time buyers welcome.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {[
                  {
                    name: "Conventional",
                    tagline: "Most popular choice",
                    rate: "6.5%",
                    highlight: "3% down",
                    features: ["620+ credit score", "PMI cancellable at 80%", "Up to $832,750"],
                    href: "/residential/conventional",
                  },
                  {
                    name: "FHA Loans",
                    tagline: "First-time buyer friendly",
                    rate: "6.25%",
                    highlight: "3.5% down",
                    features: ["580+ credit score", "Gift funds allowed", "Seller concessions up to 6%"],
                    href: "/residential/fha",
                  },
                  {
                    name: "VA Loans",
                    tagline: "For veterans & military",
                    rate: "6.0%",
                    highlight: "$0 down",
                    features: ["No PMI ever", "No down payment", "Competitive rates"],
                    href: "/residential/va",
                  },
                  {
                    name: "Jumbo Loans",
                    tagline: "Luxury & high-value homes",
                    rate: "6.75%",
                    highlight: "Above $832K",
                    features: ["Up to $5M+", "10% down options", "Interest-only available"],
                    href: "/residential/jumbo",
                  },
                ].map((loan, i) => (
                  <Link
                    key={i}
                    href={loan.href}
                    className="group bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-lg hover:border-blue-200 transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-bold text-gray-900">{loan.name}</h3>
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                        {loan.highlight}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mb-3">{loan.tagline}</p>
                    <div className="text-2xl font-bold text-blue-600 mb-3">
                      From {loan.rate}
                    </div>
                    <div className="space-y-1.5 mb-4">
                      {loan.features.map((f, j) => (
                        <div key={j} className="flex items-center gap-2 text-xs text-gray-500">
                          <CheckCircle2 className="h-3 w-3 text-emerald-500 flex-shrink-0" />
                          {f}
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center text-sm font-medium text-blue-600 group-hover:text-blue-700 transition-colors">
                      Learn more <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                ))}
              </div>

              <div className="mt-10 text-center">
                <Button
                  variant="outline"
                  className="border-gray-200 bg-white text-gray-900 hover:bg-gray-50 font-medium rounded-xl cursor-pointer shadow-sm"
                  asChild
                >
                  <Link href="/residential">
                    View All Residential Programs <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* ============ SPEED + CREDIBILITY STATS ============ */}
        <section className="relative py-16 lg:py-20 overflow-hidden">
          {/* Dark navy background for contrast */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
          <div className="absolute top-0 right-[20%] w-[400px] h-[400px] bg-teal-500/10 rounded-full blur-[120px]" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-3">
                  Why California Investors Choose Us
                </h2>
                <p className="text-slate-400 text-lg">Numbers that speak for themselves.</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { value: "14", unit: "days", label: "Avg. Lender Close Time", icon: Timer },
                  { value: "15+", unit: "", label: "Lender Partners", icon: Briefcase },
                  { value: "60", unit: "sec", label: "Rate Comparison", icon: DollarSign },
                  { value: "100+", unit: "", label: "Max properties financed", icon: Building2 },
                ].map((stat, i) => (
                  <div key={i} className="text-center bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                    <div className="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center mx-auto mb-4">
                      <stat.icon className="h-6 w-6 text-teal-400" />
                    </div>
                    <div className="text-3xl lg:text-4xl font-bold text-white">
                      {stat.value}<span className="text-lg text-slate-400">{stat.unit}</span>
                    </div>
                    <div className="text-sm text-slate-400 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============ INVESTOR TESTIMONIALS ============ */}
        <section className="relative py-16 lg:py-24 bg-gradient-to-b from-white to-gray-50">
          <div className="absolute bottom-0 left-[10%] w-[500px] h-[500px] bg-emerald-50 rounded-full blur-[150px] opacity-60" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-14">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-sm font-medium mb-4">
                  <Star className="h-4 w-4" />
                  Testimonials
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                  What Borrowers Say
                </h2>
                <p className="text-gray-500 text-lg">Real investors, real results.</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    quote: "Lost 3 deals waiting on traditional lenders. LendyWendy matched me with a lender who closed my last 5 properties in under 14 days each. Game changer.",
                    name: "Marcus R.",
                    detail: "12-property portfolio, Los Angeles",
                    metric: "Matched in 24 hours",
                  },
                  {
                    quote: "DSCR loan with no tax returns was exactly what I needed. Self-employed for 15 years and finally found a lender who gets it.",
                    name: "Jennifer L.",
                    detail: "Fix & flip investor, San Diego",
                    metric: "Saved $400/mo",
                  },
                  {
                    quote: "Scaled from 3 to 18 properties in one year. Their portfolio loan let me consolidate and keep growing.",
                    name: "David K.",
                    detail: "Portfolio investor, Bay Area",
                    metric: "Closed in 12 days",
                  },
                ].map((t, i) => (
                  <div key={i} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300">
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed mb-6">&quot;{t.quote}&quot;</p>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                        <p className="text-xs text-gray-500">{t.detail}</p>
                      </div>
                      <div className="text-right">
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                          <CheckCircle2 className="h-3 w-3" />
                          {t.metric}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============ CALIFORNIA MARKETS ============ */}
        <section className="relative py-16 lg:py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-700 text-sm font-medium mb-4">
                <MapPin className="h-4 w-4" />
                Service Areas
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                California Investor Markets
              </h2>
              <p className="text-gray-500 mb-10 text-lg">
                Local expertise in every major California investment market.
              </p>

              <div className="flex flex-wrap justify-center gap-3 mb-8">
                {[
                  "Los Angeles", "San Francisco", "San Diego", "Sacramento", "Oakland", "San Jose",
                ].map((city) => (
                  <Link
                    key={city}
                    href={`/california/${city.toLowerCase().replace(" ", "-")}`}
                    className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-full text-gray-900 font-medium shadow-sm hover:shadow-md hover:border-teal-200 hover:bg-teal-50 transition-all duration-200 cursor-pointer"
                  >
                    <MapPin className="h-4 w-4 text-teal-600" />
                    {city}
                  </Link>
                ))}
              </div>

              <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm">
                {[
                  "Fresno", "Long Beach", "Bakersfield", "Riverside", "Stockton", "Fremont", "Irvine",
                ].map((city) => (
                  <Link
                    key={city}
                    href={`/california/${city.toLowerCase().replace(" ", "-")}`}
                    className="text-gray-500 hover:text-teal-700 transition-colors cursor-pointer"
                  >
                    {city}
                  </Link>
                ))}
                <Link href="/california" className="text-teal-600 font-medium hover:text-teal-700 cursor-pointer">
                  All 29 markets →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ============ FINAL CTA ============ */}
        <section className="relative py-20 lg:py-28 overflow-hidden">
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-teal-600 via-teal-700 to-emerald-700" />
          <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
          <div className="absolute top-[20%] left-[10%] w-[400px] h-[400px] bg-white/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-[10%] right-[10%] w-[300px] h-[300px] bg-emerald-500/20 rounded-full blur-[100px]" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
                Stop losing deals to slow lenders.
              </h2>
              <p className="text-xl text-teal-100 mb-10">
                Get investor rates in 60 seconds. Close in as fast as 7 days.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-white text-teal-700 hover:bg-gray-100 font-bold text-lg h-16 px-10 rounded-xl shadow-lg shadow-black/10 hover:shadow-xl hover:scale-[1.02] transition-all cursor-pointer"
                  asChild
                >
                  <Link href="/get-quote">
                    Compare Investor Rates <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 bg-white/10 text-white hover:bg-white/20 font-medium text-lg h-16 px-10 rounded-xl cursor-pointer"
                  asChild
                >
                  <Link href="/investment">
                    View Loan Programs <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Disclosure section */}
        <div className="bg-gray-100 border-t border-gray-200 py-6">
          <div className="container mx-auto px-4">
            <p className="text-xs text-gray-400 text-center max-w-4xl mx-auto">
              LendyWendy is a free service that connects borrowers with mortgage lenders. We are not a lender and do not make loans.
              We may receive compensation from lender partners when you are matched. Rates and terms shown are estimates from our lender
              network and are for informational purposes only. Actual rates, terms, and availability vary by lender and are subject to
              change without notice. All loan applications are subject to lender approval, credit review, and underwriting.
              Equal Housing Opportunity.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
