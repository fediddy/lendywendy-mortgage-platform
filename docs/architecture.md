# LendyWendy.com - Technical Architecture

**Author:** BMad
**Date:** 2025-11-04
**Version:** 1.0
**Project:** Mortgage Lead Generation Platform with Topical Authority Strategy

---

## Executive Summary

This architecture defines the technical decisions and implementation patterns for LendyWendy.com—a custom-built, SEO-first mortgage lead generation platform targeting residential, investment property, and commercial real estate financing segments.

**Core Architectural Principles:**
1. **SEO-First:** Every technical decision optimized for search engine visibility and Core Web Vitals
2. **Custom-Built:** Full control over lead capture optimization, not constrained by WordPress limitations
3. **Fintech Compliance:** Security and regulatory compliance baked into architecture from day one
4. **AI-Agent Consistency:** Clear patterns and conventions to prevent development agent conflicts

---

## Technology Stack Decision

### Recommended Starter: **create-next-app** (Official Next.js)

**Command:**
```bash
npx create-next-app@latest lendywendy --typescript --tailwind --app --eslint
cd lendywendy
npm install
```

**Why This Choice:**
- **Official Next.js CLI** - Latest Next.js 15 with App Router (optimal for SEO with SSR/SSG)
- **Zero boilerplate complexity** - Start clean and add exactly what you need
- **TypeScript** - Type safety prevents bugs at scale
- **Tailwind CSS** - Rapid UI development with utility-first approach
- **App Router** - Server Components for better performance and SEO

**Alternative Considered:** SaaS boilerplates (SaaSBold, ChadNext) were considered but **rejected** because:
- Include features you don't need (billing, teams, multi-tenancy beyond what's required)
- Opinionated structure may conflict with custom CMS needs
- Learning curve for boilerplate conventions vs standard Next.js
- **Decision: Start lean, add features as needed per epic stories**

---

## Core Technology Decisions

### Frontend Framework
**Decision:** Next.js 15 with App Router
**Rationale:**
- Server-side rendering critical for SEO (search engines see full HTML)
- Static generation for hub landing pages (maximum performance)
- Dynamic rendering for article pages (fresh content, personalized CTAs)
- Built-in image optimization (Core Web Vitals LCP optimization)
- API routes for backend logic (no separate backend needed for MVP)

**Alternatives Considered:**
- Remix: Strong SSR but smaller ecosystem
- Gatsby: Pure static site generator, less flexible for dynamic lead forms
- **Decision: Next.js dominates SEO-focused web apps with best DX**

---

### Database & ORM
**Decision:** PostgreSQL + Prisma ORM
**Hosting:** Vercel Postgres (seamless integration) or Neon (generous free tier)

**Rationale:**
- PostgreSQL: Industry-standard RDBMS, JSON support for flexible content fields
- Prisma: Type-safe database access, excellent DX with auto-completion
- Migration system for schema evolution
- Prisma Studio for database GUI during development

**Schema Design Principles:**
- Normalize data (separate tables for Articles, Users, Leads, Partners, Categories, Tags)
- Indexes on frequently queried fields (slug, status, segment, published_at)
- JSONB fields for flexible content (article schema_markup, lead metadata)
- Soft deletes for compliance (deleted_at instead of hard delete)

**Alternatives Considered:**
- Drizzle ORM: Lighter weight but less mature tooling
- MongoDB: Document model attractive but PostgreSQL relational model better for lead/partner relationships
- **Decision: PostgreSQL + Prisma is industry standard with best TypeScript integration**

---

### Authentication & Authorization
**Decision:** NextAuth.js v5 (Auth.js)
**Strategy:** Credentials provider (email/password) + future OAuth

**Rationale:**
- Industry-standard auth for Next.js
- Role-based access control (RBAC) built-in
- Secure session management (encrypted JWT or database sessions)
- Easy OAuth provider addition later (Google, Microsoft for partners)

**Security Requirements:**
- Bcrypt password hashing (10+ salt rounds)
- httpOnly cookies for session tokens (prevent XSS)
- CSRF protection on all forms
- MFA for admin accounts (future enhancement)

