import SwiftUI

/// FontAwesome 5 Free icon identifiers.
///
/// Requires "Font Awesome 5 Free-Solid-900.otf" and
/// "Font Awesome 5 Free-Regular-400.otf" added to the app target
/// and declared in Info.plist under UIAppFonts.
public enum FA: String, CaseIterable {
    // Navigation
    case arrowLeft  = "\u{f060}"
    case arrowRight = "\u{f061}"
    case xmark      = "\u{f00d}"
    case plus       = "\u{f067}"
    case minus      = "\u{f068}"
    case bars       = "\u{f0c9}"

    // Communication / status
    case wifi       = "\u{f1eb}"
    case signal     = "\u{f012}"

    // Location / map
    case mapMarker      = "\u{f3c5}"
    case locationArrow  = "\u{f124}"
    case paperPlane     = "\u{f1d8}"
    case compass        = "\u{f14e}"

    // Commerce / profile
    case wallet   = "\u{f555}"
    case receipt  = "\u{f543}"
    case user     = "\u{f007}"
    case userCircle = "\u{f2be}"

    // Misc
    case search     = "\u{f002}"
    case sliders    = "\u{f1de}"
    case check       = "\u{f00c}"
    case exclamation = "\u{f12a}"
    case infoCircle = "\u{f05a}"
    case ban        = "\u{f05e}"
    case star       = "\u{f005}"
}

// MARK: - FAIcon View

/// Renders a FontAwesome icon using the Solid-900 font face.
public struct FAIcon: View {
    public let icon: FA
    public var size: CGFloat = 16
    public var color: Color = .primary
    public var weight: FAWeight = .solid

    public init(_ icon: FA, size: CGFloat = 16, color: Color = .primary, weight: FAWeight = .solid) {
        self.icon = icon
        self.size = size
        self.color = color
        self.weight = weight
    }

    public var body: some View {
        Text(icon.rawValue)
            .font(.custom(weight.fontName, size: size))
            .foregroundColor(color)
            .frame(width: size, height: size, alignment: .center)
    }
}

public enum FAWeight {
    case solid, regular

    var fontName: String {
        switch self {
        case .solid:   return "FontAwesome5Free-Solid"
        case .regular: return "FontAwesome5Free-Regular"
        }
    }
}
