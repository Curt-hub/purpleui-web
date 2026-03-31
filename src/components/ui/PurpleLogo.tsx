// Purple brand assets — full wordmark logo + standalone icon
// All asset URLs from Figma (logos page 1:393, icon page 11:89)
// TODO: Replace Figma MCP asset URLs with permanent SVG assets in /public/logo/
//
// Variant guide:
//   dark-purple  — dark navy body, purple dots  → use on Pearl White (#F5F1ED) backgrounds
//   white-navy   — white body, dark navy dots    → use on Purple (#7458FD) backgrounds
//   white-purple — white body, purple dots       → use on Dark Navy (#011638) backgrounds

export type PurpleLogoVariant = 'dark-purple' | 'white-navy' | 'white-purple';

// ─── Full wordmark logo paths (10 paths) ─────────────────────────────────────
// All URLs from Figma node 1:393

// dark-purple: imgVector10–19
const LOGO_DARK_PURPLE = [
  'https://www.figma.com/api/mcp/asset/a5ae91d6-473b-4bba-b1a4-c8a03551de3b',
  'https://www.figma.com/api/mcp/asset/6894a047-4193-4322-8cc7-8621792f7959',
  'https://www.figma.com/api/mcp/asset/37ce4720-ce13-4d8c-8989-e626271ecc42',
  'https://www.figma.com/api/mcp/asset/fd2861f9-5f4b-439f-8d75-0da14abaf31c',
  'https://www.figma.com/api/mcp/asset/12e4d4cb-6c93-4bf9-b1f8-691321175e46',
  'https://www.figma.com/api/mcp/asset/22fd9e20-40b8-419e-b7b3-0e8d86be1818',
  'https://www.figma.com/api/mcp/asset/ceb06c66-37c5-4295-bb78-d8a0d41feb58', // purple dot
  'https://www.figma.com/api/mcp/asset/5d679c14-c57b-4a95-b1e6-2a2bc342ad35',
  'https://www.figma.com/api/mcp/asset/09327adf-550c-4c03-97c2-a35741c0cca3', // purple dot
  'https://www.figma.com/api/mcp/asset/e6383542-a050-4a1c-82bb-43dd13f16cd0',
];

// white body base paths (shared by white-navy and white-purple): imgVector0–9
const LOGO_WHITE_BODY = [
  'https://www.figma.com/api/mcp/asset/1e7cae96-a398-47b0-ac77-f8eeb5bb7003',
  'https://www.figma.com/api/mcp/asset/8042b4c5-9ad3-4941-91da-1af2effa5fd2',
  'https://www.figma.com/api/mcp/asset/b0d99d66-ac89-4108-8f64-6b7b4e9731c2',
  'https://www.figma.com/api/mcp/asset/17fba3a9-66a4-4795-940d-b895d79eb4d0',
  'https://www.figma.com/api/mcp/asset/04d9f2d6-18e0-4d99-afc7-cffb44e85714',
  'https://www.figma.com/api/mcp/asset/bbff287c-c975-4962-9834-bc4569a33402',
  'https://www.figma.com/api/mcp/asset/ab2d8a82-727d-484e-a302-d1e598a43cfa', // navy dot (6)
  'https://www.figma.com/api/mcp/asset/b51c70c0-7ff9-454c-8bd6-7f4785a2afd8',
  'https://www.figma.com/api/mcp/asset/f1d60171-e2e9-42f4-84c5-6b4bb1277c8a', // navy dot (8)
  'https://www.figma.com/api/mcp/asset/31f8faaa-c6f2-48dd-b635-3ef80ff4a013',
];

// white-purple: same body, but positions 6 & 8 use purple dots (imgVector20, 21)
const LOGO_WHITE_PURPLE = [
  ...LOGO_WHITE_BODY.slice(0, 6),
  'https://www.figma.com/api/mcp/asset/fc6e229b-789a-479e-959b-29cd896e604a', // purple dot (6)
  LOGO_WHITE_BODY[7],
  'https://www.figma.com/api/mcp/asset/8fd88afe-a4a7-4df8-bd2c-dc66f0ffe70d', // purple dot (8)
  LOGO_WHITE_BODY[9],
];

