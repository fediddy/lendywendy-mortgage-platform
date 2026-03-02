# Lendywendy.com — Architecture Document

**Date:** 2026-02-28
**Version:** 2.0 (aligned with PRD v2)
**Author:** BMad
**Strategy:** AI-First Lead Engagement
**Project Type:** Brownfield (enhancing existing codebase)

---

## Executive Summary

Lendywendy.com is an AI-powered mortgage lead generation platform deployed as a self-hosted Next.js application on Coolify. The architecture prioritizes two core differentiators — a conversational AI Mortgage Advisor (DeepSeek-powered) and a gamified Mortgage Readiness Score — that convert visitors into qualified leads through engagement rather than traditional forms. The existing brownfield codebase provides a solid foundation with 40+ pages, a comprehensive Prisma schema, and working integrations that this architecture formalizes and extends.

---

## Decision Summary

| Category | Decision | Version | Affects Epics | Rationale |
|----------|----------|---------|---------------|-----------|
| Framework | Next.js (App Router) | 16.1.6 | All | Already deployed, SSR + API routes in one project |
| Language | TypeScript | 5.x | All | Type safety across full stack |
| Database | PostgreSQL (Coolify-managed) | 17.x | All | Relational data, ACID compliance, Prisma support |
| ORM | Prisma | 6.19.0 | All | Type-safe queries, migrations, schema-first |
| Auth | NextAuth.js | 5.0.0-beta.30 | E1, E5 | Admin-only auth, Prisma adapter, credentials provider |
| Styling | Tailwind CSS + shadcn/ui | 4.x | All frontend | Utility-first CSS, Radix UI primitives |
| AI Provider | DeepSeek API (OpenAI-compatible) | deepseek-chat | E2 | Cost-effective, streaming support, direct fetch |
| AI Streaming | Direct fetch + SSE (ReadableStream) | -- | E2 | No vendor SDK dependency, full control |
| Email | Resend | latest | E6 | Modern API, react-email templates, free tier |
| Deployment | Coolify (Docker standalone) | Self-hosted VPS | All | Self-hosted PaaS, no vendor lock-in |
| Image Optimization | sharp (self-hosted) | latest | E4, E8 | next/image default for non-Vercel |
| Forms | React Hook Form + Zod | 7.66 / 4.1 | E2, E3, E5 | Validation + type inference |
| Dates | date-fns | 4.1.0 | All | Tree-shakeable, immutable |
| Icons | lucide-react | 0.552 | All frontend | Consistent icon set |
| Error Tracking | Sentry (cloud) | latest | E8 | Industry standard, Next.js integration |
| Analytics | Google Analytics 4 | -- | E8 | Free, sufficient for lead-gen |
| Rate Limiting | In-memory sliding window | Custom | E2, E8 | Simple, no Redis needed at scale |
| Rich Text Editor | Tiptap | 3.10.2 | E7 (post-MVP) | Already integrated for CMS |
| Background Jobs | DB-based retry queue + cron | Custom | E6 | No external queue service needed |
| Testing | Vitest + React Testing Library | latest | All | Fast, ESM-native, Jest-compatible |

---

## Project Structure

