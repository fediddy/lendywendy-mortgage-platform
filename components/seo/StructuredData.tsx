'use client';

// Advanced Schema.org Structured Data for LendyWendy
// Comprehensive Semantic SEO: Entity Recognition, Knowledge Graph, N-grams, Salience, E-E-A-T
// Optimized for Google NLP, Rich Results, and Passage Ranking

export interface SchemaProps {
  type?: 'home' | 'service' | 'article' | 'calculator' | 'location';
  pageTitle?: string;
  pageDescription?: string;
  pageUrl?: string;
  breadcrumbs?: Array<{ name: string; url: string }>;
  faqItems?: Array<{ question: string; answer: string }>;
  serviceName?: string;
  locationName?: string;
  includeHowTo?: boolean;
  includeVideoObject?: boolean;
}

// Owner/Author Information - Wendy Landeros
const WENDY_LANDEROS = {
  "@type": "Person",
  "@id": "https://lendywendy.com/#wendy-landeros",
  "name": "Wendy Landeros",
  "givenName": "Wendy",
  "familyName": "Landeros",
  "jobTitle": "Mortgage Loan Officer",
  "description": "Licensed Mortgage Loan Officer specializing in California home loans, investment property financing, and commercial mortgages. NMLS #1945913.",
  "identifier": {
    "@type": "PropertyValue",
    "name": "NMLS",
    "value": "1945913"
  },
  "hasCredential": {
    "@type": "EducationalOccupationalCredential",
    "credentialCategory": "license",
    "name": "NMLS License",
    "identifier": "1945913",
    "recognizedBy": {
      "@type": "Organization",
      "name": "Nationwide Multistate Licensing System"
    }
  },
  "knowsAbout": [
    "Mortgage Lending",
    "Home Loans",
    "California Real Estate",
    "FHA Loans",
    "VA Loans",
    "Conventional Mortgages",
    "Jumbo Loans",
    "DSCR Loans",
    "Investment Property Loans",
    "Commercial Mortgages",
    "Non-QM Loans",
    "Refinancing"
  ],
  "areaServed": {
    "@type": "State",
    "name": "California",
    "containedInPlace": {
      "@type": "Country",
      "name": "United States"
    }
  },
  "worksFor": {
    "@type": "Organization",
    "@id": "https://lendywendy.com/#organization"
  },
  "sameAs": [
    "https://www.linkedin.com/in/wendylanderos",
    "https://www.facebook.com/lendywendy"
  ]
};

// Organization Schema
const ORGANIZATION_SCHEMA = {
  "@type": "Organization",
  "@id": "https://lendywendy.com/#organization",
  "name": "LendyWendy",
  "alternateName": "Lendy Wendy Mortgage",
  "legalName": "LendyWendy",
  "description": "AI-powered mortgage matching platform connecting California homebuyers with top-rated local mortgage lenders for the best rates on home loans, refinancing, investment property loans, and commercial mortgages.",
  "url": "https://lendywendy.com",
  "logo": {
    "@type": "ImageObject",
    "url": "https://lendywendy.com/logo.png",
    "width": 512,
    "height": 512
  },
  "image": "https://lendywendy.com/og-image.jpg",
  "founder": WENDY_LANDEROS,
  "foundingDate": "2024",
  "areaServed": {
    "@type": "State",
    "name": "California",
    "containedInPlace": {
      "@type": "Country",
      "name": "United States"
    }
  },
  "serviceArea": [
    { "@type": "City", "name": "Los Angeles", "containedInPlace": { "@type": "State", "name": "California" } },
    { "@type": "City", "name": "San Francisco", "containedInPlace": { "@type": "State", "name": "California" } },
    { "@type": "City", "name": "San Diego", "containedInPlace": { "@type": "State", "name": "California" } },
    { "@type": "City", "name": "Sacramento", "containedInPlace": { "@type": "State", "name": "California" } },
    { "@type": "City", "name": "San Jose", "containedInPlace": { "@type": "State", "name": "California" } },
    { "@type": "AdministrativeArea", "name": "Orange County", "containedInPlace": { "@type": "State", "name": "California" } }
  ],
  "knowsAbout": [
    "Mortgage Loans",
    "Home Financing",
    "California Mortgages",
    "Mortgage Pre-Approval",
    "Refinancing",
    "Investment Property Loans",
    "Commercial Real Estate Loans",
    "FHA Loans",
    "VA Loans",
    "DSCR Loans"
  ],
  "slogan": "Your Local Mortgage Matchmaker",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Mortgage Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Residential Mortgage Matching",
          "description": "Connect with California lenders for home purchase and refinance loans"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Investment Property Loan Matching",
          "description": "DSCR, fix-and-flip, and rental property financing"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Commercial Mortgage Matching",
          "description": "Commercial real estate and business property loans"
        }
      }
    ]
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "bestRating": "5",
    "worstRating": "1",
    "ratingCount": "2400",
    "reviewCount": "2400"
  },
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "telephone": "+1-800-555-1234",
      "contactType": "customer service",
      "areaServed": "US",
      "availableLanguage": ["English", "Spanish"]
    }
  ],
  "sameAs": [
    "https://www.facebook.com/lendywendy",
    "https://www.linkedin.com/company/lendywendy",
    "https://twitter.com/lendywendy"
  ]
};

