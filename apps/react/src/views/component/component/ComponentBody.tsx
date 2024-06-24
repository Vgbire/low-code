import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { ColumnType } from 'antd/lib/table';
import FormBody, { FormBodyProps } from 'src/views/form/component/FormBody';
import TableBody, { TableBodyProps } from 'src/views/table/component/TableBody';
import { BodyType } from './ComponentGlobalControl';

interface ComponentBodyProps extends FormBodyProps, TableBodyProps {
  formBodyRef: any;
  tableBodyRef: any;
  body: BodyType[];
  setBody: (body: BodyType[]) => void;
  setCurrentColumn: (currentColumn?: ColumnType<any>) => void;
}
export const ComponentBody = (props: ComponentBodyProps) => {
  const {
    formBodyRef,
    tableBodyRef,
    body,
    setBody,
    form,
    columns,
    setColumns,
    formAttribute,
    setCurrentFormIndex,
    tableColumns,
    setTableColumns,
    dataSource,
    tableDemoColumns,
    addTableColumns,
    tableAttribute,
    setCurrentColumn,
  } = props;

  return (
    <DragDropContext
      onDragEnd={(result) => {
        const sourceIndex = result.source.index;
        const target = body[sourceIndex];
        body.splice(sourceIndex, 1);
        body.splice(result.destination.index, 0, target);
        setBody(body);
      }}
    >
      <Droppable droppableId="componentBodyDroppable">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {body.map((item, index) => (
              <Draggable key={item.key} draggableId={item.key} index={index}>
                {(provided) => (
                  <div
                    className="hover-dashed-border component-hover-padding"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    {item.type === 'string' && (
                      <div
                        key={index}
                        dangerouslySetInnerHTML={{ __html: item.content }}
                      />
                    )}
                    {item.type === 'form' && (
                      <div
                        key={index}
                        ref={formBodyRef}
                        onClick={() => {
                          setCurrentFormIndex(-1);
                        }}
                        style={{ padding: 15 }}
                      >
                        <FormBody
                          form={form}
                          columns={columns}
                          setColumns={setColumns}
                          formAttribute={formAttribute}
                          setCurrentFormIndex={setCurrentFormIndex}
                        />
                      </div>
                    )}
                    {item.type === 'table' && (
                      <div
                        key={index}
                        ref={tableBodyRef}
                        onClick={() => {
                          setCurrentColumn(undefined);
                        }}
                        style={{ padding: 15 }}
                      >
                        <TableBody
                          tableColumns={tableColumns}
                          setTableColumns={setTableColumns}
                          dataSource={dataSource}
                          tableDemoColumns={tableDemoColumns}
                          addTableColumns={addTableColumns}
                          tableAttribute={tableAttribute}
                        />
                      </div>
                    )}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