```
lendywendy.com/
├── app/                              # Next.js App Router (pages + API)
│   ├── layout.tsx                    # Root layout — ChatWidget mounted here
│   ├── page.tsx                      # Homepage
│   ├── error.tsx                     # Error boundary
│   ├── global-error.tsx              # Global error boundary
│   ├── not-found.tsx                 # 404 page
│   ├── robots.ts                     # Dynamic robots.txt
│   ├── sitemap.ts                    # Dynamic XML sitemap
│   ├── admin/
│   │   ├── content/                  # CMS admin (post-MVP Phase 4)
│   │   │   ├── page.tsx              # Content list
│   │   │   ├── new/page.tsx          # Create content
│   │   │   └── edit/page.tsx         # Edit content
│   │   └── leads/
│   │       └── page.tsx              # Lead management dashboard
│   ├── api/
│   │   ├── auth/[...nextauth]/
│   │   │   └── route.ts             # NextAuth endpoints
│   │   ├── chat/
│   │   │   └── route.ts             # AI Advisor — POST (stream SSE), GET (history)
│   │   ├── leads/
│   │   │   └── route.ts             # Lead CRUD — POST (create), GET (list)
│   │   ├── readiness/
│   │   │   └── route.ts             # Readiness Score submission
│   │   ├── admin/
│   │   │   ├── content/route.ts      # Admin content API (post-MVP)
│   │   │   ├── categories/route.ts   # Admin categories API (post-MVP)
│   │   │   └── leads/route.ts        # Admin leads API
│   │   ├── og/
│   │   │   └── route.tsx             # Dynamic OG image generation
│   │   └── webhooks/
│   │       └── retry/route.ts        # Cron endpoint for webhook retries
│   ├── california/
│   │   ├── page.tsx                  # California hub page
│   │   └── [city]/page.tsx           # Dynamic metro pages
│   ├── commercial/
│   │   ├── page.tsx                  # Commercial hub
│   │   ├── construction-loans/page.tsx
│   │   ├── conventional-cre/page.tsx
│   │   ├── sba-504-loans/page.tsx
│   │   └── sba-7a-loans/page.tsx
│   ├── investment/
│   │   ├── page.tsx                  # Investment hub
│   │   ├── bridge-loans/page.tsx
│   │   ├── dscr-loans/page.tsx
│   │   ├── fix-and-flip/page.tsx
│   │   ├── hard-money/page.tsx
│   │   └── portfolio-loans/page.tsx
│   ├── residential/
│   │   ├── page.tsx                  # Residential hub
│   │   ├── conventional/page.tsx
│   │   ├── fha/page.tsx
│   │   ├── jumbo/page.tsx
│   │   └── va/page.tsx
│   ├── calculators/page.tsx          # Calculator hub (post-MVP)
│   ├── get-quote/page.tsx            # Lead capture form (fallback)
│   ├── readiness-score/page.tsx      # Mortgage Readiness Score assessment
│   ├── lead-submitted/page.tsx       # Confirmation page
│   └── login/page.tsx                # Admin login
├── components/
│   ├── ui/                           # shadcn/ui primitives (13 components)
│   │   ├── alert.tsx
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── progress.tsx
│   │   ├── select.tsx
│   │   ├── slider.tsx
│   │   ├── table.tsx
│   │   ├── tabs.tsx
│   │   └── textarea.tsx
│   ├── chat/                         # AI Advisor components
│   │   └── ChatWidget.tsx            # Floating chat widget
│   ├── readiness/                    # Readiness Score components
│   │   └── ReadinessAssessment.tsx   # Assessment wizard
│   ├── leads/                        # Lead capture components
│   │   └── multi-step-lead-form.tsx  # Multi-step form (get-quote fallback)
│   ├── layout/                       # Site-wide layout components
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   │   └── mobile-cta.tsx
│   ├── shared/                       # Reusable cross-page components
│   │   ├── CtaSection.tsx
│   │   └── TrustSignals.tsx
│   ├── seo/                          # SEO components
│   │   ├── StructuredData.tsx        # JSON-LD schema
│   │   ├── breadcrumbs.tsx
│   │   └── meta-tags.tsx
│   ├── segments/                     # Loan segment components
│   │   ├── content-card.tsx
│   │   ├── segment-hub-hero.tsx
│   │   └── segment-navigation.tsx
│   ├── location/                     # Location-specific components
│   │   └── CityHero.tsx
│   ├── calculators/                  # Calculator components (post-MVP)
│   ├── editor/                       # Tiptap editor (post-MVP)
│   ├── forms/                        # CMS forms (post-MVP)
│   └── workflow/                     # Publishing workflow (post-MVP)
├── lib/
│   ├── ai/
│   │   ├── deepseek.ts              # DeepSeek API client + streaming helpers
│   │   └── system-prompt.ts          # AI persona, conversation config, contextual greetings
│   ├── integrations/
│   │   ├── email.ts                  # Resend email service
│   │   ├── maxbounty.ts             # MaxBounty webhook + retry logic
│   │   └── index.ts                  # Integration barrel export
│   ├── scoring/
│   │   └── readiness.ts             # Readiness Score algorithm (weighted, 0-100)
│   ├── auth.ts                       # NextAuth configuration
│   ├── db.ts                         # Prisma client singleton
│   ├── lead-scoring.ts              # Lead quality scoring (weighted, 0-100)
│   ├── logger.ts                     # Structured JSON logging
│   ├── webhooks.ts                   # Webhook queue/retry utilities
│   ├── california-cities.ts          # California metro data
│   ├── content-service.ts            # CMS content service (post-MVP)
│   ├── content-utils.ts              # CMS utilities (post-MVP)
│   ├── og.ts                         # OG image generation helpers
│   ├── url-utils.ts                  # URL formatting utilities
│   └── utils.ts                      # General utilities (cn helper, etc.)
├── prisma/
│   └── schema.prisma                 # Database schema (15 models)
├── public/                           # Static assets
├── docs/                             # Project documentation
├── Dockerfile                        # Multi-stage build for Coolify
├── .dockerignore                     # Docker ignore patterns
├── next.config.ts                    # output: 'standalone', sharp config
├── tailwind.config.ts                # Tailwind configuration
├── tsconfig.json                     # TypeScript configuration
├── package.json                      # Dependencies and scripts
└── .env.example                      # Environment variable template
```

