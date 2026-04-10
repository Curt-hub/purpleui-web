'use client';
import { useState } from 'react';
import { PUFloatingButton } from '@/components/ui/PUFloatingButton';
import { PhoneFrame } from '@/components/docs/PhoneFrame';
import { PropsTable } from '@/components/docs/PropsTable';
import { PlatformCodeBlock } from '@/components/docs/PlatformCodeBlock';

// ── Props table ───────────────────────────────────────────────

const props = [
  { name: 'variant',  type: "'icon' | 'pill'",           default: '—',         description: "icon = 56×56 circle button  |  pill = icon + label" },
  { name: 'icon',     type: "'navigate' | 'plus'",        default: '—',         description: 'Icon to display inside the button' },
  { name: 'label',    type: 'string',                     default: '—',         description: 'Text label shown beside the icon (pill variant only)' },
  { name: 'dark',     type: 'boolean',                    default: 'false',     description: 'Dark surface — switches to navy background with subtle border' },
  { name: 'onClick',  type: '() => void',                 default: '—',         description: 'Tap handler' },
];

// ── Code snippets ─────────────────────────────────────────────

const swiftCode = `// Icon — navigate to user location
PUFloatingButton(variant: .icon, icon: .navigate) {
    mapView.camera.animate(toLocation: userLocation)
}

// Pill — labelled action
PUFloatingButton(variant: .pill, icon: .plus, label: "Add WiFi") {
    showAddWifiSheet = true
}

// Dark surface variants
PUFloatingButton(variant: .icon, icon: .navigate, dark: true) { }
PUFloatingButton(variant: .pill, icon: .plus, label: "Add WiFi", dark: true) { }`;

const kotlinCode = `// Icon — navigate to user location
PUFloatingButton(
    variant = PUFloatingButtonVariant.Icon,
    icon = PUFloatingButtonIcon.Navigate,
    onClick = { mapViewModel.centerOnUser() }
)

// Pill — labelled action
PUFloatingButton(
    variant = PUFloatingButtonVariant.Pill,
    icon = PUFloatingButtonIcon.Plus,
    label = "Add WiFi",
    onClick = { showAddWifiSheet = true }
)

// Dark surface variants
PUFloatingButton(variant = PUFloatingButtonVariant.Icon, dark = true, onClick = { })
PUFloatingButton(variant = PUFloatingButtonVariant.Pill, label = "Add WiFi", dark = true, onClick = { })`;

// ── Phone frame map demo ──────────────────────────────────────

function PhoneMapDemo({ dark }: { dark: boolean }) {
  const [navigateHit, setNavigateHit] = useState(false);
  const [addHit, setAddHit]           = useState(false);

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
        <line x1="60"  y1="0" x2="60"  y2="560" stroke={gridColor} strokeWidth="0.5" />
        <line x1="140" y1="0" x2="140" y2="560" stroke={gridColor} strokeWidth="0.5" />
        <line x1="220" y1="0" x2="220" y2="560" stroke={gridColor} strokeWidth="0.5" />
        <line x1="0"   y1="160" x2="300" y2="130" stroke={roadColor} strokeWidth="7" />
        <line x1="75"  y1="0"   x2="90"  y2="560" stroke={roadColor} strokeWidth="7" />
        <line x1="190" y1="560" x2="230" y2="0"   stroke={roadColor} strokeWidth="5" />
        <line x1="0"   y1="320" x2="300" y2="320" stroke={roadColor} strokeWidth="9" />
      </svg>

      {/* Navigate button — bottom left */}
      <div style={{ position: 'absolute', left: 16, bottom: 20 }}>
        <PUFloatingButton
          variant="icon"
          icon="navigate"
          label="Navigate to my location"
          dark={dark}
          onClick={() => { setNavigateHit(true); setTimeout(() => setNavigateHit(false), 1200); }}
        />
        {navigateHit && (
          <div style={{
            position: 'absolute', bottom: 64, left: 0,
            background: dark ? '#1a3560' : '#fff',
            color: dark ? '#fff' : '#000',
            border: `1px solid ${dark ? 'rgba(255,255,255,0.1)' : '#EFF0F0'}`,
            borderRadius: 8, padding: '4px 10px',
            fontSize: 11, fontFamily: 'Poppins, sans-serif', whiteSpace: 'nowrap',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          }}>
            Centring map…
          </div>
        )}
      </div>

      {/* Add WiFi pill button — bottom right */}
      <div style={{ position: 'absolute', right: 16, bottom: 20 }}>
        <PUFloatingButton
          variant="pill"
          icon="plus"
          label="Add WiFi"
          dark={dark}
          onClick={() => { setAddHit(true); setTimeout(() => setAddHit(false), 1200); }}
        />
        {addHit && (
          <div style={{
            position: 'absolute', bottom: 64, right: 0,
            background: dark ? '#1a3560' : '#fff',
            color: dark ? '#fff' : '#000',
            border: `1px solid ${dark ? 'rgba(255,255,255,0.1)' : '#EFF0F0'}`,
            borderRadius: 8, padding: '4px 10px',
            fontSize: 11, fontFamily: 'Poppins, sans-serif', whiteSpace: 'nowrap',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          }}>
            Opening sheet…
          </div>
        )}
      </div>
    </div>
  );
}

