/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Sora"', 'sans-serif'],
        sans: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        ink: {
          DEFAULT: 'var(--color-ink)',
          light: 'var(--color-ink-light)',
        },
        surface: 'var(--color-surface)',
        canvas: 'var(--color-canvas)',
        line: 'var(--color-line)',
        brand: {
          50: '#EEF0FD',
          100: '#DDE1FB',
          400: '#7A72F0',
          500: '#4F46E5',
          600: '#4038C4',
          700: '#332DA0',
        },
        navy: {
          900: '#0D1120',
          800: '#12172B',
          700: '#1B2140',
          600: '#2A3260',
        },
        status: {
          open: '#F59E0B',
          openBg: 'var(--color-status-openBg)',
          progress: '#3B82F6',
          progressBg: 'var(--color-status-progressBg)',
          resolved: '#10B981',
          resolvedBg: 'var(--color-status-resolvedBg)',
        },
      },
      boxShadow: {
        card: 'var(--shadow-card)',
      },
      borderRadius: {
        xl2: '1rem',
      },
    },
  },
  plugins: [],
}
