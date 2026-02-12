# Lendywendy.com - Product Requirements Document v2

**Author:** BMad
**Date:** 2026-01-08
**Version:** 2.0
**Strategy:** AI-First Lead Engagement

---

## Executive Summary

Lendywendy.com is a mortgage lead generation platform that differentiates through **AI-powered engagement** and **hyper-local matching**. Unlike traditional mortgage comparison sites that rely on static content and tedious forms, Lendywendy captures and qualifies leads through conversational AI and gamified assessments.

**Core Value Proposition:**
- **AI Mortgage Advisor** - Conversational chatbot that qualifies leads naturally
- **Mortgage Readiness Score** - Gamified assessment that engages and qualifies
- **Hyper-Local Matching** - Connect borrowers with LOCAL mortgage professionals
- **Full-Spectrum Coverage** - All loan types (residential, commercial, investment, non-QM)

**Business Model:** Lead generation with MaxBounty affiliate commissions + direct lead sales to local agents.

**Launch Market:** California metros, expanding nationally based on performance.

---

## What Makes This Special

**The Magic Moment:**

A confused borrower lands on Lendywendy. Instead of facing a wall of text and a 15-field form, they're greeted by an AI advisor that asks simple questions in natural conversation:

*"Hi! Looking for a mortgage? Tell me a bit about what you're trying to do..."*

Within 2 minutes of chatting, the visitor has:
1. Explained their situation in their own words
2. Received their Mortgage Readiness Score (gamified, shareable)
3. Been matched with a LOCAL mortgage professional who specializes in their exact need

**No forms. No confusion. Just conversation.**

This is the opposite of LendingTree's experience - and that's the point.

---

## Project Classification

**Technical Type:** Web Application (AI-Powered Lead Generation)
**Domain:** Fintech-Adjacent (Mortgage Content & Leads - not transaction processing)
**Complexity:** Medium-High (AI integration, real-time chat, lead scoring, webhooks)

---

## Success Criteria

### Primary Success Metrics

**1. AI Engagement**
- AI Advisor conversation start rate: 30%+ of visitors
- Conversation completion rate: 60%+ (start → lead captured)
- Average conversation length: 4-6 exchanges
- User satisfaction: Positive sentiment in 80%+ of conversations

**2. Readiness Score Engagement**
- Assessment start rate: 25%+ of visitors
- Assessment completion rate: 70%+
- Email capture rate: 50%+ of completions
- Social share rate: 10%+ of completions

**3. Lead Generation**
- Monthly lead volume: 500+ by month 3, 2000+ by month 6
- Lead quality score: 70+ average (on 100-point scale)
- Cost per lead: <$20 (vs $50-150 paid acquisition)
- Visitor-to-lead conversion: 8%+ (vs industry 2-3%)

**4. Revenue**
- Average revenue per lead: $75 (blended across segments)
- Monthly revenue target: $50K by month 6
- MaxBounty conversion rate: 15%+
- Direct agent lead sale rate: 30%+

**5. Geographic Performance**
- California lead volume: 80%+ of total initially
- Local agent match rate: 90%+ within 24 hours
- Agent response rate: 70%+ within 4 hours

---

## Traffic Acquisition Strategy

**Approach: Hybrid (Paid Ads + Targeted SEO Content)**

### Phase 1: Paid Traffic (Launch - Month 3)

**Google Ads**
- Target California mortgage keywords
- Focus on high-intent terms: "mortgage lenders near me", "home loans [city]", "DSCR loans California"
- Landing pages optimized for ad traffic (AI Advisor prominent)
- Budget: Start $50-100/day, scale based on CPA
- Goal: Test conversion rates, gather data for optimization

**Facebook/Instagram Ads**
- Target demographics: First-time homebuyers (25-40), Real estate investors, California residents
- Creative: Mortgage Readiness Score as hook ("Are you mortgage ready? Find out in 60 seconds")
- Retargeting: Visitors who didn't convert
- Budget: $30-50/day initially