---

## Epic to Architecture Mapping

| Epic | Primary Locations | Key Dependencies |
|------|-------------------|------------------|
| **E1: Foundation & Infrastructure** | `Dockerfile`, `next.config.ts`, `lib/db.ts`, `lib/auth.ts`, `prisma/schema.prisma`, `app/layout.tsx`, `components/ui/` | PostgreSQL, Coolify, NextAuth |
| **E2: AI Mortgage Advisor** | `app/api/chat/route.ts`, `components/chat/ChatWidget.tsx`, `lib/ai/deepseek.ts`, `lib/ai/system-prompt.ts` | DeepSeek API, Prisma (Conversation, Message) |
| **E3: Mortgage Readiness Score** | `app/readiness-score/page.tsx`, `app/api/readiness/route.ts`, `components/readiness/ReadinessAssessment.tsx`, `lib/scoring/readiness.ts` | Prisma (ReadinessAssessment, Lead) |
| **E4: Landing Pages & SEO** | `app/page.tsx`, `app/residential/`, `app/commercial/`, `app/investment/`, `app/california/`, `components/seo/`, `components/segments/` | JSON-LD schema, sitemap.ts |
| **E5: Lead Management & Admin** | `app/admin/leads/page.tsx`, `app/api/admin/leads/route.ts`, `lib/lead-scoring.ts` | NextAuth (admin auth), Prisma (Lead, Agent) |
| **E6: Integrations & Routing** | `lib/integrations/maxbounty.ts`, `lib/integrations/email.ts`, `app/api/webhooks/retry/route.ts`, `lib/webhooks.ts` | Resend, MaxBounty API, Coolify cron |
| **E7: Content & SEO** (post-MVP) | `app/admin/content/`, `components/editor/`, `lib/content-service.ts` | Tiptap, Prisma (Article, Guide, Calculator) |
| **E8: Polish, Compliance & Launch** | Cross-cutting: all `app/` pages, `components/layout/`, Sentry config, GA4 script | Sentry, GA4 |

---

## Technology Stack Details

### Core Technologies

**Next.js 16.1.6 (App Router)**
- `output: 'standalone'` for Docker/Coolify deployment
- Server Components by default, `'use client'` only for interactive components
- API routes for all backend endpoints
- Dynamic routes for California metros (`[city]`)
- Static generation for loan type pages
- `next/image` with `sharp` for self-hosted image optimization

**TypeScript 5.x**
- Strict mode enabled
- Path aliases: `@/` maps to project root
- Prisma generates types from schema

**PostgreSQL 17 (Coolify-managed)**
- Managed as a Coolify service on the same VPS
- Accessed via Prisma ORM
- Connection pooling via Prisma's built-in connection manager
- Backups managed via Coolify's database backup feature

**Prisma 6.19.0**
- Schema-first approach with 15 models
- Migrations via `prisma migrate deploy` in Docker build
- Client singleton in `lib/db.ts`
- Generated types used throughout the application

### Integration Points

**DeepSeek API (AI Mortgage Advisor)**
- OpenAI-compatible REST API at `https://api.deepseek.com/v1/chat/completions`
- Model: `deepseek-chat`
- Direct `fetch` with streaming (`stream: true`) returning SSE
- System prompt defines "Wendy" persona with conversation goals and boundaries
- Contextual greetings based on page context (loan type)
- Qualification data extraction via secondary AI call
- Temperature: 0.7, max_tokens: 500
- Existing implementation: `lib/ai/deepseek.ts`

**Resend (Email Notifications)**
- Lead confirmation emails to borrowers
- New lead alerts to admin
- Agent notification on lead assignment
- React-email templates for consistent HTML emails
- Replace current `lib/integrations/email.ts` implementation

**MaxBounty (Affiliate Webhook)**
- POST webhook on lead creation with mapped payload
- Retry logic for failed submissions (7-day window, batch retries)
- Submission status tracked per lead (`maxBountySubmitted`, `maxBountyResponse`)
- Existing implementation: `lib/integrations/maxbounty.ts`

**Sentry (Error Tracking)**
- Next.js SDK with automatic error boundary integration
- Server-side and client-side error capture
- Performance monitoring (optional)

