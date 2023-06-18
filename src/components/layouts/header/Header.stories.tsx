import type { Meta, StoryObj } from '@storybook/react';
import Header from './Header';

const meta: Meta<typeof Header> = {
  title: 'Header',
  component: Header,
  tags: ['autodocs'],
  parameters: {
    colorPicker: {
      primaryPalette: 'bgColor',
    }
  }
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Primary: Story = {
  args:{
    bgColor: "eee"
  }
}