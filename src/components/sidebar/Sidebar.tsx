'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PurpleLogo, PurpleIcon } from '@/components/ui/PurpleLogo';
import './SideNav.css';

interface SidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
}

// ── Section icons ───────────────────────────────────────────

const ButtonsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <rect x="1.5" y="5" width="13" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M5 8h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const IndicatorsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M8 1.5A6.5 6.5 0 1 1 1.5 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const NavigationIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M2 4h12M2 8h12M2 12h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);


const MapIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M1 3.5l4-1.5 6 1.5 4-1.5v11l-4 1.5-6-1.5-4 1.5V3.5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M5 2v11M11 3.5v11" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

const OverlaysIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <rect x="1.5" y="3" width="13" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M1.5 6.5h13" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="4" cy="4.75" r="0.75" fill="currentColor"/>
    <circle cx="6.5" cy="4.75" r="0.75" fill="currentColor"/>
  </svg>
);

const InputsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <rect x="1.5" y="5" width="13" height="6" rx="3" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="5" cy="8" r="1.5" stroke="currentColor" strokeWidth="1.2"/>
  </svg>
);

const PassesIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <rect x="1.5" y="4.5" width="13" height="8" rx="2" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M4.5 8h4M4.5 10.5h2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    <circle cx="11.5" cy="9.25" r="1.25" stroke="currentColor" strokeWidth="1.2"/>
  </svg>
);

// ── Foundation per-item icons ───────────────────────────────

const ColorsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <circle cx="8" cy="5" r="2.8" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="4.5" cy="11" r="2.8" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="11.5" cy="11" r="2.8" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

const TypographyIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M2 4h12M8 4v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SpacingIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M2 8h12M5 5L2 8l3 3M11 5l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M8 1.5l1.6 3.3 3.6.5-2.6 2.5.6 3.7L8 9.8l-3.2 1.7.6-3.7L2.8 5.3l3.6-.5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
  </svg>
);

const ShadowsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <rect x="1.5" y="1.5" width="9" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M5 14h8a1 1 0 0 0 1-1V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="2 2"/>
  </svg>
);

const LogoIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <rect x="2" y="2" width="12" height="12" rx="2.5" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M5.5 5h3a2 2 0 0 1 0 4H5.5V5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M5.5 9v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

// ── Nav data ────────────────────────────────────────────────

const nav = [
  {
    section: 'Foundation',
    sectionIcon: <ColorsIcon />,
    items: [
      { label: 'Colors',      href: '/foundation/colors',      icon: <ColorsIcon /> },
      { label: 'Typography',  href: '/foundation/typography',  icon: <TypographyIcon /> },
      { label: 'Spacing',     href: '/foundation/spacing',     icon: <SpacingIcon /> },
      { label: 'Icons',       href: '/foundation/icons',       icon: <IconsIcon /> },
      { label: 'Shadows',     href: '/foundation/shadows',     icon: <ShadowsIcon /> },
      { label: 'Logo',           href: '/foundation/logos',           icon: <LogoIcon /> },
      { label: 'Illustrations', href: '/foundation/illustrations', icon: <IconsIcon /> },
    ],
  },
  {
    section: 'Buttons',
    sectionIcon: <ButtonsIcon />,
    items: [
      { label: 'Button',      href: '/buttons/button',      icon: <ButtonsIcon /> },
      { label: 'Icon Button',      href: '/buttons/icon-button',      icon: <ButtonsIcon /> },
      { label: 'Floating Button', href: '/buttons/floating-button', icon: <ButtonsIcon /> },
    ],
  },
  {
    section: 'Indicators',
    sectionIcon: <IndicatorsIcon />,
    items: [
      { label: 'Loader', href: '/indicators/loader', icon: <IndicatorsIcon /> },
    ],
  },
  {
    section: 'Navigation',
    sectionIcon: <NavigationIcon />,
    items: [
      { label: 'Bottom Nav', href: '/navigation/bottom-nav', icon: <NavigationIcon /> },
    ],
  },
  {
    section: 'Inputs',
    sectionIcon: <InputsIcon />,
    items: [
      { label: 'Search Bar', href: '/inputs/search-bar', icon: <InputsIcon /> },
    ],
  },
  {
    section: 'Passes',
    sectionIcon: <PassesIcon />,
    items: [
      { label: 'Pass Card',    href: '/passes/pass-card',    icon: <PassesIcon /> },
      { label: 'Wallet Stack', href: '/passes/wallet-stack', icon: <PassesIcon /> },
    ],
  },
  {
    section: 'Map',
    sectionIcon: <MapIcon />,
    items: [
      { label: 'Mapbox Map', href: '/map/mapbox',   icon: <MapIcon /> },
      { label: 'Map Pins',   href: '/map/map-pins', icon: <MapIcon /> },
    ],
  },
  {
    section: 'Overlays',
    sectionIcon: <OverlaysIcon />,
    items: [
      { label: 'Toast',        href: '/overlays/toast',        icon: <OverlaysIcon /> },
      { label: 'Bottom Tray',  href: '/overlays/bottom-tray',  icon: <OverlaysIcon /> },
      { label: 'Validation Modal', href: '/overlays/validation-modal', icon: <OverlaysIcon /> },
    ],
  },
];

// ── Component ───────────────────────────────────────────────

export function Sidebar({ collapsed = false, onToggle }: SidebarProps) {
  const pathname = usePathname();

  return (
    <div className={['side-nav', collapsed ? 'side-nav--collapsed' : ''].filter(Boolean).join(' ')}>
      {/* Toggle button — outside panel so overflow:hidden doesn't clip it */}
      <button
        className="side-nav__toggle"
        onClick={onToggle}
        aria-label={collapsed ? 'Expand navigation' : 'Collapse navigation'}
      >
        <span className="side-nav__toggle-chevron">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
            <path d="M6 2L3 5L6 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </button>

      <div className="side-nav__panel">
        <div className="side-nav__main">

          {/* Header / Logo */}
          <div className="side-nav__header">
            <Link href="/" className="side-nav__logo">
              {/* Always-visible icon mark */}
              <div className="side-nav__logo-mark">
                <PurpleIcon variant="dark-purple" size={28} />
              </div>
              {/* Wordmark + "UI" — fades on collapse */}
              <div className="side-nav__logo-title">
                <PurpleLogo variant="dark-purple" width={110} />
                <span className="side-nav__ui-text">UI</span>
              </div>
            </Link>
          </div>

          {/* Nav links */}
          <nav className="side-nav__links" aria-label="Main navigation">
            {nav.map(({ section, items }) => (
              <div key={section} className="side-nav__section-block">
                <p className="side-nav__section-label">{section}</p>
                {items.map(item => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={['side-nav__link', isActive ? 'side-nav__link--active' : ''].filter(Boolean).join(' ')}
                      title={collapsed ? item.label : undefined}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      <span className="side-nav__link-name">
                        <span className="side-nav__link-icon">{item.icon}</span>
                        <span className="side-nav__link-label">{item.label}</span>
                      </span>
                    </Link>
                  );
                })}
              </div>
            ))}
          </nav>

        </div>
      </div>
    </div>
  );
}