**Google Analytics 4**
- Client-side gtag.js script
- Custom events: `chat_started`, `chat_lead_captured`, `assessment_started`, `assessment_completed`, `lead_submitted`

---

## Novel Pattern Designs

### Pattern 1: Conversational Lead Qualification (AI Advisor)

**Purpose:** Convert visitors into qualified leads through natural AI conversation rather than forms.

**Components:**
- `ChatWidget` (client component) — Floating bottom-right widget in root `layout.tsx`, persists across page navigation
- `/api/chat` (API route) — Streams DeepSeek responses via SSE, persists messages to DB
- `lib/ai/deepseek.ts` — DeepSeek client with streaming support and qualification extraction
- `lib/ai/system-prompt.ts` — Wendy persona, conversation goals, contextual greetings

**Data Flow:**
```
1. User opens chat → ChatWidget generates sessionId (stored in sessionStorage)
2. User sends message → POST /api/chat with messages[] + sessionId
3. API route calls DeepSeek with system prompt + message history
4. DeepSeek streams response → API pipes SSE to client via ReadableStream
5. Client renders tokens as they arrive (typing effect)
6. API stores user message + assistant response in Conversation/Message tables
7. After 4-6 exchanges → AI naturally asks for contact info
8. User provides contact info → Client calls POST /api/leads
9. Lead created → linked to Conversation → triggers MaxBounty webhook + email
```

**State Management:**
- `sessionId` in browser `sessionStorage` (survives page navigation, lost on tab close)
- Message history maintained in React Context wrapping the ChatWidget
- Full conversation persisted in DB (Conversation + Message models)
- Widget state (open/closed/minimized) in React state within root layout

**Upgrade Needed:** Current `/api/chat` uses non-streaming responses (`stream: false`). Must upgrade to SSE streaming for real-time token delivery.

**Edge Cases:**
- DeepSeek API failure → fallback message directing to `/get-quote` form
- Session lost (tab close) → user starts fresh, previous conversation retained in DB for admin
- Rate limited → polite message, suggest trying again shortly
- Off-topic → system prompt handles redirection to mortgage topics

---

### Pattern 2: Gamified Assessment Engine (Readiness Score)

**Purpose:** Engage visitors with a gamified 10-question assessment that qualifies leads and captures emails.

**Components:**
- `ReadinessAssessment` (client component) — Step-by-step wizard in `/readiness-score`
- `/api/readiness` (API route) — Receives completed assessment, creates ReadinessAssessment + Lead records
- `lib/scoring/readiness.ts` — Weighted scoring algorithm (deterministic, no API call)

**Data Flow:**
```
1. User clicks "Check Your Readiness Score" CTA
2. ReadinessAssessment renders question 1 of 10 (one per screen on mobile)
3. Progress bar updates with each answer (client-side state only)
4. All 10 answers collected → lib/scoring/readiness.ts calculates score client-side
5. Animated score reveal with category (Mortgage Ready / Almost There / etc.)
6. Score visible immediately, detailed breakdown requires email
7. User enters email → POST /api/readiness with responses + score + email
8. API creates ReadinessAssessment record + Lead record (source: READINESS_SCORE)
9. Lead scoring applied → MaxBounty webhook + confirmation email triggered
10. Social share buttons offered with pre-formatted text
```

**Score Algorithm (existing, validated):**
- Credit score: 0-25 points
- Employment stability: 0-15 points
- Income adequacy: 0-15 points
- Debt-to-income: 0-15 points
- Down payment: 0-15 points
- Pre-approval status: 0-10 points
- No negative credit events: 0-5 points
- Total: 0-100 → categories: Mortgage Ready (80+), Almost There (60-79), Getting Prepared (40-59), Building Foundation (0-39)

**Implementation:** `lib/scoring/readiness.ts` is already complete with `calculateReadinessScore()`, `getImprovementTips()`, and display helpers.

---

## Implementation Patterns

These patterns ensure consistent implementation across all AI agents:

### Naming Conventions

| Entity | Convention | Example |
|--------|-----------|---------|
| React components | PascalCase files | `ChatWidget.tsx`, `ReadinessAssessment.tsx` |
| Utility/lib files | kebab-case | `lead-scoring.ts`, `california-cities.ts` |
| API route dirs | kebab-case (Next.js convention) | `app/api/chat/route.ts` |
| DB models | PascalCase (Prisma) | `Lead`, `Conversation`, `ReadinessAssessment` |
| DB columns | camelCase (Prisma) | `leadSource`, `scoreCategory`, `createdAt` |
| DB enums | SCREAMING_SNAKE | `MORTGAGE_READY`, `AI_ADVISOR` |
| CSS | Tailwind utilities only | No custom CSS files |
| IDs | cuid | Prisma `@default(cuid())` |
| Environment vars | SCREAMING_SNAKE | `DEEPSEEK_API_KEY`, `DATABASE_URL` |
| Component props | `{Name}Props` interface | `ChatWidgetProps`, `ReadinessAssessmentProps` |

