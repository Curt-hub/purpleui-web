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
import { shadows } from '../tokens/shadows';
import { typography } from '../tokens/typography';
import { PUNavigateGlyph } from '../internal/PUNavigateGlyph';
import { PUPlusGlyph } from '../internal/PUPlusGlyph';

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

const SIZE = 56;

const DEFAULT_LABEL: Record<PUFloatingButtonIcon, string> = {
  navigate: 'Navigate to my location',
  plus: 'Add',
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function PUFloatingButton({
  variant,
  icon,
  label,
  dark = false,
  onPress,
  style,
  testID,
}: PUFloatingButtonProps) {
  const scale = useRef(new Animated.Value(1)).current;
  const background = dark ? 'rgba(255,255,255,0.12)' : colors.background;
  const borderColor = dark ? 'rgba(255,255,255,0.15)' : undefined; // outline dark mapping (see colors.ts)
  const foreground = dark ? '#FFFFFF' : colors.brand;
  const iconEl =
    icon === 'navigate' ? (
      <PUNavigateGlyph size={22} color={foreground} />
    ) : (
      <PUPlusGlyph size={22} color={foreground} />
    );

  const onPressIn = () => {
    Animated.spring(scale, {
      toValue: variant === 'icon' ? 0.92 : 0.95,
      useNativeDriver: true,
      speed: 30,
      bounciness: 6,
    }).start();
  };
  const onPressOut = () => {
    Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 30, bounciness: 6 }).start();
  };

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      accessibilityRole="button"
      accessibilityLabel={label ?? DEFAULT_LABEL[icon]}
      testID={testID}
      style={[
        styles.base,
        shadows.bottomD,
        variant === 'icon' ? styles.icon : styles.pill,
        {
          backgroundColor: background,
          borderWidth: borderColor ? 1 : 0,
          borderColor: borderColor ?? 'transparent',
          transform: [{ scale }],
        },
        style,
      ]}
    >
      {iconEl}
      {variant === 'pill' && label && (
        <Text style={[styles.label, { color: foreground }]} numberOfLines={1}>
          {label}
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
  icon: {
    width: SIZE,
    height: SIZE,
  },
  pill: {
    height: SIZE,
    paddingLeft: 12,
    paddingRight: 16,
    gap: 4,
  },
  label: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.sizes.body,
  },
});
