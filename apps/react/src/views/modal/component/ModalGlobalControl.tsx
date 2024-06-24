import React, { ReactNode, useEffect } from 'react';
import { Selection } from '@libs/ui';
import { Form, Input } from 'antd';
import { GlobalControl } from 'src/component/GlobalControl';
import { BodyFormItem } from 'src/views/component/component/BodyFormItem';
import { BodyType } from 'src/views/component/component/ComponentGlobalControl';

export interface ModalAttribute {
  name: string;
  templateName?: string;
  exportName: string;
  extension: '.tsx' | '.jsx';
  attribute: {
    title: ReactNode;
    width?: string | number;
  };
  body: BodyType[];
}

interface ModalGlobalControlProps {
  modalAttribute: ModalAttribute;
  setModalAttribute: (columns: ModalAttribute) => void;
}

export const ModalGlobalControl = (props: ModalGlobalControlProps) => {
  const { modalAttribute, setModalAttribute } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(modalAttribute);
  }, [modalAttribute]);

  return (
    <Form
      form={form}
      labelCol={{ span: 5 }}
      labelAlign="left"
      colon={false}
      onValuesChange={() => {
        setModalAttribute(form.getFieldsValue(true));
      }}
    >
      <Selection title="Modal 配置">
        <Form.Item label="标题" name={['attribute', 'title']}>
          <Input />
        </Form.Item>
        <Form.Item
          label="宽度"
          name={['attribute', 'width']}
          normalize={(value) => {
            if (Number(value)) {
              return Number(value);
            }
            return value;
          }}
        >
          <Input />
        </Form.Item>
        <BodyFormItem />
      </Selection>

      <GlobalControl />
    </Form>
  );
};
