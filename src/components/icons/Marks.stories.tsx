import type { Meta, StoryObj } from "@storybook/react";
import {
  MarkBelly,
  MarkCircle,
  MarkMat,
  MarkMind,
  MarkRetreat,
  MarkTouch,
} from "@/components/icons/Marks";

const meta: Meta = {
  title: "Courtyard/Marks",
};

export default meta;
type Story = StoryObj;

export const Set: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        gap: 24,
        fontSize: 40,
        color: "#7a5c8c",
      }}
    >
      <MarkMat />
      <MarkBelly />
      <MarkMind />
      <MarkTouch />
      <MarkCircle />
      <MarkRetreat />
    </div>
  ),
};
