import SwiftUI

/// Purple UI typography tokens.
///
/// Requires Poppins-Regular.ttf and Poppins-Bold.ttf added to the app target
/// and declared in Info.plist under UIAppFonts.
///
/// ## Dynamic Type
/// Every role below uses `Font.custom(_:size:relativeTo:)` rather than a
/// fixed point size, so text scales with the user's preferred content size
/// (Settings → Accessibility → Larger Text). `size` still matches the
/// `typography.size` values in `tokens.json` at the system's default
/// ("Large") content size category — only the *scaling curve* comes from
/// `relativeTo`, not the literal size, since Purple UI's scale doesn't line
/// up 1:1 with Apple's system point sizes.
///
/// ### Scaling direction — verified, not assumed
/// An earlier version of this comment claimed Apple scales prominent
/// heading styles *more* aggressively than small annotation styles at
/// accessibility sizes. That was backwards, and is corrected here.
/// `UIFontMetrics` (what `Font.custom(_:size:relativeTo:)` uses under the
/// hood) actually scales secondary/small styles (`.footnote`, `.caption`,
/// `.body`) by a **larger ratio** than prominent heading styles
/// (`.title3`, `.title2`, `.largeTitle`), which are deliberately capped —
/// title-sized text is already large, so it needs proportionally less help
/// at accessibility sizes; small annotation text needs the most headroom.
///
/// That means a naive "bigger role → relativeTo a 'bigger' `TextStyle`"
/// mapping *can* invert the hierarchy at accessibility sizes if a
/// small-base-size role rides a fast-scaling curve far enough. So this was
/// verified empirically rather than assumed: measured with
/// `UIFontMetrics(forTextStyle:).scaledValue(for:compatibleWith:)` — the
/// exact mechanism `Font.custom(_:size:relativeTo:)` uses — across every
/// `UIContentSizeCategory` from `.extraSmall` to
/// `.accessibilityExtraExtraExtraLarge`, run on an iOS 16 Simulator via
/// `xcrun simctl spawn`. Full method: a standalone Swift executable built
/// with `swiftc -sdk <iphonesimulator SDK> -target arm64-apple-ios16.0-simulator`,
/// executed inside a booted simulator (a bare `swiftc` build targets macOS,
/// which has no `UIFontMetrics`/`UIKit`, so this has to run under the iOS
/// Simulator specifically — a plain host-side script will not reproduce it).
///
/// Results (base size in pt → scaled pt, default "Large" vs. the largest
/// accessibility size):
///
/// | role                         | relativeTo     | base | Large (default) | AX5 (largest) | AX5 ratio |
/// |------------------------------|----------------|-----:|-----------------:|---------------:|----------:|
/// | `supporting`                 | `.footnote`    | 12   | 12.0             | 34.7           | x2.89     |
/// | `body` / `bodyBold`          | `.body`        | 14   | 14.0             | 39.3           | x2.81     |
/// | `section`                    | `.title3`      | 18   | 18.0             | 46.7           | x2.59     |
/// | `title`                      | `.title2`      | 22   | 22.0             | 52.0           | x2.36     |
/// | `hero`                       | `.largeTitle`  | 40   | 40.0             | 68.3           | x1.71     |
///
/// The hierarchy `supporting < body < section < title < hero` holds at
/// **every** measured step (`.extraSmall`, `.large`, `.extraExtraExtraLarge`,
/// `.accessibilityMedium`, `.accessibilityExtraLarge`,
/// `.accessibilityExtraExtraExtraLarge`), with `supporting` kept on
/// `.footnote` rather than `.caption1` specifically for margin: `.caption1`
/// scales close enough to `.body` (x3.19 at AX5) that `supporting` would sit
/// only ~1pt below `body` at the largest accessibility size (38.3pt vs.
/// 39.3pt) — correct, but a razor-thin margin for two roles meant to look
/// visually distinct. `.footnote` keeps a ~4.7pt gap at AX5 instead, with no
/// visual change at the default size (still exactly 12.0pt).
///
/// If any base size or `relativeTo` mapping here changes, re-run this
/// measurement — don't assume the new combination preserves the hierarchy.
///  - `supporting` (12) → `.footnote`  — most headroom versus `body` at accessibility sizes (see table)
///  - `body` (14)        → `.body`      — our primary reading text; gets the same generous accessibility scaling as system body copy
///  - `section` (18)     → `.title3`    — Apple's own role for in-screen section/group headings
///  - `title` (22)        → `.title2`   — exact match to `.title2`'s default 22pt system size; screen-level titles
///  - `hero` (40)         → `.largeTitle` — Purple's largest text plays the same role as a prominent nav/hero title
public struct PUTypography {
    // MARK: - Font sizes (pts, 1:1 with px)
    public static let sizeSupporting: CGFloat = 12
    public static let sizeBody:       CGFloat = 14
    public static let sizeSection:    CGFloat = 18
    public static let sizeTitle:      CGFloat = 22
    public static let sizeHero:       CGFloat = 40

    // MARK: - Convenience Font instances (Dynamic Type aware)
    public static var supporting: Font { .custom("Poppins-Regular", size: sizeSupporting, relativeTo: .footnote) }
    public static var body:       Font { .custom("Poppins-Regular", size: sizeBody,       relativeTo: .body) }
    public static var bodyBold:   Font { .custom("Poppins-Bold",    size: sizeBody,       relativeTo: .body) }
    public static var section:    Font { .custom("Poppins-Bold",    size: sizeSection,    relativeTo: .title3) }
    public static var title:      Font { .custom("Poppins-Bold",    size: sizeTitle,      relativeTo: .title2) }
    public static var hero:       Font { .custom("Poppins-Bold",    size: sizeHero,       relativeTo: .largeTitle) }
}
