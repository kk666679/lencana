import { neon } from "@neondatabase/serverless";

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is required');
}

const sql = neon(process.env.DATABASE_URL);

export const db = {
  // Users
  async getUsers() {
    return await sql`SELECT * FROM "User"`;
  },
  
  async createUser(email, name) {
    return await sql`
      INSERT INTO "User" (id, email, name, "createdAt", "updatedAt")
      VALUES (gen_random_uuid(), ${email}, ${name}, NOW(), NOW())
      RETURNING *
    `;
  },

  // Badges
  async getBadges() {
    return await sql`SELECT * FROM "Badge"`;
  },
  
  async getUserBadges(userId) {
    return await sql`
      SELECT b.*, ub."earnedAt"
      FROM "Badge" b
      JOIN "UserBadge" ub ON b.id = ub."badgeId"
      WHERE ub."userId" = ${userId}
    `;
  },

  // Progress
  async getProgress(userId) {
    return await sql`
      SELECT * FROM "Progress"
      WHERE "userId" = ${userId}
    `;
  },
  
  async updateProgress(userId, subject, topic, score, maxScore) {
    return await sql`
      INSERT INTO "Progress" (id, "userId", subject, topic, score, "maxScore")
      VALUES (gen_random_uuid(), ${userId}, ${subject}, ${topic}, ${score}, ${maxScore})
      ON CONFLICT ("userId", subject, topic)
      DO UPDATE SET score = ${score}, "maxScore" = ${maxScore}
      RETURNING *
    `;
  }
};