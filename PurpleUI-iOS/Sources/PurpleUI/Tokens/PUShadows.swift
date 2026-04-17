import SwiftUI

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
}

public struct PUShadows {
    /// Subtle card lift — y=2, blur=4
    public static let bottomA = PUShadow(color: .black.opacity(0.03), radius: 2,  x: 0, y: 2)
    /// Elevated card — y=4, blur=12
    public static let bottomB = PUShadow(color: .black.opacity(0.06), radius: 6,  x: 0, y: 4)
    /// Floating button — y=6, blur=20
    public static let bottomC = PUShadow(color: .black.opacity(0.10), radius: 10, x: 0, y: 6)
    /// Modal / sheet — y=8, blur=32
    public static let bottomD = PUShadow(color: .black.opacity(0.14), radius: 16, x: 0, y: 8)
    /// Bottom sheet top shadow — y=-2, blur=8
    public static let topA    = PUShadow(color: .black.opacity(0.06), radius: 4,  x: 0, y: -2)
    /// Sticky nav top shadow
    public static let topB    = PUShadow(color: .black.opacity(0.03), radius: 1,  x: 0, y: -2)
}
