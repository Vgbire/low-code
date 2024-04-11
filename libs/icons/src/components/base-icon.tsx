import React, { PropsWithChildren } from 'react';

interface IProps {
  className?: string;
  [key: string]: any;
}
const BaseIcon = (props: PropsWithChildren<IProps>) => {
  const { className, children, ...rest } = props;
  return (
    <span className={`cmp-icon ${className || ''}`} {...rest}>
      {children}
    </span>
  );
};

export default BaseIcon;
