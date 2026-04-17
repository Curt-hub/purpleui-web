package ai.purple.purpleui.components

import androidx.compose.animation.*
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import ai.purple.purpleui.icons.FA
import ai.purple.purpleui.icons.FAIcon
import ai.purple.purpleui.tokens.PUColors
import ai.purple.purpleui.tokens.PURadius
import ai.purple.purpleui.tokens.PUSpacing
import ai.purple.purpleui.tokens.PUTypography
import kotlinx.coroutines.delay

enum class PUToastStyle { Success, Info, Warning, Error, Offline }

private data class ToastColors(val bg: Color, val text: Color, val icon: Color, val iconGlyph: String)

private fun toastColors(style: PUToastStyle): ToastColors = when (style) {
    PUToastStyle.Success -> ToastColors(Color(0xFFDCFCE7), Color(0xFF166534), Color(0xFF16A34A), FA.checkCircle)
    PUToastStyle.Info    -> ToastColors(Color(0xFFDBEAFE), Color(0xFF1E40AF), Color(0xFF2563EB), FA.infoCircle)
    PUToastStyle.Warning -> ToastColors(Color(0xFFFEF3C7), Color(0xFF92400E), Color(0xFFD97706), FA.exclamationTriangle)
    PUToastStyle.Error   -> ToastColors(Color(0xFFFEE2E2), Color(0xFF991B1B), Color(0xFFDC2626), FA.timesCircle)
    PUToastStyle.Offline -> ToastColors(Color(0xFFF3F4F6), Color(0xFF374151), Color(0xFF6B7280), FA.wifi)
}

/**
 * Toast notification with 2.5s auto-dismiss.
 *
 * Use [PUToastHost] to overlay a toast over any composable.
 *
 * ```kotlin
 * var showToast by remember { mutableStateOf(false) }
 * PUToastHost(isVisible = showToast, message = "Saved!", style = PUToastStyle.Success) {
 *     showToast = false
 * }
 * ```
 */
@Composable
fun PUToast(
    message: String,
    modifier: Modifier = Modifier,
    style: PUToastStyle = PUToastStyle.Info,
    showIcon: Boolean = true
) {
    val colors = toastColors(style)

    Row(
        modifier = modifier
            .clip(RoundedCornerShape(PURadius.md))
            .background(colors.bg)
            .padding(horizontal = PUSpacing.lg, vertical = PUSpacing.md),
        horizontalArrangement = Arrangement.spacedBy(PUSpacing.sm),
        verticalAlignment = Alignment.CenterVertically
    ) {
        if (showIcon) {
            FAIcon(colors.iconGlyph, size = 16.sp, color = colors.icon)
        }
        Text(message, style = PUTypography.body, color = colors.text)
    }
}

/**
 * Overlay wrapper that shows a [PUToast] and auto-dismisses after 2.5 seconds.
 *
 * Place this around or inside your screen content — it renders the toast
 * in a `Box` overlay at the top, sliding in from above.
 */
@Composable
fun PUToastHost(
    isVisible: Boolean,
    message: String,
    modifier: Modifier = Modifier,
    style: PUToastStyle = PUToastStyle.Info,
    showIcon: Boolean = true,
    onDismiss: () -> Unit,
    content: @Composable () -> Unit
) {
    LaunchedEffect(isVisible) {
        if (isVisible) {
            delay(2500)
            onDismiss()
        }
    }

    Box(modifier = modifier) {
        content()
        AnimatedVisibility(
            visible = isVisible,
            enter = slideInVertically(initialOffsetY = { -it }) + fadeIn(),
            exit  = slideOutVertically(targetOffsetY = { -it }) + fadeOut(),
            modifier = Modifier
                .align(Alignment.TopCenter)
                .padding(top = 16.dp, start = 16.dp, end = 16.dp)
        ) {
            PUToast(message = message, style = style, showIcon = showIcon)
        }
    }
}

private val Int.sp get() = this.toFloat().let { androidx.compose.ui.unit.TextUnit(it, androidx.compose.ui.unit.TextUnitType.Sp) }
