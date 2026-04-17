package ai.purple.purpleui.icons

import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.Font
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.unit.TextUnit
import androidx.compose.ui.unit.sp

/**
 * FontAwesome 5 Free — Solid unicode code points used across Purple UI components.
 *
 * Add `fa_solid.ttf` (FontAwesome 5 Free Solid) to your app's `res/font/` directory
 * and reference it as `R.font.fa_solid`. Download from fontawesome.com/download.
 */
object FA {
    const val arrowLeft    = "\uF060"
    const val arrowRight   = "\uF061"
    const val xmark        = "\uF00D"
    const val plus         = "\uF067"
    const val wifi         = "\uF1EB"
    const val locationArrow = "\uF124"
    const val mapMarker    = "\uF3C5"
    const val wallet       = "\uF555"
    const val receipt      = "\uF543"
    const val user         = "\uF007"
    const val search       = "\uF002"
    const val paperPlane   = "\uF1D8"
    const val checkCircle  = "\uF058"
    const val infoCircle   = "\uF05A"
    const val exclamationTriangle = "\uF071"
    const val timesCircle  = "\uF057"
    const val filter       = "\uF0B0"
    const val sliders      = "\uF1DE"
}

/**
 * Renders a FontAwesome 5 Free Solid icon.
 *
 * Requires `fa_solid.ttf` in `res/font/` of the consuming app module.
 */
@Composable
fun FAIcon(
    icon: String,
    modifier: Modifier = Modifier,
    size: TextUnit = 16.sp,
    color: Color = Color.Unspecified
) {
    Text(
        text = icon,
        modifier = modifier,
        style = TextStyle(
            fontFamily = FASolidFamily,
            fontSize = size,
            color = color
        )
    )
}

// Declared internal so the consuming app can reference its own R.font
internal val FASolidFamily = FontFamily(
    Font(resId = ai.purple.purpleui.R.font.fa_solid)
)