// ── Interactive preview ───────────────────────────────────────

function InteractiveDemo() {
  const [isDark, setIsDark] = useState(false);

  return (
    <div className="rounded-xl border border-gray-200 overflow-hidden my-4">
      <div className="px-4 py-2.5 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
        <span className="text-xs font-medium text-gray-500">Click each button to preview the tap animation</span>
        <button
          onClick={() => setIsDark(d => !d)}
          className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full"
        >
          {isDark ? 'Light' : 'Dark'}
        </button>
      </div>
      <div
        className="p-10 flex items-end justify-between"
        style={{ background: isDark ? '#0a2048' : '#EEF0F3', minHeight: 140 }}
      >
        <PUFloatingButton variant="icon" icon="navigate" label="Navigate" dark={isDark} />
        <PUFloatingButton variant="pill" icon="plus" label="Add WiFi" dark={isDark} />
      </div>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────

export default function FloatingButtonPage() {
  const [isDark, setIsDark] = useState(false);

  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Floating Button</h1>
      <p className="text-gray-500 mb-8">
        Contextual action buttons that float above the map. Two variants: a circular icon
        button for single actions (e.g. navigate to location) and a pill button for labelled
        actions (e.g. Add WiFi).
      </p>

      {/* ── In Context ── */}
      <div className="mb-12">
        <h2 className="text-lg font-bold text-primary mb-5">In Context</h2>
        <PhoneFrame label="Tap a button to preview" dark={isDark} onToggle={() => setIsDark(d => !d)}>
          <PhoneMapDemo dark={isDark} />
        </PhoneFrame>
      </div>

      {/* ── Interactive ── */}
      <h2 className="text-lg font-bold text-primary mb-2">Interactive</h2>
      <InteractiveDemo />

      {/* ── Variants ── */}
      <h2 className="text-lg font-bold text-primary mt-10 mb-5">Variants</h2>
      <div className="flex flex-wrap gap-8 items-end mb-10">
        <div>
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-3">Icon · Light</p>
          <div className="flex items-end justify-center rounded-xl border border-gray-200 bg-[#EEF0F3] px-10 py-8">
            <PUFloatingButton variant="icon" icon="navigate" />
          </div>
        </div>
        <div>
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-3">Icon · Dark</p>
          <div className="flex items-end justify-center rounded-xl border border-white/10 bg-[#0a2048] px-10 py-8">
            <PUFloatingButton variant="icon" icon="navigate" dark />
          </div>
        </div>
        <div>
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-3">Pill · Light</p>
          <div className="flex items-end justify-center rounded-xl border border-gray-200 bg-[#EEF0F3] px-10 py-8">
            <PUFloatingButton variant="pill" icon="plus" label="Add WiFi" />
          </div>
        </div>
        <div>
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-3">Pill · Dark</p>
          <div className="flex items-end justify-center rounded-xl border border-white/10 bg-[#0a2048] px-10 py-8">
            <PUFloatingButton variant="pill" icon="plus" label="Add WiFi" dark />
          </div>
        </div>
      </div>

      {/* ── Props ── */}
      <h2 className="text-base font-semibold text-gray-800 mb-2">Props</h2>
      <PropsTable props={props} />

      <PlatformCodeBlock swift={swiftCode} kotlin={kotlinCode} title="PUFloatingButton" />
    </div>
  );
}
