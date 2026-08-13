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
        bg:             'hsl(var(--bg))',
        surface:        'hsl(var(--surface))',
        'text-primary': 'hsl(var(--text))',
        muted:          'hsl(var(--muted))',
        stroke:         'hsl(var(--stroke))',
      },
      fontFamily: {
        body:    ['Inter', 'sans-serif'],
        display: ['"Instrument Serif"', 'serif'],
      },
      keyframes: {
        ticker: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.3' },
        },
        'scroll-down': {
          '0%':   { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(200%)' },
        },
        'role-fade-in': {
          '0%':   { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%':      { backgroundPosition: '100% 50%' },
        },
      },
      animation: {
        ticker:           'ticker 40s linear infinite',
        'ticker-fast':    'ticker 24s linear infinite',
        blink:            'blink 2s ease-in-out infinite',
        'scroll-down':    'scroll-down 1.5s ease-in-out infinite',
        'role-fade-in':   'role-fade-in 0.4s ease-out',
        'gradient-shift': 'gradient-shift 6s ease infinite',
      },
    },
  },
  plugins: [],
}
