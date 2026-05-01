'use client';
import { useState } from 'react';
import { PUPassCard } from '@/components/ui/PUPassCard';
import { PUButton } from '@/components/ui/PUButton';
import { ComponentPreview } from '@/components/docs/ComponentPreview';
import { PhoneFrame } from '@/components/docs/PhoneFrame';
import { PropsTable } from '@/components/docs/PropsTable';
import { colors } from '@/lib/tokens';

const COLOUR_PRESETS = [
  { label: 'Purple',  value: colors.brand,        gradientTo: '#9B7FFE' },
  { label: 'Navy',    value: colors.backgroundNavy, gradientTo: '#1a3a5c' },
  { label: 'Green',   value: '#0f9b63',             gradientTo: '#16C172' },
  { label: 'Slate',   value: '#2d3748',             gradientTo: '#4a5568' },
];

const props = [
  { name: 'title',           type: 'string',  required: true,        description: 'Pass name displayed on the card' },
  { name: 'backgroundColor', type: 'string',  default: '"#7458FD"',  description: 'Solid background colour or gradient start' },
  { name: 'gradientTo',      type: 'string',  default: 'undefined',  description: 'Gradient end colour — linear 135°' },
  { name: 'holo',            type: 'boolean', default: 'false',      description: 'Enable 3D tilt + holographic shimmer on hover' },
  { name: 'stackDepth',      type: 'number',  default: 'undefined',  description: 'Depth in stack (0 = top). Dims card and adds top edge highlight' },
  { name: 'warning',         type: 'boolean', default: 'false',          description: 'Show an amber warning badge (bottom-right)' },
  { name: 'logoVariant',    type: "'white-navy' | 'white-purple' | 'dark-purple'", default: "'white-purple'", description: 'Logo colour variant — white-navy for brand-purple bg, white-purple for dark bg, dark-purple for light bg' },
  { name: 'onClick',         type: '() => void', default: 'undefined',   description: 'Click handler — enables pointer cursor' },
];

export default function PassCardPage() {
  const [isDark, setIsDark] = useState(false);
  const [preset, setPreset] = useState(0);

  const { value: bg, gradientTo } = COLOUR_PRESETS[preset];

  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Pass Card</h1>
      <p className="text-gray-500 mb-8">
        Branded WiFi pass card with a 2:1 aspect ratio. Supports a holographic 3D-tilt + rainbow
        shimmer effect when focused, stacked-depth dimming for wallet stacking, and an optional
        warning state. Used inside{' '}
        <code className="text-sm bg-gray-100 px-1 rounded">PUWalletStack</code>.
      </p>

      {/* ── In Context ── */}
      <div className="mb-12">
        <h2 className="text-lg font-bold text-primary mb-5">In Context</h2>
        <PhoneFrame label="Pass Card — focused with holo active" dark={isDark} onToggle={() => setIsDark(d => !d)}>
          {/* Background */}
          <div style={{ position: 'absolute', inset: 0, background: isDark ? colors.backgroundNavy : colors.backgroundElevated }} />
          {/* Mini header */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 56,
            background: isDark ? '#0a2048' : '#ffffff',
            borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : '#EFF0F0'}`,
            display: 'flex', alignItems: 'center', padding: '0 16px', zIndex: 10,
          }}>
            <p style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 13, color: isDark ? '#ffffff' : '#000000', margin: 0 }}>
              WiFi Passes
            </p>
          </div>
          {/* Card — full width, 40px below header */}
          <div style={{ position: 'absolute', top: 96, left: 16, right: 16 }}>
            <PUPassCard
              title="Purple WiFi Pass"
              backgroundColor={colors.brand}
              gradientTo="#9B7FFE"
              holo
              logoVariant="white-navy"
            />
          </div>
        </PhoneFrame>
      </div>

      {/* ── Interactive ── */}
      <h2 className="text-lg font-bold text-primary mb-4">Interactive Preview</h2>
      <p className="text-sm text-gray-500 mb-4">Hover the card to trigger the holographic tilt and shimmer.</p>
      <ComponentPreview label="Hover to activate holo" bg="gray">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center', width: '100%' }}>
          <div style={{ width: '100%', maxWidth: 340 }}>
            <PUPassCard
              title="Purple WiFi Pass"
              backgroundColor={bg}
              gradientTo={gradientTo}
              holo
              logoVariant={preset === 0 ? 'white-navy' : 'white-purple'}
            />
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
            {COLOUR_PRESETS.map((p, i) => (
              <PUButton
                key={p.label}
                label={p.label}
                onClick={() => setPreset(i)}
                variant={preset === i ? 'primary' : 'secondary'}
                size="sm"
              />
            ))}
          </div>
        </div>
      </ComponentPreview>

      {/* ── States ── */}
      <h2 className="text-lg font-bold text-primary mt-12 mb-5">States</h2>

      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Default</h3>
      <div className="mb-8" style={{ maxWidth: 340 }}>
        <PUPassCard title="Purple WiFi Pass" backgroundColor={colors.brand} gradientTo="#9B7FFE" logoVariant="white-navy" />
      </div>

      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Focused — holo active (hover to see effect)</h3>
      <div className="mb-8" style={{ maxWidth: 340 }}>
        <PUPassCard title="Purple WiFi Pass" backgroundColor={colors.brand} gradientTo="#9B7FFE" holo logoVariant="white-navy" />
      </div>

      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Stacked depths</h3>
      <div className="mb-8 flex flex-col gap-3" style={{ maxWidth: 340 }}>
        <div>
          <p className="text-xs text-gray-400 mb-1">stackDepth: 0 — top of stack (no effect)</p>
          <PUPassCard title="Top card" backgroundColor={colors.brand} gradientTo="#9B7FFE" stackDepth={0} logoVariant="white-navy" />
        </div>
        <div>
          <p className="text-xs text-gray-400 mb-1">stackDepth: 1</p>
          <PUPassCard title="Second card" backgroundColor="#0f9b63" gradientTo="#16C172" stackDepth={1} />
        </div>
        <div>
          <p className="text-xs text-gray-400 mb-1">stackDepth: 2</p>
          <PUPassCard title="Third card" backgroundColor={colors.backgroundNavy} gradientTo="#1a3a5c" stackDepth={2} />
        </div>
      </div>

      {/* ── Props ── */}
      <h2 className="text-base font-semibold text-gray-800 mb-2">Props</h2>
      <PropsTable props={props} />
    </div>
  );
}
