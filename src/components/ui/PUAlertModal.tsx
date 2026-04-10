'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { colors } from '@/lib/tokens';

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

const confirmBg: Record<PUAlertModalVariant, string> = {
  info:        colors.brand,
  warning:     colors.warning,
  destructive: colors.error,
};
const confirmColor: Record<PUAlertModalVariant, string> = {
  info:        '#ffffff',
  warning:     colors.onBackground,
  destructive: '#ffffff',
};

export function PUAlertModal({
  isOpen, onClose, onConfirm, title, message,
  confirmLabel = 'Confirm', cancelLabel = 'Cancel', variant = 'info', dark = false,
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
            style={{
              background: dark ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.2)',
              backdropFilter: 'blur(5px)',
              WebkitBackdropFilter: 'blur(5px)',
            }}
            onClick={onClose}
          />

          <div className="fixed inset-0 z-50 flex items-center justify-center px-[30px]">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 12 }}
              transition={{ type: 'spring', stiffness: 420, damping: 26 }}
              style={{
                width: '100%',
                maxWidth: 393,
                background: dark ? '#0a2048' : colors.background,   // backgroundElevated dark : background
                borderRadius: 12,
                border: dark ? '1px solid rgba(255,255,255,0.1)' : `1px solid ${colors.outlineSubtle}`,  // outline dark : outlineSubtle
                boxShadow: '0px 10px 20px 0px rgba(0,0,0,0.1)',
                padding: '50px 30px',
                display: 'flex',
                flexDirection: 'column',
                gap: 40,
              }}
            >
              {/* Content */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <p style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: 700,
                  fontSize: 18,
                  color: dark ? '#ffffff' : colors.onBackground,  // onBackground dark : onBackground
                  margin: 0,
                  lineHeight: 1.3,
                }}>
                  {title}
                </p>
                <p style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: 400,
                  fontSize: 14,
                  color: dark ? 'rgba(255,255,255,0.7)' : colors.onBackground,  // onBackgroundSecondary dark : onBackground
                  margin: 0,
                  lineHeight: 1.5,
                }}>
                  {message}
                </p>
              </div>

              {/* Buttons — stacked vertically */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {/* Confirm */}
                <button
                  onClick={onConfirm}
                  style={{
                    width: '100%',
                    height: 48,
                    borderRadius: 50,
                    border: 'none',
                    background: confirmBg[variant],
                    color: confirmColor[variant],
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: 700,
                    fontSize: 14,
                    cursor: 'pointer',
                  }}
                >
                  {confirmLabel}
                </button>
                {/* Cancel */}
                <button
                  onClick={onClose}
                  style={{
                    width: '100%',
                    height: 48,
                    borderRadius: 50,
                    border: dark ? '1px solid rgba(255,255,255,0.2)' : `1.5px solid ${colors.onBackground}`,  // outline dark : onBackground
                    background: 'transparent',
                    color: dark ? 'rgba(255,255,255,0.8)' : colors.onBackground,  // onBackgroundSecondary dark : onBackground
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: 700,
                    fontSize: 14,
                    cursor: 'pointer',
                  }}
                >
                  {cancelLabel}
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
