#!/usr/bin/env node

import { readdir, stat } from 'fs/promises';
import { join } from 'path';

const ASSETS_DIR = './src/assets';
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

async function analyzeAssets() {
  console.log('🔍 Analyzing 3D assets...\n');
  
  try {
    const files = await readdir(ASSETS_DIR);
    const glbFiles = files.filter(f => f.endsWith('.glb'));
    
    for (const file of glbFiles) {
      const filePath = join(ASSETS_DIR, file);
      const stats = await stat(filePath);
      
      console.log(`📦 ${file}`);
      console.log(`   Size: ${(stats.size / 1024 / 1024).toFixed(2)} MB`);
      
      if (stats.size > MAX_FILE_SIZE) {
        console.log(`   ⚠️  Large file - consider compression`);
      } else {
        console.log(`   ✅ Size OK`);
      }
      console.log();
    }
    
    console.log(`📊 Total GLB files: ${glbFiles.length}`);
    
  } catch (error) {
    console.error('Error analyzing assets:', error.message);
  }
}

analyzeAssets();