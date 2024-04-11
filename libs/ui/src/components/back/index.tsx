import React, { PropsWithChildren, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import './index.scss';

interface BackProps {
  /** 标题 */
  title: ReactNode;
  /** 指定返回的路径，如果不指定，则默认调用history.back方法 */
  returnUrl?: string;
  /** 同margin-bottom */
  marginBottom?: string | number;
}

export const Back = (props: PropsWithChildren<BackProps>) => {
  const { children, title, returnUrl, marginBottom } = props;
  const navigate = useNavigate();

  return (
    <>
      <div
        style={{ cursor: 'pointer', marginBottom: marginBottom }}
        onClick={() => {
          returnUrl ? navigate(returnUrl) : window.history.back();
        }}
      >
        <ArrowLeftOutlined style={{ fontSize: '20px', color: '#005dcc' }} />
        <span className="back-title-font" style={{ marginLeft: '10px' }}>
          {title}
        </span>
      </div>
      {children}
    </>
  );
};

Back.defaultProps = {
  marginBottom: 15,
};
