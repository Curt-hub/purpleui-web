'use client';
import { useState } from 'react';
import { PUMapPin } from '@/components/ui/PUMapPin';
import { PhoneFrame } from '@/components/docs/PhoneFrame';
import { CodeBlock } from '@/components/docs/CodeBlock';
import { PropsTable } from '@/components/docs/PropsTable';

const props = [
  { name: 'variant',  type: "'teardrop' | 'dot'", default: "'teardrop'", description: 'Pin shape — teardrop (46×62px) or dot (30×30px)' },
  { name: 'selected', type: 'boolean',             default: 'false',      description: 'Selected state — turns pin primary purple and lifts up' },
  { name: 'onClick',  type: '() => void',          default: '—',          description: 'Tap handler — enables pointer cursor' },
  { name: 'dark',     type: 'boolean',             default: 'false',      description: 'Dark surface — adjusts spot shadow to white' },
  { name: 'color',    type: 'string',              default: "'#045DEC'",  description: 'Override fill colour (selected state always uses #7458FD)' },
];

const swiftCode = `@State private var selectedPin: Int? = nil

PUMapPin(variant: .teardrop, selected: selectedPin == 0)
    .onTapGesture { selectedPin = selectedPin == 0 ? nil : 0 }

PUMapPin(variant: .dot, selected: selectedPin == 1)
    .onTapGesture { selectedPin = selectedPin == 1 ? nil : 1 }`;

// ── Pin layout data ──────────────────────────────────────────

type PinData = { variant: 'teardrop' | 'dot'; x: number; y: number };

const PINS: PinData[] = [
  { variant: 'teardrop', x: 35,  y: 174 },
  { variant: 'teardrop', x: 135, y: 154 },
  { variant: 'teardrop', x: 215, y: 194 },
  { variant: 'teardrop', x: 95,  y: 314 },
  { variant: 'teardrop', x: 195, y: 344 },
  { variant: 'dot',      x: 87,  y: 269 },
  { variant: 'dot',      x: 182, y: 284 },
  { variant: 'dot',      x: 39,  y: 289 },
  { variant: 'dot',      x: 235, y: 262 },
];

// ── Phone frame map demo ─────────────────────────────────────

function PhoneMapDemo({ dark }: { dark: boolean }) {
  const [selected, setSelected] = useState<number | null>(null);

  const gridColor = dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)';
  const roadColor = dark ? 'rgba(255,255,255,0.1)'  : 'rgba(0,0,0,0.09)';
  const bg        = dark ? '#0a2048' : '#EEF0F3';

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', background: bg }}>
      {/* Map grid */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <line x1="0" y1="90"  x2="300" y2="90"  stroke={gridColor} strokeWidth="0.5" />
        <line x1="0" y1="190" x2="300" y2="190" stroke={gridColor} strokeWidth="0.5" />
        <line x1="0" y1="290" x2="300" y2="290" stroke={gridColor} strokeWidth="0.5" />
        <line x1="0" y1="390" x2="300" y2="390" stroke={gridColor} strokeWidth="0.5" />
        <line x1="60"  y1="0" x2="60"  y2="580" stroke={gridColor} strokeWidth="0.5" />
        <line x1="140" y1="0" x2="140" y2="580" stroke={gridColor} strokeWidth="0.5" />
        <line x1="220" y1="0" x2="220" y2="580" stroke={gridColor} strokeWidth="0.5" />
        <line x1="0"   y1="160" x2="300" y2="130" stroke={roadColor} strokeWidth="7" />
        <line x1="75"  y1="0"   x2="90"  y2="580" stroke={roadColor} strokeWidth="7" />
        <line x1="190" y1="580" x2="230" y2="0"   stroke={roadColor} strokeWidth="5" />
        <line x1="0"   y1="320" x2="300" y2="320" stroke={roadColor} strokeWidth="9" />
      </svg>

      {/* Pins */}
      {PINS.map((pin, i) => (
        <div key={i} style={{ position: 'absolute', left: pin.x, top: pin.y }}>
          <PUMapPin
            variant={pin.variant}
            dark={dark}
            selected={selected === i}
            onClick={() => setSelected(selected === i ? null : i)}
          />
        </div>
      ))}

    </div>
  );
}

