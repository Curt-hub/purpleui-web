'use client';
import { motion, useMotionValue, animate } from 'framer-motion';

interface PUBottomTrayProps {
  title?: string;
  children: React.ReactNode;
  dark?: boolean;
  peekHeight?: number;
  expandHeight?: number;
  defaultExpanded?: boolean;
}

export function PUBottomTray({
  title,
  children,
  dark = false,
  peekHeight = 160,
  expandHeight = 460,
  defaultExpanded = false,
}: PUBottomTrayProps) {
  const yOffset = expandHeight - peekHeight;
  const y = useMotionValue(defaultExpanded ? 0 : yOffset);

  const snapTo = (toExpanded: boolean) => {
    animate(y, toExpanded ? 0 : yOffset, {
      type: 'spring',
      stiffness: 400,
      damping: 35,
    });
  };

  return (
    <motion.div
      drag="y"
      dragConstraints={{ top: 0, bottom: yOffset }}
      dragElastic={0}
      dragMomentum={false}
      style={{
        y,
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: expandHeight + 20,
        zIndex: 40,
        borderRadius: '12px 12px 0 0',
        background: dark ? '#0a2048' : '#ffffff',
        boxShadow: '0px -2px 15px rgba(0,0,0,0.1)',
        touchAction: 'none',
        userSelect: 'none',
        display: 'flex',
        flexDirection: 'column',
      }}
      onDragEnd={(_, info) => {
        const cur = y.get();
        const mid = yOffset / 2;
        if (info.velocity.y > 200 || (cur > mid && info.velocity.y >= -200)) {
          snapTo(false);
        } else {
          snapTo(true);
        }
      }}
    >
      {/* Drag handle — 35px tall, centred */}
      <div
        style={{
          height: 35,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'grab',
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: 104,
            height: 7,
            borderRadius: 9999,
            background: dark ? 'rgba(255,255,255,0.15)' : '#DDDDDF',
          }}
        />
      </div>

      {/* Header row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingLeft: 20,
          paddingRight: 16,
          paddingBottom: 12,
          flexShrink: 0,
        }}
      >
        <h2
          style={{
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 700,
            fontSize: 16,
            color: dark ? '#ffffff' : '#000000',
            margin: 0,
          }}
        >
          {title ?? ''}
        </h2>
        <button
          aria-label="Filter"
          style={{
            width: 40,
            height: 40,
            borderRadius: 9999,
            border: '1.5px solid #EFF0F0',
            background: 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            flexShrink: 0,
          }}
        >
          {/* Sliders / filter icon */}
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M1.5 4h13M4 8h8M6.5 12h3"
              stroke={dark ? 'rgba(255,255,255,0.5)' : '#888888'}
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {/* Scrollable body */}
      <div style={{ overflowY: 'auto', flex: 1 }}>
        {children}
      </div>
    </motion.div>
  );
}
