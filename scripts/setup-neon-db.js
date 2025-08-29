#!/usr/bin/env node

import { neon } from '@neondatabase/serverless';
import { config } from 'dotenv';

config({ path: 'env-files/.env.development.local' });

const sql = neon(process.env.DATABASE_URL);

async function setupNeonDatabase() {
  console.log('🗄️ Setting up Neon database schema...');

  try {
    // Create users table
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
        email TEXT UNIQUE NOT NULL,
        name TEXT,
        avatar TEXT,
        role TEXT DEFAULT 'student',
        settings JSONB DEFAULT '{}',
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `;

    // Create badges table
    await sql`
      CREATE TABLE IF NOT EXISTS badges (
        id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
        name TEXT NOT NULL,
        description TEXT,
        category TEXT,
        rarity TEXT,
        points INTEGER DEFAULT 0,
        image_url TEXT,
        model_url TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `;

    // Create user_badges table
    await sql`
      CREATE TABLE IF NOT EXISTS user_badges (
        id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
        badge_id TEXT REFERENCES badges(id) ON DELETE CASCADE,
        earned_at TIMESTAMP DEFAULT NOW(),
        UNIQUE(user_id, badge_id)
      )
    `;

    // Create modules table
    await sql`
      CREATE TABLE IF NOT EXISTS modules (
        id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
        title TEXT NOT NULL,
        description TEXT,
        content TEXT NOT NULL,
        subject TEXT NOT NULL,
        grade_level TEXT,
        difficulty TEXT DEFAULT 'beginner',
        tags TEXT[],
        file_urls TEXT[],
        published BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW(),
        creator_id TEXT REFERENCES users(id) ON DELETE CASCADE
      )
    `;

    // Create progress table
    await sql`
      CREATE TABLE IF NOT EXISTS progress (
        id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
        subject TEXT NOT NULL,
        topic TEXT NOT NULL,
        score INTEGER DEFAULT 0,
        max_score INTEGER DEFAULT 100,
        UNIQUE(user_id, subject, topic)
      )
    `;

    // Create module_analytics table
    await sql`
      CREATE TABLE IF NOT EXISTS module_analytics (
        id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
        module_id TEXT REFERENCES modules(id) ON DELETE CASCADE,
        user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
        time_spent INTEGER DEFAULT 0,
        completed BOOLEAN DEFAULT false,
        score INTEGER,
        accessed_at TIMESTAMP DEFAULT NOW(),
        UNIQUE(module_id, user_id)
      )
    `;

    // Create quizzes table
    await sql`
      CREATE TABLE IF NOT EXISTS quizzes (
        id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
        module_id TEXT REFERENCES modules(id) ON DELETE CASCADE,
        title TEXT NOT NULL,
        questions JSONB NOT NULL,
        answers JSONB NOT NULL,
        points INTEGER DEFAULT 10,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `;

    // Insert sample data
    console.log('📝 Inserting sample data...');

    // Sample user
    await sql`
      INSERT INTO users (id, email, name, role) 
      VALUES ('user-1', 'ahmad@example.com', 'Ahmad Rahman', 'student')
      ON CONFLICT (email) DO NOTHING
    `;

    // Sample badges
    const badges = [
      {
        id: 'innovator',
        name: 'Innovator',
        description: 'Celebrates creative thinking and problem-solving',
        category: 'Innovation',
        rarity: 'Rare',
        points: 200
      },
      {
        id: 'achiever',
        name: 'Achiever',
        description: 'Recognizes outstanding academic performance',
        category: 'Achievement',
        rarity: 'Legendary',
        points: 500
      },
      {
        id: 'collaborator',
        name: 'Collaborator',
        description: 'Excels in teamwork and group projects',
        category: 'Teamwork',
        rarity: 'Common',
        points: 150
      }
    ];

    for (const badge of badges) {
      await sql`
        INSERT INTO badges (id, name, description, category, rarity, points)
        VALUES (${badge.id}, ${badge.name}, ${badge.description}, ${badge.category}, ${badge.rarity}, ${badge.points})
        ON CONFLICT (id) DO NOTHING
      `;
    }

    // Sample module
    await sql`
      INSERT INTO modules (id, title, description, content, subject, grade_level, difficulty, creator_id, published)
      VALUES (
        'module-1',
        'Introduction to Mathematics',
        'Basic mathematical concepts and operations',
        'This module covers fundamental mathematical concepts including addition, subtraction, multiplication, and division.',
        'Mathematics',
        'Primary',
        'beginner',
        'user-1',
        true
      )
      ON CONFLICT (id) DO NOTHING
    `;

    console.log('✅ Neon database setup complete!');
    console.log('📊 Tables created:');
    console.log('  - users');
    console.log('  - badges');
    console.log('  - user_badges');
    console.log('  - modules');
    console.log('  - progress');
    console.log('  - module_analytics');
    console.log('  - quizzes');

  } catch (error) {
    console.error('❌ Database setup failed:', error);
    process.exit(1);
  }
}

setupNeonDatabase();