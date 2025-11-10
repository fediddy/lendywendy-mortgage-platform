# LendyWendy.com

**Mortgage Lead Generation Platform with Topical Authority Strategy**

A custom-built, SEO-first platform targeting residential, investment property, and commercial real estate financing segments.

## Project Status

**Epic 1 Complete:** Platform Foundation & Infrastructure ✅
**Epic 2 Complete:** Content Management System ✅
**Epic 3 Complete:** SEO-First Architecture ✅
**Epic 4 Complete:** Segment-Specific Content Hubs ✅
**Epic 5 Complete:** Lead Capture & Qualification System ✅

**Epic 1** - All 6 stories complete:
- ✅ 1.1: Project Initialization
- ✅ 1.2: Database Setup
- ✅ 1.3: Authentication System
- ✅ 1.4: Deployment Configuration
- ✅ 1.5: UI Component Library
- ✅ 1.6: Error Handling & Logging

**Epic 2** - All 4 stories complete:
- ✅ 2.1: Content Type Models (Articles, Guides, Calculators)
- ✅ 2.2: WYSIWYG Editor with Rich Media
- ✅ 2.3: SEO Metadata Management
- ✅ 2.4: Content Versioning & Publishing Workflow

**Epic 3** - All 3 stories complete:
- ✅ 3.1: Dynamic Sitemap & Robots.txt
- ✅ 3.2: SEO-Friendly URL Structure (included in 3.1)
- ✅ 3.3: Breadcrumb Navigation with Structured Data (included in 3.1)

**Epic 4** - All 3 stories complete:
- ✅ 4.1: Segment Hub Pages (Residential, Investment, Commercial)
- ✅ 4.2: Content Filtering by Segment (included in 4.1)
- ✅ 4.3: Cross-Segment Navigation (included in 4.1)

**Epic 5** - All 4 stories complete:
- ✅ 5.1: Multi-Step Lead Capture Forms
- ✅ 5.2: Interactive Mortgage Calculators (6 calculators)
- ✅ 5.3: Enhanced Lead Scoring & CRM Integration
- ✅ 5.4: Admin Lead Management Dashboard

**Progress:** 5 Epics Complete (23 stories total)

## Tech Stack

- **Framework:** Next.js 16 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **UI Components:** shadcn/ui with Radix UI primitives
- **Database:** PostgreSQL with Prisma ORM
- **Authentication:** NextAuth.js v5 with RBAC
- **Rich Text Editor:** TipTap with ProseMirror
- **Date Utilities:** date-fns
- **Hosting:** Vercel (configured, pending deployment)
- **Error Tracking:** Centralized logger (Sentry integration ready)

## Getting Started

### Prerequisites

- Node.js 20.9 or later
- PostgreSQL database

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Update `.env` with your database connection string and other secrets.

4. Generate Prisma Client:
   ```bash
   npx prisma generate
   ```

5. Run database migrations (when database is available):
   ```bash
   npx prisma migrate dev
   ```

6. Start the development server:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Project Structure

```
/app                    - Next.js App Router pages and API routes
/components
  /editor               - Rich text editor components (TipTap)
  /forms                - Form components (Article, SEO Metadata)
  /seo                  - SEO and meta tag utilities
  /ui                   - shadcn/ui components
  /workflow             - Publishing workflow components
/lib                    - Utility functions, services, and database client
  content-service.ts    - Content CRUD and publishing logic
  content-utils.ts      - Slug generation, SEO validation
  db.ts                 - Prisma client singleton
  logger.ts             - Centralized logging
/prisma                 - Database schema and migrations
/types                  - TypeScript type definitions
/public                 - Static assets
/docs                   - Product documentation (PRD, Architecture, Epics)
```

## Key Features

### Lead Capture & Qualification
- **Multi-Step Forms:** Progressive lead capture with segment-specific questions
- **Lead Scoring:** 8-factor weighted algorithm (credit, down payment, timeline, employment, income, completeness, segment, loan type)
- **Tier Classification:** Automatic categorization into hot (≥80), warm (60-79), and cold (<60) leads
- **CRM Integration:** Webhook system with HMAC signatures for Salesforce, HubSpot, and custom CRMs
- **Admin Dashboard:** Complete lead management interface with filtering, search, and status updates

### Interactive Calculators
- Affordability Calculator (DTI-based)
- Monthly Payment Calculator
- Refinance Calculator
- Rent vs. Buy Calculator
- DTI Calculator
- Closing Costs Calculator

### Content Management
- Rich text editor with TipTap/ProseMirror
- SEO metadata management
- Content versioning and publishing workflow
- Segment-specific content filtering

### SEO & Architecture
- Dynamic sitemap and robots.txt
- Structured data with JSON-LD
- Breadcrumb navigation
- Segment hub pages (Residential, Investment, Commercial)

## Development Workflow

See `/docs/epics.md` for the complete implementation roadmap with 40 stories across 10 epics.

**Current Status:** 5 epics complete (23 stories)

## Documentation

- [Product Brief](/docs/product-brief-Lendywendy.com-2025-11-04.md) - Vision and strategy
- [PRD](/docs/PRD.md) - Product Requirements Document
- [Architecture](/docs/architecture.md) - Technical decisions and patterns
- [Epics](/docs/epics.md) - Implementation roadmap

## License

Private project - All rights reserved
