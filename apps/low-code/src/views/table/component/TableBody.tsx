import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { IColumnType } from '..';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Table } from 'antd';
import { AnyObject } from 'src/types';
import { TableAttribute } from './TableGlobalControl';

export interface TableBodyProps {
  tableColumns: IColumnType[];
  setTableColumns: (tableColumns: IColumnType[]) => void;
  dataSource: AnyObject[];
  tableDemoColumns: IColumnType[];
  addTableColumns: () => void;
  tableAttribute: TableAttribute;
}

const TableBody = (props: TableBodyProps) => {
  const {
    tableColumns,
    setTableColumns,
    dataSource,
    tableDemoColumns,
    addTableColumns,
    tableAttribute,
  } = props;
  return (
    <DragDropContext
      onDragEnd={(result) => {
        const sourceIndex = result.source.index;
        const destinationIndex = result.destination.index;
        const target = tableColumns[sourceIndex];
        tableColumns.splice(sourceIndex, 1);
        tableColumns.splice(destinationIndex, 0, target);
        setTableColumns([...tableColumns]);
      }}
    >
      <Droppable
        droppableId="droppable"
        direction="horizontal"
        isCombineEnabled
      >
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            <Table
              scroll={{ x: '100%' }}
              dataSource={dataSource}
              columns={tableDemoColumns}
              footer={() => (
                <Button
                  type="dashed"
                  onClick={addTableColumns}
                  style={{ width: '100%', marginTop: 5 }}
                  icon={<PlusOutlined />}
                >
                  添加字段
                </Button>
              )}
              {...tableAttribute.attribute}
              rowKey="id"
            />
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TableBody;
