import SwiftUI

// MARK: - Types

public enum PUFloatingButtonVariant {
    case icon, pill
}

public enum PUFloatingButtonIcon {
    case navigate, plus
}

// MARK: - PUFloatingButton

/// Floating action button for map surfaces.
/// `.icon` = 56×56 circle. `.pill` = icon + label.
public struct PUFloatingButton: View {
    public let variant: PUFloatingButtonVariant
    public let icon: PUFloatingButtonIcon
    public var label: String? = nil
    public var dark: Bool = false
    public let action: () -> Void

    @State private var isPressed = false

    public init(
        variant: PUFloatingButtonVariant,
        icon: PUFloatingButtonIcon,
        label: String? = nil,
        dark: Bool = false,
        action: @escaping () -> Void
    ) {
        self.variant = variant
        self.icon    = icon
        self.label   = label
        self.dark    = dark
        self.action  = action
    }

    // MARK: - Colours

    private var background: Color {
        dark ? Color(hex: "#0a2048") : PUColors.background
    }

    private var foreground: Color {
        dark ? .white : PUColors.brand
    }

    private var borderColor: Color? {
        dark ? Color.white.opacity(0.15) : nil
    }

    // MARK: - Icon view

    @ViewBuilder
    private var iconView: some View {
        switch icon {
        case .navigate:
            FAIcon(.locationArrow, size: 22, color: foreground)
        case .plus:
            FAIcon(.plus, size: 22, color: foreground)
        }
    }

    // MARK: - Body

    public var body: some View {
        Button(action: action) {
            Group {
                if variant == .pill, let label {
                    HStack(spacing: 4) {
                        iconView
                        Text(label)
                            .font(PUTypography.bodyBold)
                            .foregroundColor(foreground)
                    }
                    .padding(.leading, 12)
                    .padding(.trailing, 16)
                    .frame(height: 56)
                } else {
                    iconView
                        .frame(width: 56, height: 56)
                }
            }
            .background(background)
            .clipShape(Capsule())
            .overlay {
                if let bc = borderColor {
                    Capsule().strokeBorder(bc, lineWidth: 1)
                }
            }
            .shadow(
                color: dark ? .black.opacity(0.5) : .black.opacity(0.1),
                radius: dark ? 12 : 7.5,
                x: 0, y: 2
            )
            .scaleEffect(isPressed ? (variant == .icon ? 0.92 : 0.95) : 1.0)
            .animation(.spring(response: 0.2, dampingFraction: 0.6), value: isPressed)
        }
        .buttonStyle(PUPressedButtonStyle(isPressed: $isPressed))
        .accessibilityLabel(label ?? (icon == .navigate ? "Navigate to my location" : "Add"))
    }
}
