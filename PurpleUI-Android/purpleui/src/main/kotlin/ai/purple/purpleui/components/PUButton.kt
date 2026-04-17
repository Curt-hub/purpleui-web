package ai.purple.purpleui.components

import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.animation.core.spring
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.interaction.collectIsPressedAsState
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.scale
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.Shape
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import ai.purple.purpleui.icons.FA
import ai.purple.purpleui.icons.FAIcon
import ai.purple.purpleui.tokens.PUColors
import ai.purple.purpleui.tokens.PUTypography

enum class PUButtonVariant { Primary, Secondary, SecondaryDark, Destructive }
enum class PUButtonSize    { Sm, Md, Lg, Compact }
enum class PUButtonIconPosition { Before, After }

/**
 * Branded pill button. All variants use Poppins Bold 14sp.
 *
 * ```kotlin
 * PUButton("Get started") { /* action */ }
 * PUButton("Navigate", icon = FA.locationArrow, variant = PUButtonVariant.Secondary) { }
 * ```
 */
@Composable
fun PUButton(
    label: String,
    modifier: Modifier = Modifier,
    variant: PUButtonVariant = PUButtonVariant.Primary,
    size: PUButtonSize = PUButtonSize.Md,
    icon: String? = null,
    iconPosition: PUButtonIconPosition = PUButtonIconPosition.After,
    loading: Boolean = false,
    fullWidth: Boolean = false,
    enabled: Boolean = true,
    onClick: () -> Unit
) {
    val height: Dp = when (size) {
        PUButtonSize.Sm, PUButtonSize.Compact -> 40.dp
        PUButtonSize.Md -> 48.dp
        PUButtonSize.Lg -> 56.dp
    }
    val hPad: Dp = when (size) {
        PUButtonSize.Lg -> 24.dp
        else -> 16.dp
    }

    val background: Color = when (variant) {
        PUButtonVariant.Primary       -> PUColors.brand
        PUButtonVariant.Secondary     -> PUColors.background
        PUButtonVariant.SecondaryDark -> PUColors.backgroundNavy
        PUButtonVariant.Destructive   -> PUColors.error
    }
    val labelColor: Color = when (variant) {
        PUButtonVariant.Secondary -> PUColors.onBackground
        else -> Color.White
    }
    val borderColor: Color? = when (variant) {
        PUButtonVariant.Secondary     -> PUColors.onBackground
        PUButtonVariant.SecondaryDark -> Color.White.copy(alpha = 0.8f)
        else -> null
    }

    val interactionSource = remember { MutableInteractionSource() }
    val isPressed by interactionSource.collectIsPressedAsState()
    val scale by animateFloatAsState(
        targetValue = if (isPressed) 0.97f else 1f,
        animationSpec = spring(dampingRatio = 0.6f, stiffness = 400f),
        label = "scale"
    )

    val isDisabled = !enabled || loading

    val buttonModifier = modifier
        .scale(scale)
        .then(if (fullWidth) Modifier.fillMaxWidth() else Modifier)
        .height(height)

    val colors = ButtonDefaults.buttonColors(
        containerColor = background.copy(alpha = if (isDisabled) 0.5f else 1f),
        contentColor = labelColor,
        disabledContainerColor = background.copy(alpha = 0.5f),
        disabledContentColor = labelColor.copy(alpha = 0.5f)
    )

    Button(
        onClick = onClick,
        modifier = buttonModifier,
        enabled = !isDisabled,
        shape = CircleShape,
        contentPadding = PaddingValues(horizontal = hPad),
        colors = colors,
        interactionSource = interactionSource,
        border = borderColor?.let {
            androidx.compose.foundation.BorderStroke(
                1.5.dp,
                it.copy(alpha = if (isDisabled) 0.4f else 1f)
            )
        }
    ) {
        Box(contentAlignment = Alignment.Center) {
            Row(
                horizontalArrangement = Arrangement.spacedBy(6.dp),
                verticalAlignment = Alignment.CenterVertically,
                modifier = Modifier.then(if (loading) Modifier.wrapContentSize() else Modifier)
            ) {
                if (iconPosition == PUButtonIconPosition.Before && icon != null) {
                    FAIcon(icon, size = 14.sp, color = labelColor)
                }
                Text(label, style = PUTypography.bodyBold, color = labelColor)
                if (iconPosition == PUButtonIconPosition.After && icon != null) {
                    FAIcon(icon, size = 14.sp, color = labelColor)
                }
            }
            if (loading) {
                CircularProgressIndicator(
                    modifier = Modifier.size(18.dp),
                    color = labelColor,
                    strokeWidth = 2.dp
                )
            }
        }
    }
}

// Make sp available in this file
private val Int.sp get() = this.toFloat().let { androidx.compose.ui.unit.TextUnit(it, androidx.compose.ui.unit.TextUnitType.Sp) }
