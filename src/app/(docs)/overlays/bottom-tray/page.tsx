'use client';
import { useState } from 'react';
import { motion, useMotionValue, animate } from 'framer-motion';
import { PUSearchBar } from '@/components/ui/PUSearchBar';
import { PhoneFrame } from '@/components/docs/PhoneFrame';
import { ComponentPreview } from '@/components/docs/ComponentPreview';
import { PropsTable } from '@/components/docs/PropsTable';
import { CodeBlock } from '@/components/docs/CodeBlock';

// ── Figma-exact SVG icons ────────────────────────────────────

// Navigation arrow (purple) — viewBox 0 0 13.2186 13.2186
const NavIcon = ({ size = 11 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 13.2186 13.2186" fill="none" aria-hidden="true">
    <path
      d="M1.60462 5.8729C1.25734 5.73784 1.0837 5.67032 1.033 5.57302C0.989055 5.48867 0.988996 5.38819 1.03284 5.30379C1.08342 5.20642 1.25699 5.13869 1.60411 5.00323L11.4553 1.15886C11.7687 1.03658 11.9253 0.975436 12.0254 1.00888C12.1124 1.03793 12.1806 1.10616 12.2097 1.1931C12.2431 1.29322 12.182 1.4499 12.0597 1.76325L8.21532 11.6144C8.07986 11.9616 8.01213 12.1351 7.91477 12.1857C7.83037 12.2296 7.72989 12.2295 7.64554 12.1855C7.54824 12.1349 7.48071 11.9612 7.34565 11.6139L5.81259 7.67176C5.78517 7.60126 5.77146 7.56602 5.75029 7.53634C5.73153 7.51003 5.70852 7.48702 5.68222 7.46826C5.65254 7.44709 5.61729 7.43338 5.54679 7.40596L1.60462 5.8729Z"
      fill="#7458FD" stroke="#7458FD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    />
  </svg>
);

// Funnel/cocktail category — viewBox 0 0 13 13
const FunnelIcon = ({ size = 11 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 13 13" fill="none" aria-hidden="true">
    <path
      d="M1.57129 1.7793L2.87207 3.22363L3.02051 3.38867H9.97949L10.1279 3.22363L11.4287 1.7793L12.1797 0.944336H0.820312L1.57129 1.7793ZM6.27734 7.67188L6.14941 7.5293L0.5 1.25195V0.5H12.5V1.25195L6.85059 7.5293L6.72266 7.67188V12.0557H10.333V12.5H2.66699V12.0557H6.27734V7.67188Z"
      fill="#AAACB0" stroke="#AAACB0"
    />
  </svg>
);

// Store/building category — viewBox 0 0 15 13.6364
const StoreIcon = ({ size = 11 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 15 13.6364" fill="none" aria-hidden="true">
    <path
      d="M2.83203 1.11328L1.17773 3.97852C0.972953 4.31878 0.863345 4.70812 0.863281 5.11328C0.863281 6.33081 1.85082 7.31836 3.06836 7.31836C3.9774 7.31829 4.78279 6.76274 5.11523 5.93359C5.17626 5.78135 5.3921 5.78135 5.45312 5.93359C5.78559 6.76277 6.59089 7.31836 7.5 7.31836C8.40911 7.31836 9.2144 6.76277 9.54688 5.93359C9.60789 5.78136 9.82375 5.78136 9.88477 5.93359C10.2172 6.76275 11.0226 7.31829 11.9316 7.31836C13.1492 7.31836 14.1367 6.33081 14.1367 5.11328C14.1367 4.70901 14.0266 4.32305 13.8193 3.97559H13.8203L12.168 1.11328L12.0234 0.863281H2.97656L2.83203 1.11328ZM1.86328 7.39844L1.6416 7.25C0.952096 6.7885 0.5 6.00323 0.5 5.11328C0.500064 4.63962 0.628969 4.18594 0.860352 3.80176L0.865234 3.79395L2.71387 0.59082C2.74631 0.534673 2.80626 0.500093 2.87109 0.5H12.1289C12.1937 0.500088 12.2537 0.534704 12.2861 0.59082L14.1289 3.7832L14.1338 3.79102C14.372 4.18682 14.4999 4.64074 14.5 5.11328C14.5 6.00323 14.0479 6.7885 13.3584 7.25L13.1367 7.39844V12.7725H13.8184V13.1367H1.18164V12.7725H1.86328V7.39844Z"
      fill="#AAACB0" stroke="#AAACB0"
    />
  </svg>
);

// Location pin — clear and visible at small sizes
const LocationIcon = ({ size = 11 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 12 15" fill="none" aria-hidden="true">
    <path
      d="M6 0C3.24 0 1 2.24 1 5C1 8.75 6 15 6 15C6 15 11 8.75 11 5C11 2.24 8.76 0 6 0ZM6 6.5C5.17 6.5 4.5 5.83 4.5 5C4.5 4.17 5.17 3.5 6 3.5C6.83 3.5 7.5 4.17 7.5 5C7.5 5.83 6.83 6.5 6 6.5Z"
      fill="#AAACB0"
    />
  </svg>
);

// Filter icon for tray header — viewBox 0 0 18 16.875
const TrayFilterIcon = ({ color, width = 18 }: { color: string; width?: number }) => (
  <svg width={width} height={Math.round(width * (16.875 / 18))} viewBox="0 0 18 16.875" fill="none" aria-hidden="true">
    <path
      d="M0.84375 1.96875C0.376172 1.96875 0 2.34492 0 2.8125C0 3.28008 0.376172 3.65625 0.84375 3.65625H4.06758C4.42617 4.79883 5.49141 5.625 6.75 5.625C8.00859 5.625 9.07383 4.79883 9.43242 3.65625H17.1562C17.6238 3.65625 18 3.28008 18 2.8125C18 2.34492 17.6238 1.96875 17.1562 1.96875H9.43242C9.07383 0.826172 8.00859 0 6.75 0C5.49141 0 4.42617 0.826172 4.06758 1.96875H0.84375ZM0.84375 7.59375C0.376172 7.59375 0 7.96992 0 8.4375C0 8.90508 0.376172 9.28125 0.84375 9.28125H9.69258C10.0512 10.4238 11.1164 11.25 12.375 11.25C13.6336 11.25 14.6988 10.4238 15.0574 9.28125H17.1562C17.6238 9.28125 18 8.90508 18 8.4375C18 7.96992 17.6238 7.59375 17.1562 7.59375H15.0574C14.6988 6.45117 13.6336 5.625 12.375 5.625C11.1164 5.625 10.0512 6.45117 9.69258 7.59375H0.84375ZM0.84375 13.2188C0.376172 13.2188 0 13.5949 0 14.0625C0 14.5301 0.376172 14.9062 0.84375 14.9062H2.94258C3.30117 16.0488 4.36641 16.875 5.625 16.875C6.88359 16.875 7.94883 16.0488 8.30742 14.9062H17.1562C17.6238 14.9062 18 14.5301 18 14.0625C18 13.5949 17.6238 13.2188 17.1562 13.2188H8.30742C7.94883 12.0762 6.88359 11.25 5.625 11.25C4.36641 11.25 3.30117 12.0762 2.94258 13.2188H0.84375ZM5.625 15.1875C5.32663 15.1875 5.04048 15.069 4.82951 14.858C4.61853 14.647 4.5 14.3609 4.5 14.0625C4.5 13.7641 4.61853 13.478 4.82951 13.267C5.04048 13.056 5.32663 12.9375 5.625 12.9375C5.92337 12.9375 6.20952 13.056 6.42049 13.267C6.63147 13.478 6.75 13.7641 6.75 14.0625C6.75 14.3609 6.63147 14.647 6.42049 14.858C6.20952 15.069 5.92337 15.1875 5.625 15.1875ZM12.375 9.5625C12.0766 9.5625 11.7905 9.44397 11.5795 9.23299C11.3685 9.02202 11.25 8.73587 11.25 8.4375C11.25 8.13913 11.3685 7.85298 11.5795 7.64201C11.7905 7.43103 12.0766 7.3125 12.375 7.3125C12.6734 7.3125 12.9595 7.43103 13.1705 7.64201C13.3815 7.85298 13.5 8.13913 13.5 8.4375C13.5 8.73587 13.3815 9.02202 13.1705 9.23299C12.9595 9.44397 12.6734 9.5625 12.375 9.5625ZM5.625 2.8125C5.625 2.51413 5.74353 2.22798 5.95451 2.017C6.16548 1.80603 6.45163 1.6875 6.75 1.6875C7.04837 1.6875 7.33452 1.80603 7.54549 2.017C7.75647 2.22798 7.875 2.51413 7.875 2.8125C7.875 3.11087 7.75647 3.39702 7.54549 3.608C7.33452 3.81897 7.04837 3.9375 6.75 3.9375C6.45163 3.9375 6.16548 3.81897 5.95451 3.608C5.74353 3.39702 5.625 3.11087 5.625 2.8125Z"
      fill={color}
    />
  </svg>
);

// ── Venue data (from Figma) ───────────────────────────────────

type VenueCategory = 'funnel' | 'store' | 'location';

interface Venue {
  name: string;
  address: string;
  distance: string;
  category: VenueCategory;
}

const venues: Venue[] = [
  { name: "Bill's Restaurant",        address: '88 Wardour St, London W1F 0TF', distance: '200 m', category: 'funnel' },
  { name: 'Apple Store',              address: 'Suite 125, 43 Bedford Street',  distance: '200 m', category: 'store' },
  { name: 'Pizza Express',            address: '5 Trafalgar Sq',                distance: '250 m', category: 'location' },
  { name: 'Boots',                    address: '88 Wardour St, London W1F 0TF', distance: '250 m', category: 'store' },
  { name: 'The Clermont Hotel',       address: 'Strand, London, WC2N 5HX',      distance: '300 m', category: 'location' },
  { name: 'Itsu',                     address: '32-33 Strand, London WC2N 5H',  distance: '350 m', category: 'location' },
  { name: 'Tandoor Chop House',       address: '88 Wardour St, London W1F 0TF', distance: '350 m', category: 'funnel' },
];

// ── Mini icon renderer ───────────────────────────────────────

function CatIcon({ category, size }: { category: VenueCategory; size: number }) {
  if (category === 'funnel')   return <FunnelIcon size={size} />;
  if (category === 'store')    return <StoreIcon size={size} />;
  return <LocationIcon size={size} />;
}

// ── Phone frame tray demo ────────────────────────────────────

const PHONE_EXPAND_H = 320;
const PHONE_PEEK_H   = 150;
const PHONE_Y_OFFSET = PHONE_EXPAND_H - PHONE_PEEK_H;

function PhoneTrayDemo({ dark }: { dark: boolean }) {
  const y = useMotionValue(PHONE_Y_OFFSET);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {/* Map background */}
      <div style={{
        position: 'absolute', inset: 0,
        background: dark
          ? 'linear-gradient(160deg,#011638 0%,#0a2048 100%)'
          : 'linear-gradient(160deg,#dce8f5 0%,#e8f0f8 100%)',
      }} />
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.12 }} preserveAspectRatio="none">
        <line x1="0" y1="120" x2="300" y2="120" stroke={dark ? '#fff' : '#6b7280'} strokeWidth="0.5" />
        <line x1="0" y1="220" x2="300" y2="220" stroke={dark ? '#fff' : '#6b7280'} strokeWidth="0.5" />
        <line x1="80"  y1="0" x2="80"  y2="560" stroke={dark ? '#fff' : '#6b7280'} strokeWidth="0.5" />
        <line x1="210" y1="0" x2="210" y2="560" stroke={dark ? '#fff' : '#6b7280'} strokeWidth="0.5" />
        <circle cx="145" cy="175" r="5" fill="#7458FD" opacity="0.7" />
        <circle cx="92"  cy="132" r="3" fill="#7458FD" opacity="0.45" />
        <circle cx="215" cy="200" r="3" fill="#7458FD" opacity="0.45" />
      </svg>

      {/* Search bar */}
      <div style={{ position: 'absolute', top: 58, left: 16, right: 16, zIndex: 10 }}>
        <div style={{
          height: 36, borderRadius: 50,
          background: dark ? '#0a2048' : '#ffffff',
          boxShadow: dark ? 'none' : '0px 2px 15px rgba(0,0,0,0.1)',
          border: dark ? '1px solid rgba(255,255,255,0.1)' : 'none',
          display: 'flex', alignItems: 'center', paddingLeft: 10, paddingRight: 10, gap: 8,
        }}>
          <svg width="13" height="13" viewBox="0 0 20 20" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
            <path d="M19 19L14.65 14.65M17 9C17 13.4183 13.4183 17 9 17C4.58172 17 1 13.4183 1 9C1 4.58172 4.58172 1 9 1C13.4183 1 17 4.58172 17 9Z"
              stroke={dark ? 'rgba(255,255,255,0.4)' : '#AAACB0'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span style={{ fontFamily: 'Poppins,sans-serif', fontSize: 11, color: '#AAACB0', flex: 1 }}>Search</span>
          <svg width="13" height="12" viewBox="0 0 22 20.625" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
            <path d="M1.03125 2.40625C0.459766 2.40625 0 2.86602 0 3.4375C0 4.00898 0.459766 4.46875 1.03125 4.46875H4.97148C5.40977 5.86523 6.71172 6.875 8.25 6.875C9.78828 6.875 11.0902 5.86523 11.5285 4.46875H20.9688C21.5402 4.46875 22 4.00898 22 3.4375C22 2.86602 21.5402 2.40625 20.9688 2.40625H11.5285C11.0902 1.00977 9.78828 0 8.25 0C6.71172 0 5.40977 1.00977 4.97148 2.40625H1.03125ZM1.03125 9.28125C0.459766 9.28125 0 9.74102 0 10.3125C0 10.884 0.459766 11.3438 1.03125 11.3438H11.8465C12.2848 12.7402 13.5867 13.75 15.125 13.75C16.6633 13.75 17.9652 12.7402 18.4035 11.3438H20.9688C21.5402 11.3438 22 10.884 22 10.3125C22 9.74102 21.5402 9.28125 20.9688 9.28125H18.4035C17.9652 7.88477 16.6633 6.875 15.125 6.875C13.5867 6.875 12.2848 7.88477 11.8465 9.28125H1.03125ZM1.03125 16.1562C0.459766 16.1562 0 16.616 0 17.1875C0 17.759 0.459766 18.2188 1.03125 18.2188H3.59648C4.03477 19.6152 5.33672 20.625 6.875 20.625C8.41328 20.625 9.71523 19.6152 10.1535 18.2188H20.9688C21.5402 18.2188 22 17.759 22 17.1875C22 16.616 21.5402 16.1562 20.9688 16.1562H10.1535C9.71523 14.7598 8.41328 13.75 6.875 13.75C5.33672 13.75 4.03477 14.7598 3.59648 16.1562H1.03125ZM6.875 18.5625C6.51033 18.5625 6.16059 18.4176 5.90273 18.1598C5.64487 17.9019 5.5 17.5522 5.5 17.1875C5.5 16.8228 5.64487 16.4731 5.90273 16.2152C6.16059 15.9574 6.51033 15.8125 6.875 15.8125C7.23967 15.8125 7.58941 15.9574 7.84727 16.2152C8.10513 16.4731 8.25 16.8228 8.25 17.1875C8.25 17.5522 8.10513 17.9019 7.84727 18.1598C7.58941 18.4176 7.23967 18.5625 6.875 18.5625ZM15.125 11.6875C14.7603 11.6875 14.4106 11.5426 14.1527 11.2848C13.8949 11.0269 13.75 10.6772 13.75 10.3125C13.75 9.94783 13.8949 9.59809 14.1527 9.34023C14.4106 9.08237 14.7603 8.9375 15.125 8.9375C15.4897 8.9375 15.8394 9.08237 16.0973 9.34023C16.3551 9.59809 16.5 9.94783 16.5 10.3125C16.5 10.6772 16.3551 11.0269 16.0973 11.2848C15.8394 11.5426 15.4897 11.6875 15.125 11.6875ZM6.875 3.4375C6.875 3.07283 7.01987 2.72309 7.27773 2.46523C7.53559 2.20737 7.88533 2.0625 8.25 2.0625C8.61467 2.0625 8.96441 2.20737 9.22227 2.46523C9.48013 2.72309 9.625 3.07283 9.625 3.4375C9.625 3.80217 9.48013 4.15191 9.22227 4.40977C8.96441 4.66763 8.61467 4.8125 8.25 4.8125C7.88533 4.8125 7.53559 4.66763 7.27773 4.40977C7.01987 4.15191 6.875 3.80217 6.875 3.4375Z"
              fill="#7458FD" />
          </svg>
        </div>
      </div>

      {/* Draggable tray */}
      <motion.div
        drag="y"
        dragConstraints={{ top: 0, bottom: PHONE_Y_OFFSET }}
        dragElastic={0}
        dragMomentum={false}
        style={{
          y,
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: PHONE_EXPAND_H,
          borderRadius: '12px 12px 0 0',
          background: dark ? '#0a2048' : '#ffffff',
          boxShadow: '0px -2px 15px rgba(0,0,0,0.1)',
          zIndex: 20, touchAction: 'none', userSelect: 'none',
        }}
        onDragEnd={(_, info) => {
          const cur = y.get();
          const mid = PHONE_Y_OFFSET / 2;
          if (info.velocity.y > 200 || (cur > mid && info.velocity.y >= -200)) {
            animate(y, PHONE_Y_OFFSET, { type: 'spring', stiffness: 400, damping: 35 });
          } else {
            animate(y, 0, { type: 'spring', stiffness: 400, damping: 35 });
          }
        }}
      >
        {/* Drag handle — 35px, 60×5px pill */}
        <div style={{ height: 35, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'grab' }}>
          <div style={{ width: 60, height: 5, borderRadius: 9999, background: dark ? 'rgba(255,255,255,0.15)' : '#DDDDDF' }} />
        </div>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingLeft: 16, paddingRight: 12, height: 40, flexShrink: 0 }}>
          <span style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 700, fontSize: 13, color: dark ? '#ffffff' : '#000000' }}>
            34 WiFi nearby
          </span>
          <button style={{
            width: 30, height: 30, borderRadius: 9999,
            border: '1.5px solid #EFF0F0',
            background: dark ? 'transparent' : '#ffffff',
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0,
          }}>
            <TrayFilterIcon color={dark ? '#ffffff' : '#7458FD'} width={13} />
          </button>
        </div>

        {/* Venue list */}
        {venues.slice(0, 6).map((venue, i) => {
          // Alternating backgrounds: first 4 white, last rows grey (matches Figma)
          const rowBg = dark ? 'transparent' : '#ffffff';
          const pillBg = dark ? 'rgba(255,255,255,0.08)' : '#F7F7F8';
          const isLast = i === venues.slice(0, 6).length - 1;

          return (
            <div key={venue.name} style={{ flexShrink: 0 }}>
              <div style={{
                position: 'relative', height: 44, background: rowBg,
                display: 'flex', alignItems: 'center',
              }}>
                {/* Category icon pill */}
                <div style={{
                  position: 'absolute', left: 12, top: 4,
                  width: 28, height: 28, borderRadius: 9999,
                  background: pillBg,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <CatIcon category={venue.category} size={11} />
                </div>

                {/* Text content */}
                <div style={{ position: 'absolute', left: 48, right: 64, top: 0, bottom: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div style={{
                    fontFamily: 'Poppins,sans-serif', fontWeight: 700, fontSize: 11,
                    color: dark ? '#ffffff' : '#000000',
                    overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis',
                  }}>{venue.name}</div>
                  <div style={{
                    fontFamily: 'Poppins,sans-serif', fontSize: 9, color: '#AAACB0',
                    overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', marginTop: 1,
                  }}>{venue.address}</div>
                </div>

                {/* Distance */}
                <div style={{
                  position: 'absolute', right: 12, top: 0, bottom: 0,
                  display: 'flex', alignItems: 'center', gap: 3,
                }}>
                  <NavIcon size={9} />
                  <span style={{ fontFamily: 'Poppins,sans-serif', fontSize: 9, color: dark ? '#ffffff' : '#000000', whiteSpace: 'nowrap' }}>
                    {venue.distance}
                  </span>
                </div>
              </div>

              {/* Divider */}
              {!isLast && (
                <div style={{ height: 1, background: dark ? 'rgba(255,255,255,0.06)' : '#F3F4F6', marginLeft: 12, marginRight: 12 }} />
              )}
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}

// ── Static tray preview (full-size, no drag) ─────────────────

function StaticTrayPreview({ dark }: { dark: boolean }) {
  return (
    <div style={{
      width: 300,
      borderRadius: '12px 12px 0 0',
      background: dark ? '#0a2048' : '#ffffff',
      boxShadow: '0px -2px 15px rgba(0,0,0,0.1)',
      overflow: 'hidden',
    }}>
      {/* Drag handle */}
      <div style={{ height: 35, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 104, height: 7, borderRadius: 9999, background: dark ? 'rgba(255,255,255,0.15)' : '#DDDDDF' }} />
      </div>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingLeft: 20, paddingRight: 16, height: 40 }}>
        <span style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 700, fontSize: 16, color: dark ? '#ffffff' : '#000000' }}>
          34 WiFi nearby
        </span>
        <button style={{
          width: 40, height: 40, borderRadius: 9999,
          border: '1.5px solid #EFF0F0',
          background: dark ? 'transparent' : '#ffffff',
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
        }}>
          <TrayFilterIcon color={dark ? '#ffffff' : '#7458FD'} />
        </button>
      </div>

      {/* Venue rows */}
      {venues.slice(0, 5).map((venue, i) => {
        const rowBg = dark ? 'transparent' : (i < 4 ? '#ffffff' : '#F7F7F8');
        const pillBg = dark ? 'rgba(255,255,255,0.08)' : (i < 4 ? '#F7F7F8' : '#ffffff');
        const isLast = i === 4;

        return (
          <div key={venue.name} style={{ flexShrink: 0 }}>
            <div style={{ position: 'relative', height: 56, background: rowBg }}>
              {/* Icon pill — left:16, top:0 matching Figma */}
              <div style={{
                position: 'absolute', left: 16, top: 10,
                width: 36, height: 36, borderRadius: 9999,
                background: pillBg,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <CatIcon category={venue.category} size={14} />
              </div>

              {/* Title */}
              <div style={{
                position: 'absolute', top: 0, bottom: '42.86%', left: 64, right: 16,
                display: 'flex', alignItems: 'center',
              }}>
                <span style={{
                  fontFamily: 'Poppins,sans-serif', fontWeight: 700, fontSize: 14,
                  color: dark ? '#ffffff' : '#000000',
                  overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis',
                }}>{venue.name}</span>
              </div>

              {/* Subtitle + distance */}
              <div style={{
                position: 'absolute', top: '57.14%', bottom: 0, left: 64, right: 16,
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}>
                <span style={{
                  fontFamily: 'Poppins,sans-serif', fontSize: 12, color: '#AAACB0',
                  overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', flex: 1, minWidth: 0,
                }}>{venue.address}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 3, flexShrink: 0, marginLeft: 4 }}>
                  <NavIcon size={11} />
                  <span style={{ fontFamily: 'Poppins,sans-serif', fontSize: 11, color: dark ? '#ffffff' : '#000000', whiteSpace: 'nowrap' }}>
                    {venue.distance}
                  </span>
                </div>
              </div>
            </div>

            {!isLast && (
              <div style={{ height: 1, background: dark ? 'rgba(255,255,255,0.06)' : '#F3F4F6', marginLeft: 16, marginRight: 16 }} />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── Props & code ─────────────────────────────────────────────

const trayProps = [
  { name: 'title',           type: 'string',    default: '—',     description: 'Header title text' },
  { name: 'children',        type: 'ReactNode', required: true,   description: 'Tray body content' },
  { name: 'dark',            type: 'boolean',   default: 'false', description: 'Dark surface' },
  { name: 'peekHeight',      type: 'number',    default: '160',   description: 'Visible height when peeked (px)' },
  { name: 'expandHeight',    type: 'number',    default: '460',   description: 'Visible height when expanded (px)' },
  { name: 'defaultExpanded', type: 'boolean',   default: 'false', description: 'Start in expanded state' },
];

const searchBarProps = [
  { name: 'value',         type: 'string',              required: true,              description: 'Controlled input value' },
  { name: 'onChange',      type: '(v: string) => void', required: true,              description: 'Value change handler' },
  { name: 'placeholder',   type: 'string',              default: 'Search',           description: 'Input placeholder' },
  { name: 'onFilterPress', type: '() => void',          default: '—',                description: 'Filter button tap handler' },
  { name: 'dark',          type: 'boolean',             default: 'false',            description: 'Dark surface' },
];

const traySwiftCode = `struct ExploreView: View {
    var body: some View {
        ZStack(alignment: .bottom) {
            MapView()
            PUBottomTray(title: "34 WiFi nearby") {
                ForEach(networks) { network in
                    PUListRow(
                        title: network.name,
                        subtitle: network.address,
                        trailing: Label(network.distance, systemImage: "location.fill")
                    )
                }
            }
        }
    }
}`;

const searchBarSwiftCode = `struct MapOverlayView: View {
    @State private var query = ""
    @State private var showFilters = false

    var body: some View {
        VStack {
            PUSearchBar(
                text: $query,
                placeholder: "Search",
                onFilterTap: { showFilters = true }
            )
            .padding(.horizontal, 16)
            .padding(.top, 12)
            Spacer()
        }
    }
}`;

// ── Page ─────────────────────────────────────────────────────

export default function BottomTrayPage() {
  const [isDark, setIsDark] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [filterHit, setFilterHit] = useState(false);

  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Bottom Tray</h1>
      <p className="text-gray-500 mb-8">
        Persistent tray anchored to the bottom of the screen. Drags and snaps between a peeked
        state and an expanded state — no backdrop, always visible.
      </p>

      {/* ── In Context ── */}
      <div className="mb-12">
        <h2 className="text-lg font-bold text-primary mb-5">In Context</h2>
        <p className="text-sm text-gray-500 mb-4">Drag the tray handle up and down — it snaps between peek and expand.</p>
        <PhoneFrame
          label="Drag the handle to snap between states"
          dark={isDark}
          onToggle={() => setIsDark(d => !d)}
        >
          <PhoneTrayDemo dark={isDark} />
        </PhoneFrame>
      </div>

      {/* ── Static previews ── */}
      <h2 className="text-lg font-bold text-primary mb-5">Tray Surfaces</h2>
      <div className="flex flex-wrap gap-10 mb-12 items-end">
        <div>
          <p className="text-xs font-medium text-gray-500 mb-3 uppercase tracking-wide">Light</p>
          <StaticTrayPreview dark={false} />
        </div>
        <div>
          <p className="text-xs font-medium text-gray-500 mb-3 uppercase tracking-wide">Dark</p>
          <div style={{ background: '#011638', borderRadius: 12, padding: '16px 16px 0' }}>
            <StaticTrayPreview dark={true} />
          </div>
        </div>
      </div>

      {/* ── Tray Props ── */}
      <h2 className="text-base font-semibold text-gray-800 mb-2">Tray Props</h2>
      <PropsTable props={trayProps} />

      <h2 className="text-base font-semibold text-gray-800 mt-10 mb-2">Swift Usage</h2>
      <CodeBlock code={traySwiftCode} title="PUBottomTray.swift" />

      {/* ── Search Bar ── */}
      <h2 className="text-3xl font-bold text-gray-900 mt-16 mb-2">Search Bar</h2>
      <p className="text-gray-500 mb-8">
        Pill-shaped input with a search icon and a purple filter button. Floats above the map or tray.
      </p>

      <h2 className="text-lg font-bold text-primary mb-5">Variants</h2>
      <ComponentPreview label="Light">
        <div className="w-[320px]">
          <PUSearchBar value={searchValue} onChange={setSearchValue} onFilterPress={() => { setFilterHit(true); setTimeout(() => setFilterHit(false), 1200); }} />
          {filterHit && <p className="text-xs text-[#7458FD] text-center mt-2 font-medium">Filter tapped ✓</p>}
        </div>
      </ComponentPreview>

      <ComponentPreview label="Dark" bg="dark">
        <div className="w-[320px]">
          <PUSearchBar value={searchValue} onChange={setSearchValue} onFilterPress={() => {}} dark />
        </div>
      </ComponentPreview>

      <h2 className="text-base font-semibold text-gray-800 mt-8 mb-2">Search Bar Props</h2>
      <PropsTable props={searchBarProps} />

      <h2 className="text-base font-semibold text-gray-800 mt-10 mb-2">Swift Usage</h2>
      <CodeBlock code={searchBarSwiftCode} title="PUSearchBar.swift" />
    </div>
  );
}
