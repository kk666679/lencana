export const curriculumBadges = [
  {
    id: 'pingat-jasa-malaysia',
    name: 'Pingat Jasa Malaysia (PJM)',
    description: 'Federal award recognizing meritorious service to Malaysia across various fields.',
    longDescription: 'The Pingat Jasa Malaysia celebrates individuals who have contributed significantly to national development through their professional excellence and community service. This badge encourages students to explore diverse career paths while maintaining strong civic values.',
    criteria: [
      'Complete interdisciplinary project connecting science and national development',
      'Demonstrate mathematical analysis of Malaysian development statistics',
      'Create artistic representation of Malaysian achievements',
      'Present findings in multiple languages'
    ],
    color: '#C0392B',
    image: '/src/assets/pingat_jasa_malaysia.png',
    model: '/models/badge-gold.glb',
    category: 'Cross-Curricular Excellence',
    rarity: 'Epic',
    points: 300,
    curriculum: {
      subjects: ['Mathematics', 'Science', 'Visual Arts', 'Bahasa Malaysia', 'English'],
      levels: ['Tahun 4', 'Tahun 5', 'Tahun 6'],
      kssr_alignment: 'Theme: Science, Technology and Innovation',
      kssm_alignment: 'Standard 3.2: Scientific Thinking and Innovation'
    },
    learning_outcomes: [
      'Apply mathematical concepts to analyze national development data',
      'Investigate scientific contributions to Malaysian progress',
      'Express understanding through creative visual arts',
      'Communicate findings effectively in bilingual format'
    ],
    cross_curricular_activities: [
      {
        subject: 'Mathematics',
        activity: 'Analyze GDP growth, population statistics, and development indices'
      },
      {
        subject: 'Science',
        activity: 'Research Malaysian scientists and their contributions to national development'
      },
      {
        subject: 'Visual Arts',
        activity: 'Design infographic showcasing Malaysian achievements in STEM'
      },
      {
        subject: 'Bahasa Malaysia',
        activity: 'Interview local community leaders about national service'
      },
      {
        subject: 'English',
        activity: 'Create presentation for international school exchange program'
      }
    ]
  },
  {
    id: 'ahli-mangku-negara',
    name: 'Ahli Mangku Negara (AMN)',
    description: 'State award recognizing distinguished service and contribution to community development.',
    longDescription: 'The Ahli Mangku Negara honors individuals who have made significant contributions to their communities and states. This badge connects students to local heritage while building understanding of civic responsibility and community leadership.',
    criteria: [
      'Research local historical figures and their contributions',
      'Conduct community needs assessment using ICT tools',
      'Design technology solution for local community issue',
      'Demonstrate moral leadership in school activities'
    ],
    color: '#8E44AD',
    image: '/src/assets/ahli_mangku_negara.png',
    model: '/models/knowledge_seeker_badge.glb',
    category: 'Community Leadership',
    rarity: 'Rare',
    points: 200,
    curriculum: {
      subjects: ['ICT', 'Design & Technology', 'Pendidikan Moral', 'Sejarah Tempatan'],
      levels: ['Tingkatan 1', 'Tingkatan 2', 'Tingkatan 3'],
      kssr_alignment: 'Theme: Community and Environment',
      kssm_alignment: 'Standard 4.1: Digital Citizenship and Community Engagement'
    },
    learning_outcomes: [
      'Utilize ICT tools for community research and analysis',
      'Apply design thinking to solve local community challenges',
      'Demonstrate moral reasoning and ethical decision-making',
      'Connect local history to broader national narratives'
    ],
    cross_curricular_activities: [
      {
        subject: 'ICT',
        activity: 'Create digital survey and analyze community needs data'
      },
      {
        subject: 'Design & Technology',
        activity: 'Prototype solution for identified community problem'
      },
      {
        subject: 'Pendidikan Moral',
        activity: 'Reflect on ethical implications of community leadership'
      },
      {
        subject: 'Sejarah',
        activity: 'Document oral history from local community elders'
      }
    ]
  },
  {
    id: 'kesatria-mangku-negara',
    name: 'Kesatria Mangku Negara (KMN)',
    description: 'Federal award for exceptional bravery, leadership, and service to the nation.',
    longDescription: 'The Kesatria Mangku Negara recognizes acts of courage and exceptional leadership in service to Malaysia. This badge inspires students to develop leadership skills, moral courage, and commitment to serving others.',
    criteria: [
      'Lead school-wide initiative promoting unity and diversity',
      'Demonstrate understanding of Islamic/Universal values in leadership',
      'Create multilingual presentation on Malaysian diversity',
      'Organize interfaith/intercultural dialogue activity'
    ],
    color: '#E74C3C',
    image: '/src/assets/kesatria_mangku_negara.png',
    model: '/models/community_leader_badge.glb',
    category: 'Leadership & Unity',
    rarity: 'Epic',
    points: 350,
    curriculum: {
      subjects: ['Pendidikan Islam', 'Pendidikan Moral', 'Bahasa Malaysia', 'English', 'Mandarin', 'Tamil'],
      levels: ['Tingkatan 3', 'Tingkatan 4', 'Tingkatan 5'],
      kssr_alignment: 'Theme: Unity in Diversity',
      kssm_alignment: 'Standard 1.3: Multicultural Understanding and Harmony'
    },
    learning_outcomes: [
      'Demonstrate leadership skills in diverse group settings',
      'Apply religious/moral principles to contemporary challenges',
      'Communicate effectively across cultural and linguistic boundaries',
      'Foster understanding and respect among different communities'
    ],
    cross_curricular_activities: [
      {
        subject: 'Pendidikan Islam/Moral',
        activity: 'Explore shared values across different faith traditions'
      },
      {
        subject: 'Bahasa Malaysia',
        activity: 'Facilitate discussion on national unity in mother tongue'
      },
      {
        subject: 'English',
        activity: 'Moderate international online forum on diversity'
      },
      {
        subject: 'Mandarin/Tamil',
        activity: 'Translate unity messages for community outreach'
      }
    ]
  }
];

export const curriculumCategories = [
  'All',
  'National Identity',
  'Cross-Curricular Excellence', 
  'Community Leadership',
  'Leadership & Unity',
  'Scientific Innovation',
  'Cultural Heritage',
  'Digital Citizenship'
];

export const educationLevels = [
  'All',
  'Tahun 1-3',
  'Tahun 4-6', 
  'Tingkatan 1-3',
  'Tingkatan 4-5'
];

export const subjects = [
  'Bahasa Malaysia',
  'English',
  'Mandarin',
  'Tamil',
  'Sejarah',
  'Pendidikan Sivik',
  'Pendidikan Islam',
  'Pendidikan Moral',
  'Mathematics',
  'Science',
  'ICT',
  'Design & Technology',
  'Visual Arts',
  'Music'
];