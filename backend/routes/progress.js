const express = require('express');
const { authenticateUser } = require('../middleware/auth');
const csrf = require('csrf');
const router = express.Router();

// Initialize CSRF protection
const csrfProtection = csrf({ cookie: true });

// Mock user progress storage
let userProgress = {};

// Secure property validation to prevent prototype pollution
const isValidProperty = (prop) => {
  return prop && typeof prop === 'string' && 
         !['__proto__', 'constructor', 'prototype'].includes(prop);
};

// GET /api/progress/user/:userId - Get user progress
router.get('/user/:userId', (req, res) => {
  const { userId } = req.params;
  const progress = userProgress[userId] || {};
  res.json(progress);
});

// POST /api/progress/user/:userId - Update user progress
router.post('/user/:userId', authenticateUser, csrfProtection, (req, res) => {
  const { userId } = req.params;
  const { badgeId, progress, earned } = req.body;
  
  // Validate properties to prevent prototype pollution
  if (!isValidProperty(userId) || !isValidProperty(badgeId)) {
    return res.status(400).json({ error: 'Invalid property names' });
  }
  
  if (!userProgress[userId]) {
    userProgress[userId] = Object.create(null); // Create object without prototype
  }
  
  userProgress[userId][badgeId] = {
    progress: Math.min(100, Math.max(0, progress)),
    earned: earned || false,
    earnedDate: earned ? new Date().toISOString() : null
  };
  
  res.json(userProgress[userId][badgeId]);
});

// GET /api/progress/stats/:userId - Get user statistics
router.get('/stats/:userId', (req, res) => {
  const { userId } = req.params;
  const progress = userProgress[userId] || {};
  
  const earnedBadges = Object.values(progress).filter(badge => badge.earned).length;
  const totalBadges = Object.keys(progress).length;
  const totalPoints = Object.entries(progress)
    .filter(([, badge]) => badge.earned)
    .reduce((sum, [_badgeId]) => {
      return sum + 100;
    }, 0);
  
  res.json({
    earnedBadges,
    totalBadges,
    completionRate: totalBadges > 0 ? Math.round((earnedBadges / totalBadges) * 100) : 0,
    totalPoints
  });
});


module.exports = router;