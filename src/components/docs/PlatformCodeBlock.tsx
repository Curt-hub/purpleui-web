'use client';
import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

type Platform = 'swift' | 'kotlin';

interface PlatformCodeBlockProps {
  swift: string;
  kotlin: string;
  title?: string;
}

export function PlatformCodeBlock({ swift, kotlin, title }: PlatformCodeBlockProps) {
  const [platform, setPlatform] = useState<Platform>('swift');
  const [copied, setCopied] = useState(false);

  const code = platform === 'swift' ? swift : kotlin;
  const language = platform === 'swift' ? 'swift' : 'kotlin';

  const copy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt-10 mb-4">
      {/* Section label */}
      <h2 className="text-base font-semibold text-gray-800 mb-3">Usage</h2>

      <div className="rounded-xl overflow-hidden border border-gray-200">
        {/* Header bar: toggle + copy */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-gray-900 border-b border-white/10">
          {/* Platform toggle */}
          <div className="flex items-center gap-1 bg-white/10 rounded-full p-0.5">
            {(['swift', 'kotlin'] as Platform[]).map((p) => (
              <button
                key={p}
                onClick={() => setPlatform(p)}
                className={`px-3.5 py-1 rounded-full text-xs font-semibold transition-all duration-150 ${
                  platform === p
                    ? 'bg-[#7458FD] text-white shadow-sm'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {p === 'swift' ? 'Swift' : 'Kotlin'}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {title && (
              <span className="text-xs text-gray-500 font-mono">{title}</span>
            )}
            <button
              onClick={copy}
              className="text-xs text-gray-400 hover:text-white transition-colors flex items-center gap-1.5"
            >
              {copied ? '✓ Copied' : 'Copy'}
            </button>
          </div>
        </div>

        {/* Code block */}
        <SyntaxHighlighter
          key={platform}
          language={language}
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            borderRadius: 0,
            fontSize: '0.8125rem',
            background: '#1e1e2e',
            lineHeight: '1.6',
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
