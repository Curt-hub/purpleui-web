import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle,
} from 'react-native';
import { colors } from '../tokens/colors';
import { radius } from '../tokens/radius';
import { shadows } from '../tokens/shadows';
import { typography } from '../tokens/typography';

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

const GLYPH: Record<PUToastVariant, string> = {
  success: '✓', // check
  info: 'i',
  warning: '!',
  error: '✕', // x
  offline: '⊘', // circled slash
};

const VARIANT_STYLE: Record<PUToastVariant, { background: string; text: string }> = {
  success: { background: colors.success, text: '#FFFFFF' },
  info: { background: colors.info, text: '#FFFFFF' },
  warning: { background: colors.warning, text: colors.onBackground },
  error: { background: colors.error, text: '#FFFFFF' },
  offline: { background: colors.onBackground, text: colors.background },
};

export function PUToast({
  visible,
  message,
  variant = 'success',
  showIcon = true,
  onDismiss,
  duration = 2500,
  style,
  testID,
}: PUToastProps) {
  const [mounted, setMounted] = useState(visible);
  const progress = useRef(new Animated.Value(visible ? 1 : 0)).current;
  const autoDismissTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (autoDismissTimer.current) {
      clearTimeout(autoDismissTimer.current);
      autoDismissTimer.current = null;
    }

    if (visible) {
      setMounted(true);
      Animated.spring(progress, {
        toValue: 1,
        useNativeDriver: true,
        speed: 18,
        bounciness: 6,
      }).start();

      if (onDismiss) {
        autoDismissTimer.current = setTimeout(onDismiss, duration);
      }
    } else {
      Animated.timing(progress, {
        toValue: 0,
        duration: 180,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished) setMounted(false);
      });
    }

    return () => {
      if (autoDismissTimer.current) clearTimeout(autoDismissTimer.current);
    };
  }, [visible, duration, onDismiss, progress]);

  if (!mounted) return null;

  const v = VARIANT_STYLE[variant];
  const translateY = progress.interpolate({ inputRange: [0, 1], outputRange: [-16, 0] });
  const scale = progress.interpolate({ inputRange: [0, 1], outputRange: [0.97, 1] });

  return (
    <Animated.View
      testID={testID}
      accessibilityRole="alert"
      accessibilityLiveRegion="polite"
      style={[
        styles.base,
        shadows.bottomD,
        {
          backgroundColor: v.background,
          opacity: progress,
          transform: [{ translateY }, { scale }],
        },
        style,
      ]}
    >
      {showIcon && (
        <Text style={[styles.glyph, { color: v.text }]} accessibilityElementsHidden>
          {GLYPH[variant]}
        </Text>
      )}
      <Text style={[styles.message, { color: v.text }]} numberOfLines={2}>
        {message}
      </Text>
      {onDismiss && (
        <Pressable
          onPress={onDismiss}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel="Dismiss"
          style={styles.dismiss}
        >
          <Text style={[styles.dismissGlyph, { color: v.text }]}>{'✕'}</Text>
        </Pressable>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: radius.full,
    alignSelf: 'center',
  },
  glyph: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.sizes.supporting,
    width: 16,
    textAlign: 'center',
  },
  message: {
    flex: 1,
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.sizes.supporting,
  },
  dismiss: {
    opacity: 0.7,
    marginLeft: 4,
  },
  dismissGlyph: {
    fontSize: 12,
    fontFamily: typography.fontFamily.bold,
  },
});
