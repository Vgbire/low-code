import { ExclamationCircleOutlined } from '@ant-design/icons';
import type { Meta, StoryObj } from '@storybook/react';
import { Tip } from './index';

const meta = {
  title: 'UI/Tip',
  component: Tip,
  tags: ['autodocs'],
} satisfies Meta<typeof Tip>;

export default meta;
type Story = StoryObj<typeof Tip>;

export const Primary: Story = {
  render: ({ title, icon }) => (
    <div style={{ width: 150 }}>
      <Tip title={title} icon={icon} />
    </div>
  ),
  args: {
    title: '测试文字测试文字测试文字',
    icon: <ExclamationCircleOutlined />,
  },
};
