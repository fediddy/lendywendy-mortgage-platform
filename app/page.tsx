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
  Phone,
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
        pageDescription="Close your next investment property in 14 days. DSCR loans with no tax returns, fix-and-flip financing, bridge loans, portfolio lending. Built for California real estate investors. NMLS #1945913."
        pageUrl="/"
      />

      <main className="min-h-screen bg-slate-950 text-white overflow-hidden">
        {/* Subtle ambient background */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[120px]" />
        </div>

        {/* ============ HERO - INVESTOR FOCUSED ============ */}
        <section className="relative pt-6 pb-16 lg:pt-10 lg:pb-24">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              {/* Compact trust bar */}
              <div className={`flex flex-wrap items-center justify-center gap-6 mb-8 text-sm transition-all duration-500 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
                <div className="flex items-center gap-2 text-slate-400">
                  <Shield className="h-4 w-4 text-amber-400" />
                  <span>NMLS #1945913</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <BarChart3 className="h-4 w-4 text-emerald-400" />
                  <span><strong className="text-white">$2.4B+</strong> investor loans funded</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <Timer className="h-4 w-4 text-amber-400" />
                  <span><strong className="text-white">14-day</strong> avg close</span>
                </div>
              </div>

              {/* Hero content */}
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Left - Message */}
                <div className={`transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-6">
                    <Zap className="h-4 w-4" />
                    Built for investors who move fast
                  </div>

                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6">
                    Close your next deal
                    <br />
                    <span className="bg-gradient-to-r from-amber-400 to-amber-300 bg-clip-text text-transparent">
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
                        <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center">
                          <item.icon className="h-4 w-4 text-amber-400" />
                        </div>
                        <span className="text-sm font-medium">{item.text}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold text-lg h-14 px-8 rounded-xl shadow-lg shadow-amber-500/20 hover:shadow-xl hover:shadow-amber-500/25 hover:scale-[1.02] transition-all cursor-pointer"
                      asChild
                    >
                      <Link href="/get-quote">
                        Get Investor Rates <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-slate-700 bg-slate-900/50 text-white hover:bg-slate-800 font-medium h-14 px-6 rounded-xl cursor-pointer"
                      asChild
                    >
                      <Link href="tel:+18005551234">
                        <Phone className="mr-2 h-5 w-5" />
                        (800) 555-1234
                      </Link>
                    </Button>
                  </div>
                </div>

                {/* Right - Quick Rate Calculator */}
                <div className={`transition-all duration-700 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                  <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                        <Calculator className="h-5 w-5 text-amber-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">Quick Rate Estimate</h3>
                        <p className="text-xs text-slate-500">DSCR Loan Calculator</p>
                      </div>
                    </div>

                    <div className="space-y-4 mb-6">
                      <div>
                        <label className="text-sm text-slate-400 mb-2 block">Property Value</label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                          <input
                            type="number"
                            value={calcValues.propertyValue}
                            onChange={(e) => setCalcValues(prev => ({ ...prev, propertyValue: Number(e.target.value) }))}
                            className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-8 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm text-slate-400 mb-2 block">Loan Amount</label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                          <input
                            type="number"
                            value={calcValues.loanAmount}
                            onChange={(e) => setCalcValues(prev => ({ ...prev, loanAmount: Number(e.target.value) }))}
                            className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-8 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-800/50 rounded-xl p-4 mb-4">
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold text-amber-400">{estimatedRate}%</div>
                          <div className="text-xs text-slate-500">Est. Rate</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-white">${monthlyPayment.toLocaleString()}</div>
                          <div className="text-xs text-slate-500">Monthly</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-white">{ltv}%</div>
                          <div className="text-xs text-slate-500">LTV</div>
                        </div>
                      </div>
                    </div>

                    <Button
                      className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold h-12 rounded-xl cursor-pointer"
                      asChild
                    >
                      <Link href="/get-quote">
                        Get Exact Rate <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>

                    <p className="text-xs text-slate-600 text-center mt-3">
                      Estimate only. Actual rate based on DSCR, credit, and property.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============ INVESTOR LOAN PRODUCTS ============ */}
        <section className="relative py-16 lg:py-20 border-t border-slate-800/50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                  Investor Loan Products
                </h2>
                <p className="text-slate-400 max-w-2xl mx-auto">
                  Purpose-built financing for real estate investors. No W2s. No tax returns. Just results.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {investorLoans.map((loan, i) => (
                  <div
                    key={i}
                    className={`relative bg-slate-900/60 backdrop-blur-sm border rounded-2xl p-6 hover:border-slate-600 transition-all cursor-pointer ${
                      loan.highlight ? 'border-amber-500/50' : 'border-slate-800'
                    }`}
                  >
                    {loan.highlight && (
                      <div className="absolute -top-3 left-6 px-3 py-1 bg-amber-500 text-slate-950 text-xs font-bold rounded-full">
                        MOST POPULAR
                      </div>
                    )}

                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          loan.highlight ? 'bg-amber-500/20' : 'bg-slate-800'
                        }`}>
                          <loan.icon className={`h-6 w-6 ${loan.highlight ? 'text-amber-400' : 'text-slate-400'}`} />
                        </div>
                        <div>
                          <h3 className="font-bold text-white text-lg">{loan.name}</h3>
                          <p className="text-sm text-slate-500">{loan.tagline}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-slate-500">From</div>
                        <div className="text-xl font-bold text-amber-400">{loan.rate}</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {loan.features.map((feature, j) => (
                        <div key={j} className="flex items-center gap-2 text-sm text-slate-300">
                          <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                          {feature}
                        </div>
                      ))}
                    </div>

                    <Button
                      variant="outline"
                      className="w-full border-slate-700 bg-slate-800/50 text-white hover:bg-slate-700 h-10 rounded-xl cursor-pointer"
                      asChild
                    >
                      <Link href="/get-quote">
                        Get {loan.name} Rates <ArrowUpRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                ))}
              </div>

              {/* Also offer residential */}
              <div className="mt-8 text-center">
                <p className="text-slate-500 text-sm">
                  Also offering <Link href="/residential" className="text-amber-400 hover:text-amber-300 cursor-pointer">conventional, FHA, VA, and jumbo loans</Link> for primary residences.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============ SPEED + CREDIBILITY STATS ============ */}
        <section className="relative py-16 lg:py-20 border-t border-slate-800/50 bg-slate-900/30">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { value: "14", unit: "days", label: "Average close time", icon: Timer },
                  { value: "1,200+", unit: "", label: "Investor clients", icon: Briefcase },
                  { value: "$847", unit: "/mo", label: "Avg. savings vs bank", icon: DollarSign },
                  { value: "100+", unit: "", label: "Max properties financed", icon: Building2 },
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <stat.icon className="h-8 w-8 text-amber-400 mx-auto mb-3" />
                    <div className="text-3xl lg:text-4xl font-bold text-white">
                      {stat.value}<span className="text-lg text-slate-500">{stat.unit}</span>
                    </div>
                    <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============ INVESTOR TESTIMONIALS ============ */}
        <section className="relative py-16 lg:py-20 border-t border-slate-800/50">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                  What Investors Say
                </h2>
                <div className="flex items-center justify-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-slate-400">4.9/5 from 500+ investor reviews</span>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    quote: "Lost 3 deals waiting on traditional lenders. LendyWendy closed my last 5 properties in under 14 days each. Game changer.",
                    name: "Marcus R.",
                    detail: "12-property portfolio, Los Angeles",
                    metric: "5 closes in 90 days",
                  },
                  {
                    quote: "DSCR loan with no tax returns was exactly what I needed. Self-employed for 15 years and finally found a lender who gets it.",
                    name: "Jennifer L.",
                    detail: "Fix & flip investor, San Diego",
                    metric: "$2.4M funded",
                  },
                  {
                    quote: "Scaled from 3 to 18 properties in one year. Their portfolio loan let me consolidate and keep growing.",
                    name: "David K.",
                    detail: "Portfolio investor, Bay Area",
                    metric: "15 properties added",
                  },
                ].map((t, i) => (
                  <div key={i} className="bg-slate-900/60 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-all">
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-slate-300 text-sm mb-6">&quot;{t.quote}&quot;</p>
                    <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                      <div>
                        <p className="font-semibold text-white text-sm">{t.name}</p>
                        <p className="text-xs text-slate-500">{t.detail}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-emerald-400 text-sm">{t.metric}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============ CALIFORNIA MARKETS ============ */}
        <section className="relative py-16 lg:py-20 border-t border-slate-800/50">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto text-center">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                California Investor Markets
              </h2>
              <p className="text-slate-400 mb-10">
                Local expertise in every major California investment market.
              </p>

              <div className="flex flex-wrap justify-center gap-3 mb-8">
                {[
                  "Los Angeles", "San Francisco", "San Diego", "Sacramento", "Oakland", "San Jose",
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

              <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm">
                {[
                  "Fresno", "Long Beach", "Bakersfield", "Riverside", "Stockton", "Fremont", "Irvine",
                ].map((city) => (
                  <Link
                    key={city}
                    href={`/california/${city.toLowerCase().replace(" ", "-")}`}
                    className="text-slate-500 hover:text-white transition-colors cursor-pointer"
                  >
                    {city}
                  </Link>
                ))}
                <Link href="/california" className="text-amber-400 hover:text-amber-300 cursor-pointer">
                  All 29 markets →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ============ FINAL CTA ============ */}
        <section className="relative py-20 lg:py-28 border-t border-slate-800/50">
          <div className="absolute inset-0 bg-gradient-to-t from-amber-500/5 via-transparent to-transparent" />
          <div className="container mx-auto px-4 relative">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
                Stop losing deals to slow lenders.
              </h2>
              <p className="text-xl text-slate-400 mb-10">
                Get investor rates in 60 seconds. Close in as fast as 7 days.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold text-lg h-16 px-10 rounded-xl shadow-lg shadow-amber-500/20 hover:shadow-xl hover:shadow-amber-500/25 transition-all cursor-pointer"
                  asChild
                >
                  <Link href="/get-quote">
                    Get Investor Rates <ArrowRight className="ml-2 h-5 w-5" />
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
                  <Link href="/investment" className="hover:text-white transition-colors cursor-pointer">Investment Loans</Link>
                  <Link href="/residential" className="hover:text-white transition-colors cursor-pointer">Home Loans</Link>
                  <Link href="/commercial" className="hover:text-white transition-colors cursor-pointer">Commercial</Link>
                  <Link href="/california" className="hover:text-white transition-colors cursor-pointer">Markets</Link>
                  <Link href="/calculators" className="hover:text-white transition-colors cursor-pointer">Calculators</Link>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-slate-800/50 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-600">
                  <span className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-amber-400" />
                    NMLS #1945913
                  </span>
                  <span className="flex items-center gap-2">
                    <BadgeCheck className="h-4 w-4 text-emerald-400" />
                    California DRE Licensed
                  </span>
                  <span className="flex items-center gap-2">
                    <Home className="h-4 w-4 text-blue-400" />
                    Equal Housing Opportunity
                  </span>
                </div>
              </div>
              <div className="mt-6 text-center text-xs text-slate-600">
                <p>© 2026 LendyWendy. All rights reserved. LendyWendy is a mortgage broker licensed in California.</p>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
