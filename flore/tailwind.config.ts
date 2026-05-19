import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg:      '#0E1A0E',   // deep forest
          surface: '#172318',   // dark moss
          muted:   '#2A3D2A',   // forest border
          green:   '#6B9E6B',   // sage green (primary)
          honey:   '#C8956C',   // warm honey/terracotta (accent)
          text:    '#EDE8DC',   // warm cream
          dim:     '#7A9E7A',   // muted sage
          // aliases — existing Tailwind classes keep working
          purple:  '#6B9E6B',   // was deep purple → now sage
          pink:    '#C8956C',   // was hot pink → now honey
        },
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans:    ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in':  'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%':   { transform: 'translateY(12px)', opacity: '0' },
          '100%': { transform: 'translateY(0)',     opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

export default config
