export * from './colors';
export * from './spacing';
export * from './radius';
export * from './typography';
export * from './shadows';
export * from './passThemes';
/** Single-import theme object - colours, spacing, radii, typography, shadows. */
export declare const theme: {
    readonly colors: {
        readonly brand: "#7458FD";
        readonly brandSubtle: "#eceaff";
        readonly background: "#FFFFFF";
        readonly backgroundElevated: "#F7F7F8";
        readonly backgroundSunken: "#F9F9FC";
        readonly backgroundNavy: "#011638";
        readonly backgroundAlt: "#F5F1ED";
        readonly onBackground: "#000000";
        readonly onBackgroundSecondary: "#595959";
        readonly onBackgroundTertiary: "#AAACB0";
        readonly outline: "#CDCED0";
        readonly outlineSubtle: "#EFF0F0";
        readonly loaderTrack: "#DDDDDF";
        readonly success: "#16C172";
        readonly successSubtle: "#E8F5E9";
        readonly successStrong: "#4CAF50";
        readonly error: "#F03A47";
        readonly errorSubtle: "rgba(240,58,71,0.12)";
        readonly warning: "#E9D502";
        readonly warningSubtle: "#fefbe6";
        readonly info: "#045DEC";
        readonly infoSubtle: "rgba(4,93,236,0.12)";
        readonly vendorBrown: "#6B2737";
        readonly vendorForest: "#2D5A27";
        readonly vendorRed: "#E4002B";
        readonly vendorAmber: "#F5A623";
    };
    readonly spacing: {
        readonly xs: 4;
        readonly sm: 8;
        readonly md: 12;
        readonly lg: 16;
        readonly xl: 20;
        readonly '2xl': 24;
        readonly '3xl': 32;
        readonly '4xl': 40;
        readonly '5xl': 48;
    };
    readonly radius: {
        readonly sm: 6;
        readonly md: 12;
        readonly lg: 16;
        readonly xl: 24;
        readonly full: 9999;
    };
    readonly typography: {
        readonly fontFamily: {
            readonly regular: "Poppins-Regular";
            readonly bold: "Poppins-Bold";
        };
        readonly sizes: {
            readonly supporting: 12;
            readonly body: 14;
            readonly section: 18;
            readonly title: 22;
            readonly hero: 40;
        };
        readonly weights: {
            readonly regular: "400";
            readonly bold: "700";
        };
    };
    readonly shadows: {
        readonly bottomA: import("./shadows").PUShadowStyle;
        readonly bottomB: import("./shadows").PUShadowStyle;
        readonly bottomC: import("./shadows").PUShadowStyle;
        readonly bottomD: import("./shadows").PUShadowStyle;
        readonly topA: import("./shadows").PUShadowStyle;
        readonly topB: import("./shadows").PUShadowStyle;
        readonly topC: import("./shadows").PUShadowStyle;
        readonly topD: import("./shadows").PUShadowStyle;
        readonly sideNav: import("./shadows").PUShadowStyle;
        readonly tilesActive: import("./shadows").PUShadowStyle;
        readonly tilesHover: import("./shadows").PUShadowStyle;
    };
    readonly passThemes: {
        readonly purple: {
            readonly gradientFrom: "#7458FD";
            readonly gradientTo: "#9B7FFE";
            readonly on: "#FFFFFF";
        };
        readonly nhs: {
            readonly gradientFrom: "#005EB8";
            readonly gradientTo: "#003087";
            readonly on: "#FFFFFF";
        };
        readonly university: {
            readonly gradientFrom: "#011638";
            readonly gradientTo: "#1A3A5C";
            readonly on: "#FFFFFF";
        };
        readonly cafe: {
            readonly gradientFrom: "#0F9B63";
            readonly gradientTo: "#16C172";
            readonly on: "#FFFFFF";
        };
        readonly guest: {
            readonly gradientFrom: "#4A2545";
            readonly gradientTo: "#7C3F6E";
            readonly on: "#FFFFFF";
        };
    };
};
export type PUTheme = typeof theme;