**Expected Paid Traffic Metrics:**
- CPC: $5-15 (mortgage is competitive)
- CTR: 2-4%
- Conversion rate: 8-12% (with AI engagement)
- Target CPA: $20-40 per lead

### Phase 2: Organic SEO (Ongoing)

**Landing Page SEO**
- Optimize loan type pages for "[loan type] California"
- Optimize metro pages for "mortgage lenders [city]"
- Local SEO: Google Business Profile for each metro
- Target 20-30 strategic keywords (not 200+ articles)

**Targeted Content (20-30 Articles)**
- Focus on topics the AI Advisor references
- Long-tail keywords with lower competition
- Content types:
  - "How to get a [loan type] in California"
  - "[City] mortgage market guide 2026"
  - "DSCR loans explained for investors"
  - FAQ content (feeds AI knowledge base)
- Quality over quantity - each article optimized for conversion

**Link Building (Light Touch)**
- Local business directories (California focus)
- Real estate partner cross-links
- Guest posts on mortgage/real estate blogs (opportunistic)

### Phase 3: Viral/Referral (Month 3+)

**Readiness Score Viral Loop**
- Shareable score cards encourage social sharing
- "I got 85% mortgage ready! Check your score"
- Referral program: "Share with a friend, both get priority matching"

**Agent Referrals**
- Agents who receive good leads refer other agents
- Agents share with clients who aren't ready yet → Readiness Score

**Expected Traffic Mix at Month 6:**
- Paid: 50%
- Organic: 30%
- Referral/Social: 20%

---

## Product Scope

### MVP - Must Have for Launch

**1. AI Mortgage Advisor (Primary Lead Capture)**
- Conversational chatbot powered by DeepSeek API
- Natural language understanding of borrower intent
- Progressive information gathering through conversation
- Loan type detection (residential, commercial, investment, refi, non-QM)
- Location capture for local matching
- Contact info collection at natural conversation point
- Handoff to human/form for complex scenarios
- Mobile-optimized chat interface

**2. Mortgage Readiness Score (Secondary Lead Capture)**
- Interactive 8-10 question assessment
- Categories: Credit health, Income stability, Savings/down payment, Debt burden
- Real-time score calculation (0-100)
- Score breakdown with improvement tips
- Email capture for full results
- Shareable score card (social proof + viral potential)
- Segment into Hot/Warm/Cold leads based on score

**3. Landing Pages (SEO Foundation)**
- Homepage with dual CTA (Chat with Advisor / Check Your Score)
- Loan type pages:
  - /residential/ (FHA, VA, Conventional, USDA)
  - /commercial/ (office, retail, industrial, multi-family)
  - /investment/ (DSCR, hard money, fix-and-flip, rental)
  - /non-qm/ (bank statement, asset-based, foreign national)
  - /refinance/ (rate-and-term, cash-out, streamline)
- California metro pages (LA, SF, San Diego, Sacramento, San Jose, OC)
- Each page has AI Advisor widget + Readiness Score CTA

**4. Lead Management System**
- Lead database with all conversation/assessment data
- Lead scoring algorithm (0-100 based on qualification signals)
- Lead status workflow (New → Contacted → Qualified → Closed/Lost)
- Admin dashboard for lead management
- Export to CSV for manual processing

**5. Affiliate/Webhook Integration**
- MaxBounty webhook for lead submission
- Direct email notification to local agents
- Lead routing based on:
  - Loan type
  - Geographic location
  - Lead score
  - Agent capacity

**6. Core Infrastructure**
- Next.js application with App Router
- PostgreSQL database (Neon/Supabase)
- DeepSeek API integration
- Vercel deployment
- Basic authentication for admin
- Mobile-responsive design
- SSL/HTTPS

### Post-MVP Features (Growth Phase)

**Phase 2: Enhanced Engagement**
- Mortgage calculators (payment, affordability, refinance savings)
- Rate comparison widget (API integration with rate feeds)
- Saved progress / return visitor recognition
- Email nurture sequences for not-ready leads
- SMS notifications for hot leads

