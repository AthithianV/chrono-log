/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{tsx,ts,jsx.js}"],
  darkMode: 'selector',
  theme: {
    extend: {
      colors: {
        primary: "#FD4760",
        "secondary": "#DC2E48",
        "primary-bg-light": "#FFFFFF",
        "secondary-bg-light": "#F8FAFC",
        "primary-bg-dark": "#0F172A",
        "secondary-bg-dark": '#1E293B'
      }
    },
  },
  plugins: [],
}

