import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
/**
 * First-slice PUFloatingButton for React Native.
 *
 * Flagged spec-vs-implementation disagreement: specs/PUFloatingButton.json
 * documents the dark variant's background as rgba(255,255,255,0.12), but
 * web, iOS AND Android all actually use a solid '#0a2048' instead - all
 * three implementations agree with each other and disagree with the spec.
 * This component follows the spec's rgba(255,255,255,0.12) - see the build
 * report.
 *
 * The spec doesn't document a default accessibilityLabel for the icon
 * variant when `label` is omitted (its accessibility note just says the
 * variant "requires label prop"). Rather than leave it unlabeled if a
 * caller forgets, this component falls back to iOS/Android's icon-aware
 * defaults ("Navigate to my location" / "Add plus a WiFi network" -
 * shortened here to "Add") rather than web's generic "Floating action"
 * fallback - see the build report.
 *
 * Icon glyphs are dependency-free RN-primitive placeholders (see
 * internal/PUNavigateGlyph.tsx, internal/PUPlusGlyph.tsx) standing in for
 * the Icons foundation's still-unshipped RN answer.
 */
export type PUFloatingButtonVariant = 'icon' | 'pill';
export type PUFloatingButtonIcon = 'navigate' | 'plus';
export interface PUFloatingButtonProps {
    /** 'icon' = 56x56 circle | 'pill' = icon + label side by side. */
    variant: PUFloatingButtonVariant;
    icon: PUFloatingButtonIcon;
    /** Text label (pill variant only). Also used as accessibilityLabel on the icon variant. */
    label?: string;
    /** Dark surface - navy background with a subtle border. @default false */
    dark?: boolean;
    onPress: () => void;
    style?: StyleProp<ViewStyle>;
    testID?: string;
}
export declare function PUFloatingButton({ variant, icon, label, dark, onPress, style, testID, }: PUFloatingButtonProps): React.JSX.Element;
