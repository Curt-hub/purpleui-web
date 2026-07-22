export * from './colors';
export * from './spacing';
export * from './radius';
export * from './typography';
export * from './shadows';

import { colors } from './colors';
import { spacing } from './spacing';
import { radius } from './radius';
import { typography } from './typography';
import { shadows } from './shadows';

/** Single-import theme object - colours, spacing, radii, typography, shadows. */
export const theme = {
  colors,
  spacing,
  radius,
  typography,
  shadows,
} as const;

export type PUTheme = typeof theme;
