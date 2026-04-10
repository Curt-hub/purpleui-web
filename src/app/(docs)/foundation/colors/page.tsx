'use client';
import { useState } from 'react';
import { colors } from '@/lib/tokens';

// ── Token data ─────────────────────────────────────────────────

type SwatchData = {
  name: string;
  token: string;
  hex: string;
  role: string;
  darkHex?: string;
};

const brandColors: SwatchData[] = [
  { name: 'Brand',        token: 'colors.brand',        hex: colors.brand,        role: 'Primary brand colour — buttons, active states, links', darkHex: colors.brand },
  { name: 'Brand Subtle', token: 'colors.brandSubtle',   hex: colors.brandSubtle,  role: 'Tinted background behind brand elements', darkHex: '#2a1f6b' },
  { name: 'Bg Navy',      token: 'colors.backgroundNavy', hex: colors.backgroundNavy, role: 'Dark-surface buttons, map overlays, loader dark variant', darkHex: colors.backgroundNavy },
  { name: 'Bg Alt',       token: 'colors.backgroundAlt',  hex: colors.backgroundAlt,  role: 'Warm cream — used in marketing / splash contexts', darkHex: colors.backgroundAlt },
];

const backgroundColors: SwatchData[] = [
  { name: 'Background',          token: 'colors.background',          hex: colors.background,          role: 'Page / screen background',       darkHex: '#011638' },
  { name: 'Background Elevated', token: 'colors.backgroundElevated',  hex: colors.backgroundElevated,  role: 'Cards, sheets, elevated surfaces', darkHex: '#0a2048' },
  { name: 'Background Sunken',   token: 'colors.backgroundSunken',    hex: colors.backgroundSunken,    role: 'Input fields, sunken containers',  darkHex: '#09193d' },
];

const onBackgroundColors: SwatchData[] = [
  { name: 'On Background',           token: 'colors.onBackground',           hex: colors.onBackground,           role: 'Primary text & icons',        darkHex: '#FFFFFF' },
  { name: 'On Background Secondary', token: 'colors.onBackgroundSecondary',   hex: colors.onBackgroundSecondary,  role: 'Secondary text & icons',      darkHex: 'rgba(255,255,255,0.70)' },
  { name: 'On Background Tertiary',  token: 'colors.onBackgroundTertiary',    hex: colors.onBackgroundTertiary,   role: 'Inactive labels, placeholders', darkHex: 'rgba(255,255,255,0.35)' },
];

const outlineColors: SwatchData[] = [
  { name: 'Outline',        token: 'colors.outline',        hex: colors.outline,       role: 'Borders, input strokes',  darkHex: 'rgba(255,255,255,0.15)' },
  { name: 'Outline Subtle', token: 'colors.outlineSubtle',  hex: colors.outlineSubtle, role: 'Dividers, subtle borders', darkHex: 'rgba(255,255,255,0.06)' },
  { name: 'Loader Track',   token: 'colors.loaderTrack',    hex: colors.loaderTrack,   role: 'Spinner track ring (invariant)', darkHex: colors.loaderTrack },
];

const statusColors: SwatchData[] = [
  { name: 'Success',        token: 'colors.success',        hex: colors.success,        role: 'Connected, saved, completed' },
  { name: 'Success Subtle', token: 'colors.successSubtle',  hex: colors.successSubtle,  role: 'Success tinted backgrounds', darkHex: '#0d3320' },
  { name: 'Error',          token: 'colors.error',          hex: colors.error,          role: 'Destructive actions, errors' },
  { name: 'Warning',        token: 'colors.warning',        hex: colors.warning,        role: 'Caution, degraded states' },
  { name: 'Warning Subtle', token: 'colors.warningSubtle',  hex: colors.warningSubtle,  role: 'Warning tinted backgrounds', darkHex: '#3d3400' },
  { name: 'Info',           token: 'colors.info',           hex: colors.info,           role: 'Informational, map pins' },
];

