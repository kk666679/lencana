const express = require('express');
const { neon } = require('@neondatabase/serverless');
const { authenticateUser, authorizeRole: _authorizeRole } = require('../middleware/auth');
const router = express.Router();

const sql = neon(process.env.DATABASE_URL);

// Get all modules
router.get('/', async (req, res) => {
  try {
    const { creatorId, subject, gradeLevel, published } = req.query;
    let query = 'SELECT * FROM modules WHERE 1=1';
    const params = [];

    if (creatorId) {
      query += ' AND creator_id = $' + (params.length + 1);
      params.push(creatorId);
    }
    if (subject) {
      query += ' AND subject = $' + (params.length + 1);
      params.push(subject);
    }
    if (gradeLevel) {
      query += ' AND grade_level = $' + (params.length + 1);
      params.push(gradeLevel);
    }
    if (published !== undefined) {
      query += ' AND published = $' + (params.length + 1);
      params.push(published === 'true');
    }

    query += ' ORDER BY updated_at DESC';
    
    const modules = await sql(query, params);
    res.json(modules);
  } catch (_error) {
    res.status(500).json({ error: 'Failed to fetch modules' });
  }
});

// Get single module
router.get('/:id', async (req, res) => {
  try {
    const modules = await sql`
      SELECT m.*, u.name as creator_name 
      FROM modules m 
      LEFT JOIN users u ON m.creator_id = u.id 
      WHERE m.id = ${req.params.id}
    `;
    
    if (modules.length === 0) {
      return res.status(404).json({ error: 'Module not found' });
    }

    res.json(modules[0]);
  } catch (_error) {
    res.status(500).json({ error: 'Module not found' });
  }
});

// Create module
router.post('/', async (req, res) => {
  try {
    const { title, description, content, subject, gradeLevel, difficulty, tags, creatorId, published } = req.body;
    
    const result = await sql`
      INSERT INTO modules (title, description, content, subject, grade_level, difficulty, tags, creator_id, published)
      VALUES (${title}, ${description}, ${content}, ${subject}, ${gradeLevel}, ${difficulty}, ${tags}, ${creatorId}, ${published || false})
      RETURNING *
    `;
    
    res.status(201).json(result[0]);
  } catch (_error) {
    res.status(500).json({ error: 'Failed to create module' });
  }
});

// Update module
router.put('/:id', async (req, res) => {
  try {
    const { title, description, content, subject, gradeLevel, difficulty, tags, published } = req.body;
    
    const result = await sql`
      UPDATE modules 
      SET title = ${title}, description = ${description}, content = ${content},
          subject = ${subject}, grade_level = ${gradeLevel}, difficulty = ${difficulty},
          tags = ${tags}, published = ${published}, updated_at = NOW()
      WHERE id = ${req.params.id}
      RETURNING *
    `;
    
    if (result.length === 0) {
      return res.status(404).json({ error: 'Module not found' });
    }
    
    res.json(result[0]);
  } catch (_error) {
    res.status(500).json({ error: 'Failed to update module' });
  }
});

// Delete module
router.delete('/:id', async (req, res) => {
  try {
    const result = await sql`DELETE FROM modules WHERE id = ${req.params.id} RETURNING id`;
    
    if (result.length === 0) {
      return res.status(404).json({ error: 'Module not found' });
    }
    
    res.json({ message: 'Module deleted successfully' });
  } catch (_error) {
    res.status(500).json({ error: 'Failed to delete module' });
  }
});

module.exports = router;