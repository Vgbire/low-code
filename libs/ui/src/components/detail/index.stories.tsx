import type { Meta, StoryObj } from '@storybook/react';
import { Detail } from './index';

const meta = {
  title: 'UI/Detail',
  component: Detail,
  tags: ['autodocs'],
} satisfies Meta<typeof Detail>;

export default meta;
type Story = StoryObj<typeof Detail>;

export const Primary: Story = {
  args: {
    columns: [
      { label: '姓名', key: 'name', span: 12 },
      { label: '地址', key: 'address', span: 12 },
      {
        label: '电话',
        key: 'phone',
        render: (text, record) => `${record.code} ${text}`,
      },
    ],
    data: { name: 'Alex', phone: '123', code: '+86' },
    defaultValue: '---',
  },
};
