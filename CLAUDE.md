# Purple UI — Agent & Developer Guide

Purple UI is the design system for Purple's mobile app (iOS SwiftUI + Android Compose + React web).
This file tells you where everything lives and how to consume it.

---

## What's in this repo

| Path | What it is |
|------|------------|
| `src/` | Next.js documentation site (component previews + code examples) |
| `tokens.json` | DTCG-format token export — consumable without a JS runtime |
| `specs/` | Machine-readable JSON spec per component + `index.json` registry |
| `PurpleUI-iOS/` | Swift Package (swift-tools-version 5.9, iOS 16+, macOS 13+) |
| `PurpleUI-Android/` | Gradle library module (minSdk 26, Compose BOM 2024.05) |
| `public/snapshots/` | Per-state PNG screenshots of every component (generated) |
| `examples/ios/` | SwiftUI composition examples (Explore + Root screens) |
| `examples/android/` | Compose composition examples (Explore + Root screens) |

Key constraint: **all colours and spacing in components reference semantic token names, never
raw hex values.** Always map hex colours you see in designs back to a token before using them.

Key constraint: **all colours and spacing in components reference semantic token names, never
raw hex values.** Always map hex colours you see in designs back to a token before using them.

---

## Token system

| File | Purpose |
|------|---------|
| `src/lib/tokens.ts` | TypeScript source of truth for all token values |
| `tokens.json` | DTCG-format export — directly consumable without a JS runtime |

### Two tiers

1. **Palette** (`palette` const, not exported) — raw hex values. Never reference these in
   components. They exist only to populate the semantic tier.
2. **Semantic tokens** (exported) — role-based names. Use these everywhere.

```
colors.brand          → #7458FD   (Purple brand, invariant light/dark)
colors.background     → #FFFFFF   (dark: #011638 navy)
colors.onBackground   → #000000   (dark: #FFFFFF)
colors.success        → #16C172
colors.error          → #F03A47
...
```

Dark-mode mappings are documented as inline comments in `tokens.ts` and as `$description`
fields in `tokens.json`.

### Token categories

| Export | Keys | Notes |
|--------|------|-------|
| `colors` | brand, background*, onBackground*, outline*, success/error/warning/info, vendor* | Light values are the `$value`; dark mappings are in `$description` |
| `spacing` | xs(4) sm(8) md(12) lg(16) xl(20) 2xl(24) 3xl(32) 4xl(40) 5xl(48) | All in px |
| `radius` | sm(6) md(12) lg(16) xl(24) full(9999) | All in px |
| `shadows` | bottomA–D, topA–D, sideNav, tilesActive, tilesHover | CSS box-shadow strings |
| `typography` | fontFamily (Poppins), sizes (supporting/body/section/title/hero), weights (regular/bold) | |

### Regenerating tokens.json

```bash
npm run export-tokens   # writes tokens.json to repo root
```

---

## Component inventory

All React components: `src/components/ui/`
All documentation pages: `src/app/(docs)/`
Machine-readable specs: `specs/`

| Component | Doc page | Spec file | Platforms |
|-----------|----------|-----------|-----------|
| PUButton | /buttons/button | specs/PUButton.json | web, ios, android |
| PUIconButton | /buttons/icon-button | specs/PUIconButton.json | web, ios, android |
| PUFloatingButton | /buttons/floating-button | specs/PUFloatingButton.json | web, ios, android |
| PUToast | /overlays/toast | specs/PUToast.json | web, ios, android |
| PUBottomTray | /overlays/bottom-tray | specs/PUBottomTray.json | web, ios, android |
| PUValidationModal | /overlays/validation-modal | specs/PUValidationModal.json | web, ios, android |
| PULoader | /indicators/loader | specs/PULoader.json | web, ios, android |
| PUSearchBar | /inputs/search-bar | specs/PUSearchBar.json | web, ios, android |
| PUBottomNav | /navigation/bottom-nav | specs/PUBottomNav.json | web, ios, android |
| PUMapbox | /map/mapbox | specs/PUMapbox.json | web, ios |
| PUMapPin | /map/map-pins | specs/PUMapPin.json | web, ios |

Foundation (no props, token-driven):
Colors, Typography, Spacing, Radius, Shadows, Icons (Font Awesome), Illustrations, Logos

---

## Platform APIs

Swift and Kotlin code samples are embedded in each documentation page (`page.tsx`) as
string literals passed to `<PlatformCodeBlock swift={...} kotlin={...} />`.

**Naming conventions across platforms:**

| Concept | Web (React) | iOS (SwiftUI) | Android (Compose) |
|---------|-------------|---------------|-------------------|
| Button variant | `variant="primary"` | `variant: .primary` | `variant = PUButtonVariant.Primary` |
| Loading state | `loading={true}` | `loading: true` | `isLoading = true` |
| Dark surface | `dark={true}` | `dark: true` | `dark = true` |
| Full width | `fullWidth={true}` | `fullWidth: true` | `modifier = Modifier.fillMaxWidth()` |
| Tap handler | `onClick={fn}` | trailing closure `{ }` | `onClick = { }` |

---

## How to consume — iOS (Swift Package)

The Swift Package lives at `PurpleUI-iOS/`. Add it to Xcode via File → Add Package Dependencies
(local path). Requires adding Poppins and FontAwesome 5 Free fonts to the app target — see
`PurpleUI-iOS/` for setup instructions.

```swift
import PurpleUI

PUButton("Get started") { }
PUSearchBar(text: $query, placeholder: "Search…")
PUBottomNav(activeTab: $activeTab)
```

**Verify the build:**
```bash
cd PurpleUI-iOS && swift build
```

Token files: `PurpleUI-iOS/Sources/PurpleUI/Tokens/`
Component files: `PurpleUI-iOS/Sources/PurpleUI/Components/`
Example composition: `examples/ios/`

---

## How to consume — Android (Gradle module)

The Gradle module lives at `PurpleUI-Android/`. Include `:purpleui` in your project's
`settings.gradle.kts` and add `implementation(project(":purpleui"))` to your app module.
Requires Poppins and FontAwesome 5 Free fonts in your app's `res/font/` — see
`PurpleUI-Android/README.md` for setup instructions.

```kotlin
import ai.purple.purpleui.components.*

PUButton("Get started") { }
PUSearchBar(value = query, onValueChange = { query = it })
PUBottomNav(activeTab = activeTab) { activeTab = it }
```

**Verify the build:**
```bash
cd PurpleUI-Android && ./gradlew :purpleui:compileDebugKotlin
```

Token files: `PurpleUI-Android/purpleui/src/main/kotlin/ai/purple/purpleui/tokens/`
Component files: `PurpleUI-Android/purpleui/src/main/kotlin/ai/purple/purpleui/components/`
Example composition: `examples/android/`

---

## How to consume — Web

```ts
import { colors, spacing, radius, shadows, typography } from '@/lib/tokens';
import { PUButton } from '@/components/ui/PUButton';
```

Tailwind classes in this project map to semantic tokens (see `tailwind.config.ts`). Use
`text-primary` for `colors.brand`, `bg-background` for `colors.background`, etc.

---

## Snapshots

Per-state PNG screenshots of every component live in `public/snapshots/{ComponentName}/{label}.png`.
Regenerate after UI changes:

```bash
npm run dev          # terminal 1 — must be running on port 3000
npm run snapshots    # terminal 2 — writes PNGs to public/snapshots/
```

---

## Specs index

`specs/index.json` — lists every component with name, spec file path, supported platforms,
and pointers to the native package paths and snapshot directory.
Use this to enumerate the design system without reading every file.
