import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

export async function createModule(formData) {
  const title = formData.get('title');
  const description = formData.get('description');
  const content = formData.get('content');
  const subject = formData.get('subject');
  const gradeLevel = formData.get('gradeLevel');
  const difficulty = formData.get('difficulty');
  const tags = formData.get('tags')?.split(',').map(tag => tag.trim()) || [];
  const creatorId = formData.get('creatorId');
  const published = formData.get('published') === 'true';

  const result = await sql`
    INSERT INTO modules (title, description, content, subject, grade_level, difficulty, tags, creator_id, published)
    VALUES (${title}, ${description}, ${content}, ${subject}, ${gradeLevel}, ${difficulty}, ${tags}, ${creatorId}, ${published})
    RETURNING *
  `;
  return result[0];
}

export async function updateModule(moduleId, formData) {
  const title = formData.get('title');
  const description = formData.get('description');
  const content = formData.get('content');
  const subject = formData.get('subject');
  const gradeLevel = formData.get('gradeLevel');
  const difficulty = formData.get('difficulty');
  const tags = formData.get('tags')?.split(',').map(tag => tag.trim()) || [];
  const published = formData.get('published') === 'true';

  const result = await sql`
    UPDATE modules 
    SET title = ${title}, description = ${description}, content = ${content}, 
        subject = ${subject}, grade_level = ${gradeLevel}, difficulty = ${difficulty},
        tags = ${tags}, published = ${published}, updated_at = NOW()
    WHERE id = ${moduleId}
    RETURNING *
  `;
  return result[0];
}

export async function deleteModule(moduleId) {
  await sql`DELETE FROM modules WHERE id = ${moduleId}`;
}

export async function getModulesByCreator(creatorId) {
  return await sql`
    SELECT * FROM modules 
    WHERE creator_id = ${creatorId}
    ORDER BY updated_at DESC
  `;
}

export async function getPublishedModules(subject = null, gradeLevel = null) {
  let query = sql`SELECT * FROM modules WHERE published = true`;
  
  if (subject) {
    query = sql`SELECT * FROM modules WHERE published = true AND subject = ${subject}`;
  }
  
  if (gradeLevel) {
    query = sql`SELECT * FROM modules WHERE published = true AND grade_level = ${gradeLevel}`;
  }
  
  return await query;
}

export async function trackModuleAccess(moduleId, userId) {
  await sql`
    INSERT INTO module_analytics (module_id, user_id, accessed_at)
    VALUES (${moduleId}, ${userId}, NOW())
    ON CONFLICT (module_id, user_id)
    DO UPDATE SET accessed_at = NOW()
  `;
}