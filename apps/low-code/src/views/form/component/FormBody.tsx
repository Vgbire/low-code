import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { FormInstance } from 'antd/es/form';
import { FormColumn } from '..';
import { PlusOutlined } from '@ant-design/icons';
import { CloseOutlined } from '@libs/icons';
import { Button, Col, Form, Row } from 'antd';
import { FormItem } from 'src/component/FormItem';
import { uuid } from 'src/utils';
import { FormAttribute } from 'src/views/form/component/FormGlobalControl';

export interface FormBodyProps {
  form: FormInstance;
  columns: FormColumn[];
  setColumns: (columns: FormColumn[]) => void;
  formAttribute: FormAttribute;
  setCurrentFormIndex: (index: number) => void;
}

const FormBody = (props: FormBodyProps) => {
  const { form, columns, setColumns, formAttribute, setCurrentFormIndex } =
    props;
  return (
    <>
      <DragDropContext
        onDragEnd={(result) => {
          const sourceIndex = result.source.index;
          const target = columns[sourceIndex];
          columns.splice(sourceIndex, 1);
          columns.splice(result.destination.index, 0, target);
          setColumns([...columns]);
        }}
      >
        <Droppable droppableId="formBodyDroppable">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              <Form
                form={form}
                className="my-form"
                labelCol={{ span: 3 }}
                {...formAttribute.attribute}
              >
                {columns.map((item, index) => (
                  <Draggable
                    key={item.key}
                    draggableId={item.key}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        className="hover-dashed-border form-hover-padding"
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentFormIndex(index);
                        }}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Row style={{ alignItems: 'baseline' }} gutter={10}>
                          <Col flex={1}>
                            <Form.Item
                              label={item.label}
                              name={item.name}
                              valuePropName={item.valuePropName}
                              rules={item.rules}
                            >
                              <FormItem
                                type={item.type}
                                options={item?.options}
                                valuePropName={item.valuePropName}
                              />
                            </Form.Item>
                          </Col>
                          <Col
                            flex="0 0 20px"
                            style={{ cursor: 'pointer' }}
                            onClick={(e) => {
                              e.stopPropagation();
                              columns.splice(index, 1);
                              setColumns([...columns]);
                              setCurrentFormIndex(columns.length - 1);
                            }}
                          >
                            <CloseOutlined />
                          </Col>
                        </Row>
                      </div>
                    )}
                  </Draggable>
                ))}
              </Form>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <Button
        type="dashed"
        onClick={() => {
          columns.push({
            label: '默认',
            name: 'default',
            type: 'input',
            options: [],
            key: uuid(),
          });
          setColumns([...columns]);
          setCurrentFormIndex(columns.length - 1);
        }}
        style={{ width: '100%', marginTop: 5 }}
        icon={<PlusOutlined />}
      >
        添加
      </Button>
    </>
  );
};

export default FormBody;
