"use client";

import { Shield, Star, Users, Award, BadgeCheck, Clock, CheckCircle } from "lucide-react";

interface TrustSignalsProps {
  variant?: "light" | "dark" | "card";
  showStats?: boolean;
  showCredentials?: boolean;
  showTestimonial?: boolean;
  className?: string;
}

const stats = [
  { value: "2,400+", label: "Happy Clients", icon: Users },
  { value: "4.9/5", label: "Customer Rating", icon: Star },
  { value: "$500M+", label: "Loans Matched", icon: Award },
  { value: "24hrs", label: "Avg. Pre-Approval", icon: Clock },
];

const credentials = [
  { label: "NMLS #1945913", icon: Shield },
  { label: "California DRE Licensed", icon: BadgeCheck },
  { label: "Equal Housing Opportunity", icon: CheckCircle },
];

const testimonials = [
  {
    quote: "Pre-approved in 5 minutes. Rate was 0.375% lower than my bank.",
    name: "Maria S.",
    detail: "First-time buyer, San Diego",
    rating: 5,
  },
  {
    quote: "Finally found a lender who does bank statement loans. Closed in 3 weeks.",
    name: "James T.",
    detail: "Self-employed investor, LA",
    rating: 5,
  },
  {
    quote: "The AI advisor helped me understand my options perfectly.",
    name: "Sarah K.",
    detail: "Homeowner, Sacramento",
    rating: 5,
  },
];

export function TrustSignals({
  variant = "light",
  showStats = true,
  showCredentials = true,
  showTestimonial = false,
  className = "",
}: TrustSignalsProps) {
  const bgClass = {
    light: "bg-slate-800",
    dark: "bg-navy-900 text-white",
    card: "bg-white border rounded-xl shadow-sm",
  }[variant];

  const textClass = {
    light: "text-gray-600",
    dark: "text-gray-300",
    card: "text-gray-600",
  }[variant];

  const headingClass = {
    light: "text-navy-900",
    dark: "text-white",
    card: "text-navy-900",
  }[variant];

  const statValueClass = {
    light: "text-navy-900",
    dark: "text-gold-400",
    card: "text-navy-900",
  }[variant];

  return (
    <div className={`${bgClass} ${className}`}>
      <div className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        {showStats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="flex justify-center mb-2">
                  <stat.icon className={`h-6 w-6 ${variant === "dark" ? "text-gold-400" : "text-gold-500"}`} />
                </div>
                <div className={`text-2xl font-bold ${statValueClass}`}>{stat.value}</div>
                <div className={`text-sm ${textClass}`}>{stat.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Credentials */}
        {showCredentials && (
          <div className={`flex flex-wrap justify-center gap-4 ${showStats ? "pt-6 border-t border-gray-200" : ""}`}>
            {credentials.map((cred, i) => (
              <span
                key={i}
                className={`flex items-center gap-2 text-sm ${textClass}`}
              >
                <cred.icon className={`h-4 w-4 ${variant === "dark" ? "text-gold-400" : "text-gold-500"}`} />
                {cred.label}
              </span>
            ))}
          </div>
        )}

        {/* Testimonial */}
        {showTestimonial && (
          <div className={`mt-6 pt-6 ${showStats || showCredentials ? "border-t border-gray-200" : ""}`}>
            <div className="max-w-2xl mx-auto text-center">
              <div className="flex justify-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-gold-500 text-gold-500" />
                ))}
              </div>
              <blockquote className={`text-lg italic ${textClass} mb-3`}>
                "{testimonials[0].quote}"
              </blockquote>
              <p className={`font-semibold ${headingClass}`}>{testimonials[0].name}</p>
              <p className={`text-sm ${textClass}`}>{testimonials[0].detail}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Compact inline version for use within sections
export function TrustBadges({
  variant = "light",
  className = "",
}: {
  variant?: "light" | "dark";
  className?: string;
}) {
  const textClass = variant === "dark" ? "text-gray-400" : "text-gray-500";
  const iconClass = variant === "dark" ? "text-gold-400" : "text-gold-500";

  return (
    <div className={`flex flex-wrap justify-center gap-6 text-xs ${className}`}>
      <span className={`flex items-center gap-1.5 ${textClass}`}>
        <Shield className={`h-4 w-4 ${iconClass}`} />
        NMLS #1945913
      </span>
      <span className={`flex items-center gap-1.5 ${textClass}`}>
        <BadgeCheck className={`h-4 w-4 text-green-500`} />
        CA DRE Licensed
      </span>
      <span className={`flex items-center gap-1.5 ${textClass}`}>
        <CheckCircle className={`h-4 w-4 text-blue-500`} />
        Equal Housing
      </span>
    </div>
  );
}

// Testimonial cards for social proof sections
export function TestimonialCards({
  limit = 3,
  className = "",
}: {
  limit?: number;
  className?: string;
}) {
  return (
    <div className={`grid md:grid-cols-3 gap-6 ${className}`}>
      {testimonials.slice(0, limit).map((t, i) => (
        <div
          key={i}
          className="bg-slate-800 rounded-xl p-5"
          itemScope
          itemType="https://schema.org/Review"
        >
          <div className="flex gap-1 mb-3">
            {[...Array(t.rating)].map((_, j) => (
              <Star key={j} className="h-4 w-4 fill-gold-500 text-gold-500" />
            ))}
          </div>
          <p className="text-sm text-gray-700 mb-3" itemProp="reviewBody">
            &quot;{t.quote}&quot;
          </p>
          <p className="text-sm font-semibold text-navy-900" itemProp="author">{t.name}</p>
          <p className="text-xs text-gray-500">{t.detail}</p>
          <meta itemProp="reviewRating" content={String(t.rating)} />
        </div>
      ))}
    </div>
  );
}

export default TrustSignals;
