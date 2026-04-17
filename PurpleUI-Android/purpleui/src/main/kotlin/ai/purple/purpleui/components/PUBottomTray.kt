package ai.purple.purpleui.components

import androidx.compose.animation.core.spring
import androidx.compose.foundation.background
import androidx.compose.foundation.gestures.detectVerticalDragGestures
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.input.pointer.pointerInput
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import ai.purple.purpleui.tokens.PUColors
import ai.purple.purpleui.tokens.PURadius
import ai.purple.purpleui.tokens.PUSpacing
import ai.purple.purpleui.tokens.PUTypography
import androidx.compose.animation.core.animateDpAsState

/**
 * Persistent bottom tray that drags and snaps between peek and expanded states.
 * Place in a `Box` aligned to `.bottomCenter` over map or content.
 *
 * ```kotlin
 * Box(modifier = Modifier.fillMaxSize()) {
 *     MapContent()
 *     PUBottomTray(
 *         title = "34 WiFi nearby",
 *         modifier = Modifier.align(Alignment.BottomCenter)
 *     ) { listItems() }
 * }
 * ```
 */
@Composable
fun PUBottomTray(
    modifier: Modifier = Modifier,
    title: String? = null,
    dark: Boolean = false,
    peekHeight: Dp = 160.dp,
    expandHeight: Dp = 460.dp,
    defaultExpanded: Boolean = false,
    content: @Composable ColumnScope.() -> Unit
) {
    val background  = if (dark) Color(0xFF0A2048) else PUColors.background
    val handleColor = if (dark) Color.White.copy(alpha = 0.15f) else PUColors.loaderTrack
    val titleColor  = if (dark) Color.White else PUColors.onBackground

    var isExpanded by remember { mutableStateOf(defaultExpanded) }
    var dragDelta by remember { mutableFloatStateOf(0f) }

    val targetHeight = if (isExpanded) expandHeight else peekHeight
    val rawHeight = (targetHeight.value - dragDelta / 3f).coerceIn(peekHeight.value, expandHeight.value).dp
    val displayHeight by animateDpAsState(
        targetValue = rawHeight,
        animationSpec = spring(dampingRatio = 0.85f, stiffness = 400f),
        label = "trayHeight"
    )

    val topShape = RoundedCornerShape(topStart = PURadius.md, topEnd = PURadius.md)

    Column(
        modifier = modifier
            .fillMaxWidth()
            .height(displayHeight)
            .shadow(elevation = 8.dp, shape = topShape, clip = false)
            .clip(topShape)
            .background(background)
            .pointerInput(isExpanded) {
                detectVerticalDragGestures(
                    onDragEnd = {
                        val mid = (expandHeight.value - peekHeight.value) / 2f
                        isExpanded = if (dragDelta < -mid) true
                        else if (dragDelta > mid) false
                        else isExpanded
                        dragDelta = 0f
                    },
                    onDragCancel = { dragDelta = 0f },
                    onVerticalDrag = { _, dragAmount -> dragDelta += dragAmount }
                )
            },
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        // Drag handle
        Spacer(modifier = Modifier.height(15.dp))
        Box(
            modifier = Modifier
                .width(60.dp)
                .height(5.dp)
                .clip(RoundedCornerShape(4.dp))
                .background(handleColor)
        )
        Spacer(modifier = Modifier.height(10.dp))

        // Title
        if (title != null) {
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = PUSpacing.xl, bottom = PUSpacing.sm),
            ) {
                Text(title, style = PUTypography.section, color = titleColor)
            }
        }

        // Body content
        content()
    }
}

private fun Modifier.padding(horizontal: Dp = 0.dp, bottom: Dp = 0.dp) =
    this.padding(start = horizontal, end = horizontal, bottom = bottom)
