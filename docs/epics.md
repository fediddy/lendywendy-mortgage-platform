# LendyWendy.com - Epic & Story Breakdown

**Date:** 2025-11-04
**Author:** BMad
**Source:** PRD.md

---

## Epic Summary

This document decomposes the LendyWendy PRD into implementable epics and bite-sized stories. Each story is designed for completion by a single development agent in one focused session.

### Epic Overview

**Epic 1: Platform Foundation & Infrastructure**
Establish the technical foundation, development environment, and core infrastructure needed for all subsequent work. This includes project setup, hosting, CI/CD pipeline, and basic application shell.

**Epic 2: Content Management System**
Build the custom CMS that powers LendyWendy's content authority strategy. Enables content creators to publish SEO-optimized articles with proper schema markup, internal linking, and editorial workflows.

**Epic 3: SEO-First Architecture & Technical Optimization**
Implement technical SEO foundation including Core Web Vitals optimization, structured data, sitemaps, crawlability, and performance infrastructure critical for search rankings.

**Epic 4: Three-Segment Content Hub Architecture**
Create the residential, investment, and commercial mortgage content hubs with pillar pages, topic clusters, navigation, and cross-hub discovery features.

**Epic 5: Lead Capture & Qualification System**
Implement multi-step forms, lead magnets (calculators), strategic placement throughout content, lead scoring, and CRM integration for capturing and qualifying mortgage leads.

**Epic 6: Lender Partner Portal & Lead Distribution**
Build the partner-facing portal for lender management, lead assignment/distribution, communication tools, and performance tracking.

**Epic 7: Analytics, Reporting & Performance Tracking**
Implement comprehensive analytics including traffic, SEO performance, content metrics, lead generation tracking, and revenue reporting dashboards.

**Epic 8: Email & Communication System**
Build transactional email system for leads and partners, deliverability infrastructure, and notification workflows.

**Epic 9: Security, Compliance & Data Protection**
Implement fintech-specific security measures, GDPR/CCPA compliance, financial advertising compliance, audit trails, and data protection frameworks.

**Epic 10: User Experience & Polish**
Finalize UX refinements, mobile optimization, accessibility (WCAG 2.1 AA), search functionality, and overall user journey optimization.

---

## Epic 1: Platform Foundation & Infrastructure

**Epic Goal:** Establish the technical foundation, development environment, CI/CD pipeline, hosting infrastructure, and basic application shell that enables all subsequent development work.

**Value:** Without this foundation, no features can be built. This epic creates the bedrock for the entire platform.

---

### Story 1.1: Project Initialization & Repository Setup

**As a** developer,
**I want** a properly structured project repository with build tooling and dependencies configured,
**So that** I can begin developing features in a consistent, maintainable environment.

**Acceptance Criteria:**

**Given** a new project needs to be initialized
**When** the project setup is complete
**Then** the following must exist:
- Git repository initialized with .gitignore for Node.js/web projects
- Package.json with core dependencies (Next.js/React or chosen framework)
- TypeScript configuration with strict mode enabled
- ESLint and Prettier configured with consistent code standards
- Folder structure: `/src`, `/public`, `/components`, `/lib`, `/pages` or `/app`
- Environment variable template (.env.example) with placeholder keys
- README.md with project overview and setup instructions

**And** running `npm install` successfully installs all dependencies
**And** running `npm run dev` starts a development server on port 3000 (or configured port)
**And** a simple "Hello World" page renders successfully

**Prerequisites:** None (first story)

**Technical Notes:**
- Use Next.js 14+ with App Router for SEO-friendly server-side rendering
- TypeScript for type safety throughout codebase
- Tailwind CSS for styling (enables rapid UI development)
- Consider shadcn/ui for component library foundation

---

### Story 1.2: Database Setup & ORM Configuration

**As a** developer,
**I want** a configured database with ORM tooling,
**So that** I can persist application data (content, leads, users) reliably.

**Acceptance Criteria:**

**Given** the application needs to store persistent data
**When** database configuration is complete
**Then** the following must exist:
- PostgreSQL database provisioned (recommend Vercel Postgres or Neon for production)
- Prisma ORM installed and configured
- Database connection string in environment variables
- Initial Prisma schema with User model (authentication foundation)
- Migration system functional (`npx prisma migrate dev`)
- Prisma Client generated and importable

**And** running `npx prisma migrate dev` successfully creates database tables
**And** running `npx prisma studio` opens database GUI on localhost:5555
**And** test database query executes successfully from API route

**Prerequisites:** Story 1.1 (project must exist)

**Technical Notes:**
- Use Prisma for type-safe database access
- PostgreSQL preferred for JSON support (useful for flexible content fields)
- Set up separate databases for development, staging, production
- Connection pooling configured for production performance

---

### Story 1.3: Authentication & Authorization Foundation

**As a** developer,
**I want** a user authentication system with role-based access control,
**So that** admin, editor, and partner users can securely access appropriate features.

**Acceptance Criteria:**

