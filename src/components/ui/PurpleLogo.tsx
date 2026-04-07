// Purple brand assets — full wordmark logo + standalone icon
// Assets stored permanently in /public/logo/ — no expiry.
//
// Variant guide:
//   dark-purple  — dark navy body, purple dots  → use on Pearl White (#F5F1ED) backgrounds
//   white-navy   — white body, dark navy dots    → use on Purple (#7458FD) backgrounds
//   white-purple — white body, purple dots       → use on Dark Navy (#011638) backgrounds

export type PurpleLogoVariant = 'dark-purple' | 'white-navy' | 'white-purple';

// ─── Wordmark logo: per-variant path sources ──────────────────────────────────

const LOGO_DARK_PURPLE = Array.from({ length: 10 }, (_, i) => `/logo/logo-dp-${i}.svg`);
const LOGO_WHITE_NAVY  = Array.from({ length: 10 }, (_, i) => `/logo/logo-wn-${i}.svg`);
const LOGO_WHITE_PURPLE = Array.from({ length: 10 }, (_, i) => `/logo/logo-wp-${i}.svg`);

// Figma insets for wordmark (top / right / bottom / left as %)
const LOGO_INSETS = [
  [28.83, 42.91, 14.39, 44.27],
  [20.51, 14.72, 15.69, 81.66],
  [27.71, 55.73,  6.73, 29.36],
  [27.71, 18.34,  6.73, 66.76],
  [28.80, 34.09, 15.69, 57.95],
  [11.40, 75.31, 39.67,  0.00],
  [ 0.00, 75.31, 77.20, 18.83],
  [60.31, 79.74,  7.04,  3.74],
  [85.91, 92.64,  0.00,  3.74],
  [27.72,  0.00, 14.96, 85.27],
];

// ─── Icon mark: per-position sources ─────────────────────────────────────────
// Each icon has 4 paths: [body, top-dot, bottom-arm, bottom-dot]

const ICON_SRCS: Record<PurpleLogoVariant, string[]> = {
  'dark-purple':  ['/logo/icon-dp-0.svg', '/logo/icon-dp-1.svg', '/logo/icon-dp-2.svg', '/logo/icon-dp-3.svg'],
  'white-navy':   ['/logo/icon-wn-0.svg', '/logo/icon-wn-1.svg', '/logo/icon-wn-2.svg', '/logo/icon-wn-3.svg'],
  // white-purple reuses body + arm from white-navy; only the dots differ
  'white-purple': ['/logo/icon-wn-0.svg', '/logo/icon-wp-1.svg', '/logo/icon-wn-2.svg', '/logo/icon-wp-3.svg'],
};

const ICON_INSETS = [
  [11.77,  0.57, 39.57,  0.00],
  [ 0.43,  0.57, 76.89, 75.83],
  [60.42, 18.41,  7.11, 15.05],
  [85.88, 70.36,  0.10, 15.06],
];

// ─── Components ──────────────────────────────────────────────────────────────

interface PurpleLogoProps {
  variant?: PurpleLogoVariant;
  /** Width in px — height scales proportionally (~3.9:1 ratio) */
  width?: number;
}

export function PurpleLogo({ variant = 'white-purple', width = 245 }: PurpleLogoProps) {
  const srcs =
    variant === 'dark-purple' ? LOGO_DARK_PURPLE :
    variant === 'white-navy'  ? LOGO_WHITE_NAVY  :
                                LOGO_WHITE_PURPLE;
  const height = Math.round(width / 3.895);

  return (
    <div style={{ width, height, position: 'relative', flexShrink: 0 }}>
      {LOGO_INSETS.map(([top, right, bottom, left], i) => (
        <div key={i} style={{ position: 'absolute', top: `${top}%`, right: `${right}%`, bottom: `${bottom}%`, left: `${left}%` }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" src={srcs[i]} style={{ display: 'block', width: '100%', height: '100%', maxWidth: 'none' }} />
        </div>
      ))}
    </div>
  );
}

interface PurpleIconProps {
  variant?: PurpleLogoVariant;
  /** Height in px — width scales proportionally (~0.96:1 ratio) */
  size?: number;
}

export function PurpleIcon({ variant = 'white-purple', size = 64 }: PurpleIconProps) {
  const srcs = ICON_SRCS[variant];
  const width = Math.round(size * 0.96);

  return (
    <div style={{ width, height: size, position: 'relative', flexShrink: 0 }}>
      {ICON_INSETS.map(([top, right, bottom, left], i) => (
        <div key={i} style={{ position: 'absolute', top: `${top}%`, right: `${right}%`, bottom: `${bottom}%`, left: `${left}%` }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" src={srcs[i]} style={{ display: 'block', width: '100%', height: '100%', maxWidth: 'none' }} />
        </div>
      ))}
    </div>
  );
}
