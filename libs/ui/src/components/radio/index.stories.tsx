import type { Meta, StoryObj } from '@storybook/react';
import { Radio } from './index';

const meta = {
  title: 'UI/Radio',
  component: Radio,
  tags: ['autodocs'],
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof Radio>;

export const Primary: Story = {
  args: {
    value: '北京',
    options: [
      { value: '北京', label: '北京' },
      { value: '上海', label: '上海' },
      { value: '广州', label: '广州' },
    ],
    size: 'middle',
    labelInValue: false,
  },
};
