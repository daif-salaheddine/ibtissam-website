/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './lib/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg:          '#F3F1EC',
        surface:     '#FFFFFF',
        card:        '#F8F5EE',
        amber:       '#D9920E',
        'amber-dim': '#8A5C0A',
        sage:        '#3D8030',
        cream:       '#221F1C',
        'cream-2':   '#6B6560',
        'cream-3':   '#9B968F',
      },
      fontFamily: {
        cormorant: ['"Cormorant Garamond"', 'serif'],
        dm:        ['"DM Sans"', 'sans-serif'],
        mono:      ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        card:     '0 1px 3px rgba(34,31,28,0.04), 0 8px 32px rgba(34,31,28,0.07)',
        'card-sm': '0 1px 2px rgba(34,31,28,0.03), 0 4px 16px rgba(34,31,28,0.05)',
      },
      keyframes: {
        ticker: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        blink: {
          '0%, 100%': { opacity: 1 },
          '50%':      { opacity: 0.3 },
        },
      },
      animation: {
        ticker:        'ticker 40s linear infinite',
        'ticker-fast': 'ticker 24s linear infinite',
        blink:         'blink 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
