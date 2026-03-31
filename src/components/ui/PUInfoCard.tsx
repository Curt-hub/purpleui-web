'use client';
import { motion } from 'framer-motion';

export type PUInfoCardVariant = 'success' | 'warning' | 'error' | 'info';

interface PUInfoCardProps {
  variant?: PUInfoCardVariant;
  title: string;
  message: string;
  icon?: React.ReactNode;
}

const variantConfig: Record<PUInfoCardVariant, { bg: string; border: string; title: string; icon: string }> = {
  success: { bg: '#d0fae8', border: '#16C172', title: '#0d7a49', icon: '✓' },
  warning: { bg: '#fefbe6', border: '#E9D502', title: '#7a6a00', icon: '⚠' },
  error: { bg: '#fde3e5', border: '#F03A47', title: '#a01e28', icon: '✕' },
  info: { bg: '#dbeafe', border: '#045DEC', title: '#1e40af', icon: 'ℹ' },
};

export function PUInfoCard({ variant = 'info', title, message, icon }: PUInfoCardProps) {
  const c = variantConfig[variant];
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      style={{ backgroundColor: c.bg, borderLeftColor: c.border }}
      className="rounded-[10px] border-l-4 px-4 py-3.5 w-full"
    >
      <div className="flex items-start gap-3">
        <span style={{ color: c.border }} className="text-lg mt-0.5">{icon ?? c.icon}</span>
        <div>
          <p style={{ color: c.title }} className="text-sm font-semibold">{title}</p>
          <p className="text-sm text-gray-700 mt-0.5">{message}</p>
        </div>
      </div>
    </motion.div>
  );
}
