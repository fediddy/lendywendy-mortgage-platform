# Story 6.3: Agent Routing Algorithm

Status: done

## Story

As a **site operator**,
I want leads automatically matched with the best available local agent,
So that leads get quick, relevant responses.

## Acceptance Criteria

1. **AC-1**: Qualified leads (score >= 60) are auto-matched with agents
2. **AC-2**: Matching based on: location (state), loan type, capacity
3. **AC-3**: Round-robin within qualified agents (lowest currentWeekLeads first)
4. **AC-4**: Lead assigned with assignedAgentId + assignedAt
5. **AC-5**: If no match found, lead remains unassigned

## Tasks / Subtasks

- [x] Task 1: Created `lib/agent-routing.ts` with `findBestAgent()` and `assignLeadToAgent()`
- [x] Task 2: Fixed Prisma field comparison — fetch candidates then filter capacity in JS
- [x] Task 3: Added 5 tests (score threshold, state/loan matching, capacity filter, no match, assignment)
- [x] Task 4: Updated `matchAndNotifyAgent()` in email.ts to delegate to new routing module

## Dev Notes

### Bug in existing code
`prisma.agent.fields.weeklyCapacity` is not valid Prisma syntax. Prisma doesn't support comparing a field to another field in `where` clauses. Need to use `$queryRaw` or fetch all active agents and filter in JS.

## Change Log

| Change | Date | Description |
|--------|------|-------------|
| Created | 2026-03-02 | Initial story draft |
| Implemented | 2026-03-02 | Extracted routing to lib/agent-routing.ts, fixed Prisma bug |

## Dev Agent Record
### Agent Model Used
Claude Opus 4.6

### Completion Notes
**Completed:** 2026-03-02
**Definition of Done:** All ACs met, 94 tests passing, build succeeds

### File List
- `lib/agent-routing.ts` — NEW: findBestAgent + assignLeadToAgent with fixed capacity check
- `lib/agent-routing.test.ts` — NEW: 5 tests
- `lib/integrations/email.ts` — MODIFIED: matchAndNotifyAgent delegates to agent-routing
