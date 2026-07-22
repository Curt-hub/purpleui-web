import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
export interface PUSpinnerProps {
    size?: number;
    color?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * Minimal ring spinner built from RN primitives only - a bordered circle
 * with its top edge made transparent, rotated on a loop. Mirrors the web
 * PUButton spinner (`border-2 border-current border-t-transparent animate-spin`).
 */
export declare function PUSpinner({ size, color, style }: PUSpinnerProps): React.JSX.Element;
