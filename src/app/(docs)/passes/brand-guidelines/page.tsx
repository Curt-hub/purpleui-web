'use client';
import React, { useState } from 'react';
import { PUPassCard } from '@/components/ui/PUPassCard';
import { colors } from '@/lib/tokens';

// ── Helpers ─────────────────────────────────────────────────────────────────

function lightenHex(hex: string, amount = 0.3): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (
    '#' +
    [r, g, b]
      .map(c =>
        Math.min(255, Math.round(c + (255 - c) * amount))
          .toString(16)
          .padStart(2, '0')
      )
      .join('')
  );
}

// ── Sample partner logos (SVG data URIs — use raw # so encodeURIComponent handles encoding) ──

// Logos built from shapes only — SVG <text> elements don't render in data URIs (no fonts available)

// Landscape: icon mark (left) + two word-bars (right) — ~3.3:1 ratio
const LOGO_LANDSCAPE = `data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="24" viewBox="0 0 80 24">` +
  `<rect x="0" y="2" width="20" height="20" rx="4" fill="white" opacity="0.88"/>` +
  `<circle cx="10" cy="12" r="5.5" fill="none" stroke="#555" stroke-width="1.8"/>` +
  `<circle cx="10" cy="12" r="2" fill="#555"/>` +
  `<rect x="26" y="5" width="38" height="5" rx="2.5" fill="white" opacity="0.88"/>` +
  `<rect x="26" y="14" width="26" height="4" rx="2" fill="white" opacity="0.6"/>` +
  `</svg>`
)}`;

// Square: icon mark filling the box — ~1:1 ratio
const LOGO_SQUARE = `data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28">` +
  `<rect width="28" height="28" rx="6" fill="white" opacity="0.9"/>` +
  `<path d="M7 14 L14 7 L21 14 L14 21 Z" fill="#555" opacity="0.85"/>` +
  `<circle cx="14" cy="14" r="3" fill="white"/>` +
  `</svg>`
)}`;

// Portrait: icon mark (top) + three stacked bars below — ~0.47:1 ratio
const LOGO_PORTRAIT = `data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="38" viewBox="0 0 18 38">` +
  `<rect x="1" y="0" width="16" height="16" rx="4" fill="white" opacity="0.88"/>` +
  `<circle cx="9" cy="8" r="4.5" fill="none" stroke="#555" stroke-width="1.6"/>` +
  `<circle cx="9" cy="8" r="1.8" fill="#555"/>` +
  `<rect x="1" y="21" width="16" height="4" rx="2" fill="white" opacity="0.88"/>` +
  `<rect x="3" y="28" width="12" height="3.5" rx="1.75" fill="white" opacity="0.7"/>` +
  `<rect x="5" y="34" width="8" height="3" rx="1.5" fill="white" opacity="0.5"/>` +
  `</svg>`
)}`;


// ── Colour presets ────────────────────────────────────────────────────────────

const COLOUR_PRESETS = [
  { label: 'Purple', value: colors.brand },
  { label: 'Navy',   value: colors.backgroundNavy },
  { label: 'Green',  value: '#0f9b63' },
  { label: 'Slate',  value: '#2d3748' },
  { label: 'Red',    value: '#C0392B' },
];

// ── Logo options ──────────────────────────────────────────────────────────────

type LogoOption = { label: string; url: string | undefined; orientation: 'landscape' | 'square' | 'portrait' };

const LOGO_OPTIONS: LogoOption[] = [
  { label: 'None',      url: undefined,      orientation: 'landscape' },
  { label: 'Landscape', url: LOGO_LANDSCAPE, orientation: 'landscape' },
  { label: 'Square',    url: LOGO_SQUARE,    orientation: 'square' },
  { label: 'Portrait',  url: LOGO_PORTRAIT,  orientation: 'portrait' },
];

// ── Callout annotation ────────────────────────────────────────────────────────

function Callout({ top, left, right, bottom, label, n }: {
  top?: number | string; left?: number | string;
  right?: number | string; bottom?: number | string;
  label: string; n: number;
}) {
  return (
    <div style={{
      position: 'absolute', top, left, right, bottom,
      display: 'flex', alignItems: 'center', gap: 6,
      whiteSpace: 'nowrap', pointerEvents: 'none',
    }}>
      <span style={{
        width: 18, height: 18, borderRadius: '50%',
        background: colors.brand, color: '#fff',
        fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 10,
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      }}>{n}</span>
      <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: 11, fontWeight: 600, color: '#374151' }}>{label}</span>
    </div>
  );
}

// ── Rule table ────────────────────────────────────────────────────────────────

