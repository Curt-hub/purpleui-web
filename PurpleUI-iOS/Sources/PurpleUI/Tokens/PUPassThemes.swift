import SwiftUI

// ----------------------------------------------------------------
// PASS THEME TOKENS
//
// Named gradient skins for WiFi pass cards (PU3DPassCard / PUWalletStack on
// web; groundwork for a future native pass-card component here).
//
// Transcribed from the `passThemes` group in `tokens.json` / `src/lib/tokens.ts`
// (previously web/RN/Android-only — this is the iOS equivalent). Same theme
// names, same hex values as the other platforms.
//
// Nothing in PurpleUI-iOS consumes this yet — this is groundwork so a future
// pass-card component can reference `PUPassThemes.<name>` instead of
// hardcoding gradient hex pairs per screen.
//
// Convention (matches src/lib/tokens.ts):
//   gradientFrom / gradientTo — 135° linear gradient stops
//   on                        — text/icon colour for content on the card
// ----------------------------------------------------------------

public struct PUPassTheme {
    public let gradientFrom: Color
    public let gradientTo: Color
    public let on: Color

    // `public` stored properties alone only get an `internal` synthesized
    // memberwise initialiser — an explicit `public init` is required for
    // consumers outside this module to construct their own custom-venue
    // theme (the whole point of exposing this type per the doc comment
    // above).
    public init(gradientFrom: Color, gradientTo: Color, on: Color) {
        self.gradientFrom = gradientFrom
        self.gradientTo   = gradientTo
        self.on           = on
    }
}

public struct PUPassThemes {
    /// Purple brand pass — default skin
    public static let purple = PUPassTheme(
        gradientFrom: PUColors.brand,        // #7458FD
        gradientTo:   Color(hex: "#9B7FFE"),
        on:           PUColors.background    // #FFFFFF
    )

    /// NHS-branded venue pass
    public static let nhs = PUPassTheme(
        gradientFrom: Color(hex: "#005EB8"), // NHS Blue
        gradientTo:   Color(hex: "#003087"), // NHS Dark Blue
        on:           PUColors.background    // #FFFFFF
    )

    /// University / institutional pass — reuses Purple's own navy
    public static let university = PUPassTheme(
        gradientFrom: PUColors.backgroundNavy, // #011638
        gradientTo:   Color(hex: "#1A3A5C"),
        on:           PUColors.background      // #FFFFFF
    )

    /// Cafe / hospitality pass — reuses the success green
    public static let cafe = PUPassTheme(
        gradientFrom: Color(hex: "#0F9B63"),
        gradientTo:   PUColors.success,      // #16C172
        on:           PUColors.background    // #FFFFFF
    )

    /// Neutral guest-network pass
    public static let guest = PUPassTheme(
        gradientFrom: Color(hex: "#4A2545"),
        gradientTo:   Color(hex: "#7C3F6E"),
        on:           PUColors.background    // #FFFFFF
    )

    /// All themes keyed by name, for enumeration (e.g. a theme picker) —
    /// mirrors the `all` map on `PurpleUI-Android`'s `PUPassThemes`.
    public static let all: [String: PUPassTheme] = [
        "purple":     purple,
        "nhs":        nhs,
        "university": university,
        "cafe":       cafe,
        "guest":      guest
    ]
}
