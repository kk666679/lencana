import { badges } from './badges';

// Initialize user progress data structure
const initializeUserProgress = () => {
  const progress = {};
  badges.forEach(badge => {
    progress[badge.id] = {
      earned: false,
      progress: 0, // Percentage of progress towards earning the badge
      earnedDate: null
    };
  });
  return progress;
};

// Get user progress from localStorage or initialize new progress
export const getUserProgress = () => {
  try {
    const savedProgress = localStorage.getItem('badgeExplorerUserProgress');
    if (savedProgress) {
      return JSON.parse(savedProgress);
    }
  } catch (error) {
    console.error('Error loading user progress from localStorage:', error);
  }
  return initializeUserProgress();
};

// Save user progress to localStorage
export const saveUserProgress = (progress) => {
  try {
    localStorage.setItem('badgeExplorerUserProgress', JSON.stringify(progress));
  } catch (error) {
    console.error('Error saving user progress to localStorage:', error);
  }
};

// Update progress for a specific badge
export const updateBadgeProgress = (progress, badgeId, newProgress, earned = false) => {
  const updatedProgress = { ...progress };
  if (updatedProgress[badgeId]) {
    updatedProgress[badgeId] = {
      ...updatedProgress[badgeId],
      progress: Math.min(100, Math.max(0, newProgress)), // Ensure progress is between 0 and 100
      earned: earned || updatedProgress[badgeId].earned,
      earnedDate: earned ? new Date().toISOString() : updatedProgress[badgeId].earnedDate
    };
  }
  return updatedProgress;
};

// Mark a badge as earned
export const earnBadge = (progress, badgeId) => {
  return updateBadgeProgress(progress, badgeId, 100, true);
};

// Get statistics about user progress
export const getUserStats = (progress) => {
  const earnedBadges = Object.values(progress).filter(badge => badge.earned).length;
  const totalBadges = Object.keys(progress).length;
  const totalPoints = Object.entries(progress)
    .filter(([, badge]) => badge.earned)
    .reduce((sum, [badgeId]) => {
      const badge = badges.find(b => b.id === badgeId);
      return sum + (badge ? badge.points : 0);
    }, 0);
  
  return {
    earnedBadges,
    totalBadges,
    completionRate: totalBadges > 0 ? Math.round((earnedBadges / totalBadges) * 100) : 0,
    totalPoints
  };
};
