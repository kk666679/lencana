# 3D GLB Badge System

## Overview

The Lencana platform includes a comprehensive 3D badge system that analyzes, updates, and previews GLB badge files with interactive 3D rendering.

## Features

### 🔍 GLB Analysis
- **Mesh Analysis**: Extract geometry, vertices, and structure data
- **Material Properties**: Analyze textures, colors, metalness, roughness
- **Texture Information**: Size, format, and quality assessment
- **Animation Detection**: Identify embedded animations

### ⚙️ Badge Updates
- **Color Modification**: Change badge colors dynamically
- **Material Properties**: Adjust metalness and roughness
- **Texture Replacement**: Upload and apply new textures
- **Property Export**: Save updated badge configurations

### 🎨 3D Preview System
- **Interactive Hero Section**: Rotating 3D badges with orbit controls
- **Real-time Rendering**: WebGL-powered smooth animations
- **Multiple Badge Display**: Grid and carousel arrangements
- **Performance Optimization**: LOD and texture compression

## Components

### GLBAnalyzer Class
```javascript
const analyzer = new GLBAnalyzer();
const result = await analyzer.analyzeGLB('/models/badge.glb');
```

### Badge3D Component
```jsx
<Badge3D 
  url="/models/badge-gold.glb" 
  position={[0, 0, 0]} 
  scale={1.5} 
  animate={true} 
/>
```

### BadgeHero3D Component
```jsx
<BadgeHero3D />
```

## File Structure

```
public/models/
├── badge-gold.glb
├── badge-silver.glb
├── badge-bronze.glb
└── badge-platinum.glb
```

## Usage

### 1. Upload GLB Files
- Navigate to `/studio`
- Upload `.glb` badge files
- Automatic analysis and property extraction

### 2. Update Badge Properties
- Modify colors, materials, and textures
- Real-time preview of changes
- Export updated configurations

### 3. Preview in Hero Section
- Interactive 3D badge display
- Orbit controls for user interaction
- Smooth animations and lighting

## Technical Implementation

### Dependencies
- `three.js` - 3D rendering engine
- `@react-three/fiber` - React Three.js renderer
- `@react-three/drei` - Three.js helpers and controls
- `GLTFLoader` - GLB/GLTF file loading

### Performance Features
- **Preloading**: Badge models preloaded for smooth experience
- **Suspense**: Loading states for 3D components
- **Environment Mapping**: Studio lighting for realistic rendering
- **Auto-rotation**: Continuous badge animation

## Routes

- `/` - 3D Badge Hero Section
- `/studio` - GLB Badge Management
- `/badges` - Badge Explorer with 3D previews

## Integration

The 3D badge system integrates with:
- **Module System**: Link badges to learning modules
- **Progress Tracking**: Award badges based on achievements
- **User Profiles**: Display earned 3D badges
- **Analytics**: Track badge engagement and interaction