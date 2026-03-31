'use client';
import { motion, AnimatePresence } from 'framer-motion';

export type PUToastVariant = 'success' | 'error' | 'warning' | 'info' | 'offline';

interface PUToastProps {
  visible: boolean;
  message: string;
  variant?: PUToastVariant;
  showIcon?: boolean;
  onDismiss?: () => void;
}

const config: Record<PUToastVariant, { bg: string; textColor: string; Icon: () => JSX.Element }> = {
  success: {
    bg: '#16C172',
    textColor: '#ffffff',
    Icon: () => (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M2.5 8.5L6 12L13.5 4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  error: {
    bg: '#F03A47',
    textColor: '#ffffff',
    Icon: () => (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M4 4L12 12M12 4L4 12" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
  warning: {
    bg: '#E9D502',
    textColor: '#000000',
    Icon: () => (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M8 2L14.5 13.5H1.5L8 2Z" stroke="black" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 6.5V9" stroke="black" strokeWidth="1.8" strokeLinecap="round"/>
        <circle cx="8" cy="11.5" r="0.75" fill="black"/>
      </svg>
    ),
  },
  info: {
    bg: '#045DEC',
    textColor: '#ffffff',
    Icon: () => (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <circle cx="8" cy="8" r="6" stroke="white" strokeWidth="1.6"/>
        <path d="M8 7.5V11" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
        <circle cx="8" cy="5.5" r="0.75" fill="white"/>
      </svg>
    ),
  },
  offline: {
    bg: '#3A3D4A',
    textColor: '#ffffff',
    Icon: () => (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M1.5 1.5L14.5 14.5" stroke="white" strokeWidth="1.6" strokeLinecap="round"/>
        <path d="M3.5 6.2C2.5 6.9 1.8 7.8 1.5 8C3 9.8 5.4 11 8 11C8.8 11 9.5 10.9 10.2 10.7M5.5 4.2C6.3 4.1 7.1 4 8 4C10.6 4 12.9 5.2 14.5 7.1C14.1 7.6 13.6 8.1 13 8.6" stroke="white" strokeWidth="1.6" strokeLinecap="round"/>
        <path d="M6.3 8.7C6.7 8.3 7.3 8 8 8C8.7 8 9.3 8.3 9.7 8.7" stroke="white" strokeWidth="1.6" strokeLinecap="round"/>
        <circle cx="8" cy="11.8" r="0.9" fill="white"/>
      </svg>
    ),
  },
};

export function PUToast({ visible, message, variant = 'success', showIcon = true, onDismiss }: PUToastProps) {
  const c = config[variant];
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -16, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 400, damping: 28 }}
          style={{ backgroundColor: c.bg, color: c.textColor }}
          className="flex items-center gap-[10px] px-4 py-2.5 rounded-[12px] shadow-lg w-full"
        >
          {showIcon && (
            <span className="shrink-0 flex items-center">
              <c.Icon />
            </span>
          )}
          <p className="text-[14px] font-poppins font-normal leading-[1.5] flex-1 whitespace-nowrap">
            {message}
          </p>
          {onDismiss && (
            <button
              onClick={onDismiss}
              className="shrink-0 opacity-70 hover:opacity-100 ml-1"
              style={{ color: c.textColor }}
              aria-label="Dismiss"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M1 1L11 11M11 1L1 11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
              </svg>
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
