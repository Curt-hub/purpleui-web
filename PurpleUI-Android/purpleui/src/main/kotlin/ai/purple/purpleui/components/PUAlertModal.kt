package ai.purple.purpleui.components

import androidx.compose.animation.*
import androidx.compose.animation.core.spring
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import ai.purple.purpleui.icons.FA
import ai.purple.purpleui.icons.FAIcon
import ai.purple.purpleui.tokens.PUColors
import ai.purple.purpleui.tokens.PURadius
import ai.purple.purpleui.tokens.PUSpacing
import ai.purple.purpleui.tokens.PUTypography

enum class PUAlertVariant { Info, Warning, Destructive }

/**
 * Modal alert dialog with backdrop.
 *
 * ```kotlin
 * PUAlertModal(
 *     isVisible = showAlert,
 *     variant = PUAlertVariant.Destructive,
 *     title = "Delete account",
 *     body = "This cannot be undone.",
 *     primaryLabel = "Delete",
 *     onPrimary = { deleteAccount() },
 *     onDismiss = { showAlert = false }
 * )
 * ```
 */
@Composable
fun PUAlertModal(
    isVisible: Boolean,
    title: String,
    body: String,
    primaryLabel: String,
    modifier: Modifier = Modifier,
    secondaryLabel: String? = "Cancel",
    variant: PUAlertVariant = PUAlertVariant.Info,
    dark: Boolean = false,
    onPrimary: () -> Unit,
    onSecondary: (() -> Unit)? = null,
    onDismiss: () -> Unit
) {
    val iconGlyph: String = when (variant) {
        PUAlertVariant.Info        -> FA.infoCircle
        PUAlertVariant.Warning     -> FA.exclamationTriangle
        PUAlertVariant.Destructive -> FA.timesCircle
    }
    val iconColor: Color = when (variant) {
        PUAlertVariant.Info        -> PUColors.info
        PUAlertVariant.Warning     -> PUColors.warning
        PUAlertVariant.Destructive -> PUColors.error
    }
    val primaryBg: Color = when (variant) {
        PUAlertVariant.Destructive -> PUColors.error
        else -> PUColors.brand
    }
    val cardBg    = if (dark) Color(0xFF0C2149) else PUColors.background
    val titleColor = if (dark) Color.White else PUColors.onBackground
    val bodyColor  = if (dark) Color.White.copy(alpha = 0.6f) else PUColors.onBackgroundSecondary

    AnimatedVisibility(
        visible = isVisible,
        enter = fadeIn(),
        exit  = fadeOut()
    ) {
        Box(
            modifier = modifier.fillMaxSize(),
            contentAlignment = Alignment.Center
        ) {
            // Scrim
            Box(
                modifier = Modifier
                    .fillMaxSize()
                    .background(PUColors.overlay)
                    .clickable(
                        indication = null,
                        interactionSource = remember { MutableInteractionSource() }
                    ) { onDismiss() }
            )

            // Card
            AnimatedVisibility(
                visible = isVisible,
                enter = scaleIn(spring(dampingRatio = 0.7f, stiffness = 400f)) + fadeIn(),
                exit  = scaleOut() + fadeOut()
            ) {
                Column(
                    modifier = Modifier
                        .padding(horizontal = 32.dp)
                        .clip(RoundedCornerShape(PURadius.lg))
                        .background(cardBg)
                        .padding(PUSpacing.xl2),
                    horizontalAlignment = Alignment.CenterHorizontally,
                    verticalArrangement = Arrangement.spacedBy(PUSpacing.md)
                ) {
                    FAIcon(iconGlyph, size = 32.sp, color = iconColor)

                    Text(title, style = PUTypography.title, color = titleColor, textAlign = TextAlign.Center)
                    Text(body, style = PUTypography.body, color = bodyColor, textAlign = TextAlign.Center)

                    Spacer(Modifier.height(PUSpacing.sm))

                    // Primary action
                    PUButton(
                        label = primaryLabel,
                        fullWidth = true,
                        variant = if (variant == PUAlertVariant.Destructive) PUButtonVariant.Destructive else PUButtonVariant.Primary,
                        onClick = onPrimary
                    )

                    // Secondary action
                    if (secondaryLabel != null) {
                        PUButton(
                            label = secondaryLabel,
                            fullWidth = true,
                            variant = PUButtonVariant.Secondary,
                            onClick = { onSecondary?.invoke() ?: onDismiss() }
                        )
                    }
                }
            }
        }
    }
}

private val Int.sp get() = this.toFloat().let { androidx.compose.ui.unit.TextUnit(it, androidx.compose.ui.unit.TextUnitType.Sp) }