**Roles:**
- **Admin**: Full access (manage content, leads, partners, settings)
- **Editor**: Content creation and management only
- **Partner**: Access to assigned leads via partner portal

---

### UI Component Library
**Decision:** shadcn/ui + Radix UI + Tailwind CSS

**Rationale:**
- **shadcn/ui**: Copy-paste components (no package dependencies, full control)
- **Radix UI**: Accessible primitives (WCAG 2.1 AA compliance out of the box)
- **Tailwind CSS**: Utility-first styling (rapid development, consistent design)
- Components are customizable (not locked into opinionated design)

**Design System:**
- Color Palette: Primary (blue for trust), Secondary (green for action), Neutral (grays)
- Typography: System font stack for performance (Segoe UI, Roboto, Helvetica, Arial)
- Spacing: Tailwind's 4px base unit scale
- Breakpoints: Mobile-first (sm: 640px, md: 768px, lg: 1024px, xl: 1280px)

**Component Architecture:**
```
/components
  /ui           # shadcn/ui primitives (Button, Input, Card, Dialog, etc.)
  /forms        # Form components (LeadForm, LoginForm, etc.)
  /content      # Content-specific (ArticleCard, RelatedArticles, etc.)
  /dashboard    # Admin dashboard components
  /partner      # Partner portal components
```

---

### Content Management System (CMS)
**Decision:** Custom-built CMS (not headless CMS like Sanity or Contentful)

**Rationale:**
- **Full control** over SEO optimization tools integrated into editor
- **No vendor lock-in** or monthly SaaS fees
- **Performance** - no external API calls for content rendering
- **Customization** - internal linking suggestions, schema markup generation tailored to mortgage content

**CMS Architecture:**
- Rich text editor: **Tiptap** (headless, extensible, React-friendly)
- Content storage: Markdown in PostgreSQL TEXT field (portable, git-friendly)
- Image storage: **Vercel Blob** or **Cloudinary** (CDN, optimization, transformations)
- SEO tools: Real-time analysis as editor types (keyword density, readability, meta preview)
- Schema markup: Auto-generated JSON-LD based on article type (Article, HowTo, FAQPage)

**Content Model:**
```prisma
model Article {
  id                String    @id @default(cuid())
  title             String
  slug              String    @unique
  content           String    @db.Text // Markdown
  excerpt           String?
  authorId          String
  author            User      @relation(fields: [authorId], references: [id])
  status            ArticleStatus // DRAFT, REVIEW, PUBLISHED, ARCHIVED
  segment           Segment   // RESIDENTIAL, INVESTMENT, COMMERCIAL
  featuredImage     String?
  metaTitle         String?
  metaDescription   String?
  schemaMarkup      Json?     // JSON-LD structured data
  publishedAt       DateTime?
  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt
  tags              Tag[]     @relation("ArticleTags")
  category          Category? @relation(fields: [categoryId], references: [id])
  categoryId        String?
}
```

---

### SEO Infrastructure
**Decision:** Next.js Metadata API + Custom SEO Components

**Technical SEO Checklist:**
1. **Metadata:**
   - Dynamic meta tags per page (title, description, OG tags, Twitter Cards)
   - Canonical URLs on all pages
   - robots meta tags (index/noindex, follow/nofollow)

2. **Structured Data:**
   - JSON-LD schema in `<head>` (Article, BreadcrumbList, Organization)
   - Auto-generated from article metadata
   - Validated against schema.org

3. **Sitemaps:**
   - Dynamic XML sitemap at `/sitemap.xml`
   - Auto-updates when articles published
   - Submitted to Google Search Console, Bing Webmaster

4. **Performance (Core Web Vitals):**
   - next/image for automatic image optimization
   - Font optimization with next/font (preload, font-display: swap)
   - Code splitting (dynamic imports for heavy components)
   - Edge caching for static assets (Vercel Edge Network)

5. **Crawlability:**
   - Clean semantic HTML
   - Proper heading hierarchy (single H1, logical H2-H6)
   - Breadcrumb navigation
   - Internal linking strategy (5-10 links per article)

