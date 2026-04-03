'use client';
import { useRef, useEffect } from 'react';
import Map, { type MapRef } from 'react-map-gl/mapbox';

const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

// Map styles — matches the light/dark surfaces used across PurpleUI
export const MAP_STYLE_LIGHT = 'mapbox://styles/mapbox/streets-v12';
export const MAP_STYLE_DARK  = 'mapbox://styles/mapbox/navigation-night-v1';

// Neutral dark road colour to replace orange/red navigation highlights
const NEUTRAL_ROAD = '#3b3b52';

// Layers in navigation-night-v1 that produce orange/red road lines
const ORANGE_RED_KEYWORDS = ['motorway', 'trunk', 'primary'];

function neutralizeNavColors(map: mapboxgl.Map) {
  const layers = map.getStyle().layers as Array<{ id: string; type: string }>;
  layers.forEach(layer => {
    if (layer.type !== 'line') return;
    const id = layer.id.toLowerCase();
    if (ORANGE_RED_KEYWORDS.some(kw => id.includes(kw))) {
      try { map.setPaintProperty(layer.id, 'line-color', NEUTRAL_ROAD); } catch { }
    }
  });
}

interface PUMapProps {
  dark?: boolean;
  /** Initial longitude — defaults to central London (Explore default) */
  longitude?: number;
  /** Initial latitude */
  latitude?: number;
  /** Initial zoom level */
  zoom?: number;
  /** Full width/height of the container */
  style?: React.CSSProperties;
}

export function PUMap({
  dark = false,
  longitude = -0.1276,
  latitude  = 51.5074,
  zoom      = 13,
  style,
}: PUMapProps) {
  const mapRef = useRef<MapRef>(null);

  // Re-runs whenever dark changes; listens to style.load so it fires on every style swap
  useEffect(() => {
    if (!dark) return;
    const map = mapRef.current?.getMap();
    if (!map) return;

    const apply = () => neutralizeNavColors(map);

    if (map.isStyleLoaded()) apply();
    map.on('style.load', apply);
    return () => { map.off('style.load', apply); };
  }, [dark]);

  return (
    <Map
      ref={mapRef}
      mapboxAccessToken={TOKEN}
      initialViewState={{ longitude, latitude, zoom }}
      mapStyle={dark ? MAP_STYLE_DARK : MAP_STYLE_LIGHT}
      style={{ width: '100%', height: '100%', ...style }}
      attributionControl={false}
      reuseMaps
    />
  );
}
