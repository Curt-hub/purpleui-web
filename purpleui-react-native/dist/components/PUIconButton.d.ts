import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
/**
 * First-slice PUIconButton for React Native.
 *
 * specs/PUIconButton.json's `icon` prop is typed against FontAwesome's
 * IconDefinition, a web/DOM package. RN has no equivalent bundled icon set,
 * so `icon` here takes any ReactNode - PUIconButton owns the chrome (circle
 * or pill, fill, sizing), the icon content is bring-your-own. It still
 * defaults to a real, dependency-free back-arrow (see PUChevronLeft) so the
 * component works out of the box exactly like the web/iOS/Android defaults.
 *
 * Colours/size follow specs/PUIconButton.json exactly (40x40, colors.
 * backgroundElevated + colors.onBackground for light; rgba(255,255,255,0.12)
 * + white for dark) rather than the current web/iOS implementations, which
 * have drifted from that spec (38px, bordered, onBackgroundSecondary).
 */
export type PUIconButtonVariant = 'light' | 'dark';
export interface PUIconButtonProps {
    /** Defaults to a back-arrow chevron. Pass any icon element to override. */
    icon?: React.ReactNode;
    /** Surface variant - light for light backgrounds, dark for navy/dark backgrounds. @default 'light' */
    variant?: PUIconButtonVariant;
    /** Optional label - renders as a pill with icon + text when provided. */
    text?: string;
    /** Accessible label (spec's `label` prop). Defaults to `text` or "Back". */
    accessibilityLabel?: string;
    disabled?: boolean;
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
    testID?: string;
}
export declare function PUIconButton({ icon, variant, text, accessibilityLabel, disabled, onPress, style, testID, }: PUIconButtonProps): React.JSX.Element;
