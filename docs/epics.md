# Lendywendy.com - Epic Breakdown

**Author:** BMad
**Date:** 2026-02-28
**Source:** PRD-v2.md, architecture.md (v2.0)
**Project Type:** Brownfield (enhancing existing codebase)
**Total Epics:** 7 active + 1 deferred
**Total Stories:** 32

---

## Overview

This document decomposes PRD v2 requirements into implementable stories for AI dev agents. The project is **brownfield** — significant code exists (40+ pages, 15 Prisma models, working auth, loan pages, chat/readiness scaffolding). Stories account for upgrading existing code vs building new features.

**Epic Sequence:**

| Epic | Title | Stories | Depends On | Status |
|------|-------|---------|------------|--------|
| E1 | Foundation & Deployment | 6 | None | MVP |
| E2 | AI Mortgage Advisor | 5 | E1 | MVP |
| E3 | Mortgage Readiness Score | 4 | E1 | MVP |
| E4 | Landing Pages & SEO | 4 | E2, E3 | MVP |
| E5 | Lead Management & Admin | 4 | E2, E3 | MVP |
| E6 | Integrations & Routing | 4 | E5 | MVP |
| E7 | Content & SEO | -- | E6 | **POST-MVP** |
| E8 | Polish, Compliance & Launch | 5 | E6 | MVP |

**Parallelization:** E2 and E3 can be built simultaneously after E1 completes.

---

## Epic 1: Foundation & Deployment

**Goal:** Configure the existing Next.js codebase for Coolify deployment, add monitoring/analytics infrastructure, and establish development tooling so all subsequent epics can be built, tested, and deployed.

### Story 1.1: Configure Coolify Deployment

As a **developer**,
I want the project configured for Coolify Docker deployment with standalone output,
So that the application can be built and deployed on our self-hosted VPS.

**Acceptance Criteria:**

**Given** the existing Next.js 16 project
**When** I update `next.config.ts` to use `output: 'standalone'`
**Then** `npm run build` produces a `.next/standalone` directory with `server.js`

**And** a multi-stage `Dockerfile` exists that:
- Installs dependencies
- Runs `prisma generate`
- Builds the Next.js app
- Produces a minimal production image with standalone output, static files, and public assets

**And** a `.dockerignore` excludes `node_modules`, `.next`, `.env*`, `.git`

**And** `docker build -t lendywendy .` completes successfully

**And** the container starts and serves the app on port 3000

**Prerequisites:** None (first story)

**Technical Notes:**
- See `docs/architecture.md` Deployment Architecture section for Dockerfile template
- Remove `turbopack.root` from next.config.ts (not needed for production)
- Ensure `sharp` is available in the production image for `next/image`

---

### Story 1.2: Local Development Environment

As a **developer**,
I want a `docker-compose.yml` for local PostgreSQL and an `.env.example` template,
So that any developer can set up the project locally in minutes.

**Acceptance Criteria:**

**Given** the project root
**When** I run `docker compose up -d`
**Then** a PostgreSQL 17 container starts on port 5432

**And** an `.env.example` file exists with all required environment variables documented (with placeholder values, not real secrets)

**And** after copying `.env.example` to `.env.local` and running `npx prisma migrate dev`, the database is ready

**And** `npm run dev` starts the development server successfully

**Prerequisites:** None

**Technical Notes:**
- See `docs/architecture.md` Development Environment section for docker-compose template
- DATABASE_URL for local: `postgresql://lendywendy:localdev@localhost:5432/lendywendy`
- Include all env vars: DATABASE_URL, NEXTAUTH_URL, NEXTAUTH_SECRET, DEEPSEEK_API_KEY, DEEPSEEK_BASE_URL, RESEND_API_KEY, MAXBOUNTY_WEBHOOK_URL, MAXBOUNTY_AFFILIATE_ID, SENTRY_DSN, NEXT_PUBLIC_GA_MEASUREMENT_ID

---

### Story 1.3: Rate Limiting Middleware

As a **site operator**,
I want API rate limiting to prevent abuse of expensive AI endpoints and lead submission spam,
So that costs stay controlled and the service remains available.

**Acceptance Criteria:**

**Given** a visitor making API requests
**When** they exceed the rate limit for a given endpoint
**Then** they receive a 429 status with `{ error: "Too many requests" }`

**And** the rate limits are:
- `/api/chat`: 10 requests/minute per IP
- `/api/leads`, `/api/readiness`: 5 requests/minute per IP
- All other `/api/*`: 100 requests/minute per IP

**And** rate limiting uses in-memory sliding window (no external dependencies)

**And** rate limit state is scoped per IP address

**Prerequisites:** None

**Technical Notes:**
- Implement in Next.js middleware (`middleware.ts`)
- Use a `Map<string, { count: number, resetTime: number }>` with sliding window
- Clean up expired entries periodically to prevent memory leaks
- See ADR-003 in architecture.md

---

### Story 1.4: Sentry Error Tracking

As a **site operator**,
I want Sentry integrated for error tracking on both server and client,
So that I'm alerted to production errors and can debug them.

**Acceptance Criteria:**

