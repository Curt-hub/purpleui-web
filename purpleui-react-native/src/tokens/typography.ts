// ----------------------------------------------------------------
// TYPOGRAPHY TOKENS
//
// RN cannot pick a *weight* off one custom font family the way CSS can -
// each Poppins weight ships as its own font file and is referenced by its
// own `fontFamily` name. Consuming apps must link the fonts themselves
// (same requirement as PurpleUI-iOS and PurpleUI-Android):
//   - Poppins-Regular.ttf
//   - Poppins-Bold.ttf
//
// iOS: add the .ttf files to the app target + declare under UIAppFonts.
// Android: drop them in android/app/src/main/assets/fonts/ (bare RN) or
// use expo-font / react-native.config.js `assets` for Expo/autolinked setups.
// ----------------------------------------------------------------

export const typography = {
  fontFamily: {
    regular: 'Poppins-Regular',
    bold: 'Poppins-Bold',
  },
  // Sizes are unitless - 1:1 with the web px scale (src/lib/tokens.ts uses rem,
  // this mirrors the resolved px values at the default 16px root).
  sizes: {
    supporting: 12,
    body:       14,
    section:    18,
    title:      22,
    hero:       40,
  },
  weights: {
    regular: '400' as const,
    bold:    '700' as const,
  },
} as const;

export type PUTypography = typeof typography;
