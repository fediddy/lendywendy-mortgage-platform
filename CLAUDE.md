# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Status

This is a new project directory that has not yet been initialized. The project name "Lendywendy.com" suggests this will be a lending-related web application.

## Project Setup

When initializing this project, consider the following based on the repository's common patterns:

### Technology Stack Options

Based on other projects in this repository, common stacks include:

**Option 1: Next.js Full-Stack Application**
```bash
npx create-next-app@latest . --typescript --tailwind --app --eslint
npm install
npm run dev
```

**Option 2: React + Vite Frontend**
```bash
npm create vite@latest . -- --template react-ts
npm install
npm run dev
```

### Database Configuration

Common database providers used in this repository:
- **Neon**: PostgreSQL serverless (recommended for production)
- **Supabase**: PostgreSQL with auth/storage features
- **PlanetScale**: MySQL-compatible serverless
- **Vercel Postgres**: PostgreSQL optimized for Vercel deployments
- **SQLite**: For local development

### Common Dependencies

Projects in this repository typically use:
- **UI Components**: Shadcn/UI, Radix UI, Tailwind CSS
- **Database ORM**: Prisma or Drizzle ORM
- **Authentication**: NextAuth.js, JWT
- **AI Integration**: OpenAI, Anthropic Claude (when needed)
- **Form Handling**: React Hook Form, Zod validation

### Port Configuration

To avoid conflicts with other projects in the repository, consider using a unique port. Currently used ports:
- 3000: Various projects (default)
- 3333: SuicideKingsCarClub
- 5001: CodeRankMaster backend
- 5173: Various Vite projects
- 5555: site-map-website-generator

Suggested port for this project: **4000** or configure in environment variables.

## Environment Variables

Once initialized, create a `.env.local` file with required configuration:

```env
# Database
DATABASE_URL=""

# Authentication
NEXTAUTH_URL="http://localhost:[PORT]"
NEXTAUTH_SECRET=""

# Add other API keys as needed
```

## Development Workflow

After project initialization, typical commands will be:

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run tests (once configured)
npm test

# Database operations (if using Prisma)
npx prisma generate
npx prisma db push
npx prisma studio

# Database operations (if using Drizzle)
npm run db:push
npm run db:studio
```

## Next Steps

1. Initialize the project with chosen technology stack
2. Set up database connection and schema
3. Configure authentication if needed
4. Update this CLAUDE.md with actual project structure and commands
5. Add `.env.example` with required environment variables
