import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0a0a0a",
        foreground: "#ededed",
        neon: {
          cyan: "#00f0ff",
          purple: "#bf00ff",
          blue: "#0033ff",
        },
      },
      fontFamily: {
        orbitron: ["var(--font-orbitron)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
      },
      boxShadow: {
        "neon-cyan": "0 0 10px #00f0ff, 0 0 20px #00f0ff, 0 0 40px #00f0ff",
        "neon-purple": "0 0 10px #bf00ff, 0 0 20px #bf00ff, 0 0 40px #bf00ff",
      },
      animation: {
        "glow-pulse": "glow-pulse 2s infinite alternate",
        "glitch": "glitch 2s linear infinite",
        "scanline": "scanline 8s linear infinite",
      },
      keyframes: {
        "glow-pulse": {
          "0%": { opacity: "0.8" },
          "100%": { opacity: "1" },
        },
        glitch: {
          "2%, 64%": { transform: "translate(2px, 0) skew(0deg)" },
          "4%, 60%": { transform: "translate(-2px, 0) skew(0deg)" },
          "62%": { transform: "translate(0, 0) skew(5deg)" },
        },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