**Phase 3: Local Network**
- Lender/agent directory with profiles
- Agent ratings and reviews
- Agent dashboard for lead management
- Two-way messaging between leads and agents
- Performance-based lead routing

**Phase 4: Content Authority**
- Blog/content hub for SEO
- Educational guides by loan type
- Video content integration
- FAQ knowledge base (feeds AI Advisor)

### Out of Scope for MVP

- User accounts / borrower dashboard
- Direct lender rate API integration
- Loan application processing
- Document upload / pre-approval
- Mobile native app
- Multi-language support
- Payment processing

---

## Functional Requirements

### FR-1: AI Mortgage Advisor

**FR-1.1: Chat Interface**
- Floating chat widget on all pages (bottom-right)
- Full-screen chat option on mobile
- Typing indicators during AI response
- Message history within session
- Quick reply buttons for common responses
- File/image upload disabled (text only)

**FR-1.2: Conversation Flow**
- Greeting based on page context (loan type if on specific page)
- Open-ended initial question ("What brings you here today?")
- Follow-up questions based on responses:
  - Loan purpose (purchase, refinance, cash-out)
  - Property type (single-family, multi-family, commercial)
  - Location (state, city, zip)
  - Timeline (immediate, 1-3 months, 3-6 months, just researching)
  - Credit estimate (excellent, good, fair, poor, unsure)
  - Down payment situation
  - Employment/income type
- Natural language understanding (not rigid decision tree)
- Handle off-topic gracefully, redirect to mortgage topics

**FR-1.3: Lead Capture**
- Request contact info after qualifying questions answered
- Explain value exchange ("To match you with local experts...")
- Capture: Name, Email, Phone (phone optional but encouraged)
- TCPA consent checkbox integrated into flow
- Confirmation message with next steps
- Fallback to form if chat abandoned mid-conversation

**FR-1.4: AI Configuration**
- DeepSeek API integration with streaming responses
- System prompt defining persona, knowledge, and boundaries
- Temperature/creativity settings optimized for helpfulness
- Context window management for long conversations
- Fallback responses for API failures
- Rate limiting per user (prevent abuse)

**Acceptance Criteria:**
- Conversation feels natural, not robotic
- 80%+ of users who start chatting provide contact info
- Average response time <2 seconds
- Handles edge cases gracefully (gibberish, off-topic, rude)
- Works on mobile and desktop

---

### FR-2: Mortgage Readiness Score

**FR-2.1: Assessment Flow**
- CTA button "Check Your Mortgage Readiness Score"
- Step-by-step questions (one per screen on mobile)
- Progress indicator (Step X of 10)
- Questions:
  1. What's your credit score range? (Excellent 740+, Good 670-739, Fair 580-669, Poor <580, Unsure)
  2. How long at current job? (<1 year, 1-2 years, 2-5 years, 5+ years, Self-employed)
  3. Annual household income range? (Ranges)
  4. Current monthly debt payments? (Ranges)
  5. Savings for down payment? (Ranges or % of target home price)
  6. Have you been pre-approved? (Yes, No, Started process)
  7. Any recent major credit events? (Bankruptcy, foreclosure, none)
  8. What type of loan are you considering? (Conventional, FHA, VA, etc.)
  9. When are you looking to buy/refinance? (Timeline)
  10. Where are you looking? (State/City)

**FR-2.2: Score Calculation**
- Weighted algorithm:
  - Credit score: 25 points
  - Employment stability: 15 points
  - Income adequacy: 15 points
  - Debt-to-income: 15 points
  - Down payment: 15 points
  - Pre-approval status: 10 points
  - No negative credit events: 5 points
- Score categories:
  - 80-100: "Mortgage Ready!" (Hot lead)
  - 60-79: "Almost There" (Warm lead)
  - 40-59: "Getting Prepared" (Nurture)
  - 0-39: "Building Foundation" (Long-term nurture)

