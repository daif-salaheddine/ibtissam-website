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
        bg:      '#080706',
        surface: '#111009',
        card:    '#1A1714',
        amber:   '#E8A020',
        'amber-dim':  '#A06B10',
        sage:    '#5C9B52',
        cream:   '#F2EBE0',
        'cream-2': '#A89B88',
        'cream-3': '#6B6055',
      },
      fontFamily: {
        cormorant: ['"Cormorant Garamond"', 'serif'],
        dm:        ['"DM Sans"', 'sans-serif'],
        mono:      ['"JetBrains Mono"', 'monospace'],
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
        ticker:       'ticker 40s linear infinite',
        'ticker-fast': 'ticker 24s linear infinite',
        blink:        'blink 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
