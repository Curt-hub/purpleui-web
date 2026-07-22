# PurpleUI - React Native

First slice of the Purple UI design system for React Native. Ships alongside
`PurpleUI-iOS/` (Swift Package) and `PurpleUI-Android/` (Gradle module) - this
is the RN package that didn't exist before, which is why the RN app has been
hand-rolling its own styles and drifting from the design system.

Built from RN primitives only (`View` / `Text` / `Pressable` / `Animated`) -
no web-only or DOM dependencies.

---

## What's here

```
purpleui-react-native/
  src/
    tokens/
      colors.ts       semantic color tokens (same values as src/lib/tokens.ts)
      spacing.ts       xs..5xl spacing scale
      radius.ts        sm..full border-radius scale
      typography.ts    Poppins font family names + size scale
      shadows.ts       shadowColor/Offset/Opacity/Radius + Android elevation
      index.ts         re-exports the above + a combined `theme` object
    components/
      PUButton.tsx
      PUIconButton.tsx
      PUToast.tsx
      index.ts
    internal/
      PUSpinner.tsx        button loading spinner (bordered View, rotated)
      PUChevronLeft.tsx    PUIconButton's default back-arrow glyph
    index.ts           package entry point
  package.json
  tsconfig.json
```

## Requirements

- React >=18, React Native >=0.72 (peer dependencies - not bundled)
- Poppins-Regular.ttf and Poppins-Bold.ttf linked in the consuming app, same
  requirement as PurpleUI-iOS and PurpleUI-Android. This package does not
  bundle fonts.

## Install (local/monorepo)

Not published yet - add it as a local/workspace dependency from the
consuming app's `package.json`:

```json
{
  "dependencies": {
    "purpleui-react-native": "file:../purpleui-web/purpleui-react-native"
  }
}
```

If your Metro config doesn't already resolve TypeScript inside
`node_modules` for local/workspace packages, add this package's `src/` to
`watchFolders` (or add it as a proper Yarn/npm workspace member) so Metro
transforms its `.ts`/`.tsx` files like the rest of the app.

## Usage

```tsx
import { PUButton, PUIconButton, PUToast, theme, colors } from 'purpleui-react-native';

<PUButton label="Get started" variant="primary" onPress={() => {}} />
<PUButton label="Saving..." loading onPress={() => {}} />
<PUButton label="Delete account" variant="destructive" onPress={onDelete} />

<PUIconButton onPress={() => navigation.goBack()} />
<PUIconButton variant="dark" text="Filters" onPress={openFilters} />

<PUToast
  visible={showToast}
  message="WiFi pass saved"
  variant="success"
  onDismiss={() => setShowToast(false)}
/>
```

Tokens:

```tsx
import { theme } from 'purpleui-react-native';
// or the individual exports:
import { colors, spacing, radius, typography, shadows } from 'purpleui-react-native';

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.backgroundElevated,
    borderRadius: radius.lg,
    padding: spacing.lg,
    ...shadows.bottomC,
  },
});
```

## Component notes

### PUButton
`variant`: `primary | secondary | destructive`. `size`: `sm | md`. `loading`
shows a built-in spinner (label stays mounted but hidden, so the button
doesn't resize) and disables interaction. `fullWidth` stretches to the
parent's width; otherwise the button hugs its label.

This slice intentionally drops `secondary-dark`/`lg`/`compact` and the
FontAwesome `icon` prop from specs/PUButton.json - see the doc comment in
`PUButton.tsx` for why (icon support needs an RN answer for the Icons
foundation, which is a separate piece of work).

### PUIconButton
40x40 circle by default (`colors.backgroundElevated` fill, `colors.
onBackground` icon in `light`; `rgba(255,255,255,0.12)` fill, white icon in
`dark`) - matching specs/PUIconButton.json's documented values, not the
38px/bordered web and iOS implementations, which have drifted from that spec.
Pass `text` to render a pill with icon + label instead. `icon` accepts any
ReactNode (no bundled icon set); it defaults to a real back-arrow built from
a single bordered `View` (see `PUChevronLeft`), so the component works out of
the box without forcing an icon-library choice.

### PUToast
`success | info | warning | error | offline`, colours per
specs/PUToast.json (including `offline` using `colors.onBackground` /
`colors.background`, not the web component's off-spec hardcoded `#3A3D4A`).
Pill shape (`radius.full`). Internally self-manages its enter/exit animation
and auto-dismiss timer (calls `onDismiss` after `duration`, default 2500ms
per the spec) - the parent still owns `visible` and should flip it to
`false` when `onDismiss` fires. Icon glyphs are plain Unicode characters as a
placeholder for the Icons foundation, not FontAwesome.

PUToast renders just the pill, not a screen-anchored overlay - place it
inside your own top-anchored, absolutely-positioned wrapper:

```tsx
<View style={{ position: 'absolute', top: insets.top + 12, left: 16, right: 16 }}>
  <PUToast visible={showToast} message="Saved!" onDismiss={() => setShowToast(false)} />
</View>
```

## Verification

Typechecked with `npx tsc --noEmit`. Runtime behaviour (press handlers,
loading/disabled state, variant colours, PUToast's auto-dismiss timer and
offline colour, default PUIconButton size/colour) was verified with a
temporary `react-test-renderer` smoke test during development; it was removed
before committing since this slice's scope is tokens + components, not test
infra. `npm run typecheck` remains as a package script for future CI.
