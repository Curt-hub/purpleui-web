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
      passThemes.ts    WiFi pass card gradient themes (purple/nhs/university/cafe/guest)
      index.ts         re-exports the above + a combined `theme` object
    components/
      PUButton.tsx
      PUIconButton.tsx
      PUToast.tsx
      PUBottomNav.tsx
      PUBottomTray.tsx
      PUSearchBar.tsx
      PUFloatingButton.tsx
      PULoader.tsx
      PUValidationModal.tsx
      index.ts
    internal/
      PUSpinner.tsx          button loading spinner (bordered View, rotated)
      PUChevronLeft.tsx      PUIconButton's default back-arrow glyph
      PUSearchGlyph.tsx      PUSearchBar's magnifying-glass icon
      PUSlidersGlyph.tsx     PUSearchBar/filter "sliders" icon
      PUPlusGlyph.tsx        PUFloatingButton's plus icon
      PUNavigateGlyph.tsx    PUFloatingButton's navigate icon
      PUBottomNavIcons.tsx   PUBottomNav's 4 tab icons (explore/wallet/activity/profile)
    index.ts           package entry point
  package.json
  tsconfig.json
```

## Requirements

- React >=18, React Native >=0.72 (peer dependencies - not bundled)
- Poppins-Regular.ttf and Poppins-Bold.ttf linked in the consuming app, same
  requirement as PurpleUI-iOS and PurpleUI-Android. This package does not
  bundle fonts.
- No SVG/blur/safe-area libraries are bundled or declared as dependencies -
  see "Safe-area insets" and the `PUValidationModal` note below for what
  that means in practice and how to wire it up yourself.

## Safe-area insets (`PUBottomNav` / `PUBottomTray`)

Both components sit flush against the bottom of the screen and need to clear
the home indicator / gesture bar on notched devices. This package doesn't
declare `react-native-safe-area-context` as a dependency (it isn't a
peer/dev dependency here, even though it may already be installed in your
app), so neither component reads safe-area insets itself. Instead, each
takes a plain `bottomInset` number prop - measure the inset yourself with
`useSafeAreaInsets()` and pass it in:

```tsx
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PUBottomNav, PUBottomTray } from 'purpleui-react-native';

function ExploreScreen() {
  const insets = useSafeAreaInsets();

  return (
    <>
      <PUBottomTray title="34 WiFi nearby" bottomInset={insets.bottom}>
        {/* list rows */}
      </PUBottomTray>
      <PUBottomNav activeTab="explore" bottomInset={insets.bottom} onTabChange={setTab} />
    </>
  );
}
```

If you omit `bottomInset` it defaults to `0` - fine on devices with no home
indicator, but the bar/tray will sit under it on newer iPhones/Android
gesture nav unless you wire this up.

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

The package ships a compiled `dist/` (plain JS + `.d.ts`, built from `src/`
with `npm run build`) as `main`/`types`/`exports`, so a consuming Expo/Metro
app resolves and bundles it like any other JS dependency - no Babel config
changes or workspace setup needed to get TypeScript inside `node_modules`
transformed. `dist/` is committed (not gitignored) since this package isn't
published to a registry yet; re-run `npm run build` after changing anything
in `src/` and commit the updated `dist/` alongside it.

**Metro config is still required.** A `file:` dependency resolves to a
symlink at `node_modules/purpleui-react-native`, pointing outside the
consuming app's project root (into this sibling repo). That has two
consequences the consuming app's `metro.config.js` has to handle itself -
this package cannot do it for you:

1. **`watchFolders`** - Metro's file watcher only crawls the app's own
   project root by default. Without watching this package's directory too,
   Metro can resolve the symlink on disk but hasn't indexed the target's
   files, so `import ... from 'purpleui-react-native'` fails to resolve.
2. **`resolver.blockList` (plus `extraNodeModules` as a fallback)** - this
   package declares `react`/`react-native` as peer dependencies and doesn't
   bundle them, on the assumption it's built against the consuming app's own
   copies. But because its directory is watched from *outside* the app's
   root, Metro's hierarchical module resolution for its `require('react')`
   calls walks **up** from this package's own location - so if this repo (or
   this package itself) ever has its own `node_modules` on disk (e.g. after
   running `npm install`/`npm run build` here directly), Metro finds *that*
   `react`/`react-native` first, before it ever reaches the app's copy. That
   silently ships two React runtimes in one bundle, which crashes at runtime
   with an invalid-hook-call error inside this package's components (e.g.
   `PUIconButton`, `PUToast`). `extraNodeModules` alone does not prevent
   this - Metro only consults it as a fallback once normal resolution has
   already failed, so it can't override a `node_modules/react` Metro already
   found. A `blockList` that hides this repo's `node_modules` from Metro's
   resolver is what actually forces resolution back up to the app's own
   copy.

Add both to the consuming app's `metro.config.js`:

```js
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

