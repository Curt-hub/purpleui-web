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
exports.PUFloatingButton = PUFloatingButton;
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const colors_1 = require("../tokens/colors");
const radius_1 = require("../tokens/radius");
const shadows_1 = require("../tokens/shadows");
const typography_1 = require("../tokens/typography");
const PUNavigateGlyph_1 = require("../internal/PUNavigateGlyph");
const PUPlusGlyph_1 = require("../internal/PUPlusGlyph");
const SIZE = 56;
const DEFAULT_LABEL = {
    navigate: 'Navigate to my location',
    plus: 'Add',
};
const AnimatedPressable = react_native_1.Animated.createAnimatedComponent(react_native_1.Pressable);
function PUFloatingButton({ variant, icon, label, dark = false, onPress, style, testID, }) {
    const scale = (0, react_1.useRef)(new react_native_1.Animated.Value(1)).current;
    const background = dark ? 'rgba(255,255,255,0.12)' : colors_1.colors.background;
    const borderColor = dark ? 'rgba(255,255,255,0.15)' : undefined; // outline dark mapping (see colors.ts)
    const foreground = dark ? '#FFFFFF' : colors_1.colors.brand;
    const iconEl = icon === 'navigate' ? (react_1.default.createElement(PUNavigateGlyph_1.PUNavigateGlyph, { size: 22, color: foreground })) : (react_1.default.createElement(PUPlusGlyph_1.PUPlusGlyph, { size: 22, color: foreground }));
    const onPressIn = () => {
        react_native_1.Animated.spring(scale, {
            toValue: variant === 'icon' ? 0.92 : 0.95,
            useNativeDriver: true,
            speed: 30,
            bounciness: 6,
        }).start();
    };
    const onPressOut = () => {
        react_native_1.Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 30, bounciness: 6 }).start();
    };
    return (react_1.default.createElement(AnimatedPressable, { onPress: onPress, onPressIn: onPressIn, onPressOut: onPressOut, accessibilityRole: "button", accessibilityLabel: label ?? DEFAULT_LABEL[icon], testID: testID, style: [
            styles.base,
            shadows_1.shadows.bottomD,
            variant === 'icon' ? styles.icon : styles.pill,
            {
                backgroundColor: background,
                borderWidth: borderColor ? 1 : 0,
                borderColor: borderColor ?? 'transparent',
                transform: [{ scale }],
            },
            style,
        ] },
        iconEl,
        variant === 'pill' && label && (react_1.default.createElement(react_native_1.Text, { style: [styles.label, { color: foreground }], numberOfLines: 1 }, label))));
}
const styles = react_native_1.StyleSheet.create({
    base: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-start',
        borderRadius: radius_1.radius.full,
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
        fontFamily: typography_1.typography.fontFamily.bold,
        fontSize: typography_1.typography.sizes.body,
    },
});
