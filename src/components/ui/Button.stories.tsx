import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@/components/ui/Button";

const meta: Meta<typeof Button> = {
  title: "Pastel/Button",
  component: Button,
  args: { children: "הזמיני שיעור" },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const RosePrimary: Story = {
  args: { variant: "primary" },
};

export const Ghost: Story = {
  args: { variant: "ghost", children: "קראי עליי" },
};

export const OnInk: Story = {
  args: { variant: "white", children: "Begin" },
  parameters: { backgrounds: { default: "ink" } },
};
