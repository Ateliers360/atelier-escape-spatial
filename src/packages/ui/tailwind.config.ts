import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    // On cible tous les fichiers dans packages/ui et dans les apps qui consomment ce config
    "./src/**/*.{js,ts,jsx,tsx}",
    "../../apps/web/**/*.{js,ts,jsx,tsx}",
    "../../apps/rover-app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Palette "Deep Space"
        space: {
          950: "#020408", // Fond principal (Noir sidéral)
          900: "#060c14", // Fond panneaux
          800: "#0a1220", // Fond inputs / zones actives
          700: "#1e3a5a", // Bordures froides
        },
        // Couleurs fonctionnelles Néon
        mission: {
          cyan: "#22d4f5",    // Texte nominal / Actions
          green: "#22f59a",   // Statut OK
          amber: "#f5a822",   // Warning / Attention
          red: "#f54a22",     // Alerte critique
          violet: "#a855f7",  // Données scientifiques
        },
      },
      fontFamily: {
        sans: ["var(--font-space-grotesk)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      animation: {
        "flicker": "flicker 0.15s infinite",
        "scanline": "scanline 8s linear infinite",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "glitch": "glitch 0.3s cubic-bezier(.25,.46,.45,.94) both infinite",
      },
      keyframes: {
        flicker: {
          "0%": { opacity: "0.98" },
          "10%": { opacity: "0.93" },
          "100%": { opacity: "1" },
        },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        glitch: {
          "0%": { transform: "translate(0)" },
          "20%": { transform: "translate(-2px, 2px)" },
          "40%": { transform: "translate(-2px, -2px)" },
          "60%": { transform: "translate(2px, 2px)" },
          "80%": { transform: "translate(2px, -2px)" },
          "100%": { transform: "translate(0)" },
        },
      },
      backgroundImage: {
        "grid-pattern": "linear-gradient(to right, #0f1e30 1px, transparent 1px), linear-gradient(to bottom, #0f1e30 1px, transparent 1px)",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("tailwindcss-animate"),
  ],
};

export default config;
