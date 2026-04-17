import SwiftUI
import PurpleUI

/// Explore tab — search bar + bottom tray + map pins over a simulated map background.
///
/// This pattern matches the Purple app's main map flow:
/// - `PUSearchBar` at the top for location / query input
/// - `PUFloatingButton` for centering on current location
/// - `PUBottomTray` displaying nearby WiFi spots
/// - `PUMapPin` markers on the map canvas
struct ExploreScreen: View {
    @State private var searchQuery = ""
    @State private var selectedPin: Int? = nil
    @State private var showToast = false

    private let pins: [(x: CGFloat, y: CGFloat)] = [
        (0.25, 0.35), (0.55, 0.25), (0.70, 0.50), (0.40, 0.60)
    ]

    var body: some View {
        ZStack(alignment: .bottom) {
            // ── Simulated map background ──────────────────────────────────
            mapCanvas

            // ── Search bar ────────────────────────────────────────────────
            VStack {
                PUSearchBar(text: $searchQuery, placeholder: "Search WiFi spots…")
                    .padding(.horizontal, PUSpacing.lg)
                    .padding(.top, 60)
                Spacer()
            }

            // ── Floating nav button ───────────────────────────────────────
            VStack {
                Spacer()
                HStack {
                    Spacer()
                    PUFloatingButton(variant: .icon, icon: .navigate, dark: true) {
                        showToast = true
                    }
                    .padding(.trailing, PUSpacing.lg)
                    .padding(.bottom, 260)
                }
            }

            // ── Bottom tray ───────────────────────────────────────────────
            PUBottomTray(title: "34 WiFi nearby", dark: true, peekHeight: 200, expandHeight: 480) {
                ScrollView {
                    VStack(spacing: 0) {
                        ForEach(0..<8) { i in
                            trayRow(index: i)
                        }
                    }
                }
            }

            // ── Toast ─────────────────────────────────────────────────────
            if showToast {
                VStack {
                    PUToast(message: "Centred on your location", style: .info)
                        .padding(.horizontal, PUSpacing.lg)
                        .padding(.top, 120)
                    Spacer()
                }
                .transition(.move(edge: .top).combined(with: .opacity))
                .onAppear {
                    Task {
                        try? await Task.sleep(nanoseconds: 2_500_000_000)
                        withAnimation { showToast = false }
                    }
                }
            }
        }
        .ignoresSafeArea(edges: .bottom)
        .animation(.easeInOut(duration: 0.25), value: showToast)
    }

    // MARK: - Map canvas with pins

    private var mapCanvas: some View {
        GeometryReader { geo in
            ZStack {
                Color(hex: "#1a2744").ignoresSafeArea()

                // Decorative grid lines
                Path { p in
                    for i in 0..<10 {
                        let x = geo.size.width * CGFloat(i) / 10
                        p.move(to: CGPoint(x: x, y: 0))
                        p.addLine(to: CGPoint(x: x, y: geo.size.height))
                    }
                    for i in 0..<14 {
                        let y = geo.size.height * CGFloat(i) / 14
                        p.move(to: CGPoint(x: 0, y: y))
                        p.addLine(to: CGPoint(x: geo.size.width, y: y))
                    }
                }
                .stroke(Color.white.opacity(0.05), lineWidth: 1)

                // Map pins
                ForEach(pins.indices, id: \.self) { i in
                    PUMapPin(
                        variant: i == 0 ? .teardrop : .dot,
                        selected: selectedPin == i,
                        dark: true
                    )
                    .position(
                        x: geo.size.width  * pins[i].x,
                        y: geo.size.height * pins[i].y
                    )
                    .onTapGesture {
                        withAnimation { selectedPin = selectedPin == i ? nil : i }
                    }
                }
            }
        }
        .ignoresSafeArea()
    }

    // MARK: - Tray row

    private func trayRow(index: Int) -> some View {
        HStack(spacing: PUSpacing.md) {
            Circle()
                .fill(PUColors.brand.opacity(0.2))
                .frame(width: 40, height: 40)
                .overlay(
                    FAIcon(.wifi, size: 16, color: PUColors.brand)
                )

            VStack(alignment: .leading, spacing: 2) {
                Text("WiFi Spot \(index + 1)")
                    .font(PUTypography.bodyBold)
                    .foregroundColor(.white)
                Text("\(Int.random(in: 10...500))m away")
                    .font(PUTypography.supporting)
                    .foregroundColor(.white.opacity(0.5))
            }

            Spacer()

            Text("Free")
                .font(PUTypography.supporting)
                .foregroundColor(PUColors.brand)
        }
        .padding(.horizontal, PUSpacing.xl)
        .padding(.vertical, PUSpacing.md)
    }
}
