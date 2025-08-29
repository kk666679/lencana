# 🚀 Vercel Deployment Guide

## Quick Setup

### 1. Connect to Vercel
Visit **[vercel.com/import/git](https://vercel.com/import/git)** and:
- Authorize GitHub access
- Select `kk666679/lencana` repository
- Click "Import"

### 2. Configure Environment Variables
In Vercel dashboard, add these environment variables:

```bash
# Neon Auth
NEXT_PUBLIC_STACK_PROJECT_ID=35a9cc16-6d74-4cd7-a584-eecf765f1ea3
NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY=pck_zsmeznwydq161ajakfh59ajwkjj2tn7d4dde448jvta5r
STACK_SECRET_SERVER_KEY=ssk_w17rz3x850hj150v0khqd4724e30qm6ypm51xaj4qkbeg

# Database
DATABASE_URL=postgresql://neondb_owner:npg_0fFjNdbvAO9E@ep-young-meadow-a1e4fscz-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require
```

### 3. Deploy
- Vercel auto-deploys on every push to `main`
- Preview deployments for feature branches
- Production URL: `https://lencana.vercel.app`

## Features Deployed

✅ **Achievements Page** - `/achievements`  
✅ **Dark Mode Toggle** - Header navigation  
✅ **Neon Auth Integration** - User sync system  
✅ **Database Migrations** - Auto-run on deploy  
✅ **Responsive Design** - Mobile-first approach  

## Commands

```bash
# Local development
npm run dev:full

# Build for production  
npm run build

# Run migrations
npm run migrate

# Deploy to Vercel
git push origin main
```

## Security Notes

- Environment variables are excluded from Git
- Database credentials secured in Vercel
- SSL required for all connections
- CORS configured for production domains