**FR-2.3: Results Display**
- Animated score reveal (gamification)
- Score breakdown by category with color indicators
- Personalized tips to improve score
- Email gate for full detailed report
- Social share buttons (Twitter, Facebook, LinkedIn)
- CTA: "Get Matched with a Local Expert"

**FR-2.4: Lead Capture**
- Email required to see detailed breakdown
- Optional: Phone number for "priority matching"
- TCPA consent checkbox
- Create lead record with all assessment data

**Acceptance Criteria:**
- Assessment completes in <3 minutes
- Score feels accurate and actionable
- 70%+ completion rate once started
- 50%+ email capture rate
- Score shareable generates social engagement

---

### FR-3: Landing Pages

**FR-3.1: Homepage**
- Hero section with value proposition
- Dual CTA: "Chat with AI Advisor" | "Check Your Score"
- Trust signals (security badges, testimonials if available)
- Loan type navigation (cards for each segment)
- How it works (3-step process)
- California focus messaging
- Footer with disclaimers, links

**FR-3.2: Loan Type Pages**
- Unique page for each loan category
- Page content:
  - What is [loan type]?
  - Who qualifies?
  - Key benefits
  - Common questions (FAQ schema)
- AI Advisor widget pre-prompted for loan type
- Readiness Score CTA
- Related loan types (cross-linking)

**FR-3.3: Location Pages (California Metros)**
- /california/los-angeles/
- /california/san-francisco/
- /california/san-diego/
- /california/sacramento/
- /california/san-jose/
- /california/orange-county/
- Content: Local market insights, local lender network, city-specific tips
- AI Advisor with location context
- Local agent matching emphasis

**FR-3.4: SEO Elements**
- Meta title/description per page
- Open Graph tags for social sharing
- JSON-LD schema (LocalBusiness, FAQPage)
- Canonical URLs
- Mobile-responsive design
- Core Web Vitals optimized

**Acceptance Criteria:**
- All pages load in <2.5 seconds
- Mobile-friendly (passes Google test)
- Schema validates without errors
- Clear conversion path on every page

---

### FR-4: Lead Management

**FR-4.1: Lead Database**
- Lead model fields:
  - ID, created_at, updated_at
  - Source (ai_advisor, readiness_score, form)
  - Contact: name, email, phone
  - Qualification: loan_type, property_type, location, timeline, credit_range, down_payment
  - Score (0-100)
  - Score_category (hot, warm, cold)
  - Status (new, contacted, qualified, closed_won, closed_lost)
  - Assigned_agent
  - Conversation_transcript (for AI leads)
  - Assessment_responses (for Score leads)
  - UTM parameters
  - Consent_timestamp, consent_ip

**FR-4.2: Admin Dashboard**
- Lead list with sortable columns
- Filters: source, score_category, status, loan_type, location, date_range
- Search by name, email, phone
- Lead detail view with all data
- Status update dropdown
- Assign to agent dropdown
- Notes field for admin comments
- Bulk export to CSV

**FR-4.3: Lead Scoring**
- Automatic scoring on lead creation
- Factors:
  - Source: AI Advisor completion +20, Readiness Score +15, Form +10
  - Loan type: Commercial +15, Investment +10, Residential +5
  - Timeline: Immediate +20, 1-3 months +15, 3-6 months +10
  - Credit: Excellent +15, Good +10, Fair +5
  - Down payment: 20%+ = +10, 10-20% = +5
  - Pre-approval: Yes +10
  - Location match (California): +5
- Score displayed with lead
- Sort/filter by score

**Acceptance Criteria:**
- Dashboard loads in <2 seconds
- All filters work correctly
- Lead detail shows complete history
- Export generates valid CSV

---

### FR-5: Integrations

**FR-5.1: MaxBounty Webhook**
- Webhook endpoint configuration
- Lead data mapping to MaxBounty format
- Automatic submission on lead creation
- Retry logic for failed submissions
- Submission status tracking
- Commission tracking (future)

**FR-5.2: Email Notifications**
- Lead confirmation to borrower
- New lead alert to admin
- New lead alert to matched agent (if assigned)
- Email service: SendGrid or Resend
- Templates: HTML, mobile-responsive
- Unsubscribe handling

