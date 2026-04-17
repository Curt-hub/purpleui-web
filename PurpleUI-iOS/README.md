# PurpleUI — iOS Swift Package

SwiftUI component library for the Purple design system.

---

## Requirements

- iOS 16+
- Swift 5.9+
- Xcode 15+

---

## Setup

### 1. Add the package

In Xcode: **File → Add Package Dependencies** → paste the repo URL, select **PurpleUI-iOS** as the package root.

Or add to your `Package.swift`:
```swift
dependencies: [
    .package(path: "../PurpleUI-iOS")  // local path when in monorepo
]
```

### 2. Add font files

PurpleUI uses **Poppins** for typography and **FontAwesome 5 Free** for icons. Both must be added to your app target manually (SPM cannot bundle third-party fonts).

**Poppins:**
1. Download from [fonts.google.com/specimen/Poppins](https://fonts.google.com/specimen/Poppins)
2. Add `Poppins-Regular.ttf` and `Poppins-Bold.ttf` to your app target
3. Add to `Info.plist` under `UIAppFonts`:
   ```xml
   <key>UIAppFonts</key>
   <array>
     <string>Poppins-Regular.ttf</string>
     <string>Poppins-Bold.ttf</string>
   </array>
   ```

**FontAwesome 5 Free:**
1. Download from [fontawesome.com/download](https://fontawesome.com/download) → Free for Desktop
2. Add `Font Awesome 5 Free-Solid-900.otf` and `Font Awesome 5 Free-Regular-400.otf` to your app target
3. Add to `Info.plist`:
   ```xml
   <string>Font Awesome 5 Free-Solid-900.otf</string>
   <string>Font Awesome 5 Free-Regular-400.otf</string>
   ```

### 3. Import and use

```swift
import PurpleUI

struct ContentView: View {
    var body: some View {
        PUButton("Get Started", variant: .primary) { }
    }
}
```

---

## Components

| Component | Description |
|-----------|-------------|
| `PUButton` | Pill button — primary, secondary, secondary-dark, destructive |
| `PUIconButton` | Circular icon button — light/dark, optional text pill |
| `PUFloatingButton` | Map floating button — icon or pill variant |
| `PULoader` | Spinning activity indicator — light/dark |
| `PUToast` + `.puToast(...)` | Ephemeral notification pill — 5 variants |
| `PUBottomTray` | Draggable snap tray anchored to screen bottom |
| `PUAlertModal` | Confirmation dialog — info, warning, destructive |
| `PUSearchBar` | Map search input — light/dark |
| `PUBottomNav` | 4-tab navigation bar |
| `PUMapPin` | Map pin — teardrop or dot, selectable |

## Tokens

```swift
PUColors.brand          // #7458FD
PUColors.background     // #FFFFFF  (dark: #011638)
PUSpacing.md            // 12pt
PURadius.full           // 9999pt (pill)
PUTypography.body       // Poppins Regular 14pt
```

See `Sources/PurpleUI/Tokens/` for all values.
