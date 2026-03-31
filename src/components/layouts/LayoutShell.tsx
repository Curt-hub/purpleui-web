'use client';
import { useState } from 'react';
import { Sidebar } from '@/components/sidebar/Sidebar';

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="flex min-h-screen">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(c => !c)} />
      <div style={{
        flex: 1, minWidth: 0,
        marginLeft: collapsed ? 68 : 220,
        transition: 'margin-left 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
      }}>
        {children}
      </div>
    </div>
  );
}
