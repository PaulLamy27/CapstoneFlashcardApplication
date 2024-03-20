/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    'fontFamily': {
      'sans': ['Martel Sans', 'Rubik', 'sans-serif'],
    },
    extend: {
      textColor: {
        skin: {
          base: "var(--color-text-base)",
          dark: "var(--color-text-dark)",
          inverted: "var(--color-text-inverted)",
          mid: "var(--color-text-mid)",
          header: "var(--color-button-base)"
        }
      },
      backgroundColor: {
        skin: {
          bg: "var(--color-bg)",
          inverted: "var(--color-bg-inverted)",
          select: "var(--color-bg-select)",
          fill: "var(--color-fill)",
          button: "var(--color-button-base)",
          buttonselect: "var(--color-button-select)"
        }
      },
      borderColor: {
        skin: {
          base: "var(--color-border)"
        }
      },
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

