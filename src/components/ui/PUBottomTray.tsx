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
            background: dark ? 'transparent' : '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            flexShrink: 0,
          }}
        >
          {/* Filter icon — exact path from Figma (viewBox 0 0 18 16.875) */}
          <svg width="18" height="17" viewBox="0 0 18 16.875" fill="none" aria-hidden="true">
            <path
              d="M0.84375 1.96875C0.376172 1.96875 0 2.34492 0 2.8125C0 3.28008 0.376172 3.65625 0.84375 3.65625H4.06758C4.42617 4.79883 5.49141 5.625 6.75 5.625C8.00859 5.625 9.07383 4.79883 9.43242 3.65625H17.1562C17.6238 3.65625 18 3.28008 18 2.8125C18 2.34492 17.6238 1.96875 17.1562 1.96875H9.43242C9.07383 0.826172 8.00859 0 6.75 0C5.49141 0 4.42617 0.826172 4.06758 1.96875H0.84375ZM0.84375 7.59375C0.376172 7.59375 0 7.96992 0 8.4375C0 8.90508 0.376172 9.28125 0.84375 9.28125H9.69258C10.0512 10.4238 11.1164 11.25 12.375 11.25C13.6336 11.25 14.6988 10.4238 15.0574 9.28125H17.1562C17.6238 9.28125 18 8.90508 18 8.4375C18 7.96992 17.6238 7.59375 17.1562 7.59375H15.0574C14.6988 6.45117 13.6336 5.625 12.375 5.625C11.1164 5.625 10.0512 6.45117 9.69258 7.59375H0.84375ZM0.84375 13.2188C0.376172 13.2188 0 13.5949 0 14.0625C0 14.5301 0.376172 14.9062 0.84375 14.9062H2.94258C3.30117 16.0488 4.36641 16.875 5.625 16.875C6.88359 16.875 7.94883 16.0488 8.30742 14.9062H17.1562C17.6238 14.9062 18 14.5301 18 14.0625C18 13.5949 17.6238 13.2188 17.1562 13.2188H8.30742C7.94883 12.0762 6.88359 11.25 5.625 11.25C4.36641 11.25 3.30117 12.0762 2.94258 13.2188H0.84375ZM5.625 15.1875C5.32663 15.1875 5.04048 15.069 4.82951 14.858C4.61853 14.647 4.5 14.3609 4.5 14.0625C4.5 13.7641 4.61853 13.478 4.82951 13.267C5.04048 13.056 5.32663 12.9375 5.625 12.9375C5.92337 12.9375 6.20952 13.056 6.42049 13.267C6.63147 13.478 6.75 13.7641 6.75 14.0625C6.75 14.3609 6.63147 14.647 6.42049 14.858C6.20952 15.069 5.92337 15.1875 5.625 15.1875ZM12.375 9.5625C12.0766 9.5625 11.7905 9.44397 11.5795 9.23299C11.3685 9.02202 11.25 8.73587 11.25 8.4375C11.25 8.13913 11.3685 7.85298 11.5795 7.64201C11.7905 7.43103 12.0766 7.3125 12.375 7.3125C12.6734 7.3125 12.9595 7.43103 13.1705 7.64201C13.3815 7.85298 13.5 8.13913 13.5 8.4375C13.5 8.73587 13.3815 9.02202 13.1705 9.23299C12.9595 9.44397 12.6734 9.5625 12.375 9.5625ZM5.625 2.8125C5.625 2.51413 5.74353 2.22798 5.95451 2.017C6.16548 1.80603 6.45163 1.6875 6.75 1.6875C7.04837 1.6875 7.33452 1.80603 7.54549 2.017C7.75647 2.22798 7.875 2.51413 7.875 2.8125C7.875 3.11087 7.75647 3.39702 7.54549 3.608C7.33452 3.81897 7.04837 3.9375 6.75 3.9375C6.45163 3.9375 6.16548 3.81897 5.95451 3.608C5.74353 3.39702 5.625 3.11087 5.625 2.8125Z"
              fill={dark ? 'rgba(255,255,255,0.5)' : '#7458FD'}
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
