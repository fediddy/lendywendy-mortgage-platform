import { Metadata } from "next";
import Link from "next/link";
import { MultiStepLeadForm } from "@/components/leads/multi-step-lead-form";
import { Segment } from "@prisma/client";
import { ArrowLeft, Home, Shield, Star, Users, CheckCircle, Zap, Clock, FileX, TrendingUp } from "lucide-react";
import { TrustBadges } from "@/components/shared";

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
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gray-50 border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-gray-500 hover:text-teal-600 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="font-medium">Back</span>
          </Link>
          <Link href="/" className="text-2xl font-bold text-gray-900">
            Lendy<span className="text-teal-600">Wendy</span>
          </Link>
          <Link
            href="/"
            className="flex items-center gap-2 text-gray-500 hover:text-teal-600 transition-colors"
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
              <div className="inline-flex items-center gap-2 bg-teal-600/10 border border-teal-600/30 text-teal-600 px-3 py-1 rounded-full text-sm font-medium mb-4">
                <Zap className="h-4 w-4" />
                60 seconds to get matched
              </div>
              <h1 className="text-4xl font-bold mb-4 text-gray-900">
                Get Matched with a Lender
              </h1>
              <p className="text-xl text-gray-500">
                We'll match you with licensed lenders who specialize in investor loans. DSCR, fix-and-flip, bridge - compare rates fast.
              </p>

              {/* Investor Benefits */}
              <div className="flex flex-wrap justify-center gap-4 mt-6 text-sm text-gray-500">
                <span className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-200">
                  <Clock className="h-4 w-4 text-teal-600" /> Close in 14 days
                </span>
                <span className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-200">
                  <FileX className="h-4 w-4 text-emerald-600" /> No tax returns
                </span>
                <span className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-200">
                  <TrendingUp className="h-4 w-4 text-teal-600" /> Unlimited properties
                </span>
              </div>
            </div>

            {/* Form Card */}
            <div className="bg-gray-50 rounded-2xl border border-gray-200 p-6">
              <MultiStepLeadForm defaultSegment={Segment.INVESTMENT} />
            </div>

            {/* Investor Stats */}
            <div className="mt-8 grid grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                <TrendingUp className="h-6 w-6 text-teal-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">$847M</div>
                <div className="text-sm text-gray-500">Investor Loans Funded</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                <Clock className="h-6 w-6 text-teal-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">14 days</div>
                <div className="text-sm text-gray-500">Average Close Time</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                <Star className="h-6 w-6 text-teal-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-900">4.9/5</div>
                <div className="text-sm text-gray-500">Investor Rating</div>
              </div>
            </div>

            {/* Privacy & Security */}
            <div className="mt-8 p-6 bg-gray-50 rounded-xl border border-gray-200 text-center">
              <p className="text-sm text-gray-500">
                <Shield className="h-4 w-4 inline mr-1 text-emerald-600" />
                Your information is secure. We only connect you with vetted investment property lenders.{" "}
                <a href="/privacy" className="text-teal-600 hover:underline">Privacy Policy</a>.
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
