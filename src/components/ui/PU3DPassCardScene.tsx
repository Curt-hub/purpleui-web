'use client';
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls } from '@react-three/drei';

export interface SceneProps {
  autoRotate?: boolean;
  interactive?: boolean;
}

function PassCard() {
  const { scene } = useGLTF('/models/pass-card.glb');
  return (
    <group rotation={[Math.PI / 2, 0, 0]}>
      <primitive object={scene} />
    </group>
  );
}

export default function PU3DPassCardScene({ autoRotate = false, interactive = false }: SceneProps) {
  return (
    <Canvas
      style={{ position: 'absolute', inset: 0 }}
      gl={{ alpha: true, antialias: true }}
      camera={{ fov: 38, position: [0, 0, 2.4] }}
    >
      <ambientLight intensity={3} />
      <directionalLight position={[2, 4, 3]} intensity={2} />
      <Suspense fallback={null}>
        <PassCard />
      </Suspense>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={autoRotate}
        autoRotateSpeed={1.8}
        enabled={interactive || autoRotate}
        minPolarAngle={Math.PI * 0.25}
        maxPolarAngle={Math.PI * 0.75}
      />
    </Canvas>
  );
}

useGLTF.preload('/models/pass-card.glb');
