# Epic Technical Specification: AI Mortgage Advisor

Date: 2026-03-01
Author: BMad
Epic ID: 2
Status: Draft

---

## Overview

Epic 2 transforms the existing non-streaming AI chat into a production-grade conversational lead qualification engine. The brownfield codebase already contains a working ChatWidget, DeepSeek API client with streaming helpers (`streamChatMessage()` async generator), system prompt with "Wendy" persona, contextual greetings, contact form detection, Prisma models (Conversation, Message, Lead), and a functioning `/api/chat` POST handler — but it currently uses `stream: false`. This epic upgrades the API to SSE streaming, rebuilds the ChatWidget to render tokens in real-time, adds React Context for cross-page session persistence, integrates the lead creation pipeline with qualification data extraction, and adds comprehensive error handling with Sentry integration and user-friendly fallbacks.

This epic depends on Epic 1 (Foundation) which is complete: rate limiting (10/min on `/api/chat`), Sentry error tracking, GA4 analytics, Vitest testing infrastructure, and Docker deployment are all in place.

## Objectives and Scope

**In Scope:**

- Upgrade `app/api/chat/route.ts` POST handler from `stream: false` to SSE streaming with `ReadableStream`
- Pipe `streamChatMessage()` async generator into SSE format (`data: {"content": "token"}\n\n`)
- Buffer full response during streaming for fire-and-forget DB persistence
- Rebuild `ChatWidget.tsx` to consume SSE stream and render tokens incrementally (typing effect)
- Add mobile-responsive behavior: floating panel on desktop, full-screen overlay on mobile
- Create `ChatProvider` React Context for cross-page message persistence
- Store `sessionId` in `sessionStorage`, optionally hydrate from GET `/api/chat` on mount
- Add inline contact form triggered by AI keyword detection (existing logic)
- On contact submission: call `extractQualificationData()`, create Lead linked to Conversation
- Fire `chat_started` and `chat_lead_captured` GA4 events
- Add error handling: DeepSeek failure fallback, 429 rate limit message, 15-second client timeout
- Log errors to Sentry with conversation context
- Prevent empty/whitespace message submission

**Out of Scope:**

- Readiness Score integration (Epic 3)
- Email notifications on lead creation (Epic 6)
- MaxBounty webhook submission (Epic 6)
- Agent routing and assignment (Epic 6)
- Admin lead dashboard (Epic 5)
- Chat history beyond current session (session closes on tab close — by design)
- Voice/audio input
- File/image uploads (text only per PRD)

## System Architecture Alignment

This epic maps to the Architecture v2.0 decision table:

| Architecture Decision | This Epic's Implementation |
|----------------------|---------------------------|
| AI Provider: DeepSeek API (OpenAI-compatible) | Story 2.1 (upgrade to streaming) |
| AI Streaming: Direct fetch + SSE (ReadableStream) | Stories 2.1, 2.2 |
| Rate Limiting: In-memory sliding window (ADR-003) | Already implemented in E1 (10/min on /api/chat) |
| Error Tracking: Sentry | Story 2.5 (chat-specific error logging) |
| Analytics: GA4 | Stories 2.2, 2.4 (chat_started, chat_lead_captured events) |
| Forms: React Hook Form + Zod | Story 2.4 (lead capture form validation) |

Pattern 1 (Conversational Lead Qualification) from the architecture document is fully implemented by this epic.

---

## Detailed Design

### Services and Modules

| Module | Responsibility | Story | Status |
|--------|---------------|-------|--------|
| `app/api/chat/route.ts` | POST: SSE streaming chat; GET: conversation history | 2.1 | Modify |
| `components/chat/ChatWidget.tsx` | Floating chat UI with streaming token render | 2.2 | Modify |
| `components/chat/ChatProvider.tsx` | React Context for cross-page message/session state | 2.3 | Create |
| `lib/ai/deepseek.ts` | DeepSeek client — `streamChatMessage()`, `extractQualificationData()` | 2.1 | No change |
| `lib/ai/system-prompt.ts` | Wendy persona, contextual greetings | 2.2 | No change |
| `lib/analytics.ts` | `trackEvent()` for chat_started, chat_lead_captured | 2.2, 2.4 | No change |
| `app/layout.tsx` | Mount ChatProvider wrapping ChatWidget | 2.3 | Modify |

### Data Models and Contracts

