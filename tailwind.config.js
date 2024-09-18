/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Mulish, sans-serif"],
        sora: ["Sora, sans-serif"],
      },
      colors: {
        primary: "rgb(var(--primary))",
        secondary: "rgb(var(--secondary))",
        light: "rgb(var(--light))",
        lighter: "rgb(var(--lighter))",
        main: "rgb(var(--main))",
        sub: "rgb(var(--sub))",
        line: "rgb(var(--line))",
        invert: "var(--invert)",
      }
    },
  },
  plugins: [],
}

