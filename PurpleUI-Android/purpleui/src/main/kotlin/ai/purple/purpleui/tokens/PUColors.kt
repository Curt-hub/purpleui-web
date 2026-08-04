package ai.purple.purpleui.tokens

import androidx.compose.ui.graphics.Color

/**
 * Semantic color tokens for Purple UI.
 *
 * Values are transcribed 1:1 from the `color` group in `tokens.json` (the
 * design system's single source of truth). Do not hardcode hex values in
 * components - reference these instead.
 *
 * Dark-mode mappings are noted in comments. Implement your own
 * `darkPUColors` object and swap via CompositionLocal for dark mode.
 */
object PUColors {
    // Brand
    val brand       = Color(0xFF7458FD)  // dark: #7458FD (unchanged)
    val brandSubtle = Color(0xFFECEAFF)  // dark: #2a1f6b

    // Backgrounds
    val background          = Color(0xFFFFFFFF)  // dark: #011638 (backgroundNavy)
    val backgroundElevated  = Color(0xFFF7F7F8)  // dark: #0a2048
    val backgroundSunken    = Color(0xFFF9F9FC)  // dark: #09193d
    val backgroundNavy      = Color(0xFF011638)  // invariant - always navy
    val backgroundElevatedNavy = Color(0xFF0A2048)  // invariant - dark-mode-only elevated surface (cards/sheets/inputs raised above backgroundNavy). No light equivalent.
    val backgroundAlt       = Color(0xFFF5F1ED)  // invariant - always cream

    // On-background text / icons
    val onBackground          = Color(0xFF000000)  // dark: #FFFFFF
    val onBackgroundSecondary = Color(0xFF595959)  // dark: rgba(255,255,255,0.70)
    val onBackgroundTertiary  = Color(0xFFAAACB0)  // dark: rgba(255,255,255,0.35)

    // Borders & dividers
    val outline       = Color(0xFFCDCED0)  // dark: rgba(255,255,255,0.15)
    val outlineSubtle = Color(0xFFEFF0F0)  // dark: rgba(255,255,255,0.06)

    // Misc component-specific
    val loaderTrack = Color(0xFFDDDDDF)  // invariant

    // Status
    val success       = Color(0xFF16C172)  // invariant
    val successSubtle = Color(0xFFE8F5E9)  // dark: #0d3320
    val successStrong = Color(0xFF4CAF50)  // invariant

    val error       = Color(0xFFF03A47)
    val errorSubtle = error.copy(alpha = 0.12f)  // rgba(240,58,71,0.12)

    val warning       = Color(0xFFE9D502)
    val warningSubtle = Color(0xFFFEFBE6)  // dark: #3d3400

    val info       = Color(0xFF045DEC)
    val infoSubtle = info.copy(alpha = 0.12f)  // rgba(4,93,236,0.12)

    // Vendor / partner brand colours - Activity feed only, do not use elsewhere
    val vendorBrown  = Color(0xFF6B2737)
    val vendorForest = Color(0xFF2D5A27)
    val vendorRed    = Color(0xFFE4002B)
    val vendorAmber  = Color(0xFFF5A623)

    // --------------------------------------------------------------
    // Android-local tokens: not in tokens.json.
    //
    // These names/values exist only in this file - they carry over from
    // before Android's tokens were properly wired up to the design system
    // and are still referenced by components below. Flagged here as drift
    // to be resolved (either mapped onto a real tokens.json token or
    // removed) rather than silently deleted.
    // --------------------------------------------------------------
    val border          = Color(0xFFE2E8F0)  // Android-local: not in tokens.json. Used by PUSearchBar; likely should be `outline`.
    val borderFocus     = Color(0xFF7458FD)  // Android-local: not in tokens.json. Used by PUSearchBar; value matches `brand`.
    val inputBackground = Color(0xFFF8F8FA)  // Android-local: not in tokens.json. Used by PUSearchBar (light mode).
    val overlay         = Color(0x80011638)  // Android-local: not in tokens.json. Used by PUAlertModal (50% backgroundNavy scrim).
}
