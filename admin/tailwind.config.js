

const flowbite = require("flowbite-react/tailwind")

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content()
  ],
  theme: {
    extend: {

      colors:{
        'primary': '#C70000',
        'secondary':"#000",
        'blue':"#121fba",
        'green':"#12ba51",
        "purple":"#8F05F1"
      },

      fontFamily:{

        text:["Poppins", "serif"],

        title:["Titillium Web", "serif"],

      }

    },
  },
  plugins: [
    flowbite.plugin(),
  ],
}