import { plugin } from "postcss";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".clip_polygon": {
          "clip-path": "polygon(0 0, 100% 0, 100% 100%, 0 79%)",
        },
      };
      addUtilities(newUtilities);
    },
  ],
};
