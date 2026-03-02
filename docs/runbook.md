# LendyWendy Production Runbook

## Deployment

### Standard Deploy
Push to `main` branch triggers automatic deployment via Coolify:
```bash
git push origin main
```
Coolify will build the Docker image and deploy it. Monitor build status in the Coolify dashboard.

### Manual Deploy
If needed, trigger a manual deployment from the Coolify dashboard:
1. Go to Coolify dashboard → Applications → LendyWendy
2. Click "Deploy" button
3. Monitor build logs for errors

## Rollback

### One-Click Rollback (Coolify)
1. Go to Coolify dashboard → Applications → LendyWendy → Deployments
2. Find the previous successful deployment
3. Click "Rollback" on that deployment
4. Verify the site is working at https://lendywendy.com

### Git Rollback
```bash
git revert HEAD
git push origin main
```

## Health Checks

### Endpoint
```
GET https://lendywendy.com/api/health
```
Returns:
- `200` with `{"status": "healthy"}` — all systems operational
- `503` with `{"status": "degraded"}` — database or other system down

### Coolify Health Check
Configure Coolify to ping `/api/health` every 30 seconds. If it returns non-200 for 3 consecutive checks, Coolify will restart the container.

## Monitoring

### Sentry (Error Tracking)
- Dashboard: https://sentry.io — project configured via SENTRY_DSN
- Source maps uploaded automatically during build (`withSentryConfig`)
- Traces sampled at 10% in production
- Session replay: 0% normal, 100% on error

### Google Analytics 4
- Dashboard: https://analytics.google.com
- Measurement ID configured via `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- Loads `afterInteractive` (non-blocking)

## Logs

### Application Logs
```bash
# Via Coolify dashboard
Coolify → Applications → LendyWendy → Logs

# Or via Docker on the VPS
docker logs <container-id> --tail 100 -f
```

### Structured Logging
Application uses Winston logger with structured JSON output:
- `component` field identifies the module (email, chat, leads, etc.)
- Error logs include stack traces
- Log levels: error, warn, info, debug

## Database

### Connection
PostgreSQL hosted on Coolify, connection string in `DATABASE_URL` environment variable.

### Backups
- Configure automatic daily backups in Coolify → Databases → PostgreSQL → Backups
- Recommended: daily backup with 7-day retention
- Test restore procedure before launch

### Manual Backup
```bash
# On the VPS
docker exec <postgres-container> pg_dump -U postgres lendywendy > backup_$(date +%Y%m%d).sql
```

### Restore
```bash
docker exec -i <postgres-container> psql -U postgres lendywendy < backup_YYYYMMDD.sql
```

## Environment Variables

Critical production environment variables:
- `DATABASE_URL` — PostgreSQL connection string
- `NEXTAUTH_SECRET` — Auth encryption key
- `RESEND_API_KEY` — Email sending (Resend)
- `NEXT_PUBLIC_SENTRY_DSN` — Error tracking
- `SENTRY_AUTH_TOKEN` — Source map uploads
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` — Analytics
- `DEEPSEEK_API_KEY` — AI chat advisor
- `CRON_SECRET` — Webhook retry endpoint auth
- `MAXBOUNTY_CAMPAIGN_URL` — Lead monetization

## Common Issues

### Build Failure
1. Check Coolify build logs for errors
2. Most common: missing environment variables
3. Fix: add missing vars in Coolify → Applications → Environment

### Email Not Sending
1. Check Sentry for Resend API errors
2. Verify `RESEND_API_KEY` is set
3. Check Resend dashboard for delivery status

### Chat Not Responding
1. Check Sentry for DeepSeek API errors
2. Verify `DEEPSEEK_API_KEY` is set and has quota
3. Check `/api/chat` logs for SSE streaming errors

### Database Connection Errors
1. Check health endpoint: `/api/health`
2. Verify PostgreSQL container is running in Coolify
3. Check `DATABASE_URL` is correct
