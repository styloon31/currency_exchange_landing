/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "allround-bold": ["allround-bold", "sans-serif"],
        "allround-light": ["allround-light", "sans-serif"],
        "allround-medium": ["allround-medium", "sans-serif"],
        "Helvetica": ["Helvetica", "sans-serif"],
        "Sauce-Tomato": ["Sauce-Tomato", "sans-serif"],
      },
    },
  },
  plugins: [],
};
