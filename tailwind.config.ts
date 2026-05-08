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
        rose: { DEFAULT: "#B85070", light: "#E8C4CF", pale: "#F7EEF1", deep: "#7A2D45" },
        sage: { DEFAULT: "#7A9E8E", light: "#C4DEDA", pale: "#EEF6F4" },
        sand: { DEFAULT: "#E8DDD0", deep: "#C4A882" },
        cream: { DEFAULT: "#FAF7F2", warm: "#F3EDE4" },
        ink: { DEFAULT: "#2A1F1A", soft: "#5C4A40", muted: "#9A8A80" },
        paper: "#FFFCF8",
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "Georgia", "serif"],
        sanshe: ["var(--font-heebo)", "system-ui", "sans-serif"],
        sansen: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
      },
      maxWidth: { site: "1340px" },
      spacing: { nav: "72px" },
    },
  },
  plugins: [],
};

export default config;
