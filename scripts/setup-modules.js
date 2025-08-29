#!/usr/bin/env node

import { neon } from '@neondatabase/serverless';
import { config } from 'dotenv';

config({ path: '.env.development.local' });

const sql = neon(process.env.DATABASE_URL);

async function setupModuleTables() {
  console.log('🗄️ Setting up module tables...');

  try {
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
        creator_id TEXT NOT NULL
      )
    `;

    // Create quizzes table
    await sql`
      CREATE TABLE IF NOT EXISTS quizzes (
        id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
        module_id TEXT NOT NULL,
        title TEXT NOT NULL,
        questions TEXT NOT NULL,
        answers TEXT NOT NULL,
        points INTEGER DEFAULT 10,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `;

    // Create module analytics table
    await sql`
      CREATE TABLE IF NOT EXISTS module_analytics (
        id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
        module_id TEXT NOT NULL,
        user_id TEXT NOT NULL,
        time_spent INTEGER DEFAULT 0,
        completed BOOLEAN DEFAULT false,
        score INTEGER,
        accessed_at TIMESTAMP DEFAULT NOW(),
        UNIQUE(module_id, user_id)
      )
    `;

    // Update users table to include role
    await sql`
      ALTER TABLE users 
      ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'student'
    `;

    console.log('✅ Module tables setup complete!');
  } catch (error) {
    console.error('❌ Module tables setup failed:', error);
  }
}

setupModuleTables();