/**
 * Exports Purple UI design tokens to W3C DTCG format (tokens.json).
 *
 * Usage:
 *   npm run export-tokens
 *
 * Output:
 *   tokens.json at the repo root — directly consumable by any tool
 *   without a JavaScript runtime (Style Dictionary, Tokens Studio, etc.)
 *
 * DTCG spec: https://tr.designtokens.org/format/
 */

import { writeFileSync } from 'fs';
import { resolve } from 'path';
import { colors, spacing, radius, shadows, typography } from '../src/lib/tokens';

// ─── helpers ──────────────────────────────────────────────────────────────────

type DtcgToken = {
  $value: string | number;
  $type: string;
  $description?: string;
};

type DtcgGroup = {
  [key: string]: DtcgToken | DtcgGroup;
};

function color(value: string, description?: string): DtcgToken {
  return { $value: value, $type: 'color', ...(description ? { $description: description } : {}) };
}

function dimension(value: number, description?: string): DtcgToken {
  return { $value: value, $type: 'dimension', ...(description ? { $description: description } : {}) };
}

function shadow(value: string): DtcgToken {
  return { $value: value, $type: 'shadow' };
}

function fontFamily(value: string): DtcgToken {
  return { $value: value, $type: 'fontFamily' };
}

function fontSize(value: string): DtcgToken {
  return { $value: value, $type: 'dimension' };
}

function fontWeight(value: number): DtcgToken {
  return { $value: value, $type: 'fontWeight' };
}

// ─── palette (Tier 1) — included for reference, not for direct use ────────────

const palette: DtcgGroup = {
  purple:   color('#7458FD', 'Raw brand purple. Use colors.brand instead.'),
  navy:     color('#011638', 'Raw navy. Use colors.backgroundNavy instead.'),
  cream:    color('#F5F1ED', 'Raw cream. Use colors.backgroundAlt instead.'),
  black:    color('#000000'),
  offBlack: color('#595959'),
  greyA:    color('#AAACB0'),
  greyB:    color('#BABCBF'),
  greyC:    color('#CDCED0'),
  greyD:    color('#DDDDDF'),
  greyE:    color('#EFF0F0'),
  greyF:    color('#F7F7F8'),
  white:    color('#FFFFFF'),
  green:    color('#16C172'),
  red:      color('#F03A47'),
  blue:     color('#045DEC'),
  yellow:   color('#E9D502'),
};

// ─── semantic colors (Tier 2) ─────────────────────────────────────────────────

const colorTokens: DtcgGroup = {
  brand:              color(colors.brand,              'dark: #7458FD (unchanged)'),
  brandSubtle:        color(colors.brandSubtle,        'dark: #2a1f6b'),

  background:         color(colors.background,         'dark: #011638 (palette.navy)'),
  backgroundElevated: color(colors.backgroundElevated, 'dark: #0a2048'),
  backgroundSunken:   color(colors.backgroundSunken,   'dark: #09193d'),
  backgroundNavy:     color(colors.backgroundNavy,     'invariant — always navy'),
  backgroundAlt:      color(colors.backgroundAlt,      'invariant — always cream'),

  onBackground:          color(colors.onBackground,          'dark: #FFFFFF'),
  onBackgroundSecondary: color(colors.onBackgroundSecondary, 'dark: rgba(255,255,255,0.70)'),
  onBackgroundTertiary:  color(colors.onBackgroundTertiary,  'dark: rgba(255,255,255,0.35)'),

  outline:       color(colors.outline,       'dark: rgba(255,255,255,0.15)'),
  outlineSubtle: color(colors.outlineSubtle, 'dark: rgba(255,255,255,0.06)'),

  loaderTrack: color(colors.loaderTrack, 'invariant'),

  success:       color(colors.success,       'invariant'),
  successSubtle: color(colors.successSubtle, 'dark: #0d3320'),
  successStrong: color(colors.successStrong, 'invariant'),

  error:       color(colors.error),
  errorSubtle: color(colors.errorSubtle),

  warning:       color(colors.warning),
  warningSubtle: color(colors.warningSubtle, 'dark: #3d3400'),

  info:       color(colors.info),
  infoSubtle: color(colors.infoSubtle),

  vendorBrown:  color(colors.vendorBrown,  'Activity feed only — do not use elsewhere'),
  vendorForest: color(colors.vendorForest, 'Activity feed only — do not use elsewhere'),
  vendorRed:    color(colors.vendorRed,    'Activity feed only — do not use elsewhere'),
  vendorAmber:  color(colors.vendorAmber,  'Activity feed only — do not use elsewhere'),
};

// ─── spacing ──────────────────────────────────────────────────────────────────

const spacingTokens: DtcgGroup = Object.fromEntries(
  Object.entries(spacing).map(([key, value]) => [key, dimension(value as number)])
);

// ─── border radius ────────────────────────────────────────────────────────────

const radiusTokens: DtcgGroup = Object.fromEntries(
  Object.entries(radius).map(([key, value]) => [key, dimension(value as number)])
);

// ─── shadows ──────────────────────────────────────────────────────────────────

const shadowTokens: DtcgGroup = Object.fromEntries(
  Object.entries(shadows).map(([key, value]) => [key, shadow(value as string)])
);

// ─── typography ───────────────────────────────────────────────────────────────

const typographyTokens: DtcgGroup = {
  fontFamily: fontFamily(typography.fontFamily),
  size: Object.fromEntries(
    Object.entries(typography.sizes).map(([key, value]) => [key, fontSize(value as string)])
  ),
  weight: {
    regular: fontWeight(typography.weights.regular),
    bold:    fontWeight(typography.weights.bold),
  },
};

// ─── assemble & write ─────────────────────────────────────────────────────────

const dtcg: DtcgGroup = {
  color: {
    palette,
    ...colorTokens,
  },
  spacing: spacingTokens,
  borderRadius: radiusTokens,
  shadow: shadowTokens,
  typography: typographyTokens,
};

const outputPath = resolve(process.cwd(), 'tokens.json');
writeFileSync(outputPath, JSON.stringify(dtcg, null, 2) + '\n', 'utf-8');
console.log(`✓ tokens.json written to ${outputPath}`);
