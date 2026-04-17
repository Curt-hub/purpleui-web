package com.example.purpleuiexample

import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Scaffold
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import ai.purple.purpleui.components.PUBottomNav
import ai.purple.purpleui.components.PUBottomNavTab

/**
 * Root screen — wires [PUBottomNav] to four destination composables.
 *
 * Mirrors the Purple app navigation structure: Explore, Wallet, Activity, Profile.
 *
 * Drop this into your NavHost or use it directly as the top-level composable
 * inside `setContent { }` in your Activity.
 */
@Composable
fun RootScreen() {
    var activeTab by remember { mutableStateOf(PUBottomNavTab.Explore) }

    Scaffold(
        modifier = Modifier.fillMaxSize(),
        bottomBar = {
            PUBottomNav(activeTab = activeTab) { activeTab = it }
        }
    ) { innerPadding ->
        when (activeTab) {
            PUBottomNavTab.Explore  -> ExploreScreen(modifier = Modifier.padding(innerPadding))
            PUBottomNavTab.Wallet   -> PlaceholderScreen("Wallet",   modifier = Modifier.padding(innerPadding))
            PUBottomNavTab.Activity -> PlaceholderScreen("Activity", modifier = Modifier.padding(innerPadding))
            PUBottomNavTab.Profile  -> PlaceholderScreen("Profile",  modifier = Modifier.padding(innerPadding))
        }
    }
}

// ---------------------------------------------------------------------------

@Composable
private fun PlaceholderScreen(title: String, modifier: Modifier = Modifier) {
    androidx.compose.foundation.layout.Box(
        modifier = modifier.fillMaxSize(),
        contentAlignment = androidx.compose.ui.Alignment.Center
    ) {
        androidx.compose.material3.Text(
            text = title,
            style = ai.purple.purpleui.tokens.PUTypography.title,
            color = ai.purple.purpleui.tokens.PUColors.onBackground
        )
    }
}
