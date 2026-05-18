'use client';
import { PU3DPassCard } from '@/components/ui/PU3DPassCard';
import { ComponentPreview } from '@/components/docs/ComponentPreview';
import { PhoneFrame } from '@/components/docs/PhoneFrame';
import { PropsTable } from '@/components/docs/PropsTable';
import { colors } from '@/lib/tokens';
import { useState } from 'react';

const props = [
  { name: 'autoRotate',  type: 'boolean', default: 'false', description: 'Slowly spin the card on the Y-axis.' },
  { name: 'interactive', type: 'boolean', default: 'false', description: 'Let the user drag and orbit the card freely.' },
  { name: 'className',   type: 'string',  default: 'undefined', description: 'Optional class name on the container div.' },
];

export default function ThreeDPassCardPage() {
  const [isDark, setIsDark] = useState(false);

  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">3D Pass Card</h1>
      <p className="text-gray-500 mb-8">
        A hardware-accelerated WebGL render of the Purple WiFi Pass using Three.js + React Three
        Fiber. Drag to orbit the card or enable auto-rotate. Loaded client-side only — zero SSR
        bundle impact.
      </p>

      {/* ── In Context ── */}
      <div className="mb-12">
        <h2 className="text-lg font-bold text-primary mb-5">In Context</h2>
        <PhoneFrame label="3D Pass Card — drag to orbit" dark={isDark} onToggle={() => setIsDark(d => !d)}>
          <div style={{ position: 'absolute', inset: 0, background: isDark ? colors.backgroundNavy : colors.backgroundElevated }} />
          <div style={{ position: 'absolute', top: 40, left: 20, right: 20 }}>
            <PU3DPassCard interactive />
          </div>
        </PhoneFrame>
      </div>

      {/* ── Interactive Playground ── */}
      <h2 className="text-lg font-bold text-primary mb-2">Interactive Playground</h2>
      <p className="text-sm text-gray-500 mb-4">
        Click and drag the card to orbit it freely in 3D.
      </p>
      <ComponentPreview label="Drag to orbit" bg="gray">
        <div style={{ width: 360 }}>
          <PU3DPassCard interactive />
        </div>
      </ComponentPreview>

      {/* ── States ── */}
      <h2 className="text-lg font-bold text-primary mt-12 mb-5">States</h2>

      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Interactive — drag to orbit</h3>
      <div className="mb-8" style={{ maxWidth: 340 }}>
        <PU3DPassCard interactive />
      </div>

      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Auto-rotate</h3>
      <div className="mb-8" style={{ maxWidth: 340 }}>
        <PU3DPassCard autoRotate />
      </div>

      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Static</h3>
      <div className="mb-8" style={{ maxWidth: 340 }}>
        <PU3DPassCard />
      </div>

      {/* ── Props ── */}
      <h2 className="text-base font-semibold text-gray-800 mb-2">Props</h2>
      <PropsTable props={props} />
    </div>
  );
}
