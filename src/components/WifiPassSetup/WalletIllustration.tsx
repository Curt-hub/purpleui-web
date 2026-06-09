'use client';
import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

// ─── Types ────────────────────────────────────────────────────────────────────

interface WalletIllustrationProps {
  cardTexture: THREE.CanvasTexture | null;
}

interface WalletSceneProps {
  cardTexture: THREE.CanvasTexture | null;
}

// ─── Scene content (must live inside a Canvas) ────────────────────────────────

function WalletIllustration({ cardTexture }: WalletIllustrationProps) {
  const walletGroupRef = useRef<THREE.Group>(null!);
  const cardMatRef     = useRef<THREE.MeshStandardMaterial>(null!);

  // Slow auto-rotate on Y — applied only to the wallet group
  useFrame(() => {
    walletGroupRef.current.rotation.y += 0.003;
  });

  // Push texture changes into the material without re-rendering
  useEffect(() => {
    if (!cardMatRef.current || !cardTexture) return;
    cardMatRef.current.map = cardTexture;
    cardMatRef.current.needsUpdate = true;
  }, [cardTexture]);

  // All wallet geometry — created once, never re-created
  const walletContent = useMemo(() => (
    <>
      {/* ── Edge / depth illusion (slightly larger, darker, behind body) ── */}
      <RoundedBox
        args={[2.42, 1.72, 0.20]}
        radius={0.14}
        smoothness={4}
        renderOrder={-1}
      >
        <meshStandardMaterial color="#3558B8" />
      </RoundedBox>

      {/* ── Main wallet body ── */}
      <RoundedBox
        args={[2.4, 1.7, 0.22]}
        radius={0.14}
        smoothness={4}
        castShadow
      >
        <meshStandardMaterial color="#4A72D9" roughness={0.15} metalness={0.05} />
      </RoundedBox>

      {/* ── Plastic sheen strip (top highlight) ── */}
      <RoundedBox
        args={[2.35, 0.45, 0.01]}
        radius={0.05}
        smoothness={4}
        position={[0, 0.55, 0.12]}
      >
        <meshStandardMaterial color="#7FA8F5" transparent opacity={0.18} />
      </RoundedBox>

      {/* ── Snap button — outer ring ── */}
      <mesh position={[0.9, 0, 0.12]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color="#D4A827" metalness={0.85} roughness={0.15} />
      </mesh>

      {/* ── Snap button — inner highlight ── */}
      <mesh position={[0.9, 0, 0.12]}>
        <sphereGeometry args={[0.085, 16, 16]} />
        <meshStandardMaterial color="#F0C040" metalness={0.6} roughness={0.2} />
      </mesh>

      {/* ── Card white backing (border) ── */}
      <mesh position={[-0.12, 0.72, 0.18]} rotation={[-0.12, -0.4, 0.23]}>
        <planeGeometry args={[1.92, 1.22]} />
        <meshStandardMaterial color="#ffffff" roughness={0.05} />
      </mesh>

      {/* ── Card face — texture applied via ref ── */}
      <mesh position={[-0.12, 0.72, 0.181]} rotation={[-0.12, -0.4, 0.23]}>
        <planeGeometry args={[1.85, 1.15]} />
        {/*
          ref is captured here once (useMemo [] deps).
          cardMatRef.current is set by React on mount and stays stable.
          useEffect above updates .map whenever cardTexture changes.
        */}
        <meshStandardMaterial ref={cardMatRef} roughness={0.08} metalness={0.0} />
      </mesh>
    </>
  ), []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {/* ── Lighting ── */}
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 6, 4]} intensity={1.4} castShadow />
      <directionalLight position={[-3, 2, -1]} intensity={0.35} color="#a8c4ff" />
      <pointLight position={[0, -3, 2]} intensity={0.2} />

      {/* ── Wallet + card group — everything rotates together ── */}
      <group ref={walletGroupRef} rotation={[-0.15, -0.4, 0.15]}>
        {walletContent}
      </group>

      {/* ── Fake drop shadow ellipse ── */}
      <mesh
        position={[0, -1.4, -0.5]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[1, 0.35, 1]}
      >
        <circleGeometry args={[1.4, 32]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.3} />
      </mesh>
    </>
  );
}

export default WalletIllustration;

// ─── Canvas wrapper ───────────────────────────────────────────────────────────

export function WalletScene({ cardTexture }: WalletSceneProps) {
  return (
    <div style={{ width: '100%', height: 320 }}>
      <Canvas
        style={{ width: '100%', height: '100%' }}
        gl={{ antialias: true, alpha: true }}
        camera={{ fov: 42, position: [0, 0.3, 5] }}
        shadows
      >
        <WalletIllustration cardTexture={cardTexture} />
      </Canvas>
    </div>
  );
}
