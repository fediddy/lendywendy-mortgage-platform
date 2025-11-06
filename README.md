# LendyWendy.com

**Mortgage Lead Generation Platform with Topical Authority Strategy**

A custom-built, SEO-first platform targeting residential, investment property, and commercial real estate financing segments.

## Project Status

**Epic 1, Story 1.2 Complete:** Database setup with Prisma ✅

## Tech Stack

- **Framework:** Next.js 16 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Database:** PostgreSQL with Prisma ORM
- **Authentication:** NextAuth.js (pending)
- **Hosting:** Vercel (pending)

## Getting Started

### Prerequisites

- Node.js 20.9 or later
- PostgreSQL database

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Update `.env` with your database connection string and other secrets.

4. Generate Prisma Client:
   ```bash
   npx prisma generate
   ```

5. Run database migrations (when database is available):
   ```bash
   npx prisma migrate dev
   ```

6. Start the development server:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Project Structure

```
/app          - Next.js App Router pages and API routes
/components   - Reusable React components (pending)
/lib          - Utility functions and database client
/prisma       - Database schema and migrations
/public       - Static assets
/docs         - Product documentation (PRD, Architecture, Epics)
```

## Development Workflow

See `/docs/epics.md` for the complete implementation roadmap with 40 stories across 10 epics.

**Current Epic:** Epic 1 - Platform Foundation & Infrastructure

## Documentation

- [Product Brief](/docs/product-brief-Lendywendy.com-2025-11-04.md) - Vision and strategy
- [PRD](/docs/PRD.md) - Product Requirements Document
- [Architecture](/docs/architecture.md) - Technical decisions and patterns
- [Epics](/docs/epics.md) - Implementation roadmap

## License

Private project - All rights reserved
