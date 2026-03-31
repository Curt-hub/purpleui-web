'use client';
import { useState } from 'react';
import { motion, useMotionValue, animate } from 'framer-motion';
import { PUSearchBar } from '@/components/ui/PUSearchBar';
import { PhoneFrame } from '@/components/docs/PhoneFrame';
import { ComponentPreview } from '@/components/docs/ComponentPreview';
import { PropsTable } from '@/components/docs/PropsTable';
import { CodeBlock } from '@/components/docs/CodeBlock';

// ── Phone-frame contained tray demo ─────────────────────────

const PHONE_EXPAND_H = 300;
const PHONE_PEEK_H = 148;
const PHONE_Y_OFFSET = PHONE_EXPAND_H - PHONE_PEEK_H;

const phoneNetworks = [
  { name: 'PurpleWi-Fi HQ', speed: '110 Mbps', label: 'Free', initial: 'P', color: '#7458FD' },
  { name: 'Café WiFi', speed: '22 Mbps', label: 'Free', initial: 'C', color: '#3B82F6' },
  { name: 'Airport Lounge', speed: '88 Mbps', label: 'Premium', initial: 'A', color: '#F59E0B' },
  { name: 'Hotel Business', speed: '55 Mbps', label: 'Free', initial: 'H', color: '#10B981' },
];