**Given** the Next.js application
**When** an unhandled error occurs on the server or client
**Then** it is captured and sent to Sentry with stack trace and context

**And** `@sentry/nextjs` is installed and configured per Next.js integration guide

**And** Sentry DSN is loaded from `SENTRY_DSN` environment variable

**And** source maps are uploaded during build for readable stack traces

**And** the existing `error.tsx` and `global-error.tsx` boundaries report to Sentry

**Prerequisites:** Story 1.1 (Dockerfile — Sentry needs build-time config)

**Technical Notes:**
- Run `npx @sentry/wizard@latest -i nextjs` for guided setup
- Configure `sentry.client.config.ts`, `sentry.server.config.ts`, `sentry.edge.config.ts`
- Add `withSentryConfig` wrapper to `next.config.ts`
- Set `SENTRY_AUTH_TOKEN` in Coolify for source map uploads

---

### Story 1.5: Google Analytics 4

As a **site operator**,
I want GA4 tracking on all pages with custom events for lead funnel tracking,
So that I can measure visitor behavior and conversion rates.

**Acceptance Criteria:**

**Given** a visitor browsing any page
**When** the page loads
**Then** GA4 pageview is tracked

**And** a `GoogleAnalytics` component exists that loads the gtag.js script

**And** it reads `NEXT_PUBLIC_GA_MEASUREMENT_ID` from environment

**And** custom event helpers are available for:
- `chat_started` (user opens chat widget)
- `chat_lead_captured` (lead created from chat)
- `assessment_started` (readiness score started)
- `assessment_completed` (readiness score finished)
- `lead_submitted` (any lead form submitted)

**And** events fire correctly (verifiable in GA4 debug view)

**Prerequisites:** None

**Technical Notes:**
- Add `GoogleAnalytics` component to `app/layout.tsx`
- Create `lib/analytics.ts` with typed event functions
- Use `'use client'` for the GA component
- Only load in production (check `NODE_ENV`)

---

### Story 1.6: Testing Infrastructure

As a **developer**,
I want Vitest and React Testing Library configured with example tests,
So that subsequent stories can include tests for business-critical logic.

**Acceptance Criteria:**

**Given** the project
**When** I run `npm test`
**Then** Vitest runs all `*.test.ts` and `*.test.tsx` files

**And** `vitest.config.ts` is configured with:
- Path aliases matching tsconfig (`@/`)
- React Testing Library setup
- jsdom environment for component tests

**And** an example unit test exists for `lib/scoring/readiness.ts` (existing code, easy to test)

**And** an example unit test exists for `lib/lead-scoring.ts`

**And** `npm test` passes with all example tests green

**Prerequisites:** None

