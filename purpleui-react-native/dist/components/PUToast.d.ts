import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
/**
 * First-slice PUToast for React Native.
 *
 * Colours follow specs/PUToast.json exactly, including `offline` using
 * colors.onBackground/colors.background - the current web component hardcodes
 * an off-spec `#3A3D4A` for offline instead; that's exactly the kind of
 * drift this package exists to stop.
 *
 * Placement is the consumer's job (same as web): PUToast renders the pill
 * itself, not a screen-anchored overlay. Render it inside a top-anchored
 * absolutely-positioned wrapper - see the README for a snippet.
 *
 * Icon glyphs are plain Unicode characters, not FontAwesome - same
 * no-DOM-dependency reasoning as PUButton/PUIconButton. Swap these for the
 * Icons foundation once it ships an RN answer.
 */
export type PUToastVariant = 'success' | 'info' | 'warning' | 'error' | 'offline';
export interface PUToastProps {
    /** Controls toast visibility (spec's `isPresented`). */
    visible: boolean;
    message: string;
    /** @default 'success' */
    variant?: PUToastVariant;
    /** @default true */
    showIcon?: boolean;
    /** Called once, when the toast finishes dismissing (auto or manual). */
    onDismiss?: () => void;
    /** Auto-dismiss delay in ms, per spec's `behaviour.autoDismiss`. @default 2500 */
    duration?: number;
    style?: StyleProp<ViewStyle>;
    testID?: string;
}
export declare function PUToast({ visible, message, variant, showIcon, onDismiss, duration, style, testID, }: PUToastProps): React.JSX.Element | null;