function PhoneTrayDemo({ dark }: { dark: boolean }) {
  const y = useMotionValue(PHONE_Y_OFFSET);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {/* Map background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: dark
            ? 'linear-gradient(160deg, #011638 0%, #0a2048 100%)'
            : 'linear-gradient(160deg, #dce8f5 0%, #e8f0f8 100%)',
        }}
      />

      {/* Mock map grid lines */}
      <svg
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.15 }}
        preserveAspectRatio="none"
      >
        <line x1="0" y1="120" x2="300" y2="120" stroke={dark ? '#fff' : '#6b7280'} strokeWidth="0.5" />
        <line x1="0" y1="220" x2="300" y2="220" stroke={dark ? '#fff' : '#6b7280'} strokeWidth="0.5" />
        <line x1="80" y1="0" x2="80" y2="580" stroke={dark ? '#fff' : '#6b7280'} strokeWidth="0.5" />
        <line x1="200" y1="0" x2="200" y2="580" stroke={dark ? '#fff' : '#6b7280'} strokeWidth="0.5" />
        <circle cx="140" cy="175" r="6" fill="#7458FD" opacity="0.8" />
        <circle cx="90" cy="130" r="4" fill="#7458FD" opacity="0.5" />
        <circle cx="210" cy="200" r="4" fill="#7458FD" opacity="0.5" />
      </svg>

      {/* Search bar at top */}
      <div style={{ position: 'absolute', top: 58, left: 16, right: 16, zIndex: 10 }}>
        <div
          style={{
            height: 36,
            borderRadius: 50,
            background: dark ? '#0a2048' : '#ffffff',
            boxShadow: dark ? 'none' : '0px 2px 15px rgba(0,0,0,0.1)',
            border: dark ? '1px solid rgba(255,255,255,0.1)' : 'none',
            display: 'flex',
            alignItems: 'center',
            paddingLeft: 10,
            paddingRight: 10,
            gap: 8,
          }}
        >
          {/* Search icon — scaled down from Figma exact path */}
          <svg width="13" height="13" viewBox="0 0 20 20" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
            <path
              d="M19 19L14.65 14.65M17 9C17 13.4183 13.4183 17 9 17C4.58172 17 1 13.4183 1 9C1 4.58172 4.58172 1 9 1C13.4183 1 17 4.58172 17 9Z"
              stroke={dark ? 'rgba(255,255,255,0.4)' : '#AAACB0'}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: 11, color: '#AAACB0', flex: 1 }}>
            Search
          </span>
          {/* Filter icon — scaled down from Figma exact path */}
          <svg width="13" height="12" viewBox="0 0 22 20.625" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
            <path
              d="M1.03125 2.40625C0.459766 2.40625 0 2.86602 0 3.4375C0 4.00898 0.459766 4.46875 1.03125 4.46875H4.97148C5.40977 5.86523 6.71172 6.875 8.25 6.875C9.78828 6.875 11.0902 5.86523 11.5285 4.46875H20.9688C21.5402 4.46875 22 4.00898 22 3.4375C22 2.86602 21.5402 2.40625 20.9688 2.40625H11.5285C11.0902 1.00977 9.78828 0 8.25 0C6.71172 0 5.40977 1.00977 4.97148 2.40625H1.03125ZM1.03125 9.28125C0.459766 9.28125 0 9.74102 0 10.3125C0 10.884 0.459766 11.3438 1.03125 11.3438H11.8465C12.2848 12.7402 13.5867 13.75 15.125 13.75C16.6633 13.75 17.9652 12.7402 18.4035 11.3438H20.9688C21.5402 11.3438 22 10.884 22 10.3125C22 9.74102 21.5402 9.28125 20.9688 9.28125H18.4035C17.9652 7.88477 16.6633 6.875 15.125 6.875C13.5867 6.875 12.2848 7.88477 11.8465 9.28125H1.03125ZM1.03125 16.1562C0.459766 16.1562 0 16.616 0 17.1875C0 17.759 0.459766 18.2188 1.03125 18.2188H3.59648C4.03477 19.6152 5.33672 20.625 6.875 20.625C8.41328 20.625 9.71523 19.6152 10.1535 18.2188H20.9688C21.5402 18.2188 22 17.759 22 17.1875C22 16.616 21.5402 16.1562 20.9688 16.1562H10.1535C9.71523 14.7598 8.41328 13.75 6.875 13.75C5.33672 13.75 4.03477 14.7598 3.59648 16.1562H1.03125ZM6.875 18.5625C6.51033 18.5625 6.16059 18.4176 5.90273 18.1598C5.64487 17.9019 5.5 17.5522 5.5 17.1875C5.5 16.8228 5.64487 16.4731 5.90273 16.2152C6.16059 15.9574 6.51033 15.8125 6.875 15.8125C7.23967 15.8125 7.58941 15.9574 7.84727 16.2152C8.10513 16.4731 8.25 16.8228 8.25 17.1875C8.25 17.5522 8.10513 17.9019 7.84727 18.1598C7.58941 18.4176 7.23967 18.5625 6.875 18.5625ZM15.125 11.6875C14.7603 11.6875 14.4106 11.5426 14.1527 11.2848C13.8949 11.0269 13.75 10.6772 13.75 10.3125C13.75 9.94783 13.8949 9.59809 14.1527 9.34023C14.4106 9.08237 14.7603 8.9375 15.125 8.9375C15.4897 8.9375 15.8394 9.08237 16.0973 9.34023C16.3551 9.59809 16.5 9.94783 16.5 10.3125C16.5 10.6772 16.3551 11.0269 16.0973 11.2848C15.8394 11.5426 15.4897 11.6875 15.125 11.6875ZM6.875 3.4375C6.875 3.07283 7.01987 2.72309 7.27773 2.46523C7.53559 2.20737 7.88533 2.0625 8.25 2.0625C8.61467 2.0625 8.96441 2.20737 9.22227 2.46523C9.48013 2.72309 9.625 3.07283 9.625 3.4375C9.625 3.80217 9.48013 4.15191 9.22227 4.40977C8.96441 4.66763 8.61467 4.8125 8.25 4.8125C7.88533 4.8125 7.53559 4.66763 7.27773 4.40977C7.01987 4.15191 6.875 3.80217 6.875 3.4375Z"
              fill="#7458FD"
            />
          </svg>
        </div>
      </div>

      {/* Draggable tray — absolutely positioned at bottom, clipped by phone screen overflow:hidden */}
      <motion.div
        drag="y"
        dragConstraints={{ top: 0, bottom: PHONE_Y_OFFSET }}
        dragElastic={0}
        dragMomentum={false}
        style={{
          y,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: PHONE_EXPAND_H,
          borderRadius: '12px 12px 0 0',
          background: dark ? '#0a2048' : '#ffffff',
          boxShadow: '0px -2px 15px rgba(0,0,0,0.12)',
          zIndex: 20,
          touchAction: 'none',
          userSelect: 'none',
        }}
        onDragEnd={(_, info) => {
          const cur = y.get();
          const mid = PHONE_Y_OFFSET / 2;
          if (info.velocity.y > 200 || (cur > mid && info.velocity.y >= -200)) {
            animate(y, PHONE_Y_OFFSET, { type: 'spring', stiffness: 400, damping: 35 });
          } else {
            animate(y, 0, { type: 'spring', stiffness: 400, damping: 35 });
          }
        }}
      >
        {/* Drag handle */}
        <div style={{ height: 26, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'grab' }}>
          <div style={{ width: 60, height: 5, borderRadius: 9999, background: dark ? 'rgba(255,255,255,0.15)' : '#DDDDDF' }} />
        </div>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingLeft: 14, paddingRight: 10, paddingBottom: 8 }}>
          <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 13, color: dark ? '#ffffff' : '#000000' }}>
            Nearby Networks
          </span>
          <button
            style={{
              width: 28,
              height: 28,
              borderRadius: 9999,
              border: '1.5px solid #EFF0F0',
              background: 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <svg width="11" height="11" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M1.5 4h13M4 8h8M6.5 12h3" stroke={dark ? 'rgba(255,255,255,0.5)' : '#888'} strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Network rows */}
        {phoneNetworks.map((n, i) => (
          <div
            key={n.name}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              paddingLeft: 14,
              paddingRight: 14,
              paddingTop: 7,
              paddingBottom: 7,
              borderBottom: i < phoneNetworks.length - 1
                ? `1px solid ${dark ? 'rgba(255,255,255,0.06)' : '#f3f4f6'}`
                : 'none',
            }}
          >
            <div style={{
              width: 26,
              height: 26,
              borderRadius: 7,
              background: `${n.color}22`,
              color: n.color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 9,
              fontWeight: 700,
              flexShrink: 0,
            }}>
              {n.initial}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: 10,
                fontWeight: 600,
                color: dark ? '#ffffff' : '#1a1a1a',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
              }}>
                {n.name}
              </div>
              <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 9, color: dark ? 'rgba(255,255,255,0.45)' : '#9ca3af' }}>
                {n.speed} · {n.label}
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

