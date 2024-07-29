import { prettierCode } from 'src/utils';
import {
  generateBody,
  getBodyFormName,
  getBodyTableColumnsDataSource,
} from 'src/views/component/utils/template';
import { TemplateFormAttribute } from 'src/views/form/utils/template';
import { TemplateTableAttribute } from 'src/views/table/utils/template';
import { ModalAttribute } from '../component/ModalGlobalControl';

export const getModalTemplate = (
  modalAttribute: ModalAttribute,
  formAttribute: TemplateFormAttribute,
  tableAttribute: TemplateTableAttribute
) => {
  const { name, attribute, body } = modalAttribute;

  const modalAttributeString = Object.keys(attribute).reduce(
    (cur: string, item: string) => {
      const value = attribute[item];
      if (item === 'width' && Number(value)) {
        return `${cur} ${item}={${value}}`;
      }
      return `${cur} ${item}="${value}"`;
    },
    ''
  );
  return prettierCode(`import React, { forwardRef, useImperativeHandle, useState } from 'react';
  import { Modal, Form, Checkbox, Input, Radio, Select, Switch, message } from 'antd';

  interface ${name}Props {}

  export const ${name} = forwardRef((props: ${name}Props, ref: any) => {
  	const [open, setOpen] = useState(false);
    ${getBodyFormName(body, formAttribute)}
    ${getBodyTableColumnsDataSource(body, tableAttribute)}
    
  	useImperativeHandle(ref, () => ({
  		open() {
  			setOpen(true);
  		},
  	}));

  	const [submitLoading, setSubmitLoading] = useState(false);
    const handleOk = () => {
      // 判断form是否存在
      form
        ?.validateFields()
        .then((values) => {
          console.log(values)
          message.success('操作成功！');
          cancel();
        })
        .finally(() => {
          setSubmitLoading(false);
        });
    };
  	const cancel = () => {
  		setOpen(false);
  	};
    
  	return (
  		<Modal
  			open={open}
  			onOk={handleOk}
  			onCancel={cancel}
        okButtonProps={{ loading: submitLoading }}
        ${modalAttributeString}>
        ${generateBody(body, formAttribute, tableAttribute)}
  		</Modal>
  	);
  });`);
};
