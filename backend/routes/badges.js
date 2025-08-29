const express = require('express');
const router = express.Router();

// Mock database - replace with actual database
const badges = [
  {
    id: 'knowledge-seeker',
    name: 'Knowledge Seeker',
    description: 'Awarded to learners who demonstrate exceptional curiosity and dedication to acquiring new knowledge across various subjects.',
    longDescription: 'The Knowledge Seeker badge recognizes students who consistently show enthusiasm for learning, ask thoughtful questions, and actively seek to understand complex concepts.',
    criteria: [
      'Complete at least 5 learning modules with distinction',
      'Demonstrate active participation in discussions',
      'Show evidence of independent research and learning',
      'Help peers understand difficult concepts'
    ],
    color: '#2E8B57',
    image: '/assets/knowledge_seeker_badge.png',
    model: '/assets/knowledge_seeker_badge.glb',
    category: 'Academic Excellence',
    rarity: 'Common',
    points: 100
  },
  {
    id: 'collaborator',
    name: 'Collaborator',
    description: 'Recognizes students who excel in teamwork and contribute positively to group projects.',
    longDescription: 'The Collaborator badge celebrates students who understand the power of working together.',
    criteria: [
      'Successfully complete 3 group projects as a team member',
      'Demonstrate effective communication skills',
      'Show leadership in collaborative settings',
      'Provide constructive feedback to peers'
    ],
    color: '#FF8C00',
    image: '/assets/collaborator_badge.png',
    model: '/assets/collaborator_badge.glb',
    category: 'Teamwork',
    rarity: 'Common',
    points: 150
  }
];

// GET /api/badges - Get all badges
router.get('/', (req, res) => {
  const { category, rarity } = req.query;
  let filteredBadges = badges;
  
  if (category && category !== 'All') {
    filteredBadges = filteredBadges.filter(badge => badge.category === category);
  }
  
  if (rarity && rarity !== 'All') {
    filteredBadges = filteredBadges.filter(badge => badge.rarity === rarity);
  }
  
  res.json(filteredBadges);
});

// GET /api/badges/:id - Get specific badge
router.get('/:id', (req, res) => {
  const badge = badges.find(b => b.id === req.params.id);
  if (!badge) {
    return res.status(404).json({ error: 'Badge not found' });
  }
  res.json(badge);
});

// GET /api/badges/categories - Get all categories
router.get('/meta/categories', (req, res) => {
  const categories = ['All', ...new Set(badges.map(badge => badge.category))];
  res.json(categories);
});

// GET /api/badges/rarities - Get all rarities
router.get('/meta/rarities', (req, res) => {
  const rarities = ['All', ...new Set(badges.map(badge => badge.rarity))];
  res.json(rarities);
});

module.exports = router;