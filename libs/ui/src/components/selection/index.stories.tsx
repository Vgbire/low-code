import type { Meta, StoryObj } from '@storybook/react';
import { Button } from 'antd';
import { Selection } from './index';

const meta = {
  title: 'UI/Selection',
  component: Selection,
  tags: ['autodocs'],
} satisfies Meta<typeof Selection>;

export default meta;
type Story = StoryObj<typeof Selection>;

export const Primary: Story = {
  args: {
    title: '标题',
    extra: <Button>按钮</Button>,
    children: <div>内容</div>,
  },
};
