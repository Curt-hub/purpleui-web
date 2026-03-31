export const colors = {
  // Primary (Figma: Primary)
  primary: '#7458FD',
  darkBlue: '#011638',
  pearlWhite: '#F5F1ED',

  // Monochrome (Figma: Monochrome)
  black: '#000000',
  offBlack: '#595959',
  white: '#FFFFFF',
  greyA: '#AAACB0',
  greyB: '#BABCBF',
  greyC: '#CDCED0',
  greyD: '#DDDDDF',
  greyE: '#EFF0F0',
  greyF: '#F7F7F8',

  // Actions (Figma: Action colours)
  blue: '#045DEC',
  green: '#16C172',
  red: '#F03A47',
  yellow: '#E9D502',

  // Semantic aliases (mapped to Figma action colours)
  success: '#16C172',
  successLight: '#d0fae8',
  warning: '#E9D502',
  warningLight: '#fefbe6',
  error: '#F03A47',
  errorLight: '#fde3e5',
  info: '#045DEC',
  infoLight: '#dbeafe',
};

export const spacing = {
  xs: 4,   // micro gaps, fine details
  sm: 8,   // card inner gaps, tight padding
  md: 12,  // card section padding, avatar/label gaps, card stacking
  lg: 16,  // screen horizontal margin, card padding, icon-label gap
  xl: 20,  // nav bar vertical padding
  '2xl': 24, // search bar margin, icon sizes
  '3xl': 32, // section spacing
  '4xl': 40, // list item height, button height, nav bar horizontal padding
  '5xl': 48, // search bar height, avatar size, full button height
};

export const radius = {
  sm: 6,    // badges, small chips
  md: 12,   // cards, bottom sheets, headers
  lg: 16,   // larger cards
  xl: 24,   // page-level panels, doc frames
  full: 9999, // avatars, pills, buttons
};

// Figma shadow tokens — all values are CSS box-shadow strings
export const shadows = {
  // Bottom, south-facing
  bottomA: '0px 2px 2px 0px rgba(0,0,0,0.03)',   // Button, Pills
  bottomB: '0px 2px 2px 0px rgba(0,0,0,0.06)',   // Inputs
  bottomC: '0px 2px 10px 0px rgba(0,0,0,0.05)',  // Tables
  bottomD: '0px 2px 15px 0px rgba(0,0,0,0.10)',  // Hero banners

  // Top, north-facing
  topA: '0px -2px 2px 0px rgba(0,0,0,0.03)',
  topB: '0px -2px 2px 0px rgba(0,0,0,0.06)',
  topC: '0px -2px 2px 0px rgba(0,0,0,0.10)',
  topD: '0px -2px 15px 0px rgba(0,0,0,0.10)',

  // Side navigation
  sideNav: '4px 0px 15px 0px rgba(0,0,0,0.20)',

  // Tiles
  tilesActive: '0px 10px 15px -3px rgba(0,0,0,0.10)',
  tilesHover:  '0px 10px 15px -3px rgba(116,88,253,0.40)',
};

// Figma type roles: Supporting → Body → Section → Title → Hero
// All roles: lineHeight: Auto (normal), letterSpacing: 0%
export const typography = {
  fontFamily: 'Poppins, sans-serif',
  sizes: {
    supporting: '0.75rem',  // 12px — Supporting text
    body: '0.875rem',       // 14px — Body text
    section: '1.125rem',    // 18px — Section title
    title: '1.375rem',      // 22px — Page title
    hero: '2.5rem',         // 40px — Hero
  },
  weights: {
    regular: 400,
    bold: 700,
  },
};
