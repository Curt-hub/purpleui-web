// ----------------------------------------------------------------
// SHADOW TOKENS
//
// src/lib/tokens.ts ships these as CSS box-shadow strings
// (`offsetX offsetY blurRadius spreadRadius color`). React Native has no
// box-shadow string - iOS reads shadowColor/shadowOffset/shadowOpacity/
// shadowRadius, Android reads a single non-directional `elevation`.
//
// Each token below is converted from its web source value so the two stay
// in sync - see the comment on each entry for the original CSS string.
// ----------------------------------------------------------------

export interface PUShadowStyle {
  shadowColor: string;
  shadowOffset: { width: number; height: number };
  shadowOpacity: number;
  shadowRadius: number;
  /** Android has no directional shadow - elevation approximates it. */
  elevation: number;
}

function shadow(
  offsetX: number,
  offsetY: number,
  blurRadius: number,
  opacity: number,
  color: string,
  elevation: number
): PUShadowStyle {
  return {
    shadowColor: color,
    shadowOffset: { width: offsetX, height: offsetY },
    shadowOpacity: opacity,
    shadowRadius: blurRadius / 2,
    elevation,
  };
}

export const shadows = {
  // '0px 2px 2px 0px rgba(0,0,0,0.03)'
  bottomA: shadow(0, 2, 2, 0.03, '#000000', 1),
  // '0px 2px 2px 0px rgba(0,0,0,0.06)'
  bottomB: shadow(0, 2, 2, 0.06, '#000000', 1),
  // '0px 2px 10px 0px rgba(0,0,0,0.05)'
  bottomC: shadow(0, 2, 10, 0.05, '#000000', 3),
  // '0px 2px 15px 0px rgba(0,0,0,0.10)'
  bottomD: shadow(0, 2, 15, 0.10, '#000000', 4),
  // '0px -2px 2px 0px rgba(0,0,0,0.03)'
  topA: shadow(0, -2, 2, 0.03, '#000000', 1),
  // '0px -2px 2px 0px rgba(0,0,0,0.06)'
  topB: shadow(0, -2, 2, 0.06, '#000000', 1),
  // '0px -2px 2px 0px rgba(0,0,0,0.10)'
  topC: shadow(0, -2, 2, 0.10, '#000000', 1),
  // '0px -2px 15px 0px rgba(0,0,0,0.10)'
  topD: shadow(0, -2, 15, 0.10, '#000000', 4),
  // '4px 0px 15px 0px rgba(0,0,0,0.20)'
  sideNav: shadow(4, 0, 15, 0.20, '#000000', 6),
  // '0px 10px 15px -3px rgba(0,0,0,0.10)'
  tilesActive: shadow(0, 10, 15, 0.10, '#000000', 4),
  // '0px 10px 15px -3px rgba(116,88,253,0.40)' - rgba(116,88,253) === colors.brand (#7458FD)
  tilesHover: shadow(0, 10, 15, 0.40, '#7458FD', 4),
} as const;

export type PUShadows = typeof shadows;
