/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0d0d0d",
        primary: "#f47836",
        secondary: "#f32757",
        font: {
          primary: "#525151",
          secondary: "#171717",
        },
        github: {
          primary: "#24292e",
          secondary: '#0d1017'
        },
        error: "#f32757",
      },
    },
  },
  plugins: [],
}
