#!/usr/bin/env node

import { readdir, stat, unlink, rmdir } from 'fs/promises';
import { join } from 'path';

class RepoOptimizer {
  constructor() {
    this.cleaned = {
      files: 0,
      size: 0,
      directories: 0
    };
  }

  async optimize() {
    console.log('🧹 Starting repository optimization...');
    
    await this.cleanTempFiles();
    await this.cleanDuplicates();
    await this.cleanEmptyDirs();
    
    this.generateReport();
  }

  async cleanTempFiles() {
    const tempPatterns = [
      '.DS_Store', 'Thumbs.db', '*.tmp', '*.temp',
      'npm-debug.log*', 'yarn-debug.log*', 'yarn-error.log*'
    ];
    
    await this.cleanByPatterns(tempPatterns, process.cwd());
  }

  async cleanDuplicates() {
    // Remove duplicate GLB files if PNG versions exist
    const modelsDir = join(process.cwd(), 'public/models');
    const assetsDir = join(process.cwd(), 'src/assets');
    
    try {
      const models = await readdir(modelsDir);
      const assets = await readdir(assetsDir);
      
      for (const model of models) {
        if (model.endsWith('.glb')) {
          const baseName = model.replace('.glb', '');
          const pngExists = assets.some(asset => 
            asset.startsWith(baseName) && asset.endsWith('.png')
          );
          
          if (pngExists && model !== 'badge-gold.glb') {
            // Keep GLB files as they're needed for 3D rendering
            console.log(`✓ Keeping ${model} (needed for 3D rendering)`);
          }
        }
      }
    } catch (error) {
      console.log('No duplicate cleanup needed');
    }
  }

  async cleanByPatterns(patterns, dir) {
    try {
      const items = await readdir(dir);
      
      for (const item of items) {
        const fullPath = join(dir, item);
        const stats = await stat(fullPath);
        
        if (stats.isDirectory()) {
          if (!this.shouldSkipDir(item)) {
            await this.cleanByPatterns(patterns, fullPath);
          }
        } else {
          if (this.matchesPattern(item, patterns)) {
            await this.removeFile(fullPath, stats.size);
          }
        }
      }
    } catch (error) {
      // Directory doesn't exist or no permission
    }
  }

  async cleanEmptyDirs() {
    await this.removeEmptyDirectories(process.cwd());
  }

  async removeEmptyDirectories(dir) {
    try {
      const items = await readdir(dir);
      
      for (const item of items) {
        const fullPath = join(dir, item);
        const stats = await stat(fullPath);
        
        if (stats.isDirectory() && !this.shouldSkipDir(item)) {
          await this.removeEmptyDirectories(fullPath);
          
          // Check if directory is now empty
          const remainingItems = await readdir(fullPath);
          if (remainingItems.length === 0) {
            await rmdir(fullPath);
            this.cleaned.directories++;
            console.log(`🗑️  Removed empty directory: ${fullPath}`);
          }
        }
      }
    } catch (error) {
      // Directory doesn't exist or not empty
    }
  }

  async removeFile(filePath, size) {
    try {
      await unlink(filePath);
      this.cleaned.files++;
      this.cleaned.size += size;
      console.log(`🗑️  Removed: ${filePath}`);
    } catch (error) {
      console.log(`❌ Failed to remove: ${filePath}`);
    }
  }

  shouldSkipDir(dirName) {
    const skipDirs = [
      'node_modules', '.git', '.vite', 'dist', 'build',
      'src', 'public', 'config', 'docs', 'database',
      'scripts', 'backend', 'prisma'
    ];
    return skipDirs.includes(dirName);
  }

  matchesPattern(fileName, patterns) {
    return patterns.some(pattern => {
      if (pattern.includes('*')) {
        const regex = new RegExp(pattern.replace('*', '.*'));
        return regex.test(fileName);
      }
      return fileName === pattern;
    });
  }

  formatSize(bytes) {
    const units = ['B', 'KB', 'MB', 'GB'];
    let size = bytes;
    let unitIndex = 0;
    
    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }
    
    return `${size.toFixed(1)} ${units[unitIndex]}`;
  }

  generateReport() {
    console.log('\n✅ Optimization Complete!');
    console.log('========================');
    console.log(`Files removed: ${this.cleaned.files}`);
    console.log(`Directories removed: ${this.cleaned.directories}`);
    console.log(`Space saved: ${this.formatSize(this.cleaned.size)}`);
    
    if (this.cleaned.files === 0 && this.cleaned.directories === 0) {
      console.log('🎉 Repository is already optimized!');
    }
  }
}

async function main() {
  const optimizer = new RepoOptimizer();
  await optimizer.optimize();
}

main().catch(console.error);