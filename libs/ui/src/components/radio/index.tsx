import React, { FC } from 'react';
import './index.scss';

type RadioValue = number | string;
type Option = { value: RadioValue; label: string | number; [key: string]: any };
export interface RadioProps {
  /** 选中的值 */
  value?: RadioValue | Option;
  /** 选择时的回调 */
  onChange?: (value: RadioValue | Option) => void;
  /** 尺寸，默认为middle */
  size?: 'middle' | 'small';
  /** 是否把label包装袋value里 */
  labelInValue?: boolean;
  /** 选项 */
  options: Option[];
  /** 是否禁用 */
  disabled?: boolean;
}

export const Radio: FC<RadioProps> = (props) => {
  const { value, onChange, size, labelInValue, options, disabled } = props;
  return options?.map((item) => {
    return (
      <div
        key={item.value}
        className={`radio-item radio-size-${
          size === 'middle' ? 'middle' : 'small'
        } ${
          (labelInValue ? (value as Option).value : value) === item.value
            ? 'radio-selected'
            : ''
        } ${disabled ? 'radio-disabled' : ''}`}
        onClick={() => {
          !disabled && onChange?.(labelInValue ? item : item.value);
        }}
      >
        {item.label}
      </div>
    );
  });
};

Radio.defaultProps = {
  size: 'middle',
  labelInValue: false,
};
