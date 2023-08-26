/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        primary: "#FBF0B2",
      },
    },
  },
  plugins: [
    require('flowbite/plugin'),
    require("daisyui"),
  ]
});




