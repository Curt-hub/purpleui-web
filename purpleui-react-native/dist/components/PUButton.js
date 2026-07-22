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
exports.PUButton = PUButton;
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const colors_1 = require("../tokens/colors");
const radius_1 = require("../tokens/radius");
const shadows_1 = require("../tokens/shadows");
const spacing_1 = require("../tokens/spacing");
const typography_1 = require("../tokens/typography");
const PUSpinner_1 = require("../internal/PUSpinner");
const HEIGHT = {
    sm: 40,
    md: 48,
};
// Both sm and md use the same horizontal padding on web (h-10/h-12 px-4).
const H_PADDING = {
    sm: spacing_1.spacing.lg,
    md: spacing_1.spacing.lg,
};
const VARIANT_STYLE = {
    primary: {
        background: colors_1.colors.brand,
        text: '#FFFFFF',
    },
    secondary: {
        background: colors_1.colors.background,
        text: colors_1.colors.onBackground,
        borderColor: colors_1.colors.onBackground,
        borderWidth: 1,
    },
    destructive: {
        background: colors_1.colors.error,
        text: '#FFFFFF',
    },
};
const AnimatedPressable = react_native_1.Animated.createAnimatedComponent(react_native_1.Pressable);
function PUButton({ label, variant = 'primary', size = 'md', loading = false, fullWidth = false, disabled = false, onPress, style, testID, accessibilityLabel, }) {
    const scale = (0, react_1.useRef)(new react_native_1.Animated.Value(1)).current;
    const isDisabled = disabled || loading;
    const v = VARIANT_STYLE[variant];
    const onPressIn = () => {
        react_native_1.Animated.spring(scale, { toValue: 0.97, useNativeDriver: true, speed: 30, bounciness: 6 }).start();
    };
    const onPressOut = () => {
        react_native_1.Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 30, bounciness: 6 }).start();
    };
    return (react_1.default.createElement(AnimatedPressable, { onPress: isDisabled ? undefined : onPress, onPressIn: isDisabled ? undefined : onPressIn, 
        // Always spring back to scale 1 on release, even if `disabled`/
        // `loading` flipped true while the press was still active (e.g. set
        // inside `onPress` itself) - otherwise the scale can stick at 0.97.
        // Only the ACTION (onPress firing) is gated on disabled/loading.
        onPressOut: onPressOut, disabled: isDisabled, accessibilityRole: "button", accessibilityState: { disabled: isDisabled, busy: loading }, accessibilityLabel: accessibilityLabel ?? label, testID: testID, style: [
            styles.base,
            shadows_1.shadows.bottomA,
            {
                height: HEIGHT[size],
                paddingHorizontal: H_PADDING[size],
                backgroundColor: v.background,
                borderColor: v.borderColor ?? 'transparent',
                borderWidth: v.borderWidth ?? 0,
                opacity: isDisabled ? 0.5 : 1,
                transform: [{ scale }],
            },
            fullWidth && styles.fullWidth,
            style,
        ] },
        loading && (react_1.default.createElement(react_native_1.View, { style: react_native_1.StyleSheet.absoluteFillObject, pointerEvents: "none" },
            react_1.default.createElement(react_native_1.View, { style: styles.spinnerCenter },
                react_1.default.createElement(PUSpinner_1.PUSpinner, { size: 20, color: v.text })))),
        react_1.default.createElement(react_native_1.Text, { style: [styles.label, { color: v.text, opacity: loading ? 0 : 1 }], numberOfLines: 1 }, label)));
}
const styles = react_native_1.StyleSheet.create({
    base: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-start',
        borderRadius: radius_1.radius.full,
    },
    fullWidth: {
        alignSelf: 'stretch',
        width: '100%',
    },
    label: {
        fontFamily: typography_1.typography.fontFamily.bold,
        fontSize: typography_1.typography.sizes.body,
        textAlign: 'center',
    },
    spinnerCenter: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
