import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#080B12",
          900: "#0B0F19",
          800: "#111624",
          700: "#1A2033",
          600: "#252C42",
          500: "#38405C",
        },
        wire: {
          400: "#5B8DEF",
          500: "#3E6FE0",
          600: "#2E56C4",
        },
        amber: {
          300: "#F7C873",
          400: "#F5A623",
          500: "#D98A0F",
        },
        paper: "#ECE9E1",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
        body: ["var(--font-body)", "sans-serif"],
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(to bottom, transparent, #080B12 85%), repeating-linear-gradient(0deg, rgba(91,141,239,0.06) 0px, rgba(91,141,239,0.06) 1px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, rgba(91,141,239,0.06) 0px, rgba(91,141,239,0.06) 1px, transparent 1px, transparent 40px)",
      },
      boxShadow: {
        wire: "0 0 0 1px rgba(91,141,239,0.25), 0 8px 30px -8px rgba(91,141,239,0.35)",
      },
    },
  },
  plugins: [],
};
export default config;
