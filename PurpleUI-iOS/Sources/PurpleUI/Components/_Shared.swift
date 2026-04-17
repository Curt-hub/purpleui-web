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
