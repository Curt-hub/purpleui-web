import SwiftUI

/// Persistent bottom tray that drags and snaps between peek and expanded states.
/// Place in a `ZStack(alignment: .bottom)` over your map or main content.
///
/// ```swift
/// ZStack(alignment: .bottom) {
///     MapView()
///     PUBottomTray(title: "34 WiFi nearby") {
///         ForEach(items) { PUListRow(...) }
///     }
/// }
/// .ignoresSafeArea(edges: .bottom)
/// ```
public struct PUBottomTray<Content: View>: View {
    public var title: String?
    public var dark: Bool = false
    public var peekHeight: CGFloat = 160
    public var expandHeight: CGFloat = 460
    public var defaultExpanded: Bool = false

    private let content: Content

    @State private var isExpanded: Bool
    @GestureState private var dragOffset: CGFloat = 0

    public init(
        title: String? = nil,
        dark: Bool = false,
        peekHeight: CGFloat = 160,
        expandHeight: CGFloat = 460,
        defaultExpanded: Bool = false,
        @ViewBuilder content: () -> Content
    ) {
        self.title           = title
        self.dark            = dark
        self.peekHeight      = peekHeight
        self.expandHeight    = expandHeight
        self.defaultExpanded = defaultExpanded
        self.content         = content()
        self._isExpanded     = State(initialValue: defaultExpanded)
    }

    // MARK: - Colours

    private var background: Color { dark ? Color(hex: "#0a2048") : PUColors.background }
    private var handleColor: Color { dark ? Color.white.opacity(0.15) : PUColors.loaderTrack }
    private var titleColor:  Color { dark ? .white : PUColors.onBackground }

    // MARK: - Layout

    private var targetHeight: CGFloat { isExpanded ? expandHeight : peekHeight }

    private var displayHeight: CGFloat {
        let dragged = targetHeight - dragOffset
        return min(expandHeight, max(peekHeight, dragged))
    }

    // MARK: - Body

    public var body: some View {
        VStack(spacing: 0) {
            // Drag handle
            RoundedRectangle(cornerRadius: 4)
                .fill(handleColor)
                .frame(width: 60, height: 5)
                .padding(.top, 15)
                .padding(.bottom, 10)

            // Title row
            if let title {
                HStack {
                    Text(title)
                        .font(PUTypography.section)
                        .foregroundColor(titleColor)
                    Spacer()
                }
                .padding(.horizontal, PUSpacing.xl)
                .padding(.bottom, PUSpacing.sm)
            }

            // Body content
            content
        }
        .frame(maxWidth: .infinity)
        .frame(height: displayHeight, alignment: .top)
        .background(background)
        .clipShape(UnevenRoundedRectangle(topLeadingRadius: PURadius.md, topTrailingRadius: PURadius.md))
        .shadow(color: .black.opacity(0.1), radius: 7.5, x: 0, y: -2)
        .gesture(
            DragGesture(minimumDistance: 8)
                .updating($dragOffset) { value, state, _ in
                    state = value.translation.height
                }
                .onEnded { value in
                    let velocity = value.predictedEndLocation.y - value.location.y
                    let mid      = (expandHeight - peekHeight) / 2
                    withAnimation(.spring(response: 0.4, dampingFraction: 0.85)) {
                        if value.translation.height < -mid || velocity < -200 {
                            isExpanded = true
                        } else if value.translation.height > mid || velocity > 200 {
                            isExpanded = false
                        }
                    }
                }
        )
    }
}

