import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
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
export declare function PUBottomNav({ activeTab, onTabChange, dark, bottomInset, style, testID, }: PUBottomNavProps): React.JSX.Element;
