/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'thinspaced' : ['Smooch Sans', 'sans-serif'],
        'boldhead' : ['Vina Sans', 'sans-serif']
      },
      backgroundImage: {
        'main-bg': "url('public/loopbg.gif')",
        'gradient-bg': "url('public/gradient-bg.jpg')",
      }

    },
  },
  plugins: [],
}

