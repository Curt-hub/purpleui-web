import React, { useRef } from 'react';
import {
  Animated,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import { colors } from '../tokens/colors';
import { radius } from '../tokens/radius';
import { shadows } from '../tokens/shadows';
import { spacing } from '../tokens/spacing';
import { typography } from '../tokens/typography';
import { PUSpinner } from '../internal/PUSpinner';

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

const HEIGHT: Record<PUButtonSize, number> = {
  sm: 40,
  md: 48,
};

// Both sm and md use the same horizontal padding on web (h-10/h-12 px-4).
const H_PADDING: Record<PUButtonSize, number> = {
  sm: spacing.lg,
  md: spacing.lg,
};

const VARIANT_STYLE: Record<
  PUButtonVariant,
  { background: string; text: string; borderColor?: string; borderWidth?: number }
> = {
  primary: {
    background: colors.brand,
    text: '#FFFFFF',
  },
  secondary: {
    background: colors.background,
    text: colors.onBackground,
    borderColor: colors.onBackground,
    borderWidth: 1,
  },
  destructive: {
    background: colors.error,
    text: '#FFFFFF',
  },
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function PUButton({
  label,
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  disabled = false,
  onPress,
  style,
  testID,
  accessibilityLabel,
}: PUButtonProps) {
  const scale = useRef(new Animated.Value(1)).current;
  const isDisabled = disabled || loading;
  const v = VARIANT_STYLE[variant];

  const onPressIn = () => {
    Animated.spring(scale, { toValue: 0.97, useNativeDriver: true, speed: 30, bounciness: 6 }).start();
  };
  const onPressOut = () => {
    Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 30, bounciness: 6 }).start();
  };

  return (
    <AnimatedPressable
      onPress={isDisabled ? undefined : onPress}
      onPressIn={isDisabled ? undefined : onPressIn}
      onPressOut={isDisabled ? undefined : onPressOut}
      disabled={isDisabled}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      accessibilityLabel={accessibilityLabel ?? label}
      testID={testID}
      style={[
        styles.base,
        shadows.bottomA,
        {
          height: HEIGHT[size],
          paddingHorizontal: H_PADDING[size],
          backgroundColor: v.background,
          borderColor: v.borderColor ?? 'transparent',
          borderWidth: v.borderWidth ?? 0,
          opacity: isDisabled ? 0.5 : 1,
          transform: [{ scale }],
        },
        fullWidth && styles.fullWidth,
        style,
      ]}
    >
      {loading && (
        <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
          <View style={styles.spinnerCenter}>
            <PUSpinner size={20} color={v.text} />
          </View>
        </View>
      )}
      {/* Label stays mounted (just hidden) while loading, so the button doesn't resize. */}
      <Text style={[styles.label, { color: v.text, opacity: loading ? 0 : 1 }]} numberOfLines={1}>
        {label}
      </Text>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    borderRadius: radius.full,
  },
  fullWidth: {
    alignSelf: 'stretch',
    width: '100%',
  },
  label: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.sizes.body,
    textAlign: 'center',
  },
  spinnerCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
