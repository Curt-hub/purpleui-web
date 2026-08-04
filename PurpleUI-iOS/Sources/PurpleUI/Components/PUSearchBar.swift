import SwiftUI

/// Pill-shaped search input that floats above the map.
/// Controlled input — bind `text` with `$query`.
public struct PUSearchBar: View {
    @Binding public var text: String
    public var placeholder: String = "Search networks…"
    public var onFilterTap: (() -> Void)? = nil
    public var dark: Bool = false

    public init(
        text: Binding<String>,
        placeholder: String = "Search networks…",
        dark: Bool = false,
        onFilterTap: (() -> Void)? = nil
    ) {
        self._text        = text
        self.placeholder  = placeholder
        self.dark         = dark
        self.onFilterTap  = onFilterTap
    }

    // MARK: - Colours

    private var background: Color  { dark ? PUColors.backgroundElevatedNavy : PUColors.background }
    private var borderColor: Color { dark ? Color.white.opacity(0.1) : Color.clear }
    private var searchIconColor: Color { dark ? Color.white.opacity(0.4) : PUColors.onBackgroundTertiary }
    private var textColor: Color   { dark ? .white : PUColors.onBackground }
    private var placeholderColor: Color { PUColors.onBackgroundTertiary }

    // MARK: - Body

    public var body: some View {
        HStack(spacing: 12) {
            FAIcon(.search, size: 16, color: searchIconColor)

            ZStack(alignment: .leading) {
                if text.isEmpty {
                    Text(placeholder)
                        .font(PUTypography.body)
                        .foregroundColor(placeholderColor)
                }
                TextField("", text: $text)
                    .font(PUTypography.body)
                    .foregroundColor(textColor)
                    .tint(PUColors.brand)
            }

            if let onFilterTap {
                Button(action: onFilterTap) {
                    FAIcon(.sliders, size: 18, color: PUColors.brand)
                        .frame(width: 22, height: 22)
                        // Visual size stays 22×22; the frame below only
                        // enlarges the invisible tappable area to meet
                        // Apple HIG's 44×44pt minimum hit target.
                        .frame(width: 44, height: 44)
                        .contentShape(Rectangle())
                }
                .accessibilityLabel("Filter")
            }
        }
        .padding(.horizontal, 12)
        .frame(height: 48)
        .background(background)
        .clipShape(Capsule())
        .overlay(Capsule().strokeBorder(borderColor, lineWidth: 1))
        .shadow(
            color: dark ? .clear : .black.opacity(0.1),
            radius: 7.5, x: 0, y: 2
        )
    }
}
