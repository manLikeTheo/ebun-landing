import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
  ink: { DEFAULT: "#0E0D0B", 2: "#161410", 3: "#1E1B15" },
  gold: {
    DEFAULT: "#C9A84C",
    light: "#E2C07A",
    dark: "#8A6F32",
    bronze: "#5C4A26",
    champagne: "#F0DFAE",
  },
  cream: { DEFAULT: "#F5EFE0", 2: "#EDE4D0" },
    muted: { DEFAULT: "rgba(245,239,224,0.48)", strong: "rgba(245,239,224,0.68)" },

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