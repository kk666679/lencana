#!/usr/bin/env node

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🚀 Starting Lencana Malaysia Development Environment...\n');

// Start backend server
console.log('📡 Starting backend server...');
const backend = spawn('npm', ['run', 'dev'], {
  cwd: join(__dirname, '../backend'),
  stdio: 'inherit',
  shell: true
});

// Start frontend server
console.log('🎨 Starting frontend server...');
const frontend = spawn('npm', ['run', 'dev'], {
  cwd: join(__dirname, '..'),
  stdio: 'inherit',
  shell: true
});

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down development servers...');
  backend.kill();
  frontend.kill();
  process.exit();
});

backend.on('close', (code) => {
  // Sanitize code to prevent log injection
  const sanitizedCode = typeof code === 'number' ? code : 'unknown';
  console.log(`Backend server exited with code ${sanitizedCode}`);
});

frontend.on('close', (code) => {
  // Sanitize code to prevent log injection
  const sanitizedCode = typeof code === 'number' ? code : 'unknown';
  console.log(`Frontend server exited with code ${sanitizedCode}`);
});