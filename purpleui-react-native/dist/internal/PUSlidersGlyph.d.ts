import React from 'react';
export interface PUSlidersGlyphProps {
    size?: number;
    color?: string;
}
/**
 * Three-row "sliders" (equalizer) glyph built from Views only - stand-in for
 * PUSearchBar's and PUBottomTray's filter icon until the Icons foundation
 * ships an RN answer. Same no-SVG approach as PUChevronLeft/PUSearchGlyph.
 */
export declare function PUSlidersGlyph({ size, color }: PUSlidersGlyphProps): React.JSX.Element;
