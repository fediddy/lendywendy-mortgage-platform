import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Home, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Thank You - Lead Submitted | LendyWendy",
  description: "Thank you for your interest. We'll be in touch shortly with your mortgage quote.",
  robots: {
    index: false, // Don't index confirmation pages
    follow: false,
  },
};

export default function LeadSubmittedPage() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <CardTitle className="text-3xl">Thank You!</CardTitle>
          <CardDescription className="text-lg">
            Your information has been successfully submitted
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6">
            <h3 className="font-semibold text-lg mb-3">What Happens Next?</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white text-sm flex items-center justify-center mr-3 mt-0.5">
                  1
                </span>
                <div>
                  <div className="font-medium">Review Your Information</div>
                  <div className="text-sm text-muted-foreground">
                    Our team will review your mortgage needs within 2 business hours
                  </div>
                </div>
              </li>

              <li className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white text-sm flex items-center justify-center mr-3 mt-0.5">
                  2
                </span>
                <div>
                  <div className="font-medium">Match with Top Lenders</div>
                  <div className="text-sm text-muted-foreground">
                    We'll connect you with lenders who offer the best rates for your situation
                  </div>
                </div>
              </li>

              <li className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white text-sm flex items-center justify-center mr-3 mt-0.5">
                  3
                </span>
                <div>
                  <div className="font-medium">Receive Your Personalized Quotes</div>
                  <div className="text-sm text-muted-foreground">
                    Get competitive quotes via email and phone within 24-48 hours
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <div className="border-t pt-6">
            <h3 className="font-semibold mb-3">While You Wait...</h3>
            <p className="text-muted-foreground mb-4">
              Learn more about the mortgage process and prepare for your loan application:
            </p>

            <div className="grid gap-3">
              <Link
                href="/residential"
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-800 transition-colors"
              >
                <span className="font-medium">Browse Mortgage Guides</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/calculators"
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-800 transition-colors"
              >
                <span className="font-medium">Try Our Mortgage Calculators</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/articles"
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-800 transition-colors"
              >
                <span className="font-medium">Read Latest Articles</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="flex justify-center pt-4">
            <Button asChild size="lg">
              <Link href="/">
                <Home className="w-4 h-4 mr-2" />
                Return to Home
              </Link>
            </Button>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            <p>Questions? Contact us at <a href="mailto:support@lendywendy.com" className="text-blue-600 hover:underline">support@lendywendy.com</a></p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
