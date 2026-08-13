import type { Meta, StoryObj } from "@storybook/react";
import { CourtyardLattice } from "@/components/backgrounds/CourtyardLattice";

const meta: Meta<typeof CourtyardLattice> = {
  title: "Courtyard/Lattice",
  component: CourtyardLattice,
};

export default meta;
type Story = StoryObj<typeof CourtyardLattice>;

export const NoonSun: Story = {
  args: { tone: "sun" },
  render: (args) => (
    <div style={{ position: "relative", width: 480, height: 320, background: "#e2d6d4" }}>
      <CourtyardLattice {...args} />
    </div>
  ),
};

export const PergolaShade: Story = {
  args: { tone: "shade" },
  render: (args) => (
    <div style={{ position: "relative", width: 480, height: 320, background: "#2a1e24" }}>
      <CourtyardLattice {...args} />
    </div>
  ),
};
