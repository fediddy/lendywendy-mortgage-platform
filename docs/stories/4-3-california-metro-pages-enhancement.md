# Story 4.3: California Metro Pages Enhancement

Status: done

## Story

As a **visitor searching for local mortgage help**,
I want California metro pages with local market context and AI advisor with location awareness,
So that I feel confident I'm getting help specific to my area.

## Acceptance Criteria

1. **AC-1**: Metro pages show local market context and messaging (already existing)
2. **AC-2**: Readiness Score CTA on metro pages
3. **AC-3**: JSON-LD LocalBusiness schema present (already existing via StructuredData)
4. **AC-4**: Meta title includes city name (already existing via generateMetadata)

## Tasks / Subtasks

- [x] Task 1: Add ReadinessCTA to California metro pages (AC: #2)
  - [x] Import and place ReadinessCTA before final CTA section
- [x] Task 2: Verify existing features (AC: #1, #3, #4)
  - [x] Local market context — present (city hero, median home price, local FAQ)
  - [x] LocalBusiness schema — present via StructuredData type="service"
  - [x] City name in meta title — present via generateMetadata

## Dev Notes

### Architecture

- California metro page is `app/california/[city]/page.tsx` with generateStaticParams for 29 cities
- ReadinessCTA reused from Story 4.2 — same component, consistent experience
- ChatWidget already global — no additional city-context integration needed for MVP

### References

- [Source: docs/tech-spec-epic-4.md]
- [Source: docs/epics.md#Epic-4] — Story 4.3 definition

## Change Log

| Change | Date | Description |
|--------|------|-------------|
| Created | 2026-03-02 | Initial story draft |
| Implemented | 2026-03-02 | ReadinessCTA added to metro pages |

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6

### Completion Notes

**Completed:** 2026-03-02
**Definition of Done:** All acceptance criteria met, 70 tests passing, build succeeds

### File List

- `app/california/[city]/page.tsx` — MODIFIED: Added ReadinessCTA import and component
