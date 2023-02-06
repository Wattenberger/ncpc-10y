/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Ranade', 'sans-serif'],
        heading: ['Archivo', 'sans-serif'],
        serif: ['Parclo', 'serif'],
      },
      colors: {
        primary: '#B9D2C2',
        "primary-dark": '#2F5E4F',
      }
    },
  },
  plugins: [],
}
