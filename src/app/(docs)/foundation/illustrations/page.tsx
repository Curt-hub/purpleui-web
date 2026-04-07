'use client';
import { useState } from 'react';
import { PUIllustration, type IllustrationName } from '@/components/ui/PUIllustration';
import { CodeBlock } from '@/components/docs/CodeBlock';

const swiftCode = `PUIllustration(name: .globe)      // Explore screen
PUIllustration(name: .wallet)     // Passes screen
PUIllustration(name: .voucher)    // Activity screen
PUIllustration(name: .coffeeCup)  // Promotions`;

const DARK_BG  = '#011638';
const LIGHT_BG = '#F5F5F7';

const ILLUSTRATIONS: { name: IllustrationName; label: string; screen: string }[] = [
  { name: 'globe',      label: 'Globe',      screen: 'Explore' },
  { name: 'wallet',     label: 'Wallet',     screen: 'Passes' },
  { name: 'voucher',    label: 'Voucher',    screen: 'Activity' },
  { name: 'coffee-cup', label: 'Coffee Cup', screen: 'Promotions' },
];

const BASE_PROMPT = `3D rendered illustration, inflated clay material, smooth glossy plastic finish, rounded puffy edges, soft directional studio lighting from the top, subtle drop shadow beneath the object, transparent background, no text, no labels, clean product icon style`;

const ILLUSTRATION_PROMPTS: Record<IllustrationName, { title: string; prompt: string }> = {
  'globe': {
    title: 'Globe',
    prompt: `A 3D rendered Earth globe in an inflated clay style. Smooth glossy plastic material. Green puffy landmasses showing the Americas, Europe, and Africa on a vivid blue ocean. Slightly tilted at roughly 20 degrees to give a dynamic feel. Rounded, chunky sphere shape. Soft studio lighting from the top right. Transparent background. No text. Clean app icon style.`,
  },
  'wallet': {
    title: 'Wallet',
    prompt: `A 3D rendered bi-fold wallet in an inflated clay style. Smooth glossy medium-blue plastic body (#5B7CF7). A purple card with rounded corners (#7458FD) protruding from the top at a slight angle. A small gold metallic circular snap button on the right side of the wallet. The whole object tilted approximately 15 degrees clockwise. Soft studio lighting. Transparent background. No text.`,
  },
  'voucher': {
    title: 'Voucher',
    prompt: `A 3D rendered discount voucher card in an inflated clay style. Frosted pale blue-white card with very rounded corners, three short horizontal placeholder lines on the left. A large 3D percentage symbol in matching pale blue sits overlapping the top-right corner of the card. In the bottom-left, a gold yellow coin with an embossed 3D star overlaps the card. Soft studio lighting. Transparent background. No text.`,
  },
  'coffee-cup': {
    title: 'Coffee Cup',
    prompt: `A 3D rendered takeaway coffee cup in an inflated clay style. Beige/tan cup body with a smooth white dome lid and white rim collar. A large 3D percentage symbol in pale icy blue with a glossy finish sits slightly behind and to the right of the cup, overlapping it. The cup faces slightly left. Soft studio lighting. Transparent background. No text.`,
  },
};

// ── Prompt card ───────────────────────────────────────────────