### Component Pattern

```typescript
// Server Component (default)
export default function LoanTypePage() {
  return <div>...</div>
}

// Client Component (only when needed)
'use client'
interface ChatWidgetProps {
  pageContext?: string
}
export function ChatWidget({ pageContext }: ChatWidgetProps) {
  // hooks, interactivity
}
```

### API Route Pattern

```typescript
export async function POST(request: Request) {
  try {
    const body = await request.json()
    // Validate with Zod schema
    const validated = schema.parse(body)
    // Business logic
    const result = await doWork(validated)
    return Response.json({ data: result })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json({ error: 'Validation failed' }, { status: 400 })
    }
    logger.error('POST /api/resource', error)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
```

### Import Order

```typescript
// 1. React/Next.js
import { useState } from 'react'
import { NextResponse } from 'next/server'

// 2. Third-party packages
import { z } from 'zod'

// 3. lib/ utilities
import { prisma } from '@/lib/db'
import { logger } from '@/lib/logger'

// 4. components/
import { Button } from '@/components/ui/button'

// 5. Types (if separate)
import type { Lead } from '@prisma/client'

// 6. Relative imports
import { helper } from './utils'
```

### API Response Format

```typescript
// Success
Response.json({ data: result })
Response.json({ data: items, total: 100, page: 1, pageSize: 20 })

// Error
Response.json({ error: 'Human-readable message' }, { status: 400 })
Response.json({ error: 'Internal server error' }, { status: 500 })

// Streaming (AI chat)
new Response(readableStream, {
  headers: {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
  },
})
```

---

## Consistency Rules

### Code Organization

- **Server Components by default.** Only add `'use client'` when the component needs hooks, event handlers, or browser APIs.
- **Components organized by domain** (`chat/`, `readiness/`, `leads/`), not by type.
- **Shared UI primitives** in `components/ui/` (shadcn/ui).
- **Business logic** in `lib/`, never in components or API routes directly.
- **One export per API route file** (Next.js convention: `GET`, `POST`, `PUT`, `DELETE`).

### Error Handling

- API routes: `try/catch` at the top level, return `{ error }` with appropriate HTTP status.
- AI chat failures: return graceful fallback message, log to Sentry, never expose API errors to user.
- Webhook failures: queue for retry, never block lead creation.
- Client errors: React Error Boundaries (`error.tsx`, `global-error.tsx`).
- Validation errors: Zod `.parse()` with `ZodError` catch returning 400.

### Logging Strategy

- Use `lib/logger.ts` for all server-side logging.
- Structured JSON to stdout (Coolify captures container logs).
- Log levels: `error` (failures), `warn` (degraded), `info` (business events), `debug` (development).
- Always log: lead creation, webhook attempts/results, AI API errors, auth events.
- Never log: PII in plain text at info/debug level, API keys, full conversation content at info level.

### Date/Time Handling

- Store as UTC in PostgreSQL (`DateTime` in Prisma = UTC).
- API responses: ISO 8601 strings (`2026-02-28T12:00:00.000Z`).
- Client display: format with `date-fns` in user's locale.
- Prisma: `@default(now())` for `createdAt`, `@updatedAt` for `updatedAt`.

---

## Data Architecture

### Core Models (PRD v2 — MVP)

```
Lead (central entity)
├── id, name, email, phone
├── leadSource (AI_ADVISOR | READINESS_SCORE | FORM | CALCULATOR)
├── segment (RESIDENTIAL | INVESTMENT | COMMERCIAL)
├── loanType (20 enum values)
├── qualification fields (creditRange, timeline, downPayment, etc.)
├── score (0-100), scoreCategory (hot/warm/cold), status
├── TCPA consent fields (consent, timestamp, IP)
├── UTM tracking fields
├── MaxBounty submission fields
├── → Conversation (1:1, optional — AI Advisor leads)
├── → ReadinessAssessment (1:1, optional — Score leads)
└── → Agent (M:1, optional — assigned agent)

Conversation
├── sessionId (unique, browser-generated)
├── status (ACTIVE | COMPLETED | ABANDONED)
├── extracted qualification data
├── → Messages[] (ordered by createdAt)
└── → Lead (1:1, created when contact info captured)

ReadinessAssessment
├── sessionId (unique, browser-generated)
├── responses (JSON — 10 question answers)
├── score breakdown (7 individual scores + total)
├── category (MORTGAGE_READY | ALMOST_THERE | GETTING_PREPARED | BUILDING_FOUNDATION)
├── completion/sharing status
└── → Lead (1:1, created when email captured)

Agent
├── name, email, phone, company
├── locations[], states[], loanTypes[], segments[]
├── weeklyCapacity, currentWeekLeads
├── status, performance metrics
└── → Lead[] (assigned leads)

Message
├── conversationId → Conversation
├── role (USER | ASSISTANT | SYSTEM)
└── content
```

