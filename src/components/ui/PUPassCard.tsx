'use client';
import React, { useRef, useEffect } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import { colors } from '@/lib/tokens';

export type PULogoVariant = 'white-navy' | 'white-purple' | 'dark-purple';
export type PULogoOrientation = 'landscape' | 'square' | 'portrait';

function contrastColour(hex: string): '#ffffff' | '#000000' {
  const h = hex.replace('#', '');
  const toLinear = (c: number) => {
    const s = c / 255;
    return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  const r = toLinear(parseInt(h.slice(0, 2), 16));
  const g = toLinear(parseInt(h.slice(2, 4), 16));
  const b = toLinear(parseInt(h.slice(4, 6), 16));
  const L = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return L > 0.179 ? '#000000' : '#ffffff';
}

const LOGO_SRCS: Record<PULogoVariant, string> = {
  'white-navy':   '/logo/icon-white-navy.svg',
  'white-purple': '/logo/purple-wi-white.svg',
  'dark-purple':  '/logo/icon-dark-purple.svg',
};

const LOGO_SIZE: Record<PULogoOrientation, React.CSSProperties> = {
  landscape: { height: 22, width: 'auto' },
  square:    { width: 28, height: 28 },
  portrait:  { height: 36, width: 'auto' },
};

export interface PUPassCardProps {
  title: string;
  backgroundColor?: string;
  gradientTo?: string;
  holo?: boolean;
  stackDepth?: number;
  warning?: boolean;
  logoVariant?: PULogoVariant;
  /** Custom partner/company logo URL — replaces the default Purple logo. */
  partnerLogoUrl?: string;
  /** Orientation of the partner logo — controls size constraints. */
  partnerLogoOrientation?: PULogoOrientation;
  onClick?: () => void;
}

export function PUPassCard({
  title,
  backgroundColor = colors.brand,
  gradientTo,
  holo = false,
  stackDepth,
  warning = false,
  logoVariant,
  partnerLogoUrl,
  partnerLogoOrientation = 'landscape',
  onClick,
}: PUPassCardProps) {
  const textColour   = contrastColour(backgroundColor);
  const isLight      = textColour === '#000000';
  const resolvedLogoVariant = logoVariant ?? (isLight ? 'dark-purple' : 'white-purple');
  const holoRef = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  useEffect(() => {
    if (!holo) {
      rotateX.set(0);
      rotateY.set(0);
      if (holoRef.current) holoRef.current.style.opacity = '0';
    }
  }, [holo, rotateX, rotateY]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!holo) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    rotateX.set((y - 0.5) * -8);
    rotateY.set((x - 0.5) * 8);
    if (holoRef.current) {
      holoRef.current.style.setProperty('--holo-angle', `${35 + x * 40}deg`);
      holoRef.current.style.setProperty('--holo-x', `${x * 100}%`);
      holoRef.current.style.setProperty('--holo-y', `${y * 100}%`);
      holoRef.current.style.opacity = '1';
    }
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    if (holoRef.current) holoRef.current.style.opacity = '0';
  };

  const isStacked = stackDepth !== undefined && stackDepth > 0;
  const brightness = isStacked ? 1 - (stackDepth as number) * 0.04 : 1;
  const bg = gradientTo
    ? `linear-gradient(135deg, ${backgroundColor}, ${gradientTo})`
    : backgroundColor;

  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
        transformPerspective: 900,
        background: bg,
        filter: isStacked ? `brightness(${brightness})` : undefined,
        boxShadow: isStacked
          ? 'inset 0 2px 0 0 rgba(255,255,255,0.25), 0 4px 20px rgba(0,0,0,0.18)'
          : '0 8px 32px rgba(0,0,0,0.22), inset 0.757px 0.606px 0.606px rgba(255,255,255,0.25), inset -0.303px -0.303px 0.454px rgba(0,0,0,0.36)',
        borderRadius: 14,
        aspectRatio: '312 / 191',
        position: 'relative',
        overflow: 'hidden',
        userSelect: 'none',
        cursor: onClick ? 'pointer' : 'default',
        width: '100%',
      }}
      whileHover={holo ? { scale: 1.02 } : undefined}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {/* Radial white gloss — top-left shine matching Figma */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 'inherit',
          background: 'radial-gradient(ellipse 75% 60% at 15% 18%, rgba(255,255,255,0.26) 0%, rgba(255,255,255,0) 100%)',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />

      {/* Holographic shimmer overlay */}
      <div
        ref={holoRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: [
            'repeating-linear-gradient(var(--holo-angle, 55deg),',
            'rgba(255,105,180,0.07),rgba(255,140,0,0.07),rgba(255,215,0,0.07),',
            'rgba(0,255,180,0.07),rgba(0,180,255,0.07),rgba(200,100,255,0.07),',
            'rgba(255,105,180,0.07) 16px),',
            'radial-gradient(circle at var(--holo-x,50%) var(--holo-y,50%),rgba(255,255,255,0.10) 0%,transparent 65%)',
          ].join(' '),
          mixBlendMode: 'screen' as const,
          opacity: 0,
          pointerEvents: 'none',
          borderRadius: 'inherit',
          zIndex: 10,
          transition: 'opacity 0.15s ease',
        }}
      />

      {/* Card content */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          padding: 20,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          zIndex: 5,
        }}
      >
        <p
          style={{
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 700,
            color: textColour,
            fontSize: 14,
            margin: 0,
            lineHeight: 1.3,
          }}
        >
          {title}
        </p>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          {/* WiFi metallic badge — bottom left */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: 32,
              width: 32,
              borderRadius: '50%',
              background: 'linear-gradient(119.73deg, #ABABAB 0%, #FFFFFF 29.18%, #BDBDBD 58.85%, #5E5E5E 93.38%)',
              flexShrink: 0,
            }}
          >
            <img src="/illustrations/wifi-metallic.svg" alt="" style={{ height: 16, width: 16, display: 'block' }} />
          </div>

          {/* Right side: warning badge + Purple logo */}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 5 }}>
            {warning && (
              <div
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  background: '#E9D502',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#000',
                  fontSize: 11,
                  fontWeight: 700,
                  fontFamily: 'Poppins, sans-serif',
                }}
              >
                !
              </div>
            )}
            {partnerLogoUrl ? (
              <img
                src={partnerLogoUrl}
                alt="Partner logo"
                style={{
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))',
                  ...LOGO_SIZE[partnerLogoOrientation],
                }}
              />
            ) : (
              <img
                src={LOGO_SRCS[resolvedLogoVariant]}
                alt="Purple"
                style={{
                  height: 22,
                  width: 'auto',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))',
                }}
              />
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
