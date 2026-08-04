export declare const passThemes: {
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
export type PassThemeName = keyof typeof passThemes;
export type PUPassThemes = typeof passThemes;
