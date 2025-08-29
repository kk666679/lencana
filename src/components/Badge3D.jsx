import { useRef, Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

function BadgeModel({ url, position, scale, rotation, animate }) {
  const meshRef = useRef();
  
  try {
    const { scene } = useGLTF(url);
    
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
  } catch (error) {
    console.warn('GLB file not found:', url);
    return (
      <mesh ref={meshRef} position={position} scale={scale} rotation={rotation}>
        <boxGeometry args={[1, 1, 0.2]} />
        <meshStandardMaterial color="#FFD700" />
      </mesh>
    );
  }
}

export default function Badge3D({ url, position = [0, 0, 0], scale = 1, rotation = [0, 0, 0], animate = true }) {
  return (
    <Suspense fallback={
      <mesh position={position} scale={scale} rotation={rotation}>
        <boxGeometry args={[1, 1, 0.2]} />
        <meshStandardMaterial color="#cccccc" />
      </mesh>
    }>
      <BadgeModel url={url} position={position} scale={scale} rotation={rotation} animate={animate} />
    </Suspense>
  );
}