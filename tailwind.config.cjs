/** @type {import('tailwindcss').Config} */

const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        logo: ["var(--font-logo)"],
        main: ["var(--font-main)"],
      },
      colors: {
        white: "#fffff1",
        black: "#1A1A19",
        gray: "#C3C3C3",
        orange: "#DE612B",
        yellow: "#FAEBD3",
        violet: "#B685D0",
      },
    },
  },
  plugins: [],
};

module.exports = config;
