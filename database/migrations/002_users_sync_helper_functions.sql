-- Helper functions for users_sync operations

-- Function to update sync status
CREATE OR REPLACE FUNCTION neon_auth.update_sync_status(
    p_user_id UUID,
    p_status TEXT,
    p_source TEXT DEFAULT NULL,
    p_error_message TEXT DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
    sync_id UUID;
BEGIN
    INSERT INTO neon_auth.users_sync (user_id, sync_status, sync_source, error_message, last_synced_at)
    VALUES (p_user_id, p_status, p_source, p_error_message, NOW())
    RETURNING id INTO sync_id;
    
    RETURN sync_id;
END;
$$ LANGUAGE plpgsql;

-- Function to get latest sync status for user
CREATE OR REPLACE FUNCTION neon_auth.get_user_sync_status(p_user_id UUID)
RETURNS TABLE (
    sync_status TEXT,
    last_synced_at TIMESTAMPTZ,
    sync_source TEXT,
    error_message TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT us.sync_status, us.last_synced_at, us.sync_source, us.error_message
    FROM neon_auth.users_sync us
    WHERE us.user_id = p_user_id
    ORDER BY us.created_at DESC
    LIMIT 1;
END;
$$ LANGUAGE plpgsql;

-- Function to cleanup old sync records (keep last 10 per user)
CREATE OR REPLACE FUNCTION neon_auth.cleanup_old_sync_records()
RETURNS INTEGER AS $$
DECLARE
    deleted_count INTEGER;
BEGIN
    WITH ranked_syncs AS (
        SELECT id, ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY created_at DESC) as rn
        FROM neon_auth.users_sync
    )
    DELETE FROM neon_auth.users_sync
    WHERE id IN (
        SELECT id FROM ranked_syncs WHERE rn > 10
    );
    
    GET DIAGNOSTICS deleted_count = ROW_COUNT;
    RETURN deleted_count;
END;
$$ LANGUAGE plpgsql;