// Figma insets for wordmark (top / right / bottom / left as %)
const LOGO_INSETS = [
  [28.83, 42.91, 14.39, 44.27],
  [20.51, 14.72, 15.69, 81.66],
  [27.71, 55.73,  6.73, 29.36],
  [27.71, 18.34,  6.73, 66.76],
  [28.80, 34.09, 15.69, 57.95],
  [11.40, 75.31, 39.67,  0.00],
  [ 0.00, 75.31, 77.20, 18.83],
  [60.31, 79.74,  7.04,  3.74],
  [85.91, 92.64,  0.00,  3.74],
  [27.72,  0.00, 14.96, 85.27],
];

// ─── Standalone icon paths (4 paths) ─────────────────────────────────────────
// All URLs from Figma node 11:89

const ICON_DARK_PURPLE = [
  'https://www.figma.com/api/mcp/asset/fb80fa5e-94f7-4e62-8297-771b5e3a81f2', // body
  'https://www.figma.com/api/mcp/asset/37da7f76-9a16-4920-b58d-2332576df060', // top dot (purple)
  'https://www.figma.com/api/mcp/asset/9c1573f3-5838-4db6-b3e5-d9870b872a46', // bottom arm
  'https://www.figma.com/api/mcp/asset/87a1f91c-e39b-4baf-93cd-a80700b0821e', // bottom dot (purple)
];

const ICON_WHITE_BODY = [
  'https://www.figma.com/api/mcp/asset/7552cb7a-e4a0-4d29-a204-e0faca5723d6', // body
  'https://www.figma.com/api/mcp/asset/ee0a5998-f4e0-47c4-9f59-8294f23c9676', // top dot (navy)
  'https://www.figma.com/api/mcp/asset/32ba43b7-5217-4446-a74d-c5a9131a4d31', // bottom arm
  'https://www.figma.com/api/mcp/asset/e66f990e-5c42-4520-a5cd-289bcfea1823', // bottom dot (navy)
];

const ICON_WHITE_PURPLE = [
  ICON_WHITE_BODY[0],
  'https://www.figma.com/api/mcp/asset/5929caaf-1157-449d-994d-bfca95a326ec', // top dot (purple)
  ICON_WHITE_BODY[2],
  'https://www.figma.com/api/mcp/asset/be5b2216-e4ce-4910-b1a0-6cdb9a25fdc7', // bottom dot (purple)
];

// Figma insets for icon (top / right / bottom / left as %)
const ICON_INSETS = [
  [11.77, 0.57, 39.57,  0.00],
  [ 0.43, 0.57, 76.89, 75.83],
  [60.42, 18.41,  7.11, 15.05],
  [85.88, 70.36,  0.10, 15.06],
];

// ─── Components ──────────────────────────────────────────────────────────────

interface PurpleLogoProps {
  variant?: PurpleLogoVariant;
  /** Width in px — height scales proportionally (~3.9:1 ratio) */
  width?: number;
}

export function PurpleLogo({ variant = 'white-purple', width = 245 }: PurpleLogoProps) {
  const srcs =
    variant === 'dark-purple'  ? LOGO_DARK_PURPLE  :
    variant === 'white-navy'   ? LOGO_WHITE_BODY   :
                                 LOGO_WHITE_PURPLE;
  const height = Math.round(width / 3.895);

  return (
    <div style={{ width, height, position: 'relative', flexShrink: 0 }}>
      {LOGO_INSETS.map(([top, right, bottom, left], i) => (
        <div key={i} style={{ position: 'absolute', top: `${top}%`, right: `${right}%`, bottom: `${bottom}%`, left: `${left}%` }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" src={srcs[i]} style={{ display: 'block', width: '100%', height: '100%', maxWidth: 'none' }} />
        </div>
      ))}
    </div>
  );
}

interface PurpleIconProps {
  variant?: PurpleLogoVariant;
  /** Height in px — width scales proportionally (~0.96:1 ratio) */
  size?: number;
}

export function PurpleIcon({ variant = 'white-purple', size = 64 }: PurpleIconProps) {
  const srcs =
    variant === 'dark-purple' ? ICON_DARK_PURPLE  :
    variant === 'white-navy'  ? ICON_WHITE_BODY   :
                                ICON_WHITE_PURPLE;
  const width = Math.round(size * 0.96);

  return (
    <div style={{ width, height: size, position: 'relative', flexShrink: 0 }}>
      {ICON_INSETS.map(([top, right, bottom, left], i) => (
        <div key={i} style={{ position: 'absolute', top: `${top}%`, right: `${right}%`, bottom: `${bottom}%`, left: `${left}%` }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" src={srcs[i]} style={{ display: 'block', width: '100%', height: '100%', maxWidth: 'none' }} />
        </div>
      ))}
    </div>
  );
}
