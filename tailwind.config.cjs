/** @type {import('tailwindcss').Config} */

const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    darkMode: "class",
    extend: {
      fontFamily: {
        logo: ["var(--font-logo)"],
        main: ["var(--font-main)"],
      },
      colors: {
        white: "#FFFFFF",
        black: "#000000",
        gray: "#C3C3C3",
        orange: "#DE612B",
        neon: "#E8FF34",
        purple: "#9747FF",
        pink: "#E2C6D2",
        yellow: "#D3AE48",
      },
    },
  },
  plugins: [],
};

module.exports = config;
