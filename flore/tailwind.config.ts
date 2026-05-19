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
          bg:      '#17184B',   // Tetsu-Kon Blue
          surface: '#1E2262',   // mid navy
          muted:   '#273287',   // Intergalactic Highway
          yellow:  '#D8E63C',   // Duranta Yellow
          violet:  '#D6B4FC',   // Light Violet
          text:    '#F0EEE9',   // Cloud Dancer
          dim:     '#D3DDE7',   // Nordic Breeze
          // aliases for existing class names
          purple:  '#D8E63C',   // → Duranta Yellow
          pink:    '#D6B4FC',   // → Light Violet
          green:   '#D8E63C',
          honey:   '#D6B4FC',
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
        fadeIn:  { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: { '0%': { transform: 'translateY(12px)', opacity: '0' }, '100%': { transform: 'translateY(0)', opacity: '1' } },
      },
    },
  },
  plugins: [],
}

export default config
