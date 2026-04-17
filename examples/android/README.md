# PurpleUI Android Example

Reference composition showing `PUBottomNav`, `PUSearchBar`, `PUBottomTray`, `PUFloatingButton`, and `PUToastHost` wired together in a real-looking Explore tab.

## Setup

1. **Add the PurpleUI module** to your project (see `PurpleUI-Android/README.md` for the full steps).

2. **Add required fonts** to your app's `res/font/` directory:
   - `poppins_regular.ttf` + `poppins_bold.ttf` — [Google Fonts](https://fonts.google.com/specimen/Poppins)
   - `fa_solid.ttf` — [fontawesome.com/download](https://fontawesome.com/download)

3. **Copy the example files** into your app module's source set:
   - `RootScreen.kt` — top-level composable with `Scaffold` + `PUBottomNav`
   - `ExploreScreen.kt` — Explore tab composition

4. In your `MainActivity`, set `setContent { RootScreen() }`.

5. Update the `package` declaration at the top of each file to match your app's package name.

## What's demonstrated

| File | Components |
|------|-----------|
| `RootScreen.kt` | `PUBottomNav` routing four tabs via `Scaffold` |
| `ExploreScreen.kt` | `PUSearchBar` • `PUFloatingButton` • `PUBottomTray` • simulated map pins • `PUToastHost` |
