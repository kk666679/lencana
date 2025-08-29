import { Canvas } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

export default function Badge3DModel({ modelPath }) {
  const { scene } = useGLTF(modelPath);

  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <primitive object={scene} />
    </Canvas>
  );
}

useGLTF.preload(modelPath);
