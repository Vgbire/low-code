import React, { ReactNode } from 'react';
import './index.scss';

export interface SelectionProps {
  /** 标题 */
  title: ReactNode;
  /** 右上角自定义React节点 */
  extra?: ReactNode;
  /** 内容区域 */
  children?: ReactNode;
}

export const Selection = (props: SelectionProps) => {
  const { children, title, extra } = props;
  return (
    <>
      <div className="selection-box">
        <span className="selection-icon"></span>
        <span className="selection-title">{title}</span>
        <div style={{ position: 'absolute', right: 0 }}>{extra}</div>
      </div>
      <div style={{ padding: '10px' }}>{children}</div>
    </>
  );
};
