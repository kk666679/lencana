import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { config } from 'dotenv';
import pkg from 'pg';
const { Client } = pkg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
config();

async function runMigrations() {
  if (!process.env.DATABASE_URL) {
    console.log('⚠️  DATABASE_URL not found, skipping migrations');
    return;
  }

  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    console.log('Connected to database');

    // Create migrations table if it doesn't exist
    await client.query(`
      CREATE TABLE IF NOT EXISTS migrations (
        id SERIAL PRIMARY KEY,
        filename VARCHAR(255) NOT NULL UNIQUE,
        executed_at TIMESTAMPTZ DEFAULT NOW()
      )
    `);

    const migrations = [
      '001_create_neon_auth_users_sync.sql',
      '002_users_sync_helper_functions.sql'
    ];

    for (const migration of migrations) {
      // Check if migration already executed
      const result = await client.query(
        'SELECT id FROM migrations WHERE filename = $1',
        [migration]
      );

      if (result.rows.length === 0) {
        console.log(`Running migration: ${migration}`);
        
        const sql = readFileSync(
          join(__dirname, 'migrations', migration),
          'utf8'
        );
        
        await client.query(sql);
        
        await client.query(
          'INSERT INTO migrations (filename) VALUES ($1)',
          [migration]
        );
        
        console.log(`✓ Migration ${migration} completed`);
      } else {
        console.log(`⏭ Migration ${migration} already executed`);
      }
    }

    console.log('All migrations completed successfully');
  } catch (error) {
    console.error('Migration error:', error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

runMigrations();