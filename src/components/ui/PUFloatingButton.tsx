'use client';
import { motion } from 'framer-motion';

export type PUFloatingButtonVariant = 'icon' | 'pill';

interface PUFloatingButtonProps {
  /** 'icon' = 56×56 circle  |  'pill' = icon + label */
  variant: PUFloatingButtonVariant;
  /** Which icon to show */
  icon: 'navigate' | 'plus';
  /** Label shown next to icon — pill variant only */
  label?: string;
  dark?: boolean;
  onClick?: () => void;
}

// ── Icons (exact Figma paths) ────────────────────────────────

// Filled paper-plane / send arrow — points upper-right
function NavigateIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M22 2L11 13M22 2L15 22L11 13L2 9L22 2Z"
        fill="#7458FD"
        stroke="#7458FD"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Stroke-based plus with rounded ends
function PlusIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 5V19M5 12H19"
        stroke="#7458FD"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ── Tokens — mirrors Bottom Tray / Bottom Nav dark patterns ──
// Light: exact Figma spec (white bg, soft shadow)
// Dark:  #0a2048 elevated surface (= Bottom Tray dark bg)
//        rgba(255,255,255,0.15) border (= Bottom Tray drag handle opacity)
//        strong drop shadow to lift off the dark map
const LIGHT = {
  bg:     '#ffffff',
  border: 'none',
  shadow: '0px 2px 15px rgba(0,0,0,0.10)',
  label:  '#7458FD',
};
const DARK = {
  bg:     '#0a2048',
  border: '1px solid rgba(255,255,255,0.15)',
  shadow: '0px 4px 24px rgba(0,0,0,0.50)',
  label:  '#ffffff',
};

export function PUFloatingButton({
  variant,
  icon,
  label,
  dark = false,
  onClick,
}: PUFloatingButtonProps) {
  const t = dark ? DARK : LIGHT;
  const iconEl = icon === 'navigate' ? <NavigateIcon /> : <PlusIcon />;

  if (variant === 'icon') {
    return (
      <motion.button
        whileTap={{ scale: 0.92 }}
        transition={{ type: 'spring', stiffness: 480, damping: 18 }}
        onClick={onClick}
        style={{ background: t.bg, boxShadow: t.shadow, border: t.border, width: 56, height: 56 }}
        className="rounded-full flex items-center justify-center cursor-pointer"
        aria-label={label ?? 'Floating action'}
      >
        {iconEl}
      </motion.button>
    );
  }

  // pill — pl-[12px] pr-[16px] py-[8px] gap-[4px] as per Figma
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 480, damping: 18 }}
      onClick={onClick}
      style={{ background: t.bg, boxShadow: t.shadow, border: t.border }}
      className="rounded-[100px] inline-flex items-center gap-[4px] pl-[12px] pr-[16px] py-[8px] cursor-pointer"
    >
      {iconEl}
      {label && (
        <span
          className="font-poppins font-bold leading-[1.5] text-[14px] whitespace-nowrap"
          style={{ color: t.label }}
        >
          {label}
        </span>
      )}
    </motion.button>
  );
}
