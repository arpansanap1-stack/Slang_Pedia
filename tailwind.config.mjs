/** @type {import('tailwindcss').Config} */
export default {
  content: ["./app/**/*.{js,jsx}", "./componenets/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bubblePink: "#FF6B97",
        bubbleYellow: "#FFE600",
        bubbleBlue: "#4ECDC4",
        bubblePurple: "#9B5DE5",
        bubbleGreen: "#00F5D4",
        chalkDark: "#1E1B18"
      },
      boxShadow: {
        pop: "4px 4px 0px 0px #1E1B18",
        popLg: "6px 6px 0px 0px #1E1B18",
        popPressed: "1px 1px 0px 0px #1E1B18"
      },
      borderRadius: {
        chunky: "24px"
      }
    }
  },
  plugins: []
};