**Technical Notes:**
- Install: `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `jsdom`
- Add `"test": "vitest"` and `"test:run": "vitest run"` to package.json scripts
- Co-locate tests next to source: `lib/scoring/readiness.test.ts`
- Focus tests on scoring algorithms — these are business-critical math

---

## Epic 2: AI Mortgage Advisor

**Goal:** Build a conversational AI chat experience powered by DeepSeek that qualifies visitors through natural dialogue and converts them into leads. The chat widget persists across page navigation and streams responses in real-time.

### Story 2.1: Upgrade Chat API to SSE Streaming

As a **visitor**,
I want to see the AI advisor's response appear word-by-word in real-time,
So that the conversation feels natural and responsive.

**Acceptance Criteria:**

**Given** a POST request to `/api/chat` with `messages[]` and `sessionId`
**When** the API calls DeepSeek with `stream: true`
**Then** the response is an SSE stream (`Content-Type: text/event-stream`)

**And** each chunk is formatted as `data: {"content": "token"}\n\n`

**And** the stream ends with `data: [DONE]\n\n`

**And** after streaming completes, the full response is persisted to the database (Conversation + Message records) via fire-and-forget

**And** the GET endpoint for conversation history still works unchanged

**And** if DeepSeek API fails, the response is a non-streaming JSON with a fallback message

**Prerequisites:** Story 1.3 (rate limiting — chat needs 10/min limit)

**Technical Notes:**
- Existing `lib/ai/deepseek.ts` already has `streamChatMessage()` async generator — use it
- Current `app/api/chat/route.ts` uses `stream: false` — upgrade POST handler
- Return `new Response(readableStream, { headers: SSE headers })`
- Pipe the async generator into a `ReadableStream` with `TextEncoder`
- Collect full response in a buffer while streaming for DB persistence

---

### Story 2.2: Floating Chat Widget with Streaming

As a **visitor**,
I want a floating chat bubble on every page that opens into a conversation window,
So that I can ask mortgage questions from anywhere on the site.

**Acceptance Criteria:**

**Given** any page on the site
**When** I click the chat bubble (bottom-right)
**Then** a chat window opens with the contextual greeting from Wendy

**And** I can type a message and see it appear in the conversation

**And** Wendy's response streams in token-by-token (typing effect)

**And** the chat window can be minimized back to the bubble

**And** the widget works on both desktop (floating panel) and mobile (full-screen overlay)

**And** the widget is mounted in `app/layout.tsx` so it persists across page navigation

**Prerequisites:** Story 2.1 (streaming API)

**Technical Notes:**
- Existing `components/chat/ChatWidget.tsx` needs upgrade for streaming
- Use `EventSource` or `fetch` with `ReadableStream` reader on client
- Contextual greeting from `lib/ai/system-prompt.ts` `getContextualGreeting()` based on current page path
- Client component (`'use client'`) with local state for messages, open/closed
- Style with Tailwind + shadcn Card/Dialog primitives
- z-index high enough to float above page content

---

### Story 2.3: Chat Session Persistence

As a **visitor**,
I want my chat conversation to persist as I navigate between pages,
So that I don't lose my conversation when browsing different loan types.

**Acceptance Criteria:**

**Given** a visitor with an active chat conversation
**When** they navigate to a different page
**Then** the chat widget retains all previous messages

**And** a `sessionId` is generated on first chat interaction and stored in `sessionStorage`

**And** message history is maintained in React Context that wraps the root layout

**And** if the browser tab is closed and reopened, the chat starts fresh (sessionStorage cleared)

**And** the full conversation is always persisted in the database regardless of client state

**Prerequisites:** Story 2.2 (chat widget)

**Technical Notes:**
- Create `ChatProvider` context component in `components/chat/ChatProvider.tsx`
- Wrap in `app/layout.tsx`: `<ChatProvider><ChatWidget />{children}</ChatProvider>`
- Generate sessionId with `crypto.randomUUID()` on first message
- Store sessionId in sessionStorage, message array in context state
- On mount, check sessionStorage for existing sessionId — if found, optionally load history from GET /api/chat

---

### Story 2.4: Chat-to-Lead Conversion

As a **visitor**,
I want the AI advisor to naturally offer to connect me with a local expert after qualifying me,
So that I can get personalized mortgage assistance.

**Acceptance Criteria:**

**Given** a conversation where the AI has gathered sufficient qualification data (4-6 exchanges)
**When** the AI asks for contact information and the visitor provides name, email, phone
**Then** the chat widget shows an inline contact form (name, email, phone, TCPA checkbox)

**And** on form submission, POST `/api/leads` is called with:
- Contact info from form
- `leadSource: "AI_ADVISOR"`
- `sessionId` linking to Conversation
- Extracted qualification data (loan type, location, timeline, credit range)
- TCPA consent with timestamp

**And** the lead is created and linked to the existing Conversation record

**And** a confirmation message appears in the chat ("Great! A local expert will reach out shortly.")

**And** the `extractQualificationData()` function in `lib/ai/deepseek.ts` is used to parse qualification data from the conversation

**Prerequisites:** Story 2.3 (session persistence)

**Technical Notes:**
- The AI system prompt already handles the transition to contact info request
- Detect contact info offer via keyword matching in AI response ("name", "email", "connect you")
- Show inline form component within chat when detected
- Call existing `extractQualificationData()` before lead creation
- Link lead to conversation: `prisma.conversation.update({ where: { sessionId }, data: { leadId } })`

---

### Story 2.5: Chat Error Handling and Edge Cases

As a **visitor**,
I want the chat to handle errors gracefully without crashing,
So that I always have a path to get help even if something goes wrong.

**Acceptance Criteria:**

**Given** the AI advisor chat is active
**When** the DeepSeek API returns an error or times out
**Then** a friendly fallback message appears: "I'm having a moment! You can also get help by filling out our quick form."

**And** the fallback includes a link to `/get-quote`

**And** the error is logged to Sentry with conversation context

**And** if rate limited (429), the message says: "I'm getting a lot of questions right now. Please try again in a minute!"

**And** typing indicator shows while waiting for AI response and disappears on error

**And** empty or whitespace-only messages cannot be sent

**Prerequisites:** Story 2.4, Story 1.4 (Sentry)

**Technical Notes:**
- Add try/catch in ChatWidget around fetch call
- Detect 429 vs 500 errors for different user messages
- Add 15-second timeout on client-side fetch
- Log failed API calls with session context to Sentry
- Ensure widget never shows raw error messages to users

---

## Epic 3: Mortgage Readiness Score

**Goal:** Build a gamified 10-question assessment that calculates a mortgage readiness score, displays results with animation, captures email for detailed breakdown, and enables social sharing. Converts engaged visitors into qualified leads.

### Story 3.1: Assessment Wizard UI

As a **visitor**,
I want to take a step-by-step mortgage readiness assessment with one question per screen,
So that I can easily answer questions without feeling overwhelmed.

**Acceptance Criteria:**

**Given** I navigate to `/readiness-score` or click a "Check Your Score" CTA
**When** the page loads
**Then** I see the first question with answer options as clickable cards

**And** a progress bar shows "Step 1 of 10"

**And** selecting an answer automatically advances to the next question

**And** I can go back to change previous answers

**And** on mobile, each question fills the screen (one question per view)

**And** on desktop, the layout is centered with comfortable width

**And** all 10 questions from FR-2.1 in the PRD are presented in order

**Prerequisites:** Story 1.6 (testing — score algorithm tests)

**Technical Notes:**
- Upgrade existing `components/readiness/ReadinessAssessment.tsx`
- Use React state for current step and accumulated responses (no DB writes until complete)
- Questions and answer options defined as typed data structure (not hardcoded in JSX)
- Match `AssessmentResponses` interface from `lib/scoring/readiness.ts`
- Animate transitions between questions (simple fade/slide)

---

### Story 3.2: Score Reveal with Animation

As a **visitor**,
I want to see my readiness score revealed with an engaging animation and personalized breakdown,
So that I feel rewarded for completing the assessment and understand my mortgage readiness.

**Acceptance Criteria:**

**Given** I've completed all 10 questions
**When** the score calculates
**Then** an animated counter shows the score counting up from 0 to my total (0-100)

**And** the score category is displayed with appropriate color:
- Mortgage Ready (80-100): Green
- Almost There (60-79): Blue
- Getting Prepared (40-59): Yellow
- Building Foundation (0-39): Orange

**And** the category description from `calculateReadinessScore()` is shown

**And** a breakdown shows each scoring dimension with progress bars

**And** personalized improvement tips from `getImprovementTips()` are displayed

**Prerequisites:** Story 3.1 (wizard UI)

**Technical Notes:**
- Score calculation runs client-side via `lib/scoring/readiness.ts` (already complete)
- Use CSS animation or `requestAnimationFrame` for counter animation
- Color helpers already exist: `getScoreColor()`, `getScoreBgColor()`
- Tip generation already exists: `getImprovementTips()`
- No API call needed for score — deterministic client-side calculation

---

### Story 3.3: Email Gate and Lead Creation

As a **site operator**,
I want the detailed score breakdown gated behind an email capture,
So that completing the assessment generates a qualified lead.

**Acceptance Criteria:**

**Given** a visitor has seen their score and category
**When** they want to see the full detailed breakdown
**Then** an email form appears asking for name, email, and TCPA consent

**And** phone number is optional but encouraged ("for priority matching")

**And** on submission, POST `/api/readiness` is called with:
- All 10 responses
- Calculated score and category
- Contact info
- TCPA consent with timestamp
- sessionId

**And** the API creates a `ReadinessAssessment` record and a `Lead` record (source: `READINESS_SCORE`)

**And** lead scoring is applied via `calculateEnhancedLeadScore()`

**And** after email capture, the full breakdown is revealed (no page reload)

**Prerequisites:** Story 3.2 (score reveal)

**Technical Notes:**
- Use React Hook Form + Zod for the email form validation
- TCPA checkbox text: "I consent to be contacted about mortgage options..."
- Capture consent IP via request headers or client-side
- The "teaser" shows score + category + tips; "full" adds dimensional breakdown
- Create both ReadinessAssessment and Lead in a Prisma transaction

---

### Story 3.4: Social Sharing

As a **visitor**,
I want to share my mortgage readiness score on social media,
So that I can engage friends and family (and drive traffic back to the site).

**Acceptance Criteria:**

**Given** a visitor has completed the assessment (email captured or not)
**When** they click a share button
**Then** pre-formatted share text opens in the respective platform:
- Twitter/X: "I scored [score]/100 on my Mortgage Readiness Score! 🏠 Check yours: [URL]"
- Facebook: Share with OG metadata from the page
- LinkedIn: Professional share with score

**And** the share URL includes a UTM parameter (`?utm_source=share&utm_medium=social`)

**And** share buttons are prominently displayed on the results screen

**And** sharing works without requiring email capture first (score is shown before gate)

**Prerequisites:** Story 3.2 (score reveal)

**Technical Notes:**
- Use `navigator.share()` for mobile (Web Share API) with fallback to direct links
- Twitter: `https://twitter.com/intent/tweet?text=...&url=...`
- Facebook: `https://www.facebook.com/sharer/sharer.php?u=...`
- OG tags on `/readiness-score` page for social previews
- Track `assessment_shared` GA4 event

