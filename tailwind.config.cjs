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
        white: "#FFFFFF",
        black: "#000000",
        gray: "#C3C3C3",
        orange: "#F98B25",
        neon: "#E8FF34",
        purple: "#9747FF",
      },
    },
  },
  plugins: [],
};

module.exports = config;
