/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",                // Ensure index.html is included
    "./src/**/*.{js,jsx,ts,tsx}",   // Include all JavaScript/JSX/TypeScript files inside the src folder
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

