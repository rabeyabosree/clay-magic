/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customText: '#BA54DA',
        textmedium : "#437A58",
        customGreen: '#F3F16A',
        customYellow: '#FAEE5A',
        ButtonColor: "#0D153A",
        ShinyColor: "#571B97",
        BgColor: "#CBBBE8"
      },
    },
  },
  plugins: [],
}

