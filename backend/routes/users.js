const express = require('express');
const { neon } = require('@neondatabase/serverless');
const { authenticateUser } = require('../middleware/auth');
const router = express.Router();

const sql = neon(process.env.DATABASE_URL);

// Mock user data for fallback
const mockUsers = [
  {
    id: 'user-1',
    name: 'Ahmad Rahman',
    email: 'ahmad@example.com',
    avatar: '/default-avatar.png',
    role: 'student',
    settings: {
      theme: 'light',
      notifications: true,
      privacy: 'public'
    },
    created_at: '2024-01-15T00:00:00Z'
  }
];

// Get user profile
router.get('/:id', async (req, res) => {
  try {
    if (sql) {
      const users = await sql`SELECT * FROM users WHERE id = ${req.params.id}`;
      if (users.length > 0) {
        return res.json(users[0]);
      }
    }
    
    // Fallback to mock data
    const user = mockUsers.find(u => u.id === req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update user profile
router.put('/:id', authenticateUser, async (req, res) => {
  try {
    const { name, email, avatar, settings } = req.body;
    
    if (sql) {
      const result = await sql`
        UPDATE users 
        SET name = ${name}, email = ${email}, avatar = ${avatar}, updated_at = NOW()
        WHERE id = ${req.params.id}
        RETURNING *
      `;
      
      if (result.length > 0) {
        return res.json(result[0]);
      }
    }
    
    // Fallback response
    res.json({ 
      id: req.params.id, 
      name, 
      email, 
      avatar, 
      settings,
      updated_at: new Date().toISOString() 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user settings
router.get('/:id/settings', async (req, res) => {
  try {
    if (sql) {
      const settings = await sql`
        SELECT settings FROM users WHERE id = ${req.params.id}
      `;
      
      if (settings.length > 0) {
        return res.json(settings[0].settings || {});
      }
    }
    
    // Default settings
    res.json({
      theme: 'light',
      notifications: true,
      privacy: 'public',
      language: 'en'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update user settings
router.put('/:id/settings', authenticateUser, async (req, res) => {
  try {
    const settings = req.body;
    
    if (sql) {
      await sql`
        UPDATE users 
        SET settings = ${JSON.stringify(settings)}, updated_at = NOW()
        WHERE id = ${req.params.id}
      `;
    }
    
    res.json({ message: 'Settings updated successfully', settings });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user dashboard data
router.get('/:id/dashboard', authenticateUser, async (req, res) => {
  try {
    const userId = req.params.id;
    
    // Mock dashboard data
    const dashboardData = {
      stats: {
        modulesCompleted: 12,
        badgesEarned: 8,
        totalPoints: 1250,
        streak: 7
      },
      recentActivity: [
        { id: 1, type: 'badge', title: 'Earned Innovator Badge', time: '2 hours ago' },
        { id: 2, type: 'module', title: 'Completed Mathematics Module', time: '1 day ago' },
        { id: 3, type: 'quiz', title: 'Scored 95% in Science Quiz', time: '2 days ago' }
      ],
      notifications: [
        {
          id: 1,
          type: 'badge',
          title: 'New Badge Available',
          message: 'Complete the next module to earn the Achiever badge',
          time: '1 hour ago',
          read: false
        }
      ]
    };
    
    res.json(dashboardData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;