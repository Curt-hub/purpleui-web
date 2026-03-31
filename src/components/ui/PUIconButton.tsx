'use client';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export type PUIconButtonVariant = 'light' | 'dark';

interface PUIconButtonProps {
  icon?: IconDefinition;
  variant?: PUIconButtonVariant;
  label?: string;
  text?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  id?: string;
}

// Figma: 38px circle, 1.5px border
// Light — white bg + off-black border (use on light backgrounds)
// Dark  — navy bg + white border (use on dark backgrounds)
const variantStyles: Record<PUIconButtonVariant, string> = {
  light: 'bg-white border-[1.5px] border-[#595959] text-[#595959] hover:bg-[#F7F7F8]',
  dark:  'bg-[#011638] border-[1.5px] border-white text-white hover:bg-[#02204f]',
};

export function PUIconButton({
  icon = faArrowLeft,
  variant = 'light',
  label,
  text,
  onClick,
  disabled,
  type = 'button',
  id,
}: PUIconButtonProps) {
  // With text: pill shape sized to content (Figma: px-4 py-[10px], gap-1.5, 14px bold)
  // Without text: 38px circle
  const shapeClass = text
    ? 'rounded-full px-4 py-[10px] gap-1.5'
    : 'w-[38px] h-[38px] rounded-full';

  return (
    <motion.button
      whileTap={{ scale: 0.92 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      aria-label={label}
      className={`inline-flex items-center justify-center transition-colors ${variantStyles[variant]} ${shapeClass} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
      id={id}
    >
      <FontAwesomeIcon icon={icon} className={text ? 'w-3.5 h-3.5' : 'w-4 h-4'} />
      {text && (
        <span className="text-[14px] font-bold font-poppins leading-none">{text}</span>
      )}
    </motion.button>
  );
}
