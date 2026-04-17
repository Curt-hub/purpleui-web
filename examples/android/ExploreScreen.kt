package com.example.purpleuiexample

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material3.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import ai.purple.purpleui.components.*
import ai.purple.purpleui.icons.FA
import ai.purple.purpleui.icons.FAIcon
import ai.purple.purpleui.tokens.*

/**
 * Explore tab — search bar + bottom tray + map pins over a simulated map background.
 *
 * Demonstrates the main Purple app map flow:
 * - [PUSearchBar] at top for location / query input
 * - [PUFloatingButton] for centering on current location
 * - [PUBottomTray] listing nearby WiFi spots
 * - [PUToastHost] for ephemeral feedback
 */
@Composable
fun ExploreScreen(modifier: Modifier = Modifier) {
    var searchQuery by remember { mutableStateOf("") }
    var selectedPin by remember { mutableStateOf<Int?>(null) }
    var showToast by remember { mutableStateOf(false) }

    PUToastHost(
        isVisible = showToast,
        message = "Centred on your location",
        style = PUToastStyle.Info,
        onDismiss = { showToast = false },
        modifier = modifier.fillMaxSize()
    ) {
        Box(modifier = Modifier.fillMaxSize()) {

            // ── Simulated map background ──────────────────────────────
            MapCanvas(
                selectedPin = selectedPin,
                onPinTap = { i -> selectedPin = if (selectedPin == i) null else i },
                modifier = Modifier.fillMaxSize()
            )

            // ── Search bar ────────────────────────────────────────────
            PUSearchBar(
                value = searchQuery,
                onValueChange = { searchQuery = it },
                placeholder = "Search WiFi spots…",
                showFilter = true,
                modifier = Modifier
                    .fillMaxWidth()
                    .align(Alignment.TopCenter)
                    .statusBarsPadding()
                    .padding(horizontal = PUSpacing.lg, vertical = PUSpacing.lg)
            )

            // ── Floating locate button ────────────────────────────────
            PUFloatingButton(
                icon = PUFloatingButtonIcon.Navigate,
                dark = true,
                modifier = Modifier
                    .align(Alignment.BottomEnd)
                    .padding(end = PUSpacing.lg, bottom = 280.dp),
                onClick = { showToast = true }
            )

            // ── Bottom tray ───────────────────────────────────────────
            PUBottomTray(
                title = "34 WiFi nearby",
                dark = true,
                peekHeight = 200.dp,
                expandHeight = 480.dp,
                modifier = Modifier.align(Alignment.BottomCenter)
            ) {
                LazyColumn(modifier = Modifier.fillMaxSize()) {
                    items(8) { i -> TrayRow(index = i) }
                }
            }
        }
    }
}

// ---------------------------------------------------------------------------

@Composable
private fun MapCanvas(
    selectedPin: Int?,
    onPinTap: (Int) -> Unit,
    modifier: Modifier = Modifier
) {
    val pins = listOf(
        0.25f to 0.35f,
        0.55f to 0.25f,
        0.70f to 0.50f,
        0.40f to 0.60f
    )

    Box(modifier = modifier.background(Color(0xFF1A2744))) {
        BoxWithConstraints(modifier = Modifier.fillMaxSize()) {
            val w = maxWidth
            val h = maxHeight
            pins.forEachIndexed { i, (xFrac, yFrac) ->
                val variant = if (i == 0) PUFloatingButtonVariant.Icon else PUFloatingButtonVariant.Pill
                Box(
                    modifier = Modifier
                        .offset(x = w * xFrac - 15.dp, y = h * yFrac - 15.dp)
                        .size(30.dp)
                        .clip(CircleShape)
                        .background(
                            if (selectedPin == i) PUColors.brand else PUColors.brand.copy(alpha = 0.6f)
                        )
                        .clickable { onPinTap(i) },
                    contentAlignment = Alignment.Center
                ) {
                    FAIcon(FA.wifi, size = 14.sp, color = Color.White)
                }
            }
        }
    }
}

@Composable
private fun TrayRow(index: Int) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .padding(horizontal = PUSpacing.xl, vertical = PUSpacing.md),
        horizontalArrangement = Arrangement.spacedBy(PUSpacing.md),
        verticalAlignment = Alignment.CenterVertically
    ) {
        Box(
            modifier = Modifier
                .size(40.dp)
                .clip(CircleShape)
                .background(PUColors.brand.copy(alpha = 0.2f)),
            contentAlignment = Alignment.Center
        ) {
            FAIcon(FA.wifi, size = 16.sp, color = PUColors.brand)
        }

        Column(verticalArrangement = Arrangement.spacedBy(2.dp), modifier = Modifier.weight(1f)) {
            Text("WiFi Spot ${index + 1}", style = PUTypography.bodyBold, color = Color.White)
            Text("${(10..500).random()}m away", style = PUTypography.supporting, color = Color.White.copy(alpha = 0.5f))
        }

        Text("Free", style = PUTypography.supporting, color = PUColors.brand)
    }
}

private val Int.sp get() = this.toFloat().let { androidx.compose.ui.unit.TextUnit(it, androidx.compose.ui.unit.TextUnitType.Sp) }
private val Float.dp get() = androidx.compose.ui.unit.Dp(this)
