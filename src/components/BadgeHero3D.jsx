import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Float } from '@react-three/drei';
import Badge3D from './Badge3D';

// Temporarily disable 3D badges until GLB files are available
const badgeData = [];

// const badgeData = [
//   { id: 1, url: '/models/badge-gold.glb', position: [-2, 0, 0], rarity: 'legendary' },
//   { id: 2, url: '/models/badge-silver.glb', position: [0, 0, 0], rarity: 'epic' },
//   { id: 3, url: '/models/badge-bronze.glb', position: [2, 0, 0], rarity: 'rare' }
// ];

function BadgeScene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.3} />
      
      {badgeData.map((badge, index) => (
        <Float key={badge.id} speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
          <Badge3D
            url={badge.url}
            position={badge.position}
            scale={1.5}
          />
        </Float>
      ))}
      
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        enableRotate={true}
        minDistance={3}
        maxDistance={10}
        autoRotate
        autoRotateSpeed={0.5}
      />
      
      <Environment preset="studio" />
    </>
  );
}

export default function BadgeHero3D() {
  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-white">
        <h1 className="text-6xl font-bold mb-4 text-center">
          Lencana Malaysia
        </h1>
        <p className="text-xl mb-8 text-center max-w-2xl">
          Earn 3D Interactive Badges Through Cross-Curricular Learning
        </p>
        <button className="px-8 py-3 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-400 transition-colors">
          Start Learning
        </button>
      </div>
      
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        className="absolute inset-0"
      >
        <Suspense fallback={null}>
          <BadgeScene />
        </Suspense>
      </Canvas>
    </div>
  );
}