// LocalBusiness Schema (Mortgage Broker)
const LOCAL_BUSINESS_SCHEMA = {
  "@type": ["LocalBusiness", "FinancialService", "MortgageBroker"],
  "@id": "https://lendywendy.com/#localbusiness",
  "name": "LendyWendy",
  "description": "California mortgage matching service connecting homebuyers with local mortgage lenders",
  "url": "https://lendywendy.com",
  "telephone": "+1-800-555-1234",
  "priceRange": "Free Service",
  "image": "https://lendywendy.com/og-image.jpg",
  "address": {
    "@type": "PostalAddress",
    "addressRegion": "CA",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "34.0522",
    "longitude": "-118.2437"
  },
  "areaServed": {
    "@type": "State",
    "name": "California"
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    "opens": "00:00",
    "closes": "23:59",
    "description": "AI Advisor available 24/7"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "bestRating": "5",
    "ratingCount": "2400"
  },
  "review": [
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "Maria S." },
      "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
      "reviewBody": "I was pre-approved in literally 5 minutes. The AI advisor helped me understand my options and I got a rate 0.375% lower than my bank offered!",
      "datePublished": "2025-12-15"
    },
    {
      "@type": "Review",
      "author": { "@type": "Person", "name": "James T." },
      "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
      "reviewBody": "As a self-employed business owner, I struggled to get approved anywhere. LendyWendy matched me with a lender who did bank statement loans. Closed in 3 weeks!",
      "datePublished": "2025-11-20"
    }
  ]
};

// Website Schema with SearchAction
const WEBSITE_SCHEMA = {
  "@type": "WebSite",
  "@id": "https://lendywendy.com/#website",
  "name": "LendyWendy",
  "alternateName": "Lendy Wendy Mortgage",
  "description": "AI-powered mortgage matching for California homebuyers",
  "url": "https://lendywendy.com",
  "publisher": { "@id": "https://lendywendy.com/#organization" },
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://lendywendy.com/search?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  },
  "inLanguage": "en-US"
};

