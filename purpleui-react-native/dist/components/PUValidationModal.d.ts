import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
/**
 * First-slice PUValidationModal for React Native (specs/PUValidationModal.json,
 * aliased "PUAlertModal"; reference implementation src/components/ui/PUAlertModal.tsx).
 *
 * Prop naming: the spec documents `isPresented`/`onDismiss` (the iOS
 * Binding-style naming); web instead uses `isOpen`/`onClose`, with no
 * documented web override in the spec. Per instructions, this component
 * uses the RN-idiomatic `visible`/`onDismiss` - matching how the existing
 * RN PUToast already resolved the identical spec-vs-web naming mismatch
 * for its own visibility prop (PUToast's spec/doc-comment calls it
 * `isPresented` too; PUToast.tsx ships `visible`). `onDismiss` happens to
 * already match the spec's own name for the dismiss callback, so only the
 * presence prop's name changes.
 *
 * Three flagged spec-vs-web (and, checked against iOS, spec-vs-both)
 * disagreements - this component follows the spec in all three cases:
 * - Card padding: spec documents "30px 20px" (paddingVertical 30,
 *   paddingHorizontal 20). Web hardcodes '50px 30px' instead; iOS uses a
 *   uniform 30 on all sides. All three differ from each other.
 * - Scale-in animation: spec documents a spring from 0.85 to 1.0. Web
 *   animates from scale 0.92, and iOS's insertion transition also scales
 *   from 0.92 - web and iOS agree with each other and disagree with the spec.
 * - (Android's real PUAlertModal.kt has drifted furthest of all three -
 *   different prop names, icon-led layout, radius.lg instead of radius.md,
 *   and "warning" variant doesn't tint the confirm button - out of scope
 *   for this port, called out here only as an FYI.)
 *
 * Backdrop: the spec/web/iOS all specify a blurred backdrop (blur(5px)).
 * This package has no blur dependency (`expo-blur` exists in the wifi-map-app
 * consuming app but isn't a peer/dev dependency of this package, and is
 * Expo-only - this package targets any RN >=0.72 app per its
 * peerDependencies). This component renders a plain semi-opaque scrim
 * instead of a real blur - see the build report.
 *
 * `accessibilityRole="alertdialog"` (the spec's documented role) isn't a
 * valid RN AccessibilityRole value - RN's closest built-in equivalent is
 * `"alert"`, paired with `accessibilityViewIsModal` so screen readers can't
 * reach content behind the backdrop while it's open.
 */
export type PUValidationModalVariant = 'info' | 'warning' | 'destructive';
export interface PUValidationModalProps {
    /** Controls modal visibility (spec's `isPresented` / web's `isOpen`). */
    visible: boolean;
    title: string;
    message: string;
    /** @default 'Confirm' */
    confirmLabel?: string;
    /** @default 'Cancel' */
    cancelLabel?: string;
    /** Determines the confirm button's colour. @default 'info' */
    variant?: PUValidationModalVariant;
    onConfirm: () => void;
    /** Called when the modal is dismissed (cancel button or backdrop tap). */
    onDismiss: () => void;
    /** Dark surface - navy card, white text. @default false */
    dark?: boolean;
    style?: StyleProp<ViewStyle>;
    testID?: string;
}
export declare function PUValidationModal({ visible, title, message, confirmLabel, cancelLabel, variant, onConfirm, onDismiss, dark, style, testID, }: PUValidationModalProps): React.JSX.Element | null;
