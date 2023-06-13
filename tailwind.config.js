const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  plugins: [require('@tailwindcss/forms')],
  theme: {
    extend: {
      fontFamily: {
        algo: ['Algo', ...defaultTheme.fontFamily.sans]
      },
      screens: {
        xs: '390px',
        '3xl': '1600px',
        '4xl': '1920px',
        '5xl': '2560px'
      }
    }
  }
}
