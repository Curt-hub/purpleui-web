# PurpleUI iOS Example

Reference composition showing `PUBottomNav`, `PUSearchBar`, `PUBottomTray`, `PUMapPin`, `PUFloatingButton`, and `PUToast` wired together in a real-looking Explore tab.

## Setup

1. **Create an Xcode project** — SwiftUI App target, iOS 16+.

2. **Add the PurpleUI Swift Package**
   - File → Add Package Dependencies
   - Point to the repo root or `PurpleUI-iOS/` path (use a local path if working in the same repo)
   - Add the `PurpleUI` library to your app target

3. **Add fonts** to your app target (not the package):
   - `Poppins-Regular.otf` + `Poppins-Bold.otf` from [Google Fonts](https://fonts.google.com/specimen/Poppins)
   - `FontAwesome5Free-Solid-900.otf` from [fontawesome.com/download](https://fontawesome.com/download)
   - Add all three to **Info.plist** `UIAppFonts` array:
     ```xml
     <key>UIAppFonts</key>
     <array>
       <string>Poppins-Regular.otf</string>
       <string>Poppins-Bold.otf</string>
       <string>FontAwesome5Free-Solid-900.otf</string>
     </array>
     ```

4. **Add the example files** to your Xcode project:
   - `RootView.swift` — root `@main` entry or window scene content
   - `ExploreScreen.swift` — Explore tab composition

5. Set `RootView` as your window scene's `ContentView`.

## What's demonstrated

| File | Components |
|------|-----------|
| `RootView.swift` | `PUBottomNav` routing four tabs |
| `ExploreScreen.swift` | `PUSearchBar` • `PUFloatingButton` • `PUBottomTray` • `PUMapPin` (teardrop + dot) • `PUToast` |
