/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-gradient":
          "background: linear-gradient(270deg, rgba(255, 80, 35, 0.22) 0%, #FF5023 50%, #BF3C1A 100%)",
      },
    },
  },
  plugins: [],
};
