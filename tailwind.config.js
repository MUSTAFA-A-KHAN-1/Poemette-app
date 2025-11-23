/** @type {import('tailwindcss').Config} */
export default {
  // CRITICAL: This tells Tailwind where to find your utility classes (in src/ directory).
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", 
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}