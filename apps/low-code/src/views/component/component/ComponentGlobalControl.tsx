import React, { ReactNode, useEffect } from 'react';
import { Selection } from '@libs/ui';
import { Form } from 'antd';
import { GlobalControl } from 'src/component/GlobalControl';
import { BodyFormItem } from './BodyFormItem';

export type BodyType = {
  type: 'string' | 'form' | 'table';
  content: string;
  key: string;
};

export interface ComponentAttribute {
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

interface GlobalControlProps {
  componentAttribute: ComponentAttribute;
  setComponentAttribute: (columns: ComponentAttribute) => void;
}

export const ComponentGlobalControl = (props: GlobalControlProps) => {
  const { componentAttribute, setComponentAttribute } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(componentAttribute);
  }, [componentAttribute]);

  return (
    <Form
      form={form}
      labelCol={{ span: 5 }}
      labelAlign="left"
      colon={false}
      onValuesChange={() => {
        setComponentAttribute(form.getFieldsValue(true));
      }}
    >
      <Selection title="Component 配置">
        <BodyFormItem />
      </Selection>

      <GlobalControl />
    </Form>
  );
};
