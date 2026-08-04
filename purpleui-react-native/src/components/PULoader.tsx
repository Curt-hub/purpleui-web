import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { colors } from '../tokens/colors';

/**
 * First-slice PULoader for React Native.
 *
 * DISPUTED COLOUR MAPPING - flag for Curt to settle, called out per the
 * build brief. specs/PULoader.json (the contract this component follows)
 * documents light = colors.brand (purple), dark = white. Web, iOS AND
 * Android all instead ship light = colors.backgroundNavy (navy), dark =
 * colors.brand (purple) - all three implementations agree with each other
 * and disagree with the spec.
 *
 * The two arc colours are declared as a single obvious constant pair right
 * below (LIGHT_ARC / DARK_ARC) specifically so flipping which convention
 * this component follows is a one-line change per constant, not a hunt
 * through the component body.
 *
 * Built as two stacked rings (a static full-circle "track" behind a
 * spinning ring with its top/right border made transparent) - the same
 * bordered-circle trick internal/PUSpinner.tsx already uses for PUButton's
 * loading spinner, just two layers instead of one. No SVG dependency.
 *
 * Secondary flagged disagreement: the spec's dark-variant track colour is
 * rgba(255,255,255,0.2). Web and iOS don't vary the track by variant at all
 * (always colors.loaderTrack); Android varies it but uses 0.12 opacity, not
 * 0.2. This component follows the spec's rgba(255,255,255,0.2).
 */
export type PULoaderVariant = 'light' | 'dark';

export interface PULoaderProps {
  /** light = purple spinner for white/light surfaces | dark = white spinner for navy/dark surfaces. @default 'light' */
  variant?: PULoaderVariant;
  /** @default 'Loading' */
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

// ---- Flip these two lines to switch which convention this follows. ----
const LIGHT_ARC = colors.brand; // per spec - web/iOS/Android instead use colors.backgroundNavy here
const DARK_ARC = '#FFFFFF'; // per spec - web/iOS/Android instead use colors.brand here
// -------------------------------------------------------------------------

const ARC_COLOR: Record<PULoaderVariant, string> = {
  light: LIGHT_ARC,
  dark: DARK_ARC,
};

const TRACK_COLOR: Record<PULoaderVariant, string> = {
  light: colors.loaderTrack,
  dark: 'rgba(255,255,255,0.2)',
};

const SIZE = 64;
const STROKE_WIDTH = 6;

export function PULoader({
  variant = 'light',
  accessibilityLabel = 'Loading',
  style,
  testID,
}: PULoaderProps) {
  const spin = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(spin, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    loop.start();
    return () => loop.stop();
  }, [spin]);

  const rotate = spin.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });

  return (
    <View
      testID={testID}
      accessibilityRole="progressbar"
      accessibilityLabel={accessibilityLabel}
      style={[styles.container, style]}
    >
      <View style={[styles.ring, { borderColor: TRACK_COLOR[variant] }]} />
      <Animated.View
        style={[
          styles.ring,
          styles.arc,
          { borderColor: ARC_COLOR[variant], transform: [{ rotate }] },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: SIZE,
    height: SIZE,
  },
  ring: {
    position: 'absolute',
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    borderWidth: STROKE_WIDTH,
  },
  arc: {
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
  },
});
