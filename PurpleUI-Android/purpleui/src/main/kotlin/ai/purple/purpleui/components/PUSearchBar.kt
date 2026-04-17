package ai.purple.purpleui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.BasicTextField
import androidx.compose.foundation.text.KeyboardActions
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material3.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.focus.onFocusChanged
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.SolidColor
import androidx.compose.ui.text.input.ImeAction
import androidx.compose.ui.unit.dp
import ai.purple.purpleui.icons.FA
import ai.purple.purpleui.icons.FAIcon
import ai.purple.purpleui.tokens.PUColors
import ai.purple.purpleui.tokens.PURadius
import ai.purple.purpleui.tokens.PUSpacing
import ai.purple.purpleui.tokens.PUTypography

/**
 * Controlled search input with optional filter button.
 *
 * ```kotlin
 * var query by remember { mutableStateOf("") }
 * PUSearchBar(
 *     value = query,
 *     onValueChange = { query = it },
 *     placeholder = "Search WiFi spots…"
 * )
 * ```
 */
@Composable
fun PUSearchBar(
    value: String,
    onValueChange: (String) -> Unit,
    modifier: Modifier = Modifier,
    placeholder: String = "Search…",
    showFilter: Boolean = false,
    dark: Boolean = false,
    onFilterClick: (() -> Unit)? = null,
    onSearch: ((String) -> Unit)? = null
) {
    val background  = if (dark) Color(0xFF0A2048) else PUColors.inputBackground
    val textColor   = if (dark) Color.White else PUColors.onBackground
    val hintColor   = if (dark) Color.White.copy(alpha = 0.35f) else PUColors.onBackgroundTertiary
    val iconColor   = if (dark) Color.White.copy(alpha = 0.6f) else PUColors.onBackgroundSecondary
    val borderColor = if (dark) Color.White.copy(alpha = 0.08f) else PUColors.border

    var isFocused by remember { mutableStateOf(false) }
    val activeBorder = if (isFocused) PUColors.borderFocus else borderColor

    Row(
        modifier = modifier
            .fillMaxWidth()
            .height(48.dp)
            .clip(RoundedCornerShape(PURadius.full))
            .background(background)
            .border(1.dp, activeBorder, RoundedCornerShape(PURadius.full))
            .padding(horizontal = PUSpacing.lg),
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.spacedBy(PUSpacing.sm)
    ) {
        FAIcon(FA.search, size = 16.sp, color = iconColor)

        BasicTextField(
            value = value,
            onValueChange = onValueChange,
            modifier = Modifier
                .weight(1f)
                .onFocusChanged { isFocused = it.isFocused },
            textStyle = PUTypography.body.copy(color = textColor),
            cursorBrush = SolidColor(PUColors.brand),
            singleLine = true,
            keyboardOptions = KeyboardOptions(imeAction = ImeAction.Search),
            keyboardActions = KeyboardActions(onSearch = { onSearch?.invoke(value) }),
            decorationBox = { inner ->
                if (value.isEmpty()) {
                    Text(placeholder, style = PUTypography.body, color = hintColor)
                }
                inner()
            }
        )

        if (showFilter && onFilterClick != null) {
            FAIcon(
                FA.sliders,
                size = 16.sp,
                color = iconColor,
                modifier = Modifier.clickable(onClick = onFilterClick)
            )
        }
    }
}

private val Int.sp get() = this.toFloat().let { androidx.compose.ui.unit.TextUnit(it, androidx.compose.ui.unit.TextUnitType.Sp) }
