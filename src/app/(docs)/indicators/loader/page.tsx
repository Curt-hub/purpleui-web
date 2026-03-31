'use client';
import { useState } from 'react';
import { PULoader } from '@/components/ui/PULoader';
import { ComponentPreview } from '@/components/docs/ComponentPreview';
import { PhoneFrame } from '@/components/docs/PhoneFrame';
import { PropsTable } from '@/components/docs/PropsTable';
import { CodeBlock } from '@/components/docs/CodeBlock';

const swiftCode = `import SwiftUI

struct ContentView: View {
    var body: some View {
        VStack(spacing: 24) {
            PULoader(variant: .light)
            PULoader(variant: .dark)
        }
        .padding()
    }
}`;

const props = [
  { name: 'variant', type: 'PULoaderVariant', default: "'light'", description: 'light | dark' },
];

export default function LoaderPage() {
  const [isDark, setIsDark] = useState(false);

  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Loader</h1>
      <p className="text-gray-500 mb-8">
        Used to indicate background activity. Comes in Light and Dark variants to suit any surface.
      </p>

      {/* In Context */}
      <div className="mb-12">
        <h2 className="text-lg font-bold text-primary mb-5">In Context</h2>
        <PhoneFrame label="Loader — centered loading state" dark={isDark} onToggle={() => setIsDark(d => !d)}>
          <div className="flex h-full items-center justify-center">
            <PULoader variant={isDark ? 'dark' : 'light'} />
          </div>
        </PhoneFrame>
      </div>

      <h2 className="text-lg font-bold text-primary mb-3">Loader (Light)</h2>
      <ComponentPreview label="Default">
        <PULoader variant="light" />
      </ComponentPreview>

      <h2 className="text-lg font-bold text-primary mt-12 mb-3">Loader (Dark)</h2>
      <ComponentPreview label="Default" bg="dark">
        <PULoader variant="dark" />
      </ComponentPreview>

      <h2 className="text-base font-semibold text-gray-800 mt-12 mb-2">Props</h2>
      <PropsTable props={props} />

      <h2 className="text-base font-semibold text-gray-800 mt-12 mb-2">Swift Usage</h2>
      <CodeBlock code={swiftCode} title="PULoader.swift" />
    </div>
  );
}
