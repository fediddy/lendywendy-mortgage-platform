# Deployment Guide - LendyWendy.com

## Vercel Deployment (Recommended)

### Prerequisites
1. GitHub account
2. Vercel account (free tier available at https://vercel.com)
3. PostgreSQL database (Vercel Postgres or Neon recommended)

### Step 1: Push to GitHub

```bash
# Create a new repository on GitHub (github.com/new)
# Then push your code:

git remote add origin https://github.com/YOUR_USERNAME/lendywendy.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy to Vercel

1. **Go to Vercel Dashboard:** https://vercel.com/new
2. **Import Git Repository:**
   - Click "Add New Project"
   - Select your GitHub repository (lendywendy)
   - Vercel will automatically detect Next.js

3. **Configure Environment Variables:**
   Add these in the Vercel dashboard under "Environment Variables":

   ```
   DATABASE_URL=postgresql://user:password@host:5432/dbname
   NEXTAUTH_URL=https://lendywendy.com
   NEXTAUTH_SECRET=your-generated-secret-here
   ```

   **Generate NEXTAUTH_SECRET:**
   ```bash
   openssl rand -base64 32
   ```

4. **Deploy:**
   - Click "Deploy"
   - Vercel will build and deploy your application
   - You'll get a preview URL like: `lendywendy-xyz.vercel.app`

### Step 3: Set Up Database

**Option A: Vercel Postgres (Recommended)**

1. In Vercel Dashboard → Storage → Create Database
2. Select "Postgres"
3. Vercel will automatically add DATABASE_URL to your environment variables
4. Run migrations:
   ```bash
   npx prisma migrate deploy
   ```

**Option B: Neon (Free Tier)**

1. Create account at https://neon.tech
2. Create new project and database
3. Copy connection string and add to Vercel environment variables
4. Run migrations locally then push schema:
   ```bash
   npx prisma db push
   ```

### Step 4: Configure Custom Domain

1. In Vercel Dashboard → Settings → Domains
2. Add your custom domain: `lendywendy.com`
3. Update DNS records as instructed by Vercel
4. Vercel automatically provisions SSL certificate

### Step 5: Verify Deployment

1. Visit your deployment URL
2. Check `/login` page loads correctly
3. Verify environment variables are set (check Vercel logs if issues)
4. Create first admin user via Prisma Studio:

   ```bash
   npx prisma studio
   # Create user with role: ADMIN
   # Hash password with bcrypt (use online tool or script)
   ```

## Automatic Deployments

Once connected:
- **Push to `main`** → Automatic production deployment
- **Push to `develop`** → Staging environment (create branch and configure in Vercel)
- **Pull Requests** → Preview deployments

## Environment Variables Reference

### Production (.env on Vercel)
```bash
# Database
DATABASE_URL="postgresql://..."

# Auth
NEXTAUTH_URL="https://lendywendy.com"
NEXTAUTH_SECRET="your-secret-32-char-string"

# Email (when implemented)
SENDGRID_API_KEY="SG.xxx"
EMAIL_FROM="noreply@lendywendy.com"

# Analytics (when implemented)
NEXT_PUBLIC_GA_MEASUREMENT_ID="G-XXXXXXXXXX"

# Error Tracking (when implemented)
SENTRY_DSN="https://xxx@sentry.io/xxx"
```

### Local Development (.env.local)
```bash
DATABASE_URL="postgresql://localhost:5432/lendywendy_dev"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="local-dev-secret-not-for-production"
```

## Deployment Checklist

- [ ] GitHub repository created and code pushed
- [ ] Vercel project created and connected to GitHub
- [ ] Environment variables configured in Vercel
- [ ] Database created (Vercel Postgres or Neon)
- [ ] Database migrations run (`npx prisma migrate deploy`)
- [ ] Custom domain configured (optional)
- [ ] SSL certificate verified (automatic via Vercel)
- [ ] First admin user created
- [ ] Login functionality tested on production URL

## Troubleshooting

### Build Fails
- Check Vercel build logs
- Verify all environment variables are set
- Ensure `npm run build` works locally

### Database Connection Errors
- Verify DATABASE_URL is correct
- Check database is accessible from Vercel (whitelist Vercel IPs if needed)
- Ensure Prisma Client is generated during build

### Authentication Issues
- Verify NEXTAUTH_URL matches deployment URL
- Ensure NEXTAUTH_SECRET is set and not empty
- Check browser cookies are enabled

## Rollback Procedure

If deployment has issues:

1. Go to Vercel Dashboard → Deployments
2. Find previous working deployment
3. Click "..." → Promote to Production
4. Deployment rolls back instantly

## Performance Monitoring

Vercel provides built-in analytics:
- Speed Insights
- Web Vitals tracking
- Function execution times
- Bandwidth usage

Access at: Vercel Dashboard → Analytics

## Cost Estimation

**Vercel Free Tier includes:**
- 100 GB bandwidth/month
- Unlimited API routes
- Automatic SSL
- Preview deployments
- Analytics

**Vercel Postgres:**
- Free: 256 MB storage, 60 hours compute/month
- Pro: $20/month for 512 MB, unlimited compute

**Neon (Alternative):**
- Free: 512 MB storage, always available
- Paid: $19/month for 10 GB

## Next Steps After Deployment

1. Set up monitoring and alerts
2. Configure error tracking (Sentry)
3. Enable analytics (Google Analytics)
4. Set up email service (SendGrid)
5. Create first content and test lead forms

---

**Deployment Status:** Ready for Vercel deployment
**Last Updated:** 2025-11-06
