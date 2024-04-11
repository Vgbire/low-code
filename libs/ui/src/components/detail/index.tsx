import React, { ReactNode } from 'react';
import { AnyObject } from 'antd/es/_util/type';
import { Col, Row } from 'antd';
import './index.scss';

interface DetailProps {
  /** 字段配置 */
  columns: {
    label: ReactNode;
    key: string;
    span?: number;
    labelWidth?: number | string;
    render?: (text: any, record: AnyObject) => ReactNode;
  }[];
  /** 源数据 */
  data: AnyObject;
  /** 当没有render传入时，值为undefined或者null时显示的值 */
  defaultValue?: string;
  [key: string]: any;
}

export const Detail = (props: DetailProps) => {
  const { columns, data, defaultValue, ...res } = props;
  return (
    <Row {...res}>
      {columns.map((item) => (
        <Col span={item.span} key={item.key}>
          {
            <div style={{ lineHeight: '32px' }}>
              <span
                className="detail-label"
                style={{
                  width: item.labelWidth || '100px',
                  display: 'inline-block',
                }}
              >
                {item.label}
              </span>
              <span className="detail-value">
                {item.render
                  ? item.render(data?.[item.key], data)
                  : data?.[item.key] ?? defaultValue}
              </span>
            </div>
          }
        </Col>
      ))}
    </Row>
  );
};

Detail.defaultProps = {
  defaultValue: '--',
};
