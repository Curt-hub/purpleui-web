// ----------------------------------------------------------------
// BORDER RADIUS TOKENS
// Identical scale to src/lib/tokens.ts.
// ----------------------------------------------------------------

export const radius = {
  sm:   6,
  md:   12,
  lg:   16,
  xl:   24,
  full: 9999,
} as const;

export type PURadius = typeof radius;
