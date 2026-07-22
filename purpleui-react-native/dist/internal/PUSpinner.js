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
exports.PUSpinner = PUSpinner;
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
/**
 * Minimal ring spinner built from RN primitives only - a bordered circle
 * with its top edge made transparent, rotated on a loop. Mirrors the web
 * PUButton spinner (`border-2 border-current border-t-transparent animate-spin`).
 */
function PUSpinner({ size = 20, color = '#FFFFFF', style }) {
    const spin = (0, react_1.useRef)(new react_native_1.Animated.Value(0)).current;
    (0, react_1.useEffect)(() => {
        const loop = react_native_1.Animated.loop(react_native_1.Animated.timing(spin, {
            toValue: 1,
            duration: 700,
            easing: react_native_1.Easing.linear,
            useNativeDriver: true,
        }));
        loop.start();
        return () => loop.stop();
    }, [spin]);
    const rotate = spin.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });
    return (react_1.default.createElement(react_native_1.Animated.View, { accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", style: [
            styles.base,
            {
                width: size,
                height: size,
                borderRadius: size / 2,
                borderColor: color,
                transform: [{ rotate }],
            },
            style,
        ] }));
}
const styles = react_native_1.StyleSheet.create({
    base: {
        borderWidth: 2,
        borderTopColor: 'transparent',
    },
});
