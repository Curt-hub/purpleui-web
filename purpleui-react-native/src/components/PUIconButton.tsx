import React, { useRef } from 'react';
import {
  Animated,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle,
} from 'react-native';
import { colors } from '../tokens/colors';
import { radius } from '../tokens/radius';
import { typography } from '../tokens/typography';
import { PUChevronLeft } from '../internal/PUChevronLeft';

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

const VARIANT_STYLE: Record<PUIconButtonVariant, { background: string; foreground: string }> = {
  light: {
    background: colors.backgroundElevated,
    foreground: colors.onBackground,
  },
  dark: {
    background: 'rgba(255,255,255,0.12)',
    foreground: '#FFFFFF',
  },
};

const CIRCLE_SIZE = 40;

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function PUIconButton({
  icon,
  variant = 'light',
  text,
  accessibilityLabel,
  disabled = false,
  onPress,
  style,
  testID,
}: PUIconButtonProps) {
  const scale = useRef(new Animated.Value(1)).current;
  const v = VARIANT_STYLE[variant];
  const iconSize = text ? 14 : 16;

  const onPressIn = () => {
    Animated.spring(scale, { toValue: 0.92, useNativeDriver: true, speed: 30, bounciness: 6 }).start();
  };
  const onPressOut = () => {
    Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 30, bounciness: 6 }).start();
  };

  return (
    <AnimatedPressable
      onPress={disabled ? undefined : onPress}
      onPressIn={disabled ? undefined : onPressIn}
      onPressOut={disabled ? undefined : onPressOut}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      accessibilityLabel={accessibilityLabel ?? text ?? 'Back'}
      testID={testID}
      style={[
        styles.base,
        text ? styles.pill : styles.circle,
        {
          backgroundColor: v.background,
          opacity: disabled ? 0.5 : 1,
          transform: [{ scale }],
        },
        style,
      ]}
    >
      {icon ?? <PUChevronLeft size={iconSize} color={v.foreground} />}
      {text && (
        <Text style={[styles.text, { color: v.foreground }]} numberOfLines={1}>
          {text}
        </Text>
      )}
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
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
  },
  pill: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 6,
  },
  text: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.sizes.body,
  },
});
