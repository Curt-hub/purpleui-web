import SwiftUI

// MARK: - Types

public enum PUIconButtonVariant {
    case light, dark
}

// MARK: - PUIconButton

/// Circular navigation button for back/dismiss actions.
/// Pass `text` to render as a pill with icon + label.
public struct PUIconButton: View {
    public var icon: FA = .arrowLeft
    public var variant: PUIconButtonVariant = .light
    public var text: String? = nil
    public var accessibilityLabel: String? = nil
    public var disabled: Bool = false
    public let action: () -> Void

    @State private var isPressed = false

    public init(
        icon: FA = .arrowLeft,
        variant: PUIconButtonVariant = .light,
        text: String? = nil,
        accessibilityLabel: String? = nil,
        disabled: Bool = false,
        action: @escaping () -> Void
    ) {
        self.icon = icon
        self.variant = variant
        self.text = text
        self.accessibilityLabel = accessibilityLabel
        self.disabled = disabled
        self.action = action
    }

    // MARK: - Colours

    private var background: Color {
        switch variant {
        case .light: return PUColors.backgroundElevated
        case .dark:  return Color.white.opacity(0.12)
        }
    }

    private var foreground: Color {
        switch variant {
        case .light: return PUColors.onBackgroundSecondary
        case .dark:  return .white
        }
    }

    private var borderColor: Color {
        switch variant {
        case .light: return PUColors.onBackgroundSecondary.opacity(0.3)
        case .dark:  return Color.white.opacity(0.25)
        }
    }

    // MARK: - Body

    public var body: some View {
        Button(action: action) {
            Group {
                if let text = text {
                    HStack(spacing: 6) {
                        FAIcon(icon, size: 14, color: foreground)
                        Text(text)
                            .font(PUTypography.bodyBold)
                            .foregroundColor(foreground)
                    }
                    .padding(.horizontal, 16)
                    .padding(.vertical, 10)
                } else {
                    FAIcon(icon, size: 16, color: foreground)
                        .frame(width: 38, height: 38)
                }
            }
            .background(background.opacity(disabled ? 0.5 : 1))
            .clipShape(Capsule())
            .overlay(Capsule().strokeBorder(borderColor, lineWidth: 1.5))
            .scaleEffect(isPressed ? 0.92 : 1.0)
            .animation(.spring(response: 0.2, dampingFraction: 0.6), value: isPressed)
        }
        .disabled(disabled)
        .buttonStyle(PUPressedButtonStyle(isPressed: $isPressed))
        .accessibilityLabel(accessibilityLabel ?? (text ?? "Back"))
    }
}
