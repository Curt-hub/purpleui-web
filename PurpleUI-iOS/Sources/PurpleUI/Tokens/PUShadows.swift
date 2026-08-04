import SwiftUI

// ----------------------------------------------------------------
// SHADOW TOKENS
//
// `tokens.json` (`shadow.*`) and `specs/foundation-shadows.json` ship these
// as CSS box-shadow strings: `offsetX offsetY blurRadius spreadRadius color`.
// SwiftUI's `.shadow(color:radius:x:y:)` has no direct box-shadow equivalent
// and no spread parameter, so each token below is converted from its web
// source value the same way `purpleui-react-native/src/tokens/shadows.ts`
// does, so all three platforms agree:
//
//   x (offset)   = CSS offsetX, unchanged
//   y (offset)   = CSS offsetY, unchanged
//   radius       = CSS blurRadius / 2  (CSS blur is a diameter-ish spread;
//                  SwiftUI's `radius` maps roughly 1:2 against it — this is
//                  the same halving RN's `shadowRadius: blurRadius / 2` uses)
//   color/opacity = taken straight from the rgba() alpha component
//   spread        = dropped (SwiftUI has no spread parameter — RN drops it
//                  too, since `shadowRadius`/`elevation` have no spread
//                  concept either)
//
// See each entry below for the original CSS box-shadow string it was
// converted from.
// ----------------------------------------------------------------

/// Named shadow tokens matching the Purple UI shadow scale.
///
/// Usage:
/// ```swift
/// myView
///     .shadow(color: PUShadows.bottomA.color, radius: PUShadows.bottomA.radius,
///             x: PUShadows.bottomA.x, y: PUShadows.bottomA.y)
/// ```
public struct PUShadow {
    public let color: Color
    public let radius: CGFloat
    public let x: CGFloat
    public let y: CGFloat

    // Pre-existing gap, fixed while in this file for another review item:
    // `public` stored properties alone only get an `internal` synthesized
    // memberwise initialiser, so consumers outside this module couldn't
    // construct their own `PUShadow` (e.g. for a one-off shadow that isn't
    // one of the named tokens below). Explicit `public init` added.
    public init(color: Color, radius: CGFloat, x: CGFloat, y: CGFloat) {
        self.color  = color
        self.radius = radius
        self.x      = x
        self.y      = y
    }
}

public struct PUShadows {
    /// Subtle card lift, button default — '0px 2px 2px 0px rgba(0,0,0,0.03)'
    public static let bottomA = PUShadow(color: .black.opacity(0.03), radius: 1,   x: 0, y: 2)
    /// Light card — '0px 2px 2px 0px rgba(0,0,0,0.06)'
    public static let bottomB = PUShadow(color: .black.opacity(0.06), radius: 1,   x: 0, y: 2)
    /// Floating elements, light — '0px 2px 10px 0px rgba(0,0,0,0.05)'
    public static let bottomC = PUShadow(color: .black.opacity(0.05), radius: 5,   x: 0, y: 2)
    /// Floating buttons, modals, heavy — '0px 2px 15px 0px rgba(0,0,0,0.10)'
    public static let bottomD = PUShadow(color: .black.opacity(0.10), radius: 7.5, x: 0, y: 2)

    /// Bottom sheet top shadow — '0px -2px 2px 0px rgba(0,0,0,0.03)'
    public static let topA = PUShadow(color: .black.opacity(0.03), radius: 1,   x: 0, y: -2)
    /// Sticky nav top shadow — '0px -2px 2px 0px rgba(0,0,0,0.06)'
    public static let topB = PUShadow(color: .black.opacity(0.06), radius: 1,   x: 0, y: -2)
    /// Bottom tray top edge — '0px -2px 2px 0px rgba(0,0,0,0.10)'
    public static let topC = PUShadow(color: .black.opacity(0.10), radius: 1,   x: 0, y: -2)
    /// Heavier top shadow — '0px -2px 15px 0px rgba(0,0,0,0.10)'
    public static let topD = PUShadow(color: .black.opacity(0.10), radius: 7.5, x: 0, y: -2)

    /// Side navigation drawer — '4px 0px 15px 0px rgba(0,0,0,0.20)'
    public static let sideNav = PUShadow(color: .black.opacity(0.20), radius: 7.5, x: 4, y: 0)

    /// Selected map tile — '0px 10px 15px -3px rgba(0,0,0,0.10)' (spread dropped)
    public static let tilesActive = PUShadow(color: .black.opacity(0.10), radius: 7.5, x: 0, y: 10)
    /// Hovered map tile, brand-tinted — '0px 10px 15px -3px rgba(116,88,253,0.40)'
    /// (spread dropped; rgba(116,88,253) === PUColors.brand)
    public static let tilesHover = PUShadow(color: PUColors.brand.opacity(0.40), radius: 7.5, x: 0, y: 10)
}
