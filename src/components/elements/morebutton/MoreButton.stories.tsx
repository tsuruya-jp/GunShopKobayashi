import type { Meta, StoryObj } from "@storybook/react";
import MoreButton from "./MoreButton";

const meta: Meta<typeof MoreButton> = {
  title: "MoreButton",
  component: MoreButton,
};

export default meta;
type Story = StoryObj<typeof MoreButton>;

export const Primary: Story = {
  args: {
    label: "primary",
  },
};

export const Secondary: Story = {
  args: {
    label: "secondary",
  },
};
