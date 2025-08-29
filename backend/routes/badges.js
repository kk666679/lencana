const express = require('express');
const { neon } = require('@neondatabase/serverless');
const { authenticateUser, authorizeRole } = require('../middleware/auth');
const router = express.Router();

const sql = neon(process.env.DATABASE_URL);

// Convert ES6 export to CommonJS for backend compatibility
const badgesData = [
  {
    id: 'datuk-seri-maharaja-lela',
    name: 'Datuk Seri Maharaja Lela',
    description: 'Highest federal award recognizing exceptional service to the nation and embodiment of Malaysian values.',
    longDescription: 'The Datuk Seri Maharaja Lela represents the pinnacle of national service, awarded to individuals who have made extraordinary contributions to Malaysia.',
    criteria: [
      'Complete cross-curricular project on Malaysian national heroes',
      'Demonstrate understanding of Rukun Negara principles',
      'Lead community service initiative',
      'Present bilingual research on national identity'
    ],
    color: '#FFD700',
    image: '/src/assets/datuk_seri_maharaja_lela.png',
    model: '/src/assets/datuk_seri_maharaja_lela.glb',
    category: 'National Identity',
    rarity: 'Legendary',
    points: 500
  },
  {
    id: 'collaborator',
    name: 'Collaborator',
    description: 'Recognizes students who excel in teamwork and contribute positively to group projects and collaborative learning environments.',
    longDescription: 'The Collaborator badge celebrates students who understand the power of working together.',
    criteria: [
      'Successfully complete 3 group projects as a team member',
      'Demonstrate effective communication skills',
      'Show leadership in collaborative settings',
      'Provide constructive feedback to peers'
    ],
    color: '#FF8C00',
    image: '/src/assets/collaborator_badge.png',
    model: '/src/assets/collaborator_badge.glb',
    category: 'Teamwork',
    rarity: 'Common',
    points: 150
  },
  {
    id: 'innovator',
    name: 'Innovator',
    description: 'Celebrates creative thinking and the ability to develop unique solutions to challenges and problems.',
    longDescription: 'The Innovator badge honors students who think outside the box and bring fresh perspectives to problem-solving.',
    criteria: [
      'Develop an original project or solution',
      'Demonstrate creative problem-solving skills',
      'Present innovative ideas to the community',
      'Show willingness to experiment and take calculated risks'
    ],
    color: '#8A2BE2',
    image: '/src/assets/innovator_badge.png',
    model: '/src/assets/innovator_badge.glb',
    category: 'Innovation',
    rarity: 'Rare',
    points: 200
  },
  {
    id: 'community-leader',
    name: 'Community Leader',
    description: 'Honors students who take initiative in leading community projects and inspiring positive change.',
    longDescription: 'The Community Leader badge recognizes students who step up to make a difference in their school and broader community.',
    criteria: [
      'Lead a community service project',
      'Mentor junior students or peers',
      'Organize school or community events',
      'Demonstrate consistent leadership qualities'
    ],
    color: '#DC143C',
    image: '/src/assets/community_leader_badge.png',
    model: '/src/assets/community_leader_badge.glb',
    category: 'Leadership',
    rarity: 'Epic',
    points: 300
  },
  {
    id: 'mentor',
    name: 'Mentor',
    description: 'Awarded to students who guide and support their peers in their learning journey with patience and wisdom.',
    longDescription: 'The Mentor badge celebrates students who dedicate time and effort to helping others succeed.',
    criteria: [
      'Provide tutoring or academic support to peers',
      'Demonstrate patience and empathy in teaching',
      'Show consistent availability to help others',
      'Receive positive feedback from mentees'
    ],
    color: '#228B22',
    image: '/src/assets/mentor_badge.png',
    model: '/src/assets/mentor_badge.glb',
    category: 'Service',
    rarity: 'Rare',
    points: 250
  },
  {
    id: 'achiever',
    name: 'Achiever',
    description: 'Recognizes outstanding academic performance and the successful completion of challenging goals.',
    longDescription: 'The Achiever badge honors students who set high standards for themselves and consistently meet or exceed their goals.',
    criteria: [
      'Maintain excellent academic performance',
      'Complete all assignments on time with high quality',
      'Achieve personal learning goals',
      'Demonstrate consistent effort and dedication'
    ],
    color: '#FFD700',
    image: '/src/assets/achiever_badge.png',
    model: '/src/assets/achiever_badge.glb',
    category: 'Achievement',
    rarity: 'Legendary',
    points: 500
  }
];

// GET /api/badges - Get all badges
router.get('/', async (req, res) => {
  try {
    const { category, rarity } = req.query;
    let query = 'SELECT * FROM badges WHERE 1=1';
    const params = [];

    if (category && category !== 'All') {
      query += ' AND category = $' + (params.length + 1);
      params.push(category);
    }
    if (rarity && rarity !== 'All') {
      query += ' AND rarity = $' + (params.length + 1);
      params.push(rarity);
    }

    query += ' ORDER BY created_at DESC';
    
    const badges = await sql(query, params);
    res.json(badges.length > 0 ? badges : badgesData);
  } catch (error) {
    res.json(badgesData); // Fallback to static data
  }
});

// GET /api/badges/:id - Get specific badge
router.get('/:id', (req, res) => {
  const badge = badgesData.find(b => b.id === req.params.id);
  if (!badge) {
    return res.status(404).json({ error: 'Badge not found' });
  }
  res.json(badge);
});

// GET /api/badges/categories - Get all categories
router.get('/meta/categories', (req, res) => {
  const categories = ['All', ...new Set(badgesData.map(badge => badge.category))];
  res.json(categories);
});

// GET /api/badges/rarities - Get all rarities
router.get('/meta/rarities', (req, res) => {
  const rarities = ['All', ...new Set(badgesData.map(badge => badge.rarity))];
  res.json(rarities);
});

module.exports = router;