// ── Swatch component ───────────────────────────────────────────

function ColorSwatch({ name, token, hex, role, darkHex }: SwatchData) {
  const [copied, setCopied] = useState(false);
  const isLight = hex.toUpperCase() === '#FFFFFF' || hex.toUpperCase() === '#F7F7F8' || hex.toUpperCase() === '#F9F9FC' || hex.toUpperCase() === '#EFF0F0' || hex.toUpperCase() === '#F5F1ED';

  const handleClick = () => {
    navigator.clipboard.writeText(hex);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div
      className="flex flex-col overflow-hidden rounded-lg border border-[#DDDDDF] cursor-pointer hover:ring-2 hover:ring-[#7458FD]/40 hover:border-[#7458FD]/40 transition-all"
      onClick={handleClick}
    >
      <div
        style={{ backgroundColor: hex }}
        className={`h-24 flex items-start p-3 ${isLight ? 'border-b border-[#DDDDDF]' : ''}`}
      >
        <span
          className="text-xs px-2 py-1 rounded font-semibold"
          style={{
            background: isLight ? '#fff' : 'rgba(0,0,0,0.25)',
            color: isLight ? '#000' : '#fff',
            border: isLight ? '1px solid #DDDDDF' : 'none',
          }}
        >
          {name}
        </span>
      </div>
      <div className="bg-white px-3 py-3 flex flex-col gap-1">
        <p className="text-sm font-bold text-black h-5">
          {copied ? <span className="text-[#7458FD]">Copied!</span> : hex.toUpperCase()}
        </p>
        <p className="text-[11px] font-mono text-[#7458FD] truncate">{token}</p>
        <p className="text-[11px] text-[#595959] leading-tight mt-0.5">{role}</p>
        {darkHex && darkHex !== hex && (
          <p className="text-[10px] text-[#AAACB0] mt-1">
            Dark: <span className="font-mono">{darkHex}</span>
          </p>
        )}
      </div>
    </div>
  );
}

function Section({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <section className="mb-12">
      <h2 className="text-lg font-bold text-[#7458FD] mb-1">{title}</h2>
      {description && <p className="text-sm text-[#595959] mb-4">{description}</p>}
      {children}
    </section>
  );
}

// ── Page ───────────────────────────────────────────────────────

export default function ColorsPage() {
  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Colour Tokens</h1>
      <p className="text-gray-500 mb-3">
        PurpleUI uses a <strong>two-tier token system</strong> — a palette of raw hex values and a
        semantic layer that gives each colour a role. Components always reference semantic tokens,
        which means dark mode is a configuration change, not a rename. Click any swatch to copy its hex.
      </p>
      <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#eceaff] mb-10">
        <span className="text-xs font-semibold text-[#7458FD]">Dark mode ready</span>
        <span className="text-xs text-[#595959]">— each swatch shows its mapped dark value where it differs</span>
      </div>

      <Section
        title="Brand"
        description="The Purple brand colour and its contextual variants."
      >
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {brandColors.map(c => <ColorSwatch key={c.token} {...c} />)}
        </div>
      </Section>

      <Section
        title="Backgrounds"
        description="Surface layers — background stacks from base → elevated → sunken."
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {backgroundColors.map(c => <ColorSwatch key={c.token} {...c} />)}
        </div>
      </Section>

      <Section
        title="Text & Icons"
        description="Colours for content sitting on top of a background. All three flip to white-based values in dark mode."
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {onBackgroundColors.map(c => <ColorSwatch key={c.token} {...c} />)}
        </div>
      </Section>

      <Section
        title="Borders & Dividers"
        description="Structural colours for separating content areas."
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {outlineColors.map(c => <ColorSwatch key={c.token} {...c} />)}
        </div>
      </Section>

      <Section
        title="Status"
        description="Semantic colours for feedback states. These are consistent across light and dark mode."
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {statusColors.map(c => <ColorSwatch key={c.token} {...c} />)}
        </div>
      </Section>
    </div>
  );
}
