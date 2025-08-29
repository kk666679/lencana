# Database Setup

## Quick Setup

```bash
# 1. Set DATABASE_URL in .env.local
DATABASE_URL="postgresql://user:pass@host/db?sslmode=require"

# 2. Generate Prisma client
npm run db:generate

# 3. Push schema to database
npm run db:push

# 4. View database
npm run db:studio
```

## Usage Examples

```javascript
// Using Neon directly
import { db } from './src/lib/db';
const users = await db.getUsers();

// Using Prisma
import { prisma } from './src/lib/prisma';
const user = await prisma.user.findUnique({ where: { id } });

// Using React hooks
import { useUsers, useUserBadges } from './src/hooks/useDatabase';
const { users, loading } = useUsers();
```

## Database Schema

- **User** - User accounts and profiles
- **Badge** - Available badges and metadata
- **UserBadge** - User-earned badges relationship
- **Progress** - Learning progress tracking
- **BadgeRequirement** - Badge earning requirements