**Given** the application requires user authentication
**When** auth system is implemented
**Then** the following must exist:
- NextAuth.js configured with credentials provider
- User model in database includes: email, hashedPassword, role (admin/editor/partner)
- Password hashing using bcrypt
- Login page at `/login` with email/password form
- Protected route middleware checking authentication status
- Role-based access control (RBAC) helper functions
- Session management with secure httpOnly cookies

**And** valid credentials successfully log user in and create session
**And** invalid credentials return appropriate error message
**And** protected routes redirect unauthenticated users to `/login`
**And** role checks prevent unauthorized access (e.g., partners can't access admin panel)

**Prerequisites:** Story 1.2 (database with User model required)

**Technical Notes:**
- NextAuth.js v5 (Auth.js) for authentication
- Bcrypt for password hashing (10 salt rounds minimum)
- Session stored in encrypted JWT or database
- Future: Add OAuth providers (Google, Microsoft) for partner convenience

---

### Story 1.4: Hosting & Deployment Infrastructure

**As a** developer,
**I want** automated deployment pipeline to production hosting,
**So that** code changes can be deployed quickly and reliably.

**Acceptance Criteria:**

**Given** the application needs to be hosted and accessible
**When** hosting and deployment are configured
**Then** the following must exist:
- Production hosting account (Vercel recommended for Next.js)
- GitHub repository connected to hosting provider
- Automatic deployments on push to `main` branch
- Preview deployments for pull requests
- Environment variables configured in hosting dashboard
- Custom domain configured (lendywendy.com)
- SSL certificate provisioned (automatic with Vercel)
- Production database connected and accessible

**And** pushing to `main` branch triggers automatic deployment
**And** deployment completes successfully within 5 minutes
**And** visiting https://lendywendy.com shows deployed application
**And** environment variables are properly injected into build

**Prerequisites:** Story 1.1, 1.2, 1.3 (deployable application must exist)

**Technical Notes:**
- Vercel recommended for Next.js with zero-config deployment
- Alternative: AWS Amplify, Netlify, or Railway
- Set up production, staging, and preview environments
- Configure build command: `npm run build`
- Configure start command: `npm run start`

---

### Story 1.5: Core UI Component Library & Design System

**As a** developer,
**I want** reusable UI components with consistent styling,
**So that** I can build features quickly with a cohesive design.

**Acceptance Criteria:**

**Given** the application needs consistent UI components
**When** component library is established
**Then** the following must exist:
- shadcn/ui installed and configured
- Core components added: Button, Input, Card, Badge, Dialog, Select, Textarea
- Tailwind CSS theme configured with brand colors
- Typography scale defined (headings, body, captions)
- Spacing and layout utilities configured
- Component examples page at `/components` (dev only)

**And** all components render correctly
**And** components are accessible (keyboard navigation, ARIA labels)
**And** dark mode toggle works (if implementing dark mode)
**And** components are documented with usage examples

**Prerequisites:** Story 1.1 (project with Tailwind CSS)

**Technical Notes:**
- shadcn/ui provides accessible, customizable components
- Radix UI primitives under the hood (excellent accessibility)
- Tailwind CSS for utility-first styling
- Define color palette: primary (blue), secondary (green), accent, neutral
- Mobile-first responsive design approach

---

### Story 1.6: Error Handling & Logging Infrastructure

**As a** developer,
**I want** centralized error handling and logging,
**So that** I can quickly identify and debug production issues.

**Acceptance Criteria:**

**Given** the application needs error tracking
**When** error handling infrastructure is implemented
**Then** the following must exist:
- Sentry (or similar) integrated for error tracking
- Global error boundary in React app
- API error handling middleware
- Client-side error logging to Sentry
- Server-side error logging with stack traces
- Development console logging with appropriate log levels
- 404 and 500 error pages with helpful messaging

**And** thrown errors are captured and sent to Sentry
**And** error alerts are sent for critical errors
**And** error pages display user-friendly messages (no stack traces exposed)
**And** error logs include request context (user, URL, timestamp)

**Prerequisites:** Story 1.1, 1.4 (deployed application that can generate errors)

**Technical Notes:**
- Sentry recommended for production error tracking
- Configure source maps for readable stack traces
- Set up error alerts for high-severity issues
- Log levels: debug, info, warn, error, fatal
- Consider structured logging with pino or winston

---


## Epic 2: Content Management System

**Epic Goal:** Build a custom CMS that empowers content creators to publish SEO-optimized mortgage articles with proper schema markup, internal linking, editorial workflows, and scheduling capabilities.

**Value:** The CMS is the engine of LendyWendy's topical authority strategy—enabling the creation of 200+ articles that drive organic search traffic and establish expertise across all three mortgage segments.

---

### Story 2.1: Article Database Schema & Rich Text Editor

**As a** content editor,
**I want** to create and edit articles with rich formatting,
**So that** I can publish high-quality mortgage content.

**Acceptance Criteria:**

**Given** a content editor needs to write articles
**When** the article editor is complete
**Then** the following must exist:
- Article model: id, title, slug, content, excerpt, author_id, status, segment, meta_title, meta_description, schema_markup, timestamps
- Tiptap rich text editor with toolbar (bold, italic, headings H2-H6, lists, links, images)
- Auto-save drafts every 30 seconds
- Image upload with optimization (resize, compress, WebP)
- Character count and reading time estimate
- Markdown storage format

**And** articles can be created, edited, and saved successfully
**And** images upload to cloud storage and display in editor
**And** content persists across page refreshes

**Prerequisites:** Story 1.2 (database), Story 1.5 (UI components)

**Technical Notes:** Prisma schema for Article model, Tiptap for editing, Cloudinary/Vercel Blob for image storage

---

### Story 2.2: SEO Optimization Tools & Schema Markup

**As a** content editor,
**I want** SEO tools and automatic schema markup generation,
**So that** articles rank well in search engines.

**Acceptance Criteria:**

**Given** a content editor is optimizing an article
**When** SEO tools are active
**Then** the following must exist:
- Meta title field (50-60 char limit) with SERP preview
- Meta description field (150-160 char limit)
- Focus keyword input with usage tracking
- SEO score indicator (keyword presence, headings, readability, links, length)
- Internal linking suggestions sidebar (5-10 related articles)
- Automatic JSON-LD schema generation (Article, HowTo, FAQPage)
- Schema preview and validation

**And** SEO score updates in real-time as content changes
**And** clicking suggested article inserts internal link
**And** generated schema passes Google Rich Results Test

**Prerequisites:** Story 2.1 (articles exist)

**Technical Notes:** Real-time SEO analysis client-side, schema-dts for type-safe JSON-LD, full-text search for link suggestions

---

### Story 2.3: Editorial Workflow & Publishing

**As a** content editor,
**I want** workflow states and scheduled publication,
**So that** content goes through review before going live.

**Acceptance Criteria:**

**Given** articles need editorial oversight
**When** workflow system is implemented
**Then** the following must exist:
- Status field: draft, review, published, archived
- "Submit for Review" button (draft → review)
- "Publish" button (review → published, admin/editor only)
- "Schedule Publication" datetime picker
- Cron job publishing articles when scheduled time arrives
- Email notifications for status changes
- Article list page with status filters

**And** only admins can publish articles (role enforced)
**And** scheduled articles auto-publish at correct time
**And** published articles appear on public site immediately

**Prerequisites:** Story 2.1 (articles), Story 1.3 (RBAC)

**Technical Notes:** Vercel Cron for scheduled publishing, role checks on backend

---

### Story 2.4: Content Management Dashboard

**As a** content editor,
**I want** a dashboard to manage all articles,
**So that** I can find and organize content efficiently.

**Acceptance Criteria:**

**Given** a content editor needs to manage articles
**When** accessing `/admin/articles`
**Then** the following must exist:
- Table with columns: title, author, status, segment, published date, actions
- Filters: status, segment, author, date range
- Search by title or content
- Sort by date, title, author
- Pagination (20 per page)
- Bulk actions: delete, change status
- Edit and delete actions per row

**And** filters and search work correctly
**And** clicking article navigates to edit page
**And** bulk operations apply to selected articles

**Prerequisites:** Story 2.1-2.3 (articles with metadata)

**Technical Notes:** TanStack Table or shadcn/ui Table component, server-side pagination

---

## Epic 3: SEO-First Architecture & Technical Optimization

**Epic Goal:** Implement technical SEO foundation including Core Web Vitals optimization, structured data, sitemaps, crawlability, and performance infrastructure critical for search rankings.

**Value:** Technical SEO excellence is non-negotiable for achieving topical authority. This epic ensures Google can crawl, index, and rank LendyWendy's content effectively.

---

### Story 3.1: Core Web Vitals Optimization

**As a** developer,
**I want** the site to meet Core Web Vitals thresholds,
**So that** we achieve top rankings (performance is a ranking factor).

**Acceptance Criteria:**

**Given** performance impacts SEO rankings
**When** Core Web Vitals optimization is complete
**Then** the following must exist:
- Image optimization: next/image with lazy loading, WebP format, proper sizing
- Font optimization: preload critical fonts, font-display: swap
- Code splitting: dynamic imports for heavy components
- Critical CSS inlined, non-critical deferred
- CDN configured for static assets
- Database query optimization with indexes

**And** Lighthouse scores: LCP <2.5s, FID <100ms, CLS <0.1
**And** PageSpeed Insights shows all green metrics
**And** Mobile performance equivalent to desktop

**Prerequisites:** Story 1.1 (Next.js project), Story 2.1 (content to optimize)

**Technical Notes:** Next.js Image component, Vercel Edge Network CDN, font optimization with next/font

---

### Story 3.2: Dynamic Sitemap Generation & Robots.txt

**As a** developer,
**I want** automatic sitemap generation and robots.txt,
**So that** search engines can discover all content efficiently.

**Acceptance Criteria:**

**Given** search engines need to crawl the site
**When** sitemap system is implemented
**Then** the following must exist:
- XML sitemap at /sitemap.xml listing all published articles
- Sitemap includes: article URLs, last modified dates, priority, change frequency
- Sitemap automatically updates when articles published/updated
- Robots.txt at /robots.txt allowing all crawlers, linking to sitemap
- Sitemap submitted to Google Search Console and Bing Webmaster Tools

**And** sitemap validates against XML schema
**And** sitemap includes only published articles (not drafts)
**And** Google Search Console shows sitemap successfully indexed

**Prerequisites:** Story 2.3 (published articles exist)

**Technical Notes:** next-sitemap package or custom API route generating sitemap, update on article publish

---

### Story 3.3: Structured Data & Open Graph Meta Tags

**As a** developer,
**I want** proper meta tags and structured data on all pages,
**So that** content displays correctly in search results and social shares.

**Acceptance Criteria:**

**Given** pages need rich snippets and social previews
**When** meta tags and structured data are implemented
**Then** the following must exist:
- JSON-LD Article schema from Story 2.2 rendered in <head>
- Open Graph tags: og:title, og:description, og:image, og:url, og:type
- Twitter Card tags: twitter:card, twitter:title, twitter:description, twitter:image
- Canonical URL on all pages
- Breadcrumb schema for navigation

**And** Google Rich Results Test passes for all article pages
**And** Social media preview (Facebook/Twitter) shows correct title, description, image
**And** Schema validation shows zero errors

**Prerequisites:** Story 2.1 (articles with meta fields), Story 2.2 (schema generation)

**Technical Notes:** Next.js Metadata API for head tags, schema injected server-side

---

## Epic 4: Three-Segment Content Hub Architecture

**Epic Goal:** Create the residential, investment, and commercial mortgage content hubs with pillar pages, topic clusters, navigation, and cross-hub discovery features.

**Value:** The hub architecture organizes content for both users and search engines, establishing topical authority in each segment and enabling effective internal linking.

---

### Story 4.1: Hub Landing Pages & Navigation

**As a** site visitor,
**I want** dedicated hubs for each mortgage segment,
**So that** I can easily find content relevant to my needs.

**Acceptance Criteria:**

**Given** the site serves three mortgage segments
**When** hub landing pages are built
**Then** the following must exist:
- Homepage at / with hero section and three hub cards
- Residential hub at /residential-mortgages/ with segment overview
- Investment hub at /investment-property-loans/ with segment overview
- Commercial hub at /commercial-mortgages/ with segment overview
- Top navigation showing all three hubs
- Hub landing pages display featured articles (5-10 most recent)
- Breadcrumb navigation on all pages

**And** clicking hub card navigates to correct landing page
**And** navigation works on mobile with hamburger menu
**And** breadcrumbs show correct hierarchy

**Prerequisites:** Story 2.3 (published articles exist), Story 3.1 (optimized pages)

**Technical Notes:** Static generation for landing pages, dynamic article lists, mobile-first design

---

### Story 4.2: Topic Cluster Organization & Internal Linking

**As a** content strategist,
**I want** articles organized in topic clusters,
**So that** internal linking creates SEO-friendly content silos.

**Acceptance Criteria:**

**Given** articles need topical organization
**When** topic clustering is implemented
**Then** the following must exist:
- Category taxonomy: each hub has 5-7 categories (e.g., Residential: First-Time Buyers, Refinancing, Loan Types, etc.)
- Articles assigned to primary category
- Category archive pages listing all articles in category
- Pillar content pages for each category (comprehensive guides)
- Related articles widget showing 3-5 articles from same category/hub
- Internal link density: 5-10 contextual links per article

**And** category pages are accessible from hub landing pages
**And** related articles display correctly on article pages
**And** internal linking creates cohesive topic clusters

**Prerequisites:** Story 2.1 (articles with categories), Story 4.1 (hub structure)

**Technical Notes:** Category model in database, static category pages, query for related articles by category+segment

---

## Epic 5: Lead Capture & Qualification System

**Epic Goal:** Implement multi-step forms, lead magnets (calculators), strategic placement throughout content, lead scoring, and CRM integration for capturing and qualifying mortgage leads.

**Value:** This is the revenue engine—converting organic traffic into qualified leads worth $30-200 each. Effective lead capture directly impacts business success.

---

### Story 5.1: Multi-Step Lead Forms & Database Model

**As a** site visitor,
**I want** to easily submit my information to get matched with lenders,
**So that** I can get quotes for my mortgage needs.

**Acceptance Criteria:**

**Given** visitors want to connect with lenders
**When** lead form system is built
**Then** the following must exist:
- Lead model: id, segment, loan_type, property_details, name, email, phone, credit_range, down_payment, timeline, score, status, created_at
- Multi-step form component (4 steps): 1) Loan type, 2) Property details, 3) Contact info, 4) Qualification
- Progress indicator showing step X of 4
- Form validation on each step
- Back button to edit previous steps
- Strategic placement: end of article, sidebar, exit-intent popup
- Form submission creates lead in database