function RuleTable({ rows }: { rows: string[][] }) {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'Poppins, sans-serif', fontSize: 13 }}>
      <thead>
        <tr>
          {rows[0].map((h, i) => (
            <th key={i} style={{ textAlign: 'left', padding: '6px 12px', background: '#F3F4F6', color: '#374151', fontWeight: 700, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.04em', borderBottom: '1px solid #E5E7EB' }}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.slice(1).map((row, ri) => (
          <tr key={ri} style={{ borderBottom: '1px solid #F3F4F6' }}>
            {row.map((cell, ci) => (
              <td key={ci} style={{ padding: '8px 12px', color: '#374151', fontFamily: ci === 0 ? 'Poppins, sans-serif' : 'monospace', fontSize: 13 }}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function BrandGuidelinesPage() {
  const [firstName, setFirstName] = useState('Curt');
  const [company, setCompany] = useState('ACME');
  const [primaryColor, setPrimaryColor] = useState<string>(colors.brand);
  const [logoIdx, setLogoIdx] = useState(1);

  const logoOption = LOGO_OPTIONS[logoIdx];
  const playgroundTitle = `${firstName}'s ${company} WiFi Pass`;

  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Pass Brand Guidelines</h1>
      <p className="text-gray-500 mb-8">
        Rules for customising the Purple WiFi Pass with a company&apos;s brand. Every pass has four
        fixed elements — their placement and size constraints are defined here so the pass always
        looks polished regardless of the partner brand applied.
      </p>

      {/* ── Playground (top) ── */}
      <div style={{
        background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: 16,
        padding: 24, marginBottom: 56,
      }}>
        {/* Live preview */}
        <div style={{ maxWidth: 340, margin: '0 auto 28px' }}>
          <PUPassCard
            title={playgroundTitle}
            backgroundColor={primaryColor}
            gradientTo={lightenHex(primaryColor)}
            partnerLogoUrl={logoOption.url}
            partnerLogoOrientation={logoOption.orientation}
            holo
          />
        </div>

        {/* Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* Name + company */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <label style={{ flex: '1 1 140px', display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 11, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.04em' }}>First name</span>
              <input
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                placeholder="Curt"
                style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #D1D5DB', fontFamily: 'Poppins, sans-serif', fontSize: 13, outline: 'none', background: '#fff' }}
              />
            </label>
            <label style={{ flex: '1 1 140px', display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 11, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Company name</span>
              <input
                value={company}
                onChange={e => setCompany(e.target.value)}
                placeholder="ACME"
                style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #D1D5DB', fontFamily: 'Poppins, sans-serif', fontSize: 13, outline: 'none', background: '#fff' }}
              />
            </label>
          </div>

          {/* Colour */}
          <div>
            <p style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 11, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 8 }}>Brand colour</p>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
              {COLOUR_PRESETS.map(({ label, value }) => (
                <button
                  key={label}
                  title={label}
                  onClick={() => setPrimaryColor(value)}
                  style={{
                    width: 28, height: 28, borderRadius: '50%', background: value, border: 'none',
                    cursor: 'pointer', flexShrink: 0,
                    outline: primaryColor === value ? `3px solid ${value}` : '3px solid transparent',
                    outlineOffset: 2,
                  }}
                />
              ))}
              <label style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
                <input
                  type="color"
                  value={primaryColor}
                  onChange={e => setPrimaryColor(e.target.value)}
                  style={{ width: 28, height: 28, padding: 0, border: '1px solid #D1D5DB', borderRadius: '50%', cursor: 'pointer', background: 'none' }}
                />
                <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: 12, color: '#6B7280' }}>Custom</span>
              </label>
            </div>
          </div>

          {/* Logo */}
          <div>
            <p style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 11, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 8 }}>Company logo</p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {LOGO_OPTIONS.map((opt, i) => (
                <button
                  key={opt.label}
                  onClick={() => setLogoIdx(i)}
                  style={{
                    padding: '6px 14px', borderRadius: 8, border: '1.5px solid',
                    borderColor: logoIdx === i ? colors.brand : '#D1D5DB',
                    background: logoIdx === i ? `${colors.brand}14` : '#fff',
                    color: logoIdx === i ? colors.brand : '#374151',
                    fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: 12,
                    cursor: 'pointer',
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ── Pass Anatomy ── */}
      <h2 className="text-lg font-bold text-primary mb-2">Pass Anatomy</h2>
      <p className="text-sm text-gray-500 mb-8">The four elements are always in the same positions. None may be removed or repositioned.</p>
      <div style={{ position: 'relative', maxWidth: 340, marginBottom: 56 }}>
        <Callout top={-28} left={0} label="Pass title" n={1} />
        <Callout top={-28} right={0} label="Primary colour" n={4} />
        <PUPassCard
          title="Curt's Purple WiFi Pass"
          backgroundColor={colors.brand}
          gradientTo="#9B7FFE"
          logoVariant="white-navy"
        />
        <Callout bottom={-28} left={0} label="WiFi chip hologram" n={2} />
        <Callout bottom={-28} right={0} label="Company logo" n={3} />
      </div>

      {/* ── 1. Text Rule ── */}
      <h2 className="text-lg font-bold text-primary mb-3">1 — Pass Title</h2>
      <p className="text-sm text-gray-500 mb-4">
        The title always follows the format below. Only <strong>&ldquo;WiFi Pass&rdquo;</strong> is fixed.
        The first name and company name are dynamic.
      </p>
      <div style={{ background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: 12, padding: '20px 24px', marginBottom: 12, fontFamily: 'Poppins, sans-serif' }}>
        <span style={{ fontSize: 15, color: colors.brand, fontWeight: 700 }}>{`{First name}'s`}</span>
        <span style={{ fontSize: 15, color: '#374151', fontWeight: 700 }}>{` {Company}`}</span>
        <span style={{ fontSize: 15, color: '#9CA3AF', fontWeight: 700 }}> WiFi Pass</span>
      </div>
      <RuleTable rows={[
        ['Property',    'Value'],
        ['Font',        'Poppins Bold'],
        ['Size',        '14px'],
        ['Colour',      'White (#FFFFFF)'],
        ['Position',    'Top-left, 20px inset'],
        ['Max length',  '~28 chars before wrapping'],
      ]} />
      <div className="mb-12" />

      {/* ── 2. Colour Rule ── */}
      <h2 className="text-lg font-bold text-primary mb-3">2 — Primary Colour</h2>
      <p className="text-sm text-gray-500 mb-5">
        Choose one brand colour. The card gradient is automatically generated by lightening that
        colour by 30% — no manual gradient definition required.
      </p>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 16 }}>
        {COLOUR_PRESETS.map(({ label, value }) => (
          <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <div style={{
              width: 120, height: 48, borderRadius: 10, overflow: 'hidden',
              background: `linear-gradient(135deg, ${value}, ${lightenHex(value)})`,
              border: '1px solid rgba(0,0,0,0.06)',
            }} />
            <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: 11, fontWeight: 600, color: '#374151', margin: 0 }}>{label}</p>
            <p style={{ fontFamily: 'monospace', fontSize: 10, color: '#9CA3AF', margin: 0 }}>{value}</p>
          </div>
        ))}
      </div>
      <div style={{ background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: 8, padding: '10px 14px', marginBottom: 32, fontFamily: 'monospace', fontSize: 12, color: '#374151' }}>
        gradientTo = lighten(primaryColor, 0.30)
      </div>

      {/* ── 3. Logo Rule ── */}
      <h2 className="text-lg font-bold text-primary mb-3">3 — Company Logo</h2>
      <p className="text-sm text-gray-500 mb-4">
        The company logo sits bottom-right. Its maximum dimensions depend on its orientation —
        this keeps logos proportional and legible at small sizes.
      </p>
      <RuleTable rows={[
        ['Orientation', 'Aspect ratio',   'Max width', 'Max height'],
        ['Landscape',   '≥ 1.5 : 1',      '80px',      '28px'],
        ['Square',      '0.75–1.5 : 1',   '28px',      '28px'],
        ['Portrait',    '< 0.75 : 1',      '24px',      '40px'],
      ]} />
      <div style={{ display: 'flex', gap: 16, marginTop: 24, marginBottom: 48, flexWrap: 'wrap' }}>
        {([
          { label: 'Landscape', url: LOGO_LANDSCAPE, orientation: 'landscape' as const, note: 'Wordmarks — 80×28px max' },
          { label: 'Square',    url: LOGO_SQUARE,    orientation: 'square'    as const, note: 'Icons / monograms — 28×28px' },
          { label: 'Portrait',  url: LOGO_PORTRAIT,  orientation: 'portrait'  as const, note: 'Stacked marks — 24×40px max' },
        ]).map(({ label, url, orientation, note }) => (
          <div key={label} style={{ flex: '1 1 260px', maxWidth: 340 }}>
            <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 8 }}>{label}</p>
            <PUPassCard
              title="Curt's Purple WiFi Pass"
              backgroundColor={colors.brand}
              gradientTo="#9B7FFE"
              partnerLogoUrl={url}
              partnerLogoOrientation={orientation}
            />
            <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: 11, color: '#9CA3AF', marginTop: 6 }}>{note}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