**SEO Component Pattern:**
```typescript
// app/[segment]/[slug]/page.tsx
export async function generateMetadata({ params }): Promise<Metadata> {
  const article = await getArticle(params.slug);
  return {
    title: article.metaTitle || article.title,
    description: article.metaDescription || article.excerpt,
    openGraph: {
      title: article.metaTitle,
      description: article.metaDescription,
      images: [article.featuredImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.metaTitle,
      description: article.metaDescription,
      images: [article.featuredImage],
    },
  };
}
```

---

## Application Architecture

### Project Structure

```
lendywendy/
├── app/                          # Next.js App Router
│   ├── (public)/                 # Public-facing pages
│   │   ├── page.tsx              # Homepage
│   │   ├── residential-mortgages/
│   │   │   ├── page.tsx          # Residential hub landing
│   │   │   └── [slug]/
│   │   │       └── page.tsx      # Article page
│   │   ├── investment-property-loans/
│   │   │   ├── page.tsx          # Investment hub landing
│   │   │   └── [slug]/page.tsx
│   │   └── commercial-mortgages/
│   │       ├── page.tsx          # Commercial hub landing
│   │       └── [slug]/page.tsx
│   ├── admin/                    # Admin dashboard
│   │   ├── layout.tsx            # Admin layout with auth check
│   │   ├── articles/
│   │   │   ├── page.tsx          # Article list
│   │   │   ├── new/page.tsx      # Create article
│   │   │   └── [id]/edit/page.tsx # Edit article
│   │   ├── leads/page.tsx        # Lead management
│   │   ├── partners/page.tsx     # Partner management
│   │   └── analytics/page.tsx    # Analytics dashboard
│   ├── partner/                  # Partner portal
│   │   ├── layout.tsx            # Partner layout
│   │   ├── dashboard/page.tsx    # Partner dashboard
│   │   └── leads/page.tsx        # Assigned leads
│   ├── api/                      # API routes
│   │   ├── auth/[...nextauth]/   # NextAuth endpoints
│   │   ├── leads/route.ts        # Lead CRUD operations
│   │   ├── articles/route.ts     # Article operations
│   │   └── analytics/route.ts    # Analytics data
│   ├── login/page.tsx            # Login page
│   ├── sitemap.ts                # Dynamic sitemap generation
│   └── layout.tsx                # Root layout
├── components/
│   ├── ui/                       # shadcn/ui components
│   ├── forms/                    # Form components
│   ├── content/                  # Content display components
│   ├── dashboard/                # Dashboard widgets
│   └── seo/                      # SEO components (SchemaMarkup, etc.)
├── lib/
│   ├── db.ts                     # Prisma client singleton
│   ├── auth.ts                   # Auth configuration
│   ├── utils.ts                  # Utility functions
│   ├── seo/                      # SEO utilities
│   │   ├── schema.ts             # Schema generation
│   │   ├── metadata.ts           # Metadata helpers
│   │   └── scoring.ts            # SEO score calculation
│   └── email/                    # Email utilities
│       ├── templates/            # React Email templates
│       └── send.ts               # Email sending logic
├── prisma/
│   ├── schema.prisma             # Database schema
│   └── migrations/               # Database migrations
├── public/
│   ├── images/                   # Static images
│   └── robots.txt                # Robots.txt
└── package.json
```

---

### Hosting & Deployment
**Decision:** Vercel (Platform for Next.js)

**Rationale:**
- **Zero-config deployment** for Next.js (built by same team)
- **Edge Network CDN** globally distributed (fast page loads worldwide)
- **Preview deployments** for every pull request (QA before production)
- **Environment variables** managed in dashboard (secure secret storage)
- **Automatic HTTPS** with SSL certificates
- **Serverless Functions** for API routes (scales automatically)
- **Vercel Postgres** seamless database integration

**Deployment Workflow:**
1. Push to `main` branch → automatic production deployment
2. Push to `develop` branch → staging environment
3. Pull request → preview deployment with unique URL
4. Rollback capability within seconds if issues detected

