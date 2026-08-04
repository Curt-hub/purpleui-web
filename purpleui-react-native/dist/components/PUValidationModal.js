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
exports.PUValidationModal = PUValidationModal;
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const colors_1 = require("../tokens/colors");
const radius_1 = require("../tokens/radius");
const spacing_1 = require("../tokens/spacing");
const typography_1 = require("../tokens/typography");
const CONFIRM_BACKGROUND = {
    info: colors_1.colors.brand,
    warning: colors_1.colors.warning,
    destructive: colors_1.colors.error,
};
const CONFIRM_TEXT = {
    info: '#FFFFFF',
    warning: colors_1.colors.onBackground,
    destructive: '#FFFFFF',
};
const CARD_MAX_WIDTH = 393;
const BUTTON_HEIGHT = 48;
const SCALE_FROM = 0.85; // per spec - web/iOS both instead animate from 0.92
function PUValidationModal({ visible, title, message, confirmLabel = 'Confirm', cancelLabel = 'Cancel', variant = 'info', onConfirm, onDismiss, dark = false, style, testID, }) {
    const [mounted, setMounted] = (0, react_1.useState)(visible);
    const progress = (0, react_1.useRef)(new react_native_1.Animated.Value(visible ? 1 : 0)).current;
    (0, react_1.useEffect)(() => {
        if (visible) {
            setMounted(true);
            react_native_1.Animated.spring(progress, {
                toValue: 1,
                useNativeDriver: true,
                speed: 16,
                bounciness: 6,
            }).start();
        }
        else if (mounted) {
            react_native_1.Animated.timing(progress, {
                toValue: 0,
                duration: 150,
                useNativeDriver: true,
            }).start(({ finished }) => {
                if (finished)
                    setMounted(false);
            });
        }
    }, [visible]); // eslint-disable-line react-hooks/exhaustive-deps
    if (!mounted)
        return null;
    const scale = progress.interpolate({ inputRange: [0, 1], outputRange: [SCALE_FROM, 1] });
    const cardBackground = dark ? '#0a2048' : colors_1.colors.background; // backgroundElevated dark mapping (see colors.ts)
    // 0.1 is specs/PUValidationModal.json's own documented card.border.dark
    // value - NOT colors.ts's outlineSubtle dark-mapping comment (the token
    // used in the light branch below), which says 0.06. The two sources
    // disagree; this follows the component-specific spec value.
    const cardBorder = dark ? 'rgba(255,255,255,0.1)' : colors_1.colors.outlineSubtle;
    const titleColor = dark ? '#FFFFFF' : colors_1.colors.onBackground;
    const messageColor = dark ? 'rgba(255,255,255,0.7)' : colors_1.colors.onBackground; // onBackgroundSecondary dark mapping
    const cancelBorderColor = dark ? 'rgba(255,255,255,0.2)' : colors_1.colors.onBackground;
    const cancelTextColor = dark ? 'rgba(255,255,255,0.8)' : colors_1.colors.onBackground;
    const backdropColor = dark ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.2)';
    return (react_1.default.createElement(react_native_1.Modal, { transparent: true, visible: mounted, animationType: "none", onRequestClose: onDismiss, statusBarTranslucent: true, testID: testID },
        react_1.default.createElement(react_native_1.Animated.View, { style: [styles.backdrop, { opacity: progress, backgroundColor: backdropColor }] },
            react_1.default.createElement(react_native_1.Pressable, { style: react_native_1.StyleSheet.absoluteFill, onPress: onDismiss, accessibilityRole: "button", accessibilityLabel: "Dismiss" })),
        react_1.default.createElement(react_native_1.View, { style: styles.centerWrap, pointerEvents: "box-none" },
            react_1.default.createElement(react_native_1.Animated.View, { accessibilityViewIsModal: true, accessibilityRole: "alert", style: [
                    styles.card,
                    {
                        backgroundColor: cardBackground,
                        borderColor: cardBorder,
                        opacity: progress,
                        transform: [{ scale }],
                    },
                    style,
                ] },
                react_1.default.createElement(react_native_1.View, { style: styles.content },
                    react_1.default.createElement(react_native_1.Text, { style: [styles.title, { color: titleColor }] }, title),
                    react_1.default.createElement(react_native_1.Text, { style: [styles.message, { color: messageColor }] }, message)),
                react_1.default.createElement(react_native_1.View, { style: styles.buttons },
                    react_1.default.createElement(react_native_1.Pressable, { onPress: onConfirm, accessibilityRole: "button", style: [styles.button, { backgroundColor: CONFIRM_BACKGROUND[variant] }] },
                        react_1.default.createElement(react_native_1.Text, { style: [styles.buttonLabel, { color: CONFIRM_TEXT[variant] }], numberOfLines: 1 }, confirmLabel)),
                    react_1.default.createElement(react_native_1.Pressable, { onPress: onDismiss, accessibilityRole: "button", style: [
                            styles.button,
                            styles.cancelButton,
                            { borderColor: cancelBorderColor },
                        ] },
                        react_1.default.createElement(react_native_1.Text, { style: [styles.buttonLabel, { color: cancelTextColor }], numberOfLines: 1 }, cancelLabel)))))));
}
const styles = react_native_1.StyleSheet.create({
    backdrop: {
        ...react_native_1.StyleSheet.absoluteFillObject,
    },
    centerWrap: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: spacing_1.spacing.xl,
    },
    card: {
        width: '100%',
        maxWidth: CARD_MAX_WIDTH,
        borderRadius: radius_1.radius.md,
        borderWidth: 1,
        paddingVertical: 30,
        paddingHorizontal: spacing_1.spacing.xl,
        gap: spacing_1.spacing['2xl'],
    },
    content: {
        gap: spacing_1.spacing.sm,
    },
    title: {
        fontFamily: typography_1.typography.fontFamily.bold,
        fontSize: typography_1.typography.sizes.section,
    },
    message: {
        fontFamily: typography_1.typography.fontFamily.regular,
        fontSize: typography_1.typography.sizes.body,
        lineHeight: typography_1.typography.sizes.body * 1.5,
    },
    buttons: {
        gap: spacing_1.spacing.md,
    },
    button: {
        height: BUTTON_HEIGHT,
        borderRadius: radius_1.radius.full,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cancelButton: {
        borderWidth: 1.5,
        backgroundColor: 'transparent',
    },
    buttonLabel: {
        fontFamily: typography_1.typography.fontFamily.bold,
        fontSize: typography_1.typography.sizes.body,
    },
});
