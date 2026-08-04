# Changelog

All notable changes to the Purple UI design system contract (`specs/`, `tokens.json`,
`src/lib/tokens.ts`) are recorded here. Format loosely follows
[Keep a Changelog](https://keepachangelog.com/); versions track `package.json`.

This file does not attempt to log changes inside the native packages
(`PurpleUI-iOS/`, `PurpleUI-Android/`, `purpleui-react-native/`) or the web component
implementations (`src/components/ui/`) - those are tracked by their own commits/PRs.
It covers the machine-readable contract: what a spec, token, or schema consumer
(including an MCP server) built against.

## [0.2.0] - MCP-prep and spec normalization

### Added
- `specs/schema/component.schema.json` - JSON Schema (2020-12) for every `specs/PU*.json`
  component spec. Formalizes the shape informally implied by the original 15 specs and
  closes the inconsistencies found in the mobile-parity audit (missing `category`,
  missing `accessibility`, ad hoc `variants` shapes, absent implementation-status
  tracking).
- `specs/schema/index.schema.json` - JSON Schema for `specs/index.json`.
- `specs/schema/tokens.schema.json` - JSON Schema for `tokens.json`, validating the
  DTCG Format Module token/group shape (https://tr.designtokens.org/format/).
- `specs/schema/foundation.schema.json` - lightweight core-shape schema for
  `specs/foundation-*.json` files.
- `scripts/validate-specs.ts` (`npm run validate-specs`, wired as `prebuild` so
  `npm run build` cannot succeed with invalid specs) - validates every spec/token file
  against its schema, plus cross-file consistency checks that plain JSON Schema can't
  express alone:
  - every component spec is registered in `index.json` and vice versa (both directions);
  - every `platforms` entry has a matching `implementation` entry and vice versa (both
    directions - a spec that declares three platforms and documents zero used to pass);
  - every foundation spec on disk is registered in `index.json` **and** every
    `index.json` foundation entry resolves to a real file (previously only the first
    direction was checked - a bogus `foundations[]` entry pointing at nothing passed);
  - every non-null `implementation.*.sourceFile` resolves to a real file on disk;
  - every non-null `docPage` resolves to a real `src/app/(docs)/**/page.tsx` route.
  This mechanically catches the class of drift the audit previously had to find by hand
  - and catches drift the first version of this script itself missed (see Fixed below).
- `specs/foundation-radius.json` - foundation spec for the `borderRadius` token
  category, which previously had no foundation doc at all despite being a first-class
  top-level key in `tokens.json` and referenced by name throughout every component spec.
- `tokens.json` / `src/lib/tokens.ts`: new `color.backgroundElevatedNavy` token
  (`#0A2048`) - a dark-mode-only elevated surface color (modals, bottom tray, search
  bar, floating button when `dark`). Reconciles a value that was already hardcoded ad
  hoc as `'#0a2048'` in 5+ places across web and iOS, with Android independently
  drifted to a third value (`#0C2149`) for the same concept. Existing call sites are
  unchanged in this release and still reference the raw hex - migrating them to the
  new token is a follow-up change owned by each platform.
- `$schema` and `version` fields on `tokens.json` and `specs/index.json`.
- This CHANGELOG, and a real semver on `package.json` (was frozen at `0.1.0`).

### Changed
- **`specs/index.json`**: `$schema` was a human-readable sentence
  ("Purple UI component registry - enumerate all components..."), not a URI - the
  single most MCP-hostile thing in the repo per the audit. It now points at
  `./schema/index.schema.json`; the sentence moved to a new `description` field.
- **All 15 component specs** normalized to one shape: every spec now has `$schema`,
  `category`, a structured `implementation` block (per-platform `status`
  `"implemented" | "planned"` + `sourceFile`, replacing the old single top-level
  `sourceFile` string and the ad hoc prose-only disclosure `PUToggle` used), and a real
  `accessibility` block (added to `PUBottomTray`, `PUTextInput`, `PUPassCard`,
  `PU3DPassCard`, `PUMapbox`, `PUMapPin`, which previously had none).
- **`variants` disambiguated.** Previously a flat `string[]` that conflated two
  different things. Now an object: `{ kind: "propEnum", propName, values }` for a real
  enum-backed prop (e.g. `PUButton.variant`), or
  `{ kind: "derivedScenario", derivedFromProps, values }` for descriptive scenario
  labels derived from one or more other props with no single corresponding enum (e.g.
  `PUPassCard`'s `stacked-depth-1`, derived from the numeric `stackDepth` prop; also
  applied to `PUSearchBar`/`PUToggle`, whose light/dark "variants" turned out to be
  derived from a boolean `dark` prop, not a literal `variant` enum). The two branches
  are now mutually exclusive in the schema (`propEnum` may not also carry
  `derivedFromProps` and vice versa) - the first version allowed a spec to declare both.
- **`usage` renamed to `behaviour`** everywhere (was split across two field names with
  no defined boundary between them - `PULoader` and `PUBottomNav` used `usage`, four
  other specs used `behaviour` for overlapping content). `behaviour` was the majority
  convention (4 of 6) and matches the British-spelling convention already used
  throughout the repo (see `CLAUDE.md`'s "colours" and "behaviour" is the same choice).
- **Fixed the `PUToast`/`PUValidationModal` canonical-name-vs-web-prop mismatch.**
  `PUToast`'s `isPresented` prop already had a correct `platforms.web: "visible: boolean"`
  override (the audit's memory of this was wrong - re-verified against the live
  component before editing). `PUValidationModal`'s `onDismiss` prop did not: its real
  web prop is `onClose`, and no `platforms.web` override existed at all. Added
  `"web": "onClose: () => void"`.
- **Added a `dark` prop to `PUValidationModal.json` and `PUTextInput.json`.** Found
  while fixing the naming mismatch above: both live web components
  (`PUAlertModal.tsx`, `PUTextInput.tsx`) accept a `dark` prop that was completely
  absent from their specs.
- Sizes/states arrays added where a component has a real, named enum for them
  (`states` added to `PUButton`, `PUIconButton`, `PUFloatingButton`, `PUToast`,
  `PUBottomTray`, `PUValidationModal`, `PUSearchBar`, `PUBottomNav`, `PUMapPin`).
- `scripts/export-tokens.ts` updated to emit `$schema`/`version` and the new
  `backgroundElevatedNavy` token when regenerating `tokens.json` - without this,
  `npm run export-tokens` would have silently dropped all of the above on the next
  regeneration.

### Documented (no spec added)
- `specs/index.json`'s `excludedComponents` array records a deliberate decision **not**
  to register `PUInfoCard`, `PUStatCard`, or `PUListRow` as design-system components -
  none of the three is referenced by any doc page or other component anywhere in the
  repo. `PUInfoCard` additionally hardcodes several colours that are not Purple tokens
  at all (`#0d7a49`, `#7a6a00`, `#a01e28`, `#1e40af`, plus a bare `text-gray-700`
  Tailwind utility).

### Fixed (found in review of this branch)
- **`PUListRow` was briefly, incorrectly registered.** An earlier version of this
  change added `specs/PUListRow.json` and claimed it "already backs a real in-use
  surface (`PUBottomTray`'s doc example)". That claim was false: `PUListRow` is never
  imported or rendered anywhere; the doc page renders its list with hand-rolled `div`s,
  and the only occurrences of the string `PUListRow` are inside that page's
  `traySwiftCode`/`trayKotlinCode` sample-text literals (illustrative Swift/Kotlin, not
  real web output - and for platforms `PUListRow` was never even spec'd for).
  `specs/PUListRow.json` has been removed and `PUListRow` moved to
  `excludedComponents`, applying the exact same no-real-consumer test used for
  `PUInfoCard`/`PUStatCard`.
- **Two dead `docPage` links.** `specs/foundation-radius.json` and (separately)
  `PUToggle.json` both claimed a `docPage` route that does not exist on disk
  (`/foundation/radius`, `/inputs/toggle` - no matching directory under
  `src/app/(docs)/`). `docPage` is now `null` on both, with a `notes` field explaining
  why, and the schema now permits `docPage: null` explicitly rather than requiring a
  route string that might be fictional. `scripts/validate-specs.ts` now checks every
  non-null `docPage` against the filesystem so this can't recur silently.
- **The consistency checks in `scripts/validate-specs.ts` were asymmetric** in two
  places: `implementation` keys were checked as a subset of `platforms`, but not the
  reverse (a spec declaring 3 platforms with `implementation: {}` passed); and
  `foundations[]` registrations were checked disk→`index.json` but not `index.json`→disk
  (a bogus entry pointing at a nonexistent file passed). Both directions are now
  checked. See "Constructed failing cases" below for proof these are enforced, not just
  asserted.
- **`variants.kind: "propEnum"` could also carry a contradictory `derivedFromProps`**
  (and vice versa) because the schema asserted the required field per branch without
  asserting the other branch's field was absent. Both branches are now mutually
  exclusive (see Changed).
- Em-dash cleanup in the newly-authored files this change touches:
  `scripts/validate-specs.ts` (1), `scripts/export-tokens.ts` (2 header/divider
  comments), `src/lib/tokens.ts` (12, including the 2 that had drifted out of sync with
  the hyphenated text already fixed in `tokens.json`'s `$description` for the same
  tokens). The em-dashes in the 15 component specs are pre-existing, unchanged from
  `master`, and out of scope for this branch - left as-is.

### Constructed failing cases (proof the validator actually enforces the above)
Verified by temporarily constructing each bad case and confirming `validate-specs`
fails with the expected message, then reverting:
- `platforms: ["web","ios","android"]` + `implementation: {}` → fails
  "implementation has an entry for every declared platform".
- A `foundations[]` entry pointing at a nonexistent spec file → fails "foundations[]
  entry resolves to a real file on disk".
- `implementation.web.sourceFile` pointing at a typo'd nonexistent path → fails
  "sourceFile resolves to a real file on disk".
- `docPage: "/nonexistent/route"` → fails "docPage resolves to a real page on disk".
- `variants: { kind: "propEnum", propName: "x", derivedFromProps: ["y"], values: ["a"] }`
  → rejected by `component.schema.json` (mutual exclusion `not`/`required`).

### Explicitly not touched
Per instruction, the following disputed values are untouched - only their surrounding
structure was normalized:
- `PULoader.json`'s light/dark colour mapping.
- `PUToast.json`'s `offline` colour and its `radius.full` (pill) shape.
- `PUIconButton.json`'s 40×40 / fill / icon-colour values.
- `PUBottomTray.json`'s 60×5 drag handle.
- `PUMapPin.json`'s Android `"N/A"` status (no `android` key was added to its
  `implementation` block, consistent with `platforms: ["web", "ios"]`).

## [0.1.0] - Prior baseline
Original 15 component specs (Apr-Jul, ad hoc schema), 7 foundation specs, first
`purpleui-react-native` slice (`PUButton`, `PUIconButton`, `PUToast`), `passThemes`
token group (web-only). See the mobile-parity audit for the full state at this point.
