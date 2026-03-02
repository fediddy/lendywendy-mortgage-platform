# Epic 8: Polish, Compliance & Launch — Technical Specification

## Gap Analysis

### Story 8.1: Mobile Optimization
**What already works:**
- ChatWidget has `isMobile` detection → full-screen overlay on mobile (100dvh) ✅
- MobileCTA component exists with `md:hidden`, hides on form pages ✅
- Header has responsive mobile menu with hamburger toggle ✅
- Layout has `pb-20 md:pb-0` for MobileCTA clearance ✅
- Chat input uses `fontSize: 16` on mobile (prevents iOS zoom) ✅

**Gaps to fix:**
- Mobile hamburger button missing `aria-label`
- Chat quick-reply bubbles may be too small — need min-height 44px tap targets
- Chat toggle button `bottom-6 right-6` — overlaps MobileCTA on mobile (both fixed bottom)
- Multi-step form radio buttons use sr-only inputs with visual labels — verify 44px tap targets
- Get-quote benefit pills may wrap poorly at 375px
- Footer grid at 375px — verify single column works

### Story 8.2: Accessibility Audit
**What already works:**
- Chat toggle button has `aria-label` ✅
- Chat mobile close button has `aria-label` ✅
- Color contrast: teal-600 on white background meets 4.5:1 ✅

**Gaps to fix:**
- Header mobile menu button missing `aria-label`
- Multi-step form: `<label>` elements not connected to inputs via `htmlFor`/`id` (uses react-hook-form `register`)
- Chat resize buttons missing `aria-label`
- Readiness assessment: check for `prefers-reduced-motion` on score reveal animation
- MobileCTA link needs descriptive `aria-label`
- Add keyboard support for Escape to close chat widget
- Focus trap in chat when open on mobile
- Form error messages need `aria-describedby` links

### Story 8.3: Compliance Pages and Disclaimers
**What already works:**
- Footer has Equal Housing Opportunity text + "not a lender" disclaimer ✅
- Footer has Privacy/Terms links (to `/privacy` and `/terms`) ✅
- Chat widget has TCPA consent checkbox ✅
- Readiness assessment has TCPA consent checkbox with proper text ✅
- Lead API accepts `tcpaConsent`, `consentTimestamp`, `consentIp` ✅
- API stores `consentIp` from request headers ✅

**Gaps to fix:**
- `/privacy` page does not exist (404)
- `/terms` page does not exist (404)
- Multi-step lead form (`/get-quote`) is MISSING TCPA consent entirely
- Multi-step form does not send `tcpaConsent`, `consentTimestamp` to API
- Chat widget TCPA text is vague ("I agree to be contacted about mortgage options") — should include "phone, email, or text" and Privacy Policy link
- Footer should link to `/privacy-policy` per convention (update link from `/privacy`)

### Story 8.4: Performance Optimization
**What already works:**
- Using `next/font/google` for Inter (no render-blocking font load) ✅
- Server Components used for layout, pages ✅
- Client components isolated: ChatWidget, MobileCTA, Header, ReadinessAssessment, MultiStepLeadForm ✅

**Gaps to audit:**
- Check images use `next/image` with proper sizing
- Review bundle size / client JS payload
- Verify GA4 and Sentry scripts don't block rendering
- Check for unused dependencies

### Story 8.5: Launch Monitoring Setup
**What already works:**
- Sentry configured (Story 1.4) ✅
- Google Analytics 4 configured (Story 1.5) ✅
- Coolify deployment configured (Story 1.1) ✅

**Gaps to fix:**
- Verify Sentry source maps in production build
- Create runbook document
- Verify Coolify health checks
- Confirm database backup schedule

## Implementation Order
Stories 8.1 → 8.2 → 8.3 → 8.4 → 8.5 (sequential, each builds on previous)

## Key Files
- `components/layout/header.tsx` — Mobile menu, hamburger button
- `components/layout/footer.tsx` — Disclaimers, links
- `components/layout/mobile-cta.tsx` — Mobile CTA bar
- `components/chat/ChatWidget.tsx` — Chat mobile overlay, TCPA consent
- `components/leads/multi-step-lead-form.tsx` — Get-quote form (missing TCPA)
- `components/readiness/ReadinessAssessment.tsx` — Score assessment
- `app/layout.tsx` — Root layout, structured data
- `app/get-quote/page.tsx` — Quote page
- `app/readiness-score/page.tsx` — Readiness page
