/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0f172a",
        surface: "#1e293b",
        accent: "#38bdf8",
      },
      boxShadow: {
        soft: "0 10px 30px rgba(2, 6, 23, 0.45)",
        lift: "0 16px 40px rgba(2, 6, 23, 0.55)",
      },
    },
  },
  plugins: [],
}

