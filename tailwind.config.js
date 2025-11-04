/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        "resume-blue": "#3b82f6",
        "resume-dark": "#1e293b",
      },
      fontFamily: {
        resume: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
