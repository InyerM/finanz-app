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
        "primary-light": "#f4a261",
        "primary-dark": "#c65d29",
        secondary: "#f32757",
        tertiary: "#0072F5",
        quaternary: "#9750DD",
        font: {
          primary: "#525151",
          secondary: "#171717",
        },
        github: {
          primary: "#24292e",
          secondary: '#0d1017'
        },
        error: "#f32757",
        success: "#00d1b2",
        warining: "#F5A524",
        neutral: "#697177"
      },
      lineHeight: {
        12: "3rem",
        15: "4rem"
      },
    },
  },
  plugins: [],
}
