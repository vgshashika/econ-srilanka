/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Ecom.lk Brand Palette
        brand: {
          navy: "#0C1E35",      // Deep midnight navy — header, navbar, footer
          navyMid: "#1E3A5F",   // Medium navy — sidebar headers, secondary UI
          orange: "#E8820C",    // Golden saffron — primary CTA and accents
          orangeLight: "#FFF3E0", // Warm cream — subtle highlights
          bg: "#F5F7FA",        // Page background
        },
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          '"Helvetica Neue"',
          "Arial",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};
