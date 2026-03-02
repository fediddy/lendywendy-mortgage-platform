# Technical Specification — Epic 4: Landing Pages & SEO

**Author:** Claude Opus 4.6
**Date:** 2026-03-02
**Epic:** E4 — Landing Pages & SEO
**Type:** Brownfield Upgrade (substantial existing code)

---

## Overview

Epic 4 integrates the AI Advisor and Readiness Score into the homepage with dual CTAs, adds contextual chat to loan pages, enhances California metro pages with AI context, and performs an SEO optimization pass across all pages.

## Existing Code Inventory

| Component | File | Status | Notes |
|-----------|------|--------|-------|
| Homepage | `app/page.tsx` | **Needs Upgrade** | 653 lines, investor-focused, no AI/readiness CTAs |
| Loan Type Hubs | `app/residential/page.tsx`, etc. | **Needs Upgrade** | 3 hub pages, no chat context or readiness CTA |
| Loan Product Pages | `app/residential/*/page.tsx`, etc. | **Needs Upgrade** | 17 product pages, no FAQ schema, no readiness CTA |
| California Metro Pages | `app/california/[city]/page.tsx` | **Needs Upgrade** | Dynamic, no AI context, has basic LocalBusiness schema |
| StructuredData | `components/seo/StructuredData.tsx` | **Complete** | 874 lines, comprehensive schema.org |
| Sitemap | `app/sitemap.ts` | **Complete** | 275+ lines, all routes covered |
| Robots.txt | `app/robots.ts` | **Complete** | Proper allow/disallow rules |
| Breadcrumbs | `components/seo/breadcrumbs.tsx` | **Complete** | Visual + JSON-LD |
| Meta Tags | `components/seo/meta-tags.tsx` | **Complete** | Helper functions |
| ChatWidget | `components/chat/ChatWidget.tsx` | **Complete** | Global in layout.tsx |
| UX Mockup | `docs/ux-redesign-mockup.html` | **Reference** | 1460 lines, design direction |

## Story Gap Analysis

### Story 4.1: Homepage Redesign
- **Existing:** Full homepage with hero, rate calculator, loan products, testimonials, California markets, stats, compliance
- **Gaps:** No "Chat with AI Advisor" CTA, no "Check Your Readiness Score" CTA, no "How it works" 3-step section, hero focuses only on investor rates
- **Approach:** Add dual CTA buttons to hero, add "How it works" section, keep existing loan product sections
- **Estimate:** Small-medium upgrade

### Story 4.2: Loan Type Page Integration
- **Existing:** 17 loan product pages + 3 hub pages, ChatWidget global via layout
- **Gaps:** No readiness CTA on loan pages, no contextual chat greeting, no FAQ schema markup, no shared layout component
- **Approach:** Create `ReadinessCTA` component, add FAQ JSON-LD to loan pages that have FAQ content
- **Estimate:** Medium upgrade

### Story 4.3: California Metro Pages Enhancement
- **Existing:** Dynamic city pages with generateStaticParams, city hero, FAQ, loan links
- **Gaps:** No AI Advisor context (city awareness), no readiness CTA
- **Approach:** Pass city context to ChatWidget, add readiness CTA section
- **Estimate:** Small upgrade

### Story 4.4: SEO Optimization Pass
- **Existing:** Comprehensive StructuredData, sitemap, robots, breadcrumbs, meta-tags helpers, OG images
- **Gaps:** Need audit of all pages for missing/duplicate meta, validate JSON-LD, ensure all pages use metadata export
- **Approach:** Audit + fix, mostly verification with targeted fixes
- **Estimate:** Small audit + fixes

## Architecture Decisions

1. **Shared CTA component:** Create `ReadinessCTA` to reuse on loan and metro pages (single source of truth for the readiness score CTA)
2. **Chat context:** ChatProvider already wraps the app — add optional `pageContext` data attribute for contextual greetings
3. **FAQ schema:** Add FAQPage JSON-LD to loan pages that have FAQ content, using existing StructuredData patterns
4. **Homepage stays client component:** Current homepage uses useState for calculator — keep as client component, just add CTA section
