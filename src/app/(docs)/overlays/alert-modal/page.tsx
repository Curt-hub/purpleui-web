'use client';
import { useState } from 'react';
import { PUAlertModal } from '@/components/ui/PUAlertModal';
import { PUButton } from '@/components/ui/PUButton';
import { ComponentPreview } from '@/components/docs/ComponentPreview';
import { PhoneFrame } from '@/components/docs/PhoneFrame';
import { PropsTable } from '@/components/docs/PropsTable';
import { CodeBlock } from '@/components/docs/CodeBlock';
import type { PUAlertModalVariant } from '@/components/ui/PUAlertModal';

const swiftCode = `PUAlertModal(
    isPresented: $showAlert,
    title: "Delete network?",
    message: "This will remove the saved network and all offline data.",
    confirmLabel: "Delete",
    cancelLabel: "Cancel",
    variant: .destructive
) {
    viewModel.deleteNetwork()
}`;

const props = [
  { name: 'isPresented',  type: 'Binding<Bool>',       required: true,       description: 'Controls modal visibility' },
  { name: 'title',        type: 'String',              required: true,       description: 'Modal heading' },
  { name: 'message',      type: 'String',              required: true,       description: 'Descriptive body text' },
  { name: 'confirmLabel', type: 'String',              default: '"Confirm"', description: 'Confirm button label' },
  { name: 'cancelLabel',  type: 'String',              default: '"Cancel"',  description: 'Cancel button label' },
  { name: 'variant',      type: 'PUAlertModalVariant', default: '.info',     description: '.info | .warning | .destructive' },
  { name: 'onConfirm',    type: '() -> Void',          required: true,       description: 'Confirm button action' },
];

export default function AlertModalPage() {
  const [open, setOpen] = useState<PUAlertModalVariant | null>(null);
  const [isDark, setIsDark] = useState(false);

  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Alert Modal</h1>
      <p className="text-gray-500 mb-8">Centered confirmation dialog with spring scale-in animation. Three semantic variants.</p>

      {/* In Context */}
      <div className="mb-12">
        <h2 className="text-lg font-bold text-primary mb-5">In Context</h2>
        <PhoneFrame label="Alert modal — centered overlay" dark={isDark} onToggle={() => setIsDark(d => !d)}>
          {/* Static replica of PUAlertModal — uses absolute instead of fixed so it stays inside the frame */}
          <div
            className="absolute inset-0"
            style={{ background: isDark ? 'rgba(0,0,0,0.6)' : 'rgba(0,0,0,0.4)' }}
          />
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div style={isDark ? {
              width: '100%', maxWidth: 320,
              background: '#0a2048',
              borderRadius: 20,
              padding: 24,
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 24px 60px rgba(0,0,0,0.6)',
            } : {
              width: '100%', maxWidth: 320,
              background: '#ffffff',
              borderRadius: 20,
              padding: 24,
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
            }}>
              <h2 style={{ fontSize: 15, fontWeight: 700, color: isDark ? '#ffffff' : 'rgb(17,24,39)', marginBottom: 8 }}>
                Delete network?
              </h2>
              <p style={{ fontSize: 13, color: isDark ? 'rgba(255,255,255,0.6)' : 'rgb(75,85,99)', lineHeight: 1.5, marginBottom: 24 }}>
                This will remove the saved network and all offline data permanently.
              </p>
              <div style={{ display: 'flex', gap: 12 }}>
                <button style={{
                  flex: 1, padding: '10px 0', borderRadius: 10,
                  background: isDark ? 'rgba(255,255,255,0.06)' : 'transparent',
                  border: isDark ? '1px solid rgba(255,255,255,0.12)' : '1px solid rgb(229,231,235)',
                  color: isDark ? 'rgba(255,255,255,0.7)' : 'rgb(55,65,81)',
                  fontSize: 13, fontWeight: 500, cursor: 'pointer',
                }}>Cancel</button>
                <button style={{
                  flex: 1, padding: '10px 0', borderRadius: 10,
                  background: '#F03A47', border: 'none',
                  color: '#ffffff', fontSize: 13, fontWeight: 600, cursor: 'pointer',
                }}>Delete</button>
              </div>
            </div>
          </div>
        </PhoneFrame>
      </div>

      <h2 className="text-base font-semibold text-gray-800 mb-2">Interactive Preview</h2>
      <ComponentPreview label="Click to trigger">
        <PUButton label="Info Modal" onClick={() => setOpen('info')} variant="secondary" />
        <PUButton label="Warning Modal" onClick={() => setOpen('warning')} variant="secondary" />
        <PUButton label="Destructive Modal" onClick={() => setOpen('destructive')} variant="destructive" />
      </ComponentPreview>

      <PUAlertModal
        isOpen={open !== null}
        onClose={() => setOpen(null)}
        onConfirm={() => setOpen(null)}
        title={open === 'destructive' ? 'Delete network?' : open === 'warning' ? 'Are you sure?' : 'Confirm action'}
        message={open === 'destructive' ? 'This will remove all saved data permanently.' : 'This action may have side effects.'}
        confirmLabel={open === 'destructive' ? 'Delete' : 'Confirm'}
        variant={open ?? 'info'}
        dark={isDark}
      />

      <h2 className="text-base font-semibold text-gray-800 mt-12 mb-2">Props</h2>
      <PropsTable props={props} />

      <h2 className="text-base font-semibold text-gray-800 mt-12 mb-2">Swift Usage</h2>
      <CodeBlock code={swiftCode} title="PUAlertModal.swift" />
    </div>
  );
}
