# PurpleUI — Android (Jetpack Compose)

Drop-in Compose library for the Purple design system. Targets **minSdk 26**, **Compose BOM 2024.05**.

---

## Add to your project

1. Copy the `purpleui/` folder into your project root.
2. In your root `settings.gradle.kts`, add:
   ```kotlin
   include(":purpleui")
   ```
3. In your app module's `build.gradle.kts`, add the dependency:
   ```kotlin
   implementation(project(":purpleui"))
   ```

---

## Required fonts

PurpleUI does not bundle fonts — you must add them to your **app module**.

### Poppins (Google Fonts)
Download from https://fonts.google.com/specimen/Poppins

Place in `app/src/main/res/font/`:
- `poppins_regular.ttf`
- `poppins_bold.ttf`

### FontAwesome 5 Free — Solid
Download the Free package from https://fontawesome.com/download  
Extract `otf/` or `ttf/` folder.

Place in `app/src/main/res/font/`:
- `fa_solid.ttf`  (FontAwesome5Free-Solid-900.otf, renamed)

> **Note:** Replace the placeholder XML files in `purpleui/src/main/res/font/` with the actual `.ttf` files by copying them to your app module's `res/font/` folder. The library references `R.font.*` which resolves from the consuming app's resources at build time.

---

## Usage

```kotlin
import ai.purple.purpleui.components.*
import ai.purple.purpleui.tokens.*
import ai.purple.purpleui.icons.*

// Button
PUButton("Get started") { /* action */ }
PUButton("Delete", variant = PUButtonVariant.Destructive) { }

// Icon button
PUIconButton(icon = FA.arrowLeft, contentDescription = "Back") { onBack() }

// Floating button
PUFloatingButton(PUFloatingButtonIcon.Plus) { openSheet() }

// Loader
PULoader(variant = PULoaderVariant.Light)

// Toast
var showToast by remember { mutableStateOf(false) }
PUToastHost(isVisible = showToast, message = "Saved!", style = PUToastStyle.Success, onDismiss = { showToast = false }) {
    // screen content here
}

// Bottom tray
Box(Modifier.fillMaxSize()) {
    MapContent()
    PUBottomTray(title = "34 WiFi nearby", modifier = Modifier.align(Alignment.BottomCenter)) {
        listItems()
    }
}

// Alert modal
PUAlertModal(
    isVisible = showAlert,
    variant = PUAlertVariant.Destructive,
    title = "Delete account",
    body = "This action cannot be undone.",
    primaryLabel = "Delete",
    onPrimary = { deleteAccount() },
    onDismiss = { showAlert = false }
)

// Search bar
var query by remember { mutableStateOf("") }
PUSearchBar(value = query, onValueChange = { query = it }, placeholder = "Search WiFi spots…")

// Bottom nav
var activeTab by remember { mutableStateOf(PUBottomNavTab.Explore) }
Scaffold(
    bottomBar = { PUBottomNav(activeTab = activeTab) { activeTab = it } }
) { padding -> screenContent(padding) }
```

---

## Tokens

```kotlin
// Colors
PUColors.brand          // #7458FD
PUColors.background     // #FFFFFF  (dark: #011638)
PUColors.onBackground   // #011638  (dark: #FFFFFF)

// Spacing
PUSpacing.lg   // 16.dp
PUSpacing.xl   // 20.dp

// Radius
PURadius.md    // 12.dp
PURadius.full  // 9999.dp (pill)

// Typography
PUTypography.bodyBold   // Poppins Bold 14sp
PUTypography.title      // Poppins Bold 20sp
```
