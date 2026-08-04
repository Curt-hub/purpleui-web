"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.PUBottomTray = PUBottomTray;
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const colors_1 = require("../tokens/colors");
const radius_1 = require("../tokens/radius");
const shadows_1 = require("../tokens/shadows");
const spacing_1 = require("../tokens/spacing");
const typography_1 = require("../tokens/typography");
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
function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}
function PUBottomTray({ title, children, dark = false, peekHeight = 160, expandHeight = 460, defaultExpanded = false, bottomInset = 0, style, testID, }) {
    const yOffset = expandHeight - peekHeight;
    const translateY = (0, react_1.useRef)(new react_native_1.Animated.Value(defaultExpanded ? 0 : yOffset)).current;
    const dragStartValue = (0, react_1.useRef)(defaultExpanded ? 0 : yOffset);
    const [isExpanded, setIsExpanded] = (0, react_1.useState)(defaultExpanded);
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
    const live = (0, react_1.useRef)({ yOffset, snapTo: (_expanded) => { } });
    live.current.yOffset = yOffset;
    const snapTo = (expanded) => {
        const offset = live.current.yOffset;
        dragStartValue.current = expanded ? 0 : offset;
        setIsExpanded(expanded);
        react_native_1.Animated.spring(translateY, {
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
    const panResponderRef = (0, react_1.useRef)(null);
    if (panResponderRef.current == null) {
        panResponderRef.current = react_native_1.PanResponder.create({
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
    const background = dark ? '#0a2048' : colors_1.colors.background; // backgroundElevated dark mapping (see colors.ts)
    const handleColor = dark ? 'rgba(255,255,255,0.15)' : colors_1.colors.loaderTrack; // greyD (#DDDDDF)
    const titleColor = dark ? '#FFFFFF' : colors_1.colors.onBackground;
    return (react_1.default.createElement(react_native_1.Animated.View, { testID: testID, style: [
            styles.base,
            shadows_1.shadows.topC,
            {
                height: expandHeight + bottomInset,
                backgroundColor: background,
                borderTopLeftRadius: radius_1.radius.lg,
                borderTopRightRadius: radius_1.radius.lg,
                transform: [{ translateY }],
            },
            style,
        ] },
        react_1.default.createElement(react_native_1.View, { ...panResponder.panHandlers, style: styles.handleRow },
            react_1.default.createElement(react_native_1.Pressable, { onPress: () => snapTo(!isExpanded), accessibilityRole: "button", accessibilityLabel: isExpanded ? 'Collapse tray' : 'Expand tray', accessibilityState: { expanded: isExpanded }, hitSlop: HANDLE_HIT_SLOP, style: styles.handlePressable },
                react_1.default.createElement(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", style: {
                        width: HANDLE_WIDTH,
                        height: HANDLE_HEIGHT,
                        borderRadius: radius_1.radius.full,
                        backgroundColor: handleColor,
                    } }))),
        title && (react_1.default.createElement(react_native_1.View, { style: styles.header },
            react_1.default.createElement(react_native_1.Text, { accessibilityRole: "header", style: [styles.title, { color: titleColor }], numberOfLines: 1 }, title))),
        react_1.default.createElement(react_native_1.View, { style: { flex: 1, paddingBottom: bottomInset } }, children)));
}
const styles = react_native_1.StyleSheet.create({
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
        paddingHorizontal: spacing_1.spacing.xl,
        paddingBottom: spacing_1.spacing.sm,
    },
    title: {
        fontFamily: typography_1.typography.fontFamily.bold,
        fontSize: HEADER_TITLE_SIZE,
    },
});
