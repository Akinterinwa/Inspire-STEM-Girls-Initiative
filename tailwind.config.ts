import type { Config } from 'tailwindcss';

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          purple: '#2C0E40',
          'purple-dark': '#1E082C',
          'purple-deep': '#150520',
          'purple-light': '#41175E',
          'purple-muted': '#58247C',
          'purple-subtle': '#F6EFF9',
          gold: '#F0C747',
          'gold-hover': '#DCB132',
          'gold-dark': '#C6981E',
          'gold-light': '#FBF2D5',
          'gold-subtle': '#FEFAF0',
          light: '#EFEFF0',
          'light-hover': '#E3E3E5',
          'light-surface': '#F8F8F9',
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
