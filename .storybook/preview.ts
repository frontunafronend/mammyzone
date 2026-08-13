import type { Preview } from "@storybook/react";
import "../src/app/globals.css";

const preview: Preview = {
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "limestone",
      values: [
        { name: "limestone", value: "#d6d0c2" },
        { name: "shade", value: "#141b2c" },
        { name: "glare", value: "#fffef8" },
      ],
    },
  },
};

export default preview;