**And** completing form successfully submits lead
**And** validation prevents incomplete submissions
**And** confirmation page displays after submission

**Prerequisites:** Story 1.2 (database), Story 1.5 (form components)

**Technical Notes:** React Hook Form for validation, Prisma Lead model, form state management

---

### Story 5.2: Lead Magnets - Mortgage Calculators

**As a** site visitor,
**I want** mortgage calculators to estimate costs,
**So that** I can understand affordability before submitting lead form.

**Acceptance Criteria:**

**Given** visitors want to calculate mortgage costs
**When** calculator tools are built
**Then** the following must exist:
- Affordability calculator (income, debts, down payment → max home price)
- Monthly payment calculator (loan amount, rate, term → monthly payment)
- Refinance savings calculator (current vs new rate → savings)
- Calculators embedded on hub landing pages
- CTA to submit lead form after using calculator
- Calculator usage tracked in analytics

**And** calculations are accurate per standard mortgage formulas
**And** calculators work on mobile and desktop
**And** CTA leads to pre-filled form with calculator inputs

**Prerequisites:** Story 5.1 (lead forms exist)

**Technical Notes:** Client-side calculation logic, no backend needed for calcs, track engagement events

---

### Story 5.3: Lead Scoring & Qualification Logic

**As a** lead operations manager,
**I want** automatic lead scoring based on quality indicators,
**So that** high-value leads are prioritized for lender partners.

