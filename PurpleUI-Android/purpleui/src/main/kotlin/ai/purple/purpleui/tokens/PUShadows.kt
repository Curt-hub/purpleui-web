package ai.purple.purpleui.tokens

import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.Shape
import androidx.compose.ui.unit.dp

/**
 * Shadow helpers matching the Purple UI named shadow tokens.
 *
 * `tokens.json` ships these as CSS box-shadow strings
 * (`offsetX offsetY blurRadius spreadRadius color`). Compose's `Modifier.shadow`
 * is a genuinely different rendering model - it takes a single non-directional
 * `elevation` plus `ambientColor`/`spotColor`, not an offset/blur/spread quad -
 * so there is no exact 1:1 conversion.
 *
 * Each token below is approximated from its web source value (see the comment
 * on each entry for the original CSS string), the same way
 * `purpleui-react-native/src/tokens/shadows.ts` documents its RN conversion.
 * The `elevation` chosen for each token mirrors RN's own `elevation` field for
 * the same named shadow, so the visual weight stays roughly consistent across
 * platforms rather than each platform inventing its own scale independently.
 * `ambientColor`/`spotColor` alpha is the source rgba opacity converted to a
 * 0-255 byte (e.g. 0.10 -> 0x1A). `topX` shadows (cast upward, e.g.
 * trays/sheets) reuse the same colors as `bottomX` - Compose has no
 * directional light source to flip for an "upward" shadow. `tilesHover` is
 * the one token with a colored (brand purple) shadow rather than black -
 * kept in the brand hue rather than approximated to grey.
 */
object PUShadows {
    /** bottomA — '0px 2px 2px 0px rgba(0,0,0,0.03)' — subtle card lift */
    fun Modifier.shadowBottomA(shape: Shape) =
        this.shadow(elevation = 1.dp, shape = shape, ambientColor = Color(0x08000000), spotColor = Color(0x08000000))

    /** bottomB — '0px 2px 2px 0px rgba(0,0,0,0.06)' — elevated card */
    fun Modifier.shadowBottomB(shape: Shape) =
        this.shadow(elevation = 1.dp, shape = shape, ambientColor = Color(0x0F000000), spotColor = Color(0x0F000000))

    /** bottomC — '0px 2px 10px 0px rgba(0,0,0,0.05)' — floating card / button */
    fun Modifier.shadowBottomC(shape: Shape) =
        this.shadow(elevation = 3.dp, shape = shape, ambientColor = Color(0x0D000000), spotColor = Color(0x0D000000))

    /** bottomD — '0px 2px 15px 0px rgba(0,0,0,0.10)' — heaviest bottom lift */
    fun Modifier.shadowBottomD(shape: Shape) =
        this.shadow(elevation = 4.dp, shape = shape, ambientColor = Color(0x1A000000), spotColor = Color(0x1A000000))

    /** topA — '0px -2px 2px 0px rgba(0,0,0,0.03)' — tray / nav bottom sheet */
    fun Modifier.shadowTopA(shape: Shape) =
        this.shadow(elevation = 1.dp, shape = shape, ambientColor = Color(0x08000000), spotColor = Color(0x08000000))

    /** topB — '0px -2px 2px 0px rgba(0,0,0,0.06)' */
    fun Modifier.shadowTopB(shape: Shape) =
        this.shadow(elevation = 1.dp, shape = shape, ambientColor = Color(0x0F000000), spotColor = Color(0x0F000000))

    /** topC — '0px -2px 2px 0px rgba(0,0,0,0.10)' */
    fun Modifier.shadowTopC(shape: Shape) =
        this.shadow(elevation = 1.dp, shape = shape, ambientColor = Color(0x1A000000), spotColor = Color(0x1A000000))

    /** topD — '0px -2px 15px 0px rgba(0,0,0,0.10)' — heaviest top lift */
    fun Modifier.shadowTopD(shape: Shape) =
        this.shadow(elevation = 4.dp, shape = shape, ambientColor = Color(0x1A000000), spotColor = Color(0x1A000000))

    /** sideNav — '4px 0px 15px 0px rgba(0,0,0,0.20)' — side navigation panel */
    fun Modifier.shadowSideNav(shape: Shape) =
        this.shadow(elevation = 6.dp, shape = shape, ambientColor = Color(0x33000000), spotColor = Color(0x33000000))

    /** tilesActive — '0px 10px 15px -3px rgba(0,0,0,0.10)' — active/selected tile */
    fun Modifier.shadowTilesActive(shape: Shape) =
        this.shadow(elevation = 4.dp, shape = shape, ambientColor = Color(0x1A000000), spotColor = Color(0x1A000000))

    /** tilesHover — '0px 10px 15px -3px rgba(116,88,253,0.40)' — hovered tile, brand-coloured glow */
    fun Modifier.shadowTilesHover(shape: Shape) =
        this.shadow(elevation = 4.dp, shape = shape, ambientColor = Color(0x667458FD), spotColor = Color(0x667458FD))
}
