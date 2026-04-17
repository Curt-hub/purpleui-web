import SwiftUI

// MARK: - Types

public enum PUBottomNavTab: CaseIterable {
    case explore, wallet, activity, profile

    var label: String {
        switch self {
        case .explore:  return "Explore"
        case .wallet:   return "Wallet"
        case .activity: return "Activity"
        case .profile:  return "Profile"
        }
    }

    var icon: FA {
        switch self {
        case .explore:  return .mapMarker
        case .wallet:   return .wallet
        case .activity: return .receipt
        case .profile:  return .user
        }
    }
}

// MARK: - PUBottomNav

/// Fixed 4-tab navigation bar. Place at the bottom of a `ZStack`.
///
/// ```swift
/// ZStack(alignment: .bottom) {
///     screenContent
///     PUBottomNav(activeTab: $activeTab)
/// }
/// .ignoresSafeArea(edges: .bottom)
/// ```
public struct PUBottomNav: View {
    @Binding public var activeTab: PUBottomNavTab
    public var dark: Bool = false

    public init(activeTab: Binding<PUBottomNavTab>, dark: Bool = false) {
        self._activeTab = activeTab
        self.dark       = dark
    }

    // MARK: - Colours

    private var background: Color { dark ? PUColors.backgroundNavy : PUColors.background }
    private var topBorder: Color  { dark ? Color.white.opacity(0.08) : PUColors.backgroundElevated.opacity(0.8) }

    private func iconColor(for tab: PUBottomNavTab) -> Color {
        guard tab == activeTab else {
            return dark ? Color.white.opacity(0.35) : PUColors.onBackgroundTertiary
        }
        return dark ? PUColors.brand : PUColors.onBackground
    }

    // MARK: - Body

    public var body: some View {
        HStack(spacing: 50) {
            ForEach(PUBottomNavTab.allCases, id: \.self) { tab in
                Button(action: { activeTab = tab }) {
                    VStack(spacing: 4) {
                        FAIcon(tab.icon, size: 24, color: iconColor(for: tab))
                            .frame(width: 24, height: 24)
                        Text(tab.label)
                            .font(PUTypography.supporting)
                            .foregroundColor(iconColor(for: tab))
                    }
                    .frame(minWidth: 44)
                    .contentShape(Rectangle())
                }
                .buttonStyle(.plain)
            }
        }
        .padding(.top, 12)
        .padding(.bottom, 20)
        .frame(maxWidth: .infinity)
        .background(background)
        .overlay(alignment: .top) {
            topBorder.frame(height: 1)
        }
        .shadow(color: dark ? .black.opacity(0.4) : .black.opacity(0.03), radius: 1, x: 0, y: -2)
    }
}
