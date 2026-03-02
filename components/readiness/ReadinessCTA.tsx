import Link from 'next/link';
import { ArrowRight, ClipboardCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ReadinessCTA() {
  return (
    <section className="py-16 lg:py-20 bg-gradient-to-br from-teal-50 to-emerald-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-100 border border-teal-200 text-teal-700 text-sm font-medium mb-4">
            <ClipboardCheck className="h-4 w-4" />
            Free Assessment
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            How Ready Are You for a Mortgage?
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            Take our 2-minute assessment to get your personalized Mortgage Readiness Score.
            See where you stand and what to improve before applying.
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-white font-bold text-lg h-14 px-8 rounded-xl shadow-lg shadow-teal-500/25 cursor-pointer"
            asChild
          >
            <Link href="/readiness-score">
              Check Your Readiness Score <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
