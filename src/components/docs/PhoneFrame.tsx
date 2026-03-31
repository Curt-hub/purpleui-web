'use client';

interface PhoneFrameProps {
  children: React.ReactNode;
  label?: string;
  dark?: boolean;
  onToggle?: () => void;
}

export function PhoneFrame({ children, label, dark = false, onToggle }: PhoneFrameProps) {
  const screenBg = dark ? '#011638' : '#ffffff';

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Light / Dark toggle — above the frame */}
      {onToggle && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            background: '#f3f4f6',
            borderRadius: 9999,
            padding: 3,
          }}
        >
          <button
            onClick={() => { if (dark) onToggle(); }}
            style={{
              padding: '4px 14px',
              borderRadius: 9999,
              fontSize: 11,
              fontWeight: 500,
              background: !dark ? '#ffffff' : 'transparent',
              color: !dark ? '#111111' : '#9ca3af',
              boxShadow: !dark ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
              transition: 'all 0.15s ease',
              border: 'none',
              cursor: 'pointer',
              lineHeight: '1.4',
            }}
          >
            Light
          </button>
          <button
            onClick={() => { if (!dark) onToggle(); }}
            style={{
              padding: '4px 14px',
              borderRadius: 9999,
              fontSize: 11,
              fontWeight: 500,
              background: dark ? '#011638' : 'transparent',
              color: dark ? '#ffffff' : '#9ca3af',
              boxShadow: dark ? '0 1px 3px rgba(0,0,0,0.15)' : 'none',
              transition: 'all 0.15s ease',
              border: 'none',
              cursor: 'pointer',
              lineHeight: '1.4',
            }}
          >
            Dark
          </button>
        </div>
      )}

      {/* iPhone 15 Pro frame */}
      <div
        style={{
          width: 320,
          height: 580,
          background: '#0a0a0a',
          borderRadius: 44,
          padding: 10,
          boxShadow: '0px 2px 2px 0px rgba(0,0,0,0.03)',
          flexShrink: 0,
          position: 'relative',
        }}
      >
        {/* Side button highlight */}
        <div
          style={{
            position: 'absolute',
            right: -2,
            top: 100,
            width: 3,
            height: 80,
            background: 'rgba(255,255,255,0.15)',
            borderRadius: 2,
          }}
        />
        {/* Screen */}
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 36,
            overflow: 'hidden',
            backgroundColor: screenBg,
            position: 'relative',
            transition: 'background-color 0.2s ease',
          }}
        >
          {/* Dynamic Island */}
          <div
            style={{
              position: 'absolute',
              top: 12,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 120,
              height: 34,
              background: '#0a0a0a',
              borderRadius: 20,
              zIndex: 20,
            }}
          />
          {/* Screen content */}
          <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
            {children}
          </div>
        </div>
      </div>

      {label && (
        <span className="text-xs text-gray-400 font-medium tracking-wide mt-1">{label}</span>
      )}
    </div>
  );
}
