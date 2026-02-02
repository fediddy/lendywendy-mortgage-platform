import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Home, CheckCircle, Target, Shield, Zap } from 'lucide-react';
import { ReadinessAssessment } from '@/components/readiness/ReadinessAssessment';
import { TrustBadges } from '@/components/shared';

export const metadata: Metadata = {
  title: 'Mortgage Readiness Score | Free Assessment | LendyWendy',
  description: 'Find out if you\'re ready for a California mortgage in just 2 minutes. Get your personalized Mortgage Readiness Score and tips to improve your chances of approval. No credit impact.',
  keywords: [
    'mortgage readiness',
    'mortgage pre-qualification',
    'am I ready for a mortgage',
    'home buying readiness',
    'mortgage qualification California',
  ],
  openGraph: {
    title: 'Check Your Mortgage Readiness Score | LendyWendy',
    description: 'Are you ready to buy a home in California? Take our free 2-minute assessment and find out!',
    url: 'https://lendywendy.com/readiness-score',
  },
};

export default function ReadinessScorePage() {
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

      {/* Hero */}
      <section className="container mx-auto px-4 py-12 text-center">
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 px-3 py-1 rounded-full text-sm font-medium mb-4">
          <Target className="h-4 w-4" />
          Free 2-Minute Assessment
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-navy-900 sm:text-5xl mb-4">
          Are You <span className="text-gold-500">Mortgage Ready</span>?
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          Take our free assessment to find out where you stand. Get personalized tips to improve your chances of approval in California.
        </p>
        <div className="flex flex-wrap gap-4 justify-center text-sm text-gray-500 mb-12">
          <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-gray-200">
            <CheckCircle className="w-4 h-4 text-green-500" />
            Free & No Credit Impact
          </span>
          <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-gray-200">
            <Zap className="w-4 h-4 text-gold-500" />
            Takes 2 Minutes
          </span>
          <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-gray-200">
            <Target className="w-4 h-4 text-emerald-500" />
            Personalized Results
          </span>
        </div>
      </section>

      {/* Assessment */}
      <section className="container mx-auto px-4 pb-20">
        <ReadinessAssessment />
      </section>

      {/* Trust Section - Navy themed */}
      <section className="bg-navy-900 py-12">
        <div className="container mx-auto px-4 text-center">
          <Shield className="h-8 w-8 text-gold-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-4">
            Trusted by California Homebuyers
          </h3>
          <p className="text-gray-300 max-w-2xl mx-auto mb-6">
            Our Mortgage Readiness Score helps you understand where you stand before you apply. No credit check required, and your information is kept private.
          </p>
          <TrustBadges variant="dark" />
        </div>
      </section>
    </div>
  );
}
