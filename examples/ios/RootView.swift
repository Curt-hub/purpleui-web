import SwiftUI
import PurpleUI

/// Root view — wires `PUBottomNav` to four tab screens.
///
/// Mirrors the Purple app navigation structure: Explore, Wallet, Activity, Profile.
struct RootView: View {
    @State private var activeTab: PUBottomNavTab = .explore

    var body: some View {
        ZStack(alignment: .bottom) {
            // Tab content
            Group {
                switch activeTab {
                case .explore:  ExploreScreen()
                case .wallet:   PlaceholderScreen(title: "Wallet",   dark: false)
                case .activity: PlaceholderScreen(title: "Activity", dark: false)
                case .profile:  PlaceholderScreen(title: "Profile",  dark: false)
                }
            }
            .frame(maxWidth: .infinity, maxHeight: .infinity)

            // Nav bar
            PUBottomNav(activeTab: $activeTab)
        }
        .ignoresSafeArea(edges: .bottom)
    }
}

// MARK: - Placeholder

private struct PlaceholderScreen: View {
    let title: String
    var dark: Bool = false

    var body: some View {
        ZStack {
            (dark ? PUColors.backgroundNavy : PUColors.background).ignoresSafeArea()
            Text(title)
                .font(PUTypography.title)
                .foregroundColor(dark ? .white : PUColors.onBackground)
        }
    }
}
