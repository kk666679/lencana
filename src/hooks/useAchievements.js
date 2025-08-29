import { useState, useEffect } from 'react';

const achievements = [
  {
    id: 'first-badge',
    name: 'First Steps',
    description: 'Earn your first badge',
    icon: '🌟',
    points: 50,
    condition: (stats) => stats.earnedBadges >= 1
  },
  {
    id: 'quiz-master',
    name: 'Quiz Master',
    description: 'Complete 5 quizzes',
    icon: '🧠',
    points: 100,
    condition: (stats) => stats.quizzesCompleted >= 5
  },
  {
    id: 'collection-starter',
    name: 'Collection Starter',
    description: 'Earn 3 badges',
    icon: '🏆',
    points: 150,
    condition: (stats) => stats.earnedBadges >= 3
  },
  {
    id: 'collection-completest',
    name: 'Collection Completest',
    description: 'Earn all available badges',
    icon: '👑',
    points: 500,
    condition: (stats) => stats.earnedBadges >= 6
  },
  {
    id: 'point-collector',
    name: 'Point Collector',
    description: 'Earn 1000 Merdeka Points',
    icon: '💎',
    points: 200,
    condition: (stats) => stats.totalPoints >= 1000
  },
  {
    id: 'perfect-scorer',
    name: 'Perfect Scorer',
    description: 'Get 100% on any quiz',
    icon: '⭐',
    points: 100,
    condition: (stats) => stats.perfectQuizzes >= 1
  }
];

export function useAchievements(userStats) {
  const [earnedAchievements, setEarnedAchievements] = useState([]);
  const [newAchievements, setNewAchievements] = useState([]);

  useEffect(() => {
    const currentEarned = achievements.filter(achievement => 
      achievement.condition(userStats)
    );

    const newlyEarned = currentEarned.filter(achievement => 
      !earnedAchievements.find(earned => earned.id === achievement.id)
    );

    if (newlyEarned.length > 0) {
      setNewAchievements(newlyEarned);
      setEarnedAchievements(currentEarned);
    }
  }, [userStats, earnedAchievements]);

  const clearNewAchievements = () => {
    setNewAchievements([]);
  };

  const getProgress = () => {
    return {
      earned: earnedAchievements.length,
      total: achievements.length,
      percentage: Math.round((earnedAchievements.length / achievements.length) * 100)
    };
  };

  return {
    achievements,
    earnedAchievements,
    newAchievements,
    clearNewAchievements,
    getProgress
  };
}