**Acceptance Criteria:**

**Given** leads have different value and urgency
**When** scoring system is implemented
**Then** the following must exist:
- Scoring algorithm (0-100 points):
  - Segment: Commercial +40, Investment +30, Residential +20
  - Timeline: Immediate +20, <3 months +15, 3-6 months +10, 6+ months +5
  - Credit: Excellent +15, Good +10, Fair +5
  - Down payment: >20% +10, 10-20% +5, <10% +0
  - Pre-approval: Yes +15, No +0
- Score categories: Hot (80-100), Warm (60-79), Cold (0-59)
- Score calculated on form submission
- Score badge displayed in lead dashboard

**And** scores calculate correctly based on inputs
**And** high-value leads (commercial, excellent credit) score 80+
**And** scores are stored in database for filtering

**Prerequisites:** Story 5.1 (leads with qualification data)

**Technical Notes:** Scoring logic in backend API route, could use AI/ML in future for predictive scoring

---

### Story 5.4: Lead CRM Integration & Management Dashboard

**As a** admin,
**I want** to view and manage all leads in a dashboard,
**So that** I can track lead flow and distribute to partners.

**Acceptance Criteria:**

**Given** leads need to be managed and distributed
**When** lead management dashboard is built
**Then** the following must exist:
- Lead list at /admin/leads with table: name, segment, score, status, date, actions
- Filters: segment, score category, status, date range
- Search by name, email, phone
- Lead detail modal showing all submitted information
- Status workflow: new → contacted → qualified → closed/lost
- Assign to lender partner dropdown
- Export leads to CSV

