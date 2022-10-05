/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['"Poppins"', ...defaultTheme.fontFamily.sans],
        'roboto': ['"Roboto"', ...defaultTheme.fontFamily.sans]
      },
      colors: {
        'primary': '#6A77D9',
        'light': '#F7F7F7',
        'pink': '#F1E2E9',
        'dark': '#464646'
      }
    },
  },
  plugins: [],
}
