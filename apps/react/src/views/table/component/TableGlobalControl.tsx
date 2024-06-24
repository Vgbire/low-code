import React, { useEffect } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { Selection } from '@libs/ui';
import { Button, Checkbox, Form, Input, TablePaginationConfig } from 'antd';
import { GlobalControl } from 'src/component/GlobalControl';
import { AnyObject } from 'src/types';
import { shortUuid } from 'src/utils';

export interface TableAttribute {
  name: string;
  templateName?: string;
  exportName: string;
  extension: '.tsx' | '.jsx';
  attribute: {
    rowKey?: string;
    pagination?: TablePaginationConfig;
  };
}

interface TableGlobalControlProps {
  tableAttribute: TableAttribute;
  setTableAttribute: (columns: TableAttribute) => void;
  dataSource: AnyObject[];
  setDataSource: (dataSource: AnyObject[]) => void;
  hiddenGlobalControl?: boolean;
}

export const TableGlobalControl = (props: TableGlobalControlProps) => {
  const {
    tableAttribute,
    setTableAttribute,
    dataSource,
    setDataSource,
    hiddenGlobalControl,
  } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      ...tableAttribute,
      dataSource: dataSource.map((item) => {
        if (typeof item === 'string') {
          return item;
        } else {
          return JSON.stringify(item);
        }
        // .replace(
        //   /(['"])?([\w\u4e00-\u9fa5]+)(['"])?:\s*(['"])?([\w\u4e00-\u9fa5]+)(['"])?/g,
        //   '$2:"$5"'
        // )
      }),
    });
  }, [tableAttribute, dataSource]);

  return (
    <Form
      form={form}
      labelCol={{ span: 5 }}
      labelAlign="left"
      colon={false}
      onValuesChange={(values) => {
        if (values.dataSource) {
          const dataSource = form.getFieldValue('dataSource').map((item) => {
            try {
              const data = JSON.parse(item);
              if (!data.id) data.id = shortUuid();
              return data;
            } catch {
              return item;
            }
          });
          setDataSource(dataSource);
        } else {
          setTableAttribute(form.getFieldsValue(true));
        }
      }}
    >
      <Selection title="Table 配置">
        <Form.Item label="rowKey" name={['attribute', 'rowKey']}>
          <Input />
        </Form.Item>
        <Form.Item label="数据">
          <Form.List name="dataSource">
            {(subFields, subOpt) => (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  rowGap: 16,
                }}
              >
                {subFields.map((subField) => (
                  <div key={subField.key}>
                    <Form.Item
                      noStyle
                      name={[subField.name]}
                      rules={[
                        {
                          validator(rule, value) {
                            try {
                              JSON.parse(value);
                            } catch {
                              return Promise.reject(
                                new Error('对象书写格式有错！')
                              );
                            }
                          },
                        },
                      ]}
                    >
                      <Input.TextArea
                        rows={3}
                        placeholder="对象字符串"
                        style={{ width: '90%' }}
                      />
                    </Form.Item>
                    <CloseOutlined
                      style={{ marginLeft: 10 }}
                      onClick={() => {
                        subOpt.remove(subField.name);
                      }}
                    />
                  </div>
                ))}
                <Button
                  type="dashed"
                  onClick={() => {
                    subOpt.add({ id: shortUuid() });
                  }}
                  block
                >
                  + 添加
                </Button>
              </div>
            )}
          </Form.List>
        </Form.Item>
        <Form.Item
          label="分页"
          name={['attribute', 'pagination']}
          valuePropName="checked"
        >
          <Checkbox />
        </Form.Item>
      </Selection>

      {!hiddenGlobalControl && <GlobalControl />}
    </Form>
  );
};
