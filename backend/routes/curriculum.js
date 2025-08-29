const express = require('express');
const router = express.Router();

// Curriculum-aligned badges with Malaysian national honors
const curriculumBadges = [
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
    image: '/assets/datuk_seri_maharaja_lela.png',
    model: '/assets/datuk_seri_maharaja_lela.glb',
    category: 'National Identity',
    rarity: 'Legendary',
    points: 500,
    curriculum: {
      subjects: ['Sejarah', 'Pendidikan Sivik', 'Bahasa Malaysia', 'English'],
      levels: ['Tingkatan 4', 'Tingkatan 5'],
      kssr_alignment: 'Theme: Malaysian Identity and Heritage',
      kssm_alignment: 'Standard 2.1: National Unity and Integration'
    },
    learning_outcomes: [
      'Analyze the significance of national honors in Malaysian society',
      'Demonstrate understanding of civic responsibility and national service',
      'Apply Rukun Negara principles in daily life',
      'Communicate effectively in multiple languages about national identity'
    ],
    cross_curricular_activities: [
      {
        subject: 'Sejarah',
        activity: 'Research historical recipients and their contributions to independence',
        assessment: 'Historical timeline with critical analysis'
      },
      {
        subject: 'Bahasa Malaysia',
        activity: 'Write reflective essay on the meaning of national service',
        assessment: 'Structured essay with proper language conventions'
      },
      {
        subject: 'English',
        activity: 'Present findings to international audience via video project',
        assessment: 'Multimedia presentation with peer evaluation'
      },
      {
        subject: 'Pendidikan Sivik',
        activity: 'Design community service project inspired by award recipients',
        assessment: 'Project proposal and implementation plan'
      }
    ]
  }
];

// GET /api/curriculum/badges - Get curriculum-aligned badges
router.get('/badges', (req, res) => {
  const { subject, level, category } = req.query;
  let filteredBadges = curriculumBadges;
  
  if (subject && subject !== 'All') {
    filteredBadges = filteredBadges.filter(badge => 
      badge.curriculum.subjects.includes(subject)
    );
  }
  
  if (level && level !== 'All') {
    filteredBadges = filteredBadges.filter(badge => 
      badge.curriculum.levels.some(l => l.includes(level))
    );
  }
  
  if (category && category !== 'All') {
    filteredBadges = filteredBadges.filter(badge => badge.category === category);
  }
  
  res.json(filteredBadges);
});

// GET /api/curriculum/badges/:id - Get specific curriculum badge
router.get('/badges/:id', (req, res) => {
  const badge = curriculumBadges.find(b => b.id === req.params.id);
  if (!badge) {
    return res.status(404).json({ error: 'Curriculum badge not found' });
  }
  res.json(badge);
});

// GET /api/curriculum/subjects - Get all subjects
router.get('/subjects', (req, res) => {
  const subjects = [
    'Bahasa Malaysia', 'English', 'Mandarin', 'Tamil',
    'Sejarah', 'Pendidikan Sivik', 'Pendidikan Islam', 'Pendidikan Moral',
    'Mathematics', 'Science', 'ICT', 'Design & Technology',
    'Visual Arts', 'Music'
  ];
  res.json(subjects);
});

// GET /api/curriculum/levels - Get education levels
router.get('/levels', (req, res) => {
  const levels = [
    'Tahun 1-3', 'Tahun 4-6', 'Tingkatan 1-3', 'Tingkatan 4-5'
  ];
  res.json(levels);
});

// POST /api/curriculum/assessment - Submit assessment for badge activity
router.post('/assessment', (req, res) => {
  const { userId, badgeId, activityId, submission, score } = req.body;
  
  // Mock assessment storage - replace with actual database
  const assessment = {
    id: `assessment-${Date.now()}`,
    userId,
    badgeId,
    activityId,
    submission,
    score,
    submittedAt: new Date().toISOString(),
    status: score >= 70 ? 'passed' : 'needs_improvement'
  };
  
  res.json(assessment);
});

// GET /api/curriculum/analytics - Get curriculum analytics
router.get('/analytics', (req, res) => {
  const analytics = {
    total_badges: curriculumBadges.length,
    subjects_covered: new Set(curriculumBadges.flatMap(b => b.curriculum.subjects)).size,
    kssr_aligned: curriculumBadges.filter(b => b.curriculum.kssr_alignment).length,
    kssm_aligned: curriculumBadges.filter(b => b.curriculum.kssm_alignment).length,
    cross_curricular_activities: curriculumBadges.reduce((sum, b) => sum + b.cross_curricular_activities.length, 0),
    learning_outcomes: curriculumBadges.reduce((sum, b) => sum + b.learning_outcomes.length, 0)
  };
  
  res.json(analytics);
});

module.exports = router;