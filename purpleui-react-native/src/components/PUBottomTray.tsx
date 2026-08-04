import React, { useRef, useState } from 'react';
import {
  Animated,
  PanResponder,
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

const HANDLE_WIDTH = 60;
const HANDLE_HEIGHT = 5;
// The visible 60x5 pill is decorative-only (see the accessibility note
// above); the actual tap target is the Pressable wrapping it, sized via
// HANDLE_PRESSABLE_MIN_SIZE (44) below. The row itself has to be at least
// that tall too, or the Pressable would just overflow a shorter parent -
// so this is 44, not the pill's own visual footprint.
const HANDLE_ROW_HEIGHT = 44;
// specs/PUBottomTray.json + web's actual source both document Poppins Bold
// 16px for the header title. typography.sizes has no 16 rung (12/14/18/22/40)
// - this is a literal for that reason, not a hardcoded colour/size that had
// a token available and skipped it.
const HEADER_TITLE_SIZE = 16;
// Explicit floor so the Pressable itself is >=44x44 regardless of its
// content's natural size (the pill it wraps is only 60x5) - this package's
// standard minimum touch target, matching e.g. PUBottomNav's tab style.
const HANDLE_PRESSABLE_MIN_SIZE = 44;
// Extra margin on top of the Pressable's own 44x44 floor: effective target
// ends up (44+2*6)=56 tall x (max(44,60)+2*24)=108 wide.
const HANDLE_HIT_SLOP = { top: 6, bottom: 6, left: 24, right: 24 };

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function PUBottomTray({
  title,
  children,
  dark = false,
  peekHeight = 160,
  expandHeight = 460,
  defaultExpanded = false,
  bottomInset = 0,
  style,
  testID,
}: PUBottomTrayProps) {
  const yOffset = expandHeight - peekHeight;
  const translateY = useRef(new Animated.Value(defaultExpanded ? 0 : yOffset)).current;
  const dragStartValue = useRef(defaultExpanded ? 0 : yOffset);
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  // `panResponder` below is constructed exactly once (a lazy ref guard - see
  // its own comment), so every closure passed into PanResponder.create is
  // permanently frozen to whatever render first mounted this component -
  // including `yOffset` (derived from
  // the `expandHeight`/`peekHeight` props) and `snapTo`. If a consumer
  // changes `expandHeight`/`peekHeight` after mount (e.g. to react to
  // keyboard visibility), those frozen closures would keep clamping/snapping
  // against the ORIGINAL bounds forever. `live` is a plain mutable box,
  // updated at the top of every render, that the frozen closures dereference
  // through at gesture-time instead of closing over directly - so they
  // always see this render's latest values without the PanResponder itself
  // ever being rebuilt (which would risk cancelling an in-flight drag).
  const live = useRef({ yOffset, snapTo: (_expanded: boolean) => {} });
  live.current.yOffset = yOffset;

  const snapTo = (expanded: boolean) => {
    const offset = live.current.yOffset;
    dragStartValue.current = expanded ? 0 : offset;
    setIsExpanded(expanded);
    Animated.spring(translateY, {
      toValue: dragStartValue.current,
      useNativeDriver: true,
      speed: 16,
      bounciness: 6,
    }).start();
  };
  live.current.snapTo = snapTo;

  // Lazy-init via a ref guard, not `useRef(PanResponder.create({...}))` -
  // that older form still evaluates `PanResponder.create({...})` (allocating
  // a whole new responder + closures) on *every* render before useRef
  // discards all but the first result, wasting work on a component that
  // re-renders during interaction (every `setIsExpanded` call, for one).
  // The `if (current == null)` guard below only ever constructs it once, and
  // - like `useRef` itself - is safe under StrictMode's double-invoked
  // renders (the second invocation sees `current` already set and skips
  // re-creating it).
  const panResponderRef = useRef<ReturnType<typeof PanResponder.create> | null>(null);
  if (panResponderRef.current == null) {
    panResponderRef.current = PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: (_, gesture) => Math.abs(gesture.dy) > 2,
      onPanResponderGrant: () => {
        translateY.stopAnimation((value) => {
          dragStartValue.current = value;
        });
      },
      onPanResponderMove: (_, gesture) => {
        translateY.setValue(clamp(dragStartValue.current + gesture.dy, 0, live.current.yOffset));
      },
      onPanResponderRelease: (_, gesture) => {
        const offset = live.current.yOffset;
        const current = clamp(dragStartValue.current + gesture.dy, 0, offset);
        const midpoint = offset / 2;
        // RN's gestureState.vy is px/ms (framer-motion's velocity.y, which
        // the web dragSnap logic this mirrors is built on, is px/s) - 0.5
        // px/ms is this component's equivalent "fast flick" threshold, not
        // a literal port of web's `200` constant.
        const FAST = 0.5;
        const draggingDownFast = gesture.vy > FAST;
        const draggingUpFast = gesture.vy < -FAST;
        const shouldPeek = draggingDownFast || (current > midpoint && !draggingUpFast);
        live.current.snapTo(!shouldPeek);
      },
    });
  }
  const panResponder = panResponderRef.current;

  const background = dark ? '#0a2048' : colors.background; // backgroundElevated dark mapping (see colors.ts)
  const handleColor = dark ? 'rgba(255,255,255,0.15)' : colors.loaderTrack; // greyD (#DDDDDF)
  const titleColor = dark ? '#FFFFFF' : colors.onBackground;

  return (
    <Animated.View
      testID={testID}
      style={[
        styles.base,
        shadows.topC,
        {
          height: expandHeight + bottomInset,
          backgroundColor: background,
          borderTopLeftRadius: radius.lg,
          borderTopRightRadius: radius.lg,
          transform: [{ translateY }],
        },
        style,
      ]}
    >
      <View {...panResponder.panHandlers} style={styles.handleRow}>
        <Pressable
          onPress={() => snapTo(!isExpanded)}
          accessibilityRole="button"
          accessibilityLabel={isExpanded ? 'Collapse tray' : 'Expand tray'}
          accessibilityState={{ expanded: isExpanded }}
          hitSlop={HANDLE_HIT_SLOP}
          style={styles.handlePressable}
        >
          <View
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
            style={{
              width: HANDLE_WIDTH,
              height: HANDLE_HEIGHT,
              borderRadius: radius.full,
              backgroundColor: handleColor,
            }}
          />
        </Pressable>
      </View>

      {title && (
        <View style={styles.header}>
          <Text
            accessibilityRole="header"
            style={[styles.title, { color: titleColor }]}
            numberOfLines={1}
          >
            {title}
          </Text>
        </View>
      )}

      <View style={{ flex: 1, paddingBottom: bottomInset }}>{children}</View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  base: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'column',
  },
  handleRow: {
    height: HANDLE_ROW_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  handlePressable: {
    minWidth: HANDLE_PRESSABLE_MIN_SIZE,
    minHeight: HANDLE_PRESSABLE_MIN_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.sm,
  },
  title: {
    fontFamily: typography.fontFamily.bold,
    fontSize: HEADER_TITLE_SIZE,
  },
});
