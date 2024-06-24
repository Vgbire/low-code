import React from 'react';
import { Checkbox, Input, Radio, Select, Switch } from 'antd';

export type FormItemType =
  | 'input'
  | 'select'
  | 'radio'
  | 'checkbox'
  | 'switch'
  | 'textArea';

interface IProps {
  type?: FormItemType;
  options?: { label: React.ReactNode; value: string | number }[];
  // 如果表单设置了valuePropName。radio和checkbox都只能有一个选项，切换改变boolean值
  valuePropName?: string;
}

export const FormItem = (props: IProps) => {
  const { type = 'default', options, valuePropName, ...rest } = props;
  const inputComponent = <Input {...rest} />;
  const radioComponent = valuePropName ? (
    <Radio {...rest} />
  ) : (
    <Radio.Group options={options} {...rest} />
  );
  const checkboxComponent = valuePropName ? (
    <Checkbox {...rest} />
  ) : (
    <Checkbox.Group options={options} {...rest} />
  );
  const map = {
    input: inputComponent,
    select: <Select options={options} {...rest} />,
    radio: radioComponent,
    checkbox: checkboxComponent,
    switch: <Switch {...rest} />,
    textArea: <Input.TextArea />,
    default: inputComponent,
  };
  return map[type];
};
