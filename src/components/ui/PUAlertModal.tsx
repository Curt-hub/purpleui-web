'use client';
import { motion, AnimatePresence } from 'framer-motion';

export type PUAlertModalVariant = 'info' | 'warning' | 'destructive';

interface PUAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: PUAlertModalVariant;
  dark?: boolean;
}

// Confirm button colours (light + dark use same flat colour)
const confirmBg: Record<PUAlertModalVariant, string> = {
  info: '#7458FD',
  warning: '#E9D502',
  destructive: '#F03A47',
};
const confirmColor: Record<PUAlertModalVariant, string> = {
  info: '#ffffff',
  warning: '#000000',
  destructive: '#ffffff',
};

export function PUAlertModal({
  isOpen, onClose, onConfirm, title, message,
  confirmLabel = 'Confirm', cancelLabel = 'Cancel', variant = 'info', dark
}: PUAlertModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40"
            style={{ background: dark ? 'rgba(0,0,0,0.6)' : 'rgba(0,0,0,0.4)' }}
            onClick={onClose}
          />

          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 12 }}
              transition={{ type: 'spring', stiffness: 420, damping: 26 }}
              className="w-full max-w-sm"
              style={dark ? {
                background: '#0a2048',
                borderRadius: 20,
                padding: 24,
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 24px 60px rgba(0,0,0,0.6)',
              } : {
                background: '#ffffff',
                borderRadius: 20,
                padding: 24,
                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
              }}
            >
              <h2
                className="text-base font-bold mb-2"
                style={{ color: dark ? '#ffffff' : 'rgb(17,24,39)' }}
              >{title}</h2>
              <p
                className="text-sm mb-6"
                style={{ color: dark ? 'rgba(255,255,255,0.6)' : 'rgb(75,85,99)' }}
              >{message}</p>
              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 py-2.5 rounded-[10px] text-sm font-medium transition-colors"
                  style={dark ? {
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    color: 'rgba(255,255,255,0.7)',
                  } : {
                    border: '1px solid rgb(229,231,235)',
                    color: 'rgb(55,65,81)',
                  }}
                >
                  {cancelLabel}
                </button>
                <button
                  onClick={onConfirm}
                  className="flex-1 py-2.5 rounded-[10px] text-sm font-medium transition-colors"
                  style={{
                    background: confirmBg[variant],
                    color: confirmColor[variant],
                    border: 'none',
                  }}
                >
                  {confirmLabel}
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