### Post-MVP Models (CMS — Phase 4)

```
Article, Guide, Calculator
├── Standard content fields (title, slug, content, status)
├── → User (author)
├── → Category
├── → Tag[] (many-to-many)
├── → SeoMetadata (1:1)
└── → ContentVersion[]

Category (hierarchical)
├── segment (RESIDENTIAL | INVESTMENT | COMMERCIAL)
└── → parent/children (self-referential)

SeoMetadata, ContentVersion, GuideStep, Tag, User
```

### Schema Migration Strategy

The Prisma schema already contains both MVP models (Lead, Conversation, Message, ReadinessAssessment, Agent) and post-MVP CMS models (Article, Guide, Calculator, Category, Tag, SeoMetadata, ContentVersion). **Keep all models in schema.** CMS models are frozen until Phase 4 — no new development against them, but they don't hurt to have defined.

---

## API Contracts

### POST /api/chat — AI Advisor Message

**Request:**
```json
{
  "messages": [
    { "role": "user", "content": "I'm looking to buy my first home" }
  ],
  "sessionId": "clx1abc...",
  "pageUrl": "/residential"
}
```

**Response (SSE stream):**
```
data: {"content": "Hi! "}
data: {"content": "That's exciting! "}
data: {"content": "Tell me more about what you're looking for..."}
data: [DONE]
```

### GET /api/chat?sessionId=xxx — Conversation History

**Response:**
```json
{
  "messages": [
    { "role": "user", "content": "...", "createdAt": "2026-02-28T..." },
    { "role": "assistant", "content": "...", "createdAt": "2026-02-28T..." }
  ]
}
```

