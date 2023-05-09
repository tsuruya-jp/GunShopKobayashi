import type { Meta, StoryObj } from '@storybook/react';
import {ButtonTest} from "./ButtonTest";

const meta: Meta<typeof ButtonTest> = {
  title: 'ButtonTest',
  component: ButtonTest,
};

export default meta;
type Story = StoryObj<typeof ButtonTest>;

export const Primary: Story = {
  args:{
    label: "primary"
  }
}

export const Secondary: Story = {
  args:{
    label: "secondary"
  }
};