// ── Static tray preview ──────────────────────────────────────

function StaticTrayPreview({ dark }: { dark: boolean }) {
  const networks = [
    { name: 'PurpleWi-Fi HQ', speed: '110 Mbps', initial: 'P', color: '#7458FD' },
    { name: 'Café WiFi', speed: '22 Mbps', initial: 'C', color: '#3B82F6' },
    { name: 'Airport Lounge', speed: '88 Mbps', initial: 'A', color: '#F59E0B' },
  ];

  return (
    <div
      style={{
        width: 280,
        borderRadius: '12px 12px 0 0',
        background: dark ? '#0a2048' : '#ffffff',
        boxShadow: '0px -2px 15px rgba(0,0,0,0.1)',
        overflow: 'hidden',
      }}
    >
      {/* Handle */}
      <div style={{ height: 35, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 104, height: 7, borderRadius: 9999, background: dark ? 'rgba(255,255,255,0.15)' : '#DDDDDF' }} />
      </div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingLeft: 20, paddingRight: 16, paddingBottom: 12 }}>
        <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 15, color: dark ? '#ffffff' : '#000000' }}>
          Nearby Networks
        </span>
        <button style={{ width: 40, height: 40, borderRadius: 9999, border: '1.5px solid #EFF0F0', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M1.5 4h13M4 8h8M6.5 12h3" stroke={dark ? 'rgba(255,255,255,0.5)' : '#888'} strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>
      {/* Rows */}
      {networks.map((n, i) => (
        <div
          key={n.name}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            paddingLeft: 20,
            paddingRight: 16,
            paddingTop: 9,
            paddingBottom: 9,
            borderBottom: i < networks.length - 1 ? `1px solid ${dark ? 'rgba(255,255,255,0.06)' : '#f3f4f6'}` : 'none',
          }}
        >
          <div style={{ width: 32, height: 32, borderRadius: 9, background: `${n.color}22`, color: n.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>
            {n.initial}
          </div>
          <div>
            <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 12, fontWeight: 600, color: dark ? '#ffffff' : '#1a1a1a' }}>{n.name}</div>
            <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 10, color: dark ? 'rgba(255,255,255,0.45)' : '#9ca3af' }}>{n.speed}</div>
          </div>
        </div>
      ))}
      <div style={{ height: 16 }} />
    </div>
  );
}

// ── Props & code ─────────────────────────────────────────────

const trayProps = [
  { name: 'title',           type: 'string',           default: '—',      description: 'Header title text' },
  { name: 'children',        type: 'ReactNode',        required: true,    description: 'Tray body content' },
  { name: 'dark',            type: 'boolean',          default: 'false',  description: 'Dark surface' },
  { name: 'peekHeight',      type: 'number',           default: '160',    description: 'Visible height when peeked (px)' },
  { name: 'expandHeight',    type: 'number',           default: '460',    description: 'Visible height when expanded (px)' },
  { name: 'defaultExpanded', type: 'boolean',          default: 'false',  description: 'Start in expanded state' },
];

const searchBarProps = [
  { name: 'value',         type: 'string',    required: true,   description: 'Controlled input value' },
  { name: 'onChange',      type: '(v: string) => void', required: true, description: 'Value change handler' },
  { name: 'placeholder',   type: 'string',    default: 'Search networks…', description: 'Input placeholder text' },
  { name: 'onFilterPress', type: '() => void', default: '—',    description: 'Filter button tap handler' },
  { name: 'dark',          type: 'boolean',   default: 'false', description: 'Dark surface' },
];

