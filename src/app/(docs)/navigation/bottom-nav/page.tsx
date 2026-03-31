'use client';
import { useState } from 'react';
import { PUBottomNav, PUBottomNavTab } from '@/components/ui/PUBottomNav';
import { PhoneFrame } from '@/components/docs/PhoneFrame';
import { PropsTable } from '@/components/docs/PropsTable';
import { CodeBlock } from '@/components/docs/CodeBlock';

const swiftCode = `import SwiftUI

struct ContentView: View {
    @State private var activeTab: PUBottomNavTab = .explore

    var body: some View {
        VStack {
            Spacer()
            PUBottomNav(activeTab: $activeTab)
        }
        .ignoresSafeArea(edges: .bottom)
    }
}`;

const props = [
  { name: 'activeTab',   type: 'PUBottomNavTab',                default: 'undefined', description: 'explore | wallet | activity | profile' },
  { name: 'onTabChange', type: '(tab: PUBottomNavTab) => void', default: 'undefined', description: 'Called when a tab is tapped' },
];

function NavPreview({ activeTab }: { activeTab?: PUBottomNavTab }) {
  return (
    <div className="w-full rounded-xl border border-gray-200 overflow-hidden">
      <div className="px-4 py-2.5 bg-gray-50 border-b border-gray-200">
        <span className="text-xs font-medium text-gray-500">
          {activeTab ? `Active: ${activeTab}` : 'Default (no active tab)'}
        </span>
      </div>
      <PUBottomNav activeTab={activeTab} />
    </div>
  );
}

function DarkNavPreview({ activeTab }: { activeTab?: PUBottomNavTab }) {
  return (
    <div className="w-full rounded-xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.08)', background: '#011638' }}>
      <div className="px-4 py-2.5" style={{ background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <span className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.4)' }}>
          Dark — {activeTab ? `Active: ${activeTab}` : 'no active tab'}
        </span>
      </div>
      <PUBottomNav activeTab={activeTab} dark />
    </div>
  );
}

export default function BottomNavPage() {
  const [activeTab, setActiveTab] = useState<PUBottomNavTab>('explore');
  const [frameTab, setFrameTab] = useState<PUBottomNavTab>('explore');
  const [isDark, setIsDark] = useState(false);

  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Bottom Navigation</h1>
      <p className="text-gray-500 mb-8">
        The fixed navigation bar at the bottom of every screen. Gives users quick access to the
        app&apos;s four main sections: Explore, Wallet, Activity, and Profile.
      </p>

      {/* In Context */}
      <div className="mb-12">
        <h2 className="text-lg font-bold text-primary mb-5">In Context</h2>
        <PhoneFrame label="Bottom nav — anchored to screen bottom" dark={isDark} onToggle={() => setIsDark(d => !d)}>
          <div className="flex flex-col h-full">
            <div className="flex-1" />
            {/* Scale wrapper: PUBottomNav inner content is ~406px; scale to fit 300px screen */}
            <div style={{ position: 'relative', height: 65, overflow: 'hidden' }}>
              <div style={{ width: 406, position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%) scale(0.74)', transformOrigin: 'bottom center' }}>
                <PUBottomNav activeTab={frameTab} onTabChange={setFrameTab} dark={isDark} />
              </div>
            </div>
          </div>
        </PhoneFrame>
      </div>

      <h2 className="text-lg font-bold text-primary mb-3">Bottom Navigation</h2>
      <NavPreview />

      <h2 className="text-lg font-bold text-primary mt-12 mb-3">Active Tab</h2>
      <NavPreview activeTab="explore" />

      <h2 className="text-lg font-bold text-primary mt-12 mb-3">Dark Mode</h2>
      <div className="flex flex-col gap-4">
        <DarkNavPreview />
        <DarkNavPreview activeTab="explore" />
        <DarkNavPreview activeTab="wallet" />
      </div>

      <h2 className="text-lg font-bold text-primary mt-12 mb-3">Interactive</h2>
      <div
        className="w-full rounded-xl overflow-hidden my-4"
        style={isDark ? { border: '1px solid rgba(255,255,255,0.08)' } : { border: '1px solid rgb(229,231,235)' }}
      >
        <div
          className="px-4 py-2.5"
          style={isDark
            ? { background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.08)' }
            : { background: 'rgb(249,250,251)', borderBottom: '1px solid rgb(229,231,235)' }}
        >
          <span className="text-xs font-medium" style={{ color: isDark ? 'rgba(255,255,255,0.4)' : 'rgb(107,114,128)' }}>
            Active: {activeTab}
          </span>
        </div>
        <PUBottomNav activeTab={activeTab} onTabChange={setActiveTab} dark={isDark} />
      </div>

      <h2 className="text-base font-semibold text-gray-800 mt-12 mb-2">Props</h2>
      <PropsTable props={props} />

      <h2 className="text-base font-semibold text-gray-800 mt-12 mb-2">Swift Usage</h2>
      <CodeBlock code={swiftCode} title="PUBottomNav.swift" />
    </div>
  );
}