**Alternatives Considered:**
- AWS Amplify: More complex setup, overkill for this project
- Netlify: Good but Vercel optimized specifically for Next.js
- Railway/Render: Excellent alternatives but Vercel ecosystem integration unmatched

---

## Lead Generation Architecture

### Lead Capture Flow

```
User lands on article (organic search)
    ↓
Reads content, scrolls down
    ↓
Lead magnets appear (calculator, exit-intent popup)
    ↓
User interacts with calculator
    ↓
CTA: "Get Matched with Lenders"
    ↓
Multi-step form (4 steps)
    ↓
Form submission → Lead created in database
    ↓
Lead scoring algorithm runs (0-100 points)
    ↓
Lead assigned to lender partner (auto-distribution)
    ↓
Email notifications:
  - Lead: Confirmation email
  - Partner: New lead assignment
    ↓
Partner contacts lead → Status updated
```

### Lead Scoring Algorithm

**Scoring Factors (0-100 points):**
```typescript
// lib/leads/scoring.ts
export function calculateLeadScore(lead: Lead): number {
  let score = 0;

  // Segment value (40 points max)
  if (lead.segment === 'COMMERCIAL') score += 40;
  else if (lead.segment === 'INVESTMENT') score += 30;
  else if (lead.segment === 'RESIDENTIAL') score += 20;

  // Timeline urgency (20 points max)
  if (lead.timeline === 'IMMEDIATE') score += 20;
  else if (lead.timeline === 'WITHIN_3_MONTHS') score += 15;
  else if (lead.timeline === 'WITHIN_6_MONTHS') score += 10;
  else score += 5;

  // Credit quality (15 points max)
  if (lead.creditRange === 'EXCELLENT') score += 15;
  else if (lead.creditRange === 'GOOD') score += 10;
  else if (lead.creditRange === 'FAIR') score += 5;

  // Down payment (10 points max)
  if (lead.downPaymentPercent >= 20) score += 10;
  else if (lead.downPaymentPercent >= 10) score += 5;

  // Pre-approval status (15 points max)
  if (lead.preApproved) score += 15;

  return score;
}

// Score categories
// Hot: 80-100 (immediate follow-up required)
// Warm: 60-79 (follow-up within 24 hours)
// Cold: 0-59 (nurture sequence)
```

### Lead Distribution Logic

**Auto-assignment Rules:**
```typescript
// lib/leads/distribution.ts
async function assignLead(lead: Lead) {
  // 1. Find partners accepting this segment
  const qualifiedPartners = await prisma.partner.findMany({
    where: {
      status: 'ACTIVE',
      segmentsAccepted: { has: lead.segment },
      // Check volume cap not exceeded
      _count: {
        leadsAssigned: {
          where: {
            createdAt: { gte: startOfMonth() }
          }
        }
      }
    }
  });

  // 2. Filter by region if lead has location
  const regionMatched = lead.location
    ? qualifiedPartners.filter(p => p.regions.includes(lead.location))
    : qualifiedPartners;

  // 3. Round-robin among remaining partners
  const partner = await getNextPartnerRoundRobin(regionMatched);

  // 4. Assign with exclusivity timer
  await prisma.lead.update({
    where: { id: lead.id },
    data: {
      assignedToId: partner.id,
      assignedAt: new Date(),
      exclusivityExpiresAt: addHours(new Date(), 48)
    }
  });

  // 5. Send email notification to partner
  await sendPartnerLeadNotification(partner, lead);
}
```

---

## Security & Compliance Architecture

### Security Layers

**1. Application Security:**
- Input validation and sanitization (Zod schemas on all forms)
- SQL injection prevention (Prisma parameterized queries)
- XSS protection (Content Security Policy headers, React automatic escaping)
- CSRF protection (NextAuth CSRF tokens)
- Rate limiting (100 requests/min per IP on API routes)

