import SwiftUI

// MARK: - Shared button style for press tracking

struct PUPressedButtonStyle: ButtonStyle {
    @Binding var isPressed: Bool

    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .onChange(of: configuration.isPressed) { pressed in  // iOS 16 / macOS 13 compatible
                isPressed = pressed
            }
    }
}

// MARK: - Bottom safe-area inset reader
//
// `PUBottomNav` and `PUBottomTray` are both designed to sit inside a
// `ZStack(alignment: .bottom)` whose container applies
// `.ignoresSafeArea(edges: .bottom)` (see each component's doc comment) so
// they can paint edge-to-edge behind the home indicator. That means the
// normal safe-area layout signal is gone by the time it reaches these
// components — so instead of approximating the home-indicator clearance
// with a fixed point value (which is wrong on any device it wasn't tuned
// against), each one measures its own actual on-screen bottom safe-area
// inset with a zero-sized `background(GeometryReader { ... })` +
// `PreferenceKey`. This is the standard SwiftUI-safe way to read a view's
// geometry without influencing its own layout/sizing (unlike wrapping the
// whole view in a top-level `GeometryReader`, which would make it greedily
// fill all offered space and break intrinsic sizing).
struct PUBottomSafeAreaKey: PreferenceKey {
    static var defaultValue: CGFloat = 0
    static func reduce(value: inout CGFloat, nextValue: () -> CGFloat) {
        // `max` rather than last-write-wins: each component only listens to
        // preference values from its own subtree, so this isn't a live bug
        // today, but the safe-area inset should be identical everywhere it's
        // measured — `max` is the more defensive default for a key that's
        // meant to converge on one true value rather than depend on sibling
        // evaluation order.
        value = max(value, nextValue())
    }
}
