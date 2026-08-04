"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PUPlusGlyph = PUPlusGlyph;
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
/**
 * Plus/cross glyph built from two Views (a vertical and a horizontal bar) -
 * PUFloatingButton's "plus" icon, no-SVG placeholder pending the Icons
 * foundation's RN answer.
 */
function PUPlusGlyph({ size = 24, color = '#7458FD' }) {
    const strokeWidth = Math.max(2, size / 12);
    return (react_1.default.createElement(react_native_1.View, { style: { width: size, height: size } },
        react_1.default.createElement(react_native_1.View, { style: {
                position: 'absolute',
                left: (size - strokeWidth) / 2,
                top: 0,
                width: strokeWidth,
                height: size,
                borderRadius: strokeWidth / 2,
                backgroundColor: color,
            } }),
        react_1.default.createElement(react_native_1.View, { style: {
                position: 'absolute',
                top: (size - strokeWidth) / 2,
                left: 0,
                height: strokeWidth,
                width: size,
                borderRadius: strokeWidth / 2,
                backgroundColor: color,
            } })));
}
