"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PUSearchBar = PUSearchBar;
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const colors_1 = require("../tokens/colors");
const radius_1 = require("../tokens/radius");
const shadows_1 = require("../tokens/shadows");
const typography_1 = require("../tokens/typography");
const PUSearchGlyph_1 = require("../internal/PUSearchGlyph");
const PUSlidersGlyph_1 = require("../internal/PUSlidersGlyph");
const HEIGHT = 48;
const FILTER_HIT_SLOP = 12; // 20px glyph + 2*12 hitSlop = 44pt effective target
function PUSearchBar({ value, onChange, placeholder = 'Search networks…', onFilterPress, dark = false, style, testID, }) {
    const background = dark ? colors_1.colors.backgroundNavy : colors_1.colors.background;
    // 0.1 is specs/PUSearchBar.json's own documented dark border value for
    // this component - NOT colors.ts's outline dark-mapping comment, which
    // says 0.15. The two sources disagree; this follows the component-specific
    // spec value (see the build report).
    const borderColor = dark ? 'rgba(255,255,255,0.1)' : undefined;
    const searchIconColor = dark ? 'rgba(255,255,255,0.4)' : colors_1.colors.onBackgroundTertiary;
    const textColor = dark ? '#FFFFFF' : colors_1.colors.onBackground;
    const placeholderColor = dark ? 'rgba(255,255,255,0.35)' : colors_1.colors.onBackgroundTertiary;
    return (react_1.default.createElement(react_native_1.View, { testID: testID, style: [
            styles.base,
            !dark && shadows_1.shadows.bottomD,
            {
                height: HEIGHT,
                backgroundColor: background,
                borderWidth: dark ? 1 : 0,
                borderColor: borderColor ?? 'transparent',
            },
            style,
        ] },
        react_1.default.createElement(PUSearchGlyph_1.PUSearchGlyph, { size: 20, color: searchIconColor }),
        react_1.default.createElement(react_native_1.TextInput, { value: value, onChangeText: onChange, placeholder: placeholder, placeholderTextColor: placeholderColor, accessibilityRole: "search", style: [styles.input, { color: textColor }] }),
        onFilterPress && (react_1.default.createElement(react_native_1.Pressable, { onPress: onFilterPress, accessibilityRole: "button", accessibilityLabel: "Filter", hitSlop: FILTER_HIT_SLOP, style: styles.filterButton },
            react_1.default.createElement(PUSlidersGlyph_1.PUSlidersGlyph, { size: 20, color: colors_1.colors.brand })))));
}
const styles = react_native_1.StyleSheet.create({
    base: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: radius_1.radius.full,
        paddingHorizontal: 12,
        gap: 12,
    },
    input: {
        flex: 1,
        fontFamily: typography_1.typography.fontFamily.regular,
        fontSize: typography_1.typography.sizes.body,
        padding: 0,
    },
    filterButton: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});
