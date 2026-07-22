"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PUChevronLeft = PUChevronLeft;
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
/**
 * A "<" chevron built from a single bordered View rotated 45deg - the
 * classic CSS-corner-arrow trick, translated to RN. No font, no SVG, no
 * icon library - just a View. This is PUIconButton's default glyph
 * (it defaults to a back arrow, same as web/iOS/Android), so the component
 * is genuinely usable out of the box without forcing a dependency choice
 * for anything the design system's Icons foundation hasn't shipped for RN yet.
 */
function PUChevronLeft({ size = 12, color = '#000000' }) {
    const strokeWidth = Math.max(1.5, size / 6);
    return (react_1.default.createElement(react_native_1.View, { style: {
            width: size,
            height: size,
            borderTopWidth: strokeWidth,
            borderLeftWidth: strokeWidth,
            borderColor: color,
            transform: [{ rotate: '-45deg' }],
        } }));
}
