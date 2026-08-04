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
exports.PULoader = PULoader;
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const colors_1 = require("../tokens/colors");
// ---- Flip these two lines to switch which convention this follows. ----
const LIGHT_ARC = colors_1.colors.brand; // per spec - web/iOS/Android instead use colors.backgroundNavy here
const DARK_ARC = '#FFFFFF'; // per spec - web/iOS/Android instead use colors.brand here
// -------------------------------------------------------------------------
const ARC_COLOR = {
    light: LIGHT_ARC,
    dark: DARK_ARC,
};
const TRACK_COLOR = {
    light: colors_1.colors.loaderTrack,
    dark: 'rgba(255,255,255,0.2)',
};
const SIZE = 64;
const STROKE_WIDTH = 6;
function PULoader({ variant = 'light', accessibilityLabel = 'Loading', style, testID, }) {
    const spin = (0, react_1.useRef)(new react_native_1.Animated.Value(0)).current;
    (0, react_1.useEffect)(() => {
        const loop = react_native_1.Animated.loop(react_native_1.Animated.timing(spin, {
            toValue: 1,
            duration: 1000,
            easing: react_native_1.Easing.linear,
            useNativeDriver: true,
        }));
        loop.start();
        return () => loop.stop();
    }, [spin]);
    const rotate = spin.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });
    return (react_1.default.createElement(react_native_1.View, { testID: testID, accessibilityRole: "progressbar", accessibilityLabel: accessibilityLabel, style: [styles.container, style] },
        react_1.default.createElement(react_native_1.View, { style: [styles.ring, { borderColor: TRACK_COLOR[variant] }] }),
        react_1.default.createElement(react_native_1.Animated.View, { style: [
                styles.ring,
                styles.arc,
                { borderColor: ARC_COLOR[variant], transform: [{ rotate }] },
            ] })));
}
const styles = react_native_1.StyleSheet.create({
    container: {
        width: SIZE,
        height: SIZE,
    },
    ring: {
        position: 'absolute',
        width: SIZE,
        height: SIZE,
        borderRadius: SIZE / 2,
        borderWidth: STROKE_WIDTH,
    },
    arc: {
        borderTopColor: 'transparent',
        borderRightColor: 'transparent',
    },
});
