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
        ink: "#142B26",
        forest: {
          DEFAULT: "#145143",
          deep: "#0B332C",
          dark: "#091E1A",
          light: "#1C6B59",
        },
        ivory: "#FAF9F4",
        sage: {
          DEFAULT: "#E3ECE5",
          light: "#F0F3EE",
        },
        mist: "#F0F3EE",
        line: "#D8E2DA",
        "antique-gold": {
          DEFAULT: "#C0914E",
          light: "#E8BC72",
        },
        ocean: "#235D6C",
        clay: "#9B533C",
        warning: {
          bg: "#FFF1D5",
          text: "#6D4813",
        },
        error: "#9C332D",
        success: "#216A51",
      },
      borderRadius: {
        card: "20px",
        pill: "999px",
      },
      boxShadow: {
        card: "0 8px 28px rgba(12, 36, 27, 0.075)",
        elevated: "0 12px 32px rgba(12, 36, 27, 0.12)",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "-apple-system", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;

