# Neon Auth Users Sync System

## Overview
The `neon_auth.users_sync` table tracks user synchronization status for external services and achievements.

## Database Schema

### Table: `neon_auth.users_sync`
```sql
CREATE TABLE neon_auth.users_sync (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    last_synced_at TIMESTAMPTZ DEFAULT NOW(),
    sync_status TEXT DEFAULT 'pending' CHECK (sync_status IN ('pending', 'success', 'failed')),
    sync_source TEXT,
    error_message TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

## Usage

### Run Migrations
```bash
npm run migrate
```

### Service Usage
```javascript
import { UserSyncService } from './src/lib/userSync.js';

// Update sync status
await UserSyncService.updateSyncStatus(userId, 'success', 'achievements_page');

// Get user sync status
const status = await UserSyncService.getUserSyncStatus(userId);

// Sync user achievements
await UserSyncService.syncUserAchievements(userId);

// Cleanup old records
await UserSyncService.cleanupOldRecords();
```

## Features

✅ **Auto-generated UUIDs** with `gen_random_uuid()`  
✅ **Foreign key constraints** with CASCADE delete  
✅ **Automatic timestamps** with triggers  
✅ **Status validation** (pending/success/failed)  
✅ **Indexed lookups** for performance  
✅ **Helper functions** for common operations  
✅ **Auto-sync record creation** for new users  
✅ **Cleanup utilities** for old records  

## Functions

- `neon_auth.update_sync_status()` - Update user sync status
- `neon_auth.get_user_sync_status()` - Get latest sync status
- `neon_auth.cleanup_old_sync_records()` - Remove old sync records

## Triggers

- Auto-update `updated_at` on row changes
- Auto-create sync record when new user registers