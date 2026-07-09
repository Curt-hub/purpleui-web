'use client';
import { useState, useEffect } from 'react';
import { Sidebar } from '@/components/sidebar/Sidebar';
import { PurpleLogo } from '@/components/ui/PurpleLogo';

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <div className="flex min-h-screen">
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-[150] lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <Sidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed(c => !c)}
        mobileOpen={mobileOpen}
        onNavClick={() => setMobileOpen(false)}
      />

      <div style={{
        flex: 1, minWidth: 0,
        marginLeft: collapsed ? 68 : 220,
        transition: 'margin-left 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
      }} className="lg:ml-[var(--sidebar-w)] max-lg:!ml-0">

        {/* Mobile top bar */}
        <div className="lg:hidden sticky top-0 z-[100] flex items-center gap-3 px-4 h-14 bg-white border-b border-black/[0.06]">
          <button
            onClick={() => setMobileOpen(o => !o)}
            aria-label="Open navigation"
            className="flex flex-col justify-center gap-[5px] w-8 h-8 p-1"
          >
            <span className="block h-[1.5px] w-5 bg-[#011638] rounded-full" />
            <span className="block h-[1.5px] w-5 bg-[#011638] rounded-full" />
            <span className="block h-[1.5px] w-5 bg-[#011638] rounded-full" />
          </button>
          <PurpleLogo variant="dark-purple" width={90} />
          <span style={{
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 700,
            fontSize: 18,
            color: 'transparent',
            WebkitTextStroke: '1.5px #011638',
            lineHeight: 1,
            display: 'inline-block',
            transform: 'translateY(0.05em)',
          }}>UI</span>
        </div>

        {children}
      </div>
    </div>
  );
}
