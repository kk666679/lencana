// Malaysian National Badges and Honors Database
// Organized by category and cross-curricular subjects

export const badgeCategories = [
  'Federal Honors',
  'Military Awards',
  'Service Medals',
  'State Awards',
  'Academic Excellence',
  'Cultural Heritage',
  'Environmental Stewardship',
  'Community Service',
  'Leadership',
  'Innovation',
  'Mentorship'
];

export const badgeSubjects = [
  'History',
  'Science',
  'Mathematics',
  'Language Arts',
  'Moral Education',
  'Visual Arts',
  'Technology',
  'Islamic Studies',
  'Civics',
  'Geography'
];

export const badges = [
  // Existing badges
  {
    id: 'smn-001',
    name: 'Seri Maharaja Mangku Negara (SMN)',
    category: 'Federal Honors',
    subjects: ['History', 'Moral Education', 'Language Arts'],
    description: 'The Most Exalted Order of the Defender of the Realm, awarded for eminent service to Malaysia.',
    criteria: 'Exceptional service to the nation, significant contributions to national development',
    image: '/badges/smn.png',
    difficulty: 'Very High',
    points: 1000,
    historicalContext: 'Established in 1958, this is one of Malaysia\'s highest honors, recognizing those who have made outstanding contributions to the nation.',
    notableRecipients: ['Tunku Abdul Rahman', 'Tun Dr. Mahathir Mohamad'],
    learningObjectives: [
      'Understand the significance of national honors',
      'Analyze contributions of notable recipients',
      'Connect historical events to national development'
    ]
  },
  {
    id: 'pjm-001',
    name: 'Pingat Jasa Malaysia (PJM)',
    category: 'Service Medals',
    subjects: ['History', 'Moral Education', 'Science'],
    description: 'Malaysian Service Medal awarded for service during the Malayan Emergency and Indonesian Confrontation.',
    criteria: 'Service during conflict periods, contribution to national security',
    image: '/badges/pjm.png',
    difficulty: 'High',
    points: 800,
    historicalContext: 'Awarded to recognize service during periods of national conflict and emergency.',
    notableRecipients: ['Military veterans', 'Emergency service personnel'],
    learningObjectives: [
      'Study historical conflicts in Malaysian history',
      'Understand the role of service and sacrifice',
      'Connect science and technology in conflict resolution'
    ]
  },
  {
    id: 'ams-001',
    name: 'Anugerah Melayu Sarawak',
    category: 'State Awards',
    subjects: ['History', 'Cultural Heritage', 'Language Arts'],
    description: 'Sarawak Malay Award for contributions to Malay culture and heritage in Sarawak.',
    criteria: 'Preservation of cultural heritage, promotion of Malay language and traditions',
    image: '/badges/ams.png',
    difficulty: 'Medium',
    points: 600,
    historicalContext: 'Recognizes efforts to preserve and promote Sarawak Malay cultural heritage.',
    notableRecipients: ['Cultural activists', 'Language preservationists'],
    learningObjectives: [
      'Explore regional cultural diversity',
      'Study language preservation efforts',
      'Connect cultural heritage to national identity'
    ]
  },
  {
    id: 'esa-001',
    name: 'Environmental Stewardship Award',
    category: 'Environmental Stewardship',
    subjects: ['Science', 'Moral Education', 'Technology'],
    description: 'Award for outstanding contributions to environmental conservation and sustainability.',
    criteria: 'Environmental conservation efforts, sustainable practices, community education',
    image: '/badges/esa.png',
    difficulty: 'Medium',
    points: 700,
    historicalContext: 'Recognizes individuals and organizations working towards environmental sustainability.',
    notableRecipients: ['Environmental activists', 'Conservation organizations'],
    learningObjectives: [
      'Understand environmental challenges',
      'Study sustainable practices',
      'Connect technology to environmental solutions'
    ]
  },
  {
    id: 'ysa-001',
    name: 'Young Scientist Award',
    category: 'Academic Excellence',
    subjects: ['Science', 'Mathematics', 'Technology'],
    description: 'Award for young scientists demonstrating exceptional research and innovation.',
    criteria: 'Scientific research, innovation, academic excellence',
    image: '/badges/ysa.png',
    difficulty: 'High',
    points: 900,
    historicalContext: 'Encourages scientific innovation among young Malaysians.',
    notableRecipients: ['Young researchers', 'Science competition winners'],
    learningObjectives: [
      'Explore scientific research methods',
      'Study innovation processes',
      'Connect mathematics to scientific discovery'
    ]
  },
  
  // New badges
  {
    id: 'ks-001',
    name: 'Knowledge Seeker',
    category: 'Academic Excellence',
    subjects: ['Science', 'Mathematics', 'Language Arts'],
    description: 'Awarded to students who demonstrate exceptional curiosity and dedication to learning across multiple subjects.',
    criteria: 'Consistently ask insightful questions, complete all learning modules with excellence, show initiative in research projects',
    image: '/badges/knowledge-seeker.png',
    difficulty: 'Medium',
    points: 750,
    historicalContext: 'Inspired by the Malaysian tradition of valuing education and knowledge as pathways to personal and national development.',
    notableRecipients: ['Top academic performers', 'Research competition winners'],
    learningObjectives: [
      'Develop critical thinking skills',
      'Cultivate a love for lifelong learning',
      'Apply knowledge across different subject areas'
    ],
    rarity: 'Rare'
  },
  {
    id: 'collab-001',
    name: 'Collaborator',
    category: 'Community Service',
    subjects: ['Moral Education', 'Civics', 'History'],
    description: 'Recognizes students who excel in teamwork and collaborative projects that benefit their school or community.',
    criteria: 'Lead or significantly contribute to group projects, demonstrate effective communication and conflict resolution skills, show empathy and support for team members',
    image: '/badges/collaborator.png',
    difficulty: 'Medium',
    points: 700,
    historicalContext: 'Reflects the Malaysian value of "gotong royong" (community cooperation) which is fundamental to building strong communities.',
    notableRecipients: ['Student council leaders', 'Community service project coordinators'],
    learningObjectives: [
      'Develop leadership and teamwork skills',
      'Practice effective communication',
      'Understand the importance of community service'
    ],
    rarity: 'Uncommon'
  },
  {
    id: 'innov-001',
    name: 'Innovator',
    category: 'Innovation',
    subjects: ['Technology', 'Science', 'Mathematics'],
    description: 'Awarded to students who create original solutions to real-world problems through creative thinking and application of knowledge.',
    criteria: 'Develop a working prototype or solution, demonstrate creative problem-solving, present innovation to peers or community',
    image: '/badges/innovator.png',
    difficulty: 'High',
    points: 900,
    historicalContext: 'Aligned with Malaysia\'s vision to become a high-income nation driven by innovation and technology.',
    notableRecipients: ['Science fair winners', 'Young inventors'],
    learningObjectives: [
      'Apply design thinking processes',
      'Develop technical and creative skills',
      'Understand the innovation-to-implementation process'
    ],
    rarity: 'Rare'
  },
  {
    id: 'cl-001',
    name: 'Community Leader',
    category: 'Leadership',
    subjects: ['Civics', 'History', 'Moral Education'],
    description: 'Honors students who demonstrate exceptional leadership in organizing and executing community service initiatives.',
    criteria: 'Initiate and lead community service projects, inspire others to participate, demonstrate measurable positive impact',
    image: '/badges/community-leader.png',
    difficulty: 'High',
    points: 850,
    historicalContext: 'Based on the Malaysian tradition of community leadership and social responsibility.',
    notableRecipients: ['Student organization presidents', 'Community service award recipients'],
    learningObjectives: [
      'Develop organizational and leadership skills',
      'Understand civic engagement and responsibility',
      'Practice project management and execution'
    ],
    rarity: 'Rare'
  },
  {
    id: 'mentor-001',
    name: 'Mentor',
    category: 'Mentorship',
    subjects: ['Moral Education', 'Language Arts', 'Civics'],
    description: 'Recognizes students who consistently help their peers learn and grow through guidance and support.',
    criteria: 'Regularly assist classmates with learning challenges, demonstrate patience and empathy, contribute to a positive learning environment',
    image: '/badges/mentor.png',
    difficulty: 'Medium',
    points: 650,
    historicalContext: 'Reflects the Malaysian cultural value of respecting teachers and knowledge transfer from one generation to another.',
    notableRecipients: ['Peer tutors', 'Study group leaders'],
    learningObjectives: [
      'Develop communication and teaching skills',
      'Practice empathy and patience',
      'Understand the value of knowledge sharing'
    ],
    rarity: 'Uncommon'
  },
  {
    id: 'achieve-001',
    name: 'Achiever',
    category: 'Leadership',
    subjects: ['All Subjects'],
    description: 'The highest honor awarded to students who demonstrate excellence across all areas of learning and character development.',
    criteria: 'Earn multiple badges across different categories, maintain high academic standards, demonstrate outstanding character and citizenship',
    image: '/badges/achiever.png',
    difficulty: 'Very High',
    points: 1000,
    historicalContext: 'Represents the pinnacle of Malaysian educational values combining academic excellence, character, and service.',
    notableRecipients: ['Valedictorians', 'National level competition winners'],
    learningObjectives: [
      'Strive for excellence in all endeavors',
      'Develop well-rounded character and skills',
      'Understand the connection between personal achievement and national development'
    ],
    rarity: 'Legendary'
  }
];

// Additional utility functions
export const getBadgesBySubject = (subject) => {
  return badges.filter(badge => badge.subjects.includes(subject));
};

export const getBadgesByCategory = (category) => {
  return badges.filter(badge => badge.category === category);
};

export const getBadgeById = (id) => {
  return badges.find(badge => badge.id === id);
};

export const getAllSubjects = () => {
  const allSubjects = new Set();
  badges.forEach(badge => {
    badge.subjects.forEach(subject => allSubjects.add(subject));
  });
  return Array.from(allSubjects);
};

// New utility functions for the new features
export const getBadgesByRarity = (rarity) => {
  return badges.filter(badge => badge.rarity === rarity);
};

export const getRarityLevels = () => {
  const rarities = new Set();
  badges.forEach(badge => {
    if (badge.rarity) rarities.add(badge.rarity);
  });
  return Array.from(rarities);
};
