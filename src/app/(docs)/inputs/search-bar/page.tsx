'use client';
import { useState } from 'react';
import { PUSearchBar } from '@/components/ui/PUSearchBar';
import { PhoneFrame } from '@/components/docs/PhoneFrame';
import { ComponentPreview } from '@/components/docs/ComponentPreview';
import { PropsTable } from '@/components/docs/PropsTable';
import { CodeBlock } from '@/components/docs/CodeBlock';

// ── Phone-frame mock ─────────────────────────────────────────

function PhoneSearchDemo({ dark }: { dark: boolean }) {
  const [value, setValue] = useState('');

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {/* Map-style background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: dark
            ? 'linear-gradient(160deg, #011638 0%, #0a2048 100%)'
            : 'linear-gradient(160deg, #dce8f5 0%, #e8f0f8 100%)',
        }}
      />
      {/* Subtle grid */}
      <svg
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.1 }}
        preserveAspectRatio="none"
      >
        <line x1="0" y1="140" x2="300" y2="140" stroke={dark ? '#fff' : '#6b7280'} strokeWidth="0.5" />
        <line x1="0" y1="260" x2="300" y2="260" stroke={dark ? '#fff' : '#6b7280'} strokeWidth="0.5" />
        <line x1="100" y1="0" x2="100" y2="580" stroke={dark ? '#fff' : '#6b7280'} strokeWidth="0.5" />
        <line x1="210" y1="0" x2="210" y2="580" stroke={dark ? '#fff' : '#6b7280'} strokeWidth="0.5" />
        <circle cx="150" cy="200" r="7" fill="#7458FD" opacity="0.7" />
        <circle cx="90" cy="150" r="5" fill="#7458FD" opacity="0.45" />
        <circle cx="220" cy="240" r="5" fill="#7458FD" opacity="0.45" />
      </svg>

      {/* Search bar overlay */}
      <div style={{ position: 'absolute', top: 58, left: 16, right: 16, zIndex: 10 }}>
        <PUSearchBar
          value={value}
          onChange={setValue}
          dark={dark}
          onFilterPress={() => {}}
        />
      </div>
    </div>
  );
}

// ── Props & code ─────────────────────────────────────────────

const props = [
  { name: 'value',         type: 'string',              required: true,   description: 'Controlled input value' },
  { name: 'onChange',      type: '(v: string) => void', required: true,   description: 'Value change handler' },
  { name: 'placeholder',   type: 'string',              default: 'Search networks…', description: 'Input placeholder text' },
  { name: 'onFilterPress', type: '() => void',          default: '—',     description: 'Filter button tap handler' },
  { name: 'dark',          type: 'boolean',             default: 'false', description: 'Dark surface variant' },
];

const swiftCode = `struct MapSearchBar: View {
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
        .sheet(isPresented: $showFilters) {
            FiltersView()
        }
    }
}`;

// ── Page ─────────────────────────────────────────────────────

export default function SearchBarPage() {
  const [isDark, setIsDark] = useState(false);
  const [value, setValue] = useState('');
  const [darkValue, setDarkValue] = useState('');
  const [filterHit, setFilterHit] = useState(false);

  const handleFilter = () => {
    setFilterHit(true);
    setTimeout(() => setFilterHit(false), 1200);
  };

  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Search Bar</h1>
      <p className="text-gray-500 mb-8">
        Pill-shaped input that floats above the map. Search icon on the left, purple filter
        button on the right. Light and dark surfaces.
      </p>

      {/* ── In Context ── */}
      <div className="mb-12">
        <h2 className="text-lg font-bold text-primary mb-5">In Context</h2>
        <PhoneFrame
          label="Search bar over a map background"
          dark={isDark}
          onToggle={() => setIsDark(d => !d)}
        >
          <PhoneSearchDemo dark={isDark} />
        </PhoneFrame>
      </div>

      {/* ── Variants ── */}
      <h2 className="text-lg font-bold text-primary mb-5">Variants</h2>

      <ComponentPreview label="Light — default">
        <div className="w-[340px]">
          <PUSearchBar
            value={value}
            onChange={setValue}
            onFilterPress={handleFilter}
          />
          {filterHit && (
            <p className="text-xs text-[#7458FD] text-center mt-2 font-medium">Filter tapped ✓</p>
          )}
        </div>
      </ComponentPreview>

      <ComponentPreview label="Dark" bg="dark">
        <div className="w-[340px]">
          <PUSearchBar
            value={darkValue}
            onChange={setDarkValue}
            onFilterPress={handleFilter}
            dark
          />
        </div>
      </ComponentPreview>

      <ComponentPreview label="Light — with typed value">
        <div className="w-[340px]">
          <PUSearchBar
            value="Purple"
            onChange={() => {}}
            onFilterPress={() => {}}
          />
        </div>
      </ComponentPreview>

      <ComponentPreview label="Dark — with typed value" bg="dark">
        <div className="w-[340px]">
          <PUSearchBar
            value="Airport"
            onChange={() => {}}
            onFilterPress={() => {}}
            dark
          />
        </div>
      </ComponentPreview>

      {/* ── Props ── */}
      <h2 className="text-base font-semibold text-gray-800 mt-10 mb-2">Props</h2>
      <PropsTable props={props} />

      {/* ── Swift ── */}
      <h2 className="text-base font-semibold text-gray-800 mt-10 mb-2">Swift Usage</h2>
      <CodeBlock code={swiftCode} title="PUSearchBar.swift" />
    </div>
  );
}
