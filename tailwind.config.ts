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
        // Primary
        primary: '#7458FD',
        'dark-blue': '#011638',
        'pearl-white': '#F5F1ED',
        // Monochrome
        'off-black': '#595959',
        'grey-a': '#AAACB0',
        'grey-b': '#BABCBF',
        'grey-c': '#CDCED0',
        'grey-d': '#DDDDDF',
        'grey-e': '#EFF0F0',
        'grey-f': '#F7F7F8',
        // Actions
        'action-blue': '#045DEC',
        'action-green': '#16C172',
        'action-red': '#F03A47',
        'action-yellow': '#E9D502',
      },
      fontFamily: {
        poppins: ['var(--font-poppins)', 'Poppins', 'sans-serif'],
      },
      borderRadius: {
        sm: '6px',
        DEFAULT: '12px',
        lg: '16px',
        xl: '24px',
      },
      boxShadow: {
        'bottom-a': '0px 2px 2px 0px rgba(0,0,0,0.03)',
        'bottom-b': '0px 2px 2px 0px rgba(0,0,0,0.06)',
        'bottom-c': '0px 2px 10px 0px rgba(0,0,0,0.05)',
        'bottom-d': '0px 2px 15px 0px rgba(0,0,0,0.10)',
        'top-a':    '0px -2px 2px 0px rgba(0,0,0,0.03)',
        'top-b':    '0px -2px 2px 0px rgba(0,0,0,0.06)',
        'top-c':    '0px -2px 2px 0px rgba(0,0,0,0.10)',
        'top-d':    '0px -2px 15px 0px rgba(0,0,0,0.10)',
        'side-nav': '4px 0px 15px 0px rgba(0,0,0,0.20)',
        'tiles-active': '0px 10px 15px -3px rgba(0,0,0,0.10)',
        'tiles-hover':  '0px 10px 15px -3px rgba(116,88,253,0.40)',
      },
    },
  },
  plugins: [],
};

export default config;
