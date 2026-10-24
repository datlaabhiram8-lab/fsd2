/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Deep Navy for Navigation & Sidebar
        navy: {
          50: '#F0F4F8',
          100: '#D9E2EC',
          200: '#BCCCDC',
          300: '#9FB3C8',
          400: '#627D98',
          500: '#486581',
          600: '#334E68',
          700: '#243B53',
          800: '#102A43',
          900: '#0B192C',
          950: '#07101E',
        },
        // Royal Blue for Primary Buttons & Highlights
        royal: {
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB', // Royal Blue Primary
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A',
        },
        // Very Light Blue for Page Background
        lightblue: {
          50: '#F8FAFC',
          100: '#F0F7FF',
          200: '#E0F2FE',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          subtle: '#F0F7FF',
          muted: '#F8FAFC',
          border: '#E2E8F0',
        },
        // 8 Workflow Task Status Colors
        status: {
          todo: { bg: '#F1F5F9', text: '#475569', border: '#CBD5E1' },
          inprogress: { bg: '#EFF6FF', text: '#1D4ED8', border: '#93C5FD' },
          submitted: { bg: '#FEF3C7', text: '#B45309', border: '#FCD34D' },
          inreview: { bg: '#F3E8FF', text: '#7E22CE', border: '#D8B4FE' },
          changes: { bg: '#FFF1F2', text: '#BE123C', border: '#FDA4AF' },
          approved: { bg: '#F0FDFA', text: '#0F766E', border: '#99F6E4' },
          completed: { bg: '#ECFDF5', text: '#047857', border: '#6EE7B7' },
          blocked: { bg: '#FEF2F2', text: '#B91C1C', border: '#FCA5A5' },
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 10px -1px rgba(11, 25, 44, 0.05), 0 1px 3px -1px rgba(11, 25, 44, 0.03)',
        'elevated': '0 10px 25px -5px rgba(11, 25, 44, 0.08), 0 8px 10px -6px rgba(11, 25, 44, 0.03)',
      }
    },
  },
  plugins: [],
}
