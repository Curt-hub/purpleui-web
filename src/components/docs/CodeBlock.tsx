'use client';
import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
}

export function CodeBlock({ code, language = 'swift', title }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl overflow-hidden border border-gray-200 my-4">
      {title && (
        <div className="flex items-center justify-between px-4 py-2.5 bg-gray-900 border-b border-white/10">
          <span className="text-xs font-medium text-gray-400">{title}</span>
          <button
            onClick={copy}
            className="text-xs text-gray-400 hover:text-white transition-colors flex items-center gap-1.5"
          >
            {copied ? '✓ Copied' : 'Copy'}
          </button>
        </div>
      )}
      {!title && (
        <div className="flex justify-end px-4 py-2 bg-gray-900 border-b border-white/10">
          <button
            onClick={copy}
            className="text-xs text-gray-400 hover:text-white transition-colors"
          >
            {copied ? '✓ Copied' : 'Copy'}
          </button>
        </div>
      )}
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        customStyle={{ margin: 0, borderRadius: 0, fontSize: '0.8125rem', background: '#1e1e2e' }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
