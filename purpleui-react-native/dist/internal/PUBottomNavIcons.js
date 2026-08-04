"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PUExploreGlyph = PUExploreGlyph;
exports.PUWalletGlyph = PUWalletGlyph;
exports.PUActivityGlyph = PUActivityGlyph;
exports.PUProfileGlyph = PUProfileGlyph;
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
/**
 * PUBottomNav's four tab glyphs (explore/wallet/activity/profile), built
 * from Views only - same no-SVG, no-icon-library approach as PUChevronLeft.
 *
 * iOS/Android render these as FontAwesome (FA.mapMarker / FA.wallet /
 * FA.receipt / FA.user); web swaps between a FA Regular/Solid SVG pair per
 * selection state. RN has neither a bundled icon font nor an SVG dependency
 * today, so each tab gets a single dependency-free geometric placeholder
 * instead - swap these for the Icons foundation's RN answer once it ships.
 */
function PUExploreGlyph({ size = 24, color = '#000000' }) {
    const headSize = size * 0.72;
    const strokeWidth = Math.max(1.5, size / 10);
    return (react_1.default.createElement(react_native_1.View, { style: { width: size, height: size, alignItems: 'center' } },
        react_1.default.createElement(react_native_1.View, { style: {
                width: headSize,
                height: headSize,
                borderRadius: headSize / 2,
                borderWidth: strokeWidth,
                borderColor: color,
            } }),
        react_1.default.createElement(react_native_1.View, { style: {
                position: 'absolute',
                top: headSize * 0.55,
                width: 0,
                height: 0,
                borderLeftWidth: headSize * 0.28,
                borderRightWidth: headSize * 0.28,
                borderTopWidth: headSize * 0.4,
                borderLeftColor: 'transparent',
                borderRightColor: 'transparent',
                borderTopColor: color,
            } })));
}
function PUWalletGlyph({ size = 24, color = '#000000' }) {
    const width = size;
    const height = size * 0.72;
    const clasp = size * 0.22;
    const strokeWidth = Math.max(1.5, size / 10);
    return (react_1.default.createElement(react_native_1.View, { style: { width, height: size, justifyContent: 'center' } },
        react_1.default.createElement(react_native_1.View, { style: {
                width,
                height,
                borderRadius: height * 0.22,
                borderWidth: strokeWidth,
                borderColor: color,
            } }),
        react_1.default.createElement(react_native_1.View, { style: {
                position: 'absolute',
                right: width * 0.08,
                top: (size - clasp) / 2,
                width: clasp,
                height: clasp,
                borderRadius: clasp / 2,
                backgroundColor: color,
            } })));
}
function PUActivityGlyph({ size = 24, color = '#000000' }) {
    const width = size * 0.78;
    const strokeWidth = Math.max(1.5, size / 10);
    const lineHeight = Math.max(1.5, size / 12);
    const padding = size * 0.14;
    return (react_1.default.createElement(react_native_1.View, { style: {
            width,
            height: size,
            borderRadius: size * 0.12,
            borderWidth: strokeWidth,
            borderColor: color,
            padding,
            justifyContent: 'space-between',
        } },
        react_1.default.createElement(react_native_1.View, { style: { height: lineHeight, borderRadius: lineHeight / 2, backgroundColor: color } }),
        react_1.default.createElement(react_native_1.View, { style: { height: lineHeight, borderRadius: lineHeight / 2, backgroundColor: color } }),
        react_1.default.createElement(react_native_1.View, { style: { height: lineHeight, borderRadius: lineHeight / 2, backgroundColor: color, width: '60%' } })));
}
function PUProfileGlyph({ size = 24, color = '#000000' }) {
    const headSize = size * 0.42;
    const bodyWidth = size * 0.82;
    const bodyHeight = size * 0.42;
    return (react_1.default.createElement(react_native_1.View, { style: { width: size, height: size, alignItems: 'center', overflow: 'hidden' } },
        react_1.default.createElement(react_native_1.View, { style: {
                width: headSize,
                height: headSize,
                borderRadius: headSize / 2,
                backgroundColor: color,
                marginBottom: size * 0.08,
            } }),
        react_1.default.createElement(react_native_1.View, { style: {
                width: bodyWidth,
                height: bodyHeight,
                borderTopLeftRadius: bodyWidth / 2,
                borderTopRightRadius: bodyWidth / 2,
                backgroundColor: color,
            } })));
}
