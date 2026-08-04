export * from './colors';
export * from './spacing';
export * from './radius';
export * from './typography';
export * from './shadows';
export * from './passThemes';

import { colors } from './colors';
import { spacing } from './spacing';
import { radius } from './radius';
import { typography } from './typography';
import { shadows } from './shadows';
import { passThemes } from './passThemes';

/** Single-import theme object - colours, spacing, radii, typography, shadows. */
export const theme = {
  colors,
  spacing,
  radius,
  typography,
  shadows,
  passThemes,
} as const;

export type PUTheme = typeof theme;
