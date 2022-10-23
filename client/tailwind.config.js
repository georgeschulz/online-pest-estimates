/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['"Poppins"', ...defaultTheme.fontFamily.sans],
        'roboto': ['"Roboto"', ...defaultTheme.fontFamily.sans],
        'code': ['"Fira Code"', ...defaultTheme.fontFamily.sans]
      },
      colors: {
        'primary': '#6A77D9',
        'light': '#F7F7F7',
        'pink': '#F1E2E9',
        'dark': '#464646',
        'matte': '#393939',
        'lightmatte': '#7C7A7A',
        'lightgray': '#B9B9B9',
        'tableheader': '#5B5B5B',
        'tableBody': '#363636'
      }
    },
  },
  plugins: [],
}
