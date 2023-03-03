/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx}", "./src/components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateRows: {
        main: "auto 1fr auto",
      },
      fontFamily: {
        sans: ["Poppins", "ui-sans-serif", "system-ui", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
      },
      screens: {
        xsm: "550px",
      },
      fontSize: {
        xs: "0.75rem",
      },
      minWidth: {
        pt: "2rem",
      },
      height: {
        vh: "60vh",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
