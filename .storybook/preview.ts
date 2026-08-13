import type { Preview } from "@storybook/react";
import "../src/app/globals.css";

const preview: Preview = {
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "cream",
      values: [
        { name: "cream", value: "#f4f1f3" },
        { name: "paper", value: "#fbf8f7" },
        { name: "ink", value: "#2a1e24" },
      ],
    },
  },
};

export default preview;
