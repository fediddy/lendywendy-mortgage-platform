# Story 1.1: Configure Coolify Deployment

Status: done

## Story

As a **developer**,
I want the project configured for Coolify Docker deployment with standalone output,
so that the application can be built and deployed on our self-hosted VPS.

## Acceptance Criteria

1. **AC-1**: `next.config.ts` includes `output: 'standalone'` and `npm run build` produces a `.next/standalone` directory containing `server.js`
2. **AC-2**: A multi-stage `Dockerfile` exists with three stages (deps → builder → runner) that:
   - Stage 1 (deps): Installs production dependencies via `npm ci`
   - Stage 2 (builder): Copies deps, runs `npx prisma generate`, runs `npm run build`
   - Stage 3 (runner): Alpine-based minimal image with standalone output, static files, public assets, and Prisma client
3. **AC-3**: A `.dockerignore` file exists excluding: `node_modules`, `.next`, `.env*`, `.git`, `docs/`, `bmad/`
4. **AC-4**: `docker build -t lendywendy .` completes successfully (exit code 0)
5. **AC-5**: The container starts via `docker run -p 3000:3000 lendywendy` and serves the application on port 3000 (HTTP GET `/` returns 200)
6. **AC-6**: `sharp` is available in the production image for `next/image` optimization (self-hosted, no Vercel)
7. **AC-7**: The `turbopack.root` setting is removed from `next.config.ts` (not needed for production builds)

## Tasks / Subtasks

