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
exports.PUToast = PUToast;
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const colors_1 = require("../tokens/colors");
const radius_1 = require("../tokens/radius");
const shadows_1 = require("../tokens/shadows");
const typography_1 = require("../tokens/typography");
const GLYPH = {
    success: '✓', // check
    info: 'i',
    warning: '!',
    error: '✕', // x
    offline: '⊘', // circled slash
};
const VARIANT_STYLE = {
    success: { background: colors_1.colors.success, text: '#FFFFFF' },
    info: { background: colors_1.colors.info, text: '#FFFFFF' },
    warning: { background: colors_1.colors.warning, text: colors_1.colors.onBackground },
    error: { background: colors_1.colors.error, text: '#FFFFFF' },
    offline: { background: colors_1.colors.onBackground, text: colors_1.colors.background },
};
function PUToast({ visible, message, variant = 'success', showIcon = true, onDismiss, duration = 2500, style, testID, }) {
    const [mounted, setMounted] = (0, react_1.useState)(visible);
    const progress = (0, react_1.useRef)(new react_native_1.Animated.Value(visible ? 1 : 0)).current;
    const autoDismissTimer = (0, react_1.useRef)(null);
    // Keep the latest `onDismiss` in a ref instead of a dependency of the
    // effect below. The documented usage passes an inline arrow
    // (`onDismiss={() => setShowToast(false)}`), which is a new reference on
    // every render - if the auto-dismiss effect depended on it directly, any
    // unrelated parent re-render would clear and restart the countdown timer.
    const onDismissRef = (0, react_1.useRef)(onDismiss);
    (0, react_1.useEffect)(() => {
        onDismissRef.current = onDismiss;
    }, [onDismiss]);
    (0, react_1.useEffect)(() => {
        if (autoDismissTimer.current) {
            clearTimeout(autoDismissTimer.current);
            autoDismissTimer.current = null;
        }
        const runExitAnimation = () => {
            react_native_1.Animated.timing(progress, {
                toValue: 0,
                duration: 180,
                easing: react_native_1.Easing.out(react_native_1.Easing.quad),
                useNativeDriver: true,
            }).start(({ finished }) => {
                if (finished)
                    setMounted(false);
            });
        };
        if (visible) {
            setMounted(true);
            react_native_1.Animated.spring(progress, {
                toValue: 1,
                useNativeDriver: true,
                speed: 18,
                bounciness: 6,
            }).start();
            // The toast hides itself after `duration` regardless of whether
            // `onDismiss` is provided - dismissal is driven by internal state,
            // not by the presence of the prop. `onDismiss` is only a
            // notification fired alongside it, read from the ref above so it
            // never influences when this timer fires.
            autoDismissTimer.current = setTimeout(() => {
                autoDismissTimer.current = null;
                runExitAnimation();
                onDismissRef.current?.();
            }, duration);
        }
        else {
            runExitAnimation();
        }
        return () => {
            if (autoDismissTimer.current) {
                clearTimeout(autoDismissTimer.current);
                autoDismissTimer.current = null;
            }
        };
    }, [visible, duration, progress]);
    if (!mounted)
        return null;
    const v = VARIANT_STYLE[variant];
    const translateY = progress.interpolate({ inputRange: [0, 1], outputRange: [-16, 0] });
    const scale = progress.interpolate({ inputRange: [0, 1], outputRange: [0.97, 1] });
    return (react_1.default.createElement(react_native_1.Animated.View, { testID: testID, accessibilityRole: "alert", accessibilityLiveRegion: "polite", style: [
            styles.base,
            shadows_1.shadows.bottomD,
            {
                backgroundColor: v.background,
                opacity: progress,
                transform: [{ translateY }, { scale }],
            },
            style,
        ] },
        showIcon && (react_1.default.createElement(react_native_1.Text, { style: [styles.glyph, { color: v.text }], accessibilityElementsHidden: true }, GLYPH[variant])),
        react_1.default.createElement(react_native_1.Text, { style: [styles.message, { color: v.text }], numberOfLines: 2 }, message),
        onDismiss && (react_1.default.createElement(react_native_1.Pressable, { onPress: onDismiss, hitSlop: 8, accessibilityRole: "button", accessibilityLabel: "Dismiss", style: styles.dismiss },
            react_1.default.createElement(react_native_1.Text, { style: [styles.dismissGlyph, { color: v.text }] }, '✕')))));
}
const styles = react_native_1.StyleSheet.create({
    base: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: radius_1.radius.full,
        alignSelf: 'center',
    },
    glyph: {
        fontFamily: typography_1.typography.fontFamily.bold,
        fontSize: typography_1.typography.sizes.supporting,
        width: 16,
        textAlign: 'center',
    },
    message: {
        flex: 1,
        fontFamily: typography_1.typography.fontFamily.bold,
        fontSize: typography_1.typography.sizes.supporting,
    },
    dismiss: {
        opacity: 0.7,
        marginLeft: 4,
    },
    dismissGlyph: {
        fontSize: 12,
        fontFamily: typography_1.typography.fontFamily.bold,
    },
});
