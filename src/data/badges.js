export const badges = [
  {
    id: 'datuk-seri-maharaja-lela',
    name: 'Datuk Seri Maharaja Lela',
    description: 'Highest federal award recognizing exceptional service to the nation and embodiment of Malaysian values.',
    longDescription: 'The Datuk Seri Maharaja Lela represents the pinnacle of national service, awarded to individuals who have made extraordinary contributions to Malaysia. This badge connects students to the highest ideals of citizenship, service, and national identity.',
    criteria: [
      'Complete cross-curricular project on Malaysian national heroes',
      'Demonstrate understanding of Rukun Negara principles',
      'Lead community service initiative',
      'Present bilingual research on national identity'
    ],
    color: '#FFD700',
    image: '/src/assets/achiever_badge.png',
    model: '/src/assets/achiever_badge.glb',
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
        activity: 'Research historical recipients and their contributions to independence'
      },
      {
        subject: 'Bahasa Malaysia',
        activity: 'Write reflective essay on the meaning of national service'
      },
      {
        subject: 'English',
        activity: 'Present findings to international audience via video project'
      },
      {
        subject: 'Pendidikan Sivik',
        activity: 'Design community service project inspired by award recipients'
      }
    ]
  },
  {
    id: 'collaborator',
    name: 'Collaborator',
    description: 'Recognizes students who excel in teamwork and contribute positively to group projects and collaborative learning environments.',
    longDescription: 'The Collaborator badge celebrates students who understand the power of working together. These individuals contribute meaningfully to group projects, support their teammates, and help create inclusive learning environments where everyone can succeed.',
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
    longDescription: 'The Innovator badge honors students who think outside the box and bring fresh perspectives to problem-solving. These creative minds challenge conventional thinking and inspire others with their innovative approaches to learning and life.',
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
    longDescription: 'The Community Leader badge recognizes students who step up to make a difference in their school and broader community. These natural leaders organize events, mentor others, and work tirelessly to create positive impact wherever they go.',
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
    longDescription: 'The Mentor badge celebrates students who dedicate time and effort to helping others succeed. These compassionate individuals share their knowledge generously and create supportive learning environments for their peers.',
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
    longDescription: 'The Achiever badge honors students who set high standards for themselves and consistently meet or exceed their goals. These dedicated individuals demonstrate perseverance, discipline, and a commitment to excellence in all their endeavors.',
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

export const categories = [
  'All',
  'Academic Excellence',
  'Teamwork',
  'Innovation',
  'Leadership',
  'Service',
  'Achievement'
];

export const rarities = [
  'All',
  'Common',
  'Rare',
  'Epic',
  'Legendary'
];

