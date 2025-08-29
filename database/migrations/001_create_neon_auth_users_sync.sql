-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create neon_auth schema
CREATE SCHEMA IF NOT EXISTS neon_auth;

-- Create users_sync table
CREATE TABLE IF NOT EXISTS neon_auth.users_sync (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    last_synced_at TIMESTAMPTZ DEFAULT NOW(),
    sync_status TEXT DEFAULT 'pending' CHECK (sync_status IN ('pending', 'success', 'failed')),
    sync_source TEXT,
    error_message TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add foreign key constraint (assuming auth.users exists)
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'auth' AND table_name = 'users') THEN
        IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'fk_users_sync_user_id') THEN
            ALTER TABLE neon_auth.users_sync 
            ADD CONSTRAINT fk_users_sync_user_id 
            FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
        END IF;
    END IF;
END $$;

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_users_sync_user_id ON neon_auth.users_sync(user_id);
CREATE INDEX IF NOT EXISTS idx_users_sync_status ON neon_auth.users_sync(sync_status);
CREATE INDEX IF NOT EXISTS idx_users_sync_created_at ON neon_auth.users_sync(created_at);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION neon_auth.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updated_at
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.triggers WHERE trigger_name = 'trigger_update_users_sync_updated_at') THEN
        CREATE TRIGGER trigger_update_users_sync_updated_at
            BEFORE UPDATE ON neon_auth.users_sync
            FOR EACH ROW
            EXECUTE FUNCTION neon_auth.update_updated_at_column();
    END IF;
END $$;

-- Create function to auto-insert sync record for new users
CREATE OR REPLACE FUNCTION neon_auth.create_user_sync_record()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO neon_auth.users_sync (user_id, sync_source)
    VALUES (NEW.id, 'user_registration');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for auto-inserting sync records (if auth.users exists)
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'auth' AND table_name = 'users') THEN
        IF NOT EXISTS (SELECT 1 FROM information_schema.triggers WHERE trigger_name = 'trigger_create_user_sync_record') THEN
            CREATE TRIGGER trigger_create_user_sync_record
                AFTER INSERT ON auth.users
                FOR EACH ROW
                EXECUTE FUNCTION neon_auth.create_user_sync_record();
        END IF;
    END IF;
END $$;