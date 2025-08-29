'use client';

import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls } from '@react-three/drei';
import { useRef } from 'react';

function Model({ modelPath }) {
  const { scene } = useGLTF(modelPath);
  const modelRef = useRef();

  // Simple rotation animation
  if (modelRef.current) {
    modelRef.current.rotation.y += 0.01;
  }

  return <primitive ref={modelRef} object={scene} scale={0.5} />;
}

export default function Badge3DPreview({ modelPath }) {
  return (
    <div className="badge-3d-preview">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Model modelPath={modelPath} />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
      
      <style jsx>{`
        .badge-3d-preview {
          width: 100%;
          height: 180px;
          position: relative;
        }
      `}</style>
    </div>
  );
}
