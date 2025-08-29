import { useState, useEffect, useCallback } from 'react';
import { apiClient } from '../lib/api';

export function useProgress(userId) {
  const [progress, setProgress] = useState({});
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProgress = useCallback(async () => {
    if (!userId) return;
    
    try {
      setLoading(true);
      const [progressData, statsData] = await Promise.all([
        apiClient.getUserProgress(userId),
        apiClient.getUserStats(userId)
      ]);
      setProgress(progressData);
      setStats(statsData);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const updateBadgeProgress = useCallback(async (badgeId, progressValue, earned = false) => {
    try {
      const updatedBadge = await apiClient.updateProgress(userId, badgeId, progressValue, earned);
      setProgress(prev => ({
        ...prev,
        [badgeId]: updatedBadge
      }));
      
      // Refresh stats
      const newStats = await apiClient.getUserStats(userId);
      setStats(newStats);
      
      return updatedBadge;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [userId]);

  useEffect(() => {
    fetchProgress();
  }, [fetchProgress]);

  return {
    progress,
    stats,
    loading,
    error,
    updateBadgeProgress,
    refetch: fetchProgress
  };
}