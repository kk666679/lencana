#!/usr/bin/env node

import { neon } from '@neondatabase/serverless';
import { config } from 'dotenv';

config({ path: 'env-files/.env.development.local' });

const sql = neon(process.env.DATABASE_URL);

async function setupDatabase() {
  console.log('🗄️ Setting up Lencana database...');

  try {
    // Create comments table for testing
    await sql`CREATE TABLE IF NOT EXISTS comments (comment TEXT)`;
    
    // Create main tables
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
        email TEXT UNIQUE NOT NULL,
        name TEXT,
        avatar TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS badges (
        id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
        name TEXT NOT NULL,
        description TEXT,
        category TEXT,
        rarity TEXT,
        points INTEGER DEFAULT 0,
        image_url TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS user_badges (
        id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id TEXT REFERENCES users(id),
        badge_id TEXT REFERENCES badges(id),
        earned_at TIMESTAMP DEFAULT NOW(),
        UNIQUE(user_id, badge_id)
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS progress (
        id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id TEXT REFERENCES users(id),
        subject TEXT NOT NULL,
        topic TEXT NOT NULL,
        score INTEGER DEFAULT 0,
        max_score INTEGER DEFAULT 100,
        UNIQUE(user_id, subject, topic)
      )
    `;

    console.log('✅ Database setup complete!');
  } catch (error) {
    console.error('❌ Database setup failed:', error);
  }
}

setupDatabase();