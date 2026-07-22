import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
/**
 * First-slice PUButton for React Native.
 *
 * specs/PUButton.json documents primary/secondary/secondary-dark/destructive
 * variants and sm/md/lg/compact sizes plus an optional FontAwesome `icon`.
 * This slice ships primary/secondary/destructive and sm/md - the variants
 * and sizes actually in use today - and defers `icon` support until the
 * Icons foundation has an RN answer (FontAwesome's web package is a DOM
 * dependency; iOS/Android solve this with a bundled icon font + a native
 * FA enum, which is a separate, cross-cutting piece of work).
 */
export type PUButtonVariant = 'primary' | 'secondary' | 'destructive';
export type PUButtonSize = 'sm' | 'md';
export interface PUButtonProps {
    /** Button text label. */
    label: string;
    /** Visual style of the button. @default 'primary' */
    variant?: PUButtonVariant;
    /** sm = 40dp height, md = 48dp height. @default 'md' */
    size?: PUButtonSize;
    /** Shows a built-in spinner and disables interaction. @default false */
    loading?: boolean;
    /** Expands to fill available width. @default false */
    fullWidth?: boolean;
    /** Disables interaction. @default false */
    disabled?: boolean;
    /** Tap handler (RN idiom for the spec's `onClick`). */
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
    testID?: string;
    /** Defaults to `label` if omitted. */
    accessibilityLabel?: string;
}
export declare function PUButton({ label, variant, size, loading, fullWidth, disabled, onPress, style, testID, accessibilityLabel, }: PUButtonProps): React.JSX.Element;
