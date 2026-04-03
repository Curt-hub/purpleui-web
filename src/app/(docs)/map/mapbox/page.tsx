'use client';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { PhoneFrame } from '@/components/docs/PhoneFrame';
import { PropsTable } from '@/components/docs/PropsTable';
import { CodeBlock } from '@/components/docs/CodeBlock';

// Load PUMap client-side only — mapbox-gl requires a browser environment
const PUMap = dynamic(
  () => import('@/components/ui/PUMap').then(m => m.PUMap),
  { ssr: false, loading: () => <div style={{ width: '100%', height: '100%', background: '#EEF0F3' }} /> }
);

const props = [
  { name: 'dark',      type: 'boolean', default: 'false',     description: 'Switches between streets-v12 (light) and dark-v11 Mapbox styles' },
  { name: 'longitude', type: 'number',  default: '-0.1276',   description: 'Initial map centre longitude' },
  { name: 'latitude',  type: 'number',  default: '51.5074',   description: 'Initial map centre latitude' },
  { name: 'zoom',      type: 'number',  default: '13',        description: 'Initial zoom level' },
  { name: 'style',     type: 'CSSProperties', default: '—',   description: 'Additional styles applied to the map container' },
];

const swiftCode = `import MapboxMaps

struct ExploreMapView: UIViewRepresentable {
    @Binding var isDark: Bool

    func makeUIView(context: Context) -> MapView {
        let options = MapInitOptions(
            styleURI: isDark ? .dark : .light
        )
        let mapView = MapView(frame: .zero, mapInitOptions: options)
        mapView.mapboxMap.setCamera(to: CameraOptions(
            center: CLLocationCoordinate2D(latitude: 51.5074, longitude: -0.1276),
            zoom: 13
        ))
        return mapView
    }

    func updateUIView(_ mapView: MapView, context: Context) {
        mapView.mapboxMap.loadStyle(isDark ? .dark : .light)
    }
}`;

export default function MapboxPage() {
  const [isDark, setIsDark] = useState(false);

  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Mapbox Map</h1>
      <p className="text-gray-500 mb-8">
        The interactive map powering the Explore screen. Built on Mapbox GL JS via react-map-gl.
        Supports light and dark styles with pan, zoom, and gesture controls.
      </p>

      {/* ── In Context ── */}
      <div className="mb-12">
        <h2 className="text-lg font-bold text-primary mb-5">In Context</h2>
        <PhoneFrame label="Mapbox map — light and dark" dark={isDark} onToggle={() => setIsDark(d => !d)}>
          <PUMap dark={isDark} style={{ width: 300, height: 560 }} />
        </PhoneFrame>
      </div>

      {/* ── Props ── */}
      <h2 className="text-base font-semibold text-gray-800 mb-2">Props</h2>
      <PropsTable props={props} />

      {/* ── Swift ── */}
      <h2 className="text-base font-semibold text-gray-800 mt-10 mb-2">Swift Usage</h2>
      <CodeBlock code={swiftCode} title="ExploreMapView.swift" />
    </div>
  );
}