All required models already exist in `prisma/schema.prisma`. No schema changes needed.

**Conversation Model** (existing):
```
Conversation {
  id              String @id @default(cuid())
  leadId          String? @unique
  lead            Lead?
  sessionId       String @unique
  messages        Message[]
  loanType        LoanType?
  propertyType    PropertyType?
  location        String?
  timeline        Timeline?
  creditRange     CreditRange?
  status          ConversationStatus @default(ACTIVE)
  leadCaptured    Boolean @default(false)
  pageUrl         String?
  createdAt       DateTime
  updatedAt       DateTime
}
```

**Message Model** (existing):
```
Message {
  id              String @id @default(cuid())
  conversationId  String
  conversation    Conversation
  role            MessageRole (USER | ASSISTANT | SYSTEM)
  content         String @db.Text
  createdAt       DateTime
}
```

**Lead Model** (existing, relevant fields for chat-to-lead):
```
Lead {
  id, name, email, phone
  leadSource        LeadSource (AI_ADVISOR)
  segment, loanType
  creditRange, timeline, propertyLocation
  score, scoreCategory, status
  tcpaConsent, consentTimestamp, consentIp
  utmSource, utmMedium, utmCampaign
  conversation      Conversation? (1:1 via Conversation.leadId)
}
```

### APIs and Interfaces

**POST /api/chat — Streaming Chat (Story 2.1)**

Request:
```json
{
  "messages": [{ "role": "user", "content": "..." }],
  "sessionId": "chat_1709...",
  "pageUrl": "/residential"
}
```

Response (SSE stream):
```
Content-Type: text/event-stream
Cache-Control: no-cache
Connection: keep-alive

data: {"content":"Hi! "}

data: {"content":"That's exciting! "}

data: {"content":"Tell me more..."}

data: [DONE]
```

Error response (non-streaming JSON):
```json
{ "error": "Failed to process chat message", "fallback": "I'm having a moment! You can also get help at /get-quote" }
```

**GET /api/chat?sessionId=xxx — Conversation History (unchanged)**

Response:
```json
{
  "messages": [
    { "role": "user", "content": "...", "createdAt": "2026-03-01T..." },
    { "role": "assistant", "content": "...", "createdAt": "2026-03-01T..." }
  ]
}
```

**POST /api/leads — Create Lead from Chat (Story 2.4)**

