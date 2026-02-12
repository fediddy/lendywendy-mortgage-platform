# Product Brief: Lendywendy.com

**Date:** 2026-01-08
**Author:** BMad
**Context:** Brand Pivot / Business Website

---

## Executive Summary

**Lendywendy.com** is a mortgage lead generation website that transforms a former personal brand into a high-converting affiliate business.

**The Opportunity:** The mortgage lead gen space is dominated by impersonal national players. Lendywendy.com differentiates through hyper-local focus (connecting borrowers with LOCAL lenders) and full-spectrum lending coverage (residential, commercial, investment, non-QM - not just conventional mortgages).

**The Hook:** An AI Mortgage Advisor provides conversational lead qualification, while a gamified Mortgage Readiness Score engages visitors and captures leads at all stages of the buying journey.

**The Model:** Revenue through MaxBounty affiliate commissions and direct lead sales to local mortgage agents/brokers.

**Launch Focus:** California metros with geo-targeted landing pages, expanding nationally based on performance.

**Tech Stack:** Next.js, PostgreSQL, DeepSeek AI, deployed on Vercel/VPS

---

## Core Vision

### Problem Statement

The original Lendywendy.com was a personal mortgage website for Wendy. Due to her employment with Chase, the personal website needed to be removed. The opportunity exists to pivot the existing brand and domain into a standalone mortgage/lending brand that operates independently of any individual.

### Proposed Solution

Transform Lendywendy.com into a high-converting mortgage lead generation website that:
- Captures qualified borrower leads through valuable tools and content
- Monetizes through affiliate partnerships and lead sales to mortgage lenders/brokers
- Operates as a brand (not tied to any individual employee)

**Business Model:** Lead generation with commission/affiliate revenue

### Key Differentiators

**Core Positioning:**
1. **Hyper-Local Focus** - "Find YOUR local mortgage experts" - geo-targeted landing pages, local loan officer profiles, community-focused vs faceless national banks. Local agents pay premium for LOCAL leads.

2. **Full-Spectrum Lending Hub** - Cover ALL loan types where competitors specialize:
   - Residential (conventional, FHA, VA, USDA)
   - Commercial (office, retail, industrial, multi-family)
   - Investment (DSCR, hard money, fix-and-flip, rental)
   - Non-QM (bank statement, asset-based, foreign national)
   - Refinance (rate-and-term, cash-out, streamline)

**Engagement Hooks:**
3. **Mortgage Readiness Score** - Gamified assessment that scores users on credit, income, savings, debt. Creates urgency, qualifies leads (hot vs cold), captures emails from not-ready visitors.

4. **AI Mortgage Advisor** - Conversational AI that asks questions naturally instead of tedious forms. Feels like talking to a knowledgeable friend. Personalized recommendations, not just "here's 5 lenders."

**Competitive Advantage:** Combines local relevance + full loan coverage + modern engagement - a combination no major competitor offers.

---

## Target Users

### Primary Users

**Full-Spectrum Borrower Coverage** (All segments from launch):

| Segment | Volume | Lead Value | Competition | Priority |
|---------|--------|------------|-------------|----------|
| First-time homebuyers | Very High | $50-150 | Very High | Volume driver |
| Refinancers | High | $50-150 | High | Rate-sensitive |
| Investment property buyers | Medium | $150-300+ | Medium | High-value |
| Commercial borrowers | Low | $500+ | Low | Premium niche |
| Non-QM borrowers | Medium | $150-300 | Low-Medium | Underserved |

**User Personas:**

1. **The First-Timer** - Nervous, needs education, shops around, price-sensitive
2. **The Refinancer** - Rate-focused, knows the process, wants speed
3. **The Investor** - Numbers-driven, wants DSCR/hard money options, experienced
4. **The Business Owner** - Needs commercial financing, complex deals, relationship-focused
5. **The Non-Traditional** - Self-employed, bank statement income, foreign national, needs non-QM solutions

**Strategy:** Build pages for ALL segments. Let market data reveal which convert best, then double down.

---

## MVP Scope

### Core Features

**MVP - Must Have for Launch:**

1. **Homepage** - Brand intro, value proposition, clear CTA paths to loan types
2. **AI Mortgage Advisor** - Conversational chatbot that qualifies leads naturally, captures info progressively
3. **Mortgage Readiness Score** - Interactive gamified assessment (credit, income, savings, debt) with email capture
4. **Loan Type Landing Pages** - SEO-optimized pages for each category:
   - Residential (FHA, VA, Conventional, USDA)
   - Commercial (office, retail, industrial, multi-family)
   - Investment (DSCR, hard money, fix-and-flip, rental)
   - Non-QM (bank statement, asset-based, foreign national)
   - Refinance (rate-and-term, cash-out, streamline)
5. **Geo-Targeted Location Pages** - City/metro landing pages for local SEO and local agent matching
6. **Lead Capture System** - Multiple entry points, progressive profiling, smart forms
7. **Lead Management Backend** - Store leads, score quality (hot/warm/cold), route to appropriate buyers
8. **Affiliate/CRM Integration** - MaxBounty webhook integration, direct lead delivery to local agents

### Out of Scope for MVP

- Mortgage calculators (payment, affordability, refinance)
- Lender directory with profiles/reviews
- Blog/content marketing hub
- User accounts/dashboard
- Live rate comparison tool
- Mobile app

---

## Technical Preferences

**Tech Stack:**
- **Framework:** Next.js (React) - SSR/SSG for SEO, App Router
- **Styling:** Tailwind CSS + Shadcn/UI components
- **Database:** PostgreSQL (Neon or Supabase)
- **ORM:** Prisma or Drizzle
- **AI Integration:** DeepSeek API for chatbot/advisor
- **Deployment:** Vercel (primary) or VPS (fallback)
- **Analytics:** Google Analytics + lead tracking

**Key Integrations:**
- MaxBounty affiliate webhook
- Email service (SendGrid/Resend) for lead notifications
- DeepSeek API for AI Mortgage Advisor

---

## Geographic Focus

**Launch Market:** California
- Build geo-targeted pages for major California metros:
  - Los Angeles, San Francisco, San Diego, Sacramento, San Jose
  - Orange County, Inland Empire, Bay Area suburbs
- Establish local agent relationships in CA first
- Expand to other states post-launch based on performance

---

## Success Metrics

**Lead Generation KPIs:**
- Monthly lead volume (by segment)
- Lead quality score distribution
- Conversion rate: visitor → lead
- Cost per lead (if running paid traffic)

**Revenue KPIs:**
- Revenue per lead (MaxBounty + direct sales)
- Monthly affiliate commission
- Direct lead sale revenue

**Engagement KPIs:**
- Mortgage Readiness Score completions
- AI Advisor conversation starts → lead captures
- Page engagement by loan type

---

## Next Steps

1. **PRD Workflow** - Create detailed product requirements from this brief
2. **Architecture** - Design technical architecture and database schema
3. **Epic/Story Creation** - Break down into implementable development tasks
4. **Development** - Build the MVP

---

_This Product Brief captures the vision and requirements for Lendywendy.com._

_Created through collaborative discovery on 2026-01-08._

_Next: Use the PRD workflow to create detailed product requirements from this brief._
