import SwiftUI

// MARK: - Types

public enum PUAlertModalVariant {
    case info, warning, destructive
}

// MARK: - PUAlertModal

/// Centered confirmation dialog with blurred backdrop.
/// Present modally or as an overlay from a `ZStack`.
///
/// ```swift
/// PUAlertModal(
///     isPresented: $showModal,
///     title: "You haven't added all Wi-Fi passes",
///     message: "If you leave now, any remaining passes won't be added.",
///     confirmLabel: "Leave",
///     cancelLabel: "Continue adding passes",
///     variant: .destructive,
///     onConfirm: { dismiss() }
/// )
/// ```
public struct PUAlertModal: View {
    @Binding public var isPresented: Bool
    public let title: String
    public let message: String
    public var confirmLabel: String = "Confirm"
    public var cancelLabel: String  = "Cancel"
    public var variant: PUAlertModalVariant = .info
    public var dark: Bool = false
    public let onConfirm: () -> Void

    public init(
        isPresented: Binding<Bool>,
        title: String,
        message: String,
        confirmLabel: String = "Confirm",
        cancelLabel: String  = "Cancel",
        variant: PUAlertModalVariant = .info,
        dark: Bool = false,
        onConfirm: @escaping () -> Void
    ) {
        self._isPresented  = isPresented
        self.title         = title
        self.message       = message
        self.confirmLabel  = confirmLabel
        self.cancelLabel   = cancelLabel
        self.variant       = variant
        self.dark          = dark
        self.onConfirm     = onConfirm
    }

    // MARK: - Colours

    private var confirmBackground: Color {
        switch variant {
        case .info:        return PUColors.brand
        case .warning:     return PUColors.warning
        case .destructive: return PUColors.error
        }
    }

    private var confirmForeground: Color {
        variant == .warning ? PUColors.onBackground : .white
    }

    private var cardBackground: Color { dark ? Color(hex: "#0a2048") : PUColors.background }
    private var cardBorder: Color     { dark ? Color.white.opacity(0.1) : PUColors.outlineSubtle }
    private var titleColor: Color     { dark ? .white : PUColors.onBackground }
    private var messageColor: Color   { dark ? Color.white.opacity(0.7) : PUColors.onBackground }
    private var cancelBorder: Color   { dark ? Color.white.opacity(0.2) : PUColors.onBackground }
    private var cancelLabel_color: Color { dark ? Color.white.opacity(0.8) : PUColors.onBackground }

    // MARK: - Body

    public var body: some View {
        ZStack {
            // Backdrop
            Color.black.opacity(dark ? 0.5 : 0.2)
                .ignoresSafeArea()
                .blur(radius: 5)
                .onTapGesture { withAnimation { isPresented = false } }

            // Card
            VStack(spacing: 24) {
                VStack(alignment: .leading, spacing: 8) {
                    Text(title)
                        .font(PUTypography.section)
                        .foregroundColor(titleColor)
                        .lineLimit(nil)
                        .fixedSize(horizontal: false, vertical: true)

                    Text(message)
                        .font(PUTypography.body)
                        .foregroundColor(messageColor)
                        .lineLimit(nil)
                        .fixedSize(horizontal: false, vertical: true)
                }
                .frame(maxWidth: .infinity, alignment: .leading)

                VStack(spacing: 12) {
                    // Confirm button
                    Button(action: { onConfirm(); isPresented = false }) {
                        Text(confirmLabel)
                            .font(PUTypography.bodyBold)
                            .foregroundColor(confirmForeground)
                            .frame(maxWidth: .infinity)
                            .frame(height: 48)
                            .background(confirmBackground)
                            .clipShape(Capsule())
                    }

                    // Cancel button
                    Button(action: { isPresented = false }) {
                        Text(cancelLabel)
                            .font(PUTypography.bodyBold)
                            .foregroundColor(cancelLabel_color)
                            .frame(maxWidth: .infinity)
                            .frame(height: 48)
                            .clipShape(Capsule())
                            .overlay(Capsule().strokeBorder(cancelBorder, lineWidth: 1.5))
                    }
                }
            }
            .padding(30)
            .background(cardBackground)
            .clipShape(RoundedRectangle(cornerRadius: PURadius.md))
            .overlay(RoundedRectangle(cornerRadius: PURadius.md).strokeBorder(cardBorder, lineWidth: 1))
            .shadow(color: .black.opacity(0.1), radius: 10, x: 0, y: 10)
            .padding(.horizontal, 20)
            .transition(
                .asymmetric(
                    insertion: .scale(scale: 0.92).combined(with: .opacity).combined(with: .offset(y: 12)),
                    removal:   .scale(scale: 0.92).combined(with: .opacity)
                )
            )
        }
        .animation(.spring(response: 0.35, dampingFraction: 0.78), value: isPresented)
    }
}
