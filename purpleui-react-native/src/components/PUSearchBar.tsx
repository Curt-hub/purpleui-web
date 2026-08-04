import React from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  TextInput,
  View,
  ViewStyle,
} from 'react-native';
import { colors } from '../tokens/colors';
import { radius } from '../tokens/radius';
import { shadows } from '../tokens/shadows';
import { typography } from '../tokens/typography';
import { PUSearchGlyph } from '../internal/PUSearchGlyph';
import { PUSlidersGlyph } from '../internal/PUSlidersGlyph';

/**
 * First-slice PUSearchBar for React Native.
 *
 * Colours/sizing follow specs/PUSearchBar.json. One flagged spec-vs-web
 * disagreement: the spec documents a default `placeholder` of
 * "Search networks…", but web's actual PUSearchBar.tsx defaults to plain
 * "Search" - this component follows the spec's default (see the build
 * report).
 *
 * Both web and iOS/Android currently ship the filter button unlabeled with
 * a tiny hit area - this component adds `accessibilityLabel="Filter"` (per
 * specs/PUSearchBar.json's own accessibility note) and a `hitSlop` so the
 * pressable target is >=44pt even though the visible glyph is smaller, so
 * RN doesn't repeat that gap.
 *
 * Search/filter icon glyphs are dependency-free RN-primitive placeholders
 * (see internal/PUSearchGlyph.tsx, internal/PUSlidersGlyph.tsx) standing in
 * for the Icons foundation's still-unshipped RN answer - same reasoning as
 * PUButton/PUIconButton/PUToast.
 */
export interface PUSearchBarProps {
  /** Controlled input value. */
  value: string;
  onChange: (value: string) => void;
  /** @default 'Search networks…' */
  placeholder?: string;
  /** Filter button tap handler - omit to hide the filter button. */
  onFilterPress?: () => void;
  /** Dark surface - navy background, white text, white search icon. @default false */
  dark?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

const HEIGHT = 48;
const FILTER_HIT_SLOP = 12; // 20px glyph + 2*12 hitSlop = 44pt effective target

export function PUSearchBar({
  value,
  onChange,
  placeholder = 'Search networks…',
  onFilterPress,
  dark = false,
  style,
  testID,
}: PUSearchBarProps) {
  const background = dark ? colors.backgroundNavy : colors.background;
  // 0.1 is specs/PUSearchBar.json's own documented dark border value for
  // this component - NOT colors.ts's outline dark-mapping comment, which
  // says 0.15. The two sources disagree; this follows the component-specific
  // spec value (see the build report).
  const borderColor = dark ? 'rgba(255,255,255,0.1)' : undefined;
  const searchIconColor = dark ? 'rgba(255,255,255,0.4)' : colors.onBackgroundTertiary;
  const textColor = dark ? '#FFFFFF' : colors.onBackground;
  const placeholderColor = dark ? 'rgba(255,255,255,0.35)' : colors.onBackgroundTertiary;

  return (
    <View
      testID={testID}
      style={[
        styles.base,
        !dark && shadows.bottomD,
        {
          height: HEIGHT,
          backgroundColor: background,
          borderWidth: dark ? 1 : 0,
          borderColor: borderColor ?? 'transparent',
        },
        style,
      ]}
    >
      <PUSearchGlyph size={20} color={searchIconColor} />

      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor={placeholderColor}
        accessibilityRole="search"
        style={[styles.input, { color: textColor }]}
      />

      {onFilterPress && (
        <Pressable
          onPress={onFilterPress}
          accessibilityRole="button"
          accessibilityLabel="Filter"
          hitSlop={FILTER_HIT_SLOP}
          style={styles.filterButton}
        >
          <PUSlidersGlyph size={20} color={colors.brand} />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: radius.full,
    paddingHorizontal: 12,
    gap: 12,
  },
  input: {
    flex: 1,
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.sizes.body,
    padding: 0,
  },
  filterButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
