# Story 8.3: Compliance Pages and Disclaimers

Status: done

## Story

As a **site operator**,
I want all legal compliance requirements met before launch,
So that the site operates within regulatory guidelines.

## Acceptance Criteria

1. **AC-1**: `/privacy-policy` page exists with privacy policy content
2. **AC-2**: `/terms` page exists with terms of service content
3. **AC-3**: Footer includes: Equal Housing Opportunity, "not a lender" disclaimer, Privacy/Terms links, copyright
4. **AC-4**: TCPA consent language present on all lead capture points (chat, readiness, get-quote)
5. **AC-5**: Consent timestamp and IP logged with every lead

## Tasks / Subtasks

- [x] Task 1: Created `app/privacy-policy/page.tsx` with 11-section privacy policy (CCPA/CPRA, TCPA, cookies, data security)
- [x] Task 2: Created `app/terms/page.tsx` with 13-section terms (AI disclaimer, compensation disclosure, Equal Housing)
- [x] Task 3: Updated footer link `/privacy` → `/privacy-policy` and get-quote disclosure link
- [x] Task 4: Added TCPA consent checkbox to multi-step-lead-form on step 4, disabled submit until checked, sends tcpaConsent + consentTimestamp
- [x] Task 5: Strengthened TCPA text in chat widget + added Privacy Policy link
- [x] Task 6: Verified all 3 lead capture paths: chat (has TCPA ✅), readiness (has TCPA ✅), get-quote (now has TCPA ✅)

## Dev Notes

### Existing State
- Footer already has Equal Housing Opportunity + "not a lender" disclaimer ✅
- Readiness assessment already has TCPA consent checkbox with proper text ✅
- Chat widget has TCPA checkbox but text could be stronger ✅
- Multi-step lead form is MISSING TCPA consent entirely ✗
- Lead API already accepts tcpaConsent + consentTimestamp + consentIp ✅

## Change Log

| Change | Date | Description |
|--------|------|-------------|
| Created | 2026-03-02 | Initial story draft |
| Completed | 2026-03-02 | All compliance pages and TCPA consent added |

## Dev Agent Record
### Agent Model Used
Claude Opus 4.6

### Completion Notes
**Completed:** 2026-03-02
**Definition of Done:** All ACs met — privacy-policy and terms pages created, TCPA consent on all 3 lead capture points, footer links updated, 94 tests passing, build succeeds.

### File List
- `app/privacy-policy/page.tsx` — NEW: 11-section privacy policy page
- `app/terms/page.tsx` — NEW: 13-section terms of service page
- `components/layout/footer.tsx` — MODIFIED: `/privacy` → `/privacy-policy`
- `components/leads/multi-step-lead-form.tsx` — MODIFIED: Added tcpaConsent state, checkbox on step 4, consent data in API call
- `components/chat/ChatWidget.tsx` — MODIFIED: Strengthened TCPA consent text, added Privacy Policy link
- `app/get-quote/page.tsx` — MODIFIED: Updated disclosure Privacy Policy link
