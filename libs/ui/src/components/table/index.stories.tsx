import type { Meta, StoryObj } from '@storybook/react';
import { Button } from 'antd';
import { Table } from './index';

const meta = {
  title: 'UI/Table',
  component: Table,
  tags: ['autodocs'],
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof Table>;

export const Primary: Story = {
  args: {
    columns: [
      { title: '姓名', dataIndex: 'name', search: { type: 'input' } },
      {
        title: '状态',
        dataIndex: 'status',
        search: {
          type: 'multi',
          options: [
            { value: '运行中', label: '运行中' },
            { value: '已停止', label: '已停止' },
            { value: '异常', label: '异常' },
          ],
        },
      },
      {
        title: '区域',
        dataIndex: 'region',
        search: {
          type: 'select',
          options: [
            { value: '北京', label: '北京' },
            { value: '上海', label: '上海' },
            { value: '广州', label: '广州' },
          ],
        },
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        search: {
          type: 'date',
        },
      },
    ],
    dataSource: [],
    createFetch: false,
    headerLeftNode: <Button>左边按钮</Button>,
    headerRightNode: <Button>右边按钮</Button>,
    tableName: 'tableName',
  },
};
