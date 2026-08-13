import type { Meta, StoryObj } from "@storybook/react";
import { Pill } from "@/components/ui/Pill";
import { MarkMat } from "@/components/icons/Marks";

const meta: Meta<typeof Pill> = {
  title: "Courtyard/Pill",
  component: Pill,
};

export default meta;
type Story = StoryObj<typeof Pill>;

export const Vine: Story = {
  args: {
    children: (
      <>
        <MarkMat />
        יוגה לאחר לידה
      </>
    ),
  },
  parameters: { backgrounds: { default: "shade" } },
};

export const Leaf: Story = {
  args: {
    sage: true,
    children: (
      <>
        <MarkMat />
        NLP
      </>
    ),
  },
  parameters: { backgrounds: { default: "shade" } },
};
