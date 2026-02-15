import { Metadata } from "next";
import Link from "next/link";
import { MultiStepLeadForm } from "@/components/leads/multi-step-lead-form";
import { Segment } from "@prisma/client";
import { ArrowLeft, Home, Shield, CheckCircle, Zap, Clock, FileX, TrendingUp, Lock, Layers, Timer, Wallet } from "lucide-react";

export const metadata: Metadata = {
  title: "Get Matched with Investment Lenders | DSCR Loans California | LendyWendy",
  description: "Connect with California's top investment property lenders. DSCR loans, fix-and-flip, bridge financing. No tax returns, close in 14 days.",
  keywords: [
    "DSCR loan California",
    "investment property loan",
    "fix and flip loan",
    "bridge loan California",
    "no income verification mortgage",
    "rental property financing",
  ],
};

export default function GetQuotePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dark hero header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
        <div className="absolute top-0 right-[20%] w-[400px] h-[400px] bg-teal-500/10 rounded-full blur-[120px]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />

        {/* Nav bar */}
        <div className="relative z-10 container mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="font-medium">Back</span>
          </Link>
          <Link href="/" className="flex items-center gap-2">
            <span className="w-8 h-8 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
              W
            </span>
            <span className="text-xl font-bold text-white">
              Lendy<span className="text-teal-400">Wendy</span>
            </span>
          </Link>
          <Link
            href="/"
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
          >
            <Home className="h-5 w-5" />
            <span className="font-medium">Home</span>
          </Link>
        </div>

        {/* Hero content */}
        <div className="relative z-10 container mx-auto px-4 pt-8 pb-20">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-teal-500/10 border border-teal-500/20 text-teal-300 px-3 py-1.5 rounded-full text-sm font-medium mb-5">
              <Zap className="h-4 w-4" />
              60 seconds to get matched
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-white">
              Get Matched with a{" "}
              <span className="bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">Lender</span>
            </h1>
            <p className="text-lg text-slate-400 max-w-xl mx-auto">
              Compare rates from licensed California lenders who specialize in investor loans. DSCR, fix-and-flip, bridge — find your match.
            </p>

            {/* Benefit pills */}
            <div className="flex flex-wrap justify-center gap-3 mt-6">
              <span className="flex items-center gap-1.5 bg-white/5 border border-white/10 text-slate-300 px-3 py-1.5 rounded-full text-sm backdrop-blur-sm">
                <Clock className="h-4 w-4 text-teal-400" /> Close in 14 days
              </span>
              <span className="flex items-center gap-1.5 bg-white/5 border border-white/10 text-slate-300 px-3 py-1.5 rounded-full text-sm backdrop-blur-sm">
                <FileX className="h-4 w-4 text-teal-400" /> No tax returns
              </span>
              <span className="flex items-center gap-1.5 bg-white/5 border border-white/10 text-slate-300 px-3 py-1.5 rounded-full text-sm backdrop-blur-sm">
                <Layers className="h-4 w-4 text-teal-400" /> Unlimited properties
              </span>
            </div>
          </div>
        </div>

        {/* Wave transition */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none">
            <path d="M0 50V25C360 5 720 0 1080 10C1260 15 1380 30 1440 25V50H0Z" fill="#f9fafb" />
          </svg>
        </div>
      </div>

      {/* Main content area */}
      <div className="relative -mt-6 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-5 gap-8 items-start">

              {/* Left sidebar - Why us */}
              <div className="lg:col-span-2 lg:sticky lg:top-24 space-y-5 order-2 lg:order-1">
                {/* How it works */}
                <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                  <h3 className="font-bold text-gray-900 mb-4">How It Works</h3>
                  <div className="space-y-4">
                    {[
                      { step: "1", title: "Tell us your needs", desc: "Loan type, property, and timeline" },
                      { step: "2", title: "We match you", desc: "With lenders that fit your profile" },
                      { step: "3", title: "Compare & choose", desc: "Review rates and pick the best offer" },
                    ].map((item) => (
                      <div key={item.step} className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700 font-bold text-sm flex-shrink-0">
                          {item.step}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">{item.title}</p>
                          <p className="text-xs text-gray-500">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                  <h3 className="font-bold text-gray-900 mb-4">By the Numbers</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { icon: Timer, value: "14 days", label: "Avg close time" },
                      { icon: TrendingUp, value: "15+", label: "Lender partners" },
                      { icon: Wallet, value: "60 sec", label: "Rate comparison" },
                      { icon: Layers, value: "100+", label: "Properties financed" },
                    ].map((stat, i) => (
                      <div key={i} className="text-center p-3 bg-gray-50 rounded-xl">
                        <stat.icon className="h-5 w-5 text-teal-600 mx-auto mb-1.5" />
                        <div className="text-lg font-bold text-gray-900">{stat.value}</div>
                        <div className="text-xs text-gray-500">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Security note */}
                <div className="bg-emerald-50 rounded-2xl border border-emerald-200 p-5">
                  <div className="flex gap-3">
                    <Lock className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-emerald-900 text-sm mb-1">Your data is secure</p>
                      <p className="text-xs text-emerald-700 leading-relaxed">
                        We only connect you with vetted, licensed California lenders. Your information is encrypted and never sold.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right - Form card */}
              <div className="lg:col-span-3 order-1 lg:order-2">
                <div className="bg-white rounded-2xl border border-gray-200 shadow-lg shadow-gray-200/50 overflow-hidden">
                  <MultiStepLeadForm defaultSegment={Segment.INVESTMENT} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Disclosure */}
      <div className="bg-gray-100 border-t border-gray-200 py-6">
        <div className="container mx-auto px-4">
          <p className="text-xs text-gray-400 text-center max-w-3xl mx-auto">
            LendyWendy is a free service that connects borrowers with mortgage lenders. We are not a lender and do not make loans.
            We may receive compensation from lender partners when you are matched. Rates, terms, and availability vary by lender.
            All loan applications are subject to lender approval and underwriting. Equal Housing Opportunity.{" "}
            <Link href="/privacy" className="text-teal-600 hover:underline">Privacy Policy</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
