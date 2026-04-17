import SwiftUI

/// Purple UI semantic colour tokens.
///
/// Always reference these in components — never use raw hex values.
/// Dark-mode mappings are noted in comments; swap values when `colorScheme == .dark`.
public struct PUColors {

    // MARK: - Brand
    public static let brand       = Color(hex: "#7458FD")  // invariant light/dark
    public static let brandSubtle = Color(hex: "#eceaff")  // dark: #2a1f6b

    // MARK: - Backgrounds
    public static let background         = Color(hex: "#FFFFFF")  // dark: #011638
    public static let backgroundElevated = Color(hex: "#F7F7F8")  // dark: #0a2048
    public static let backgroundSunken   = Color(hex: "#F9F9FC")  // dark: #09193d
    public static let backgroundNavy     = Color(hex: "#011638")  // invariant
    public static let backgroundAlt      = Color(hex: "#F5F1ED")  // invariant (cream)

    // MARK: - Text / Icons
    public static let onBackground          = Color(hex: "#000000")  // dark: #FFFFFF
    public static let onBackgroundSecondary = Color(hex: "#595959")  // dark: rgba(255,255,255,0.70)
    public static let onBackgroundTertiary  = Color(hex: "#AAACB0")  // dark: rgba(255,255,255,0.35)

    // MARK: - Borders
    public static let outline       = Color(hex: "#CDCED0")  // dark: rgba(255,255,255,0.15)
    public static let outlineSubtle = Color(hex: "#EFF0F0")  // dark: rgba(255,255,255,0.06)

    // MARK: - Misc
    public static let loaderTrack = Color(hex: "#DDDDDF")  // invariant

    // MARK: - Status
    public static let success       = Color(hex: "#16C172")
    public static let successSubtle = Color(hex: "#E8F5E9")  // dark: #0d3320
    public static let successStrong = Color(hex: "#4CAF50")
    public static let error         = Color(hex: "#F03A47")
    public static let errorSubtle   = Color(hex: "#F03A47").opacity(0.12)
    public static let warning       = Color(hex: "#E9D502")
    public static let warningSubtle = Color(hex: "#fefbe6")  // dark: #3d3400
    public static let info          = Color(hex: "#045DEC")
    public static let infoSubtle    = Color(hex: "#045DEC").opacity(0.12)

    // MARK: - Vendor (activity feed only)
    public static let vendorBrown  = Color(hex: "#6B2737")
    public static let vendorForest = Color(hex: "#2D5A27")
    public static let vendorRed    = Color(hex: "#E4002B")
    public static let vendorAmber  = Color(hex: "#F5A623")
}

// MARK: - Hex colour initialiser
public extension Color {
    init(hex: String) {
        let hex = hex.trimmingCharacters(in: CharacterSet.alphanumerics.inverted)
        var int: UInt64 = 0
        Scanner(string: hex).scanHexInt64(&int)
        let a, r, g, b: UInt64
        switch hex.count {
        case 3:  (a, r, g, b) = (255, (int >> 8) * 17, (int >> 4 & 0xF) * 17, (int & 0xF) * 17)
        case 6:  (a, r, g, b) = (255, int >> 16, int >> 8 & 0xFF, int & 0xFF)
        case 8:  (a, r, g, b) = (int >> 24, int >> 16 & 0xFF, int >> 8 & 0xFF, int & 0xFF)
        default: (a, r, g, b) = (255, 0, 0, 0)
        }
        self.init(
            .sRGB,
            red:     Double(r) / 255,
            green:   Double(g) / 255,
            blue:    Double(b) / 255,
            opacity: Double(a) / 255
        )
    }
}