**2. Data Protection:**
- HTTPS enforced site-wide (TLS 1.3 via Vercel)
- Lead PII encrypted at rest (database-level encryption)
- Password hashing (bcrypt with 10+ salt rounds)
- Secure session management (httpOnly cookies, 30-min timeout)

**3. Access Control:**
- Role-based access control (RBAC) enforced on all protected routes
- Middleware checks authentication and role before page render
- API routes validate auth token on every request

**Security Headers (next.config.js):**
```javascript
const securityHeaders = [
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'Content-Security-Policy',
    value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline';",
  },
];
```

### Compliance Requirements

**GDPR/CCPA:**
- Cookie consent banner on first visit
- Privacy policy page with data collection disclosure
- Lead data deletion capability (soft delete with PII redaction after 90 days)
- Data export capability (download personal data as JSON)
- Opt-out from marketing communications

**Financial Advertising (TILA, RESPA, TCPA):**
- Equal Housing Opportunity disclaimer on all pages
- "Not a lender" disclaimer in footer
- APR disclosure when rates mentioned
- TCPA consent checkbox on lead forms ("I agree to be contacted via phone/SMS")
- Lead consent timestamp and IP address logged (audit trail)

**Audit Trail:**
```prisma
model AuditLog {
  id        String   @id @default(cuid())
  userId    String?
  action    String   // "LEAD_CREATED", "LEAD_ASSIGNED", "ARTICLE_PUBLISHED"
  resource  String   // "Lead", "Article", "User"
  resourceId String
  metadata  Json?    // Additional context
  ipAddress String?
  createdAt DateTime @default(now())
}
```

---

## Analytics & Monitoring Architecture

### Analytics Stack

**1. Google Analytics 4:**
- Page views, sessions, user demographics
- Custom events: `article_view`, `form_start`, `form_submit`, `calculator_use`, `lead_created`
- Conversion tracking (form submissions = conversions)
- Traffic source attribution

**2. Google Search Console:**
- Keyword rankings and impressions
- Click-through rates from search results
- Core Web Vitals monitoring
- Index coverage and sitemap status

**3. Application Analytics (Custom):**
- Content performance (article views, time on page, leads generated per article)
- Lead metrics (volume, score distribution, conversion funnel)
- Partner performance (response time, conversion rates)
- Revenue tracking (leads by segment, partner revenue)

**Implementation:**
```typescript
// lib/analytics/track.ts
export function trackEvent(
  eventName: string,
  params?: Record<string, any>
) {
  // GA4
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params);
  }

  // Internal analytics (store in DB)
  fetch('/api/analytics/events', {
    method: 'POST',
    body: JSON.stringify({ eventName, params, timestamp: Date.now() })
  });
}

// Usage in components
trackEvent('form_submit', {
  segment: 'RESIDENTIAL',
  lead_score: 85,
  source: 'article_cta'
});
```

### Monitoring & Observability

**Error Tracking:** Sentry
- Real-time error alerts
- Stack traces with source maps
- User context (logged in user, page, action)
- Performance monitoring (transaction traces)

**Uptime Monitoring:** Vercel Analytics + BetterStack (or UptimeRobot)
- 5-minute interval health checks
- Alert via email/SMS if downtime detected
- 99.9% uptime SLA target

**Performance Monitoring:**
- Real User Monitoring (RUM) via Vercel Analytics
- Core Web Vitals tracking (LCP, FID, CLS)
- API route response time tracking
- Database query performance (Prisma metrics)

---

## Email Infrastructure

**Email Service:** SendGrid (or Mailgun, AWS SES)

**Why SendGrid:**
- 99.99% deliverability rate
- Email analytics (opens, clicks, bounces)
- Template management
- Suppression list handling (unsubscribes, bounces)
- Generous free tier (100 emails/day)

**Email Architecture:**
```
/lib/email
  /templates          # React Email templates
    lead-confirmation.tsx
    partner-notification.tsx
    lead-status-update.tsx
  send.ts            # SendGrid API wrapper
  queue.ts           # Email queue (optional: BullMQ for reliability)
```

**Template System:** React Email
- Write email templates in React/TypeScript
- Preview emails in development
- Compile to production-ready HTML
- Type-safe template props

