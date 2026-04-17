package ai.purple.purpleui.components

import androidx.compose.animation.core.*
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.layout.size
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.geometry.Size
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import ai.purple.purpleui.tokens.PUColors

enum class PULoaderVariant { Light, Dark }

/**
 * Spinning arc loader.
 * - `Light` — navy arc on grey track (use on light / white backgrounds)
 * - `Dark`  — brand purple arc (use on dark / navy backgrounds)
 *
 * ```kotlin
 * PULoader(variant = PULoaderVariant.Light)
 * ```
 */
@Composable
fun PULoader(
    modifier: Modifier = Modifier,
    variant: PULoaderVariant = PULoaderVariant.Light,
    size: Dp = 40.dp,
    strokeWidth: Dp = 3.5.dp
) {
    val trackColor = if (variant == PULoaderVariant.Light) PUColors.loaderTrack else Color.White.copy(alpha = 0.12f)
    val arcColor   = if (variant == PULoaderVariant.Light) PUColors.backgroundNavy else PUColors.brand

    val infiniteTransition = rememberInfiniteTransition(label = "loader")
    val rotation by infiniteTransition.animateFloat(
        initialValue = 0f,
        targetValue = 360f,
        animationSpec = infiniteRepeatable(
            animation = tween(800, easing = LinearEasing),
            repeatMode = RepeatMode.Restart
        ),
        label = "rotation"
    )

    Canvas(modifier = modifier.size(size)) {
        val stroke = Stroke(width = strokeWidth.toPx(), cap = StrokeCap.Round)
        val inset  = strokeWidth.toPx() / 2f
        val arcSize = Size(this.size.width - inset * 2, this.size.height - inset * 2)
        val topLeft = Offset(inset, inset)

        // Track
        drawArc(color = trackColor, startAngle = 0f, sweepAngle = 360f, useCenter = false, topLeft = topLeft, size = arcSize, style = stroke)
        // Spinning arc
        drawArc(color = arcColor, startAngle = rotation, sweepAngle = 260f, useCenter = false, topLeft = topLeft, size = arcSize, style = stroke)
    }
}
