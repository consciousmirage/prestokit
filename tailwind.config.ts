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
        background: "var(--background)",
        foreground: "var(--foreground)",
        brand: {
          dark: "#0a0a0f",
          darker: "#06060a",
          card: "#12121a",
          "card-hover": "#1a1a26",
          border: "#1e1e2e",
          "border-hover": "#2a2a3e",
        },
        primary: {
          DEFAULT: "#7c6cf0",
          light: "#9d90f5",
          dark: "#5b4bc7",
          glow: "rgba(124, 108, 240, 0.15)",
        },
        accent: {
          DEFAULT: "#00e676",
          light: "#66ffa6",
          dark: "#00b248",
          glow: "rgba(0, 230, 118, 0.15)",
        },
        muted: {
          DEFAULT: "#8888a0",
          light: "#aaaabb",
          dark: "#555566",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "hero-glow":
          "radial-gradient(ellipse 60% 50% at 50% -20%, rgba(124, 108, 240, 0.12), transparent)",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.6s ease-out forwards",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
