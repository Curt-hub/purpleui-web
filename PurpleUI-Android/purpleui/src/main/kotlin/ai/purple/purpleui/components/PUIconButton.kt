package ai.purple.purpleui.components

import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.animation.core.spring
import androidx.compose.foundation.background
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.interaction.collectIsPressedAsState
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.scale
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.unit.dp
import ai.purple.purpleui.icons.FAIcon
import ai.purple.purpleui.tokens.PUColors
import ai.purple.purpleui.tokens.PURadius
import ai.purple.purpleui.tokens.PUTypography

/**
 * Circular icon button with optional text pill mode.
 *
 * ```kotlin
 * PUIconButton(icon = FA.arrowLeft, contentDescription = "Back") { onBack() }
 * PUIconButton(icon = FA.xmark, text = "Clear", dark = true) { clearFilter() }
 * ```
 */
@Composable
fun PUIconButton(
    icon: String,
    modifier: Modifier = Modifier,
    text: String? = null,
    dark: Boolean = false,
    enabled: Boolean = true,
    contentDescription: String = "",
    onClick: () -> Unit
) {
    val background = if (dark) Color.White.copy(alpha = 0.08f) else PUColors.backgroundElevated
    val iconColor   = if (dark) Color.White else PUColors.onBackground

    val interactionSource = remember { MutableInteractionSource() }
    val isPressed by interactionSource.collectIsPressedAsState()
    val scale by animateFloatAsState(
        targetValue = if (isPressed) 0.92f else 1f,
        animationSpec = spring(dampingRatio = 0.6f, stiffness = 400f),
        label = "scale"
    )

    val shape = if (text != null) RoundedCornerShape(PURadius.full) else CircleShape

    Surface(
        onClick = onClick,
        modifier = modifier
            .scale(scale)
            .then(
                if (text == null) Modifier.size(38.dp)
                else Modifier.height(38.dp)
            )
            .semantics { this.contentDescription = contentDescription },
        enabled = enabled,
        shape = shape,
        color = background,
        interactionSource = interactionSource
    ) {
        if (text != null) {
            Row(
                modifier = Modifier.padding(horizontal = 12.dp),
                horizontalArrangement = Arrangement.spacedBy(6.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                FAIcon(icon, size = 14.sp, color = iconColor)
                Text(text, style = PUTypography.bodyBold, color = iconColor)
            }
        } else {
            Box(contentAlignment = Alignment.Center) {
                FAIcon(icon, size = 16.sp, color = iconColor)
            }
        }
    }
}

private val Int.sp get() = this.toFloat().let { androidx.compose.ui.unit.TextUnit(it, androidx.compose.ui.unit.TextUnitType.Sp) }