---

## Epic 4: Landing Pages & SEO

**Goal:** Redesign the homepage with dual CTAs (AI Advisor + Readiness Score), integrate the chat widget and assessment CTAs into loan type pages, and optimize all pages for SEO and Core Web Vitals.

### Story 4.1: Homepage Redesign

As a **visitor**,
I want a compelling homepage that immediately shows me two paths to get help — chat with AI or check my score,
So that I engage with the site instead of bouncing.

**Acceptance Criteria:**

**Given** a visitor lands on the homepage
**When** the page loads
**Then** a hero section displays:
- Clear value proposition headline
- Dual CTA buttons: "Chat with AI Advisor" and "Check Your Readiness Score"
- Trust signals (security badges, "No commitment" messaging)

**And** below the hero:
- "How it works" 3-step process (Ask Wendy → Get Your Score → Connect with Expert)
- Loan type cards (Residential, Investment, Commercial) linking to segment hubs
- California focus messaging
- Footer with compliance disclaimers (Equal Housing, "Not a lender")

**And** the page matches the design direction from `docs/ux-redesign-mockup.html`

**And** all text is SEO-optimized with target keywords

**And** the page scores 90+ on Lighthouse performance

**Prerequisites:** Story 2.2 (ChatWidget), Story 3.1 (Readiness assessment)

