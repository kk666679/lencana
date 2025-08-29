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

  const addQuizResult = useCallback((badge, result) => {
    // Mock implementation for quiz results
    console.log('Quiz completed:', badge, result);
  }, []);

  const getLevelProgress = useCallback(() => {
    const level = stats.level || 1;
    const current = stats.totalPoints || 0;
    const required = level * 100;
    const percentage = Math.min((current / required) * 100, 100);
    
    return { current, required, percentage };
  }, [stats]);

  const getLevelTitle = useCallback(() => {
    const level = stats.level || 1;
    if (level < 5) return 'Novice Explorer';
    if (level < 10) return 'Badge Collector';
    if (level < 20) return 'Heritage Scholar';
    return 'Master Achiever';
  }, [stats]);

  return {
    progress,
    stats,
    loading,
    error,
    updateBadgeProgress,
    addQuizResult,
    getLevelProgress,
    getLevelTitle,
    refetch: fetchProgress
  };
}