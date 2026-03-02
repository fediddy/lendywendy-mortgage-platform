# Story 8.4: Performance Optimization

Status: done

## Story

As a **site operator**,
I want all pages to meet Core Web Vitals targets,
So that the site ranks well in search engines and provides fast user experience.

## Acceptance Criteria

1. **AC-1**: All images use `next/image` with proper sizing and lazy loading
2. **AC-2**: Only necessary JavaScript loaded per page (Server Components where possible)
3. **AC-3**: No render-blocking resources in critical path
4. **AC-4**: GA4 and Sentry scripts don't block rendering

## Tasks / Subtasks

- [x] Task 1: Audited image usage — no raw `<img>` tags found, all icons via lucide-react
- [x] Task 2: Verified Server/Client split — only pages with interactive features are client components
- [x] Task 3: Confirmed GA4 uses `strategy="afterInteractive"` (non-blocking)
- [x] Task 4: Added `images.formats: ["image/avif", "image/webp"]` and `experimental.optimizeCss` to next.config.ts
- [x] Task 5: Verified Sentry config — 10% traces, 0% session replay, 100% error replay (lean)

## Change Log

| Change | Date | Description |
|--------|------|-------------|
| Created | 2026-03-02 | Initial story draft |
| Completed | 2026-03-02 | Performance audit complete, config optimized |

## Dev Agent Record
### Agent Model Used
Claude Opus 4.6

### Completion Notes
**Completed:** 2026-03-02
**Definition of Done:** All ACs met — no raw img tags, GA4 non-blocking, Sentry lean config, image optimization configured. 94 tests passing, build succeeds.

### File List
- `next.config.ts` — MODIFIED: Added image formats (avif/webp) and experimental CSS optimization