**Deliverability Setup:**
- Dedicated sending domain: `email.lendywendy.com`
- SPF record: Authorize SendGrid to send from domain
- DKIM signature: Email authentication
- DMARC policy: Prevent spoofing

**Email Triggers:**
- Lead form submission → Lead confirmation email (immediate)
- Lead assigned to partner → Partner notification email (immediate)
- Partner no response in 24 hours → Partner reminder email
- Lead status change → Lead update email
- Weekly digest → Partner performance summary email

---

## Development Workflow & CI/CD

### Git Branching Strategy

```
main         # Production (auto-deploys to lendywendy.com)
  ↓
develop      # Staging (auto-deploys to staging.lendywendy.com)
  ↓
feature/     # Feature branches (create preview deployments)
```

### Development Process

1. **Local Development:**
   ```bash
   npm run dev              # Start dev server on localhost:3000
   npx prisma studio        # Open database GUI
   npm run lint             # Check code quality
   npm run test             # Run tests (once implemented)
   ```

2. **Create Feature:**
   ```bash
   git checkout -b feature/lead-scoring-enhancement
   # Make changes
   git commit -m "Implement advanced lead scoring algorithm"
   git push origin feature/lead-scoring-enhancement
   ```

3. **Pull Request:**
   - Open PR on GitHub
   - Vercel automatically creates preview deployment
   - Code review required before merge
   - Automated checks: lint, type-check, tests

4. **Merge to Develop:**
   - Auto-deploys to staging environment
   - QA testing on staging

5. **Deploy to Production:**
   - Merge develop → main
   - Auto-deploys to production (lendywendy.com)
   - Rollback capability if issues detected

### Testing Strategy

**Unit Tests (Future):**
- Jest for utility functions (scoring algorithm, SEO helpers)
- React Testing Library for component tests

**Integration Tests (Future):**
- API route testing
- Database operations testing

**E2E Tests (Future):**
- Playwright for critical user flows
- Lead form submission end-to-end
- Article publishing workflow

**MVP Focus:** Manual testing initially, automate tests in Epic iterations

---

## Performance Optimization Strategy

### Core Web Vitals Targets

**Largest Contentful Paint (LCP):** <2.5 seconds
- Optimize hero images with next/image
- Preload critical fonts
- Server-side render above-the-fold content

**First Input Delay (FID):** <100 milliseconds
- Code splitting to reduce JavaScript bundle size
- Defer non-critical JavaScript
- Use React Server Components (no client-side hydration for static content)

**Cumulative Layout Shift (CLS):** <0.1
- Specify image dimensions (width/height attributes)
- Reserve space for ads/dynamic content
- Avoid inserting content above existing content

### Optimization Techniques

**1. Image Optimization:**
```typescript
import Image from 'next/image';

<Image
  src="/hero.jpg"
  alt="Mortgage calculator"
  width={1200}
  height={600}
  priority // Preload above-the-fold images
  placeholder="blur" // Blur-up effect while loading
/>
```

**2. Font Optimization:**
```typescript
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap', // Prevent FOIT (flash of invisible text)
});
```

**3. Code Splitting:**
```typescript
// Dynamic import for heavy components
const Calculator = dynamic(() => import('@/components/Calculator'), {
  loading: () => <CalculatorSkeleton />,
  ssr: false, // Client-side only component
});
```

**4. Database Query Optimization:**
```typescript
// Use indexes on frequently queried fields
@@index([slug])
@@index([status, segment])
@@index([publishedAt])

// Limit results and paginate
const articles = await prisma.article.findMany({
  where: { status: 'PUBLISHED' },
  take: 20, // Pagination
  skip: page * 20,
  orderBy: { publishedAt: 'desc' },
  select: { // Only select needed fields
    id: true,
    title: true,
    slug: true,
    excerpt: true,
    featuredImage: true,
    publishedAt: true,
  }
});
```

