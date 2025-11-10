import { Metadata } from "next";
import { MultiStepLeadForm } from "@/components/leads/multi-step-lead-form";
import { Segment } from "@prisma/client";

export const metadata: Metadata = {
  title: "Get Your Free Mortgage Quote | LendyWendy",
  description: "Connect with top mortgage lenders and get personalized quotes in minutes. No commitment required.",
};

export default function GetQuotePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Get Your Free Mortgage Quote</h1>
            <p className="text-xl text-muted-foreground">
              Answer a few quick questions to get matched with top lenders offering competitive rates
            </p>
          </div>

          <MultiStepLeadForm defaultSegment={Segment.RESIDENTIAL} />

          {/* Trust Indicators */}
          <div className="mt-8 grid grid-cols-3 gap-4 text-center">
            <div className="p-4">
              <div className="text-2xl font-bold text-blue-600">500+</div>
              <div className="text-sm text-muted-foreground">Lenders in Network</div>
            </div>
            <div className="p-4">
              <div className="text-2xl font-bold text-blue-600">$2B+</div>
              <div className="text-sm text-muted-foreground">Loans Facilitated</div>
            </div>
            <div className="p-4">
              <div className="text-2xl font-bold text-blue-600">4.9/5</div>
              <div className="text-sm text-muted-foreground">Customer Rating</div>
            </div>
          </div>

          {/* Privacy & Security */}
          <div className="mt-8 p-6 bg-gray-50 rounded-lg text-center">
            <p className="text-sm text-muted-foreground">
              🔒 Your information is secure and will never be sold. We only share your details with
              lenders you choose to connect with. Read our{" "}
              <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
