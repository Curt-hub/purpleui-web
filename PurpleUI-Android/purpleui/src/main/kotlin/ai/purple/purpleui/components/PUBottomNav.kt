package ai.purple.purpleui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.selection.selectableGroup
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import ai.purple.purpleui.icons.FA
import ai.purple.purpleui.icons.FAIcon
import ai.purple.purpleui.tokens.PUColors
import ai.purple.purpleui.tokens.PUTypography
import androidx.compose.foundation.clickable
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.runtime.remember
import androidx.compose.ui.draw.drawBehind
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.drawscope.DrawScope
import androidx.compose.ui.semantics.Role
import androidx.compose.ui.semantics.role
import androidx.compose.ui.semantics.semantics

enum class PUBottomNavTab(val label: String, val icon: String) {
    Explore("Explore",   FA.mapMarker),
    Wallet ("Wallet",    FA.wallet),
    Activity("Activity", FA.receipt),
    Profile("Profile",   FA.user)
}

/**
 * Fixed 4-tab navigation bar. Typically placed inside a `Scaffold` bottomBar slot.
 *
 * ```kotlin
 * Scaffold(
 *     bottomBar = {
 *         PUBottomNav(activeTab = activeTab) { activeTab = it }
 *     }
 * ) { padding -> screenContent(padding) }
 * ```
 */
@Composable
fun PUBottomNav(
    activeTab: PUBottomNavTab,
    modifier: Modifier = Modifier,
    dark: Boolean = false,
    onTabSelected: (PUBottomNavTab) -> Unit
) {
    val background  = if (dark) PUColors.backgroundNavy else PUColors.background
    val topBorder   = if (dark) Color.White.copy(alpha = 0.08f) else PUColors.backgroundElevated.copy(alpha = 0.8f)

    fun tabIconColor(tab: PUBottomNavTab): Color {
        val isActive = tab == activeTab
        return when {
            isActive && dark  -> PUColors.brand
            isActive          -> PUColors.onBackground
            dark              -> Color.White.copy(alpha = 0.35f)
            else              -> PUColors.onBackgroundTertiary
        }
    }

    Row(
        modifier = modifier
            .fillMaxWidth()
            .background(background)
            .drawBehind { drawTopBorder(topBorder) }
            .navigationBarsPadding()
            .padding(top = 12.dp)
            .selectableGroup(),
        horizontalArrangement = Arrangement.SpaceEvenly
    ) {
        PUBottomNavTab.entries.forEach { tab ->
            val iconColor = tabIconColor(tab)
            Column(
                modifier = Modifier
                    .weight(1f)
                    .clickable(
                        onClick = { onTabSelected(tab) },
                        interactionSource = remember { MutableInteractionSource() },
                        indication = null
                    )
                    .semantics { role = Role.Tab }
                    .padding(bottom = 8.dp),
                horizontalAlignment = Alignment.CenterHorizontally,
                verticalArrangement = Arrangement.spacedBy(4.dp)
            ) {
                FAIcon(tab.icon, size = 24.sp, color = iconColor, modifier = Modifier.size(24.dp))
                Text(tab.label, style = PUTypography.supporting, color = iconColor)
            }
        }
    }
}

private fun DrawScope.drawTopBorder(color: Color) {
    drawLine(
        color = color,
        start = Offset(0f, 0f),
        end = Offset(size.width, 0f),
        strokeWidth = 1.dp.toPx()
    )
}

private val Int.sp get() = this.toFloat().let { androidx.compose.ui.unit.TextUnit(it, androidx.compose.ui.unit.TextUnitType.Sp) }
private val Int.dp get() = androidx.compose.ui.unit.Dp(this.toFloat())
