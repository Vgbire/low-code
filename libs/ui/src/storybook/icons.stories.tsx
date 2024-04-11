import {
  ClockOutlined,
  CloseOutlined,
  FilterOutlined,
  NetworkOutlined,
  RefreshOutlined,
  SearchOutlined,
  SettingOutlined,
  DownloadOutlined,
  ResourceManagementOutlined,
  IpOutlined,
  CollapseFilled,
  ExpandFilled,
  WaitingFilled,
  ErrorFilled,
  InfoFilled,
  SuccessFilled,
} from '@libs/icons';
import type { Meta, StoryObj } from '@storybook/react';
import { Col, Row } from 'antd';
import { Selection } from '../components/selection';

const meta = {
  title: 'Icons/Example',
  component: WaitingFilled,
  tags: ['autodocs'],
  argTypes: {
    style: {
      description: '可以通过设置style的color,fontsize改变图标颜色和大小',
    },
  },
} satisfies Meta<typeof WaitingFilled>;

export default meta;
type Story = StoryObj<typeof WaitingFilled>;

export const Primary: Story = {
  render: ({ style }) => {
    return (
      <>
        <Selection title="边框">
          <Row>
            {[
              ClockOutlined,
              CloseOutlined,
              FilterOutlined,
              NetworkOutlined,
              RefreshOutlined,
              SearchOutlined,
              SettingOutlined,
              DownloadOutlined,
              ResourceManagementOutlined,
              IpOutlined,
            ].map((Item, index) => {
              return (
                <Col span={4} style={{ marginTop: index > 5 ? 40 : 0 }}>
                  <Item style={style} />
                </Col>
              );
            })}
          </Row>
        </Selection>
        <Selection title="实底">
          <Row>
            {[
              CollapseFilled,
              ExpandFilled,
              WaitingFilled,
              ErrorFilled,
              InfoFilled,
              SuccessFilled,
            ].map((Item, index) => {
              return (
                <Col span={4} style={{ marginTop: index > 5 ? 40 : 0 }}>
                  <Item style={style} />
                </Col>
              );
            })}
          </Row>
        </Selection>
      </>
    );
  },
  args: {
    style: { fontSize: 50, color: '#000' },
  },
};
