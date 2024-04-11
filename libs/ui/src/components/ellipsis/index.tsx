import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { Tooltip } from 'antd';

interface EllipsisProps {
  /** 内容 */
  title?: ReactNode;
  [key: string]: any;
}

export const Ellipsis = (props: EllipsisProps) => {
  const { title, children, ...restProps } = props;
  // title和children可只需要定义一个
  const titleNode = title || children;
  const childrenNode = children || title;
  const containerRef = useRef<any>();
  const textRef = useRef<any>();
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);
  useEffect(() => {
    setDisabled(
      containerRef.current.clientWidth >= textRef.current.scrollWidth
    );
  }, []);
  return (
    <Tooltip title={titleNode} open={open} {...restProps}>
      <div ref={containerRef} style={{ display: 'grid' }}>
        <div
          ref={textRef}
          onMouseEnter={() => {
            setOpen(!disabled);
          }}
          onMouseLeave={() => {
            setOpen(false);
          }}
          style={{
            width: '100%',
          }}
          className="text-overflow"
        >
          {childrenNode}
        </div>
      </div>
    </Tooltip>
  );
};
