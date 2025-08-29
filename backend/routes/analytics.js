const express = require('express');
const { neon } = require('@neondatabase/serverless');
const router = express.Router();

const sql = neon(process.env.DATABASE_URL);

// Get module analytics
router.get('/modules/:id', async (req, res) => {
  try {
    const moduleId = req.params.id;
    
    const analytics = await sql`
      SELECT 
        COUNT(*) as total_views,
        COUNT(CASE WHEN completed = true THEN 1 END) as completions,
        AVG(time_spent) as avg_time_spent,
        AVG(score) as avg_score
      FROM module_analytics 
      WHERE module_id = ${moduleId}
    `;

    const recentActivity = await sql`
      SELECT ma.*, u.name as user_name
      FROM module_analytics ma
      LEFT JOIN users u ON ma.user_id = u.id
      WHERE ma.module_id = ${moduleId}
      ORDER BY ma.accessed_at DESC
      LIMIT 10
    `;

    res.json({
      summary: analytics[0],
      recentActivity
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user progress analytics
router.get('/users/:id/progress', async (req, res) => {
  try {
    const userId = req.params.id;
    
    const progress = await sql`
      SELECT 
        subject,
        COUNT(*) as modules_accessed,
        COUNT(CASE WHEN completed = true THEN 1 END) as modules_completed,
        AVG(score) as avg_score
      FROM module_analytics ma
      JOIN modules m ON ma.module_id = m.id
      WHERE ma.user_id = ${userId}
      GROUP BY subject
    `;

    const badges = await sql`
      SELECT b.name, b.category, ub.earned_at
      FROM user_badges ub
      JOIN badges b ON ub.badge_id = b.id
      WHERE ub.user_id = ${userId}
      ORDER BY ub.earned_at DESC
    `;

    res.json({
      progress,
      badges,
      totalBadges: badges.length
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Track module access
router.post('/track', async (req, res) => {
  try {
    const { moduleId, userId, timeSpent, completed, score } = req.body;
    
    await sql`
      INSERT INTO module_analytics (module_id, user_id, time_spent, completed, score)
      VALUES (${moduleId}, ${userId}, ${timeSpent || 0}, ${completed || false}, ${score})
      ON CONFLICT (module_id, user_id)
      DO UPDATE SET 
        time_spent = module_analytics.time_spent + ${timeSpent || 0},
        completed = ${completed || false},
        score = COALESCE(${score}, module_analytics.score),
        accessed_at = NOW()
    `;

    res.json({ message: 'Analytics tracked successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get platform overview
router.get('/overview', async (req, res) => {
  try {
    const stats = await sql`
      SELECT 
        (SELECT COUNT(*) FROM users) as total_users,
        (SELECT COUNT(*) FROM modules WHERE published = true) as published_modules,
        (SELECT COUNT(*) FROM badges) as total_badges,
        (SELECT COUNT(*) FROM user_badges) as badges_earned
    `;

    const topModules = await sql`
      SELECT m.title, COUNT(ma.id) as views
      FROM modules m
      LEFT JOIN module_analytics ma ON m.id = ma.module_id
      WHERE m.published = true
      GROUP BY m.id, m.title
      ORDER BY views DESC
      LIMIT 5
    `;

    res.json({
      stats: stats[0],
      topModules
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;