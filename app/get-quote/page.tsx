import { Metadata } from "next";
import Link from "next/link";
import { MultiStepLeadForm } from "@/components/leads/multi-step-lead-form";
import { Segment } from "@prisma/client";
import { ArrowLeft, Home, Shield, Star, Users, CheckCircle, Zap, Clock, FileX, TrendingUp } from "lucide-react";
import { TrustBadges } from "@/components/shared";

export const metadata: Metadata = {
  title: "Get Investment Property Financing | DSCR Loans California | LendyWendy",
  description: "Connect with California's top investment property lenders. DSCR loans, fix-and-flip, bridge financing. No tax returns, close in 14 days. NMLS #1945913.",
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
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <div className="bg-slate-900 border-b border-slate-800 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-gray-400 hover:text-amber-500 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="font-medium">Back</span>
          </Link>
          <Link href="/" className="text-2xl font-bold text-white">
            Lendy<span className="text-amber-500">Wendy</span>
          </Link>
          <Link
            href="/"
            className="flex items-center gap-2 text-gray-400 hover:text-amber-500 transition-colors"
          >
            <Home className="h-5 w-5" />
            <span className="font-medium">Home</span>
          </Link>
        </div>
      </div>

      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-500 px-3 py-1 rounded-full text-sm font-medium mb-4">
                <Zap className="h-4 w-4" />
                60 seconds to get matched
              </div>
              <h1 className="text-4xl font-bold mb-4 text-white">
                Get Investment Property Financing
              </h1>
              <p className="text-xl text-gray-400">
                Connect with lenders who specialize in investor loans. DSCR, fix-and-flip, bridge - we match you fast.
              </p>

              {/* Investor Benefits */}
              <div className="flex flex-wrap justify-center gap-4 mt-6 text-sm text-gray-400">
                <span className="flex items-center gap-1.5 bg-slate-900 px-3 py-1.5 rounded-full border border-slate-800">
                  <Clock className="h-4 w-4 text-amber-500" /> Close in 14 days
                </span>
                <span className="flex items-center gap-1.5 bg-slate-900 px-3 py-1.5 rounded-full border border-slate-800">
                  <FileX className="h-4 w-4 text-emerald-500" /> No tax returns
                </span>
                <span className="flex items-center gap-1.5 bg-slate-900 px-3 py-1.5 rounded-full border border-slate-800">
                  <TrendingUp className="h-4 w-4 text-amber-500" /> Unlimited properties
                </span>
              </div>
            </div>

            {/* Form Card */}
            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">
              <MultiStepLeadForm defaultSegment={Segment.INVESTMENT} />
            </div>

            {/* Investor Stats */}
            <div className="mt-8 grid grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                <TrendingUp className="h-6 w-6 text-amber-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">$847M</div>
                <div className="text-sm text-gray-500">Investor Loans Funded</div>
              </div>
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                <Clock className="h-6 w-6 text-amber-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">14 days</div>
                <div className="text-sm text-gray-500">Average Close Time</div>
              </div>
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                <Star className="h-6 w-6 text-amber-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">4.9/5</div>
                <div className="text-sm text-gray-500">Investor Rating</div>
              </div>
            </div>

            {/* Privacy & Security */}
            <div className="mt-8 p-6 bg-slate-900/50 rounded-xl border border-slate-800 text-center">
              <p className="text-sm text-gray-400">
                <Shield className="h-4 w-4 inline mr-1 text-emerald-500" />
                Your information is secure. We only connect you with vetted investment property lenders.{" "}
                <a href="/privacy" className="text-amber-500 hover:underline">Privacy Policy</a>.
              </p>
            </div>

            {/* Credentials */}
            <div className="mt-6">
              <TrustBadges variant="dark" className="justify-center" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
