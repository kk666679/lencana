import { neon } from "@neondatabase/serverless";

// Mock data for development when DATABASE_URL is not available
const mockData = {
  users: [
    { id: 'user-1', email: 'ahmad@example.com', name: 'Ahmad Rahman', createdAt: new Date(), updatedAt: new Date() }
  ],
  badges: [
    { id: 'badge-1', name: 'Innovator', description: 'Creative problem solver', category: 'Innovation', rarity: 'Rare', points: 200 },
    { id: 'badge-2', name: 'Collaborator', description: 'Team player', category: 'Teamwork', rarity: 'Common', points: 150 },
    { id: 'badge-3', name: 'Achiever', description: 'Goal oriented', category: 'Achievement', rarity: 'Legendary', points: 500 }
  ],
  userBadges: [
    { userId: 'user-1', badgeId: 'badge-1', earnedAt: new Date() },
    { userId: 'user-1', badgeId: 'badge-2', earnedAt: new Date() }
  ],
  progress: [
    { userId: 'user-1', subject: 'Mathematics', topic: 'Algebra', score: 85, maxScore: 100 },
    { userId: 'user-1', subject: 'Science', topic: 'Physics', score: 92, maxScore: 100 },
    { userId: 'user-1', subject: 'History', topic: 'Malaysian History', score: 78, maxScore: 100 }
  ]
};

const isDevelopment = !import.meta.env.VITE_DATABASE_URL && !process.env.DATABASE_URL;
const sql = isDevelopment ? null : neon(import.meta.env.VITE_DATABASE_URL || process.env.DATABASE_URL);

export const db = {
  // Users
  async getUsers() {
    if (isDevelopment) return mockData.users;
    return await sql`SELECT * FROM "User"`;
  },
  
  async createUser(email, name) {
    if (isDevelopment) {
      const newUser = { id: `user-${Date.now()}`, email, name, createdAt: new Date(), updatedAt: new Date() };
      mockData.users.push(newUser);
      return [newUser];
    }
    return await sql`
      INSERT INTO "User" (id, email, name, "createdAt", "updatedAt")
      VALUES (gen_random_uuid(), ${email}, ${name}, NOW(), NOW())
      RETURNING *
    `;
  },

  // Badges
  async getBadges() {
    if (isDevelopment) return mockData.badges;
    return await sql`SELECT * FROM "Badge"`;
  },
  
  async getUserBadges(userId) {
    if (isDevelopment) {
      return mockData.userBadges
        .filter(ub => ub.userId === userId)
        .map(ub => {
          const badge = mockData.badges.find(b => b.id === ub.badgeId);
          return { ...badge, earnedAt: ub.earnedAt };
        });
    }
    return await sql`
      SELECT b.*, ub."earnedAt"
      FROM "Badge" b
      JOIN "UserBadge" ub ON b.id = ub."badgeId"
      WHERE ub."userId" = ${userId}
    `;
  },

  // Progress
  async getProgress(userId) {
    if (isDevelopment) {
      return mockData.progress.filter(p => p.userId === userId);
    }
    return await sql`
      SELECT * FROM "Progress"
      WHERE "userId" = ${userId}
    `;
  },
  
  async updateProgress(userId, subject, topic, score, maxScore) {
    if (isDevelopment) {
      const existing = mockData.progress.findIndex(p => p.userId === userId && p.subject === subject && p.topic === topic);
      const newProgress = { userId, subject, topic, score, maxScore };
      if (existing >= 0) {
        mockData.progress[existing] = newProgress;
      } else {
        mockData.progress.push(newProgress);
      }
      return [newProgress];
    }
    return await sql`
      INSERT INTO "Progress" (id, "userId", subject, topic, score, "maxScore")
      VALUES (gen_random_uuid(), ${userId}, ${subject}, ${topic}, ${score}, ${maxScore})
      ON CONFLICT ("userId", subject, topic)
      DO UPDATE SET score = ${score}, "maxScore" = ${maxScore}
      RETURNING *
    `;
  }
};