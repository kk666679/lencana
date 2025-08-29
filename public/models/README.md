# 3D Badge Models

This directory contains GLB (GL Transmission Format Binary) files for the Lencana Malaysia 3D badge system.

## Available Models

| Badge | File | Category | Rarity |
|-------|------|----------|--------|
| Datuk Seri Maharaja Lela | `achiever_badge.glb` | National Identity | Legendary |
| Collaborator | `collaborator_badge.glb` | Teamwork | Common |
| Innovator | `innovator_badge.glb` | Innovation | Rare |
| Community Leader | `community_leader_badge.glb` | Leadership | Epic |
| Mentor | `mentor_badge.glb` | Service | Rare |
| Knowledge Seeker | `knowledge_seeker_badge.glb` | Achievement | Common |
| Gold Badge | `badge-gold.glb` | Generic | Legacy |

## Usage

Models are loaded via Three.js useGLTF hook:
```javascript
const { scene } = useGLTF('/models/badge_name.glb');
```

## Technical Specs

- **Format**: GLB (Binary GLTF)
- **Optimization**: Web-optimized for fast loading
- **Textures**: Embedded PBR materials
- **Animation**: Compatible with Three.js animations
- **Size**: Optimized for web delivery (<500KB each)

## Integration

All models are referenced in `/src/data/badges.js` and rendered through the `Badge3D.jsx` component with automatic fallback to geometric shapes if models fail to load.