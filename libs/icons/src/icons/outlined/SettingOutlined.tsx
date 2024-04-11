import React from 'react';
import BaseIcon from '../../components/base-icon';
import { ReactComponent as SVG } from '../../svg/outlined/setting.svg';

interface IProps {
  [key: string]: any;
}
export const SettingOutlined = (props: IProps) => {
  return (
    <BaseIcon {...props}>
      <SVG
        style={{
          height: '1em',
          width: '1em',
          fontSize: '1em',
          fill: 'currentcolor',
        }}
      />
    </BaseIcon>
  );
};