**And** filters and search work correctly
**And** clicking lead opens detail modal
**And** status changes persist to database
**And** CSV export downloads with all lead data

**Prerequisites:** Story 5.1 (leads exist), Story 1.3 (admin auth)

**Technical Notes:** Similar to article dashboard (Story 2.4), table component, CSV export library

---

## Epic 6: Lender Partner Portal & Lead Distribution

**Epic Goal:** Build the partner-facing portal for lender management, lead assignment/distribution, communication tools, and performance tracking.

**Value:** Enables monetization through lender partnerships—partners pay for qualified leads, and this portal manages the entire partner experience and lead delivery workflow.

---

### Story 6.1: Partner User Management & Portal Access

**As a** lender partner,
**I want** to log into a partner portal,
**So that** I can access leads assigned to me.

**Acceptance Criteria:**

**Given** lender partners need portal access
**When** partner management is implemented
**Then** the following must exist:
- Partner model: id, company_name, contact_name, email, phone, segments_accepted[], regions[], volume_cap, status
- Partner registration form (admin-approved)
- Partner login at /partner/login
- Partner dashboard at /partner/dashboard showing assigned leads
- Profile settings page for updating preferences

**And** partners can log in with credentials
**And** partners only see leads assigned to them (access control enforced)
**And** profile updates save successfully

**Prerequisites:** Story 1.3 (auth system), Story 5.1 (leads exist)

**Technical Notes:** Extend User model with partner role, partner-specific routes with middleware

---

### Story 6.2: Lead Distribution & Assignment System

**As a** admin,
**I want** to assign leads to lender partners automatically or manually,
**So that** leads get to the right partners quickly.

**Acceptance Criteria:**

**Given** leads need distribution to partners
**When** assignment system is built
**Then** the following must exist:
- Manual assignment: admin selects partner from dropdown in lead detail
- Automatic distribution rules:
  - Match lead segment to partner accepted segments
  - Check partner region matches lead location
  - Respect partner volume cap
  - Round-robin among qualified partners
- Lead exclusivity timer (48 hours)
- Re-assignment if partner doesn't respond
- Email notification to partner when lead assigned

**And** manual assignment immediately assigns lead to partner
**And** auto-distribution assigns to qualified partners only
**And** partner receives email notification within 60 seconds
**And** exclusivity timer prevents double-assignment

**Prerequisites:** Story 6.1 (partners exist), Story 5.4 (lead management)

**Technical Notes:** Distribution logic in API route, cron job for exclusivity timer expiration, email notifications

---

### Story 6.3: Partner Performance Tracking

**As a** admin,
**I want** to track partner performance metrics,
**So that** I can optimize lead distribution and partner relationships.

**Acceptance Criteria:**

