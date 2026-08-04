"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PUBottomNav = PUBottomNav;
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const colors_1 = require("../tokens/colors");
const typography_1 = require("../tokens/typography");
const PUBottomNavIcons_1 = require("../internal/PUBottomNavIcons");
const BAR_HEIGHT = 65;
const TABS = [
    { id: 'explore', label: 'Explore', Icon: PUBottomNavIcons_1.PUExploreGlyph },
    { id: 'wallet', label: 'Wallet', Icon: PUBottomNavIcons_1.PUWalletGlyph },
    { id: 'activity', label: 'Activity', Icon: PUBottomNavIcons_1.PUActivityGlyph },
    { id: 'profile', label: 'Profile', Icon: PUBottomNavIcons_1.PUProfileGlyph },
];
function PUBottomNav({ activeTab, onTabChange, dark = false, bottomInset = 0, style, testID, }) {
    const background = dark ? colors_1.colors.backgroundNavy : colors_1.colors.background;
    // 0.08 is specs/PUBottomNav.json's own documented dark border value for
    // this component - NOT colors.ts's outlineSubtle dark-mapping comment,
    // which says 0.06. The two sources disagree; this follows the
    // component-specific spec value (see the build report), same convention
    // PUIconButton already uses for its own `dark` variant literals.
    const borderColor = dark ? 'rgba(255,255,255,0.08)' : colors_1.colors.outlineSubtle;
    return (react_1.default.createElement(react_native_1.View, { testID: testID, accessibilityRole: "tabbar", style: [
            styles.base,
            {
                height: BAR_HEIGHT + bottomInset,
                paddingBottom: bottomInset,
                backgroundColor: background,
                borderTopColor: borderColor,
            },
            style,
        ] }, TABS.map(({ id, label, Icon }) => {
        const isActive = activeTab === id;
        // specs/PUBottomNav.json's `tokens.activeTab` documents a single
        // colors.brand value for the active icon/label with no light/dark
        // split. The web/iOS/Android reference implementations all disagree
        // with that (and agree with each other): they use colors.onBackground
        // (black) for active-on-light and colors.brand only for active-on-dark.
        // Per instructions, this component follows the SPEC's colors.brand-
        // always reading rather than silently matching web/iOS/Android - see
        // the build report for this flagged disagreement.
        const tintColor = isActive
            ? colors_1.colors.brand
            : dark
                ? 'rgba(255,255,255,0.35)' // onBackgroundTertiary dark mapping (see colors.ts)
                : colors_1.colors.onBackgroundTertiary;
        return (react_1.default.createElement(react_native_1.Pressable, { key: id, onPress: () => onTabChange?.(id), accessibilityRole: "tab", accessibilityState: { selected: isActive }, accessibilityLabel: label, hitSlop: 4, style: styles.tab },
            react_1.default.createElement(Icon, { size: 24, color: tintColor }),
            react_1.default.createElement(react_native_1.Text, { style: [styles.label, { color: tintColor }], numberOfLines: 1 }, label)));
    })));
}
const styles = react_native_1.StyleSheet.create({
    base: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        borderTopWidth: 1,
    },
    tab: {
        minWidth: 44,
        minHeight: 44,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
    },
    label: {
        fontFamily: typography_1.typography.fontFamily.regular,
        fontSize: typography_1.typography.sizes.supporting,
    },
});