// Service Schemas
const MORTGAGE_SERVICES = [
  {
    "@type": "FinancialProduct",
    "@id": "https://lendywendy.com/residential#service",
    "name": "Residential Mortgage Loans",
    "description": "California home purchase and refinance loans including Conventional, FHA, VA, and Jumbo mortgages",
    "category": "Mortgage",
    "provider": { "@id": "https://lendywendy.com/#organization" },
    "areaServed": { "@type": "State", "name": "California" },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "description": "Free mortgage matching service"
    },
    "feesAndCommissionsSpecification": "Free service - no fees to borrowers"
  },
  {
    "@type": "FinancialProduct",
    "@id": "https://lendywendy.com/investment#service",
    "name": "Investment Property Loans",
    "description": "DSCR loans, fix-and-flip financing, rental portfolio loans, and bridge loans for California real estate investors",
    "category": "Investment Property Mortgage",
    "provider": { "@id": "https://lendywendy.com/#organization" },
    "areaServed": { "@type": "State", "name": "California" }
  },
  {
    "@type": "FinancialProduct",
    "@id": "https://lendywendy.com/commercial#service",
    "name": "Commercial Real Estate Loans",
    "description": "Commercial property financing for office, retail, multi-family, and mixed-use properties in California",
    "category": "Commercial Mortgage",
    "provider": { "@id": "https://lendywendy.com/#organization" },
    "areaServed": { "@type": "State", "name": "California" }
  },
  {
    "@type": "FinancialProduct",
    "@id": "https://lendywendy.com/non-qm#service",
    "name": "Non-QM Loans",
    "description": "Alternative mortgage solutions for self-employed, bank statement income, foreign nationals, and asset-based borrowers",
    "category": "Non-Qualified Mortgage",
    "provider": { "@id": "https://lendywendy.com/#organization" },
    "areaServed": { "@type": "State", "name": "California" }
  }
];

// Homepage FAQ Schema - Optimized for featured snippets & voice search
const HOMEPAGE_FAQ = {
  "@type": "FAQPage",
  "@id": "https://lendywendy.com/#faq",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is LendyWendy?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "LendyWendy is an AI-powered mortgage matching service that connects California homebuyers with top-rated local mortgage lenders. Our technology analyzes your financial profile and matches you with lenders offering the best rates for your specific situation."
      }
    },
    {
      "@type": "Question",
      "name": "Is LendyWendy free to use?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, LendyWendy is 100% free for borrowers. We are compensated by lenders when a loan closes, so there's never any cost to you for using our matching service or AI advisor."
      }
    },
    {
      "@type": "Question",
      "name": "Will checking my mortgage options affect my credit score?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. Using LendyWendy's AI advisor or Mortgage Readiness Score does not impact your credit score. We only perform a soft inquiry which has no effect on your credit."
      }
    },
    {
      "@type": "Question",
      "name": "What types of mortgages can I find through LendyWendy?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "LendyWendy matches borrowers with lenders offering all major loan types including Conventional, FHA, VA, USDA, Jumbo, DSCR, fix-and-flip, commercial mortgages, and Non-QM loans for self-employed or non-traditional income borrowers."
      }
    },
    {
      "@type": "Question",
      "name": "How fast can I get pre-approved?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Most borrowers receive pre-qualification within 2 minutes using our AI advisor. Full pre-approval with a matched lender typically takes 24-48 hours after document submission."
      }
    },
    {
      "@type": "Question",
      "name": "Does LendyWendy serve all of California?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, LendyWendy serves all California markets including Los Angeles, San Francisco, San Diego, Sacramento, San Jose, Orange County, and every other city and county in the state."
      }
    },
    {
      "@type": "Question",
      "name": "What is a DSCR loan and who qualifies?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A DSCR (Debt Service Coverage Ratio) loan is an investment property loan that qualifies borrowers based on the property's rental income rather than personal income. Real estate investors qualify when the property's rental income covers at least 100% of the mortgage payment. No tax returns or employment verification required."
      }
    },
    {
      "@type": "Question",
      "name": "What credit score do I need for a California mortgage?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Credit score requirements vary by loan type: FHA loans accept 580+ (3.5% down) or 500-579 (10% down), Conventional loans require 620+, VA loans typically need 620+, and Jumbo loans usually require 700+. LendyWendy matches you with lenders who specialize in your credit profile."
      }
    },
    {
      "@type": "Question",
      "name": "How much down payment do I need to buy a house in California?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Down payment requirements depend on loan type: VA and USDA loans offer $0 down for eligible borrowers, FHA loans require 3.5% down, Conventional loans start at 3% down for first-time buyers, and Jumbo loans typically require 10-20% down. California down payment assistance programs may also be available."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between pre-qualification and pre-approval?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Pre-qualification is a quick estimate based on self-reported information and doesn't involve a credit check. Pre-approval is a formal commitment from a lender after reviewing your credit, income, and assets. Pre-approval letters make your offers more competitive in California's housing market."
      }
    }
  ]
};

