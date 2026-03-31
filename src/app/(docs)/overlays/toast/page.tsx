'use client';
import { useState } from 'react';
import { PUToast } from '@/components/ui/PUToast';
import { PUButton } from '@/components/ui/PUButton';
import { ComponentPreview } from '@/components/docs/ComponentPreview';
import { PhoneFrame } from '@/components/docs/PhoneFrame';
import { PropsTable } from '@/components/docs/PropsTable';
import { CodeBlock } from '@/components/docs/CodeBlock';
import type { PUToastVariant } from '@/components/ui/PUToast';

const swiftCode = `// In your view:
.toast(isPresented: $showToast, message: "Connected!", variant: .success)

// ToastView modifier:
struct ToastModifier: ViewModifier {
    @Binding var isPresented: Bool
    let message: String
    let variant: PUToastVariant
    let showIcon: Bool

    func body(content: Content) -> some View {
        content.overlay(alignment: .top) {
            if isPresented {
                PUToast(message: message, variant: variant, showIcon: showIcon)
                    .padding(.horizontal, 16)
                    .padding(.top, 60)
                    .transition(.move(edge: .top).combined(with: .opacity))
                    .onAppear {
                        DispatchQueue.main.asyncAfter(deadline: .now() + 2.5) {
                            isPresented = false
                        }
                    }
            }
        }
    }
}`;

const props = [
  { name: 'isPresented', type: 'Binding<Bool>',  required: true,      description: 'Controls visibility' },
  { name: 'message',     type: 'String',          required: true,      description: 'Toast message text' },
  { name: 'variant',     type: 'PUToastVariant',  default: '.success', description: '.success | .error | .warning | .info | .offline' },
  { name: 'showIcon',    type: 'Bool',            default: 'true',     description: 'Show leading icon' },
];

const VARIANTS: { variant: PUToastVariant; message: string }[] = [
  { variant: 'success', message: 'Connected to PurpleWi-Fi!' },
  { variant: 'info',    message: 'Syncing your passes…' },
  { variant: 'warning', message: 'Low signal detected' },
  { variant: 'error',   message: 'Connection failed' },
  { variant: 'offline', message: 'You\'re offline' },
];

export default function ToastPage() {
  const [active, setActive] = useState<PUToastVariant | null>(null);
  const [isDark, setIsDark] = useState(false);

  const show = (v: PUToastVariant) => {
    setActive(null);
    setTimeout(() => {
      setActive(v);
      setTimeout(() => setActive(null), 2500);
    }, 50);
  };

  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Toast</h1>
      <p className="text-gray-500 mb-8">
        Ephemeral notification pill anchored to the top of the screen. Auto-dismisses after 2.5s.
        Five semantic variants, each available with or without a leading icon.
      </p>

      {/* In Context */}
      <div className="mb-12">
        <h2 className="text-lg font-bold text-primary mb-5">In Context</h2>
        <PhoneFrame label="Toast — anchored to screen top" dark={isDark} onToggle={() => setIsDark(d => !d)}>
          <div className="flex flex-col h-full relative">
            <div className="absolute top-16 left-0 right-0 flex justify-center px-4">
              <PUToast
                visible={true}
                message="Connected to PurpleWi-Fi!"
                variant="success"
              />
            </div>
          </div>
        </PhoneFrame>
      </div>

      {/* Interactive */}
      <h2 className="text-base font-semibold text-gray-800 mb-2">Interactive Preview</h2>
      <ComponentPreview label="Click to trigger">
        <div className="flex flex-wrap gap-2">
          {VARIANTS.map(({ variant }) => (
            <PUButton
              key={variant}
              label={variant.charAt(0).toUpperCase() + variant.slice(1)}
              onClick={() => show(variant)}
              variant="secondary"
              size="sm"
            />
          ))}
        </div>
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[300px] z-10">
          <PUToast
            visible={active !== null}
            message={active ? VARIANTS.find(v => v.variant === active)?.message ?? '' : ''}
            variant={active ?? 'success'}
          />
        </div>
      </ComponentPreview>

      {/* Static variant grid */}
      <h2 className="text-lg font-bold text-primary mt-12 mb-5">All Variants</h2>

      {/* With icon */}
      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">With Icon</h3>
      <div className="flex flex-col gap-3 mb-8">
        {VARIANTS.map(({ variant, message }) => (
          <div key={variant} className="w-[300px]">
            <PUToast visible={true} message={message} variant={variant} showIcon={true} />
          </div>
        ))}
      </div>

      {/* Without icon */}
      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Without Icon</h3>
      <div className="flex flex-col gap-3 mb-12">
        {VARIANTS.map(({ variant, message }) => (
          <div key={variant} className="w-[300px]">
            <PUToast visible={true} message={message} variant={variant} showIcon={false} />
          </div>
        ))}
      </div>

      <h2 className="text-base font-semibold text-gray-800 mt-12 mb-2">Props</h2>
      <PropsTable props={props} />

      <h2 className="text-base font-semibold text-gray-800 mt-12 mb-2">Swift Usage</h2>
      <CodeBlock code={swiftCode} title="ToastView.swift" />
    </div>
  );
}
