import React from 'react';
import { View } from 'react-native';

export interface PUPlusGlyphProps {
  size?: number;
  color?: string;
}

/**
 * Plus/cross glyph built from two Views (a vertical and a horizontal bar) -
 * PUFloatingButton's "plus" icon, no-SVG placeholder pending the Icons
 * foundation's RN answer.
 */
export function PUPlusGlyph({ size = 24, color = '#7458FD' }: PUPlusGlyphProps) {
  const strokeWidth = Math.max(2, size / 12);
  return (
    <View style={{ width: size, height: size }}>
      <View
        style={{
          position: 'absolute',
          left: (size - strokeWidth) / 2,
          top: 0,
          width: strokeWidth,
          height: size,
          borderRadius: strokeWidth / 2,
          backgroundColor: color,
        }}
      />
      <View
        style={{
          position: 'absolute',
          top: (size - strokeWidth) / 2,
          left: 0,
          height: strokeWidth,
          width: size,
          borderRadius: strokeWidth / 2,
          backgroundColor: color,
        }}
      />
    </View>
  );
}