**FR-5.3: Local Agent Routing**
- Agent database: name, email, phone, location, loan_types, capacity
- Matching algorithm:
  - Location match (required)
  - Loan type match (required)
  - Capacity available (not exceeded weekly cap)
  - Round-robin within qualified agents
- Lead assignment recorded
- Agent notification sent

**Acceptance Criteria:**
- MaxBounty receives leads within 60 seconds
- Emails delivered within 60 seconds
- Agent matching is accurate 95%+ of time
- Failed webhooks retry automatically

---

## Non-Functional Requirements

### NFR-1: Performance

- Page load: <2.5 seconds (LCP)
- AI response: <2 seconds (streaming start)
- Form submission: <1 second
- Dashboard load: <2 seconds
- Core Web Vitals: All green
- Mobile performance: Equivalent to desktop

---

### NFR-2: Security

- HTTPS everywhere (TLS 1.3)
- Input validation on all forms
- SQL injection prevention (Prisma parameterized queries)
- XSS protection (React escaping + CSP headers)
- Rate limiting (100 req/min per IP on API routes)
- Lead data encrypted at rest
- API keys secured in environment variables
- Admin authentication required

---

### NFR-3: Compliance

- TCPA consent on all lead capture
- Privacy policy page
- Terms of service page
- Equal Housing Opportunity disclaimer
- "Not a lender" disclaimer
- Cookie consent (if using tracking cookies)
- Lead consent logged with timestamp and IP

---

### NFR-4: Scalability

- Handle 10,000 daily visitors
- Handle 500 concurrent AI conversations
- Handle 1,000 leads/day
- Database query optimization
- CDN for static assets
- Serverless functions scale automatically (Vercel)

---

### NFR-5: Monitoring

- Error tracking (Sentry)
- Uptime monitoring
- AI API usage tracking
- Lead conversion funnel analytics
- Performance monitoring (Vercel Analytics)

---

## Technical Architecture Summary

| Component | Technology |
|-----------|------------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Database | PostgreSQL (Neon or Supabase) |
| ORM | Prisma |
| AI | DeepSeek API |
| Styling | Tailwind CSS + shadcn/ui |
| Auth | NextAuth.js (admin only for MVP) |
| Email | SendGrid or Resend |
| Hosting | Vercel |
| Analytics | Google Analytics 4 + Vercel Analytics |
| Error Tracking | Sentry |

---

## Epic Overview

**Epic 1: Foundation & Infrastructure**
- Project setup, database, auth, deployment, core UI components

**Epic 2: AI Mortgage Advisor**
- Chat interface, DeepSeek integration, conversation flow, lead capture

**Epic 3: Mortgage Readiness Score**
- Assessment UI, scoring algorithm, results display, email capture, social sharing

**Epic 4: Landing Pages & SEO**
- Homepage, loan type pages, California metro pages, SEO optimization

**Epic 5: Lead Management & Admin**
- Database schema, admin dashboard, scoring, status workflow, CSV export

**Epic 6: Integrations & Routing**
- MaxBounty webhook, email notifications, local agent routing

**Epic 7: Content & SEO**
- 20-30 targeted articles, blog structure, FAQ content, AI knowledge base

**Epic 8: Polish, Compliance & Launch**
- Mobile optimization, accessibility, compliance disclaimers, monitoring, testing

---

## References

- Product Brief: `docs/product-brief-Lendywendy-2026-01-08.md`
- Previous PRD (content-focused): `docs/PRD.md`
- Previous Architecture: `docs/architecture.md`

---

## Next Steps

1. **Architecture Document** - Define detailed technical architecture
2. **Epic Breakdown** - Create detailed stories for each epic
3. **Begin Implementation** - Start with Epic 1 (Foundation)

---

_This PRD captures the AI-first vision for Lendywendy.com - where leads come from conversation and engagement, not forms and content walls._

_Created through collaborative discovery on 2026-01-08._
