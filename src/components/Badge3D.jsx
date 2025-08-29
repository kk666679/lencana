import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

export default function Badge3D({ url, position = [0, 0, 0], scale = 1, rotation = [0, 0, 0], animate = true }) {
  const meshRef = useRef();
  
  // Use fallback for missing GLB files
  let scene;
  try {
    const gltf = useGLTF(url);
    scene = gltf.scene;
  } catch (error) {
    console.warn('GLB file not found:', url);
    return null;
  }

  useFrame((state) => {
    if (meshRef.current && animate) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <primitive
      ref={meshRef}
      object={scene.clone()}
      position={position}
      scale={scale}
      rotation={rotation}
    />
  );
}

// Preload GLB files (commented out until files are available)
// useGLTF.preload('/models/badge-gold.glb');
// useGLTF.preload('/models/badge-silver.glb');
// useGLTF.preload('/models/badge-bronze.glb');