function PromptCard({ name, title, prompt }: { name: IllustrationName; title: string; prompt: string }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    const full = `${BASE_PROMPT}\n\n${prompt}`;
    navigator.clipboard.writeText(full);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div
            className="rounded-lg flex items-center justify-center shrink-0"
            style={{ background: '#011638', width: 36, height: 36 }}
          >
            <PUIllustration name={name} size={28} />
          </div>
          <span className="font-poppins font-bold text-sm text-gray-900">{title}</span>
        </div>
        <button
          onClick={copy}
          className="flex items-center gap-1.5 text-xs font-medium font-poppins px-3 py-1.5 rounded-full transition-all"
          style={{
            background: copied ? 'rgba(116,88,253,0.1)' : '#f3f4f6',
            color: copied ? '#7458FD' : '#6b7280',
          }}
        >
          {copied ? (
            <>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="#7458FD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Copied
            </>
          ) : (
            <>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><rect x="1" y="3" width="7" height="8" rx="1" stroke="currentColor" strokeWidth="1.2"/><path d="M4 3V2a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
              Copy prompt
            </>
          )}
        </button>
      </div>
      {/* Prompt text */}
      <div className="px-4 py-4">
        <p className="text-xs text-gray-400 font-poppins font-medium uppercase tracking-wide mb-2">Base style (include in every prompt)</p>
        <p className="text-xs text-gray-500 font-mono leading-relaxed bg-gray-50 rounded-lg px-3 py-2 mb-4">{BASE_PROMPT}</p>
        <p className="text-xs text-gray-400 font-poppins font-medium uppercase tracking-wide mb-2">Illustration-specific</p>
        <p className="text-sm text-gray-700 font-poppins leading-relaxed">{prompt}</p>
      </div>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────

export default function IllustrationsPage() {
  const [isDark, setIsDark] = useState(true);
  const bg = isDark ? DARK_BG : LIGHT_BG;

  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Illustrations</h1>
      <p className="text-gray-500 mb-10">
        AI-generated 3D illustrations used across the Purple app for empty states, onboarding, and tab splash screens.
        All generated using the prompts below — use them to create new illustrations that match the existing style.
      </p>

      {/* ── Header row with toggle ── */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-bold text-primary">All Illustrations</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: 2, background: '#f3f4f6', borderRadius: 9999, padding: 3 }}>
          <button
            onClick={() => setIsDark(false)}
            style={{ padding: '4px 14px', borderRadius: 9999, fontSize: 11, fontWeight: 500, background: !isDark ? '#ffffff' : 'transparent', color: !isDark ? '#111111' : '#9ca3af', boxShadow: !isDark ? '0 1px 3px rgba(0,0,0,0.1)' : 'none', transition: 'all 0.15s ease', border: 'none', cursor: 'pointer', lineHeight: '1.4' }}
          >Light</button>
          <button
            onClick={() => setIsDark(true)}
            style={{ padding: '4px 14px', borderRadius: 9999, fontSize: 11, fontWeight: 500, background: isDark ? '#011638' : 'transparent', color: isDark ? '#ffffff' : '#9ca3af', boxShadow: isDark ? '0 1px 3px rgba(0,0,0,0.15)' : 'none', transition: 'all 0.15s ease', border: 'none', cursor: 'pointer', lineHeight: '1.4' }}
          >Dark</button>
        </div>
      </div>

      {/* ── Illustration grid ── */}
      <div
        className="rounded-2xl p-8 grid grid-cols-2 sm:grid-cols-4 gap-6 mb-14 transition-colors duration-300"
        style={{ background: bg }}
      >
        {ILLUSTRATIONS.map(({ name, label, screen }) => (
          <div key={name} className="flex flex-col items-center gap-3">
            <PUIllustration name={name} size={120} />
            <div className="text-center">
              <p className="font-poppins font-bold text-xs" style={{ color: isDark ? '#ffffff' : '#000000' }}>{label}</p>
              <p className="font-poppins text-[11px] mt-0.5" style={{ color: isDark ? 'rgba(255,255,255,0.4)' : '#AAACB0' }}>{screen}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Prompt guide ── */}
      <h2 className="text-lg font-bold text-primary mb-2">AI Generation Prompts</h2>
      <p className="text-gray-500 text-sm mb-6">
        Each prompt below combines a shared base style with illustration-specific details. Hit &ldquo;Copy prompt&rdquo; to get the full combined prompt ready to paste.
      </p>
      <div className="flex flex-col gap-4 mb-14">
        {ILLUSTRATIONS.map(({ name }) => {
          const { title, prompt } = ILLUSTRATION_PROMPTS[name];
          return <PromptCard key={name} name={name} title={title} prompt={prompt} />;
        })}
      </div>

      {/* ── Swift ── */}
      <h2 className="text-base font-semibold text-gray-800 mb-2">Swift Usage</h2>
      <CodeBlock code={swiftCode} title="PUIllustration.swift" />
    </div>
  );
}
