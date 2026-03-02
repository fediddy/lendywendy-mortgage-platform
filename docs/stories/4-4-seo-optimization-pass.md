# Story 4.4: SEO Optimization Pass

Status: done

## Story

As a **site operator**,
I want all pages optimized for search engines with proper schema markup and meta tags,
So that the site ranks well for mortgage-related searches.

## Acceptance Criteria

1. **AC-1**: All pages have unique meta title and description
2. **AC-2**: Open Graph tags for social sharing on all pages
3. **AC-3**: Canonical URL on all pages
4. **AC-4**: JSON-LD structured data (FAQPage for loan pages, LocalBusiness for metro pages)
5. **AC-5**: Sitemap at /sitemap.xml includes all pages with correct priorities
6. **AC-6**: robots.txt allows crawling of public pages, blocks admin routes

## Tasks / Subtasks

- [x] Task 1: Audit existing SEO infrastructure
  - [x] Sitemap: 275+ lines, covers all routes including loan pages, metro pages, tools
  - [x] Robots.txt: Allows /, disallows /api/, /admin/, /dashboard/, /login, /register, /_next/, /private/
  - [x] StructuredData: 874-line component with Organization, LocalBusiness, FAQPage, HowTo, etc.
  - [x] All 13 loan pages have faqItems passed to StructuredData for FAQPage schema
- [x] Task 2: Audit and fix meta tags
  - [x] Found: readiness-score, get-quote, calculators, california hub, and 3 segment hubs missing canonical URLs
  - [x] Found: get-quote and calculators missing OG tags
  - [x] Fixed all 7 pages with missing canonical URLs
  - [x] Fixed 2 pages with missing OG tags
- [x] Task 3: Verify no duplicate titles
  - [x] All 23 pages with metadata have unique titles

## Dev Notes

### Gaps Found and Fixed

| Page | Missing | Fixed |
|------|---------|-------|
| `/readiness-score` | Canonical URL | Added alternates.canonical |
| `/get-quote` | OG tags, Canonical URL | Added both |
| `/calculators` | OG tags, Canonical URL | Added both |
| `/california` | Canonical URL | Added alternates.canonical |
| `/residential` | Canonical URL | Added alternates.canonical |
| `/investment` | Canonical URL | Added alternates.canonical |
| `/commercial` | Canonical URL | Added alternates.canonical |

### Already Complete (No Changes Needed)

- All 13 loan product pages: Full metadata, OG, canonical, FAQ schema
- California metro pages: Dynamic metadata via generateMetadata, OG, schema
- Layout: Base metadata with title template, comprehensive keywords
- Sitemap: All routes covered with appropriate priorities
- Robots.txt: Proper allow/disallow rules

## Change Log

| Change | Date | Description |
|--------|------|-------------|
| Created | 2026-03-02 | Initial story draft |
| Implemented | 2026-03-02 | Added canonical URLs to 7 pages, OG tags to 2 pages |

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6

### Completion Notes

**Completed:** 2026-03-02
**Definition of Done:** All acceptance criteria met, 70 tests passing, build succeeds

### File List

- `app/readiness-score/page.tsx` — MODIFIED: Added canonical URL
- `app/get-quote/page.tsx` — MODIFIED: Added OG tags and canonical URL
- `app/calculators/page.tsx` — MODIFIED: Added OG tags and canonical URL
- `app/california/page.tsx` — MODIFIED: Added canonical URL
- `app/residential/page.tsx` — MODIFIED: Added canonical URL
- `app/investment/page.tsx` — MODIFIED: Added canonical URL
- `app/commercial/page.tsx` — MODIFIED: Added canonical URL
