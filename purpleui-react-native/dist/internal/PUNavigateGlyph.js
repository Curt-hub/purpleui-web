"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PUNavigateGlyph = PUNavigateGlyph;
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
/**
 * "Navigate" glyph - a solid triangle built with the classic RN/CSS
 * transparent-border trick, rotated 45deg to point up-and-right,
 * approximating web's filled paper-plane/send-arrow icon. No-SVG placeholder
 * pending the Icons foundation's RN answer - PUFloatingButton's "navigate" icon.
 */
function PUNavigateGlyph({ size = 24, color = '#7458FD' }) {
    const triSize = size * 0.6;
    return (react_1.default.createElement(react_native_1.View, { style: { width: size, height: size, alignItems: 'center', justifyContent: 'center' } },
        react_1.default.createElement(react_native_1.View, { style: {
                width: 0,
                height: 0,
                borderLeftWidth: triSize / 2,
                borderRightWidth: triSize / 2,
                borderBottomWidth: triSize,
                borderLeftColor: 'transparent',
                borderRightColor: 'transparent',
                borderBottomColor: color,
                transform: [{ rotate: '45deg' }],
            } })));
}