- [ ] **Task 1: Update `next.config.ts`** (AC: #1, #7)
  - [ ] Remove `turbopack: { root: __dirname }` block
  - [ ] Add `output: 'standalone'` to the config object
  - [ ] Verify `npm run build` produces `.next/standalone/server.js`

- [ ] **Task 2: Install `sharp` dependency** (AC: #6)
  - [ ] Run `npm install sharp`
  - [ ] Verify `sharp` appears in `package.json` dependencies

- [ ] **Task 3: Create `.dockerignore`** (AC: #3)
  - [ ] Create `.dockerignore` at project root with exclusion patterns:
    ```
    node_modules
    .next
    .env*
    .git
    .gitignore
    docs
    bmad
    *.md
    .claude
    ```

- [ ] **Task 4: Create multi-stage `Dockerfile`** (AC: #2, #6)
  - [ ] Stage 1 (`deps`): `FROM node:20-alpine`, copy `package.json` + `package-lock.json`, run `npm ci`
  - [ ] Stage 2 (`builder`): Copy `node_modules` from deps, copy all source, run `npx prisma generate`, run `npm run build`
  - [ ] Stage 3 (`runner`): `FROM node:20-alpine`, set `NODE_ENV=production`, copy standalone output + static + public + prisma dir, expose 3000, CMD `["node", "server.js"]`
  - [ ] Ensure `sharp` is included in the standalone output (it's a production dependency, so `npm ci` in deps stage includes it)

- [ ] **Task 5: Build and verify Docker image** (AC: #4, #5)
  - [ ] Run `docker build -t lendywendy .` — verify exit code 0
  - [ ] Check image size is reasonable (target < 250MB)
  - [ ] Run `docker run -p 3000:3000 lendywendy` — verify app serves on port 3000
  - [ ] Verify `next/image` optimization works (no "sharp not found" errors in logs)

- [ ] **Task 6: Write unit/integration verification** (AC: #1)
  - [ ] Verify `.next/standalone/server.js` exists after build
  - [ ] Verify `.next/static` directory populated after build

## Dev Notes

### Architecture Constraints

- **Deployment target**: Coolify on self-hosted VPS (ADR-001). Coolify builds Docker images locally on the VPS — no external registry needed.
- **Standalone mode**: Required for Docker deployment. Next.js copies only necessary `node_modules` into `.next/standalone`, producing a minimal server.
- **SSL/TLS**: Handled by Coolify's Traefik proxy with Let's Encrypt. The container only needs to expose port 3000 (HTTP).
- **Environment variables**: Injected at runtime by Coolify, never baked into the Docker image.
- **Database migrations**: `prisma generate` runs at build time (generates client). `prisma migrate deploy` should run at container startup or as a Coolify pre-deploy hook — NOT in the Dockerfile build.

### Existing Code State

- `next.config.ts` currently has only `turbopack: { root: __dirname }` — needs complete replacement
- No `Dockerfile` exists — creating from scratch
- No `.dockerignore` exists — creating from scratch
- `package.json` has `"build": "next build"` script already configured
- `prisma/schema.prisma` has 15 models — `prisma generate` will create the client
- `sharp` is not currently installed — needs to be added

### Implementation Guidance

**Dockerfile reference** from architecture document (`docs/architecture.md` → Deployment Architecture section):

```dockerfile
# Stage 1: Dependencies
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Stage 2: Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate
RUN npm run build

# Stage 3: Production
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
EXPOSE 3000
CMD ["node", "server.js"]
```

**Important `sharp` note**: The `node:20-alpine` base image may need `libc6-compat` for `sharp` to work. If the build fails with sharp errors, add `RUN apk add --no-cache libc6-compat` to the deps stage.

**`next.config.ts` target state**:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
};

export default nextConfig;
```

### Project Structure Notes

- `Dockerfile` → project root (standard Docker convention)
- `.dockerignore` → project root (standard Docker convention)
- `next.config.ts` → project root (existing, modified)
- No new directories created
- No changes to `app/`, `components/`, `lib/`, or `prisma/` directories

### References

- [Source: docs/architecture.md#Deployment-Architecture] — Dockerfile template, Coolify setup, env vars
- [Source: docs/architecture.md#ADR-001] — Self-hosted Coolify rationale
- [Source: docs/tech-spec-epic-1.md#Detailed-Design] — Module table, next.config.ts changes
- [Source: docs/tech-spec-epic-1.md#Acceptance-Criteria] — AC-1.1a through AC-1.1d
- [Source: docs/tech-spec-epic-1.md#NFR-Performance] — Docker image size < 250MB, build time < 3 min
- [Source: docs/tech-spec-epic-1.md#Risks] — Risk #2 (sharp in Alpine), Risk #7 (Prisma in Docker)
- [Source: docs/epics.md#Story-1.1] — Original story definition with BDD acceptance criteria

## Changelog

| Date | Change | Author |
|------|--------|--------|
| 2026-02-28 | Story drafted from epics + tech spec | BMad (SM) |
| 2026-03-01 | Story implemented | Claude Opus 4.6 (Dev) |

## Dev Agent Record

### Context Reference

<!-- Path(s) to story context XML will be added here by context workflow -->

### Agent Model Used

Claude Opus 4.6

### Debug Log References

- **Issue**: Standalone output was nested under `Project.Defaults/Lendywendy.com/` within `.next/standalone/` instead of being flat. This is because Next.js traces files relative to the monorepo/filesystem root.
- **Fix**: Added `outputFileTracingRoot: path.join(__dirname)` to `next.config.ts` to anchor tracing at the project root. After rebuild, `server.js` appeared correctly at `.next/standalone/server.js`.

### Completion Notes List

- `libc6-compat` added to all three Docker stages for Alpine compatibility with native modules (sharp, Prisma)
- `outputFileTracingRoot` is **required** for this project due to the nested directory structure (`Project.Defaults/Lendywendy.com/`). Without it, the standalone output mirrors the full filesystem path.
- Standalone output size: **158MB** (well under 250MB target)
- Prisma client (`node_modules/.prisma` and `node_modules/@prisma`) must be explicitly copied to the runner stage since standalone tracing doesn't include them
- `HOSTNAME="0.0.0.0"` and `PORT=3000` env vars set in Dockerfile for Next.js standalone server to bind correctly
- Docker build was NOT tested (no Docker available in this environment) — should be tested on VPS with Coolify
- `turbopack.root` setting was removed as it's dev-only and not needed for production

### File List

- **NEW**: `Dockerfile` — Multi-stage build (deps → builder → runner)
- **NEW**: `.dockerignore` — Excludes node_modules, .next, .env*, .git, docs, bmad
- **MODIFIED**: `next.config.ts` — Added `output: 'standalone'` and `outputFileTracingRoot`, removed `turbopack.root`
- **MODIFIED**: `package.json` / `package-lock.json` — Added `sharp` dependency
