import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        molten: "#780000",
        brick: "#c1121f",
        papaya: "#fdf0d5",
        deep: "#003049",
        steel: "#669bbc",
      },
      fontFamily: {
        playfair: ["Playfair Display", "serif"],
        dm: ["DM Sans", "sans-serif"],
        mono: ["Space Mono", "monospace"],
      },
      animation: {
        "blur-in": "blurIn 0.8s ease forwards",
        "fade-up": "fadeUp 0.7s ease forwards",
        "scroll-pulse": "scrollPulse 1.8s ease infinite",
      },
      keyframes: {
        blurIn: {
          from: { opacity: "0", filter: "blur(12px)", transform: "translateY(-12px)" },
          to: { opacity: "1", filter: "blur(0)", transform: "translateY(0)" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        scrollPulse: {
          "0%, 100%": { transform: "scaleY(1)", opacity: "0.2" },
          "50%": { transform: "scaleY(1.4)", opacity: "0.5" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
