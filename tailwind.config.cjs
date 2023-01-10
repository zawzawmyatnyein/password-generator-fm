const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './main.js'],
  theme: {
    extend: {
      fontFamily: {
        mono: ['JetBrains Mono', ...defaultTheme.fontFamily.mono],
      },
      colors: {
        'body-bg': 'hsl(240,17%,8%)',
        'el-bg': 'hsl(249,9%,15%)',
        heading: 'hsl(249,8%,52%)',
        placeholder: 'hsl(247,6%,32%)',
        'green-accent': 'hsl(127, 100%, 82%)',
        'yellow-accent': 'hsl(42, 91%, 68%)',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
