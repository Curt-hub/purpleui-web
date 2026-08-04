package ai.purple.purpleui.tokens

import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.Font
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.sp

/**
 * Poppins font family.
 *
 * Add `poppins_regular.ttf` and `poppins_bold.ttf` to your app's
 * `res/font/` directory and include them as resources in your app module.
 */
val PoppinsFamily = FontFamily(
    Font(resId = ai.purple.purpleui.R.font.poppins_regular, weight = FontWeight.Normal),
    Font(resId = ai.purple.purpleui.R.font.poppins_bold,    weight = FontWeight.Bold)
)

/**
 * Typography scale matching the Purple UI design tokens.
 *
 * Sizes are transcribed from `tokens.json`'s `typography.size` group
 * (0.75rem/0.875rem/1.125rem/1.375rem/2.5rem at a 16px root -> 12/14/18/22/40sp).
 * `.sp` is intentional here (not `.dp`) so these scale with the user's
 * system font size setting.
 */
object PUTypography {
    /** 12sp Regular — tab labels, captions */
    val supporting = TextStyle(fontFamily = PoppinsFamily, fontWeight = FontWeight.Normal, fontSize = 12.sp)

    /** 14sp Regular — body copy */
    val body = TextStyle(fontFamily = PoppinsFamily, fontWeight = FontWeight.Normal, fontSize = 14.sp)

    /** 14sp Bold — button labels, emphasized body */
    val bodyBold = TextStyle(fontFamily = PoppinsFamily, fontWeight = FontWeight.Bold, fontSize = 14.sp)

    /** 18sp Bold — section headings */
    val section = TextStyle(fontFamily = PoppinsFamily, fontWeight = FontWeight.Bold, fontSize = 18.sp)

    /** 22sp Bold — page / modal titles */
    val title = TextStyle(fontFamily = PoppinsFamily, fontWeight = FontWeight.Bold, fontSize = 22.sp)

    /** 40sp Bold — hero headings */
    val hero = TextStyle(fontFamily = PoppinsFamily, fontWeight = FontWeight.Bold, fontSize = 40.sp)
}