// Watch the sibling package so Metro indexes its files, not just the
// symlink to them.
const purpleUiReactNativeRoot = path.resolve(__dirname, '../../purpleui-web/purpleui-react-native');
const purpleUiWebRoot = path.resolve(__dirname, '../../purpleui-web');
config.watchFolders = [
  ...(config.watchFolders ?? []),
  purpleUiReactNativeRoot,
];

// Hide any node_modules inside the sibling repo from Metro's resolver, so
// require('react') / require('react-native') from inside the package can
// never resolve to a copy other than this app's own - even if the sibling
// repo (or the package itself) has its own node_modules on disk.
function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
const pathSepPattern = path.sep === '\\' ? '\\\\' : '/';
const purpleUiWebNodeModules = new RegExp(
  `^${escapeRegExp(purpleUiWebRoot)}(?:${pathSepPattern}.*)?${pathSepPattern}node_modules${pathSepPattern}.*`
);
config.resolver.blockList = [
  ...(Array.isArray(config.resolver.blockList)
    ? config.resolver.blockList
    : config.resolver.blockList
    ? [config.resolver.blockList]
    : []),
  purpleUiWebNodeModules,
];

// Belt-and-braces: also point react/react-native at this app's own copies
// directly.
config.resolver.extraNodeModules = {
  ...(config.resolver.extraNodeModules ?? {}),
  react: path.resolve(__dirname, 'node_modules/react'),
  'react-native': path.resolve(__dirname, 'node_modules/react-native'),
};

module.exports = config;
```

Adjust the relative paths to match where the two repos actually sit on disk
relative to each other. See `wifi-map-app/metro.config.js` for the version
of this config verified against a real consuming app.

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

<PUBottomNav activeTab={tab} onTabChange={setTab} bottomInset={insets.bottom} />

<PUBottomTray title="34 WiFi nearby" bottomInset={insets.bottom}>
  {venues.map(v => <VenueRow key={v.id} {...v} />)}
</PUBottomTray>

<PUSearchBar
  value={query}
  onChange={setQuery}
  onFilterPress={openFilters}
/>

<PUFloatingButton variant="icon" icon="navigate" onPress={recenterMap} />
<PUFloatingButton variant="pill" icon="plus" label="Add WiFi" onPress={openAddFlow} />

<PULoader variant="light" />

<PUValidationModal
  visible={showConfirm}
  title="Leave without saving?"
  message="Any unsaved changes will be lost."
  variant="destructive"
  confirmLabel="Leave"
  onConfirm={handleLeave}
  onDismiss={() => setShowConfirm(false)}
/>
```

Tokens:

