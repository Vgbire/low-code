import React, { useEffect, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { ColumnType } from 'antd/lib/table';
import { AnyObject } from 'src/types';
import { shortUuid } from 'src/utils';
import { TableAttribute } from '../component/TableGlobalControl';

// 在modal模板需要用到Table，复用代码封装了Table Hook
export const useTableHook = () => {
  // 当前选中的表单项索引
  const [currentColumn, setCurrentColumn] = useState<ColumnType<any>>();

  // 表单项列表
  const [tableColumns, setTableColumns] = useState<ColumnType<any>[]>([
    {
      dataIndex: 'name',
      title: '名称',
    },
    {
      dataIndex: 'status',
      title: '状态',
    },
    {
      dataIndex: 'createTime',
      title: '发送时间',
    },
  ]);

  const onHeaderCell = (column: ColumnType<any>) => {
    return {
      onClick: (e) => {
        e.stopPropagation();
        setCurrentColumn(
          tableColumns.find((item) => item.dataIndex === column.dataIndex)
        );
      },
    };
  };

  const [dataSource, setDataSource] = useState<AnyObject[]>([
    {
      name: '张三',
      status: '运行中',
      createTime: new Date().valueOf(),
      id: shortUuid(),
    },
  ]);

  // 展示的columns，表头支持可拖拽
  const [tableDemoColumns, setTableDemoColumns] = useState<
    ColumnType<AnyObject>[]
  >([]);
  useEffect(() => {
    setTableDemoColumns(
      tableColumns.map((column: any, index) => {
        return {
          ...column,
          onHeaderCell,
          title: (
            <Draggable draggableId={column.dataIndex} index={index}>
              {(provided) => (
                <span
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  {column.title}
                </span>
              )}
            </Draggable>
          ),
        };
      })
    );
  }, [tableColumns]);

  // 全局配置属性
  const [tableAttribute, setTableAttribute] = useState<TableAttribute>({
    name: 'TableComponent',
    exportName: 'TableComponent',
    extension: '.tsx',
    attribute: {},
  });

  // 添加字段
  const addTableColumns = () => {
    const index = tableColumns.findIndex(
      (item) => item.dataIndex === currentColumn?.dataIndex
    );
    const column = {
      title: '默认',
      dataIndex: 'default' + shortUuid(),
    };
    tableColumns.splice(
      index === -1 ? tableColumns.length : index + 1,
      0,
      column
    );
    setTableColumns([...tableColumns]);
    setCurrentColumn(column);
  };

  return {
    tableColumns,
    setTableColumns,
    dataSource,
    setDataSource,
    currentColumn,
    setCurrentColumn,
    tableAttribute,
    setTableAttribute,
    tableDemoColumns,
    addTableColumns,
  };
};
