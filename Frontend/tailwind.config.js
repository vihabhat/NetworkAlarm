// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#DE522B',
        secondary: '#0D1F2D',
        background: '#0D2030',
        formBg: '#F9F9F1',
      },
    },
  },
  plugins: [],
}