import React from 'react';
export interface PUPlusGlyphProps {
    size?: number;
    color?: string;
}
/**
 * Plus/cross glyph built from two Views (a vertical and a horizontal bar) -
 * PUFloatingButton's "plus" icon, no-SVG placeholder pending the Icons
 * foundation's RN answer.
 */
export declare function PUPlusGlyph({ size, color }: PUPlusGlyphProps): React.JSX.Element;
