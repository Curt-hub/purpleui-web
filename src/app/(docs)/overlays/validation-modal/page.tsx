'use client';
import { useState } from 'react';
import { PUAlertModal } from '@/components/ui/PUAlertModal';
import { PUButton } from '@/components/ui/PUButton';
import { ComponentPreview } from '@/components/docs/ComponentPreview';
import { PhoneFrame } from '@/components/docs/PhoneFrame';
import { PropsTable } from '@/components/docs/PropsTable';
import { CodeBlock } from '@/components/docs/CodeBlock';
import type { PUAlertModalVariant } from '@/components/ui/PUAlertModal';

const swiftCode = `PUValidationModal(
    isPresented: $showModal,
    title: "You haven't added all Wi-Fi passes",
    message: "If you leave now, any remaining passes won't be added",
    confirmLabel: "Leave",
    cancelLabel: "Continue adding passes",
    variant: .destructive
) {
    dismiss()
}`;

const props = [
  { name: 'isPresented',  type: 'Binding<Bool>',            required: true,       description: 'Controls modal visibility' },
  { name: 'title',        type: 'String',                   required: true,       description: 'Modal heading' },
  { name: 'message',      type: 'String',                   required: true,       description: 'Descriptive body text' },
  { name: 'confirmLabel', type: 'String',                   default: '"Confirm"', description: 'Confirm/action button label' },
  { name: 'cancelLabel',  type: 'String',                   default: '"Cancel"',  description: 'Cancel button label' },
  { name: 'variant',      type: 'PUValidationModalVariant', default: '.info',     description: '.info | .warning | .destructive' },
  { name: 'onConfirm',    type: '() -> Void',               required: true,       description: 'Confirm button action' },
];

export default function ValidationModalPage() {
  const [open, setOpen] = useState<PUAlertModalVariant | null>(null);
  const [isDark, setIsDark] = useState(false);

  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Validation Modal</h1>
      <p className="text-gray-500 mb-8">
        Centered confirmation dialog with a blurred backdrop and spring scale-in animation.
        Stacked pill buttons — confirm action on top, cancel below. Three semantic variants.
      </p>

      {/* ── In Context ── */}
      <div className="mb-12">
        <h2 className="text-lg font-bold text-primary mb-5">In Context</h2>
        <PhoneFrame label="Validation modal — centered overlay" dark={isDark} onToggle={() => setIsDark(d => !d)}>
          {/* Backdrop */}
          <div
            className="absolute inset-0"
            style={{
              background: isDark ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.2)',
              backdropFilter: 'blur(5px)',
              WebkitBackdropFilter: 'blur(5px)',
            }}
          />
          {/* Modal card */}
          <div className="absolute inset-0 flex items-center justify-center px-[20px]">
            <div style={{
              width: '100%',
              background: isDark ? '#0a2048' : '#ffffff',
              borderRadius: 12,
              border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid #EFF0F0',
              boxShadow: '0px 10px 20px 0px rgba(0,0,0,0.1)',
              padding: '30px 20px',
              display: 'flex',
              flexDirection: 'column',
              gap: 24,
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <p style={{
                  fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 15,
                  color: isDark ? '#ffffff' : '#000000', margin: 0, lineHeight: 1.3,
                }}>
                  You haven&apos;t added all Wi-Fi passes
                </p>
                <p style={{
                  fontFamily: 'Poppins, sans-serif', fontWeight: 400, fontSize: 12,
                  color: isDark ? 'rgba(255,255,255,0.7)' : '#000000', margin: 0, lineHeight: 1.5,
                }}>
                  If you leave now, any remaining passes won&apos;t be added
                </p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <button style={{
                  width: '100%', height: 40, borderRadius: 50, border: 'none',
                  background: '#F03A47', color: '#ffffff',
                  fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 12, cursor: 'pointer',
                }}>Leave</button>
                <button style={{
                  width: '100%', height: 40, borderRadius: 50,
                  border: isDark ? '1px solid rgba(255,255,255,0.2)' : '1.5px solid #000000',
                  background: 'transparent',
                  color: isDark ? 'rgba(255,255,255,0.8)' : '#000000',
                  fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: 12, cursor: 'pointer',
                }}>Continue adding passes</button>
              </div>
            </div>
          </div>
        </PhoneFrame>
      </div>

      {/* ── Variants ── */}
      <h2 className="text-lg font-bold text-primary mb-5">Variants</h2>
      <ComponentPreview label="Click to trigger">
        <PUButton label="Info" onClick={() => setOpen('info')} variant="secondary" size="compact" />
        <PUButton label="Warning" onClick={() => setOpen('warning')} variant="secondary" size="compact" />
        <PUButton label="Destructive" onClick={() => setOpen('destructive')} variant="destructive" size="compact" />
      </ComponentPreview>

      <PUAlertModal
        isOpen={open !== null}
        onClose={() => setOpen(null)}
        onConfirm={() => setOpen(null)}
        title={
          open === 'destructive' ? "You haven't added all Wi-Fi passes"
          : open === 'warning'   ? 'Are you sure you want to continue?'
          :                        'Confirm this action'
        }
        message={
          open === 'destructive' ? "If you leave now, any remaining passes won't be added"
          : open === 'warning'   ? 'This action may affect your settings.'
          :                        'This will apply the selected changes.'
        }
        confirmLabel={open === 'destructive' ? 'Leave' : open === 'warning' ? 'Continue' : 'Confirm'}
        cancelLabel={open === 'destructive' ? 'Continue adding passes' : 'Cancel'}
        variant={open ?? 'info'}
        dark={isDark}
      />

      {/* ── Props ── */}
      <h2 className="text-base font-semibold text-gray-800 mt-12 mb-2">Props</h2>
      <PropsTable props={props} />

      {/* ── Swift ── */}
      <h2 className="text-base font-semibold text-gray-800 mt-12 mb-2">Swift Usage</h2>
      <CodeBlock code={swiftCode} title="PUValidationModal.swift" />
    </div>
  );
}
