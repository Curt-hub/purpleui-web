import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // ── Brand ─────────────────────────────────────────────
        brand:        '#7458FD',
        'brand-subtle': '#eceaff',

        // ── Backgrounds ───────────────────────────────────────
        background:            '#FFFFFF',
        'background-elevated': '#F7F7F8',
        'background-sunken':   '#F9F9FC',
        'background-navy':     '#011638',
        'background-alt':      '#F5F1ED',

        // ── Text & icons ──────────────────────────────────────
        'on-background':           '#000000',
        'on-background-secondary': '#595959',
        'on-background-tertiary':  '#AAACB0',

        // ── Borders & dividers ─────────────────────────────────
        outline:        '#CDCED0',
        'outline-subtle': '#EFF0F0',

        // ── Misc ─────────────────────────────────────────────
        'loader-track': '#DDDDDF',

        // ── Status ────────────────────────────────────────────
        success:         '#16C172',
        'success-subtle': '#E8F5E9',
        error:           '#F03A47',
        warning:         '#E9D502',
        info:            '#045DEC',
      },
      fontFamily: {
        poppins: ['var(--font-poppins)', 'Poppins', 'sans-serif'],
      },
      borderRadius: {
        sm:      '6px',
        DEFAULT: '12px',
        lg:      '16px',
        xl:      '24px',
      },
      boxShadow: {
        'bottom-a':    '0px 2px 2px 0px rgba(0,0,0,0.03)',
        'bottom-b':    '0px 2px 2px 0px rgba(0,0,0,0.06)',
        'bottom-c':    '0px 2px 10px 0px rgba(0,0,0,0.05)',
        'bottom-d':    '0px 2px 15px 0px rgba(0,0,0,0.10)',
        'top-a':       '0px -2px 2px 0px rgba(0,0,0,0.03)',
        'top-b':       '0px -2px 2px 0px rgba(0,0,0,0.06)',
        'top-c':       '0px -2px 2px 0px rgba(0,0,0,0.10)',
        'top-d':       '0px -2px 15px 0px rgba(0,0,0,0.10)',
        'side-nav':    '4px 0px 15px 0px rgba(0,0,0,0.20)',
        'tiles-active': '0px 10px 15px -3px rgba(0,0,0,0.10)',
        'tiles-hover':  '0px 10px 15px -3px rgba(116,88,253,0.40)',
      },
    },
  },
  plugins: [],
};

export default config;
