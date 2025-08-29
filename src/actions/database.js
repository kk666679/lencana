import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

export async function createUser(formData) {
  const email = formData.get('email');
  const name = formData.get('name');
  
  const result = await sql`
    INSERT INTO users (email, name) 
    VALUES (${email}, ${name}) 
    RETURNING *
  `;
  return result[0];
}

export async function createComment(formData) {
  const comment = formData.get('comment');
  await sql`INSERT INTO comments (comment) VALUES (${comment})`;
}

export async function updateProgress(userId, subject, topic, score) {
  await sql`
    INSERT INTO progress (user_id, subject, topic, score)
    VALUES (${userId}, ${subject}, ${topic}, ${score})
    ON CONFLICT (user_id, subject, topic)
    DO UPDATE SET score = ${score}
  `;
}

export async function awardBadge(userId, badgeId) {
  await sql`
    INSERT INTO user_badges (user_id, badge_id)
    VALUES (${userId}, ${badgeId})
    ON CONFLICT (user_id, badge_id) DO NOTHING
  `;
}