import type { Preview } from "@storybook/react";
import "../src/app/globals.css";

const preview: Preview = {
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "cream",
      values: [
        { name: "cream", value: "#faf7f2" },
        { name: "paper", value: "#fffcf8" },
        { name: "ink", value: "#2a1f1a" },
      ],
    },
  },
};

export default preview;
