package ai.purple.purpleui.components

import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.animation.core.spring
import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.interaction.collectIsPressedAsState
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.scale
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import ai.purple.purpleui.icons.FA
import ai.purple.purpleui.icons.FAIcon
import ai.purple.purpleui.tokens.PUColors
import ai.purple.purpleui.tokens.PUTypography

enum class PUFloatingButtonVariant { Icon, Pill }
enum class PUFloatingButtonIcon    { Navigate, Plus }

/**
 * Floating action button for map surfaces.
 * `Icon` = 56×56 circle. `Pill` = icon + label.
 *
 * ```kotlin
 * PUFloatingButton(PUFloatingButtonIcon.Plus) { openSheet() }
 * PUFloatingButton(PUFloatingButtonIcon.Navigate, variant = PUFloatingButtonVariant.Pill, label = "Navigate") { }
 * ```
 */
@Composable
fun PUFloatingButton(
    icon: PUFloatingButtonIcon,
    modifier: Modifier = Modifier,
    variant: PUFloatingButtonVariant = PUFloatingButtonVariant.Icon,
    label: String? = null,
    dark: Boolean = false,
    onClick: () -> Unit
) {
    val background  = if (dark) Color(0xFF0A2048) else PUColors.background
    val foreground  = if (dark) Color.White else PUColors.brand
    val borderColor = if (dark) Color.White.copy(alpha = 0.15f) else null

    val interactionSource = remember { MutableInteractionSource() }
    val isPressed by interactionSource.collectIsPressedAsState()
    val scaleTarget = if (isPressed) {
        if (variant == PUFloatingButtonVariant.Icon) 0.92f else 0.95f
    } else 1f
    val scale by animateFloatAsState(
        targetValue = scaleTarget,
        animationSpec = spring(dampingRatio = 0.6f, stiffness = 400f),
        label = "scale"
    )

    val iconGlyph = if (icon == PUFloatingButtonIcon.Navigate) FA.locationArrow else FA.plus
    val a11yLabel = label ?: if (icon == PUFloatingButtonIcon.Navigate) "Navigate to my location" else "Add"

    Surface(
        onClick = onClick,
        modifier = modifier.scale(scale),
        shape = CircleShape,
        color = background,
        border = borderColor?.let { BorderStroke(1.dp, it) },
        shadowElevation = if (dark) 12.dp else 7.5.dp,
        interactionSource = interactionSource
    ) {
        if (variant == PUFloatingButtonVariant.Pill && label != null) {
            Row(
                modifier = Modifier
                    .height(56.dp)
                    .padding(start = 12.dp, end = 16.dp),
                horizontalArrangement = Arrangement.spacedBy(4.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                FAIcon(iconGlyph, size = 22.sp, color = foreground)
                Text(label, style = PUTypography.bodyBold, color = foreground)
            }
        } else {
            Box(
                modifier = Modifier.size(56.dp),
                contentAlignment = Alignment.Center
            ) {
                FAIcon(iconGlyph, size = 22.sp, color = foreground)
            }
        }
    }
}

private val Int.sp get() = this.toFloat().let { androidx.compose.ui.unit.TextUnit(it, androidx.compose.ui.unit.TextUnitType.Sp) }
