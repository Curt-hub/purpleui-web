'use client';
import { motion } from 'framer-motion';
import { colors } from '@/lib/tokens';

interface PUListRowProps {
  title: string;
  subtitle?: string;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  onClick?: () => void;
  showDivider?: boolean;
  dark?: boolean;
}

export function PUListRow({ title, subtitle, leading, trailing, onClick, showDivider = true, dark }: PUListRowProps) {
  return (
    <motion.div
      whileTap={onClick ? { scale: 0.99, backgroundColor: dark ? 'rgba(255,255,255,0.06)' : '#f3f4f6' } : {}}
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3.5 ${onClick ? 'cursor-pointer' : ''}`}
      style={{
        background: dark ? 'transparent' : colors.background,
        borderBottom: showDivider ? `1px solid ${dark ? 'rgba(255,255,255,0.06)' : colors.outlineSubtle}` : undefined,  // outlineSubtle dark : outlineSubtle
      }}
    >
      {leading && <div className="flex-shrink-0">{leading}</div>}
      <div className="flex-1 min-w-0">
        <p
          className="text-sm font-semibold truncate"
          style={{ color: dark ? '#ffffff' : colors.onBackground }}  // onBackground dark : onBackground
        >{title}</p>
        {subtitle && (
          <p
            className="text-xs truncate mt-0.5"
            style={{ color: dark ? 'rgba(255,255,255,0.5)' : colors.onBackgroundSecondary }}  // onBackgroundSecondary dark : onBackgroundSecondary
          >{subtitle}</p>
        )}
      </div>
      {trailing && <div className="flex-shrink-0">{trailing}</div>}
    </motion.div>
  );
}
