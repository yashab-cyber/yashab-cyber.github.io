/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0f172a",   // Dark blue/black base
        accent: "#38bdf8",    // Light blue accents
        danger: "#ef4444",    // Red for alerts
        success: "#22c55e",   // Green for success messages
        neutral: "#1e293b"    // Dark neutral for background panels
      },
      fontFamily: {
        mono: ['"Fira Code"', "monospace"],
        sans: ['"Inter"', "sans-serif"]
      },
      borderRadius: {
        xl: "1rem",
        '2xl': "1.5rem"
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography')
  ]
};
