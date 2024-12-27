import daisyui from 'daisyui';
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    screens: {
      'sm': '400px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    fontFamily: {
      sans: ['Lexend', 'sans-serif']
    },
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [{
      dark: {
        "primary": "#edede9",
        "secondary": "#d7d7e1",
        "accent": "#4c75bb",
        "neutral": "#d3d7d5",
        "base-100": "#1f1c24",
        "info": "#bae6fd",
        "success": "#bbf7d0",
        "warning": "#fde68a",
        "error": "#fca5a5",
      }, light: {
        "primary": "#403647",
        "secondary": "#504a6c",
        "accent": "#245389",
        "neutral": "#fae6e1",
        "base-100": "#f2edee",
        "info": "#0891b2",
        "success": "#0d9488",
        "warning": "#b45309",
        "error": "#be123c",
      },
    }],
    base: true,
    styled: true,
    utils: true,
    logs: false,
  },
}

