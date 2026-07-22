// ----------------------------------------------------------------
// SPACING TOKENS
// Identical scale to src/lib/tokens.ts. Values are unitless -
// React Native treats plain numbers as density-independent points,
// a 1:1 match with the web px scale.
// ----------------------------------------------------------------

export const spacing = {
  xs:   4,
  sm:   8,
  md:   12,
  lg:   16,
  xl:   20,
  '2xl': 24,
  '3xl': 32,
  '4xl': 40,
  '5xl': 48,
} as const;

export type PUSpacing = typeof spacing;
