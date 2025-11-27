/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'grafite': '#1c1c1c',
        'grafite-light': '#2c2c2c',
        'grafite-medium': '#383838',
        'amarelo-olho': '#ffc107',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}