```tsx
import { theme } from 'purpleui-react-native';
// or the individual exports:
import { colors, spacing, radius, typography, shadows, passThemes } from 'purpleui-react-native';

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.backgroundElevated,
    borderRadius: radius.lg,
    padding: spacing.lg,
    ...shadows.bottomC,
  },
});

// passThemes gives gradient stops + on-card text colour per pass skin -
// pair gradientFrom/gradientTo with a gradient renderer of your choice
// (e.g. expo-linear-gradient); this package only ships the colour values.
const { gradientFrom, gradientTo, on } = passThemes.nhs;
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

### PUBottomNav
Fixed 4-tab bar (explore/wallet/activity/profile), 65px tall (see "Safe-area
insets" above for `bottomInset`). Ships a single icon per tab - matching
iOS/Android - rather than web's 88px bar and its hand-rolled FontAwesome
Regular/Solid SVG swap on selection; RN has no SVG dependency or bundled
icon font, so each tab's icon is a dependency-free geometric placeholder
(see `internal/PUBottomNavIcons.tsx`) pending the Icons foundation's RN
answer. Adds `accessibilityRole="tab"` + `accessibilityState={{ selected }}`
per tab - web/iOS/Android all currently fail to expose selected state, so
this doesn't repeat that gap.

Flagged spec-vs-implementation disagreement: specs/PUBottomNav.json's active
tab colour is `colors.brand` regardless of light/dark, but web/iOS/Android
all three instead use `colors.onBackground` (black) for active-on-light and
`colors.brand` only for active-on-dark. This component follows the spec
(brand always) - see `PUBottomNav.tsx`'s doc comment for the full detail.

### PUBottomTray
Draggable tray anchored to the bottom of the screen (map/list overlay
pattern), snapping between `peekHeight` and `expandHeight` via
`PanResponder` + `Animated` - no gesture-handler/reanimated dependency. Drag
handle is 60x5 per spec (web ships 104x7, off-spec; iOS/Android both ship
60x5 like this component). Top corners use `radius.lg` per spec, even though
web/iOS/Android all three actually use `radius.md` there. No filter button -
the spec's prop list doesn't have one, web's is unwired to any prop, and
iOS/Android don't render one either.

Accessibility (per specs/PUBottomTray.json's `accessibility.notes`): the
60x5 handle pill is purely decorative (`accessibilityElementsHidden`), and
dragging is never the *only* way to move between peeked/expanded - the
whole handle row is also a real, always-tappable `Pressable` with
`accessibilityRole="button"` + `accessibilityState={{ expanded }}` that
toggles state on a plain tap, usable by any user, not just a
screen-reader-only control. The header title gets `accessibilityRole="header"`.
That Pressable is sized to a real >=44x44 tap target (`HANDLE_PRESSABLE_MIN_SIZE`
in `PUBottomTray.tsx`, plus a `hitSlop` on top) rather than shrinking to fit
its 60x5 visual child - this is why the handle row itself is 44px tall
(`HANDLE_ROW_HEIGHT`), not the pill's own 5px/35px footprint; a visible size
increase over an earlier draft that sized the row to the pill alone.

Two more flagged disagreements: the header title is Poppins Bold **16px**
(spec and web agree; there's no 16 rung in the shared `typography.sizes`
scale, so this is a literal, `HEADER_TITLE_SIZE` in `PUBottomTray.tsx` - see
that file's doc comment, which also flags the missing-16 gap in the type
scale itself). And the drop shadow: the spec names `shadows.topC`, but
web's and iOS's actual shadows both correspond to the stronger `shadows.topD`
profile instead (web's literal CSS blur is 15px, not topC's 2px; iOS's
shadow radius of 7.5 is exactly half of that same 15px, this codebase's own
CSS-blur-to-RN-radius conversion factor). This component follows the spec's
named `topC`.

### PUSearchBar
Pill search input with a search icon, optional purple filter button (omit
`onFilterPress` to hide it), and a `dark` surface variant. Adds
`accessibilityLabel="Filter"` and a `hitSlop` so the filter button's tap
target is >=44pt even though its visible glyph is smaller - web and
iOS/Android currently ship it unlabeled with a tiny hit area. Default
`placeholder` follows the spec's `"Search networks…"`, not web's actual
`"Search"` default.

### PUFloatingButton
`icon` (56x56 circle) or `pill` (icon + label) variant, `navigate` or `plus`
icon. Always carries a real `accessibilityLabel` - if you omit `label` on
the icon variant, it falls back to an icon-aware default ("Navigate to my
location" / "Add"), matching iOS/Android rather than web's generic
"Floating action" fallback. Flagged disagreement: the spec's dark
background is `rgba(255,255,255,0.12)`, but web/iOS/Android all three
actually use a solid `#0a2048` - this component follows the spec.

### PULoader
64px ring spinner, `light` (purple, for light surfaces) or `dark` (white,
for dark surfaces) variant - **this mapping is under active dispute**.
specs/PULoader.json and this component both say light=purple/dark=white,
but web, iOS AND Android all three instead ship light=navy/dark=purple.
Curt needs to settle which convention is correct. The two arc colours are
declared as a single, obvious, two-line constant pair
(`LIGHT_ARC`/`DARK_ARC`) right at the top of `PULoader.tsx` specifically so
flipping the convention later is a two-line change, not a hunt through the
component body.

