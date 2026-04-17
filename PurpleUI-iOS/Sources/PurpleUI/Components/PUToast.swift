import SwiftUI

// MARK: - Types

public enum PUToastStyle {
    case success, info, warning, error, offline
}

// MARK: - PUToast View

/// Notification pill — anchor to screen top with `.puToast(...)` modifier.
public struct PUToast: View {
    public let message: String
    public var style: PUToastStyle = .success
    public var showIcon: Bool = true

    public init(message: String, style: PUToastStyle = .success, showIcon: Bool = true) {
        self.message  = message
        self.style    = style
        self.showIcon = showIcon
    }

    // MARK: - Style config

    private var background: Color {
        switch style {
        case .success: return PUColors.success
        case .info:    return PUColors.info
        case .warning: return PUColors.warning
        case .error:   return PUColors.error
        case .offline: return Color(hex: "#3A3D4A")
        }
    }

    private var textColor: Color {
        style == .warning ? PUColors.onBackground : .white
    }

    private var iconFA: FA {
        switch style {
        case .success: return .check
        case .info:    return .infoCircle
        case .warning: return .exclamation
        case .error:   return .xmark
        case .offline: return .ban
        }
    }

    // MARK: - Body

    public var body: some View {
        HStack(spacing: 10) {
            if showIcon {
                FAIcon(iconFA, size: 16, color: textColor)
                    .frame(width: 16, height: 16)
            }
            Text(message)
                .font(PUTypography.body)
                .foregroundColor(textColor)
                .lineLimit(2)
                .frame(maxWidth: .infinity, alignment: .leading)
        }
        .padding(.horizontal, 16)
        .padding(.vertical, 10)
        .background(background)
        .clipShape(RoundedRectangle(cornerRadius: 12))
    }
}

// MARK: - View Modifier

extension View {
    /// Attaches a PUToast overlay anchored to the top of the view.
    /// Auto-dismisses after 2.5 s.
    public func puToast(
        isPresented: Binding<Bool>,
        message: String,
        style: PUToastStyle = .success,
        showIcon: Bool = true
    ) -> some View {
        self.overlay(alignment: .top) {
            if isPresented.wrappedValue {
                PUToast(message: message, style: style, showIcon: showIcon)
                    .padding(.horizontal, 16)
                    .padding(.top, 60)
                    .transition(
                        .asymmetric(
                            insertion: .move(edge: .top).combined(with: .opacity),
                            removal:   .move(edge: .top).combined(with: .opacity)
                        )
                    )
                    .task {
                        try? await Task.sleep(for: .milliseconds(2500))
                        withAnimation(.spring(response: 0.35, dampingFraction: 0.8)) {
                            isPresented.wrappedValue = false
                        }
                    }
            }
        }
        .animation(.spring(response: 0.35, dampingFraction: 0.8), value: isPresented.wrappedValue)
    }
}