// HowTo Schema - Optimized for featured snippets & voice search
const HOWTO_MORTGAGE_MATCHING = {
  "@type": "HowTo",
  "@id": "https://lendywendy.com/#howto",
  "name": "How to Get the Best Mortgage Rate in California",
  "description": "Step-by-step guide to finding and comparing mortgage rates from California lenders using LendyWendy's AI-powered matching service",
  "image": "https://lendywendy.com/images/how-it-works.jpg",
  "totalTime": "PT5M",
  "estimatedCost": {
    "@type": "MonetaryAmount",
    "currency": "USD",
    "value": "0"
  },
  "supply": [],
  "tool": [
    {
      "@type": "HowToTool",
      "name": "LendyWendy AI Mortgage Advisor"
    }
  ],
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Tell us your mortgage goals",
      "text": "Spend 60 seconds chatting with Wendy, our AI advisor, or fill out a quick form. Tell us if you're buying, refinancing, or investing, your budget, and timeline.",
      "url": "https://lendywendy.com/get-quote",
      "image": "https://lendywendy.com/images/step-1-goals.jpg"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Get matched with California lenders",
      "text": "Our AI algorithm analyzes your profile and matches you with up to 3 pre-vetted local California lenders who specialize in your loan type. No spam calls or selling your data.",
      "url": "https://lendywendy.com/get-quote",
      "image": "https://lendywendy.com/images/step-2-match.jpg"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Compare rates and choose your lender",
      "text": "Receive personalized rate quotes from competing lenders. Compare APR, fees, and terms side-by-side. Choose the best offer and close with confidence.",
      "url": "https://lendywendy.com/get-quote",
      "image": "https://lendywendy.com/images/step-3-compare.jpg"
    }
  ]
};

// Speakable Schema - Voice search optimization
const SPEAKABLE_SCHEMA = {
  "@type": "WebPage",
  "speakable": {
    "@type": "SpeakableSpecification",
    "cssSelector": [
      "h1",
      ".hero-description",
      ".how-it-works h2",
      ".loan-types h3"
    ]
  }
};

// ItemList Schema - For loan type comparison (rich results)
const LOAN_TYPES_ITEMLIST = {
  "@type": "ItemList",
  "@id": "https://lendywendy.com/#loan-types",
  "name": "California Mortgage Loan Types",
  "description": "Complete guide to mortgage loan options available through LendyWendy in California",
  "numberOfItems": 12,
  "itemListOrder": "https://schema.org/ItemListOrderDescending",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "item": {
        "@type": "FinancialProduct",
        "name": "Conventional Mortgage Loans",
        "description": "Traditional home loans with 3-20% down payment, PMI cancellable at 80% LTV, requiring 620+ credit score",
        "category": "Residential Mortgage",
        "url": "https://lendywendy.com/residential#conventional"
      }
    },
    {
      "@type": "ListItem",
      "position": 2,
      "item": {
        "@type": "FinancialProduct",
        "name": "FHA Loans",
        "description": "Government-insured mortgages with 3.5% down payment and 580+ credit score requirement",
        "category": "Government-Backed Mortgage",
        "url": "https://lendywendy.com/residential#fha"
      }
    },
    {
      "@type": "ListItem",
      "position": 3,
      "item": {
        "@type": "FinancialProduct",
        "name": "VA Loans",
        "description": "Zero down payment mortgages for veterans and active military with no PMI requirement",
        "category": "Government-Backed Mortgage",
        "url": "https://lendywendy.com/residential#va"
      }
    },
    {
      "@type": "ListItem",
      "position": 4,
      "item": {
        "@type": "FinancialProduct",
        "name": "Jumbo Loans",
        "description": "High-value mortgages exceeding conforming loan limits, up to $5M+ in California",
        "category": "Residential Mortgage",
        "url": "https://lendywendy.com/residential#jumbo"
      }
    },
    {
      "@type": "ListItem",
      "position": 5,
      "item": {
        "@type": "FinancialProduct",
        "name": "DSCR Investment Loans",
        "description": "Debt Service Coverage Ratio loans qualifying on rental income, no tax returns required",
        "category": "Investment Property Loan",
        "url": "https://lendywendy.com/investment#dscr"
      }
    },
    {
      "@type": "ListItem",
      "position": 6,
      "item": {
        "@type": "FinancialProduct",
        "name": "Fix and Flip Loans",
        "description": "Short-term financing for house flippers with 80-90% LTV and 7-14 day closing",
        "category": "Investment Property Loan",
        "url": "https://lendywendy.com/investment#fix-flip"
      }
    },
    {
      "@type": "ListItem",
      "position": 7,
      "item": {
        "@type": "FinancialProduct",
        "name": "Commercial Real Estate Loans",
        "description": "Financing for office, retail, industrial, and multi-family properties in California",
        "category": "Commercial Mortgage",
        "url": "https://lendywendy.com/commercial"
      }
    },
    {
      "@type": "ListItem",
      "position": 8,
      "item": {
        "@type": "FinancialProduct",
        "name": "SBA Loans",
        "description": "Small Business Administration 7(a) and 504 loans for business real estate and equipment",
        "category": "Business Loan",
        "url": "https://lendywendy.com/commercial#sba"
      }
    }
  ]
};

