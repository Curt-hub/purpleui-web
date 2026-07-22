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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.theme = void 0;
__exportStar(require("./colors"), exports);
__exportStar(require("./spacing"), exports);
__exportStar(require("./radius"), exports);
__exportStar(require("./typography"), exports);
__exportStar(require("./shadows"), exports);
const colors_1 = require("./colors");
const spacing_1 = require("./spacing");
const radius_1 = require("./radius");
const typography_1 = require("./typography");
const shadows_1 = require("./shadows");
/** Single-import theme object - colours, spacing, radii, typography, shadows. */
exports.theme = {
    colors: colors_1.colors,
    spacing: spacing_1.spacing,
    radius: radius_1.radius,
    typography: typography_1.typography,
    shadows: shadows_1.shadows,
};
