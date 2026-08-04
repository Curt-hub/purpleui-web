import React from 'react';
export interface PUNavigateGlyphProps {
    size?: number;
    color?: string;
}
/**
 * "Navigate" glyph - a solid triangle built with the classic RN/CSS
 * transparent-border trick, rotated 45deg to point up-and-right,
 * approximating web's filled paper-plane/send-arrow icon. No-SVG placeholder
 * pending the Icons foundation's RN answer - PUFloatingButton's "navigate" icon.
 */
export declare function PUNavigateGlyph({ size, color }: PUNavigateGlyphProps): React.JSX.Element;
