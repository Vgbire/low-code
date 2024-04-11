import React, { CSSProperties, FC, ReactNode } from 'react';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';

interface TipProps {
  /** 提示信息 */
  title?: ReactNode;
  /** icon图标 */
  icon?: ReactNode;
  style?: CSSProperties;
  className?: string;
}

export const Tip: FC<TipProps> = (props) => {
  const { title, icon = <QuestionCircleOutlined />, className, style } = props;

  return (
    <Tooltip title={title}>
      <span className={className} style={style}>
        {icon}
      </span>
    </Tooltip>
  );
};
