import { plugin } from "postcss";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "fade-in": "fadeIn 1s ease-in-out 1.2s forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".clip_polygon": {
          "clip-path": "polygon(0 0, 100% 0, 100% 100%, 0 79%)",
        },
        ".clip_polygon_luxury": {
          "clip-path": "polygon(0 0, 82% 0, 100% 100%, 0% 100%)",
        },
      };
      addUtilities(newUtilities);
    },
  ],
};
