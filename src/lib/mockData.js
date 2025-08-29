// Mock data for development when database is not available
export const mockBadges = [
  {
    id: 'innovator',
    name: 'Innovator',
    description: 'Celebrates creative thinking and unique solutions',
    category: 'Innovation',
    rarity: 'Rare',
    points: 200,
    earnedAt: new Date('2024-01-15')
  },
  {
    id: 'collaborator', 
    name: 'Collaborator',
    description: 'Excels in teamwork and group projects',
    category: 'Teamwork',
    rarity: 'Common',
    points: 150,
    earnedAt: new Date('2024-01-10')
  },
  {
    id: 'achiever',
    name: 'Achiever', 
    description: 'Outstanding academic performance',
    category: 'Achievement',
    rarity: 'Legendary',
    points: 500,
    earnedAt: null
  }
];

export const mockProgress = [
  {
    subject: 'Mathematics',
    topic: 'Algebra',
    score: 85,
    maxScore: 100
  },
  {
    subject: 'Science', 
    topic: 'Physics',
    score: 92,
    maxScore: 100
  },
  {
    subject: 'History',
    topic: 'Malaysian History', 
    score: 78,
    maxScore: 100
  },
  {
    subject: 'English',
    topic: 'Literature',
    score: 88,
    maxScore: 100
  }
];

export const mockUser = {
  id: 'user-1',
  name: 'Ahmad Rahman',
  email: 'ahmad@example.com',
  avatar: '/default-avatar.png',
  joinDate: '2024-01-15',
  role: 'student'
};