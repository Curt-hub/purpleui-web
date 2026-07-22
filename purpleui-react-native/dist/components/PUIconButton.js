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
exports.PUIconButton = PUIconButton;
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const colors_1 = require("../tokens/colors");
const radius_1 = require("../tokens/radius");
const typography_1 = require("../tokens/typography");
const PUChevronLeft_1 = require("../internal/PUChevronLeft");
const VARIANT_STYLE = {
    light: {
        background: colors_1.colors.backgroundElevated,
        foreground: colors_1.colors.onBackground,
    },
    dark: {
        background: 'rgba(255,255,255,0.12)',
        foreground: '#FFFFFF',
    },
};
const CIRCLE_SIZE = 40;
const AnimatedPressable = react_native_1.Animated.createAnimatedComponent(react_native_1.Pressable);
function PUIconButton({ icon, variant = 'light', text, accessibilityLabel, disabled = false, onPress, style, testID, }) {
    const scale = (0, react_1.useRef)(new react_native_1.Animated.Value(1)).current;
    const v = VARIANT_STYLE[variant];
    const iconSize = text ? 14 : 16;
    const onPressIn = () => {
        react_native_1.Animated.spring(scale, { toValue: 0.92, useNativeDriver: true, speed: 30, bounciness: 6 }).start();
    };
    const onPressOut = () => {
        react_native_1.Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 30, bounciness: 6 }).start();
    };
    return (react_1.default.createElement(AnimatedPressable, { onPress: disabled ? undefined : onPress, onPressIn: disabled ? undefined : onPressIn, 
        // Always spring back to scale 1 on release, even if `disabled` flips
        // true while the press was still active - otherwise the scale can
        // stick at 0.92. Only the ACTION (onPress firing) is gated on disabled.
        onPressOut: onPressOut, disabled: disabled, accessibilityRole: "button", accessibilityState: { disabled }, accessibilityLabel: accessibilityLabel ?? text ?? 'Back', testID: testID, style: [
            styles.base,
            text ? styles.pill : styles.circle,
            {
                backgroundColor: v.background,
                opacity: disabled ? 0.5 : 1,
                transform: [{ scale }],
            },
            style,
        ] },
        icon ?? react_1.default.createElement(PUChevronLeft_1.PUChevronLeft, { size: iconSize, color: v.foreground }),
        text && (react_1.default.createElement(react_native_1.Text, { style: [styles.text, { color: v.foreground }], numberOfLines: 1 }, text))));
}
const styles = react_native_1.StyleSheet.create({
    base: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-start',
        borderRadius: radius_1.radius.full,
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
        fontFamily: typography_1.typography.fontFamily.bold,
        fontSize: typography_1.typography.sizes.body,
    },
});
