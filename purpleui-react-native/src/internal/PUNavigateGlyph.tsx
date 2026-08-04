import React from 'react';
import { View } from 'react-native';

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
export function PUNavigateGlyph({ size = 24, color = '#7458FD' }: PUNavigateGlyphProps) {
  const triSize = size * 0.6;
  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <View
        style={{
          width: 0,
          height: 0,
          borderLeftWidth: triSize / 2,
          borderRightWidth: triSize / 2,
          borderBottomWidth: triSize,
          borderLeftColor: 'transparent',
          borderRightColor: 'transparent',
          borderBottomColor: color,
          transform: [{ rotate: '45deg' }],
        }}
      />
    </View>
  );
}
