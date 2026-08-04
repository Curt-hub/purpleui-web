import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
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
export declare function PULoader({ variant, accessibilityLabel, style, testID, }: PULoaderProps): React.JSX.Element;
