package ai.purple.purpleui.tokens

import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp

/**
 * Shadow helpers matching the Purple UI named shadow tokens.
 *
 * Compose doesn't natively support colored shadows on all SDK levels;
 * these use the standard elevation shadow system.
 */
object PUShadows {
    /** bottomA — subtle card lift (y=2, blur=4) */
    fun Modifier.shadowBottomA(shape: androidx.compose.ui.graphics.Shape) =
        this.shadow(elevation = 2.dp, shape = shape, ambientColor = Color(0x08000000), spotColor = Color(0x0A000000))

    /** bottomB — elevated card (y=4, blur=12) */
    fun Modifier.shadowBottomB(shape: androidx.compose.ui.graphics.Shape) =
        this.shadow(elevation = 4.dp, shape = shape, ambientColor = Color(0x0F000000), spotColor = Color(0x14000000))

    /** bottomC — floating button (y=6, blur=20) */
    fun Modifier.shadowBottomC(shape: androidx.compose.ui.graphics.Shape) =
        this.shadow(elevation = 8.dp, shape = shape, ambientColor = Color(0x14000000), spotColor = Color(0x1A000000))

    /** topA — tray / nav bottom sheet */
    fun Modifier.shadowTopA(shape: androidx.compose.ui.graphics.Shape) =
        this.shadow(elevation = 4.dp, shape = shape, ambientColor = Color(0x0A000000), spotColor = Color(0x0A000000))
}
