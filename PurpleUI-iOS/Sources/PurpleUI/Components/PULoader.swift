import SwiftUI

// MARK: - Types

public enum PULoaderVariant {
    /// Use on white/light backgrounds — navy arc.
    case light
    /// Use on navy/dark backgrounds — brand purple arc.
    case dark
}

// MARK: - PULoader

/// Spinning activity indicator. 64×64pt.
public struct PULoader: View {
    public var variant: PULoaderVariant = .light

    public init(variant: PULoaderVariant = .light) {
        self.variant = variant
    }

    private var arcColor: Color {
        variant == .light ? PUColors.backgroundNavy : PUColors.brand
    }

    public var body: some View {
        SpinningArc(color: arcColor)
    }
}

// MARK: - SpinningArc

private struct SpinningArc: View {
    let color: Color
    @State private var rotation: Double = 0

    var body: some View {
        ZStack {
            Circle()
                .stroke(PUColors.loaderTrack, lineWidth: 6)
                .frame(width: 64, height: 64)

            Circle()
                .trim(from: 0, to: 0.75)
                .stroke(color, style: StrokeStyle(lineWidth: 6, lineCap: .round))
                .frame(width: 64, height: 64)
                .rotationEffect(.degrees(rotation - 90))
        }
        .onAppear {
            withAnimation(.linear(duration: 1).repeatForever(autoreverses: false)) {
                rotation = 360
            }
        }
    }
}