**5. Caching Strategy:**
- Static pages: Cached indefinitely until revalidated
- Dynamic pages: Revalidate every 60 seconds (ISR)
- API routes: Cache responses where appropriate
- CDN edge caching for assets

---

## Implementation Patterns for AI Agent Consistency

### File Naming Conventions

```
Components:    PascalCase      ArticleCard.tsx, LeadForm.tsx
Utilities:     camelCase       calculateScore.ts, formatDate.ts
Pages:         kebab-case      residential-mortgages/page.tsx
API Routes:    kebab-case      api/leads/route.ts
```

### Code Organization Patterns

**1. Server Components (Default):**
```typescript
// app/residential-mortgages/page.tsx
export default async function ResidentialMortgagesPage() {
  // Fetch data directly in server component
  const articles = await prisma.article.findMany({
    where: { segment: 'RESIDENTIAL', status: 'PUBLISHED' }
  });

  return <ArticleList articles={articles} />;
}
```

**2. Client Components (Interactive UI):**
```typescript
// components/forms/LeadForm.tsx
'use client'; // Declare as client component

import { useState } from 'react';

export function LeadForm() {
  const [step, setStep] = useState(1);
  // Interactive form logic
}
```

**3. API Routes Pattern:**
```typescript
// app/api/leads/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getServerSession } from 'next-auth';

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();

    // Validate input (Zod schema)
    const validatedData = leadSchema.parse(body);

    // Create lead
    const lead = await prisma.lead.create({
      data: {
        ...validatedData,
        score: calculateLeadScore(validatedData),
      }
    });

    // Return success response
    return NextResponse.json({ success: true, lead }, { status: 201 });

  } catch (error) {
    // Error handling
    console.error('Lead creation failed:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create lead' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  // Require authentication
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Fetch leads (admin) or user-specific leads (partner)
  const leads = await prisma.lead.findMany({
    where: session.user.role === 'PARTNER'
      ? { assignedToId: session.user.id }
      : {}, // Admin sees all
    orderBy: { createdAt: 'desc' },
    take: 50,
  });

  return NextResponse.json({ leads });
}
```

**4. Database Access Pattern:**
```typescript
// lib/db.ts - Prisma client singleton
import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
```

**5. Form Validation Pattern:**
```typescript
// lib/validations/lead.ts
import { z } from 'zod';

export const leadSchema = z.object({
  segment: z.enum(['RESIDENTIAL', 'INVESTMENT', 'COMMERCIAL']),
  loanType: z.string().min(1),
  propertyLocation: z.string().min(1),
  propertyPrice: z.number().positive(),
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().regex(/^\d{10}$/),
  creditRange: z.enum(['EXCELLENT', 'GOOD', 'FAIR', 'POOR']),
  downPaymentPercent: z.number().min(0).max(100),
  timeline: z.enum(['IMMEDIATE', 'WITHIN_3_MONTHS', 'WITHIN_6_MONTHS', '6_PLUS_MONTHS']),
  preApproved: z.boolean(),
  consent: z.literal(true), // TCPA consent required
});

export type LeadFormData = z.infer<typeof leadSchema>;
```

---

## Scalability Considerations

### Current Scale (MVP):
- 100,000 page views/month
- 500-1,000 leads/month
- 10-20 lender partners
- 200 published articles

### Future Scale (Year 2):
- 1,000,000+ page views/month
- 5,000-10,000 leads/month
- 50+ lender partners
- 500+ published articles

### Scalability Strategy:

**Database:**
- Vercel Postgres scales automatically (connection pooling)
- Add read replicas if query performance degrades
- Implement caching layer (Redis) for frequently accessed data
- Archive old leads (>1 year) to separate table

**Application:**
- Next.js API routes are serverless (auto-scale)
- Static generation for content (no server load)
- Edge caching via Vercel CDN (global distribution)
- Incremental Static Regeneration (ISR) for article pages

**Email:**
- SendGrid scales to millions of emails
- Implement email queue (BullMQ + Redis) for reliability at high volume

**Lead Distribution:**
- Current: Synchronous assignment on form submission
- Future: Queue-based system (assign leads asynchronously)
- Partner capacity management (real-time volume tracking)