**Technical Notes:**
- Upgrade existing `app/page.tsx`
- Use existing components: `TrustSignals`, `CtaSection`, segment cards
- Hero CTA "Chat with AI Advisor" opens the ChatWidget
- Hero CTA "Check Your Readiness Score" links to `/readiness-score`
- Server Component for the page, interactive CTAs as small client components

---

### Story 4.2: Loan Type Page Integration

As a **visitor on a loan type page**,
I want the AI advisor pre-prompted for my loan type and a readiness score CTA,
So that I get relevant help without explaining my situation from scratch.

**Acceptance Criteria:**

**Given** a visitor is on any loan type page (e.g., `/residential/fha`)
**When** they open the chat widget
**Then** Wendy greets them with a context-specific message (e.g., "Interested in FHA loans?")

**And** each loan type page includes:
- A "Check Your Readiness Score" CTA section
- The floating chat widget (already global via layout)
- FAQ section with FAQ schema markup

**And** the contextual greeting uses `getContextualGreeting()` from `lib/ai/system-prompt.ts`

**And** the page passes its loan context to the ChatWidget via data attribute or prop

**Prerequisites:** Story 4.1 (homepage), Story 2.2 (ChatWidget)

**Technical Notes:**
- Existing loan pages: 17+ across residential, commercial, investment
- Add a `pageContext` prop to the ChatProvider that reads from page metadata
- Each page already has content — add CTA sections and ensure ChatWidget integration
- Existing `getContextualGreeting()` already handles residential/investment/commercial/refinance
- Bulk update: create a shared `LoanPageLayout` component with built-in CTAs

---

### Story 4.3: California Metro Pages Enhancement

As a **visitor searching for local mortgage help**,
I want California metro pages with local market context and AI advisor with location awareness,
So that I feel confident I'm getting help specific to my area.

**Acceptance Criteria:**

**Given** a visitor lands on `/california/los-angeles` (or any metro page)
**When** the page loads
**Then** the page shows:
- Local market context and messaging
- "Connect with [City] mortgage experts" messaging
- AI Advisor pre-prompted with the location context
- Readiness Score CTA

**And** the ChatWidget receives the city as page context so Wendy references it

**And** JSON-LD `LocalBusiness` schema is present

**And** meta title includes the city name (e.g., "Mortgage Lenders in Los Angeles | Lendywendy")

**Prerequisites:** Story 4.2 (loan type integration pattern)

**Technical Notes:**
- Existing `app/california/[city]/page.tsx` with dynamic routing
- Existing `components/location/CityHero.tsx` and `lib/california-cities.ts`
- Add AI context and Readiness CTA using same pattern as Story 4.2
- 6 metro pages: LA, SF, San Diego, Sacramento, San Jose, Orange County

---

### Story 4.4: SEO Optimization Pass

As a **site operator**,
I want all pages optimized for search engines with proper schema markup and meta tags,
So that the site ranks well for mortgage-related searches.

**Acceptance Criteria:**

**Given** any page on the site
**When** it is crawled by search engines
**Then** it has:
- Unique meta title (<60 chars) and description (<160 chars)
- Open Graph tags for social sharing
- Canonical URL
- JSON-LD structured data (FAQPage for loan pages, LocalBusiness for metro pages)

**And** the sitemap at `/sitemap.xml` includes all pages with correct priorities

**And** `robots.txt` allows crawling of all public pages, blocks admin routes

**And** all pages pass Google's Rich Results Test for their schema type

**And** no pages have duplicate titles or descriptions

**Prerequisites:** Story 4.1, 4.2, 4.3 (all pages need to exist first)

**Technical Notes:**
- Existing components: `StructuredData.tsx`, `breadcrumbs.tsx`, `meta-tags.tsx`
- Existing `app/sitemap.ts` and `app/robots.ts`
- Audit all pages for missing/duplicate meta tags
- Validate JSON-LD with Google's testing tool
- Use Next.js `metadata` export pattern for per-page SEO

---

## Epic 5: Lead Management & Admin

**Goal:** Build an admin dashboard for viewing, filtering, managing, and exporting leads from all sources (AI Advisor, Readiness Score, forms). Give admins visibility into the full lead pipeline.

### Story 5.1: Lead Dashboard with Filters

As an **admin**,
I want a dashboard showing all leads with filters and sorting,
So that I can quickly find and prioritize leads.

**Acceptance Criteria:**

**Given** an authenticated admin at `/admin/leads`
**When** the page loads
**Then** a table shows leads with columns: Name, Email, Source, Score, Status, Date

**And** filters are available for: source (AI Advisor/Score/Form), score category (hot/warm/cold), status, segment, date range

**And** text search works on name, email, phone

**And** sorting works on all columns

**And** pagination shows 20 leads per page

**And** the dashboard loads in <2 seconds

**Prerequisites:** Story 2.4 (AI leads), Story 3.3 (Score leads)

**Technical Notes:**
- Upgrade existing `app/admin/leads/page.tsx` and `app/api/admin/leads/route.ts`
- Use existing shadcn Table, Badge, Select components
- Server-side filtering and pagination via Prisma query
- Lead source badge colors: AI Advisor (purple), Readiness Score (blue), Form (gray)
- Score category badge colors: Hot (red), Warm (orange), Cold (blue)

