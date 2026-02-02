import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./editor.css";
import { ChatWidget } from "@/components/chat";
import { StructuredData } from "@/components/seo/StructuredData";
import { Header, Footer, MobileCTA } from "@/components/layout";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Comprehensive SEO Metadata with N-gram optimization, Entity Salience, and E-E-A-T signals
export const metadata: Metadata = {
  metadataBase: new URL('https://lendywendy.com'),
  title: {
    default: "LendyWendy - California's #1 AI Mortgage Matching | Wendy Landeros NMLS #1945913",
    template: "%s | LendyWendy - California Mortgage Expert"
  },
  description: "Get pre-approved in minutes with California's top-rated mortgage matching service. AI-powered technology connects you with local lenders for the best rates on Conventional, FHA, VA, Jumbo, DSCR, and Commercial loans. Founded by Wendy Landeros, NMLS #1945913.",
  keywords: [
    // Primary entities (highest salience)
    "California mortgage",
    "mortgage lender California",
    "LendyWendy",
    "Wendy Landeros",
    // High-value n-grams (2-3 word phrases)
    "home loan pre-approval",
    "California mortgage rates",
    "best mortgage rates California",
    "mortgage broker California",
    // Government-backed loan n-grams
    "FHA loans California",
    "VA loans California",
    "USDA loans California",
    // Specialty loan n-grams
    "jumbo loans California",
    "DSCR loans California",
    "investment property loans",
    "fix and flip loans",
    "commercial mortgage California",
    "SBA loans California",
    "Non-QM loans",
    "bank statement loans",
    // Intent-based n-grams
    "first-time homebuyer California",
    "refinance California",
    "mortgage pre-approval online",
    "compare mortgage rates",
    // Location-specific n-grams (local SEO)
    "mortgage Los Angeles",
    "mortgage San Francisco",
    "mortgage San Diego",
    "mortgage Sacramento",
    "mortgage Orange County",
    "mortgage San Jose",
    // Long-tail n-grams (specific intent)
    "how to get mortgage California",
    "best mortgage lender California 2025",
    "California home loan requirements",
    "mortgage calculator California",
    // Entity identifiers
    "NMLS 1945913",
    "California DRE licensed"
  ],
  authors: [
    {
      name: "Wendy Landeros, NMLS #1945913",
      url: "https://lendywendy.com/about"
    }
  ],
  creator: "Wendy Landeros",
  publisher: "LendyWendy",
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
      noimageindex: false,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://lendywendy.com",
    siteName: "LendyWendy",
    title: "LendyWendy - California's #1 AI Mortgage Matching Service",
    description: "Get pre-approved in minutes. AI-powered mortgage matching connects California homebuyers with top-rated local lenders for the best rates on Conventional, FHA, VA, Jumbo, DSCR, and Commercial loans.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "LendyWendy - AI Mortgage Matching for California Homebuyers",
        type: "image/jpeg",
      }
    ],
    countryName: "United States",
  },
  twitter: {
    card: "summary_large_image",
    title: "LendyWendy - California Mortgage Matching",
    description: "Get pre-approved in minutes with AI-powered mortgage matching. Conventional, FHA, VA, Jumbo, DSCR, Commercial loans.",
    images: ["/og-image.jpg"],
    creator: "@lendywendy",
    site: "@lendywendy",
  },
  verification: {
    google: "your-google-verification-code",
  },
  alternates: {
    canonical: "https://lendywendy.com",
    languages: {
      'en-US': 'https://lendywendy.com',
      'es-US': 'https://lendywendy.com/es',
    },
  },
  category: "Finance",
  classification: "Mortgage Services",
  referrer: "origin-when-cross-origin",
  appLinks: {
    web: {
      url: "https://lendywendy.com",
      should_fallback: true,
    },
  },
  other: {
    // E-E-A-T signals
    "author-credentials": "NMLS #1945913, California DRE Licensed",
    "expertise": "Mortgage Lending, Real Estate Finance",
    "experience": "10+ years mortgage industry experience",
    // Geo/Local SEO
    "geo.region": "US-CA",
    "geo.placename": "California",
    "geo.position": "34.0522;-118.2437",
    "ICBM": "34.0522, -118.2437",
    // Business identifiers
    "business:contact_data:locality": "California",
    "business:contact_data:country_name": "United States",
    "business:contact_data:phone_number": "+1-800-555-1234",
    // Content classification
    "rating": "General",
    "distribution": "Global",
    "revisit-after": "7 days",
    // Mobile optimization
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "LendyWendy",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <StructuredData
          type="home"
          pageTitle="LendyWendy - California's #1 AI Mortgage Matching Service"
          pageDescription="Get pre-approved in minutes with AI-powered mortgage matching. Connect with top-rated California lenders for the best rates."
          pageUrl="/"
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#1e40af" />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <Header />
        <div className="min-h-screen pb-20 md:pb-0">{children}</div>
        <Footer />
        <MobileCTA />
        <ChatWidget />
      </body>
    </html>
  );
}
