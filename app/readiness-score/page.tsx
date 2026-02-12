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

      {/* Hero */}
      <section className="container mx-auto px-4 py-12 text-center">
        <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-500 px-3 py-1 rounded-full text-sm font-medium mb-4">
          <Target className="h-4 w-4" />
          Free 2-Minute Assessment
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl mb-4">
          Are You <span className="text-amber-500">Investment Ready</span>?
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
          Take our free assessment to find out where you stand for DSCR loans, fix-and-flip financing, and portfolio loans in California.
        </p>
        <div className="flex flex-wrap gap-4 justify-center text-sm text-gray-400 mb-12">
          <span className="flex items-center gap-1.5 bg-slate-900 px-3 py-1.5 rounded-full border border-slate-800">
            <CheckCircle className="w-4 h-4 text-emerald-500" />
            No Credit Impact
          </span>
          <span className="flex items-center gap-1.5 bg-slate-900 px-3 py-1.5 rounded-full border border-slate-800">
            <Zap className="w-4 h-4 text-amber-500" />
            Takes 2 Minutes
          </span>
          <span className="flex items-center gap-1.5 bg-slate-900 px-3 py-1.5 rounded-full border border-slate-800">
            <TrendingUp className="w-4 h-4 text-amber-500" />
            Investor Focused
          </span>
        </div>
      </section>

      {/* Assessment */}
      <section className="container mx-auto px-4 pb-20">
        <div className="max-w-3xl mx-auto bg-slate-900 rounded-2xl border border-slate-800 p-6">
          <ReadinessAssessment />
        </div>
      </section>

      {/* Trust Section */}
      <section className="bg-slate-900/50 border-t border-slate-800 py-12">
        <div className="container mx-auto px-4 text-center">
          <Shield className="h-8 w-8 text-amber-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-4">
            Trusted by California Investors
          </h3>
          <p className="text-gray-400 max-w-2xl mx-auto mb-6">
            Our Investment Readiness Score helps you understand your loan options before you apply. No credit check required, and your information is kept private.
          </p>
          <TrustBadges variant="dark" />
        </div>
      </section>
    </div>
  );
}
