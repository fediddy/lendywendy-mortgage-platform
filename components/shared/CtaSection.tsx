"use client";

import Link from "next/link";
import { ArrowRight, Phone, MessageCircle, Target } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CtaSectionProps {
  variant?: "primary" | "secondary" | "readiness";
  title?: string;
  description?: string;
  primaryCta?: {
    text: string;
    href: string;
  };
  secondaryCta?: {
    text: string;
    href: string;
  };
  showPhone?: boolean;
  className?: string;
}

const defaultContent = {
  primary: {
    title: "Ready to compare mortgage rates?",
    description: "Join thousands of Californians who found better rates through LendyWendy. It takes 60 seconds.",
    primaryCta: { text: "Compare Rates", href: "/get-quote" },
    secondaryCta: { text: "Learn More", href: "/get-quote" },
  },
  secondary: {
    title: "Have questions? Let's chat.",
    description: "Our AI advisor is available 24/7 to answer your mortgage questions.",
    primaryCta: { text: "Chat with AI", href: "/get-quote" },
    secondaryCta: { text: "Learn More", href: "/get-quote" },
  },
  readiness: {
    title: "Not ready to talk to a lender yet?",
    description: "Check your Mortgage Readiness Score. 2-minute quiz tells you where you stand with personalized improvement tips.",
    primaryCta: { text: "Check My Score Free", href: "/readiness-score" },
    secondaryCta: { text: "Learn More", href: "/get-quote" },
  },
};

export function CtaSection({
  variant = "primary",
  title,
  description,
  primaryCta,
  secondaryCta,
  showPhone = true,
  className = "",
}: CtaSectionProps) {
  const content = defaultContent[variant];
  const displayTitle = title || content.title;
  const displayDescription = description || content.description;
  const displayPrimaryCta = primaryCta || content.primaryCta;
  const displaySecondaryCta = secondaryCta || content.secondaryCta;

  // Readiness variant has different styling
  if (variant === "readiness") {
    return (
      <section className={`bg-gradient-to-r from-sage-500 to-emerald-600 py-10 ${className}`}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 text-white">
              <p className="text-emerald-200 font-medium mb-2">Not ready yet?</p>
              <h2 className="text-2xl lg:text-3xl font-bold mb-3">
                Check your Mortgage Readiness Score
              </h2>
              <p className="text-emerald-100 mb-4">
                {displayDescription}
              </p>
              <Button
                size="lg"
                className="bg-white text-sage-600 hover:bg-gray-100 font-bold"
                asChild
              >
                <Link href={displayPrimaryCta.href}>
                  <Target className="mr-2 h-5 w-5" />
                  {displayPrimaryCta.text}
                </Link>
              </Button>
            </div>
            <div className="flex-shrink-0">
              <div className="w-32 h-32 bg-white/20 rounded-full flex flex-col items-center justify-center border-4 border-white/40">
                <span className="text-4xl font-extrabold text-white">87</span>
                <span className="text-xs text-emerald-200">Ready!</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Primary and secondary variants
  return (
    <section
      className={`bg-navy-900 py-12 ${className}`}
      itemScope
      itemType="https://schema.org/WebPageElement"
    >
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
          {displayTitle}
        </h2>
        <p className="text-gray-400 mb-6 max-w-lg mx-auto">
          {displayDescription}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            size="lg"
            className="bg-gold-500 hover:bg-gold-600 text-navy-900 font-bold"
            asChild
          >
            <Link href={displayPrimaryCta.href}>
              {variant === "secondary" ? (
                <MessageCircle className="mr-2 h-5 w-5" />
              ) : null}
              {displayPrimaryCta.text}
              {variant === "primary" ? (
                <ArrowRight className="ml-2 h-5 w-5" />
              ) : null}
            </Link>
          </Button>
          {showPhone && (
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10"
              asChild
            >
              <Link href={displaySecondaryCta.href}>
                {displaySecondaryCta.text}
              </Link>
            </Button>
          )}
        </div>
        <p className="text-gray-500 text-sm mt-4">
          Equal Housing Opportunity
        </p>
      </div>
    </section>
  );
}

// Inline CTA for use within content sections
export function InlineCta({
  text = "Get matched with lenders",
  href = "/get-quote",
  variant = "gold",
}: {
  text?: string;
  href?: string;
  variant?: "gold" | "navy" | "outline";
}) {
  const buttonClass = {
    gold: "bg-gold-500 hover:bg-gold-600 text-navy-900",
    navy: "bg-navy-900 hover:bg-navy-800 text-white",
    outline: "border-navy-900 text-navy-900 hover:bg-navy-50",
  }[variant];

  return (
    <Button className={`font-bold ${buttonClass}`} asChild>
      <Link href={href}>
        {text}
        <ArrowRight className="ml-2 h-4 w-4" />
      </Link>
    </Button>
  );
}

export default CtaSection;