**Given** partner performance needs monitoring
**When** tracking dashboard is built
**Then** the following must exist:
- Partner performance page at /admin/partners showing:
  - Leads assigned (total, this month)
  - Response time (average time from assignment to first contact)
  - Conversion rate (leads → applications → funded)
  - Quality rating (average rating from partners on lead quality)
- Partner detail page with historical performance
- Leaderboard showing top performing partners

**And** metrics calculate correctly from lead status data
**And** performance trends are visible over time
**And** low-performing partners are identifiable for coaching

**Prerequisites:** Story 6.2 (lead assignment), Story 5.4 (lead status tracking)

**Technical Notes:** Aggregate queries for metrics, charts using recharts or similar library

---

## Epic 7: Analytics, Reporting & Performance Tracking

**Epic Goal:** Implement comprehensive analytics including traffic, SEO performance, content metrics, lead generation tracking, and revenue reporting dashboards.

**Value:** Data visibility enables optimization—understanding what's working (top content, lead sources, conversion funnels) drives continuous improvement and ROI measurement.

---

### Story 7.1: Google Analytics & Search Console Integration

**As a** admin,
**I want** traffic and SEO data integrated into the platform,
**So that** I can monitor performance without leaving the application.

**Acceptance Criteria:**

**Given** traffic and SEO data is critical
**When** analytics integration is complete
**Then** the following must exist:
- Google Analytics 4 installed with gtag.js
- Custom events tracked: article_view, form_start, form_submit, calculator_use
- Google Search Console verified and API connected
- Analytics dashboard at /admin/analytics showing:
  - Total visitors, page views, sessions (last 7/30/90 days)
  - Traffic sources (organic, direct, referral, social)
  - Top pages by views
  - Search Console: impressions, clicks, CTR, average position
  - Top keywords by impressions and clicks

**And** GA4 captures all page views and events
**And** Search Console data updates daily
**And** dashboard loads in <3 seconds

**Prerequisites:** Story 1.4 (deployed site generating traffic), Story 5.1 (events to track)

**Technical Notes:** GA4 via next/script, Search Console API for data, caching for dashboard performance

---

### Story 7.2: Content Performance Metrics

**As a** content strategist,
**I want** article-level analytics,
**So that** I can identify top performers and optimize low performers.

**Acceptance Criteria:**

**Given** content performance drives optimization
**When** content analytics are built
**Then** the following must exist:
- Article analytics page at /admin/content-analytics showing table:
  - Article title, views, avg time on page, bounce rate, form submissions, leads generated
- Sort by any metric
- Date range filter
- Traffic source breakdown per article
- Top 10 articles dashboard widget
- Bottom 10 articles (low performance) dashboard widget

**And** metrics accurately reflect GA4 data
**And** lead attribution correctly links leads to source articles
**And** insights actionable for content optimization

**Prerequisites:** Story 7.1 (GA4 integration), Story 5.1 (lead source tracking)

**Technical Notes:** Join analytics data with article data, track lead source via UTM or referrer

---

### Story 7.3: Lead Generation & Revenue Reporting

**As a** business owner,
**I want** lead and revenue dashboards,
**So that** I can track business performance and ROI.

**Acceptance Criteria:**

**Given** lead volume and revenue are key business metrics
**When** reporting dashboards are built
**Then** the following must exist:
- Lead dashboard showing:
  - Total leads (today, this week, this month)
  - Lead trends (chart over time)
  - Lead breakdown by segment
  - Lead score distribution
  - Conversion funnel (visitors → form starts → submissions)
- Revenue dashboard showing:
  - Revenue by segment (commercial, investment, residential)
  - Revenue per partner
  - Revenue trends over time
  - Cost per lead calculation
  - ROI projection

**And** metrics update daily (or real-time for lead counts)
**And** charts visualize trends clearly
**And** export to PDF for reporting

**Prerequisites:** Story 5.4 (lead data), Story 6.2 (partner assignments), Story 7.1 (traffic data)

**Technical Notes:** Aggregate queries with date grouping, recharts for visualizations, PDF export

---

## Epic 8: Email & Communication System

**Epic Goal:** Build transactional email system for leads and partners, deliverability infrastructure, and notification workflows.

**Value:** Email is critical for lead confirmation, partner notifications, and engagement—reliable delivery ensures leads don't slip through cracks and partners respond quickly.

---

### Story 8.1: Transactional Email Infrastructure

**As a** developer,
**I want** reliable email sending infrastructure,
**So that** all transactional emails are delivered successfully.

**Acceptance Criteria:**

**Given** the application sends transactional emails
**When** email infrastructure is configured
**Then** the following must exist:
- Email service provider integrated (SendGrid, Mailgun, or AWS SES)
- Dedicated sending domain configured (email.lendywendy.com)
- SPF, DKIM, DMARC records configured for deliverability
- Email template system using React Email or similar
- Unsubscribe management and suppression lists
- Email analytics (sent, delivered, opened, clicked, bounced)

**And** test email sends successfully and arrives in inbox (not spam)
**And** email deliverability rate >95%
**And** unsubscribe link present in all marketing emails (CAN-SPAM compliance)

**Prerequisites:** Story 1.1 (application exists), Story 1.4 (domain configured)

