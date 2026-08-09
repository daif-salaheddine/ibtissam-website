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
        bg:          '#F5EDE0',
        surface:     '#FFFFFF',
        card:        '#F5EDE0',
        amber:       '#C4973A',
        'amber-dim': '#8A6820',
        sage:        '#5A7060',
        cream:       '#2A2218',
        'cream-2':   '#5A5048',
        'cream-3':   '#9A8E84',
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
        ticker:        'ticker 40s linear infinite',
        'ticker-fast': 'ticker 24s linear infinite',
        blink:         'blink 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