const traySwiftCode = `struct ExploreView: View {
    var body: some View {
        ZStack(alignment: .bottom) {
            MapView()
            PUBottomTray(title: "Nearby Networks") {
                ForEach(networks) { network in
                    PUListRow(
                        title: network.name,
                        subtitle: network.speed
                    )
                }
            }
        }
    }
}`;

const searchBarSwiftCode = `struct MapOverlayView: View {
    @State private var query = ""
    @State private var showFilters = false

    var body: some View {
        VStack {
            PUSearchBar(
                text: $query,
                placeholder: "Search networks…",
                onFilterTap: { showFilters = true }
            )
            .padding(.horizontal, 16)
            .padding(.top, 12)
            Spacer()
        }
    }
}`;

// ── Page ─────────────────────────────────────────────────────

export default function BottomTrayPage() {
  const [isDark, setIsDark] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [filterHit, setFilterHit] = useState(false);

  const handleFilter = () => {
    setFilterHit(true);
    setTimeout(() => setFilterHit(false), 1200);
  };

  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Bottom Tray</h1>
      <p className="text-gray-500 mb-8">
        Persistent tray that lives at the bottom of the screen. Drags and snaps between a peeked
        state and an expanded state — no backdrop, always visible.
      </p>

      {/* ── In Context ── */}
      <div className="mb-12">
        <h2 className="text-lg font-bold text-primary mb-5">In Context</h2>
        <p className="text-sm text-gray-500 mb-4">Drag the tray up and down — it snaps to peek or expand.</p>
        <PhoneFrame
          label="Drag the handle to snap between states"
          dark={isDark}
          onToggle={() => setIsDark(d => !d)}
        >
          <PhoneTrayDemo dark={isDark} />
        </PhoneFrame>
      </div>

      {/* ── Static previews ── */}
      <h2 className="text-lg font-bold text-primary mb-5">Tray Surfaces</h2>
      <div className="flex flex-wrap gap-8 mb-12">
        <div>
          <p className="text-xs font-medium text-gray-500 mb-3 uppercase tracking-wide">Light</p>
          <StaticTrayPreview dark={false} />
        </div>
        <div>
          <p className="text-xs font-medium text-gray-500 mb-3 uppercase tracking-wide">Dark</p>
          <div style={{ background: '#011638', borderRadius: 12, padding: '16px 16px 0' }}>
            <StaticTrayPreview dark={true} />
          </div>
        </div>
      </div>

      {/* ── Tray Props ── */}
      <h2 className="text-base font-semibold text-gray-800 mb-2">Tray Props</h2>
      <PropsTable props={trayProps} />

      {/* ── Tray Swift ── */}
      <h2 className="text-base font-semibold text-gray-800 mt-10 mb-2">Swift Usage</h2>
      <CodeBlock code={traySwiftCode} title="PUBottomTray.swift" />

      {/* ── Search Bar section ── */}
      <h2 className="text-3xl font-bold text-gray-900 mt-16 mb-2">Search Bar</h2>
      <p className="text-gray-500 mb-8">
        Pill-shaped input with a search icon and a filter button. Sits above the tray or floats
        over the map.
      </p>

      <h2 className="text-lg font-bold text-primary mb-5">Variants</h2>
      <ComponentPreview label="Light">
        <div className="w-[320px]">
          <PUSearchBar
            value={searchValue}
            onChange={setSearchValue}
            onFilterPress={handleFilter}
          />
          {filterHit && (
            <p className="text-xs text-[#7458FD] text-center mt-2 font-medium">Filter tapped ✓</p>
          )}
        </div>
      </ComponentPreview>

      <ComponentPreview label="Dark" bg="dark">
        <div className="w-[320px]">
          <PUSearchBar
            value={searchValue}
            onChange={setSearchValue}
            onFilterPress={handleFilter}
            dark
          />
        </div>
      </ComponentPreview>

      {/* ── Search Bar Props ── */}
      <h2 className="text-base font-semibold text-gray-800 mt-8 mb-2">Search Bar Props</h2>
      <PropsTable props={searchBarProps} />

      {/* ── Search Bar Swift ── */}
      <h2 className="text-base font-semibold text-gray-800 mt-10 mb-2">Swift Usage</h2>
      <CodeBlock code={searchBarSwiftCode} title="PUSearchBar.swift" />
    </div>
  );
}
