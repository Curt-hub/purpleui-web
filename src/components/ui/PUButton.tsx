'use client';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export type PUButtonVariant = 'primary' | 'secondary' | 'secondary-dark' | 'destructive';
export type PUButtonSize = 'sm' | 'md' | 'lg' | 'compact';
export type PUButtonIconPosition = 'before' | 'after';

interface PUButtonProps {
  label: string;
  variant?: PUButtonVariant;
  size?: PUButtonSize;
  icon?: IconDefinition;
  iconPosition?: PUButtonIconPosition;
  loading?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  id?: string;
}

// Figma: Primary = purple fill, Secondary = black outline (light bg), Secondary Dark = dark fill white outline
const variantStyles: Record<PUButtonVariant, string> = {
  primary:          'bg-[#7458FD] text-white border border-transparent hover:bg-[#5f43e0] active:bg-[#4d34cc]',
  secondary:        'bg-white text-black border border-black hover:bg-[#F7F7F8]',
  'secondary-dark': 'bg-[#011638] text-white border border-white hover:bg-[#02204f]',
  destructive:      'bg-[#F03A47] text-white border border-transparent hover:bg-[#d42f3c]',
};

// Figma: h-[48px] px-[16px] py-[10px], pill shape — sm uses 40px height
const sizeStyles: Record<PUButtonSize, string> = {
  compact: 'h-10 px-5 text-sm',
  sm:      'h-10 px-4 text-sm',
  md:      'h-12 px-4 text-sm',
  lg:      'h-14 px-6 text-base',
};

export function PUButton({
  label,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'after',
  loading = false,
  fullWidth = false,
  disabled,
  onClick,
  type = 'button',
  id,
}: PUButtonProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      style={{ boxShadow: '0px 2px 2px 0px rgba(0,0,0,0.03)' }}
      className={[
        'relative inline-flex items-center justify-center gap-1.5 rounded-full font-bold font-poppins transition-colors',
        variantStyles[variant],
        sizeStyles[size],
        fullWidth ? 'w-full' : size === 'compact' ? 'w-auto' : 'w-[323px]',
        disabled || loading ? 'opacity-50 cursor-not-allowed' : '',
      ].join(' ')}
      disabled={disabled || loading}
      onClick={onClick}
      type={type}
      id={id}
    >
      {loading && (
        <span className="absolute w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
      )}
      <span className={`inline-flex items-center gap-1.5 ${loading ? 'invisible' : ''}`}>
        {icon && iconPosition === 'before' && (
          <FontAwesomeIcon icon={icon} className="w-4 h-4" />
        )}
        {label}
        {icon && iconPosition === 'after' && (
          <FontAwesomeIcon icon={icon} className="w-4 h-4" />
        )}
      </span>
    </motion.button>
  );
}
