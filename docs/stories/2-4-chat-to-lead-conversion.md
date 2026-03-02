# Story 2.4: Chat-to-Lead Conversion

Status: done

## Story

As a **visitor**,
I want the AI advisor to naturally offer to connect me with a local expert after qualifying me,
so that I can get personalized mortgage assistance.

## Acceptance Criteria

1. **AC-1**: Inline contact form appears when AI mentions contact keywords (existing behavior, verify)
2. **AC-2**: Contact form submission calls `extractQualificationData()` then POST `/api/leads` with qualification data
3. **AC-3**: Lead created with `leadSource: AI_ADVISOR` and linked to Conversation via sessionId
4. **AC-4**: Confirmation message appears in chat after lead creation
5. **AC-5**: `chat_lead_captured` GA4 event fires on successful lead submission

## Tasks / Subtasks

- [x] Task 1: Upgrade leads API to accept chat-lead submissions (AC: #2, #3)
  - [x] Add `sessionId`, `leadSource`, `tcpaConsent`, `consentTimestamp` to leads API Zod schema
  - [x] When `sessionId` is provided, find Conversation record and link Lead to it via `leadId`
  - [x] Update Conversation: set `leadCaptured = true` and populate qualification fields
  - [x] Handle case where Conversation doesn't exist (create lead without link, log warning)
- [x] Task 2: Add TCPA checkbox to inline contact form (AC: #2)
  - [x] Add `tcpaConsent` boolean to contact form state in ChatWidget
  - [x] Render TCPA checkbox with required compliance text
  - [x] Disable submit button until TCPA is checked
- [x] Task 3: Integrate extractQualificationData into contact form submission (AC: #2, #3)
  - [x] On form submit, call `extractQualificationData(messages)` from `lib/ai/deepseek.ts`
  - [x] Map extracted data to proper Prisma enum values (Segment, LoanType, CreditRange, Timeline)
  - [x] POST to `/api/leads` with contact info + extracted qualification + sessionId + TCPA consent
  - [x] Handle extraction failure gracefully (submit lead with defaults `RESIDENTIAL`/`PURCHASE`)
- [x] Task 4: Fire chat_lead_captured GA4 event (AC: #5)
  - [x] On successful lead submission, call `trackEvent({ event: 'chat_lead_captured', sessionId })`
- [x] Task 5: Write tests (AC: #2, #3, #5)
  - [x] Integration test: leads API creates lead with valid data
  - [x] Integration test: leads API accepts sessionId and links Lead to Conversation
  - [x] Integration test: leads API handles missing Conversation gracefully
  - [x] Integration test: leads API accepts TCPA and consent timestamp fields
  - [x] Integration test: leads API accepts leadSource field
  - [x] Unit test: leads API returns 400 for missing required fields

## Dev Notes

### Architecture and Constraints

- **extractQualificationData()** already exists in `lib/ai/deepseek.ts`: Makes a secondary AI call to parse qualification data from conversation. Returns `{ loanType, propertyType, location, timeline, creditRange, hasContactInfo }`. String values need mapping to Prisma enums. [Source: docs/tech-spec-epic-2.md#Detailed-Design]
- **Leads API schema gap**: Current Zod schema requires `segment` and `loanType` (both non-optional) but doesn't accept `sessionId`, `leadSource`, `tcpaConsent`, or `consentTimestamp`. These need adding. [Source: app/api/leads/route.ts]
- **Enum mapping**: `extractQualificationData` returns strings like "PURCHASE", "GOOD", "1-3_MONTHS" that need mapping to Prisma enum values like `LoanType.PURCHASE`, `CreditRange.GOOD_670_739`, `Timeline.ONE_TO_THREE_MONTHS`. Create a mapping utility. [Source: prisma/schema.prisma]
- **Conversation linking**: Conversation model has `leadId` (unique, optional FK to Lead) and `leadCaptured` boolean. On lead creation with sessionId, find the Conversation, update its `leadId` and `leadCaptured`. [Source: prisma/schema.prisma]
- **Contact form already exists**: ChatWidget already has an inline contact form with name/email/phone fields and keyword detection. The current submission sends incorrect schema to `/api/leads`. Story 2.4 fixes this to use proper schema with qualification data. [Source: components/chat/ChatWidget.tsx]
- **GA4 event type ready**: `chat_lead_captured` with `{ sessionId }` already defined in `lib/analytics.ts` GAEvent union type. [Source: lib/analytics.ts]

### Testing Standards

- Tests co-located: leads API integration tests in `app/api/leads/route.test.ts` (new)
- ChatWidget TCPA checkbox test can be added to `components/chat/ChatWidget.test.tsx`
- Mock `extractQualificationData` and `prisma` for isolated tests

### Project Structure Notes

- Modified file: `app/api/leads/route.ts` — add sessionId, TCPA, Conversation linking
- Modified file: `components/chat/ChatWidget.tsx` — TCPA checkbox, extractQualificationData call, proper schema
- New test file or augmented tests for leads API and ChatWidget

### Learnings from Previous Story

**From Story 2-3-chat-session-persistence (Status: done)**

- **ChatProvider owns session state**: `sessionId`, `messages`, `isLoading`, `sendMessage` all live in ChatProvider. ChatWidget consumes via `useChatContext()`.
- **Contact form stays in ChatWidget**: Contact form state (`showContactForm`, `contactForm`, `contactSubmitted`, `isSubmittingContact`) are UI concerns that stay in ChatWidget.
- **sessionId available via context**: `useChatContext().sessionId` gives access to the sessionId for the leads API submission.
- **messages available via context**: `useChatContext().messages` provides the full conversation history for `extractQualificationData()`.
- **50 tests passing**: 8 ChatProvider + 9 ChatWidget + 12 API chat + 11 lead-scoring + 10 readiness.

[Source: docs/stories/2-3-chat-session-persistence.md#Dev-Agent-Record]

### References

- [Source: docs/tech-spec-epic-2.md#Detailed-Design] — Chat-to-Lead conversion flow
- [Source: docs/tech-spec-epic-2.md#Acceptance-Criteria] — AC-2.4a through AC-2.4e
- [Source: docs/tech-spec-epic-2.md#Workflows-and-Sequencing] — Lead conversion steps 1-8
- [Source: docs/tech-spec-epic-2.md#Security-Considerations] — TCPA compliance
- [Source: docs/epics.md#Epic-2] — Story 2.4 definition and technical notes
- [Source: docs/stories/2-3-chat-session-persistence.md] — ChatProvider context architecture

## Change Log

| Change | Date | Description |
|--------|------|-------------|
| Created | 2026-03-02 | Initial story draft |
| Implemented | 2026-03-02 | Leads API upgrade, TCPA checkbox, qualification extraction, GA4 event, 6 tests |

## Dev Agent Record

### Context Reference

### Agent Model Used

Claude Opus 4.6

### Debug Log References

- `sessionId` and `consentTimestamp` are separated from `validatedData` before `prisma.lead.create` since they aren't Lead model fields
- `linkLeadToConversation` is fire-and-forget (async, non-blocking) — lead creation succeeds even if conversation linking fails
- Enum mapping functions (`mapSegment`, `mapLoanType`, `mapCreditRange`, `mapTimeline`) use string matching with fallbacks to handle fuzzy AI extraction output
- `extractQualificationData` failure is caught silently — lead is created with defaults `RESIDENTIAL`/`PURCHASE`
- TCPA consent checkbox must be checked for form submission — both client-side validation and `disabled` attribute on button

### Completion Notes

**Completed:** 2026-03-02
**Definition of Done:** All acceptance criteria met, 56 tests passing (6 new), build succeeds

### Completion Notes List

- Upgraded leads API Zod schema: added `sessionId`, `leadSource` (LeadSource enum), `tcpaConsent`, `consentTimestamp`
- Added `linkLeadToConversation()` helper: finds Conversation by sessionId, updates `leadId`, `leadCaptured = true`, populates qualification fields
- Handles missing Conversation gracefully — logs warning, lead still created
- TCPA checkbox added to ChatWidget inline contact form with compliance text
- Submit button disabled until TCPA checkbox is checked
- `handleContactSubmit` now calls `extractQualificationData(messages)` before API call
- Four enum mapping functions convert AI extraction strings to Prisma enum values
- Extraction failure falls back to `RESIDENTIAL`/`PURCHASE` defaults
- `chat_lead_captured` GA4 event fired on successful lead submission
- Contact form now sends proper schema: `name` (not firstName/lastName), `segment`, `loanType`, `creditRange`, `timeline`, `propertyLocation`, `sessionId`, `tcpaConsent`, `consentTimestamp`
- 6 new integration tests for leads API, all 56 tests passing, build passes

### File List

- `app/api/leads/route.ts` — MODIFIED: added sessionId, leadSource, tcpaConsent, consentTimestamp to schema; linkLeadToConversation helper
- `app/api/leads/route.test.ts` — NEW: 6 integration tests
- `components/chat/ChatWidget.tsx` — MODIFIED: TCPA checkbox, extractQualificationData call, enum mapping, proper lead schema, GA4 event