// Entity Definitions - Establishing semantic relationships (triples)
const ENTITY_DEFINITIONS = {
  "@type": "DefinedTermSet",
  "@id": "https://lendywendy.com/#entities",
  "name": "Mortgage Industry Terms",
  "hasDefinedTerm": [
    {
      "@type": "DefinedTerm",
      "name": "Mortgage",
      "description": "A loan secured by real property used to purchase or refinance a home",
      "inDefinedTermSet": "https://lendywendy.com/#entities"
    },
    {
      "@type": "DefinedTerm",
      "name": "APR (Annual Percentage Rate)",
      "description": "The yearly cost of borrowing including interest rate and fees",
      "inDefinedTermSet": "https://lendywendy.com/#entities"
    },
    {
      "@type": "DefinedTerm",
      "name": "LTV (Loan-to-Value)",
      "description": "Ratio comparing loan amount to appraised property value",
      "inDefinedTermSet": "https://lendywendy.com/#entities"
    },
    {
      "@type": "DefinedTerm",
      "name": "DTI (Debt-to-Income)",
      "description": "Ratio comparing monthly debt payments to gross monthly income",
      "inDefinedTermSet": "https://lendywendy.com/#entities"
    },
    {
      "@type": "DefinedTerm",
      "name": "Pre-Approval",
      "description": "Conditional commitment from a lender specifying loan amount after credit review",
      "inDefinedTermSet": "https://lendywendy.com/#entities"
    },
    {
      "@type": "DefinedTerm",
      "name": "DSCR (Debt Service Coverage Ratio)",
      "description": "Measure of rental income versus mortgage payment for investment properties",
      "inDefinedTermSet": "https://lendywendy.com/#entities"
    },
    {
      "@type": "DefinedTerm",
      "name": "Non-QM Loan",
      "description": "Non-Qualified Mortgage for borrowers who don't meet traditional lending criteria",
      "inDefinedTermSet": "https://lendywendy.com/#entities"
    },
    {
      "@type": "DefinedTerm",
      "name": "PMI (Private Mortgage Insurance)",
      "description": "Insurance required when down payment is less than 20% on conventional loans",
      "inDefinedTermSet": "https://lendywendy.com/#entities"
    }
  ]
};

