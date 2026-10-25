import type { Config } from "tailwindcss";
import colors from "./brand/colors.json";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: colors.background, 2: colors.surface, 3: colors.surfaceRaised, deep: colors.deep },
        gold: { DEFAULT: colors.gold, light: colors.goldLight, dark: colors.goldDark, bronze: colors.goldBronze, champagne: colors.goldChampagne },
        amber: { DEFAULT: colors.amber, light: colors.amberHover },
        cream: { DEFAULT: colors.text, 2: colors.textSecondary },
        muted: { DEFAULT: colors.textMuted, strong: colors.textSecondary },
        // Light theme (redesign, Oct 2026) — colours sampled from the logo.
        paper: { DEFAULT: colors.paper, warm: colors.paperWarm },
        forest: { DEFAULT: colors.forest, hover: colors.forestHover },
        sun: { DEFAULT: colors.sun, hover: colors.sunHover },
        "ink-text": colors.inkText,
        error: colors.error,
        success: colors.success,
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
