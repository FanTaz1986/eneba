/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'eneba-purple': '#4B0082',
        'eneba-blue': '#3B82F6',
        'eneba-dark': '#1F2937',
        'eneba-light': '#F3F4F6',
        'eneba-green': '#10B981',
        'eneba-orange': '#F59E0B',
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
