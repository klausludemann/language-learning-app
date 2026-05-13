/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        sand: {
          50: "#fffaf0",
          100: "#fdf3df",
          200: "#fae3b8",
        },
        terra: {
          400: "#f97316",
          500: "#ea580c",
          600: "#c2410c",
          700: "#9a3412",
        },
      },
      fontFamily: {
        sans: [
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};
