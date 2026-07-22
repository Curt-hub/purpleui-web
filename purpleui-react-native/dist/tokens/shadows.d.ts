export interface PUShadowStyle {
    shadowColor: string;
    shadowOffset: {
        width: number;
        height: number;
    };
    shadowOpacity: number;
    shadowRadius: number;
    /** Android has no directional shadow - elevation approximates it. */
    elevation: number;
}
export declare const shadows: {
    readonly bottomA: PUShadowStyle;
    readonly bottomB: PUShadowStyle;
    readonly bottomC: PUShadowStyle;
    readonly bottomD: PUShadowStyle;
    readonly topA: PUShadowStyle;
    readonly topB: PUShadowStyle;
    readonly topC: PUShadowStyle;
    readonly topD: PUShadowStyle;
    readonly sideNav: PUShadowStyle;
    readonly tilesActive: PUShadowStyle;
    readonly tilesHover: PUShadowStyle;
};
export type PUShadows = typeof shadows;
