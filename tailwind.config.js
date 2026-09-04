/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./*.jsx",
    "./*.js",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      borderColor: {
        border: "hsl(var(--border))",
      }
    },
  },
  plugins: [],
}
