'use client';
import { useState } from 'react';
import { PUIconButton } from '@/components/ui/PUIconButton';
import { ComponentPreview } from '@/components/docs/ComponentPreview';
import { PhoneFrame } from '@/components/docs/PhoneFrame';
import { PropsTable } from '@/components/docs/PropsTable';
import { CodeBlock } from '@/components/docs/CodeBlock';
import { faArrowLeft, faXmark, faPlus } from '@fortawesome/free-solid-svg-icons';

const swiftCode = `import SwiftUI

struct ContentView: View {
    var body: some View {
        VStack(spacing: 12) {
            PUIconButton(variant: .light) { }
            PUIconButton(variant: .dark) { }
            PUIconButton(icon: .xmark, variant: .light) { }
        }
        .padding()
    }
}`;

const props = [
  { name: 'icon',     type: 'IconDefinition',     default: 'faArrowLeft', description: 'FA icon shown inside the button' },
  { name: 'variant',  type: 'PUIconButtonVariant', default: "'light'",     description: 'light | dark' },
  { name: 'text',     type: 'string?',             default: 'undefined',   description: 'Optional label — renders as pill with icon + text' },
  { name: 'label',    type: 'string?',             default: 'undefined',   description: 'Accessible aria-label' },
  { name: 'disabled', type: 'boolean',             default: 'false',       description: 'Disables interaction and dims button' },
  { name: 'onClick',  type: '() => void',          default: 'undefined',   description: 'Tap action' },
];

export default function IconButtonPage() {
  const [isDark, setIsDark] = useState(false);

  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Icon Button</h1>
      <p className="text-gray-500 mb-8">
        Circular navigation button used to go back or dismiss. Available in Light and Dark variants to suit both light and dark backgrounds.
      </p>

      {/* In Context */}
      <div className="mb-12">
        <h2 className="text-lg font-bold text-primary mb-5">In Context</h2>
        <PhoneFrame label="Back button — top-left navigation" dark={isDark} onToggle={() => setIsDark(d => !d)}>
          <div className="flex flex-col h-full">
            <div style={{ height: 56 }} />
            <div className="p-5">
              <PUIconButton variant={isDark ? 'dark' : 'light'} icon={faArrowLeft} />
            </div>
          </div>
        </PhoneFrame>
      </div>

      <h2 className="text-lg font-bold text-primary mb-3">Back button (Light)</h2>
      <ComponentPreview label="Default">
        <PUIconButton variant="light" />
      </ComponentPreview>
      <ComponentPreview label="Custom icon">
        <PUIconButton variant="light" icon={faXmark} />
      </ComponentPreview>
      <ComponentPreview label="Disabled">
        <PUIconButton variant="light" disabled />
      </ComponentPreview>

      <h2 className="text-lg font-bold text-primary mt-12 mb-3">Back button (Dark)</h2>
      <ComponentPreview label="Default" bg="dark">
        <PUIconButton variant="dark" />
      </ComponentPreview>
      <ComponentPreview label="Custom icon" bg="dark">
        <PUIconButton variant="dark" icon={faXmark} />
      </ComponentPreview>
      <ComponentPreview label="Disabled" bg="dark">
        <PUIconButton variant="dark" disabled />
      </ComponentPreview>

      <h2 className="text-lg font-bold text-primary mt-12 mb-3">With text</h2>
      <ComponentPreview label="Light">
        <PUIconButton variant="light" icon={faPlus} text="Add Pass" />
      </ComponentPreview>
      <ComponentPreview label="Dark" bg="dark">
        <PUIconButton variant="dark" icon={faPlus} text="Add Pass" />
      </ComponentPreview>

      <h2 className="text-base font-semibold text-gray-800 mt-12 mb-2">Props</h2>
      <PropsTable props={props} />

      <h2 className="text-base font-semibold text-gray-800 mt-12 mb-2">Swift Usage</h2>
      <CodeBlock code={swiftCode} title="PUIconButton.swift" />
    </div>
  );
}
