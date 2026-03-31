'use client';
import { useState } from 'react';
import { spacing, radius } from '@/lib/tokens';

function SpacingRow({ tokenKey, value }: { tokenKey: string; value: string | number }) {
  const [copied, setCopied] = useState(false);

  const handleClick = () => {
    navigator.clipboard.writeText(`${value}px`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div
      className="flex items-center gap-4 cursor-pointer group -mx-3 px-3 py-2.5 rounded-lg hover:bg-[#7458FD]/5 transition-colors"
      onClick={handleClick}
      title={`spacing.${tokenKey} — click to copy`}
    >
      <span className="text-xs font-mono text-[#595959] w-10 shrink-0">{tokenKey}</span>
      <span className="text-xs font-mono w-16 shrink-0">
        {copied ? (
          <span className="text-[#7458FD] font-bold">Copied!</span>
        ) : (
          <span className="text-[#AAACB0]">{value}pt</span>
        )}
      </span>
      <div
        style={{ width: Number(value) * 2, height: 20 }}
        className="bg-primary/30 group-hover:bg-primary/50 rounded shrink-0 transition-colors"
      />
    </div>
  );
}

export default function SpacingPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Spacing &amp; Radius</h1>
      <p className="text-gray-500 mb-10">
        All spacing and corner radius tokens used across PurpleUI components. Click any spacing row to copy its px value.
      </p>

      <section className="mb-12">
        <h2 className="text-lg font-bold text-primary mb-5">Spacing Scale</h2>
        <div className="space-y-1">
          {Object.entries(spacing).map(([key, value]) => (
            <SpacingRow key={key} tokenKey={key} value={value} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-bold text-primary mb-6">Border Radius</h2>
        <div className="flex flex-wrap gap-8">
          {Object.entries(radius).map(([key, value]) => (
            <div key={key} className="flex flex-col items-center gap-2">
              <div
                style={{ borderRadius: Math.min(Number(value), 40) }}
                className="w-16 h-16 bg-primary/20 border-2 border-primary/40"
              />
              <span className="text-xs font-mono text-[#595959]">{key}</span>
              <span className="text-xs text-[#AAACB0]">{value}pt</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