**Technical Notes:** SendGrid recommended for reliability, React Email for type-safe templates, DNS records for domain auth

---

### Story 8.2: Lead & Partner Email Notifications

**As a** lead or partner,
**I want** timely email notifications,
**So that** I know the status of my inquiry or assigned leads.

**Acceptance Criteria:**

**Given** emails notify leads and partners of status changes
**When** notification system is implemented
**Then** the following must exist:
- Lead confirmation email (sent immediately after form submission)
- Partner notification email (when lead assigned)
- Lead status update emails (when status changes)
- Partner reminder emails (if no response within 24 hours)
- Email templates mobile-responsive and branded
- Personalization (recipient name, lead details)

**And** emails send within 60 seconds of trigger event
**And** email open rates >40% (industry benchmark)
**And** templates render correctly in Gmail, Outlook, Apple Mail

**Prerequisites:** Story 8.1 (email infrastructure), Story 5.1 (leads), Story 6.2 (partner assignments)

**Technical Notes:** Queue emails for reliability (could use BullMQ or similar), track events triggering emails

---

## Epic 9: Security, Compliance & Data Protection

**Epic Goal:** Implement fintech-specific security measures, GDPR/CCPA compliance, financial advertising compliance, audit trails, and data protection frameworks.

**Value:** Compliance is mandatory in fintech—violations lead to fines and business shutdown. Security protects sensitive borrower data and maintains trust with partners and users.

---

### Story 9.1: HTTPS, Data Encryption & Security Hardening

**As a** user,
**I want** my data protected with industry-standard security,
**So that** my personal information remains private and secure.

**Acceptance Criteria:**

**Given** the application handles sensitive financial data
**When** security measures are implemented
**Then** the following must exist:
- HTTPS enforced site-wide (TLS 1.3)
- Lead PII encrypted at rest in database
- Password hashing with bcrypt (10+ rounds)
- Input validation and sanitization on all forms
- SQL injection prevention via parameterized queries
- XSS protection via Content Security Policy headers
- CSRF tokens on all state-changing forms
- Rate limiting on API endpoints (100 req/min per IP)
- Session timeout after 30 minutes inactivity

**And** security headers present (CSP, X-Frame-Options, etc.)
**And** no sensitive data logged or exposed in errors
**And** penetration test shows no critical vulnerabilities

**Prerequisites:** Story 1.4 (HTTPS via hosting), Story 5.1 (lead data to protect)

**Technical Notes:** Vercel provides HTTPS automatically, CSP headers in next.config.js, rate limiting middleware

---

### Story 9.2: GDPR/CCPA Compliance & Privacy Controls

**As a** site visitor,
**I want** control over my personal data,
**So that** my privacy rights are respected per regulations.

**Acceptance Criteria:**

**Given** GDPR/CCPA compliance is required
**When** privacy features are implemented
**Then** the following must exist:
- Cookie consent banner on first visit
- Privacy policy page at /privacy with data collection disclosure
- Terms of service page at /terms
- TCPA consent checkbox on lead forms ("I agree to be contacted")
- Lead data deletion request workflow (admin can delete)
- Data export capability (download lead data as JSON/PDF)
- Opt-out from marketing communications link in emails

**And** cookie consent persists across sessions
**And** privacy policy clearly describes data usage
**And** deletion requests remove all PII within 30 days
**And** opt-outs are honored immediately

**Prerequisites:** Story 5.1 (lead data), Story 8.1 (marketing emails)

**Technical Notes:** Cookie consent library (e.g., cookie-consent), data deletion soft-delete with PII redaction

---

### Story 9.3: Financial Advertising Compliance & Disclaimers

**As a** business owner,
**I want** proper disclaimers and compliance with mortgage advertising laws,
**So that** we avoid regulatory violations.

**Acceptance Criteria:**

**Given** mortgage advertising is regulated
**When** compliance disclaimers are implemented
**Then** the following must exist:
- Equal Housing Opportunity logo and disclaimer on all pages
- "Not a lender" disclaimer in footer (if applicable)
- APR disclosure requirements when rates mentioned
- NMLS license numbers displayed (if required)
- Educational content disclaimer (not financial advice)
- Lead consent language ("I agree to share info with lender partners")
- State-specific disclosures where required

**And** disclaimers present and visible on all relevant pages
**And** legal review confirms compliance with TILA, RESPA, state laws
**And** audit trail logs lead consent timestamp and IP address

**Prerequisites:** Story 5.1 (lead forms with consent)

**Technical Notes:** Consult legal counsel for specific disclaimer requirements, compliance varies by state

---

## Epic 10: User Experience & Polish

**Epic Goal:** Finalize UX refinements, mobile optimization, accessibility (WCAG 2.1 AA), search functionality, and overall user journey optimization.

**Value:** Superior UX reduces bounce rates, increases engagement, and improves conversion—the difference between a visitor reading one article vs exploring the hub and submitting a lead.

---

### Story 10.1: Site-Wide Search Functionality

**As a** site visitor,
**I want** to search for mortgage topics,
**So that** I can quickly find relevant articles.

**Acceptance Criteria:**

