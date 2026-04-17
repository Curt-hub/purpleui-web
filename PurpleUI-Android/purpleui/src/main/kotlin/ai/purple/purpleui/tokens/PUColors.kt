package ai.purple.purpleui.tokens

import androidx.compose.ui.graphics.Color

/**
 * Semantic color tokens for Purple UI.
 *
 * Dark-mode mappings are noted in comments. Implement your own
 * `darkPUColors` object and swap via CompositionLocal for dark mode.
 */
object PUColors {
    // Brand
    val brand        = Color(0xFF7458FD)  // same in dark

    // Backgrounds
    val background            = Color(0xFFFFFFFF)  // dark: #011638
    val backgroundElevated    = Color(0xFFF0F0F0)  // dark: #0C2149
    val backgroundNavy        = Color(0xFF011638)  // invariant (dark surface)
    val backgroundNeutral     = Color(0xFFF8F8FA)  // dark: #0C2149
    val backgroundCard        = Color(0xFFFFFFFF)  // dark: #0C2149
    val backgroundCardPressed = Color(0xFFF5F5F7)  // dark: #152D59

    // On-background text / icons
    val onBackground          = Color(0xFF011638)  // dark: #FFFFFF
    val onBackgroundSecondary = Color(0xFF4A5568)  // dark: rgba(255,255,255,0.6)
    val onBackgroundTertiary  = Color(0xFF718096)  // dark: rgba(255,255,255,0.35)

    // On-brand (text on brand-coloured surfaces)
    val onBrand = Color(0xFFFFFFFF)

    // Status
    val success = Color(0xFF16A34A)
    val warning = Color(0xFFD97706)
    val error   = Color(0xFFDC2626)
    val info    = Color(0xFF2563EB)
    val offline = Color(0xFF6B7280)

    // UI surfaces
    val border          = Color(0xFFE2E8F0)  // dark: rgba(255,255,255,0.08)
    val borderFocus     = Color(0xFF7458FD)
    val inputBackground = Color(0xFFF8F8FA)  // dark: #0C2149
    val loaderTrack     = Color(0xFFE2E8F0)  // dark: rgba(255,255,255,0.08)
    val overlay         = Color(0x80011638)  // 50% dark navy
}
