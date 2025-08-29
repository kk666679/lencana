import { useState, useEffect } from 'react';
import { badges } from '../data/badges';

export function useProgress(userId) {
  const [progress, setProgress] = useState({});
  const [stats, setStats] = useState({
    earnedBadges: 0,
    totalPoints: 0,
    completionRate: 0,
    quizzesCompleted: 0,
    perfectQuizzes: 0,
    level: 1,
    xp: 0
  });

  const updateBadgeProgress = async (badgeId, progressValue, earned = false, quizResult = null) => {
    const newProgress = {
      ...progress,
      [badgeId]: {
        progress: progressValue,
        earned,
        earnedDate: earned ? new Date().toISOString() : null,
        quizResult
      }
    };
    
    setProgress(newProgress);
    
    // Calculate stats
    const earnedCount = Object.values(newProgress).filter(p => p.earned).length;
    const quizResults = Object.values(newProgress).filter(p => p.quizResult);
    const quizzesCompleted = quizResults.length;
    const perfectQuizzes = quizResults.filter(p => p.quizResult.score === p.quizResult.total).length;
    
    const totalPoints = Object.values(newProgress)
      .filter(p => p.earned)
      .reduce((sum, p) => {
        const badge = badges.find(b => b.id === Object.keys(progress).find(key => progress[key] === p));
        return sum + (badge?.points || 0);
      }, 0) + quizResults.reduce((sum, p) => sum + (p.quizResult?.points || 0), 0);
    
    // Calculate level and XP
    const xp = totalPoints;
    const level = Math.floor(xp / 500) + 1; // Level up every 500 points
    
    setStats({
      earnedBadges: earnedCount,
      totalPoints,
      completionRate: Math.round((earnedCount / badges.length) * 100),
      quizzesCompleted,
      perfectQuizzes,
      level,
      xp
    });
  };

  const addQuizResult = (badgeId, quizResult) => {
    updateBadgeProgress(badgeId, quizResult.passed ? 100 : 50, quizResult.passed, quizResult);
  };

  const getLevelProgress = () => {
    const currentLevelXP = stats.xp % 500;
    const nextLevelXP = 500;
    return {
      current: currentLevelXP,
      required: nextLevelXP,
      percentage: Math.round((currentLevelXP / nextLevelXP) * 100)
    };
  };

  const getLevelTitle = () => {
    if (stats.level >= 10) return 'History Scholar';
    if (stats.level >= 7) return 'Heritage Expert';
    if (stats.level >= 5) return 'Cultural Explorer';
    if (stats.level >= 3) return 'Badge Collector';
    return 'Rookie';
  };

  return { 
    progress, 
    stats, 
    updateBadgeProgress, 
    addQuizResult, 
    getLevelProgress, 
    getLevelTitle 
  };
}