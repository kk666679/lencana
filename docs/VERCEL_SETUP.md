# Vercel CLI Setup for Lencana Malaysia

## Quick Setup Commands

```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Login to Vercel
vercel login

# 3. Link project (run in project root)
vercel link

# 4. Deploy to preview
vercel

# 5. Deploy to production
vercel --prod
```

## Environment Variables

```bash
# Add environment variables
vercel env add NODE_ENV production
vercel env add API_URL production

# Pull environment variables locally
vercel env pull .env.local
```

## Development Server

```bash
# Run local development with Vercel
vercel dev
```

## Configuration File

Create `vercel.json` in project root:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/api/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

## Project Scripts

Add to `package.json`:

```json
{
  "scripts": {
    "vercel-build": "npm run build",
    "deploy": "vercel --prod",
    "deploy-preview": "vercel"
  }
}
```

## Deployment Commands

```bash
# One-time setup
vercel login && vercel link

# Regular deployment
npm run deploy

# Preview deployment
npm run deploy-preview
```