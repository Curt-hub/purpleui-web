import React from 'react';
import { View } from 'react-native';

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
export function PUSearchGlyph({ size = 20, color = '#AAACB0' }: PUSearchGlyphProps) {
  const ringSize = Math.round(size * 0.62);
  const strokeWidth = Math.max(1.5, size / 10);
  const handleLength = Math.round(size * 0.4);

  return (
    <View style={{ width: size, height: size }}>
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: ringSize,
          height: ringSize,
          borderRadius: ringSize / 2,
          borderWidth: strokeWidth,
          borderColor: color,
        }}
      />
      <View
        style={{
          position: 'absolute',
          left: ringSize * 0.72,
          top: ringSize * 0.72,
          width: handleLength,
          height: strokeWidth,
          borderRadius: strokeWidth / 2,
          backgroundColor: color,
          transform: [{ rotate: '45deg' }],
        }}
      />
    </View>
  );
}
