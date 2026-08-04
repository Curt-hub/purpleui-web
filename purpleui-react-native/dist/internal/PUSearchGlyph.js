"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PUSearchGlyph = PUSearchGlyph;
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
/**
 * Magnifying-glass glyph built from two Views (a bordered ring + a rotated
 * handle bar) - same no-SVG, no-icon-library approach as PUChevronLeft.
 * Placeholder for PUSearchBar's search icon until the Icons foundation ships
 * an RN answer (FontAwesome on web/iOS/Android).
 */
function PUSearchGlyph({ size = 20, color = '#AAACB0' }) {
    const ringSize = Math.round(size * 0.62);
    const strokeWidth = Math.max(1.5, size / 10);
    const handleLength = Math.round(size * 0.4);
    return (react_1.default.createElement(react_native_1.View, { style: { width: size, height: size } },
        react_1.default.createElement(react_native_1.View, { style: {
                position: 'absolute',
                top: 0,
                left: 0,
                width: ringSize,
                height: ringSize,
                borderRadius: ringSize / 2,
                borderWidth: strokeWidth,
                borderColor: color,
            } }),
        react_1.default.createElement(react_native_1.View, { style: {
                position: 'absolute',
                left: ringSize * 0.72,
                top: ringSize * 0.72,
                width: handleLength,
                height: strokeWidth,
                borderRadius: strokeWidth / 2,
                backgroundColor: color,
                transform: [{ rotate: '45deg' }],
            } })));
}
