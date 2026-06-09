'use client';
import { type LogoOrientation } from './utils/colorUtils';

export interface PassCard2DProps {
  passTitle: string;
  primaryColor: string;
  gradientTo: string;
  logoDataUrl: string | null;
  logoOrientation: LogoOrientation | null;
}

const LOGO_MAX: Record<LogoOrientation, { maxWidth: number; maxHeight: number }> = {
  landscape: { maxWidth: 80,  maxHeight: 28 },
  square:    { maxWidth: 28,  maxHeight: 28 },
  portrait:  { maxWidth: 24,  maxHeight: 40 },
};

export function PassCard2D({
  passTitle,
  primaryColor,
  gradientTo,
  logoDataUrl,
  logoOrientation,
}: PassCard2DProps) {
  return (
    <div style={{
      width: '100%',
      maxWidth: 340,
      aspectRatio: '1.586 / 1',
      borderRadius: 20,
      background: `linear-gradient(135deg, ${primaryColor}, ${gradientTo})`,
      position: 'relative',
      boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
      overflow: 'hidden',
    }}>

      {/* Pass title */}
      <p style={{
        position: 'absolute',
        top: 20,
        left: 20,
        margin: 0,
        fontFamily: "'Poppins', sans-serif",
        fontWeight: 700,
        fontSize: 14,
        color: '#ffffff',
        maxWidth: 'calc(100% - 40px)',
        lineHeight: 1.4,
        textShadow: '0 1px 4px rgba(0,0,0,0.25)',
      }}>
        {passTitle}
      </p>

      {/* Hologram — bottom-left */}
      <div style={{
        position: 'absolute',
        bottom: 20,
        left: 20,
        width: 40,
        height: 40,
      }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/hologram.png" alt="" style={{ width: '100%' }} />
      </div>

      {/* Logo pill — bottom-right */}
      {logoDataUrl && logoOrientation && (
        <div style={{
          position: 'absolute',
          bottom: 20,
          right: 20,
          padding: '8px 10px',
          background: 'rgba(255,255,255,0.95)',
          borderRadius: 10,
          display: 'inline-flex',
          alignItems: 'center',
        }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logoDataUrl}
            alt="Logo"
            style={{
              maxWidth:   LOGO_MAX[logoOrientation].maxWidth,
              maxHeight:  LOGO_MAX[logoOrientation].maxHeight,
              objectFit: 'contain',
              display: 'block',
            }}
          />
        </div>
      )}

    </div>
  );
}

export default PassCard2D;
