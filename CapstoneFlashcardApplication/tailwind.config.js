/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    'fontFamily': {
      'sans': ['Martel Sans', 'Rubik', 'sans-serif'],
    },
    extend: {
      fontSize: {
        '3xl': '3rem'
      }
    },
  },
  plugins: [],
  variants: {
    extend: {
      display: ["group-hover"],
  },
  }
}

