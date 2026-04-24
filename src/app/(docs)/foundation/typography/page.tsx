'use client';
import { useState } from 'react';
import { typography } from '@/lib/tokens';

const typeScale = [
  {
    token: 'PUTypography.supporting',
    label: 'Supporting text',
    iosSize: 12,
    androidSize: 11,
    weight: 'Regular',
    sampleStyle: { fontSize: typography.sizes.supporting },
  },
  {
    token: 'PUTypography.body',
    label: 'Body text',
    iosSize: 14,
    androidSize: 14,
    weight: 'Regular',
    sampleStyle: { fontSize: typography.sizes.body },
  },
  {
    token: 'PUTypography.bodyBold',
    label: 'Body text — Bold',
    iosSize: 14,
    androidSize: 14,
    weight: 'Bold',
    sampleStyle: { fontSize: typography.sizes.body },
  },
  {
    token: 'PUTypography.section',
    label: 'Section title',
    iosSize: 18,
    androidSize: 16,
    weight: 'Bold',
    sampleStyle: { fontSize: typography.sizes.section },
  },
  {
    token: 'PUTypography.title',
    label: 'Page title',
    iosSize: 22,
    androidSize: 20,
    weight: 'Bold',
    sampleStyle: { fontSize: typography.sizes.title },
  },
  {
    token: 'PUTypography.hero',
    label: 'Hero',
    iosSize: 40,
    androidSize: 28,
    weight: 'Bold',
    sampleStyle: { fontSize: typography.sizes.hero },
  },
];

function TypeSection({
  token,
  label,
  iosSize,
  androidSize,
  weight,
  sampleStyle,
  previewText,
}: (typeof typeScale)[0] & { previewText: string }) {
  const [copied, setCopied] = useState(false);
  const displayText = previewText || 'The quick brown fox jumps over the lazy dog';
  const isBold = weight === 'Bold';

  const handleCopy = () => {
    navigator.clipboard.writeText(token);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="border-b border-[#DDDDDF] py-8">
      <div className="flex items-start justify-between gap-4 mb-5">
        <div className="flex flex-col gap-1 min-w-0">
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-gray-900 shrink-0">{label}</span>
            <span className="text-xs text-gray-400 shrink-0">{weight}</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-gray-400 font-mono">
            <span>iOS {iosSize}pt</span>
            <span className="text-gray-200">·</span>
            <span>Android {androidSize}sp</span>
          </div>
        </div>
        <button
          onClick={handleCopy}
          className="text-xs text-[#7458FD] hover:text-[#5a41d4] font-mono px-2.5 py-1 rounded-md bg-[#7458FD]/5 hover:bg-[#7458FD]/15 transition-colors shrink-0 whitespace-nowrap"
        >
          {copied ? 'Copied!' : token}
        </button>
      </div>

      <div className="overflow-hidden">
        <span
          className="text-black block truncate min-w-0"
          style={{ ...sampleStyle, fontWeight: isBold ? 700 : 400 }}
        >
          {displayText}
        </span>
      </div>
    </div>
  );
}

export default function TypographyPage() {
  const [previewText, setPreviewText] = useState('');

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

      {typeScale.map(entry => (
        <TypeSection key={entry.token} {...entry} previewText={previewText} />
      ))}

      {/* Import once */}
      <section className="mt-10 space-y-4">
        <h2 className="text-lg font-bold text-gray-900">Import once, use everywhere</h2>
        <p className="text-sm text-gray-500">
          Add the native package to your project once. After that, use any token directly — your IDE autocompletes the rest.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-xs font-medium text-gray-400 mb-2">Swift (iOS)</p>
            <div className="bg-[#F7F7F8] rounded-xl p-4 text-sm font-mono text-gray-700 space-y-1">
              <p><span className="text-[#7458FD]">import</span> PurpleUI</p>
              <p className="text-gray-400 pt-1">{`// then use directly:`}</p>
              <p>Text(<span className="text-green-700">&quot;Hello&quot;</span>)</p>
              <p>{'  '}<span className="text-[#7458FD]">.font</span>(PUTypography.body)</p>
            </div>
          </div>

          <div>
            <p className="text-xs font-medium text-gray-400 mb-2">Kotlin (Android)</p>
            <div className="bg-[#F7F7F8] rounded-xl p-4 text-sm font-mono text-gray-700 space-y-1">
              <p><span className="text-[#7458FD]">import</span> ai.purple.purpleui</p>
              <p>{'  '}.tokens.<span className="text-[#7458FD]">PUTypography</span></p>
              <p className="text-gray-400 pt-1">{`// then use directly:`}</p>
              <p>Text(<span className="text-green-700">&quot;Hello&quot;</span>,</p>
              <p>{'  '}style = PUTypography.body)</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
