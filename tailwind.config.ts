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
          dark: "#0B1120",
          darker: "#080D1A",
          card: "#131B2E",
          "card-hover": "#1A2540",
          border: "#1E2D4A",
          "border-hover": "#2A3F65",
        },
        primary: {
          DEFAULT: "#FF6B4A",
          light: "#FF8A6A",
          dark: "#E5543A",
          glow: "rgba(255, 107, 74, 0.15)",
        },
        accent: {
          DEFAULT: "#2DD4BF",
          light: "#5EEAD4",
          dark: "#14B8A6",
          glow: "rgba(45, 212, 191, 0.15)",
        },
        muted: {
          DEFAULT: "#94A3B8",
          light: "#CBD5E1",
          dark: "#64748B",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "hero-glow":
          "radial-gradient(ellipse 60% 50% at 50% -20%, rgba(255, 107, 74, 0.12), transparent)",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.6s ease-out forwards",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
        "hero-glow": "heroGlow 6s ease-in-out infinite",
        "hero-glow-alt": "heroGlowAlt 8s ease-in-out infinite",
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
        heroGlow: {
          "0%, 100%": { opacity: "0.4", transform: "translate(-50%, -33%) scale(1)" },
          "50%": { opacity: "0.7", transform: "translate(-50%, -33%) scale(1.1)" },
        },
        heroGlowAlt: {
          "0%, 100%": { opacity: "0.3", transform: "scale(1)" },
          "50%": { opacity: "0.6", transform: "scale(1.15)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