### PUValidationModal
Centered confirm/cancel dialog (`info | warning | destructive`), stacked
buttons (confirm on top, cancel below), spring scale-in. Uses `visible` /
`onDismiss` rather than the spec's `isPresented` (iOS Binding-style naming)
or web's `isOpen`/`onClose` - matching how `PUToast` already resolved the
same spec-vs-web naming mismatch for its own visibility prop. Renders a
plain semi-opaque scrim instead of the spec/web/iOS's blurred backdrop -
this package has no blur dependency (`expo-blur` exists in the wifi-map-app
consuming app but isn't a peer/dev dependency here, and is Expo-only).
`accessibilityRole="alertdialog"` (the spec's documented role) isn't a valid
RN `AccessibilityRole` - this component uses the closest built-in, `"alert"`,
paired with `accessibilityViewIsModal` so screen readers can't reach content
behind the backdrop.

## Verification

Typechecked with `npx tsc --noEmit` and built with `npm run build` after
every change in this package. Runtime behaviour was verified with a
temporary `react-test-renderer` smoke test during development (removed
before committing, same as the original three-component slice - this
package's scope is tokens + components, not test infra); `npm run typecheck`
remains as a package script for future CI.

For `PUButton`/`PUIconButton`/`PUToast`: press handlers, loading/disabled
state, variant colours, PUToast's auto-dismiss timer and offline colour,
default `PUIconButton` size/colour.

For the six components added after the first slice (`PUBottomNav`,
`PUBottomTray`, `PUSearchBar`, `PUFloatingButton`, `PULoader`,
`PUValidationModal`) plus `passThemes`: exact `passThemes` shape/values;
`PUBottomNav`'s tab selection, per-tab `accessibilityState`, and light/dark
rendering; `PUSearchBar`'s `onChange`/`onFilterPress` firing and the filter
button's `accessibilityLabel`/`hitSlop`; `PUFloatingButton`'s icon/pill
variants and default `accessibilityLabel` fallback; `PULoader`'s both
variants; `PUValidationModal`'s confirm/cancel firing and visible/hidden
mount behaviour, and the accessible expand/collapse `Pressable`'s tap
target being a real >=44x44 (see its own note below). `PUBottomTray`
specifically also confirms `PanResponder.create()` runs exactly once (the
same `panHandlers` function identities survive both an interaction-driven
re-render and an `expandHeight` prop change) - a direct runtime check of the
lazy-ref-guard fix.

What's *not* covered by a runtime test: asserting that the gesture-release
handler resolves against the *new* `expandHeight`/`peekHeight` bounds after
a prop change (the concrete defect the `live` ref fixes). The natural way to
test that would be calling the exposed `panHandlers.onResponderMove`/
`onResponderRelease` directly with a hand-built gesture object - but those
exposed functions only take the raw touch event; `PanResponder.create()`
computes `gestureState.dx/dy/vx/vy` itself from `event.touchHistory`
(see `node_modules/react-native/Libraries/Interaction/PanResponder.js`'s
`_updateGestureStateOnMove`), not from a second argument a caller can pass
in, so there's no plain-numbers shortcut through that public surface without
either faking a realistic `touchHistory` (genuinely native-shaped work) or
changing this component's source to also expose its raw
`onPanResponderMove`/`onPanResponderRelease` callbacks for testability
(not done, and not something this fix needed). This gap is why the fix's
correctness for that specific scenario rests on code-level reasoning
instead: `live.current.yOffset` is reassigned at the top of every render,
and both frozen gesture callbacks and `snapTo` dereference through
`live.current` rather than closing over `yOffset` directly.

Consumption from a real app was verified end-to-end in the `wifi-map-app`
(React Native/Expo) repo: added as `"purpleui-react-native": "file:../purpleui-web/purpleui-react-native"`,
`PUIconButton` imported and used to replace its hand-rolled circular
icon/back buttons (8+ call sites), and bundled with `npx expo export:embed`
(Metro) - confirming `dist/`'s plain-JS output resolves and bundles without
any TypeScript-in-`node_modules` workaround. This *did* require the
`watchFolders` + `resolver.blockList`/`extraNodeModules` additions to
`wifi-map-app/metro.config.js` documented above; also verified by
reproducing a double-React-copy scenario (running `npm install` inside this
package so it has its own `node_modules/react`, then producing a release
bundle with `npx expo export:embed --platform ios --dev false`) and
confirming via the output sourcemap that exactly one `react` and one
`react-native` end up in the bundle, with none resolving from this package's
`node_modules`.