// Semantic Triple Relationships (Subject-Predicate-Object)
const ENTITY_RELATIONSHIPS = {
  "@type": "Dataset",
  "@id": "https://lendywendy.com/#relationships",
  "name": "LendyWendy Service Relationships",
  "description": "Semantic relationships between mortgage entities",
  "about": [
    {
      "@type": "Thing",
      "name": "LendyWendy",
      "description": "AI mortgage matching platform",
      "subjectOf": "connects California homebuyers with mortgage lenders",
      "isPartOf": { "@type": "Thing", "name": "California mortgage industry" }
    },
    {
      "@type": "Thing",
      "name": "California homebuyer",
      "description": "Person purchasing property in California",
      "potentialAction": { "@type": "Action", "name": "obtains mortgage through LendyWendy" }
    },
    {
      "@type": "Thing",
      "name": "Mortgage lender",
      "description": "Financial institution providing home loans",
      "memberOf": { "@type": "Thing", "name": "LendyWendy lender network" }
    }
  ]
};

// ProfessionalService Schema - E-E-A-T signals
const PROFESSIONAL_SERVICE = {
  "@type": "ProfessionalService",
  "@id": "https://lendywendy.com/#professional-service",
  "name": "LendyWendy Mortgage Advisory",
  "description": "Licensed mortgage advisory service connecting California borrowers with qualified lenders",
  "url": "https://lendywendy.com",
  "serviceType": ["Mortgage Broker", "Financial Advisory", "Loan Matching"],
  "hasCredential": [
    {
      "@type": "EducationalOccupationalCredential",
      "credentialCategory": "license",
      "name": "California DRE License",
      "recognizedBy": {
        "@type": "Organization",
        "name": "California Department of Real Estate"
      }
    },
    {
      "@type": "EducationalOccupationalCredential",
      "credentialCategory": "license",
      "name": "NMLS License #1945913",
      "recognizedBy": {
        "@type": "Organization",
        "name": "Nationwide Multistate Licensing System"
      }
    }
  ],
  "knowsAbout": [
    "California real estate market",
    "Mortgage underwriting guidelines",
    "FHA loan requirements",
    "VA loan eligibility",
    "DSCR loan qualification",
    "Jumbo loan limits California",
    "First-time homebuyer programs",
    "Mortgage rate comparison",
    "Refinancing strategies",
    "Investment property financing"
  ],
  "areaServed": {
    "@type": "State",
    "name": "California",
    "containsPlace": [
      { "@type": "City", "name": "Los Angeles" },
      { "@type": "City", "name": "San Francisco" },
      { "@type": "City", "name": "San Diego" },
      { "@type": "City", "name": "San Jose" },
      { "@type": "City", "name": "Sacramento" },
      { "@type": "City", "name": "Fresno" },
      { "@type": "City", "name": "Oakland" },
      { "@type": "City", "name": "Long Beach" },
      { "@type": "City", "name": "Bakersfield" },
      { "@type": "City", "name": "Anaheim" },
      { "@type": "City", "name": "Santa Ana" },
      { "@type": "City", "name": "Riverside" },
      { "@type": "City", "name": "Irvine" }
    ]
  }
};

// Generate Breadcrumb Schema
function generateBreadcrumbs(items: Array<{ name: string; url: string }>) {
  return {
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url.startsWith('http') ? item.url : `https://lendywendy.com${item.url}`
    }))
  };
}

// Generate WebPage Schema
function generateWebPage(props: SchemaProps) {
  return {
    "@type": "WebPage",
    "@id": `https://lendywendy.com${props.pageUrl || '/'}#webpage`,
    "url": `https://lendywendy.com${props.pageUrl || '/'}`,
    "name": props.pageTitle || "LendyWendy - California Mortgage Matching",
    "description": props.pageDescription || "AI-powered mortgage matching for California homebuyers",
    "isPartOf": { "@id": "https://lendywendy.com/#website" },
    "about": { "@id": "https://lendywendy.com/#organization" },
    "author": { "@id": "https://lendywendy.com/#wendy-landeros" },
    "creator": { "@id": "https://lendywendy.com/#wendy-landeros" },
    "inLanguage": "en-US",
    "datePublished": "2024-01-01",
    "dateModified": new Date().toISOString().split('T')[0]
  };
}

