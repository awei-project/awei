import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        tomorrow: ["var(--font-tomorrow)"],
      },
    },
    colors: {
      main: "#f3b613",
      gold: "#FFD977",
      silver: "#E1EBF1",
      bronze: "#F69267",
    },
  },
  plugins: [],
};
export default config;
