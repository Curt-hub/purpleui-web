'use client';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWifi } from '@fortawesome/free-solid-svg-icons';

export type PUMapPinVariant = 'teardrop' | 'dot';

interface PUMapPinProps {
  variant?: PUMapPinVariant;
  dark?: boolean;
  selected?: boolean;
  onClick?: () => void;
}

const BLUE   = '#045DEC';
const PURPLE = '#7458FD';

// Spring — bouncy upward lift on select, smooth return on deselect
const springTransition = { type: 'spring' as const, stiffness: 480, damping: 18, mass: 0.7 };

export function PUMapPin({
  variant = 'teardrop',
  dark = false,
  selected = false,
  onClick,
}: PUMapPinProps) {
  const color        = selected ? PURPLE : BLUE;
  const isClickable  = !!onClick;

  // ── Dot variant ─────────────────────────────────────────────
  if (variant === 'dot') {
    return (
      <motion.div
        onClick={onClick}
        animate={selected ? { y: -4, scale: 1.18 } : { y: 0, scale: 1 }}
        whileTap={isClickable ? { scale: selected ? 1.1 : 0.9 } : undefined}
        transition={springTransition}
        style={{
          position: 'relative', width: 30, height: 30,
          cursor: isClickable ? 'pointer' : 'default',
          transformOrigin: '50% 100%',
        }}
      >
        {/* Glow ring */}
        <svg style={{ position: 'absolute', top: 0, left: 0 }} width="30" height="30" viewBox="0 0 30 30" fill="none">
          <circle cx="15" cy="15" r="15" fill={color} fillOpacity="0.3" />
        </svg>
        {/* Solid body */}
        <svg style={{ position: 'absolute', top: 2, left: 2 }} width="26" height="26" viewBox="0 0 26 26" fill="none">
          <circle cx="13" cy="13" r="12" fill={color} stroke="white" strokeWidth="2" />
        </svg>
        {/* WiFi icon */}
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <FontAwesomeIcon icon={faWifi} color="white" style={{ width: 13, height: 13 }} />
        </div>
      </motion.div>
    );
  }

  // ── Teardrop variant ─────────────────────────────────────────
  // Layers (back → front):
  //   1. Spot shadow  — 7.85×2.94 at (left:19, top:59)
  //   2. Pin Stroke   — 46×55.527 at (left:0, top:0.38)  — same path, 30% opacity halo
  //   3. Pin Body     — 40×48.284 at (left:3, top:4)     — solid fill + white 2px stroke
  //   4. WiFi icon    — FA Solid faWifi centred at (23, 24)
  return (
    <motion.div
      onClick={onClick}
      animate={selected ? { y: -6, scale: 1.12 } : { y: 0, scale: 1 }}
      whileTap={isClickable ? { scale: selected ? 1.06 : 0.94 } : undefined}
      transition={springTransition}
      style={{
        position: 'relative', width: 46, height: 62,
        cursor: isClickable ? 'pointer' : 'default',
        transformOrigin: '50% 100%',
      }}
    >
      {/* 1 — Spot shadow */}
      <svg
        style={{ position: 'absolute', top: 59, left: 19 }}
        width="7.85" height="2.94" viewBox="0 0 7.84977 2.94366" fill="none"
      >
        <ellipse cx="3.92" cy="1.47" rx="3.92" ry="1.47"
          fill={dark ? 'white' : 'black'}
          fillOpacity={dark ? 0.18 : 0.1}
        />
      </svg>

      {/* 2 — Pin Stroke (glow halo) */}
      <svg
        style={{ position: 'absolute', top: 0.38, left: 0 }}
        width="46" height="55.527" viewBox="0 0 46 55.5269" fill="none" overflow="visible"
      >
        <path
          d="M39.2621 39.2648C42.4791 36.0483 44.67 31.9501 45.5578 27.4885C46.4455 23.0268 45.9903 18.4021 44.2496 14.1992C42.5089 9.99624 39.5609 6.40391 35.7785 3.87646C31.9961 1.34902 27.5491 0 23 0C18.4509 0 14.0039 1.34902 10.2215 3.87646C6.43908 6.40391 3.49111 9.99624 1.75041 14.1992C0.0097105 18.4021 -0.445541 23.0268 0.44223 27.4885C1.33 31.9501 3.52092 36.0483 6.73791 39.2648L23 55.5269L39.2621 39.2648Z"
          fill={color} fillOpacity="0.3"
        />
      </svg>

      {/* 3 — Pin Body */}
      <svg
        style={{ position: 'absolute', top: 4, left: 3 }}
        width="40" height="48.284" viewBox="0 0 40 48.2843" fill="none" overflow="visible"
      >
        <path
          d="M20 1C23.758 1 27.432 2.11426 30.5566 4.20215C33.681 6.28996 36.1158 9.25775 37.5537 12.7295C38.9917 16.2015 39.3681 20.0223 38.6348 23.708C37.9014 27.3937 36.0911 30.7795 33.4336 33.4365L20 46.8701L6.56641 33.4365C3.90892 30.7795 2.09863 27.3937 1.36523 23.708C0.631858 20.0223 1.00832 16.2015 2.44629 12.7295C3.88424 9.25775 6.31898 6.28996 9.44336 4.20215C12.568 2.11426 16.242 1 20 1Z"
          fill={color} stroke="white" strokeWidth="2"
        />
      </svg>

      {/* 4 — WiFi icon */}
      <div style={{
        position: 'absolute', top: 12, left: 9, width: 28, height: 22,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <FontAwesomeIcon icon={faWifi} color="white" style={{ width: 17, height: 17 }} />
      </div>
    </motion.div>
  );
}
