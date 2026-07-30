import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-plus-jakarta)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['var(--font-playfair)', 'ui-serif', 'Georgia', 'serif'],
      },
      fontSize: {
        // Editorial heading scale
        'display-xl': ['clamp(2.75rem,6vw,5rem)', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        'display-lg': ['clamp(2.25rem,5.5vw,4.5rem)', { lineHeight: '1.08', letterSpacing: '-0.025em' }],
        'heading-1': ['clamp(2rem,4.5vw,3.5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'heading-2': ['clamp(1.5rem,3.5vw,2.5rem)', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        'heading-3': ['clamp(1.125rem,2.5vw,1.75rem)', { lineHeight: '1.25', letterSpacing: '-0.015em' }],
        'heading-4': ['clamp(1rem,1.8vw,1.25rem)', { lineHeight: '1.35', letterSpacing: '-0.01em' }],
        // Editorial body scale
        'body-lg': ['1.0625rem', { lineHeight: '1.7', letterSpacing: '0.005em' }],
        'body-base': ['0.9375rem', { lineHeight: '1.65', letterSpacing: '0.01em' }],
        'body-sm': ['0.8125rem', { lineHeight: '1.6', letterSpacing: '0.015em' }],
        caption: ['0.6875rem', { lineHeight: '1.5', letterSpacing: '0.06em' }],
      },
      colors: {
        white: '#ffffff',
        pink: {
          50: '#fff5f7',
          100: '#ffe0e8',
          200: '#ffb3c8',
          300: '#ff8aaa',
          400: '#f75c8e',
          500: '#e91e63',
          600: '#d81b60',
          700: '#c2185b',
          800: '#ad1457',
          900: '#880e4f',
        },
        rose: {
          50: '#fff1f2',
          100: '#ffe4e6',
          200: '#fecdd3',
          300: '#fda4af',
          400: '#fb7185',
          500: '#f43f5e',
          600: '#e11d48',
        },
        warm: '#fdfbf7',
        ink: '#1a1a2e',
        muted: '#6b7280',
        border: '#f1e4e8',
      },
      spacing: {
        '13': '3.25rem',
        '18': '4.5rem',
        '22': '5.5rem',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'scale-in': 'scaleIn 0.4s ease-out forwards',
        float: 'float 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
