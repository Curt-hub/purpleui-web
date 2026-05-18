'use client';
import { Canvas } from '@react-three/fiber';
import { RoundedBox, OrbitControls } from '@react-three/drei';

export interface SceneProps {
  autoRotate?: boolean;
  interactive?: boolean;
}

export default function PU3DPassCardScene({ autoRotate = false, interactive = false }: SceneProps) {
  return (
    <Canvas
      style={{ position: 'absolute', inset: 0 }}
      gl={{ alpha: true, antialias: true }}
      camera={{ fov: 38, position: [0, 0, 3.0] }}
    >
      <ambientLight intensity={3} />
      <directionalLight position={[2, 4, 3]} intensity={1} />
      <RoundedBox args={[1.57, 0.96, 0.05]} radius={0.06} smoothness={4}>
        <meshStandardMaterial
          color="#7458fd"
          roughness={0.82}
          metalness={0}
          emissive="#7458fd"
          emissiveIntensity={0.4}
        />
      </RoundedBox>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={autoRotate}
        autoRotateSpeed={1.8}
        enabled={interactive || autoRotate}
        minPolarAngle={Math.PI * 0.1}
        maxPolarAngle={Math.PI * 0.9}
      />
    </Canvas>
  );
}
