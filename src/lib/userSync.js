import { db } from './db.js';

export class UserSyncService {
  static async updateSyncStatus(userId, status, source = null, errorMessage = null) {
    try {
      const query = `
        SELECT neon_auth.update_sync_status($1, $2, $3, $4) as sync_id
      `;
      const result = await db.query(query, [userId, status, source, errorMessage]);
      return result.rows[0]?.sync_id;
    } catch (error) {
      console.error('Error updating sync status:', error);
      throw error;
    }
  }

  static async getUserSyncStatus(userId) {
    try {
      const query = `
        SELECT * FROM neon_auth.get_user_sync_status($1)
      `;
      const result = await db.query(query, [userId]);
      return result.rows[0] || null;
    } catch (error) {
      console.error('Error getting user sync status:', error);
      return null;
    }
  }

  static async syncUserAchievements(userId, source = 'achievements_page') {
    try {
      await this.updateSyncStatus(userId, 'pending', source);
      
      // Simulate achievement sync logic
      // In real implementation, this would sync with external services
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      await this.updateSyncStatus(userId, 'success', source);
      return true;
    } catch (error) {
      await this.updateSyncStatus(userId, 'failed', source, error.message);
      throw error;
    }
  }

  static async cleanupOldRecords() {
    try {
      const query = `SELECT neon_auth.cleanup_old_sync_records() as deleted_count`;
      const result = await db.query(query);
      return result.rows[0]?.deleted_count || 0;
    } catch (error) {
      console.error('Error cleaning up sync records:', error);
      return 0;
    }
  }
}