---

## Risk Mitigation & Contingency Plans

### Technical Risks

**Risk 1: Vercel Vendor Lock-in**
- **Mitigation:** Next.js is open-source, can deploy to any Node.js host
- **Contingency:** Document migration path to AWS Amplify or self-hosted (Docker)

**Risk 2: Database Performance Degradation**
- **Mitigation:** Proper indexing, query optimization from day one
- **Contingency:** Migrate to managed PostgreSQL (AWS RDS, Neon with higher tier)

**Risk 3: Email Deliverability Issues**
- **Mitigation:** Dedicated sending domain, SPF/DKIM/DMARC setup, monitor bounce rates
- **Contingency:** Switch email provider (Mailgun, AWS SES) if SendGrid issues

**Risk 4: SEO Algorithm Changes**
- **Mitigation:** Focus on fundamentals (quality content, technical SEO), not tricks
- **Contingency:** Diversify traffic (social, paid, email list) don't rely 100% on organic

### Compliance Risks

**Risk 1: Regulatory Violation (TILA, RESPA, TCPA)**
- **Mitigation:** Legal review of all disclaimers and consent language
- **Contingency:** Legal counsel on retainer for rapid response

**Risk 2: Data Breach**
- **Mitigation:** Security best practices, encryption, access controls
- **Contingency:** Incident response plan, cyber insurance, breach notification procedures

---

## Summary: Architecture Decision Records (ADRs)

| Decision | Choice | Rationale |
|----------|--------|-----------|
| **Frontend Framework** | Next.js 15 App Router | SEO-first SSR, best-in-class DX, Vercel integration |
| **Language** | TypeScript | Type safety prevents bugs, better IDE support |
| **Database** | PostgreSQL + Prisma | Industry standard, type-safe ORM, excellent migrations |
| **Hosting** | Vercel | Zero-config Next.js deployment, global CDN, serverless |
| **UI Framework** | shadcn/ui + Tailwind | Accessible components, rapid development, full control |
| **CMS** | Custom-built (Tiptap) | Full SEO control, no vendor lock-in, tailored to mortgage content |
| **Authentication** | NextAuth.js | Industry standard for Next.js, OAuth-ready, secure |
| **Email** | SendGrid + React Email | High deliverability, template management, analytics |
| **Monitoring** | Sentry + Vercel Analytics | Error tracking, performance monitoring, uptime |
| **Analytics** | GA4 + Search Console | Industry standard, SEO insights, conversion tracking |

---

## Next Steps: Implementation Roadmap

**Immediate (Week 1):**
1. Run `npx create-next-app@latest` to initialize project
2. Set up Vercel Postgres database and Prisma
3. Implement authentication (NextAuth.js)
4. Deploy to Vercel (establish CI/CD pipeline)

**Sprint 1 (Weeks 2-3): Epic 1 - Foundation**
- Complete all 6 foundation stories
- Deployable application with auth and basic UI

**Sprint 2-3 (Weeks 4-7): Epic 2 - CMS**
- Build custom CMS with rich text editor
- SEO tools and schema markup generation
- Article management dashboard

**Sprint 4-5 (Weeks 8-11): Epic 3-4 - SEO & Content Hubs**
- Core Web Vitals optimization
- Three-segment hub architecture
- Initial content seeding (first 50 articles)

**Sprint 6-8 (Weeks 12-17): Epic 5-6 - Lead Generation**
- Multi-step forms and lead capture
- Lead scoring and CRM integration
- Partner portal and distribution system

**Sprint 9-10 (Weeks 18-21): Epic 7-10 - Analytics, Email, Compliance, Polish**
- Analytics dashboards
- Email system
- Security hardening and compliance
- UX refinements and accessibility

**Target: MVP launch in 21 weeks (5 months)**

---

**This architecture provides the foundation for building LendyWendy's compounding topical authority—optimized for SEO, secure for fintech compliance, and designed for AI agent implementation consistency.**

---

_Architecture Document v1.0 - Ready for Epic 1 Implementation_
