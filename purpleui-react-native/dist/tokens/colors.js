"use strict";
// ----------------------------------------------------------------
// TIER 1 - PALETTE
// Raw color definitions, mirrored 1:1 from src/lib/tokens.ts.
// Not exported. Components must only reference semantic tokens below.
// ----------------------------------------------------------------
Object.defineProperty(exports, "__esModule", { value: true });
exports.colors = void 0;
const palette = {
    purple: '#7458FD',
    navy: '#011638',
    cream: '#F5F1ED',
    black: '#000000',
    offBlack: '#595959',
    greyA: '#AAACB0',
    greyB: '#BABCBF',
    greyC: '#CDCED0',
    greyD: '#DDDDDF',
    greyE: '#EFF0F0',
    greyF: '#F7F7F8',
    white: '#FFFFFF',
    green: '#16C172',
    red: '#F03A47',
    blue: '#045DEC',
    yellow: '#E9D502',
};
// ----------------------------------------------------------------
// TIER 2 - SEMANTIC COLOR TOKENS
// Role-based names, identical values to the web token source of truth
// (src/lib/tokens.ts). Dark-mode mappings are documented inline -
// this package only ships the light values for the first slice;
// swap to the commented value when the RN app wires up dark mode.
// ----------------------------------------------------------------
exports.colors = {
    // Brand
    brand: palette.purple, // dark: palette.purple (unchanged)
    brandSubtle: '#eceaff', // dark: '#2a1f6b'
    // Backgrounds (light-to-dark mappings in comments)
    background: palette.white, // dark: palette.navy
    backgroundElevated: palette.greyF, // dark: '#0a2048'
    backgroundSunken: '#F9F9FC', // dark: '#09193d'
    backgroundNavy: palette.navy, // dark: palette.navy   (invariant - always navy)
    backgroundAlt: palette.cream, // dark: palette.cream  (invariant - always cream)
    // Text & icon colours
    onBackground: palette.black, // dark: palette.white
    onBackgroundSecondary: palette.offBlack, // dark: 'rgba(255,255,255,0.70)'
    onBackgroundTertiary: palette.greyA, // dark: 'rgba(255,255,255,0.35)'
    // Borders & dividers
    outline: palette.greyC, // dark: 'rgba(255,255,255,0.15)'
    outlineSubtle: palette.greyE, // dark: 'rgba(255,255,255,0.06)'
    // Misc component-specific
    loaderTrack: palette.greyD, // invariant
    // Status - action colours (invariant between light/dark)
    success: palette.green,
    successSubtle: '#E8F5E9', // dark: '#0d3320'
    successStrong: '#4CAF50',
    error: palette.red,
    errorSubtle: 'rgba(240,58,71,0.12)',
    warning: palette.yellow,
    warningSubtle: '#fefbe6', // dark: '#3d3400'
    info: palette.blue,
    infoSubtle: 'rgba(4,93,236,0.12)',
    // Vendor / partner brand colours (Activity feed - do not use elsewhere)
    vendorBrown: '#6B2737',
    vendorForest: '#2D5A27',
    vendorRed: '#E4002B',
    vendorAmber: '#F5A623',
};
