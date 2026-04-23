'use client';
import { useState } from 'react';
import { typography } from '@/lib/tokens';

const typeScale = [
  {
    section: 'Supporting text',
    size: 12,
    purpose: 'Support text',
    sampleStyle: { fontSize: typography.sizes.supporting },
    swiftFont: '.font(.custom("Poppins-Regular", size: 12)) // Supporting',
    kotlinFont: 'PUTypography.supporting // 12sp · Regular',
  },
  {
    section: 'Body text',
    size: 14,
    purpose: 'Body text',
    sampleStyle: { fontSize: typography.sizes.body },
    swiftFont: '.font(.custom("Poppins-Regular", size: 14)) // Body',
    kotlinFont: 'PUTypography.body // 14sp · Regular',
  },
  {
    section: 'Section title',
    size: 18,
    purpose: 'Section title',
    sampleStyle: { fontSize: typography.sizes.section },
    swiftFont: '.font(.custom("Poppins-Bold", size: 18)) // Section title',
    kotlinFont: 'PUTypography.section // 18sp · Bold',
  },
  {
    section: 'Page title',
    size: 22,
    purpose: 'Page title',
    sampleStyle: { fontSize: typography.sizes.title },
    swiftFont: '.font(.custom("Poppins-Bold", size: 22)) // Page title',
    kotlinFont: 'PUTypography.title // 22sp · Bold',
  },
  {
    section: 'Hero',
    size: 40,
    purpose: 'Hero / page header',
    sampleStyle: { fontSize: typography.sizes.hero },
    swiftFont: '.font(.custom("Poppins-Bold", size: 40)) // Hero',
    kotlinFont: 'PUTypography.hero // 40sp · Bold',
  },
];

type Platform = 'swift' | 'kotlin';

function TypeSection({
  section,
  size,
  purpose,
  sampleStyle,
  swiftFont,
  kotlinFont,
  previewText,
  platform,
}: (typeof typeScale)[0] & { previewText: string; platform: Platform }) {
  const [copied, setCopied] = useState(false);
  const displayText = previewText || 'The quick brown fox jumps over the lazy dog';
  const snippet = platform === 'swift' ? swiftFont : kotlinFont;

  const handleCopy = () => {
    navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="border-b border-[#DDDDDF] py-8">
      <div className="flex items-center justify-between gap-4 mb-5">
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-sm font-bold text-gray-900 shrink-0">{section}</span>
          <span className="text-xs text-gray-400 font-mono shrink-0">{size}px · Auto · 0%</span>
          <span className="text-xs text-gray-400 truncate hidden sm:block">{purpose}</span>
        </div>
        <button
          onClick={handleCopy}
          className="text-xs text-[#7458FD] hover:text-[#5a41d4] font-mono px-2.5 py-1 rounded-md bg-[#7458FD]/5 hover:bg-[#7458FD]/15 transition-colors shrink-0"
        >
          {copied ? 'Copied!' : platform === 'swift' ? 'Copy Swift' : 'Copy Kotlin'}
        </button>
      </div>

      <div className="space-y-3 overflow-hidden">
        <div className="flex items-baseline gap-3 min-w-0">
          <span className="text-xs text-gray-400 w-12 shrink-0">Regular</span>
          <span className="font-normal text-black truncate min-w-0" style={sampleStyle}>
            {displayText}
          </span>
        </div>
        <div className="flex items-baseline gap-3 min-w-0">
          <span className="text-xs text-gray-400 w-12 shrink-0">Bold</span>
          <span className="font-bold text-black truncate min-w-0" style={sampleStyle}>
            {displayText}
          </span>
        </div>
      </div>
    </div>
  );
}

function PlatformToggle({ platform, onChange }: { platform: Platform; onChange: (p: Platform) => void }) {
  return (
    <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
      {(['swift', 'kotlin'] as Platform[]).map(p => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
            platform === p
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          {p === 'swift' ? 'Swift' : 'Kotlin'}
        </button>
      ))}
    </div>
  );
}

