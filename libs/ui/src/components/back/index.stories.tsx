import type { Meta, StoryObj } from '@storybook/react';
import { Back } from './index';

const meta = {
  title: 'UI/Back',
  component: Back,
  tags: ['autodocs'],
} satisfies Meta<typeof Back>;

export default meta;
type Story = StoryObj<typeof Back>;

export const Primary: Story = {
  args: {
    title: '标题',
    returnUrl: 'www.baidu.com',
    marginBottom: 30,
  },
};