### POST /api/leads — Create Lead

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "555-0123",
  "segment": "RESIDENTIAL",
  "loanType": "PURCHASE",
  "leadSource": "AI_ADVISOR",
  "sessionId": "clx1abc...",
  "creditRange": "GOOD_670_739",
  "timeline": "ONE_TO_THREE_MONTHS",
  "propertyLocation": "Los Angeles, CA",
  "tcpaConsent": true,
  "consentTimestamp": "2026-02-28T12:00:00Z",
  "consentIp": "1.2.3.4",
  "utmSource": "google",
  "utmMedium": "cpc",
  "utmCampaign": "ca-mortgage"
}
```

**Response:**
```json
{
  "data": {
    "id": "clx2def...",
    "score": 78,
    "scoreCategory": "warm",
    "status": "NEW"
  }
}
```

### POST /api/readiness — Submit Readiness Assessment

**Request:**
```json
{
  "sessionId": "clx3ghi...",
  "email": "jane@example.com",
  "name": "Jane Smith",
  "responses": {
    "creditScore": "good",
    "employmentLength": "2_to_5",
    "annualIncome": "75k_100k",
    "monthlyDebt": "500_1000",
    "downPayment": "10_to_20",
    "preApproved": "no",
    "creditEvents": "none",
    "loanType": "conventional",
    "timeline": "1_to_3_months",
    "location": "San Diego, CA"
  },
  "totalScore": 72,
  "category": "ALMOST_THERE",
  "tcpaConsent": true,
  "consentTimestamp": "2026-02-28T12:00:00Z"
}
```

**Response:**
```json
{
  "data": {
    "assessmentId": "clx4jkl...",
    "leadId": "clx5mno...",
    "score": 72,
    "category": "ALMOST_THERE"
  }
}
```

### GET /api/admin/leads — Admin Lead List (authenticated)

**Query params:** `page`, `pageSize`, `status`, `source`, `scoreCategory`, `segment`, `search`, `dateFrom`, `dateTo`

**Response:**
```json
{
  "data": [ ],
  "total": 150,
  "page": 1,
  "pageSize": 20
}
```

### POST /api/webhooks/retry — Retry Failed Webhooks (cron)

**Response:**
```json
{
  "data": {
    "processed": 5,
    "successful": 3,
    "failed": 2
  }
}
```

---

## Security Architecture

### Authentication & Authorization

- **Admin-only authentication** via NextAuth.js credentials provider
- Session stored in HTTP-only cookies (JWT strategy)
- All `/admin/*` pages and `/api/admin/*` routes require authenticated session
- Role-based: ADMIN (full access), EDITOR (content only), PARTNER (future)
- Public routes: all visitor-facing pages, `/api/chat`, `/api/leads`, `/api/readiness`

### Input Validation

- All API inputs validated with Zod schemas before processing
- Prisma parameterized queries prevent SQL injection
- React escaping prevents XSS in rendered content
- File uploads disabled (text-only chat)

### Rate Limiting

- Global: 100 requests/minute per IP on all API routes
- AI chat: 10 requests/minute per IP (expensive DeepSeek calls)
- Lead submission: 5 requests/minute per IP (prevent spam)
- Implementation: in-memory sliding window in Next.js middleware
- When outgrown: swap to Redis-backed (Coolify can host Redis)

### Data Protection

- HTTPS everywhere via Coolify's Traefik proxy (auto-SSL with Let's Encrypt)
- Database encrypted at rest (PostgreSQL default with Coolify)
- API keys in environment variables (Coolify secrets management)
- TCPA consent logged with timestamp and IP address on every lead capture
- Lead PII accessible only through admin dashboard (authenticated)

### Compliance

- Equal Housing Opportunity disclaimer in footer
- "Not a lender" disclaimer on all pages
- Privacy policy page (required)
- Terms of service page (required)
- TCPA consent checkbox on all lead capture forms
- Cookie consent banner (if using tracking cookies beyond GA4)

---

## Performance Considerations

### Targets (from PRD NFRs)

| Metric | Target |
|--------|--------|
| LCP (Largest Contentful Paint) | < 2.5 seconds |
| AI response (streaming start) | < 2 seconds |
| Form submission response | < 1 second |
| Admin dashboard load | < 2 seconds |
| Core Web Vitals | All green |

### Strategies

- **Static generation** for loan type pages and California metro pages (build-time render)
- **Server Components** by default (zero client-side JS for static content)
- **Streaming SSE** for AI chat (perceived instant response)
- **Image optimization** via `next/image` + `sharp` (auto WebP/AVIF, lazy loading)
- **Code splitting** automatic via Next.js App Router
- **Database indexing** — Prisma schema includes indexes on: `email`, `status`, `score`, `segment`, `leadSource`, `createdAt`, `sessionId`
- **Connection pooling** — Prisma's built-in connection manager (sufficient for single-VPS)

---

## Deployment Architecture

### Coolify Setup

```
VPS (self-hosted)
├── Coolify (PaaS management)
│   ├── lendywendy-app (Next.js standalone container)
│   │   ├── Dockerfile (multi-stage build)
│   │   ├── Port: 3000 (internal)
│   │   └── Traefik proxy → lendywendy.com (HTTPS)
│   ├── lendywendy-db (PostgreSQL 17)
│   │   ├── Port: 5432 (internal only)
│   │   └── Automated backups via Coolify
│   └── (future: Redis, if needed for rate limiting/caching)
```

### Dockerfile (multi-stage)

```dockerfile
# Stage 1: Dependencies
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Stage 2: Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate
RUN npm run build

# Stage 3: Production
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
EXPOSE 3000
CMD ["node", "server.js"]
```

### next.config.ts Changes Required

```typescript
const nextConfig: NextConfig = {
  output: 'standalone',
}
```

### Environment Variables

```env
# Database (Coolify internal connection)
DATABASE_URL="postgresql://user:pass@lendywendy-db:5432/lendywendy"

# NextAuth
NEXTAUTH_URL="https://lendywendy.com"
NEXTAUTH_SECRET="<generated-secret>"

# DeepSeek AI
DEEPSEEK_API_KEY="<api-key>"
DEEPSEEK_BASE_URL="https://api.deepseek.com"

# Resend Email
RESEND_API_KEY="<api-key>"

# MaxBounty
MAXBOUNTY_WEBHOOK_URL="<webhook-url>"
MAXBOUNTY_AFFILIATE_ID="<affiliate-id>"

# Sentry
SENTRY_DSN="<dsn>"

# Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID="G-XXXXXXXXXX"
```

### Coolify Cron Jobs

| Job | Schedule | Endpoint | Purpose |
|-----|----------|----------|---------|
| Webhook retry | Every 5 minutes | `POST /api/webhooks/retry` | Retry failed MaxBounty submissions |
| Agent capacity reset | Weekly (Monday 00:00) | Custom script | Reset `currentWeekLeads` to 0 |

---

## Development Environment

### Prerequisites

- Node.js 20.x (LTS)
- Docker + Docker Compose (for local PostgreSQL)
- npm (package manager)

### Setup Commands

```bash
# Clone and install
git clone <repo>
cd lendywendy.com
npm install

# Start local PostgreSQL
docker compose up -d

# Set up environment
cp .env.example .env.local
# Edit .env.local with your values

# Run database migrations
npx prisma migrate dev

# Start development server
npm run dev
```

### Local docker-compose.yml

```yaml
services:
  db:
    image: postgres:17-alpine
    environment:
      POSTGRES_USER: lendywendy
      POSTGRES_PASSWORD: localdev
      POSTGRES_DB: lendywendy
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:
```

---

## Architecture Decision Records (ADRs)

### ADR-001: Self-Hosted Coolify over Vercel

**Decision:** Deploy on self-hosted Coolify instead of Vercel.
**Rationale:** Full control over infrastructure, no vendor lock-in, predictable costs at scale, ability to co-locate database on same VPS.
**Trade-offs:** Manual infrastructure management, no edge network (single region), need Docker expertise.
**Mitigations:** Coolify automates most DevOps tasks, Traefik handles SSL, Cloudflare CDN can be added for edge caching if needed.

### ADR-002: Direct DeepSeek Fetch over Vercel AI SDK

**Decision:** Use direct `fetch` to DeepSeek's OpenAI-compatible API with manual SSE parsing.
**Rationale:** No dependency on Vercel's `ai` package, DeepSeek API is OpenAI-compatible so direct fetch is straightforward, full control over streaming behavior.
**Trade-offs:** Manual SSE parsing code, no built-in React hooks for streaming.
**Mitigations:** Existing `lib/ai/deepseek.ts` already implements streaming with `streamChatMessage()` async generator.

### ADR-003: In-Memory Rate Limiting over Redis

**Decision:** Use in-memory sliding window for rate limiting instead of Redis or Upstash.
**Rationale:** Single-instance deployment on Coolify means in-memory state is consistent. No need for external service at projected 10K daily visitors.
**Trade-offs:** Rate limit state lost on restart, doesn't scale to multi-instance.
**Mitigations:** Restart impact is negligible (rate limits reset). If multi-instance needed later, swap to Redis (Coolify can host it).

### ADR-004: DB-Based Webhook Retry over Message Queue

**Decision:** Use the existing Lead table's `maxBountySubmitted` field as a retry queue, with a cron endpoint to process failures.
**Rationale:** Already implemented in `lib/integrations/maxbounty.ts` with `retryFailedSubmissions()`. Simple, debuggable, no additional infrastructure.
**Trade-offs:** Polling-based (every 5 min) not event-driven, limited to webhook retries.
**Mitigations:** 5-minute delay acceptable for webhook retries. If real-time processing needed later, add BullMQ with Redis.

### ADR-005: Resend over SendGrid for Email

**Decision:** Use Resend for transactional email.
**Rationale:** Modern API, react-email for type-safe templates that match the React codebase, generous free tier (100/day, scaling to 50K/month on paid).
**Trade-offs:** Newer service with smaller ecosystem than SendGrid.
**Mitigations:** Simple SMTP fallback possible, email volume is low for lead-gen site.

### ADR-006: Keep CMS Models in Schema (Frozen)

**Decision:** Retain Article, Guide, Calculator, Category, Tag, SeoMetadata, and ContentVersion models in Prisma schema but defer all development to Phase 4.
**Rationale:** Models are already defined and deployed. Removing them requires a destructive migration. They cause no harm sitting unused.
**Trade-offs:** Schema is larger than needed for MVP, could confuse agents.
**Mitigations:** Architecture document clearly labels post-MVP components. Epic mapping shows E7 as post-MVP.

### ADR-007: Vitest over Jest for Testing

**Decision:** Use Vitest with React Testing Library for tests.
**Rationale:** ESM-native (matches Next.js), faster than Jest, compatible Jest API (low learning curve), built-in TypeScript support.
**Trade-offs:** Smaller ecosystem than Jest, though rapidly growing.
**Mitigations:** Jest-compatible API means most resources/examples still apply.

---

_Generated by BMAD Decision Architecture Workflow v2.0_
_Date: 2026-02-28_
_For: BMad_
