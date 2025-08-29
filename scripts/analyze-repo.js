#!/usr/bin/env node

import { readdir, stat, readFile } from 'fs/promises';
import { join } from 'path';

class RepoAnalyzer {
  constructor() {
    this.stats = {
      totalFiles: 0,
      totalSize: 0,
      fileTypes: {},
      directories: {},
      duplicates: [],
      largeFiles: [],
      issues: []
    };
  }

  async analyzeDirectory(dirPath, basePath = '') {
    try {
      const items = await readdir(dirPath);
      
      for (const item of items) {
        const fullPath = join(dirPath, item);
        const relativePath = join(basePath, item);
        
        if (this.shouldSkip(item)) continue;
        
        const stats = await stat(fullPath);
        
        if (stats.isDirectory()) {
          this.stats.directories[relativePath] = { files: 0, size: 0 };
          await this.analyzeDirectory(fullPath, relativePath);
        } else {
          await this.analyzeFile(fullPath, relativePath, stats);
        }
      }
    } catch (error) {
      this.stats.issues.push(`Error analyzing ${dirPath}: ${error.message}`);
    }
  }

  async analyzeFile(filePath, relativePath, stats) {
    this.stats.totalFiles++;
    this.stats.totalSize += stats.size;
    
    const ext = this.getExtension(relativePath);
    this.stats.fileTypes[ext] = (this.stats.fileTypes[ext] || 0) + 1;
    
    // Track large files (>1MB)
    if (stats.size > 1024 * 1024) {
      this.stats.largeFiles.push({
        path: relativePath,
        size: this.formatSize(stats.size)
      });
    }
    
    // Check for potential issues
    await this.checkFileIssues(filePath, relativePath);
  }

  async checkFileIssues(filePath, relativePath) {
    try {
      if (relativePath.includes('node_modules')) return;
      
      // Check for duplicate configs
      if (this.isConfigFile(relativePath)) {
        const content = await readFile(filePath, 'utf8');
        if (content.length < 50) {
          this.stats.issues.push(`Potentially empty config: ${relativePath}`);
        }
      }
      
      // Check for unused files
      if (relativePath.endsWith('.js') || relativePath.endsWith('.jsx')) {
        const content = await readFile(filePath, 'utf8');
        if (content.includes('// TODO') || content.includes('FIXME')) {
          this.stats.issues.push(`TODO/FIXME found in: ${relativePath}`);
        }
      }
    } catch (error) {
      // Ignore read errors for binary files
    }
  }

  shouldSkip(item) {
    const skipPatterns = [
      'node_modules', '.git', '.vite', 'dist', 'build',
      '.DS_Store', 'Thumbs.db', '*.log'
    ];
    return skipPatterns.some(pattern => 
      item.includes(pattern.replace('*', ''))
    );
  }

  isConfigFile(path) {
    const configFiles = [
      'package.json', 'vite.config.js', 'tailwind.config.js',
      'eslint.config.js', '.prettierrc', 'vercel.json'
    ];
    return configFiles.some(config => path.includes(config));
  }

  getExtension(filePath) {
    const ext = filePath.split('.').pop();
    return ext === filePath ? 'no-ext' : ext;
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
    return {
      summary: {
        totalFiles: this.stats.totalFiles,
        totalSize: this.formatSize(this.stats.totalSize),
        directories: Object.keys(this.stats.directories).length
      },
      fileTypes: Object.entries(this.stats.fileTypes)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 10),
      largeFiles: this.stats.largeFiles.slice(0, 10),
      issues: this.stats.issues,
      recommendations: this.generateRecommendations()
    };
  }

  generateRecommendations() {
    const recommendations = [];
    
    // Check for too many config files
    const configCount = Object.keys(this.stats.fileTypes).filter(ext => 
      ['json', 'js', 'config'].includes(ext)
    ).length;
    
    if (configCount > 10) {
      recommendations.push('Consider consolidating configuration files');
    }
    
    // Check for large assets
    if (this.stats.largeFiles.length > 5) {
      recommendations.push('Optimize large files or move to CDN');
    }
    
    // Check for duplicate file types
    const jsFiles = (this.stats.fileTypes.js || 0) + (this.stats.fileTypes.jsx || 0);
    if (jsFiles > 100) {
      recommendations.push('Consider code splitting for large codebase');
    }
    
    return recommendations;
  }
}

async function main() {
  const analyzer = new RepoAnalyzer();
  console.log('🔍 Analyzing repository structure...');
  
  await analyzer.analyzeDirectory(process.cwd());
  const report = analyzer.generateReport();
  
  console.log('\n📊 Repository Analysis Report');
  console.log('================================');
  console.log(`Total Files: ${report.summary.totalFiles}`);
  console.log(`Total Size: ${report.summary.totalSize}`);
  console.log(`Directories: ${report.summary.directories}`);
  
  console.log('\n📁 Top File Types:');
  report.fileTypes.forEach(([ext, count]) => {
    console.log(`  ${ext}: ${count} files`);
  });
  
  if (report.largeFiles.length > 0) {
    console.log('\n📦 Large Files:');
    report.largeFiles.forEach(file => {
      console.log(`  ${file.path} (${file.size})`);
    });
  }
  
  if (report.issues.length > 0) {
    console.log('\n⚠️  Issues Found:');
    report.issues.forEach(issue => {
      console.log(`  • ${issue}`);
    });
  }
  
  if (report.recommendations.length > 0) {
    console.log('\n💡 Recommendations:');
    report.recommendations.forEach(rec => {
      console.log(`  • ${rec}`);
    });
  }
}

main().catch(console.error);