// Main Component
export function StructuredData({
  type = 'home',
  pageTitle,
  pageDescription,
  pageUrl = '/',
  breadcrumbs,
  faqItems,
  includeHowTo = false
}: SchemaProps) {

  // Build the complete schema graph with comprehensive semantic markup
  const schemaGraph: Record<string, unknown>[] = [
    // Core Entity Schemas (E-E-A-T)
    WENDY_LANDEROS,
    ORGANIZATION_SCHEMA,
    LOCAL_BUSINESS_SCHEMA,
    WEBSITE_SCHEMA,
    PROFESSIONAL_SERVICE,
    generateWebPage({ pageTitle, pageDescription, pageUrl }),
  ];

  // Add homepage-specific schemas
  if (type === 'home') {
    // Service schemas
    schemaGraph.push(...MORTGAGE_SERVICES);

    // FAQ for rich snippets
    schemaGraph.push(HOMEPAGE_FAQ);

    // HowTo for process visualization
    schemaGraph.push(HOWTO_MORTGAGE_MATCHING);

    // ItemList for loan type comparison
    schemaGraph.push(LOAN_TYPES_ITEMLIST);

    // Entity definitions for knowledge graph
    schemaGraph.push(ENTITY_DEFINITIONS);

    // Semantic relationships (triples)
    schemaGraph.push(ENTITY_RELATIONSHIPS);
  }

  // Add HowTo on service pages if requested
  if (includeHowTo && type !== 'home') {
    schemaGraph.push(HOWTO_MORTGAGE_MATCHING);
  }

  // Add breadcrumbs if provided
  if (breadcrumbs && breadcrumbs.length > 0) {
    schemaGraph.push(generateBreadcrumbs([
      { name: 'Home', url: '/' },
      ...breadcrumbs
    ]));
  }

  // Add custom FAQ if provided (for service pages)
  if (faqItems && faqItems.length > 0) {
    schemaGraph.push({
      "@type": "FAQPage",
      "mainEntity": faqItems.map(item => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.answer
        }
      }))
    });
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": schemaGraph
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd, null, 0) }}
    />
  );
}

// Additional SEO Component for Semantic HTML Meta Tags
export function SemanticMeta({
  title,
  description,
  keywords,
  canonicalUrl,
  ogImage = "https://lendywendy.com/og-image.jpg",
  author = "Wendy Landeros, NMLS #1945913"
}: {
  title: string;
  description: string;
  keywords?: string[];
  canonicalUrl: string;
  ogImage?: string;
  author?: string;
}) {
  // N-gram optimized keywords for California mortgage market
  const defaultKeywords = [
    // Primary n-grams (high salience)
    "California mortgage",
    "mortgage lender California",
    "home loan California",
    "refinance California",
    // Secondary n-grams (medium salience)
    "FHA loan California",
    "VA loan California",
    "jumbo loan California",
    "DSCR loan",
    "investment property loan",
    // Long-tail n-grams (specific intent)
    "best mortgage rates California",
    "California mortgage broker",
    "pre-approval California",
    "first-time homebuyer California",
    // Location-specific n-grams
    "mortgage Los Angeles",
    "mortgage San Francisco",
    "mortgage San Diego",
    "mortgage Sacramento",
    "mortgage Orange County",
    // Entity n-grams (knowledge graph)
    "AI mortgage advisor",
    "mortgage comparison California",
    "mortgage matching service"
  ];

  const allKeywords = keywords ? [...keywords, ...defaultKeywords] : defaultKeywords;

  return (
    <>
      {/* Primary Meta Tags */}
      <meta name="keywords" content={allKeywords.join(", ")} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />

      {/* Geo Meta Tags for Local SEO */}
      <meta name="geo.region" content="US-CA" />
      <meta name="geo.placename" content="California" />
      <meta name="geo.position" content="34.0522;-118.2437" />
      <meta name="ICBM" content="34.0522, -118.2437" />

      {/* Open Graph (Facebook, LinkedIn) */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:site_name" content="LendyWendy" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:site" content="@lendywendy" />

      {/* Additional SEO Meta */}
      <meta name="format-detection" content="telephone=yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="LendyWendy" />

      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
    </>
  );
}

export default StructuredData;
