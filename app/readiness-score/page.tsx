import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Home, CheckCircle, Target, Shield, Zap, TrendingUp } from 'lucide-react';
import { ReadinessAssessment } from '@/components/readiness/ReadinessAssessment';
import { TrustBadges } from '@/components/shared';

export const metadata: Metadata = {
  title: 'Investment Readiness Score | Free Assessment | LendyWendy',
  description: 'Find out if you\'re ready for investment property financing in just 2 minutes. Get your personalized Readiness Score and tips to improve your loan options. No credit impact.',
  keywords: [
    'investment property readiness',
    'DSCR loan qualification',
    'am I ready for investment loan',
    'rental property financing qualification',
    'investment loan pre-qualification',
  ],
  openGraph: {
    title: 'Check Your Investment Readiness Score | LendyWendy',
    description: 'Are you ready for investment property financing in California? Take our free 2-minute assessment and find out!',
    url: 'https://lendywendy.com/readiness-score',
  },
};

export default function ReadinessScorePage() {
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

      {/* Hero */}
      <section className="container mx-auto px-4 py-12 text-center">
        <div className="inline-flex items-center gap-2 bg-teal-600/10 border border-teal-600/30 text-teal-600 px-3 py-1 rounded-full text-sm font-medium mb-4">
          <Target className="h-4 w-4" />
          Free 2-Minute Assessment
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-4">
          Are You <span className="text-teal-600">Investment Ready</span>?
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-8">
          Take our free assessment to find out where you stand for DSCR loans, fix-and-flip financing, and portfolio loans in California.
        </p>
        <div className="flex flex-wrap gap-4 justify-center text-sm text-gray-500 mb-12">
          <span className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-200">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            No Credit Impact
          </span>
          <span className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-200">
            <Zap className="w-4 h-4 text-teal-600" />
            Takes 2 Minutes
          </span>
          <span className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-200">
            <TrendingUp className="w-4 h-4 text-teal-600" />
            Investor Focused
          </span>
        </div>
      </section>

      {/* Assessment */}
      <section className="container mx-auto px-4 pb-20">
        <div className="max-w-3xl mx-auto bg-gray-50 rounded-2xl border border-gray-200 p-6">
          <ReadinessAssessment />
        </div>
      </section>

      {/* Trust Section */}
      <section className="bg-gray-50 border-t border-gray-200 py-12">
        <div className="container mx-auto px-4 text-center">
          <Shield className="h-8 w-8 text-teal-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Trusted by California Investors
          </h3>
          <p className="text-gray-500 max-w-2xl mx-auto mb-6">
            Our Investment Readiness Score helps you understand your loan options before you apply. No credit check required, and your information is kept private.
          </p>
          <TrustBadges variant="dark" />
        </div>
      </section>
    </div>
  );
}
