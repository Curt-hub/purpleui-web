import SwiftUI

/// Purple UI typography tokens.
///
/// Requires Poppins-Regular.ttf and Poppins-Bold.ttf added to the app target
/// and declared in Info.plist under UIAppFonts.
public struct PUTypography {
    // MARK: - Font sizes (pts, 1:1 with px)
    public static let sizeSupporting: CGFloat = 12
    public static let sizeBody:       CGFloat = 14
    public static let sizeSection:    CGFloat = 18
    public static let sizeTitle:      CGFloat = 22
    public static let sizeHero:       CGFloat = 40

    // MARK: - Convenience Font instances
    public static var supporting: Font { .custom("Poppins-Regular", size: sizeSupporting) }
    public static var body:       Font { .custom("Poppins-Regular", size: sizeBody) }
    public static var bodyBold:   Font { .custom("Poppins-Bold",    size: sizeBody) }
    public static var section:    Font { .custom("Poppins-Bold",    size: sizeSection) }
    public static var title:      Font { .custom("Poppins-Bold",    size: sizeTitle) }
    public static var hero:       Font { .custom("Poppins-Bold",    size: sizeHero) }
}