**Given** users need to find content quickly
**When** search functionality is built
**Then** the following must exist:
- Search bar in header (desktop and mobile)
- Autocomplete suggestions as user types
- Search results page showing matching articles
- Filters: segment (residential/investment/commercial)
- Results ranked by relevance (title match > content match)
- "No results" state with suggestions
- Search analytics (popular queries tracked)

**And** search returns relevant results in <500ms
**And** autocomplete shows 5-10 suggestions
**And** clicking result navigates to article
**And** search works on mobile

**Prerequisites:** Story 2.3 (published articles), Story 4.1 (hub structure)

**Technical Notes:** PostgreSQL full-text search or Algolia for hosted search, index on article title and content

---

### Story 10.2: Mobile Optimization & Responsive Design

**As a** mobile user,
**I want** the site to work perfectly on my phone,
**So that** I can research mortgages on the go.

**Acceptance Criteria:**

**Given** 60%+ traffic is mobile
**When** mobile optimization is complete
**Then** the following must exist:
- Mobile-first responsive design (320px to 4K screens)
- Touch targets minimum 44x44 pixels
- Hamburger navigation on mobile
- Readable text without zooming (16px minimum)
- Forms optimized for mobile (proper keyboard types)
- No horizontal scrolling required
- Sticky CTA button on mobile article pages

**And** all pages render correctly on iPhone and Android
**And** mobile conversion rates within 80% of desktop
**And** no mobile usability errors in Search Console

**Prerequisites:** Story 1.5 (responsive components), Story 4.1 (pages exist)

**Technical Notes:** Tailwind CSS breakpoints for responsive design, test on real devices

---

### Story 10.3: Accessibility (WCAG 2.1 AA) Compliance

**As a** user with disabilities,
**I want** the site to be accessible with assistive technology,
**So that** I can access mortgage information regardless of ability.

**Acceptance Criteria:**

**Given** accessibility is legally required and expands audience
**When** WCAG 2.1 AA compliance is achieved
**Then** the following must exist:
- Keyboard navigation for all interactive elements
- Focus indicators visible on all focusable elements
- Screen reader compatibility (tested with NVDA/JAWS)
- Alt text on all meaningful images
- Form labels properly associated with inputs
- Color contrast ratios ≥4.5:1 for text
- ARIA labels where needed
- Skip to main content link

**And** WAVE accessibility checker shows zero critical errors
**And** keyboard-only navigation completes all user flows
**And** screen reader announces page content correctly

**Prerequisites:** Story 1.5 (accessible components), Story 4.1 (pages to test)

**Technical Notes:** shadcn/ui components are accessible by default, test with axe DevTools, manual testing required

---

### Story 10.4: Performance Monitoring & Continuous Optimization

**As a** developer,
**I want** ongoing performance monitoring,
**So that** we maintain fast load times as content grows.

**Acceptance Criteria:**

**Given** performance degrades over time without monitoring
**When** monitoring system is implemented
**Then** the following must exist:
- Real User Monitoring (RUM) via Vercel Analytics or similar
- Lighthouse CI in deployment pipeline
- Performance budget alerts (fail build if LCP >3s)
- Database query performance monitoring
- Core Web Vitals dashboard showing trends
- Automated performance reports weekly

**And** performance regressions trigger alerts
**And** deployment blocked if performance budget exceeded
**And** 95th percentile page load stays <3 seconds

**Prerequisites:** Story 3.1 (performance optimized), Story 1.4 (deployment pipeline)

**Technical Notes:** Vercel Analytics for RUM, Lighthouse CI GitHub Action, query monitoring with Prisma metrics

---

## Epic Breakdown Summary

**Total Stories:** ~40 actionable stories across 10 epics

**Estimated Timeline:**
- Epic 1 (Foundation): 1-2 weeks
- Epic 2 (CMS): 2-3 weeks
- Epic 3 (SEO): 1-2 weeks
- Epic 4 (Hubs): 1-2 weeks
- Epic 5 (Lead Capture): 2-3 weeks
- Epic 6 (Partner Portal): 2-3 weeks
- Epic 7 (Analytics): 1-2 weeks
- Epic 8 (Email): 1 week
- Epic 9 (Compliance): 1-2 weeks
- Epic 10 (UX Polish): 1-2 weeks

**Total: 14-24 weeks (3.5-6 months) for MVP completion**

---

## Next Steps

This epic breakdown provides the roadmap for implementing LendyWendy.com. Each story is:
- **Vertically sliced** - Delivers complete functionality
- **Independently valuable** - Provides incremental progress
- **Sized for single-session completion** - Can be implemented by one developer in focused time
- **Clearly defined with BDD acceptance criteria** - Testable and verifiable

**Recommended Next Actions:**

1. **Architecture Design** - Run `/bmad:bmm:workflows:architecture` to define technical stack, infrastructure, and architectural decisions
2. **Story Prioritization** - Determine exact sequence based on dependencies and business priorities
3. **Sprint Planning** - Group stories into 2-week sprints for iterative development
4. **Begin Implementation** - Start with Epic 1, Story 1.1 (Project Initialization)

The LendyWendy magic—topical authority that compounds—starts with this first commit.