Request (from ChatWidget contact form):
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "555-0123",
  "leadSource": "AI_ADVISOR",
  "sessionId": "chat_1709...",
  "segment": "RESIDENTIAL",
  "loanType": "PURCHASE",
  "creditRange": "GOOD_670_739",
  "timeline": "ONE_TO_THREE_MONTHS",
  "propertyLocation": "Los Angeles, CA",
  "tcpaConsent": true,
  "consentTimestamp": "2026-03-01T12:00:00Z"
}
```

### Workflows and Sequencing

**Chat Message Flow (Story 2.1 + 2.2):**
```
1. User types message → ChatWidget validates non-empty
2. ChatWidget adds user message to context state (optimistic)
3. ChatWidget POST /api/chat with messages[], sessionId, pageUrl
4. API route validates input, calls streamChatMessage(messages)
5. streamChatMessage() → DeepSeek API with stream:true → async generator yields tokens
6. API pipes tokens into ReadableStream as SSE: data: {"content":"token"}\n\n
7. ChatWidget reads stream via fetch() + ReadableStream reader
8. Each token appended to streaming message in state (typing effect)
9. On stream end (data: [DONE]), finalize message in state
10. API (fire-and-forget): persist user + assistant messages to DB
```

**Chat-to-Lead Conversion Flow (Story 2.4):**
```
1. AI response mentions contact keywords → showContactForm = true
2. User fills inline form: name, email, phone, TCPA checkbox
3. ChatWidget calls extractQualificationData(messages) (secondary AI call)
4. POST /api/leads with contact info + extracted qualification data + sessionId
5. API creates Lead record, links to Conversation via sessionId
6. Updates Conversation: leadCaptured = true, qualification fields
7. Confirmation message rendered in chat
8. GA4 event: chat_lead_captured fired
```

**Session Persistence Flow (Story 2.3):**
```
1. ChatProvider mounts → check sessionStorage for existing sessionId
2. If found → set in context, optionally GET /api/chat to hydrate history
3. If not found → generate new sessionId on first message, store in sessionStorage
4. User navigates pages → ChatProvider persists in layout, messages in context state
5. Tab close → sessionStorage cleared → fresh start on next visit
```

---

## Non-Functional Requirements

### Performance

| Metric | Target | Story | How Measured |
|--------|--------|-------|-------------|
| SSE first token latency | < 2 seconds | 2.1 | Time from POST to first `data:` event |
| Token render interval | Smooth (no jank) | 2.2 | Visual inspection, no layout shifts |
| Chat widget open time | < 100ms | 2.2 | Interaction to visual (CSS transition) |
| Message history load (GET) | < 500ms | 2.3 | Network timing |
| Lead creation response | < 1 second | 2.4 | POST /api/leads timing |
| Bundle size impact | < 5KB gzipped for ChatProvider | 2.3 | Build analysis |

### Security

| Concern | Mitigation | Story |
|---------|-----------|-------|
| Prompt injection | System prompt boundaries, DeepSeek doesn't execute code | 2.1 |
| Rate limiting abuse | 10 req/min per IP on /api/chat (Epic 1) | — |
| XSS in chat messages | React escaping renders all content as text | 2.2 |
| TCPA compliance | Consent checkbox required before lead submission, timestamp + IP logged | 2.4 |
| PII in logs | Never log conversation content at info level | 2.5 |
| DeepSeek API key | Server-side only, never exposed to client | 2.1 |

### Reliability/Availability

- **DeepSeek API failure**: Return graceful fallback message directing to `/get-quote` form. Log to Sentry. Never show raw API errors to users.
- **429 rate limit**: Show "I'm getting a lot of questions right now. Please try again in a minute!" — no Sentry alert (expected behavior).
- **Stream interruption**: Client-side 15-second timeout. On timeout, show partial response (if any) + fallback message.
- **DB persistence failure**: Fire-and-forget — if DB write fails, conversation continues (user experience unaffected). Error logged.
- **Session loss (tab close)**: By design — fresh start. Previous conversation retained in DB for admin review.

### Observability

| Signal | Source | What It Tracks | Story |
|--------|--------|---------------|-------|
| Chat errors | Sentry | DeepSeek API failures, stream errors, timeout | 2.5 |
| Chat events | GA4 | chat_started, chat_lead_captured | 2.2, 2.4 |
| Conversation data | PostgreSQL | Full message history per session | 2.1 |
| API latency | Sentry Performance | POST /api/chat timing, DB write timing | 2.5 |
| Lead creation | PostgreSQL | Lead records with source=AI_ADVISOR | 2.4 |

---

## Dependencies and Integrations

### NPM Dependencies (no new packages needed)

| Package | Version | Type | Used By |
|---------|---------|------|---------|
| `next` | 16.1.6 | prod | SSE Response, ReadableStream |
| `@prisma/client` | 6.19.0 | prod | Conversation, Message, Lead models |
| `react` | 19.x | prod | ChatWidget, ChatProvider context |
| `lucide-react` | 0.552 | prod | Chat UI icons (existing) |
| `zod` | 4.1 | prod | Input validation (Story 2.4) |
| `@sentry/nextjs` | latest | prod | Error logging (Story 2.5) |

### External Services

| Service | Story | Auth | Environment Variables |
|---------|-------|------|----------------------|
| DeepSeek API | 2.1 | Bearer token | `DEEPSEEK_API_KEY`, `DEEPSEEK_BASE_URL` |
| Sentry (cloud) | 2.5 | DSN | `SENTRY_DSN` |
| GA4 | 2.2, 2.4 | Public measurement ID | `NEXT_PUBLIC_GA_MEASUREMENT_ID` |

### Internal Dependencies (from Epic 1)

| Dependency | Status | Used By |
|-----------|--------|---------|
| Rate limiting (`lib/rate-limit.ts`) | Done (E1.3) | /api/chat at 10/min |
| Sentry integration | Done (E1.4) | Error capture in 2.5 |
| GA4 analytics (`lib/analytics.ts`) | Done (E1.5) | Events in 2.2, 2.4 |
| Vitest infrastructure | Done (E1.6) | Tests for streaming logic |

---

## Acceptance Criteria (Authoritative)

1. **AC-2.1a**: POST `/api/chat` returns `Content-Type: text/event-stream` with SSE-formatted token chunks
2. **AC-2.1b**: Each SSE chunk is formatted as `data: {"content": "token"}\n\n`
3. **AC-2.1c**: Stream ends with `data: [DONE]\n\n`
4. **AC-2.1d**: After streaming completes, user message + full assistant response persisted to DB (fire-and-forget)
5. **AC-2.1e**: GET `/api/chat?sessionId=xxx` returns conversation history (unchanged behavior)
6. **AC-2.1f**: If DeepSeek API fails, response is non-streaming JSON with fallback message
7. **AC-2.2a**: Chat widget opens/closes on bubble click, persists across pages
8. **AC-2.2b**: AI responses render token-by-token (typing effect) during streaming
9. **AC-2.2c**: Widget works on desktop (floating panel, bottom-right) and mobile (full-screen overlay)
10. **AC-2.2d**: `chat_started` GA4 event fires when user sends first message in session
11. **AC-2.3a**: `sessionId` generated on first interaction and stored in `sessionStorage`
12. **AC-2.3b**: Message history maintained in React Context (survives page navigation)
13. **AC-2.3c**: Browser tab close clears session — fresh start on next visit
14. **AC-2.3d**: On mount with existing sessionId, optionally hydrate messages from GET API
15. **AC-2.4a**: Inline contact form appears when AI mentions contact keywords
16. **AC-2.4b**: Contact form submission calls `extractQualificationData()` then POST `/api/leads`
17. **AC-2.4c**: Lead created with `leadSource: AI_ADVISOR` and linked to Conversation
18. **AC-2.4d**: Confirmation message appears in chat after lead creation
19. **AC-2.4e**: `chat_lead_captured` GA4 event fires on successful lead submission
20. **AC-2.5a**: DeepSeek failure shows friendly fallback with link to `/get-quote`
21. **AC-2.5b**: Rate limit (429) shows "try again in a minute" message
22. **AC-2.5c**: 15-second client timeout on API call
23. **AC-2.5d**: Errors logged to Sentry with sessionId context
24. **AC-2.5e**: Empty/whitespace messages cannot be sent
25. **AC-2.5f**: Typing indicator shows during AI response, disappears on error

---

## Traceability Mapping

| AC | Source Requirement | Component(s) | Test Approach |
|----|-------------------|--------------|---------------|
| AC-2.1a | Architecture → SSE streaming | `app/api/chat/route.ts` | Integration: verify Content-Type header |
| AC-2.1b | Architecture → SSE format | `app/api/chat/route.ts` | Unit: parse SSE chunks from stream |
| AC-2.1c | Architecture → stream end | `app/api/chat/route.ts` | Unit: verify [DONE] sentinel |
| AC-2.1d | PRD FR-1.2 → conversation persistence | `app/api/chat/route.ts` | Integration: verify DB records after POST |
| AC-2.1e | Backward compat | `app/api/chat/route.ts` | Integration: GET still returns history |
| AC-2.1f | Architecture → fallback | `app/api/chat/route.ts` | Unit: mock DeepSeek error, verify fallback |
| AC-2.2a | PRD FR-1.1 → floating widget | `ChatWidget.tsx` | Manual: click bubble, verify open/close |
| AC-2.2b | PRD FR-1.1 → typing indicators | `ChatWidget.tsx` | Manual: observe token-by-token render |
| AC-2.2c | PRD FR-1.1 → mobile + desktop | `ChatWidget.tsx` | Manual: test at mobile/desktop breakpoints |
| AC-2.2d | GA4 events | `ChatWidget.tsx`, `lib/analytics.ts` | Manual: verify in GA4 debug view |
| AC-2.3a | Architecture → sessionStorage | `ChatProvider.tsx` | Unit: verify sessionStorage set on first message |
| AC-2.3b | PRD FR-1.1 → persist across pages | `ChatProvider.tsx` | Manual: navigate, verify messages retained |
| AC-2.3c | Architecture → tab close reset | `ChatProvider.tsx` | Manual: close tab, reopen, verify fresh |
| AC-2.3d | Architecture → hydrate history | `ChatProvider.tsx` | Integration: mock GET, verify hydration |
| AC-2.4a | PRD FR-1.3 → contact form trigger | `ChatWidget.tsx` | Unit: test keyword detection |
| AC-2.4b | PRD FR-1.3 → qualification extraction | `ChatWidget.tsx`, `lib/ai/deepseek.ts` | Integration: mock AI, verify extract call |
| AC-2.4c | PRD FR-1.3 → lead creation | `app/api/leads/route.ts` | Integration: POST, verify Lead + Conversation link |
| AC-2.4d | PRD FR-1.3 → confirmation | `ChatWidget.tsx` | Manual: submit form, verify message |
| AC-2.4e | GA4 events | `ChatWidget.tsx`, `lib/analytics.ts` | Manual: verify in GA4 debug view |
| AC-2.5a | PRD FR-1.4 → fallback | `ChatWidget.tsx` | Unit: mock 500, verify fallback message |
| AC-2.5b | PRD FR-1.4 → rate limit UX | `ChatWidget.tsx` | Unit: mock 429, verify message |
| AC-2.5c | PRD FR-1.4 → timeout | `ChatWidget.tsx` | Unit: mock slow response, verify timeout |
| AC-2.5d | Architecture → Sentry | `ChatWidget.tsx`, `app/api/chat/route.ts` | Integration: verify Sentry capture call |
| AC-2.5e | PRD FR-1.1 → input validation | `ChatWidget.tsx` | Unit: empty input, verify send disabled |
| AC-2.5f | PRD FR-1.1 → typing indicators | `ChatWidget.tsx` | Manual: verify indicator appears/disappears |

---

## Risks, Assumptions, Open Questions

| # | Type | Description | Mitigation / Next Step |
|---|------|-------------|----------------------|
| 1 | **Assumption** | DeepSeek API maintains OpenAI-compatible SSE format | Existing `streamChatMessage()` already handles this format; tested in current codebase |
| 2 | **Risk** | DeepSeek API latency spikes could make chat feel sluggish | 15-second client timeout + fallback message; monitor via Sentry Performance |
| 3 | **Risk** | `extractQualificationData()` makes a secondary AI call — adds latency to lead creation | Run extraction async (don't block confirmation message); update Conversation later |
| 4 | **Assumption** | Existing `/api/leads` POST handler accepts the fields needed from chat-to-lead conversion | Verify Lead creation endpoint handles `sessionId` → Conversation linking |
| 5 | **Risk** | SSE streaming through Coolify's Traefik proxy may buffer chunks | Configure Traefik to disable buffering for SSE routes (`X-Accel-Buffering: no` header) |
| 6 | **Assumption** | `sessionStorage` is sufficient for session tracking (no cross-tab persistence needed) | PRD confirms: tab close = fresh start. No localStorage needed. |
| 7 | **Risk** | Mobile full-screen overlay may conflict with iOS Safari bottom bar | Test on iOS Safari; use `100dvh` for dynamic viewport height |
| 8 | **Question** | Should the ChatProvider hydrate from GET API on mount (adds load time) or start fresh? | Hydrate only if sessionId exists in sessionStorage — optional optimization |

---

## Test Strategy Summary

### Test Levels

| Level | Framework | Scope | Stories |
|-------|-----------|-------|---------|
| Unit tests | Vitest | SSE stream parsing, keyword detection, input validation, ChatProvider state | 2.1, 2.2, 2.4, 2.5 |
| Integration tests | Vitest + mocked fetch | API route POST streaming, DB persistence, lead creation flow | 2.1, 2.4 |
| Manual smoke tests | Browser | Full chat flow, mobile responsive, streaming UX, error handling | All |

### Testing Priorities

1. **SSE streaming API** — Unit test: verify stream format, [DONE] sentinel, fallback on error
2. **Contact keyword detection** — Unit test: existing keywords trigger form
3. **Input validation** — Unit test: empty/whitespace blocked
4. **ChatProvider context** — Unit test: sessionId generation, message persistence
5. **Lead creation from chat** — Integration test: verify Lead ↔ Conversation link
6. **Error handling** — Unit test: 429/500/timeout produce correct user messages

### Coverage Goals

- `app/api/chat/route.ts`: 70%+ (streaming logic, error paths)
- `components/chat/ChatProvider.tsx`: 80%+ (state management, session handling)
- `components/chat/ChatWidget.tsx`: 50%+ (interaction logic; UI rendering tested manually)

### Test File Locations

Tests co-located with source:
- `app/api/chat/route.test.ts`
- `components/chat/ChatProvider.test.tsx`
- `components/chat/ChatWidget.test.tsx`
