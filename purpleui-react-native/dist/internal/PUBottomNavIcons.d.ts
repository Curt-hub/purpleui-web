import React from 'react';
export interface PUBottomNavGlyphProps {
    size?: number;
    color?: string;
}
/**
 * PUBottomNav's four tab glyphs (explore/wallet/activity/profile), built
 * from Views only - same no-SVG, no-icon-library approach as PUChevronLeft.
 *
 * iOS/Android render these as FontAwesome (FA.mapMarker / FA.wallet /
 * FA.receipt / FA.user); web swaps between a FA Regular/Solid SVG pair per
 * selection state. RN has neither a bundled icon font nor an SVG dependency
 * today, so each tab gets a single dependency-free geometric placeholder
 * instead - swap these for the Icons foundation's RN answer once it ships.
 */
export declare function PUExploreGlyph({ size, color }: PUBottomNavGlyphProps): React.JSX.Element;
export declare function PUWalletGlyph({ size, color }: PUBottomNavGlyphProps): React.JSX.Element;
export declare function PUActivityGlyph({ size, color }: PUBottomNavGlyphProps): React.JSX.Element;
export declare function PUProfileGlyph({ size, color }: PUBottomNavGlyphProps): React.JSX.Element;
