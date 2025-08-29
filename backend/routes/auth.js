const express = require('express');
const { neon } = require('@neondatabase/serverless');
const { generateToken } = require('../middleware/auth');
const router = express.Router();

const sql = neon(process.env.DATABASE_URL);

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password: _password } = req.body;
    
    // Mock authentication - replace with real password verification
    const users = await sql`SELECT * FROM users WHERE email = ${email}`;
    
    if (users.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const user = users[0];
    const token = generateToken(user);
    
    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Register route
router.post('/register', async (req, res) => {
  try {
    const { email, name, password: _password } = req.body;
    
    const result = await sql`
      INSERT INTO users (email, name, role)
      VALUES (${email}, ${name}, 'student')
      RETURNING *
    `;
    
    const user = result[0];
    const token = generateToken(user);
    
    res.status(201).json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;