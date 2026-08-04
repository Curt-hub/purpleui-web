import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
/**
 * First-slice PUBottomTray for React Native.
 *
 * Draggable tray anchored to the bottom of the screen, snapping between a
 * peeked and an expanded height. Built with PanResponder + Animated (no
 * gesture-handler/reanimated dependency, matching this package's RN-
 * primitives-only approach elsewhere).
 *
 * Re-audited spec-vs-implementation disagreements (see the build report) -
 * this component follows the spec in every case below:
 * - Drag handle size: specs/PUBottomTray.json documents 60x5. Web's actual
 *   PUBottomTray.tsx ships 104x7 instead (off-spec); iOS and Android both
 *   ship the correct 60x5.
 * - Top-corner radius: the spec documents radius.lg (16px), but web, iOS
 *   AND Android all actually use radius.md (12px) for the tray's top
 *   corners - all three implementations agree with each other and disagree
 *   with the spec.
 * - Header typography size: the spec documents Poppins Bold 16px (web's
 *   source hardcodes 16 too, so spec and web agree here) - this component
 *   originally shipped `typography.sizes.section` (18) instead, reaching
 *   for the nearest token since the shared type scale (12/14/18/22/40) has
 *   no 16 rung. Fixed to a literal 16 (HEADER_TITLE_SIZE below); the
 *   missing-16 gap in the shared type scale is itself worth flagging
 *   upstream (see the build report), separate from this component's fix.
 * - Shadow: the spec documents shadows.topC (0px -2px 2px, per the token's
 *   own definition) by name AND by its own printed blur value. But web's
 *   actual inline style is '0px -2px 15px rgba(0,0,0,0.1)' (15px blur,
 *   matching shadows.topD, not topC), and iOS's real shadow radius (7.5,
 *   i.e. half of a 15px CSS blur - this codebase's own RN/CSS shadow
 *   conversion factor) matches that same 15px-blur intent - web and iOS
 *   agree with each other on a topD-strength shadow and disagree with the
 *   spec's topC. (Android's elevation, 8dp, doesn't map cleanly to either
 *   token but is closer in spirit to the stronger option.) This component
 *   still follows the spec's named token, shadows.topC.
 * - Filter button: the spec's prop list has no `onFilterPress`/filter
 *   button for this component at all - web's PUBottomTray.tsx renders one
 *   in its header markup, but it isn't wired to any prop there (no
 *   onClick), and neither iOS's nor Android's real PUBottomTray renders one
 *   at all. This component matches the spec/iOS/Android (title only, no
 *   filter button) rather than web's unwired one-off.
 *
 * Accessibility (specs/PUBottomTray.json's `accessibility.notes`): the tray
 * itself has no implicit role (matching the spec's `"role": "none"`). The
 * header title is exposed as a heading (`accessibilityRole="header"`). The
 * drag handle pill is purely decorative
 * (`accessibilityElementsHidden` + `importantForAccessibility="no-hide-
 * descendants"`) - per the spec, dragging can't be the *only* way to move
 * between peeked/expanded, so the entire handle row is wrapped in a real
 * `Pressable` that toggles between the two states on a plain tap, with
 * `accessibilityRole="button"` and `accessibilityState={{ expanded }}`.
 * This tap target works for every user (sighted or not), not just a
 * screen-reader-only hidden control, per the spec's own suggestion ("...
 * provide an alternative expand/collapse control (e.g. a button)"). The
 * outer row still carries the raw PanResponder handlers too - RN's
 * responder-negotiation model lets a plain tap resolve as a Pressable
 * press (via its own onPress) while a real drag (>2px of vertical
 * movement, this component's existing move threshold) gets claimed by the
 * PanResponder instead, so tap-to-toggle and drag-to-resize coexist on the
 * same region without one blocking the other.
 *
 * `bottomInset` lets the consumer pass their own safe-area bottom inset
 * (e.g. `useSafeAreaInsets().bottom` from `react-native-safe-area-context`)
 * without this package taking a hard dependency on that library - it isn't
 * declared as a peer/dev dependency here (see the build report). The tray's
 * background extends bottomInset px further down than `expandHeight`, so
 * the safe area is covered by the tray's own colour rather than left as a
 * gap; peek/expand drag distances are unaffected by the inset.
 */
export interface PUBottomTrayProps {
    /** Header title text (e.g. '34 WiFi nearby'). */
    title?: string;
    /** Tray body content (typically a list of rows). */
    children: React.ReactNode;
    /** Dark surface - navy background, white text. @default false */
    dark?: boolean;
    /** Visible height in px when tray is in peeked (collapsed) state. @default 160 */
    peekHeight?: number;
    /** Visible height in px when tray is fully expanded. @default 460 */
    expandHeight?: number;
    /** Start in expanded state. @default false */
    defaultExpanded?: boolean;
    /** Safe-area bottom inset absorbed into the tray's own background. @default 0 */
    bottomInset?: number;
    style?: StyleProp<ViewStyle>;
    testID?: string;
}
export declare function PUBottomTray({ title, children, dark, peekHeight, expandHeight, defaultExpanded, bottomInset, style, testID, }: PUBottomTrayProps): React.JSX.Element;
