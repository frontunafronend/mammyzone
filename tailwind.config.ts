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
        rose: {
          DEFAULT: "var(--rose)",
          light: "var(--rose-light)",
          pale: "var(--rose-pale)",
          deep: "var(--rose-deep)",
        },
        sage: {
          DEFAULT: "var(--sage)",
          light: "var(--sage-light)",
          pale: "var(--sage-pale)",
        },
        sand: {
          DEFAULT: "var(--sand)",
          deep: "var(--sand-deep)",
        },
        cream: {
          DEFAULT: "var(--cream)",
          warm: "var(--cream-warm)",
        },
        ink: {
          DEFAULT: "var(--ink)",
          soft: "var(--ink-soft)",
          muted: "var(--ink-muted)",
        },
        paper: "var(--white)",
      },
      fontFamily: {
        display: [
          "var(--font-display)",
          "Cormorant Garamond",
          "Georgia",
          "serif",
        ],
        bodyHe: [
          "var(--font-body-he)",
          "Heebo",
          "system-ui",
          "sans-serif",
        ],
        bodyEn: [
          "var(--font-body-en)",
          "DM Sans",
          "system-ui",
          "sans-serif",
        ],
      },
      maxWidth: {
        site: "var(--max-w)",
      },
      spacing: {
        nav: "var(--nav-h)",
      },
      borderRadius: {
        /** Design radii from homepage CSS */
        xs: "4px",
        ui: "12px",
        soft: "14px",
        chip: "16px",
        card: "20px",
        cardLg: "24px",
        frame: "28px",
        pill: "999px",
      },
      transitionTimingFunction: {
        out: "var(--ease-out)",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(28px)" },
          "100%": { opacity: "1", transform: "translateY(0px)" },
        },
        imgReveal: {
          "0%": { opacity: "0", transform: "scale(1.04)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        marquee: {
          "0%": { transform: "translateX(0px)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.8s var(--ease-out) forwards",
        "fadeUp-slow": "fadeUp 0.9s var(--ease-out) forwards",
        imgReveal: "imgReveal 1.2s var(--ease-out) forwards",
        marquee: "marquee 30s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
