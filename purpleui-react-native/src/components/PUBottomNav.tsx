import React from 'react';
import { Pressable, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { colors } from '../tokens/colors';
import { typography } from '../tokens/typography';
import {
  PUActivityGlyph,
  PUBottomNavGlyphProps,
  PUExploreGlyph,
  PUProfileGlyph,
  PUWalletGlyph,
} from '../internal/PUBottomNavIcons';

/**
 * First-slice PUBottomNav for React Native.
 *
 * specs/PUBottomNav.json documents a 65px-tall bar (plus safe-area bottom
 * inset on native) with a SINGLE icon per tab - matching iOS/Android
 * (FA.mapMarker/wallet/receipt/user). Web instead ships an 88px bar that
 * swaps between a hand-rolled FontAwesome Regular (inactive) and Solid
 * (active) SVG pair per tab. RN has no SVG dependency and no bundled icon
 * font today, so this component follows the iOS/Android shape (single icon,
 * 65px) rather than the web one - do not hand-roll the web's Regular/Solid
 * SVG paths here. Each tab's icon is a dependency-free geometric
 * placeholder (see internal/PUBottomNavIcons.tsx) pending the Icons
 * foundation's RN answer.
 *
 * `bottomInset` lets the consumer pass their own safe-area bottom inset
 * (e.g. `useSafeAreaInsets().bottom` from `react-native-safe-area-context`)
 * without this package taking a hard dependency on that library - it isn't
 * declared as a peer/dev dependency here. @default 0
 *
 * Accessibility: web/iOS/Android all currently fail to expose selected tab
 * state to assistive tech. This component adds `accessibilityRole="tab"` +
 * `accessibilityState={{ selected }}` on every tab so RN doesn't repeat that
 * gap - per specs/PUBottomNav.json's `accessibility.role`, the bar itself
 * gets `accessibilityRole="tabbar"`.
 */
export type PUBottomNavTab = 'explore' | 'wallet' | 'activity' | 'profile';

export interface PUBottomNavProps {
  /** Currently active tab - all tabs render unselected if omitted. */
  activeTab?: PUBottomNavTab;
  onTabChange?: (tab: PUBottomNavTab) => void;
  /** Dark mode - navy background. @default false */
  dark?: boolean;
  /** Safe-area bottom inset to add on top of the 65px bar height. @default 0 */
  bottomInset?: number;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

const BAR_HEIGHT = 65;

const TABS: {
  id: PUBottomNavTab;
  label: string;
  Icon: (props: PUBottomNavGlyphProps) => React.JSX.Element;
}[] = [
  { id: 'explore', label: 'Explore', Icon: PUExploreGlyph },
  { id: 'wallet', label: 'Wallet', Icon: PUWalletGlyph },
  { id: 'activity', label: 'Activity', Icon: PUActivityGlyph },
  { id: 'profile', label: 'Profile', Icon: PUProfileGlyph },
];

export function PUBottomNav({
  activeTab,
  onTabChange,
  dark = false,
  bottomInset = 0,
  style,
  testID,
}: PUBottomNavProps) {
  const background = dark ? colors.backgroundNavy : colors.background;
  // 0.08 is specs/PUBottomNav.json's own documented dark border value for
  // this component - NOT colors.ts's outlineSubtle dark-mapping comment,
  // which says 0.06. The two sources disagree; this follows the
  // component-specific spec value (see the build report), same convention
  // PUIconButton already uses for its own `dark` variant literals.
  const borderColor = dark ? 'rgba(255,255,255,0.08)' : colors.outlineSubtle;

  return (
    <View
      testID={testID}
      accessibilityRole="tabbar"
      style={[
        styles.base,
        {
          height: BAR_HEIGHT + bottomInset,
          paddingBottom: bottomInset,
          backgroundColor: background,
          borderTopColor: borderColor,
        },
        style,
      ]}
    >
      {TABS.map(({ id, label, Icon }) => {
        const isActive = activeTab === id;
        // specs/PUBottomNav.json's `tokens.activeTab` documents a single
        // colors.brand value for the active icon/label with no light/dark
        // split. The web/iOS/Android reference implementations all disagree
        // with that (and agree with each other): they use colors.onBackground
        // (black) for active-on-light and colors.brand only for active-on-dark.
        // Per instructions, this component follows the SPEC's colors.brand-
        // always reading rather than silently matching web/iOS/Android - see
        // the build report for this flagged disagreement.
        const tintColor = isActive
          ? colors.brand
          : dark
          ? 'rgba(255,255,255,0.35)' // onBackgroundTertiary dark mapping (see colors.ts)
          : colors.onBackgroundTertiary;

        return (
          <Pressable
            key={id}
            onPress={() => onTabChange?.(id)}
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive }}
            accessibilityLabel={label}
            hitSlop={4}
            style={styles.tab}
          >
            <Icon size={24} color={tintColor} />
            <Text style={[styles.label, { color: tintColor }]} numberOfLines={1}>
              {label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderTopWidth: 1,
  },
  tab: {
    minWidth: 44,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  label: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.sizes.supporting,
  },
});
