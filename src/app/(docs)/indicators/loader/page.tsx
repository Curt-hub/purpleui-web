'use client';
import { useState } from 'react';
import { PULoader } from '@/components/ui/PULoader';
import { ComponentPreview } from '@/components/docs/ComponentPreview';
import { PhoneFrame } from '@/components/docs/PhoneFrame';
import { PropsTable } from '@/components/docs/PropsTable';
import { PlatformCodeBlock } from '@/components/docs/PlatformCodeBlock';

const swiftCode = `// Light variant — use on white/light backgrounds
PULoader(variant: .light)

// Dark variant — use on dark/navy backgrounds
PULoader(variant: .dark)

// Inside a full-screen loading state
struct LoadingView: View {
    var body: some View {
        ZStack {
            Color.appBackground.ignoresSafeArea()
            PULoader(variant: .light)
        }
    }
}

// Inline loading inside a button
PUButton("Connect", variant: .primary, isLoading: true) { }`;

const kotlinCode = `// Light variant — use on white/light backgrounds
PULoader(variant = PULoaderVariant.Light)

// Dark variant — use on dark/navy backgrounds
PULoader(variant = PULoaderVariant.Dark)

// Full-screen loading state
Box(
    modifier = Modifier.fillMaxSize().background(Color.White),
    contentAlignment = Alignment.Center
) {
    PULoader(variant = PULoaderVariant.Light)
}

// Inline loading inside a button
PUButton(title = "Connect", isLoading = true, onClick = { })`;

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

      <PlatformCodeBlock swift={swiftCode} kotlin={kotlinCode} title="PULoader" />
    </div>
  );
}
