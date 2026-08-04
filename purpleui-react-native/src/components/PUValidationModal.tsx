import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Modal,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import { colors } from '../tokens/colors';
import { radius } from '../tokens/radius';
import { spacing } from '../tokens/spacing';
import { typography } from '../tokens/typography';

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

const CONFIRM_BACKGROUND: Record<PUValidationModalVariant, string> = {
  info: colors.brand,
  warning: colors.warning,
  destructive: colors.error,
};
const CONFIRM_TEXT: Record<PUValidationModalVariant, string> = {
  info: '#FFFFFF',
  warning: colors.onBackground,
  destructive: '#FFFFFF',
};

const CARD_MAX_WIDTH = 393;
const BUTTON_HEIGHT = 48;
const SCALE_FROM = 0.85; // per spec - web/iOS both instead animate from 0.92

export function PUValidationModal({
  visible,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'info',
  onConfirm,
  onDismiss,
  dark = false,
  style,
  testID,
}: PUValidationModalProps) {
  const [mounted, setMounted] = useState(visible);
  const progress = useRef(new Animated.Value(visible ? 1 : 0)).current;

  useEffect(() => {
    if (visible) {
      setMounted(true);
      Animated.spring(progress, {
        toValue: 1,
        useNativeDriver: true,
        speed: 16,
        bounciness: 6,
      }).start();
    } else if (mounted) {
      Animated.timing(progress, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished) setMounted(false);
      });
    }
  }, [visible]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!mounted) return null;

  const scale = progress.interpolate({ inputRange: [0, 1], outputRange: [SCALE_FROM, 1] });
  const cardBackground = dark ? '#0a2048' : colors.background; // backgroundElevated dark mapping (see colors.ts)
  // 0.1 is specs/PUValidationModal.json's own documented card.border.dark
  // value - NOT colors.ts's outlineSubtle dark-mapping comment (the token
  // used in the light branch below), which says 0.06. The two sources
  // disagree; this follows the component-specific spec value.
  const cardBorder = dark ? 'rgba(255,255,255,0.1)' : colors.outlineSubtle;
  const titleColor = dark ? '#FFFFFF' : colors.onBackground;
  const messageColor = dark ? 'rgba(255,255,255,0.7)' : colors.onBackground; // onBackgroundSecondary dark mapping
  const cancelBorderColor = dark ? 'rgba(255,255,255,0.2)' : colors.onBackground;
  const cancelTextColor = dark ? 'rgba(255,255,255,0.8)' : colors.onBackground;
  const backdropColor = dark ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.2)';

  return (
    <Modal
      transparent
      visible={mounted}
      animationType="none"
      onRequestClose={onDismiss}
      statusBarTranslucent
      testID={testID}
    >
      <Animated.View style={[styles.backdrop, { opacity: progress, backgroundColor: backdropColor }]}>
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={onDismiss}
          accessibilityRole="button"
          accessibilityLabel="Dismiss"
        />
      </Animated.View>

      <View style={styles.centerWrap} pointerEvents="box-none">
        <Animated.View
          accessibilityViewIsModal
          accessibilityRole="alert"
          style={[
            styles.card,
            {
              backgroundColor: cardBackground,
              borderColor: cardBorder,
              opacity: progress,
              transform: [{ scale }],
            },
            style,
          ]}
        >
          <View style={styles.content}>
            <Text style={[styles.title, { color: titleColor }]}>{title}</Text>
            <Text style={[styles.message, { color: messageColor }]}>{message}</Text>
          </View>

          <View style={styles.buttons}>
            <Pressable
              onPress={onConfirm}
              accessibilityRole="button"
              style={[styles.button, { backgroundColor: CONFIRM_BACKGROUND[variant] }]}
            >
              <Text style={[styles.buttonLabel, { color: CONFIRM_TEXT[variant] }]} numberOfLines={1}>
                {confirmLabel}
              </Text>
            </Pressable>

            <Pressable
              onPress={onDismiss}
              accessibilityRole="button"
              style={[
                styles.button,
                styles.cancelButton,
                { borderColor: cancelBorderColor },
              ]}
            >
              <Text style={[styles.buttonLabel, { color: cancelTextColor }]} numberOfLines={1}>
                {cancelLabel}
              </Text>
            </Pressable>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  centerWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  card: {
    width: '100%',
    maxWidth: CARD_MAX_WIDTH,
    borderRadius: radius.md,
    borderWidth: 1,
    paddingVertical: 30,
    paddingHorizontal: spacing.xl,
    gap: spacing['2xl'],
  },
  content: {
    gap: spacing.sm,
  },
  title: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.sizes.section,
  },
  message: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.sizes.body,
    lineHeight: typography.sizes.body * 1.5,
  },
  buttons: {
    gap: spacing.md,
  },
  button: {
    height: BUTTON_HEIGHT,
    borderRadius: radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    borderWidth: 1.5,
    backgroundColor: 'transparent',
  },
  buttonLabel: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.sizes.body,
  },
});
