# Neon Database Setup

## Quick Setup

```bash
# 1. Pull environment variables
vercel env pull .env.development.local

# 2. Setup database tables
npm run db:setup

# 3. Test connection
node -e "import('./src/lib/neon.js').then(({sql}) => sql\`SELECT NOW()\`.then(console.log))"
```

## Usage Examples

```javascript
// Server actions
import { createComment, updateProgress } from './src/actions/database.js';

// Direct queries
import { sql } from './src/lib/neon.js';
const users = await sql`SELECT * FROM users`;

// Form with server action
<form action={createComment}>
  <input name="comment" placeholder="Write a comment" />
  <button type="submit">Submit</button>
</form>
```

## Database Schema

- **users** - User accounts
- **badges** - Available badges  
- **user_badges** - Earned badges
- **progress** - Learning progress
- **comments** - Test table

## Commands

```bash
npm run db:setup    # Create tables
vercel env pull     # Get latest env vars
```