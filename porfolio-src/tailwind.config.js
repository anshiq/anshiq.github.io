/** @type {import('tailwindcss').Config} */
import tailwindmotion from "tailwindcss-motion"
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,html}",
  ],
  theme: {
    extend: {},
  },
  plugins: [tailwindmotion],
}

