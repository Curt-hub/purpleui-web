import SwiftUI

// MARK: - Types

public enum PUButtonVariant {
    case primary, secondary, secondaryDark, destructive
}

public enum PUButtonSize {
    case sm, md, lg, compact
}

public enum PUButtonIconPosition {
    case before, after
}

// MARK: - PUButton

/// Branded pill button. All variants use Poppins Bold 14pt and bottomA shadow.
public struct PUButton: View {
    public let label: String
    public var variant: PUButtonVariant = .primary
    public var size: PUButtonSize = .md
    public var icon: FA? = nil
    public var iconPosition: PUButtonIconPosition = .after
    public var loading: Bool = false
    public var fullWidth: Bool = false
    public var disabled: Bool = false
    public let action: () -> Void

    @State private var isPressed = false

    public init(
        _ label: String,
        variant: PUButtonVariant = .primary,
        size: PUButtonSize = .md,
        icon: FA? = nil,
        iconPosition: PUButtonIconPosition = .after,
        loading: Bool = false,
        fullWidth: Bool = false,
        disabled: Bool = false,
        action: @escaping () -> Void
    ) {
        self.label      = label
        self.variant    = variant
        self.size       = size
        self.icon       = icon
        self.iconPosition = iconPosition
        self.loading    = loading
        self.fullWidth  = fullWidth
        self.disabled   = disabled
        self.action     = action
    }

    // MARK: - Layout

    private var height: CGFloat {
        switch size {
        case .sm, .compact: return 40
        case .md:           return 48
        case .lg:           return 56
        }
    }

    private var horizontalPadding: CGFloat {
        switch size {
        case .sm, .compact: return 16
        case .md:           return 16
        case .lg:           return 24
        }
    }

    // MARK: - Colours

    private var background: Color {
        switch variant {
        case .primary:       return PUColors.brand
        case .secondary:     return PUColors.background
        case .secondaryDark: return PUColors.backgroundNavy
        case .destructive:   return PUColors.error
        }
    }

    private var labelColor: Color {
        switch variant {
        case .primary, .destructive, .secondaryDark: return .white
        case .secondary: return PUColors.onBackground
        }
    }

    private var borderColor: Color? {
        switch variant {
        case .secondary:     return PUColors.onBackground
        case .secondaryDark: return .white.opacity(0.8)
        default:             return nil
        }
    }

    private var isDisabled: Bool { disabled || loading }

    // MARK: - Body

    public var body: some View {
        Button(action: action) {
            ZStack {
                // Hidden label keeps layout stable while loading
                HStack(spacing: 6) {
                    if iconPosition == .before, let icon = icon {
                        FAIcon(icon, size: 14, color: labelColor)
                    }
                    Text(label)
                        .font(PUTypography.bodyBold)
                        .foregroundColor(labelColor)
                    if iconPosition == .after, let icon = icon {
                        FAIcon(icon, size: 14, color: labelColor)
                    }
                }
                .opacity(loading ? 0 : 1)

                if loading {
                    ProgressView()
                        .progressViewStyle(.circular)
                        .tint(labelColor)
                        .scaleEffect(0.8)
                }
            }
            .frame(maxWidth: fullWidth ? .infinity : nil)
            .frame(height: height)
            .padding(.horizontal, horizontalPadding)
            .background(background.opacity(isDisabled ? 0.5 : 1))
            .clipShape(Capsule())
            .overlay {
                if let bc = borderColor {
                    Capsule().strokeBorder(bc.opacity(isDisabled ? 0.4 : 1), lineWidth: 1.5)
                }
            }
            .shadow(color: .black.opacity(0.03), radius: 1, x: 0, y: 2)
            .scaleEffect(isPressed ? 0.97 : 1.0)
            .animation(.spring(response: 0.2, dampingFraction: 0.6), value: isPressed)
        }
        .disabled(isDisabled)
        .buttonStyle(PUPressedButtonStyle(isPressed: $isPressed))
    }
}
