'use client';

export type PUBottomNavTab = 'explore' | 'wallet' | 'activity' | 'profile';

// FA Pro Regular (outline) — inactive state
const RegularMap = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="w-6 h-6">
    <path d="M512 48c0-8.3-4.3-16-11.3-20.4s-15.9-4.8-23.3-1.1L352.5 88.1 180 29.4c-13.7-4.7-28.7-3.8-41.9 2.3L13.8 90.3C5.4 94.2 0 102.7 0 112L0 464c0 8.2 4.2 15.9 11.1 20.3s15.6 4.9 23.1 1.4l127.3-59.9 170.7 56.9c13.7 4.6 28.5 3.7 41.6-2.5l124.4-58.5c8.4-4 13.8-12.4 13.8-21.7l0-352zM144 82.1l0 299-96 45.2 0-299 96-45.2zm48 303.3l0-301.1 128 43.5 0 300.3-128-42.7zM368 134l96-47.4 0 298.2-96 45.2 0-296z"/>
  </svg>
);
const RegularWallet = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="w-6 h-6">
    <path d="M88 32C39.4 32 0 71.4 0 120L0 360c0 48.6 39.4 88 88 88l336 0c48.6 0 88-39.4 88-88l0-144c0-48.6-39.4-88-88-88l-304 0c-13.3 0-24 10.7-24 24s10.7 24 24 24l304 0c22.1 0 40 17.9 40 40l0 144c0 22.1-17.9 40-40 40L88 400c-22.1 0-40-17.9-40-40l0-240c0-22.1 17.9-40 40-40l368 0c13.3 0 24-10.7 24-24s-10.7-24-24-24L88 32zM384 320a32 32 0 1 0 0-64 32 32 0 1 0 0 64z"/>
  </svg>
);
const RegularReceipt = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" fill="currentColor" className="w-6 h-6">
    <path d="M32.4 1.5C25.1-1.2 16.8-.2 10.3 4.3S0 16.1 0 24L0 488c0 7.9 3.9 15.2 10.3 19.7s14.7 5.5 22.1 2.7l55-20.6 47.1 20.2c6.5 2.8 13.9 2.6 20.2-.6l37.3-18.6 37.3 18.6c6.3 3.2 13.7 3.4 20.2 .6l47.1-20.2 55 20.6c7.4 2.8 15.6 1.7 22.1-2.7S384 495.9 384 488l0-464c0-7.9-3.9-15.2-10.3-19.7s-14.7-5.5-22.1-2.7l-55 20.6-47.1-20.2C243-.8 235.6-.6 229.3 2.5L192 21.2 154.7 2.5C148.4-.6 141-.8 134.5 1.9L87.4 22.1 32.4 1.5zM48 453.4L48 58.6 79.6 70.5c5.8 2.2 12.2 2 17.9-.4l45.8-19.6 38 19c6.8 3.4 14.7 3.4 21.5 0l38-19 45.8 19.6c5.7 2.4 12.1 2.6 17.9 .4l31.6-11.8 0 394.7-31.6-11.8c-5.8-2.2-12.2-2-17.9 .4l-45.8 19.6-38-19c-6.8-3.4-14.7-3.4-21.5 0l-38 19-45.8-19.6c-5.7-2.4-12.1-2.6-17.9-.4L48 453.4zM120 136c-13.3 0-24 10.7-24 24s10.7 24 24 24l144 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-144 0zm0 192c-13.3 0-24 10.7-24 24s10.7 24 24 24l144 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-144 0zM96 256c0 13.3 10.7 24 24 24l144 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-144 0c-13.3 0-24 10.7-24 24z"/>
  </svg>
);
const RegularUser = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor" className="w-6 h-6">
    <path d="M144 128a80 80 0 1 1 160 0 80 80 0 1 1 -160 0zm208 0a128 128 0 1 0 -256 0 128 128 0 1 0 256 0zM48 480c0-70.7 57.3-128 128-128l96 0c70.7 0 128 57.3 128 128l0 8c0 13.3 10.7 24 24 24s24-10.7 24-24l0-8c0-97.2-78.8-176-176-176l-96 0C78.8 304 0 382.8 0 480l0 8c0 13.3 10.7 24 24 24s24-10.7 24-24l0-8z"/>
  </svg>
);

