import SwiftUI

// MARK: - Types

public enum PUMapPinVariant {
    case teardrop, dot
}

// MARK: - PUMapPin

/// Interactive map pin — teardrop or dot, selectable with spring animation.
/// Manage `selected` externally — this is a controlled component.
///
/// ```swift
/// PUMapPin(variant: .teardrop, selected: selectedPin == 0)
///     .onTapGesture { selectedPin = selectedPin == 0 ? nil : 0 }
/// ```
public struct PUMapPin: View {
    public var variant: PUMapPinVariant = .teardrop
    public var selected: Bool = false
    public var dark: Bool = false
    public var color: Color = Color(hex: "#045DEC")

    public init(
        variant: PUMapPinVariant = .teardrop,
        selected: Bool = false,
        dark: Bool = false,
        color: Color = Color(hex: "#045DEC")
    ) {
        self.variant  = variant
        self.selected = selected
        self.dark     = dark
        self.color    = color
    }

    private var fillColor: Color { selected ? PUColors.brand : color }

    // MARK: - Body

    public var body: some View {
        Group {
            if variant == .teardrop {
                TeardropPin(fill: fillColor, dark: dark)
            } else {
                DotPin(fill: fillColor, dark: dark)
            }
        }
        .offset(y: selected ? (variant == .teardrop ? -6 : -4) : 0)
        .scaleEffect(selected ? (variant == .teardrop ? 1.12 : 1.18) : 1.0)
        .animation(.spring(response: 0.25, dampingFraction: 0.55), value: selected)
    }
}

// MARK: - Teardrop

private struct TeardropPin: View {
    let fill: Color
    let dark: Bool

    var body: some View {
        ZStack(alignment: .topLeading) {
            // Halo
            TeardropShape()
                .fill(fill.opacity(0.3))
                .frame(width: 46, height: 55.5)

            // Body
            TeardropShape()
                .fill(fill)
                .frame(width: 40, height: 48.3)
                .overlay(TeardropShape().strokeBorder(.white, lineWidth: 2))
                .offset(x: 3, y: 3)

            // Icon
            FAIcon(.wifi, size: 17, color: .white)
                .frame(width: 40, height: 48.3)
                .offset(x: 3, y: 3)

            // Spot shadow
            Ellipse()
                .fill(dark ? Color.white.opacity(0.18) : Color.black.opacity(0.1))
                .frame(width: 7.85, height: 2.94)
                .offset(x: 19, y: 59)
        }
        .frame(width: 46, height: 62)
    }
}

private struct TeardropShape: InsettableShape {
    var insetAmount: CGFloat = 0

    func path(in rect: CGRect) -> Path {
        let w = rect.width - insetAmount * 2
        let h = rect.height - insetAmount * 2
        let cx = rect.midX
        let ox = insetAmount
        let oy = insetAmount
        // Approximate teardrop: rounded top, pointed bottom
        var p = Path()
        let r = w / 2
        p.addArc(center: CGPoint(x: cx, y: oy + r), radius: r, startAngle: .degrees(180), endAngle: .degrees(0), clockwise: false)
        p.addQuadCurve(to: CGPoint(x: cx, y: oy + h), control: CGPoint(x: ox + w, y: oy + h * 0.7))
        p.addQuadCurve(to: CGPoint(x: cx - r, y: oy + r * 1.5), control: CGPoint(x: ox, y: oy + h * 0.7))
        p.closeSubpath()
        return p
    }

    func inset(by amount: CGFloat) -> TeardropShape {
        TeardropShape(insetAmount: insetAmount + amount)
    }
}

// MARK: - Dot

private struct DotPin: View {
    let fill: Color
    let dark: Bool

    var body: some View {
        ZStack {
            // Glow ring
            Circle()
                .fill(fill.opacity(0.3))
                .frame(width: 30, height: 30)

            // Body
            Circle()
                .fill(fill)
                .frame(width: 26, height: 26)
                .overlay(Circle().strokeBorder(.white, lineWidth: 2))

            // Icon
            FAIcon(.wifi, size: 13, color: .white)
        }
        .frame(width: 30, height: 30)
    }
}
