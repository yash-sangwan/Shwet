/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors:{
          primary:"#EAB308",
          secondary:"#CA8A04",
          primaryText:"#FFFFFF",
          secondaryText:"#BDBDBD",
          primaryBg:"#000000",

      },
      fontFamily: {
        museo: ["MuseoModerno", "sans-serif"],
      },
      backgroundImage: {
        'hero-pattern': "url('/src/assets/pattern.png')",
      },

    },
  },
  plugins: [],
};