---

### Story 5.2: Lead Detail View

As an **admin**,
I want to see full details of any lead including their AI conversation or assessment data,
So that I can understand the lead's situation before reaching out.

**Acceptance Criteria:**

**Given** an admin clicks on a lead in the dashboard
**When** the detail view opens
**Then** it shows:
- All contact info and qualification data
- Lead score with breakdown (from `calculateEnhancedLeadScore`)
- Source-specific data:
  - AI Advisor leads: full conversation transcript
  - Readiness Score leads: assessment responses and score breakdown
  - Form leads: submitted form data
- Status history and notes
- TCPA consent details

**And** the detail view can be a slide-over panel or separate page

**Prerequisites:** Story 5.1 (dashboard)

**Technical Notes:**
- Query lead with `include: { conversation: { include: { messages: true } }, readinessAssessment: true }`
- Conversation transcript rendered as chat bubbles (read-only)
- Assessment breakdown rendered with the same progress bars as user-facing results
- Use shadcn Dialog or Sheet component for panel view

---

### Story 5.3: Lead Status Workflow and Agent Assignment

As an **admin**,
I want to update lead status and assign leads to agents,
So that I can manage the sales pipeline.

**Acceptance Criteria:**

**Given** an admin viewing a lead
**When** they change the status dropdown
**Then** the lead status updates (NEW → CONTACTED → QUALIFIED → IN_PROCESS → CONVERTED/CLOSED_LOST)

**And** an agent can be assigned from a dropdown of active agents

**And** assignment is recorded with timestamp

**And** notes can be added to the lead record

**And** status changes are saved immediately via API call

**Prerequisites:** Story 5.2 (lead detail)

**Technical Notes:**
- Use existing Prisma enums: `LeadStatus`, `Agent` model
- PATCH `/api/admin/leads/[id]` for status/assignment updates
- Agent dropdown populated from `prisma.agent.findMany({ where: { status: 'ACTIVE' } })`
- Notes saved as text field on Lead model

---

### Story 5.4: CSV Export

As an **admin**,
I want to export filtered leads to CSV,
So that I can share lead data with partners or analyze in spreadsheets.

**Acceptance Criteria:**

**Given** an admin on the leads dashboard with active filters
**When** they click "Export CSV"
**Then** a CSV file downloads containing all leads matching the current filters

**And** the CSV includes: Name, Email, Phone, Source, Segment, Loan Type, Score, Status, Location, Date, Agent

**And** the export works for up to 10,000 leads

**And** PII fields are included (admin is authenticated, authorized)

**Prerequisites:** Story 5.1 (dashboard with filters)

