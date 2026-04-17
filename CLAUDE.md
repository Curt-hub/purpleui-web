# Purple UI — Agent & Developer Guide

Purple UI is the design system for Purple's mobile app (iOS SwiftUI + Android Compose + React web).
This file tells you where everything lives and how to consume it.

---

## What's in this repo

This is the **documentation site** for Purple UI — a Next.js app that renders component previews
and platform-specific code examples. It is not a published npm/Swift/Kotlin package; the native
APIs are documented here until a distributable package ships.

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

## How to consume — iOS

The Swift APIs shown in docs are SwiftUI components with a `PU` prefix. Until a Swift Package
ships, hand-implement each component once using:

1. Token values from `tokens.json` (or `src/lib/tokens.ts`)
2. The prop contract from `specs/{ComponentName}.json`
3. The Swift code sample from the component's doc page as the reference signature

Typography: Poppins (must be bundled manually). All sizes are in `pt` matching the `rem`
values in tokens (12px → 12pt, 14px → 14pt, etc.)

---

## How to consume — Android

Same pattern as iOS. Kotlin APIs use `PUButtonVariant.Primary` enum style instead of
Swift dot-syntax. Spacing and size values are the same pixel values from tokens, expressed as `dp`.

---

## How to consume — Web

```ts
import { colors, spacing, radius, shadows, typography } from '@/lib/tokens';
import { PUButton } from '@/components/ui/PUButton';
```

Tailwind classes in this project map to semantic tokens (see `tailwind.config.ts`). Use
`text-primary` for `colors.brand`, `bg-background` for `colors.background`, etc.

---

## Specs index

`specs/index.json` — lists every component with name, spec file path, and supported platforms.
Use this to enumerate the design system without reading every file.
