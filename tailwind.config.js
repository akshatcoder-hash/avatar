module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: ["class"],

  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        "satoshi-medium": ["Satoshi Medium", "sans-serif"],
        "satoshi-bold": ["Satoshi Bold", "sans-serif"],
      },
      colors: {
        purple: "#7940F1",
        "dark-purple": "#531BCA",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography", "tailwindcss-animate")],
};
