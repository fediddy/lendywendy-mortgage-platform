import { Metadata } from "next";
import Link from "next/link";
import { MultiStepLeadForm } from "@/components/leads/multi-step-lead-form";
import { Segment } from "@prisma/client";
import { ArrowLeft, Home, Shield, Star, Users, CheckCircle, Zap } from "lucide-react";
import { TrustBadges } from "@/components/shared";

export const metadata: Metadata = {
  title: "Get Your Free Mortgage Quote | Compare California Lenders | LendyWendy",
  description: "Connect with top California mortgage lenders and get personalized quotes in minutes. No credit pull, no commitment. Compare rates from 500+ lenders. NMLS #1945913.",
  keywords: [
    "mortgage quote California",
    "compare mortgage rates",
    "mortgage pre-approval",
    "free mortgage quote",
    "California lenders",
  ],
};

export default function GetQuotePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header - Navy themed */}
      <div className="bg-navy-900 border-b border-navy-800 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-gray-300 hover:text-gold-400 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="font-medium">Back</span>
          </Link>
          <Link href="/" className="text-2xl font-bold text-white">
            Lendy<span className="text-gold-400">Wendy</span>
          </Link>
          <Link
            href="/"
            className="flex items-center gap-2 text-gray-300 hover:text-gold-400 transition-colors"
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
              <div className="inline-flex items-center gap-2 bg-gold-500/10 border border-gold-500/30 text-gold-600 px-3 py-1 rounded-full text-sm font-medium mb-4">
                <Zap className="h-4 w-4" />
                Takes only 60 seconds
              </div>
              <h1 className="text-4xl font-bold mb-4 text-navy-900">Get Your Free Mortgage Quote</h1>
              <p className="text-xl text-gray-600">
                Answer a few quick questions to get matched with top California lenders offering competitive rates
              </p>
              {/* Quick trust badges */}
              <div className="flex flex-wrap justify-center gap-4 mt-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <CheckCircle className="h-4 w-4 text-green-500" /> No credit pull
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle className="h-4 w-4 text-green-500" /> 100% free
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle className="h-4 w-4 text-green-500" /> No obligation
                </span>
              </div>
            </div>

            <MultiStepLeadForm defaultSegment={Segment.RESIDENTIAL} />

            {/* Trust Indicators - Navy/Gold themed */}
            <div className="mt-8 grid grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                <Users className="h-6 w-6 text-gold-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-navy-900">500+</div>
                <div className="text-sm text-gray-500">Lenders in Network</div>
              </div>
              <div className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                <Shield className="h-6 w-6 text-gold-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-navy-900">$2B+</div>
                <div className="text-sm text-gray-500">Loans Facilitated</div>
              </div>
              <div className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                <Star className="h-6 w-6 text-gold-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-navy-900">4.9/5</div>
                <div className="text-sm text-gray-500">Customer Rating</div>
              </div>
            </div>

            {/* Privacy & Security */}
            <div className="mt-8 p-6 bg-navy-900 rounded-xl text-center">
              <p className="text-sm text-gray-300">
                <Shield className="h-4 w-4 inline mr-1 text-green-400" />
                Your information is secure and will never be sold. We only share your details with
                lenders you choose to connect with. Read our{" "}
                <a href="/privacy" className="text-gold-400 hover:underline">Privacy Policy</a>.
              </p>
            </div>

            {/* Credentials */}
            <div className="mt-6">
              <TrustBadges variant="light" className="justify-center" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
