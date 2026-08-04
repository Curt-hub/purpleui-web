import React from 'react';
export interface PUSearchGlyphProps {
    size?: number;
    color?: string;
}
/**
 * Magnifying-glass glyph built from two Views (a bordered ring + a rotated
 * handle bar) - same no-SVG, no-icon-library approach as PUChevronLeft.
 * Placeholder for PUSearchBar's search icon until the Icons foundation ships
 * an RN answer (FontAwesome on web/iOS/Android).
 */
export declare function PUSearchGlyph({ size, color }: PUSearchGlyphProps): React.JSX.Element;