export default function TypographyPage() {
  const [previewText, setPreviewText] = useState('');
  const [platform, setPlatform] = useState<Platform>('swift');

  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Typography</h1>
      <p className="text-gray-500 mb-8">
        To maintain a consistent and professional brand image, please adhere to the following typeface guidelines.
      </p>

      <div className="mb-10">
        <input
          type="text"
          value={previewText}
          onChange={e => setPreviewText(e.target.value)}
          placeholder="Type to preview…"
          className="w-full px-4 py-3 rounded-xl border border-[#DDDDDF] font-poppins text-sm text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7458FD]/30 focus:border-[#7458FD] transition-shadow"
        />
      </div>

      <div className="grid grid-cols-2 gap-6 mb-10">
        <div className="bg-[#011638] rounded-xl p-8">
          <p className="text-sm font-bold text-white/70 mb-2">Font-family:</p>
          <p className="text-[22px] font-bold text-white">Poppins</p>
        </div>
        <div className="bg-[#011638] rounded-xl p-8">
          <p className="text-sm font-bold text-white/70 mb-2">Font source:</p>
          <a
            href="https://fonts.google.com/specimen/Poppins"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[22px] font-bold text-white underline"
          >
            Google Fonts
          </a>
        </div>
      </div>

      {/* Platform toggle */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-400">Copy snippets for:</span>
        <PlatformToggle platform={platform} onChange={setPlatform} />
      </div>

      {typeScale.map(entry => (
        <TypeSection key={entry.section} {...entry} previewText={previewText} platform={platform} />
      ))}

      <section className="mt-10">
        {platform === 'swift' ? (
          <>
            <h2 className="text-lg font-bold text-primary mb-4">Usage in SwiftUI</h2>
            <div className="space-y-2 bg-[#F7F7F8] rounded-xl p-5 text-sm font-mono text-gray-700">
              <p>
                <span className="text-primary">.font</span>(.custom(
                <span className="text-green-700">&quot;Poppins-Regular&quot;</span>, size: 12)){' '}
                <span className="text-gray-400">{`// Supporting`}</span>
              </p>
              <p>
                <span className="text-primary">.font</span>(.custom(
                <span className="text-green-700">&quot;Poppins-Regular&quot;</span>, size: 14)){' '}
                <span className="text-gray-400">{`// Body`}</span>
              </p>
              <p>
                <span className="text-primary">.font</span>(.custom(
                <span className="text-green-700">&quot;Poppins-Bold&quot;</span>, size: 18)){' '}
                <span className="text-gray-400">{`// Section title`}</span>
              </p>
              <p>
                <span className="text-primary">.font</span>(.custom(
                <span className="text-green-700">&quot;Poppins-Bold&quot;</span>, size: 22)){' '}
                <span className="text-gray-400">{`// Page title`}</span>
              </p>
              <p>
                <span className="text-primary">.font</span>(.custom(
                <span className="text-green-700">&quot;Poppins-Bold&quot;</span>, size: 40)){' '}
                <span className="text-gray-400">{`// Hero`}</span>
              </p>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-lg font-bold text-primary mb-4">Usage in Jetpack Compose</h2>
            <div className="space-y-2 bg-[#F7F7F8] rounded-xl p-5 text-sm font-mono text-gray-700">
              <p>
                <span className="text-primary">PUTypography</span>.supporting{' '}
                <span className="text-gray-400">{`// 12sp · Regular`}</span>
              </p>
              <p>
                <span className="text-primary">PUTypography</span>.body{' '}
                <span className="text-gray-400">{`// 14sp · Regular`}</span>
              </p>
              <p>
                <span className="text-primary">PUTypography</span>.section{' '}
                <span className="text-gray-400">{`// 18sp · Bold`}</span>
              </p>
              <p>
                <span className="text-primary">PUTypography</span>.title{' '}
                <span className="text-gray-400">{`// 22sp · Bold`}</span>
              </p>
              <p>
                <span className="text-primary">PUTypography</span>.hero{' '}
                <span className="text-gray-400">{`// 40sp · Bold`}</span>
              </p>
            </div>
            <p className="text-xs text-gray-400 mt-3 font-mono">
              import ai.purple.purpleui.tokens.PUTypography
            </p>
          </>
        )}
      </section>
    </div>
  );
}
