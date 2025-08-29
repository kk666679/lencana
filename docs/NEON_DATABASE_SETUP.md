# Neon Database Setup

## Connection Details

**Database URL:** `postgresql://neondb_owner:npg_ronhQa8qFy9M@ep-polished-mud-a1v9k3st-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require`

**Region:** Asia Pacific (Singapore) - ap-southeast-1

## Database Schema

### Tables Created

1. **users** - User accounts and profiles
2. **badges** - Available badges and metadata
3. **user_badges** - User-earned badges relationship
4. **modules** - Study modules and content
5. **progress** - Learning progress tracking
6. **module_analytics** - Module access and completion analytics
7. **quizzes** - Quiz questions and answers

### Sample Data Inserted

- **1 User**: Ahmad Rahman (student role)
- **3 Badges**: Innovator, Achiever, Collaborator
- **1 Module**: Introduction to Mathematics

## Setup Commands

```bash
# Setup database schema and sample data
npm run neon:setup

# Test database connection
node -e "
import { neon } from '@neondatabase/serverless';
const sql = neon(process.env.DATABASE_URL);
const result = await sql\`SELECT NOW()\`;
console.log('Connected:', result[0].now);
"
```

## Database Status

✅ **Connected**: Successfully connected to Neon PostgreSQL
✅ **Schema**: All tables created with proper relationships
✅ **Data**: Sample data inserted for testing
✅ **API Integration**: Backend routes updated to use live database

## Environment Variables

```bash
# .env.development.local
DATABASE_URL="postgresql://neondb_owner:npg_ronhQa8qFy9M@ep-polished-mud-a1v9k3st-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"

# backend/.env
DATABASE_URL="postgresql://neondb_owner:npg_ronhQa8qFy9M@ep-polished-mud-a1v9k3st-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
```

## API Endpoints Now Live

All API endpoints are now connected to the live Neon database:

- `/api/badges` - Badge management
- `/api/users` - User profiles and settings
- `/api/modules` - Study modules CRUD
- `/api/analytics` - Progress tracking
- `/api/upload` - File storage

## Database Management

### Neon Console Access
- **URL**: https://console.neon.tech/
- **Project**: Lencana Malaysia LMS
- **Database**: neondb

### Query Examples

```sql
-- View all users
SELECT * FROM users;

-- View all badges
SELECT * FROM badges;

-- View user progress
SELECT u.name, COUNT(ub.id) as badges_earned
FROM users u
LEFT JOIN user_badges ub ON u.id = ub.user_id
GROUP BY u.id, u.name;

-- View module analytics
SELECT m.title, COUNT(ma.id) as views
FROM modules m
LEFT JOIN module_analytics ma ON m.id = ma.module_id
GROUP BY m.id, m.title;
```

## Performance Features

- **Connection Pooling**: Automatic connection management
- **SSL Security**: Required SSL connections
- **Regional Optimization**: Singapore region for low latency
- **Serverless Architecture**: Auto-scaling database

## Backup & Recovery

- **Automatic Backups**: Daily automated backups
- **Point-in-time Recovery**: Restore to any point in time
- **Branch Management**: Database branching for development

The Lencana platform is now fully connected to a production-ready Neon PostgreSQL database with all features operational.