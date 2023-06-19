import { Meta, StoryObj } from "@storybook/react";
import Content from "./Content";

const meta: Meta<typeof Content> = {
  title: 'Content',
  component: Content,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Content>;

export const Primary: Story = {
  args:{

  }
}