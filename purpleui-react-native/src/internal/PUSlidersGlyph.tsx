import React from 'react';
import { View } from 'react-native';

export interface PUSlidersGlyphProps {
  size?: number;
  color?: string;
}

// Relative x-position (0-1) of each row's knob - purely visual variety,
// mirrors the staggered-knob look of the web/iOS/Android "sliders" filter icon.
const KNOB_OFFSETS = [0.35, 0.62, 0.48];

/**
 * Three-row "sliders" (equalizer) glyph built from Views only - stand-in for
 * PUSearchBar's and PUBottomTray's filter icon until the Icons foundation
 * ships an RN answer. Same no-SVG approach as PUChevronLeft/PUSearchGlyph.
 */
export function PUSlidersGlyph({ size = 18, color = '#7458FD' }: PUSlidersGlyphProps) {
  const rowHeight = size / 3;
  const knobSize = Math.max(4, size * 0.3);
  const lineHeight = Math.max(1.5, size / 10);

  return (
    <View style={{ width: size, height: size }}>
      {KNOB_OFFSETS.map((offset, i) => (
        <View key={i} style={{ height: rowHeight, justifyContent: 'center' }}>
          <View
            style={{
              height: lineHeight,
              width: '100%',
              borderRadius: lineHeight / 2,
              backgroundColor: color,
            }}
          />
          <View
            style={{
              position: 'absolute',
              left: `${offset * 100}%`,
              marginLeft: -knobSize / 2,
              top: (rowHeight - knobSize) / 2,
              width: knobSize,
              height: knobSize,
              borderRadius: knobSize / 2,
              backgroundColor: color,
            }}
          />
        </View>
      ))}
    </View>
  );
}
