package ai.purple.purpleui.tokens

import androidx.compose.ui.graphics.Color

/**
 * Named gradient skins for WiFi Pass cards (PUPassCard / PU3DPassCard /
 * PUWalletStack-equivalent components, once they exist on Android).
 *
 * Transcribed from the `passThemes` group in `tokens.json` (currently web-only).
 * Nothing on Android consumes this yet - this is groundwork so a future pass
 * card component can reference `PUPassThemes.<name>` instead of hardcoding
 * gradient hex pairs per screen.
 *
 * Convention (matches `src/lib/tokens.ts` / `tokens.json`):
 *   gradientFrom / gradientTo — 135° linear gradient stops
 *   on                        — text/icon colour for content on the card
 */
data class PUPassTheme(
    val gradientFrom: Color,
    val gradientTo: Color,
    val on: Color,
)

object PUPassThemes {
    /** Purple brand pass - default skin */
    val purple = PUPassTheme(
        gradientFrom = PUColors.brand,       // #7458FD
        gradientTo = Color(0xFF9B7FFE),
        on = PUColors.background,            // #FFFFFF
    )

    /** NHS-branded venue pass */
    val nhs = PUPassTheme(
        gradientFrom = Color(0xFF005EB8),    // NHS Blue
        gradientTo = Color(0xFF003087),      // NHS Dark Blue
        on = PUColors.background,            // #FFFFFF
    )

    /** University / institutional pass - reuses Purple's own navy */
    val university = PUPassTheme(
        gradientFrom = PUColors.backgroundNavy,  // #011638
        gradientTo = Color(0xFF1A3A5C),
        on = PUColors.background,                // #FFFFFF
    )

    /** Cafe / hospitality pass - reuses the success green */
    val cafe = PUPassTheme(
        gradientFrom = Color(0xFF0F9B63),
        gradientTo = PUColors.success,        // #16C172
        on = PUColors.background,             // #FFFFFF
    )

    /** Neutral guest-network pass */
    val guest = PUPassTheme(
        gradientFrom = Color(0xFF4A2545),
        gradientTo = Color(0xFF7C3F6E),
        on = PUColors.background,             // #FFFFFF
    )

    /** All themes keyed by name, for enumeration (e.g. a theme picker). */
    val all: Map<String, PUPassTheme> = mapOf(
        "purple" to purple,
        "nhs" to nhs,
        "university" to university,
        "cafe" to cafe,
        "guest" to guest,
    )
}