**Technical Notes:**
- GET `/api/admin/leads/export?format=csv` with same filter params as list endpoint
- Stream CSV response for large exports (don't load all into memory)
- Use `Content-Disposition: attachment; filename="leads-export-{date}.csv"`
- Reuse the same Prisma query builder from the list endpoint

---

## Epic 6: Integrations & Routing

**Goal:** Connect the lead pipeline to external services — email notifications via Resend, MaxBounty affiliate webhook with retry logic, and automatic agent matching/routing for qualified leads.

### Story 6.1: Resend Email Integration

As a **site operator**,
I want email notifications sent automatically when leads are created,
So that admins and agents are alerted and borrowers get confirmation.

**Acceptance Criteria:**

**Given** a new lead is created (from any source)
**When** the lead is saved to the database
**Then** three emails are triggered:
1. **Borrower confirmation:** "Thanks for reaching out! A local expert will contact you soon."
2. **Admin alert:** "New [hot/warm/cold] lead from [source]: [name] — [loan type] in [location]"
3. **Agent alert** (if auto-assigned): "New lead assigned to you: [name] — [loan type]"

**And** emails are sent via Resend API

**And** email templates are clean, mobile-responsive HTML

**And** email sending failures are logged but never block lead creation

**Prerequisites:** Story 2.4 (AI leads), Story 3.3 (Score leads)

**Technical Notes:**
- Replace existing `lib/integrations/email.ts` with Resend implementation
- Install `resend` package
- Create email templates in `lib/integrations/email-templates.ts` (HTML strings or react-email)
- Fire-and-forget pattern (don't await email before responding to user)
- Log email send results to console (structured)

---

### Story 6.2: Webhook Retry Cron Endpoint

As a **site operator**,
I want failed MaxBounty webhook submissions to be automatically retried,
So that no leads are lost due to transient failures.

**Acceptance Criteria:**

**Given** a lead where `maxBountySubmitted = false` and `createdAt` within last 7 days
**When** the cron endpoint `POST /api/webhooks/retry` is called
**Then** the lead is re-submitted to MaxBounty using existing `sendToMaxBounty()`

**And** the endpoint processes up to 100 failed leads per run

**And** there's a 100ms delay between submissions (avoid overwhelming MaxBounty)

**And** the response reports: `{ processed, successful, failed }`

**And** the endpoint is protected (only callable from Coolify cron or with auth token)

**Prerequisites:** None (existing `lib/integrations/maxbounty.ts` has `retryFailedSubmissions()`)

**Technical Notes:**
- Existing `retryFailedSubmissions()` in `lib/integrations/maxbounty.ts` already implements this logic
- Create `app/api/webhooks/retry/route.ts` that calls the existing function
- Protect with a `CRON_SECRET` header check
- Configure Coolify cron to POST every 5 minutes with the secret header

---

### Story 6.3: Agent Routing Algorithm

As a **site operator**,
I want leads automatically matched with the best available local agent,
So that leads get quick, relevant responses.

**Acceptance Criteria:**

**Given** a new qualified lead (score >= 60, hot or warm)
**When** lead scoring is complete
**Then** the system finds matching agents based on:
1. Location match (agent serves the lead's state/metro) — **required**
2. Loan type match (agent handles the lead's loan type) — **required**
3. Capacity available (agent hasn't exceeded weekly cap) — **required**
4. Round-robin within qualified agents (distribute evenly)

**And** if a match is found, the lead is auto-assigned (`assignedAgentId`, `assignedAt`)

**And** if no match is found, the lead remains unassigned for manual admin assignment

**And** the matching runs as part of lead creation (not async)

**Prerequisites:** Story 5.3 (agent assignment field)

**Technical Notes:**
- Create `lib/agent-routing.ts` with `findBestAgent(lead: Lead): Promise<Agent | null>`
- Query: `prisma.agent.findMany({ where: { status: 'ACTIVE', states: { has: lead.state }, loanTypes: { has: lead.loanType }, currentWeekLeads: { lt: weeklyCapacity } } })`
- Round-robin: pick agent with lowest `currentWeekLeads`
- Increment `currentWeekLeads` on assignment
- Call from lead creation flow (both AI and Readiness sources)

---

### Story 6.4: Agent Notification on Assignment

As a **matched agent**,
I want to be notified immediately when a lead is assigned to me,
So that I can respond quickly and close the deal.

**Acceptance Criteria:**

**Given** a lead is auto-assigned to an agent via the routing algorithm
**When** the assignment is saved
**Then** the agent receives an email with:
- Lead name and contact info
- Loan type and property location
- Lead score and category
- Key qualification data (credit range, timeline, down payment)
- Source (AI conversation summary or readiness score)

**And** the email is sent via Resend (same as Story 6.1)

**And** the email includes a link to the admin lead detail view

**Prerequisites:** Story 6.1 (Resend), Story 6.3 (agent routing)

**Technical Notes:**
- Reuse Resend integration from Story 6.1
- Create agent-specific email template with lead summary
- Include "Respond within 4 hours for best conversion" messaging
- Track agent response time for future performance metrics

---

## Epic 7: Content & SEO (POST-MVP)

**Goal:** Build out the content hub with blog, educational guides, and FAQ content to drive organic search traffic. Uses the existing CMS infrastructure (Tiptap, Article/Guide models).

**Status: DEFERRED to Phase 4.** All CMS models and components are preserved in the codebase but no new development until post-MVP.

---

## Epic 8: Polish, Compliance & Launch

**Goal:** Final optimization pass covering mobile experience, accessibility, legal compliance, performance, and monitoring setup. Ensures the site is production-ready and legally compliant before launch.

### Story 8.1: Mobile Optimization

As a **mobile visitor**,
I want every page and feature to work flawlessly on my phone,
So that I can engage with the site on any device.

**Acceptance Criteria:**

**Given** any page viewed on a mobile device (375px width)
**When** the page renders
**Then** all content is readable without horizontal scrolling

**And** the chat widget opens as a full-screen overlay on mobile

**And** the readiness assessment shows one question per screen

**And** all tap targets are at least 44x44px

**And** the mobile CTA bar (`components/layout/mobile-cta.tsx`) is visible and functional

**And** all pages pass Google's Mobile-Friendly Test

**Prerequisites:** All E2, E3, E4 stories complete

**Technical Notes:**
- Audit all pages at 375px and 768px breakpoints
- Test ChatWidget mobile overlay mode
- Verify Readiness Assessment step-by-step UX on small screens
- Check all forms are usable with mobile keyboards (input types, autofill)

---

### Story 8.2: Accessibility Audit

As a **visitor with disabilities**,
I want the site to be accessible with screen readers and keyboard navigation,
So that I can use the site regardless of ability.

**Acceptance Criteria:**

**Given** the complete site
**When** audited for WCAG 2.1 Level AA compliance
**Then** all pages score 90+ on Lighthouse accessibility

**And** all images have descriptive alt text

**And** all form inputs have associated labels

**And** the chat widget is keyboard-navigable (Tab, Enter, Escape to close)

**And** color contrast meets 4.5:1 minimum ratio

**And** focus indicators are visible on all interactive elements

**And** ARIA labels are present on the chat widget and assessment

**Prerequisites:** Story 8.1 (mobile optimization)

**Technical Notes:**
- Run Lighthouse accessibility audit on all key pages
- Test with keyboard-only navigation
- Add `aria-label` to ChatWidget toggle button
- Ensure score reveal animation respects `prefers-reduced-motion`
- Form error messages linked to inputs with `aria-describedby`

---

### Story 8.3: Compliance Pages and Disclaimers

As a **site operator**,
I want all legal compliance requirements met before launch,
So that the site operates within regulatory guidelines.

**Acceptance Criteria:**

**Given** the site is ready for public traffic
**When** reviewed for compliance
**Then** the following pages exist:
- `/privacy-policy` — Privacy policy page
- `/terms` — Terms of service page

**And** the footer on every page includes:
- Equal Housing Opportunity logo and text
- "LendyWendy is not a lender" disclaimer
- Links to Privacy Policy and Terms
- Copyright notice

**And** TCPA consent language is present on every lead capture point (chat form, readiness email gate, get-quote form)

**And** consent timestamp and IP are logged with every lead

**Prerequisites:** None (can be done anytime)

**Technical Notes:**
- Create `app/privacy-policy/page.tsx` and `app/terms/page.tsx`
- Update `components/layout/footer.tsx` with required disclaimers
- TCPA checkbox text: "By submitting, I agree to be contacted by phone, email, or text regarding mortgage options. I understand this is not a loan application. [Privacy Policy]"
- Verify all lead creation paths capture consentTimestamp and consentIp

---

### Story 8.4: Performance Optimization

As a **site operator**,
I want all pages to meet Core Web Vitals targets,
So that the site ranks well in search engines and provides fast user experience.

**Acceptance Criteria:**

**Given** any page on the site
**When** measured with Lighthouse (or PageSpeed Insights)
**Then** LCP < 2.5 seconds, FID < 100ms, CLS < 0.1

**And** all images use `next/image` with proper sizing and lazy loading

**And** only necessary JavaScript is loaded per page (check bundle size)

**And** the homepage scores 90+ on Lighthouse Performance

**And** no render-blocking resources in the critical path

**Prerequisites:** All other E8 stories (final pass)

**Technical Notes:**
- Run Lighthouse on: homepage, loan type pages, readiness score, admin dashboard
- Check that Server Components are used where possible (minimize client JS)
- Verify `sharp` is working for image optimization in the Docker container
- Consider adding `loading="lazy"` to below-fold images
- Check GA4 and Sentry scripts don't block rendering

---

### Story 8.5: Launch Monitoring Setup

As a **site operator**,
I want monitoring and alerting configured before launch,
So that I'm immediately aware of any production issues.

**Acceptance Criteria:**

**Given** the site is deployed to Coolify
**When** production traffic starts flowing
**Then** Sentry is capturing errors with proper source maps

**And** Sentry alerts are configured for: error spike, new error type

**And** Coolify health checks are configured (HTTP check on `/`)

**And** Database backup schedule is confirmed in Coolify

**And** a simple uptime monitoring is configured (Coolify built-in or external like UptimeRobot)

**And** basic runbook exists documenting: how to deploy, how to rollback, how to check logs

**Prerequisites:** Story 1.4 (Sentry), Story 1.1 (Coolify deployment)

**Technical Notes:**
- Verify Sentry source maps work in production build
- Configure Sentry alert rules in Sentry dashboard
- Test Coolify deployment pipeline: push → build → deploy
- Document rollback procedure (Coolify supports one-click rollback)
- Verify database backups are scheduled and test a restore

---

## Validation Summary

### FR Coverage

| Functional Requirement | Stories Covering |
|------------------------|------------------|
| FR-1: AI Mortgage Advisor | E2 (Stories 2.1-2.5) |
| FR-2: Mortgage Readiness Score | E3 (Stories 3.1-3.4) |
| FR-3: Landing Pages | E4 (Stories 4.1-4.4) |
| FR-4: Lead Management | E5 (Stories 5.1-5.4) |
| FR-5: Integrations | E6 (Stories 6.1-6.4) |

### NFR Coverage

| Non-Functional Requirement | Stories Covering |
|---------------------------|------------------|
| NFR-1: Performance | E8 Story 8.4, E1 Story 1.1 |
| NFR-2: Security | E1 Story 1.3 (rate limiting), E8 Story 8.3 (compliance) |
| NFR-3: Compliance | E8 Story 8.3, All lead stories (TCPA) |
| NFR-4: Scalability | E1 Story 1.1 (Coolify), Architecture decisions |
| NFR-5: Monitoring | E1 Stories 1.4-1.5, E8 Story 8.5 |

### Story Count by Epic

| Epic | Stories | Estimated Complexity |
|------|---------|---------------------|
| E1: Foundation | 6 | Low-Medium (config/setup) |
| E2: AI Advisor | 5 | High (streaming, state management) |
| E3: Readiness Score | 4 | Medium (UI + scoring already exists) |
| E4: Landing Pages | 4 | Medium (upgrade existing pages) |
| E5: Lead Management | 4 | Medium (admin CRUD) |
| E6: Integrations | 4 | Medium (external services) |
| E7: Content (deferred) | -- | Deferred |
| E8: Polish & Launch | 5 | Low-Medium (audit/optimize) |
| **Total** | **32** | |

---

_For implementation: Use the `create-story` workflow to generate individual story implementation plans from this epic breakdown._
