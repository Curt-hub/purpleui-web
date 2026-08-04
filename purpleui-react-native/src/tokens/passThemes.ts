// ----------------------------------------------------------------
// PASS THEME TOKENS
//
// Gradient skins for WiFi pass cards (PU3DPassCard / PUWalletStack on web).
// Mirrors tokens.json's `passThemes` group and src/lib/tokens.ts's
// `passThemes` export 1:1 - same theme names, same hex values.
//
// Convention (matches src/lib/tokens.ts):
//   gradientFrom / gradientTo - gradient stops (web uses a 135deg linear
//   gradient; RN has no CSS gradient primitive, so consumers pair these two
//   stops with something like `expo-linear-gradient` or an SVG gradient -
//   this package only ships the colour values, not a gradient renderer).
//   on                        - text/icon colour for content on the card
//
// Nothing in purpleui-react-native consumes this yet - groundwork for the
// pass card components when they're ported.
// ----------------------------------------------------------------

import { colors } from './colors';

export const passThemes = {
  // Purple brand pass - default skin
  purple: {
    gradientFrom: colors.brand,        // #7458FD
    gradientTo:   '#9B7FFE',
    on:           colors.background,   // #FFFFFF
  },

  // NHS-branded venue pass
  nhs: {
    gradientFrom: '#005EB8',           // NHS Blue
    gradientTo:   '#003087',           // NHS Dark Blue
    on:           colors.background,   // #FFFFFF
  },

  // University / institutional pass - reuses Purple's own navy
  university: {
    gradientFrom: colors.backgroundNavy, // #011638
    gradientTo:   '#1A3A5C',
    on:           colors.background,     // #FFFFFF
  },

  // Cafe / hospitality pass - reuses the success green
  cafe: {
    gradientFrom: '#0F9B63',
    gradientTo:   colors.success,       // #16C172
    on:           colors.background,    // #FFFFFF
  },

  // Neutral guest-network pass
  guest: {
    gradientFrom: '#4A2545',
    gradientTo:   '#7C3F6E',
    on:           colors.background,    // #FFFFFF
  },
} as const;

export type PassThemeName = keyof typeof passThemes;
export type PUPassThemes = typeof passThemes;
