const express = require('express');
const router = express.Router();

// Mock user progress storage
let userProgress = {};

// GET /api/progress/:userId - Get user progress
router.get('/:userId', (req, res) => {
  const { userId } = req.params;
  const progress = userProgress[userId] || {};
  res.json(progress);
});

// POST /api/progress/:userId - Update user progress
router.post('/:userId', (req, res) => {
  const { userId } = req.params;
  const { badgeId, progress, earned } = req.body;
  
  if (!userProgress[userId]) {
    userProgress[userId] = {};
  }
  
  userProgress[userId][badgeId] = {
    progress: Math.min(100, Math.max(0, progress)),
    earned: earned || false,
    earnedDate: earned ? new Date().toISOString() : null
  };
  
  res.json(userProgress[userId][badgeId]);
});

// GET /api/progress/:userId/stats - Get user statistics
router.get('/:userId/stats', (req, res) => {
  const { userId } = req.params;
  const progress = userProgress[userId] || {};
  
  const earnedBadges = Object.values(progress).filter(badge => badge.earned).length;
  const totalBadges = Object.keys(progress).length;
  const totalPoints = Object.entries(progress)
    .filter(([, badge]) => badge.earned)
    .reduce((sum, [badgeId]) => {
      // Mock points calculation - replace with actual badge data lookup
      return sum + 100; // Default points
    }, 0);
  
  res.json({
    earnedBadges,
    totalBadges,
    completionRate: totalBadges > 0 ? Math.round((earnedBadges / totalBadges) * 100) : 0,
    totalPoints
  });
});

module.exports = router;