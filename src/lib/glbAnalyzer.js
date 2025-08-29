import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export class GLBAnalyzer {
  constructor() {
    this.loader = new GLTFLoader();
  }

  async analyzeGLB(url) {
    return new Promise((resolve, reject) => {
      this.loader.load(url, (gltf) => {
        const analysis = {
          meshes: [],
          materials: [],
          textures: [],
          animations: gltf.animations.map(anim => anim.name),
          metadata: gltf.userData || {}
        };

        gltf.scene.traverse((child) => {
          if (child.isMesh) {
            analysis.meshes.push({
              name: child.name,
              geometry: child.geometry.type,
              vertices: child.geometry.attributes.position?.count || 0
            });

            if (child.material) {
              const material = {
                name: child.material.name,
                type: child.material.type,
                color: child.material.color?.getHex(),
                metalness: child.material.metalness,
                roughness: child.material.roughness
              };

              if (child.material.map) {
                analysis.textures.push({
                  name: child.material.map.name,
                  size: `${child.material.map.image?.width}x${child.material.map.image?.height}`
                });
              }

              analysis.materials.push(material);
            }
          }
        });

        resolve({ gltf, analysis });
      }, undefined, reject);
    });
  }

  updateBadgeProperties(gltf, updates) {
    gltf.scene.traverse((child) => {
      if (child.isMesh && child.material) {
        // Update colors
        if (updates.color) {
          child.material.color.setHex(updates.color);
        }

        // Update material properties
        if (updates.metalness !== undefined) {
          child.material.metalness = updates.metalness;
        }
        if (updates.roughness !== undefined) {
          child.material.roughness = updates.roughness;
        }

        // Update texture
        if (updates.texture) {
          const textureLoader = new THREE.TextureLoader();
          textureLoader.load(updates.texture, (texture) => {
            child.material.map = texture;
            child.material.needsUpdate = true;
          });
        }
      }
    });

    return gltf;
  }

  exportGLB(gltf) {
    // Note: GLTFExporter would be needed for actual export
    // For now, return the modified scene
    return gltf.scene;
  }
}