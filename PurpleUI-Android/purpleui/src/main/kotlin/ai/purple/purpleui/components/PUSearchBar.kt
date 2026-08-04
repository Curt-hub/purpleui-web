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
import androidx.compose.ui.semantics.Role
import androidx.compose.ui.semantics.contentDescription
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.text.input.ImeAction
import androidx.compose.ui.text.style.TextOverflow
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
    val background  = if (dark) PUColors.backgroundElevatedNavy else PUColors.inputBackground
    val textColor   = if (dark) Color.White else PUColors.onBackground
    val hintColor   = if (dark) Color.White.copy(alpha = 0.35f) else PUColors.onBackgroundTertiary
    val iconColor   = if (dark) Color.White.copy(alpha = 0.6f) else PUColors.onBackgroundSecondary
    val borderColor = if (dark) Color.White.copy(alpha = 0.08f) else PUColors.border

    var isFocused by remember { mutableStateOf(false) }
    val activeBorder = if (isFocused) PUColors.borderFocus else borderColor

    // Single source of truth for "is the filter button showing" - a non-null lambda rather
    // than a plain Boolean, so the one null-check below both gates the button and lets Kotlin
    // smart-cast `onFilterClick` to non-null at its only call site (`clickable(onClick = ...)`).
    val filterClick: (() -> Unit)? = onFilterClick.takeIf { showFilter }

    // The filter button needs a 48dp minimum touch target (Material a11y guidance), wider
    // than its 16sp glyph. It's laid out as a Box overlaid on top of the Row (see below)
    // rather than as a Row child, so it doesn't force the text field to share a Row slot
    // with a 48dp-wide sibling - the Compose equivalent of iOS's `.contentShape(Rectangle())`
    // (expand the hit target without necessarily expanding what a plain inline layout would
    // cost). But the Row's own trailing padding here is reserved at the *same* 48dp as the
    // overlay's touch target, not less: reserving anything smaller leaves a dead zone where
    // the overlay's hit-test bounds (48dp) extend past the Row's reserved space and overlap
    // the text field's own weighted content region - the overlay is declared after the Row,
    // so it would silently win taps meant for the text (e.g. placing a cursor at the end of
    // a long query). A slightly narrower text field is preferable to a dead zone.
    val trailingInset = if (filterClick != null) 48.dp else PUSpacing.lg

    Box(modifier = modifier.fillMaxWidth()) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .height(48.dp)
                .clip(RoundedCornerShape(PURadius.full))
                .background(background)
                .border(1.dp, activeBorder, RoundedCornerShape(PURadius.full))
                .padding(start = PUSpacing.lg, end = trailingInset),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.spacedBy(PUSpacing.sm)
        ) {
            FAIcon(FA.search, size = 16.sp, color = iconColor, decorative = true)

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
                        Text(
                            placeholder,
                            style = PUTypography.body,
                            color = hintColor,
                            maxLines = 1,
                            overflow = TextOverflow.Ellipsis
                        )
                    }
                    inner()
                }
            )
        }

        if (filterClick != null) {
            Box(
                modifier = Modifier
                    .align(Alignment.CenterEnd)
                    .size(48.dp)
                    .clickable(onClick = filterClick, role = Role.Button)
                    .semantics { contentDescription = "Filter" },
                contentAlignment = Alignment.Center
            ) {
                FAIcon(FA.sliders, size = 16.sp, color = iconColor, decorative = true)
            }
        }
    }
}

private val Int.sp get() = this.toFloat().let { androidx.compose.ui.unit.TextUnit(it, androidx.compose.ui.unit.TextUnitType.Sp) }
