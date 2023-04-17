/** @type {import('tailwindcss').Config} */

const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ["Satoshi", "sans-serif"],
        body: ["Satoshi", "sans-serif"],
      },
      colors: {
        white: "#e8e8cf",
        black: "#10100e",
        gray: "#e8e8cf",
        orange: "#DE612B",
        yellow: "#FAEBD3",
        violet: "#B685D0",
      },
    },
  },
  plugins: [],
};

module.exports = config;
