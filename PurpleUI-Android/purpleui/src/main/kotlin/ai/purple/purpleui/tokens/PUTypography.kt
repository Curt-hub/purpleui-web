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

/** Typography scale matching the Purple UI design tokens. */
object PUTypography {
    /** 11sp Regular — tab labels, captions */
    val supporting = TextStyle(fontFamily = PoppinsFamily, fontWeight = FontWeight.Normal, fontSize = 11.sp)

    /** 14sp Regular — body copy */
    val body = TextStyle(fontFamily = PoppinsFamily, fontWeight = FontWeight.Normal, fontSize = 14.sp)

    /** 14sp Bold — button labels, emphasized body */
    val bodyBold = TextStyle(fontFamily = PoppinsFamily, fontWeight = FontWeight.Bold, fontSize = 14.sp)

    /** 16sp Bold — section headings */
    val section = TextStyle(fontFamily = PoppinsFamily, fontWeight = FontWeight.Bold, fontSize = 16.sp)

    /** 20sp Bold — page / modal titles */
    val title = TextStyle(fontFamily = PoppinsFamily, fontWeight = FontWeight.Bold, fontSize = 20.sp)

    /** 28sp Bold — hero headings */
    val hero = TextStyle(fontFamily = PoppinsFamily, fontWeight = FontWeight.Bold, fontSize = 28.sp)
}
