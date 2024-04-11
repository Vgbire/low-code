import type { Meta, StoryObj } from '@storybook/react';
import { Ellipsis } from './index';

const meta = {
  title: 'UI/Ellipsis',
  component: Ellipsis,
  tags: ['autodocs'],
} satisfies Meta<typeof Ellipsis>;

export default meta;
type Story = StoryObj<typeof Ellipsis>;

export const Primary: Story = {
  render: ({ text }) => (
    <div style={{ width: 150 }}>
      <Ellipsis title={text} />
    </div>
  ),
  args: {
    text: '测试文字测试文字测试文字',
  },
};
