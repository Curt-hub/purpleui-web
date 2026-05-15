'use client';
import { Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

export interface SceneProps {
  autoRotate?: boolean;
  interactive?: boolean;
}

function WifiPassModel() {
  const { scene } = useGLTF('/models/wifi-pass.glb?v=4');

  useEffect(() => {
    scene.traverse((child) => {
      if (!(child as THREE.Mesh).isMesh) return;
      const mesh = child as THREE.Mesh;
      const isEdge = (Array.isArray(mesh.material) ? mesh.material : [mesh.material])
        .some(m => (m as THREE.Material).name === 'PassEdge');
      const color = isEdge ? '#5a3de8' : '#7458fd';
      const newMat = new THREE.MeshStandardMaterial({
        color,
        emissive: color,
        emissiveIntensity: 0.5,
        roughness: 0.4,
        metalness: 0.1,
      });
      mesh.material = newMat;
    });
  }, [scene]);

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
      <directionalLight position={[-2, -2, 2]} intensity={1} />
      <Suspense fallback={null}>
        <WifiPassModel />
      </Suspense>
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

useGLTF.preload('/models/wifi-pass.glb?v=4');