// ── Interactive docs section ─────────────────────────────────

function InteractiveDemo() {
  const [selectedT, setSelectedT] = useState<number | null>(null);
  const [selectedD, setSelectedD] = useState<number | null>(null);

  return (
    <div className="rounded-xl border border-gray-200 overflow-hidden my-4">
      <div className="px-4 py-2.5 bg-gray-50 border-b border-gray-200">
        <span className="text-xs font-medium text-gray-500">Click to select — click again to deselect</span>
      </div>
      <div className="bg-[#EEF0F3] p-10 flex flex-col gap-10 items-center justify-center min-h-[200px]">
        <div className="flex items-end gap-12">
          <PUMapPin
            variant="teardrop"
            selected={selectedT === 0}
            onClick={() => setSelectedT(selectedT === 0 ? null : 0)}
          />
          <PUMapPin
            variant="dot"
            selected={selectedD === 0}
            onClick={() => setSelectedD(selectedD === 0 ? null : 0)}
          />
        </div>
      </div>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────

export default function MapPinsPage() {
  const [isDark, setIsDark] = useState(false);

  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Map Pins</h1>
      <p className="text-gray-500 mb-8">
        Two pin types used on the Explore map. Tap to select — selected pins spring up and turn
        primary purple. Tap again to deselect.
      </p>

      {/* ── In Context ── */}
      <div className="mb-12">
        <h2 className="text-lg font-bold text-primary mb-5">In Context</h2>
        <PhoneFrame label="Tap any pin to select it" dark={isDark} onToggle={() => setIsDark(d => !d)}>
          <PhoneMapDemo dark={isDark} />
        </PhoneFrame>
      </div>

      {/* ── Interactive ── */}
      <h2 className="text-lg font-bold text-primary mb-2">Interactive</h2>
      <InteractiveDemo />

      {/* ── Variants ── */}
      <h2 className="text-lg font-bold text-primary mt-10 mb-5">Variants</h2>
      <div className="flex flex-wrap gap-12 items-end mb-10">
        <div>
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-3">Teardrop · Default</p>
          <div className="flex items-end justify-center rounded-xl border border-gray-200 bg-[#EEF0F3] px-10 py-8">
            <PUMapPin variant="teardrop" />
          </div>
        </div>
        <div>
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-3">Teardrop · Selected</p>
          <div className="flex items-end justify-center rounded-xl border border-gray-200 bg-[#EEF0F3] px-10 py-8">
            <PUMapPin variant="teardrop" selected />
          </div>
        </div>
        <div>
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-3">Dot · Default</p>
          <div className="flex items-center justify-center rounded-xl border border-gray-200 bg-[#EEF0F3] px-10 py-8">
            <PUMapPin variant="dot" />
          </div>
        </div>
        <div>
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-3">Dot · Selected</p>
          <div className="flex items-center justify-center rounded-xl border border-gray-200 bg-[#EEF0F3] px-10 py-8">
            <PUMapPin variant="dot" selected />
          </div>
        </div>
        <div>
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-3">Teardrop · Dark</p>
          <div className="flex items-end justify-center rounded-xl border border-white/10 bg-[#0a2048] px-10 py-8">
            <PUMapPin variant="teardrop" dark />
          </div>
        </div>
        <div>
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-3">Dot · Dark</p>
          <div className="flex items-center justify-center rounded-xl border border-white/10 bg-[#0a2048] px-10 py-8">
            <PUMapPin variant="dot" dark />
          </div>
        </div>
      </div>

      {/* ── Props ── */}
      <h2 className="text-base font-semibold text-gray-800 mb-2">Props</h2>
      <PropsTable props={props} />

      {/* ── Swift ── */}
      <h2 className="text-base font-semibold text-gray-800 mt-10 mb-2">Swift Usage</h2>
      <CodeBlock code={swiftCode} title="PUMapPin.swift" />
    </div>
  );
}
