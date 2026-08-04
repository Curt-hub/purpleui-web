import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
/**
 * First-slice PUSearchBar for React Native.
 *
 * Colours/sizing follow specs/PUSearchBar.json. One flagged spec-vs-web
 * disagreement: the spec documents a default `placeholder` of
 * "Search networks…", but web's actual PUSearchBar.tsx defaults to plain
 * "Search" - this component follows the spec's default (see the build
 * report).
 *
 * Both web and iOS/Android currently ship the filter button unlabeled with
 * a tiny hit area - this component adds `accessibilityLabel="Filter"` (per
 * specs/PUSearchBar.json's own accessibility note) and a `hitSlop` so the
 * pressable target is >=44pt even though the visible glyph is smaller, so
 * RN doesn't repeat that gap.
 *
 * Search/filter icon glyphs are dependency-free RN-primitive placeholders
 * (see internal/PUSearchGlyph.tsx, internal/PUSlidersGlyph.tsx) standing in
 * for the Icons foundation's still-unshipped RN answer - same reasoning as
 * PUButton/PUIconButton/PUToast.
 */
export interface PUSearchBarProps {
    /** Controlled input value. */
    value: string;
    onChange: (value: string) => void;
    /** @default 'Search networks…' */
    placeholder?: string;
    /** Filter button tap handler - omit to hide the filter button. */
    onFilterPress?: () => void;
    /** Dark surface - navy background, white text, white search icon. @default false */
    dark?: boolean;
    style?: StyleProp<ViewStyle>;
    testID?: string;
}
export declare function PUSearchBar({ value, onChange, placeholder, onFilterPress, dark, style, testID, }: PUSearchBarProps): React.JSX.Element;
