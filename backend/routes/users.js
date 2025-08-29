const express = require('express');
const router = express.Router();

// Mock user storage
let users = {};

// POST /api/users - Create or get user
router.post('/', (req, res) => {
  const { id, name, email } = req.body;
  
  if (!users[id]) {
    users[id] = {
      id,
      name,
      email,
      createdAt: new Date().toISOString(),
      lastActive: new Date().toISOString()
    };
  } else {
    users[id].lastActive = new Date().toISOString();
  }
  
  res.json(users[id]);
});

// GET /api/users/:id - Get user by ID
router.get('/:id', (req, res) => {
  const user = users[req.params.id];
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json(user);
});

module.exports = router;