// FA Pro Solid (filled) — active state
const SolidMap = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="w-6 h-6">
    <path d="M512 48c0-11.1-5.7-21.4-15.2-27.2s-21.2-6.4-31.1-1.4L349.5 77.5 170.1 17.6c-8.1-2.7-16.8-2.1-24.4 1.7l-128 64C6.8 88.8 0 99.9 0 112L0 464c0 11.1 5.7 21.4 15.2 27.2s21.2 6.4 31.1 1.4l116.1-58.1 179.4 59.8c8.1 2.7 16.8 2.1 24.4-1.7l128-64c10.8-5.4 17.7-16.5 17.7-28.6l0-352zM192 376.9l0-284.5 128 42.7 0 284.5-128-42.7z"/>
  </svg>
);
const SolidWallet = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="w-6 h-6">
    <path d="M64 32C28.7 32 0 60.7 0 96L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-192c0-35.3-28.7-64-64-64L72 128c-13.3 0-24-10.7-24-24S58.7 80 72 80l384 0c13.3 0 24-10.7 24-24s-10.7-24-24-24L64 32zM416 256a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/>
  </svg>
);
const SolidReceipt = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" fill="currentColor" className="w-6 h-6">
    <path d="M14 2.2C22.5-1.7 32.5-.3 39.6 5.8L80 40.4 120.4 5.8c9-7.7 22.3-7.7 31.2 0L192 40.4 232.4 5.8c9-7.7 22.2-7.7 31.2 0L304 40.4 344.4 5.8c7.1-6.1 17.1-7.5 25.6-3.6S384 14.6 384 24l0 464c0 9.4-5.5 17.9-14 21.8s-18.5 2.5-25.6-3.6l-40.4-34.6-40.4 34.6c-9 7.7-22.2 7.7-31.2 0l-40.4-34.6-40.4 34.6c-9 7.7-22.3 7.7-31.2 0L80 471.6 39.6 506.2c-7.1 6.1-17.1 7.5-25.6 3.6S0 497.4 0 488L0 24C0 14.6 5.5 6.1 14 2.2zM104 136c-13.3 0-24 10.7-24 24s10.7 24 24 24l176 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-176 0zM80 352c0 13.3 10.7 24 24 24l176 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-176 0c-13.3 0-24 10.7-24 24zm24-120c-13.3 0-24 10.7-24 24s10.7 24 24 24l176 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-176 0z"/>
  </svg>
);
const SolidUser = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor" className="w-6 h-6">
    <path d="M224 248a120 120 0 1 0 0-240 120 120 0 1 0 0 240zm-29.7 56C95.8 304 16 383.8 16 482.3 16 498.7 29.3 512 45.7 512l356.6 0c16.4 0 29.7-13.3 29.7-29.7 0-98.5-79.8-178.3-178.3-178.3l-59.4 0z"/>
  </svg>
);

const TABS: {
  id: PUBottomNavTab;
  label: string;
  Regular: () => JSX.Element;
  Solid: () => JSX.Element;
}[] = [
  { id: 'explore',  label: 'Explore',  Regular: RegularMap,     Solid: SolidMap },
  { id: 'wallet',   label: 'Wallet',   Regular: RegularWallet,  Solid: SolidWallet },
  { id: 'activity', label: 'Activity', Regular: RegularReceipt, Solid: SolidReceipt },
  { id: 'profile',  label: 'Profile',  Regular: RegularUser,    Solid: SolidUser },
];

interface PUBottomNavProps {
  activeTab?: PUBottomNavTab;
  onTabChange?: (tab: PUBottomNavTab) => void;
  dark?: boolean;
}

// Figma: 88px height, white bg, Top A shadow
// Active: outline icon coloured black (light) or purple (dark) + bold label
// Inactive: outline icon + muted label
export function PUBottomNav({ activeTab, onTabChange, dark }: PUBottomNavProps) {
  return (
    <div
      className="w-full h-[88px] flex items-center justify-center px-6"
      style={dark ? {
        background: '#011638',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0px -4px 24px rgba(0,0,0,0.4)',
      } : {
        background: '#ffffff',
        boxShadow: '0px -2px 2px 0px rgba(0,0,0,0.03)',
        borderTop: '1px solid rgba(247,247,248,0.8)',
      }}
    >
      <div className="flex items-center justify-center w-full" style={{ gap: 50 }}>
        {TABS.map(({ id, label, Regular }) => {
          const isActive = activeTab === id;

          const iconColor = dark
            ? (isActive ? '#7458fd' : 'rgba(255,255,255,0.35)')
            : (isActive ? '#000000' : '#AAACB0');

          const labelColor = dark
            ? (isActive ? '#7458fd' : 'rgba(255,255,255,0.35)')
            : (isActive ? '#000000' : '#AAACB0');

          return (
            <button
              key={id}
              type="button"
              onClick={() => onTabChange?.(id)}
              className="flex flex-col items-center gap-1 min-w-[44px] cursor-pointer"
              style={{ color: iconColor, background: 'none', border: 'none', padding: 0 }}
            >
              <Regular />
              <span
                className="text-[12px] font-poppins leading-none"
                style={{ color: labelColor, fontWeight: 400 }}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
