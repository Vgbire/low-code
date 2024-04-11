import React, { CSSProperties, ReactNode, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  ColumnType as AntdColumnType,
  SorterResult,
} from 'antd/es/table/interface';
import { DownloadOutlined, RefreshOutlined } from '@libs/icons';
import { useUpdateEffect } from 'ahooks';
import {
  Table as AntdTable,
  Button,
  PaginationProps,
  TableProps as AntdTableProps,
} from 'antd';
import { AnyObject } from 'src/types';
import ColumnSetting from './components/column-setting';
import { TableContext } from './context';
import useTable, { TableFetchConfig, TableInstance } from './hook/use-table';
import './index.scss';
import Search from './search';
import { IListItem } from '../../types/index';

export interface ColumnSearchProp {
  type?: 'input' | 'select' | 'multi' | 'date';
  // 搜索的title
  title?: any;
  // 搜索的字段名
  dataIndex?: any;
  options?: IListItem[];
  // 选中的值
  value?: any;
  // 标签展示的值
  label?: any;
  // 是否只展示在搜索
  onlySearch?: boolean;
  // 异步加载选项的loading
  loading?: boolean;
}

export interface onFetchParams {
  page?: number;
  pageSize?: number;
  filterData?: AnyObject;
  extraFilter: AnyObject;
  sorter?: SorterResult<AnyObject>;
}

export interface ColumnType extends AntdColumnType<AnyObject> {
  // 是否在表格显示当前字段
  showColumn?: boolean;
  search?: ColumnSearchProp;
}

export interface TableProps extends AntdTableProps<AnyObject> {
  /** 经过Table.useTable()创建的实例，该实例有两个方法，fetchData用来获取数据，setFilterData用来设置筛选参数 */
  table?: TableInstance;
  /** 是否在组件初始化之后，立即请求数据，需要传入onFetch函数 */
  createFetch?: boolean;
  /** 表格数据 */
  dataSource?: AnyObject[];
  /** showColumn: 表格列的显隐，可以在设置里面控制，true为默认显示，不设置此字段，则一直显示，且无法在设置里控制显隐。
   * search筛选项的配置，不设置则此字段仅为表格展示字段。当没有任何一个字段有search字段时，则不会展示搜索框。
   * type: 搜索类型有input(文本),select(单选),multi(多选),data(时间)。
   * title是筛选项的左侧的文本，dataIndex是筛选项的字段名。
   * options是下拉选项。
   * onlySearch表示仅作为筛选项，不在表格里展示。
   * loading下拉列表的loading。
   */
  columns: ColumnType[];
  /** 当同一个页面存在多个表格时，用于控制列的显隐存入localStorage的key */
  tableName?: string;
  /** 组件左上角自定义React节点 */
  headerLeftNode?: ReactNode;
  /** 组件右上角自定义React节点 */
  headerRightNode?: ReactNode;
  /** 获取列表数据的函数，会在页码，页大小，筛选项，排序发生变化时自动调用,必须返回Promise，组件还需要对返回Promise再处理，返回的数据数据必须为 { list: '数据列表', total: '数据总数' } */
  onFetch?: (params: onFetchParams) => Promise<any>;
  /** 导出函数，传入导出函数后，右边显示导出按钮，点击按钮执行导出函数，必须返回Promise，组件还需要对返回Promise再处理 */
  onExport?: (params: {
    page?: number;
    pageSize?: number;
    filterData?: AnyObject;
    sorter?: SorterResult<AnyObject>;
  }) => Promise<any>;
  /** 分页设置 */
  pagination?: PaginationProps | false;
  /** 是否隐藏刷新按钮 */
  hiddenRefreshBtn?: boolean;
  /** 容器样式 */
  containerStyle?: CSSProperties;
  /** 容器class */
  containerClassName?: string;
  [key: string]: any;
}

export const Table = (props: TableProps) => {
  const {
    table,
    createFetch,
    columns,
    dataSource,
    tableName,
    headerLeftNode,
    headerRightNode,
    onFetch,
    onExport,
    pagination,
    hiddenRefreshBtn,
    containerStyle,
    containerClassName,
    ...otherTableProps
  } = props;

  // ----- start 接口数据获取线管 start -------
  const [filterData, setFilterData] = useState<AnyObject>({});
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [sorter, setSorter] = useState<SorterResult<AnyObject>>();
  const [innerDataSource, setInnerDataSource] = useState<AnyObject[]>([]);
  const [innerPagination, setInnerPagination] = useState<
    PaginationProps | false
  >();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setInnerPagination(
      typeof pagination === 'boolean'
        ? pagination
        : {
            current: page,
            pageSize,
            total,
            showSizeChanger: true,
            showTotal: (total: number | string) => `共有 ${total || 0} 条记录`,
            onChange: (page: number, pageSize: number) => {
              setPage(page);
              setPageSize(pageSize);
            },
            ...pagination,
          }
    );
  }, [total, page, pageSize]);
  const fetchData = (tableFetchConfig?: TableFetchConfig) => {
    const { disableLoading = false, extraFilter = {} } = tableFetchConfig || {};
    // 是否需要tableLoading
    setLoading(!disableLoading);
    onFetch?.({ page, pageSize, filterData, sorter, extraFilter })
      ?.then((res) => {
        setTotal(res.total);
        setInnerDataSource(res.list);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    if (createFetch) {
      fetchData();
    }
  }, []);

  const [tableInstance] = useTable(table);
  const { setCallbacks } = tableInstance.getInternalHooks();
  setCallbacks({ fetchData, setFilterData });

  useUpdateEffect(() => {
    if (page !== 1) {
      setPage(1);
    } else {
      fetchData();
    }
  }, [filterData]);
  useUpdateEffect(() => {
    fetchData();
  }, [page, pageSize, sorter]);
  // ----- end 接口数据获取线管 end -------

  const location = useLocation();
  const [localStorageKey, setLocalStorageKey] = useState('');
  useEffect(() => {
    setLocalStorageKey(location.pathname + (tableName || ''));
  }, [location, tableName]);

  const [searchColumns, setSearchColumns] = useState<ColumnSearchProp[]>([]);
  // 所有表格字段，包换隐藏显示的字段
  const [allTableColumns, setAllTableColumns] = useState<ColumnType[]>([]);
  useEffect(() => {
    setSearchColumns(
      columns
        .filter((item) => item.search)
        .map((item) => {
          const { search, ...rest } = item;
          return { ...rest, ...search };
        })
    );
    let showColumnKeys = localStorage.getItem(localStorageKey);
    if (showColumnKeys) {
      showColumnKeys = JSON.parse(showColumnKeys);
    }
    setAllTableColumns(
      columns.reduce((all: ColumnType[], item) => {
        if (!item.search?.onlySearch) {
          if (typeof item.showColumn === 'boolean' && showColumnKeys) {
            item.showColumn = showColumnKeys.includes(item.dataIndex as string);
          }
          all.push(item);
        }
        return all;
      }, [])
    );
  }, [columns, localStorageKey]);

  // 表格显示的字段，去掉隐藏的表格字段
  const [tableColumns, setTableColumns] = useState<ColumnType[]>([]);
  useEffect(() => {
    setTableColumns(
      allTableColumns.filter((item) => item.showColumn !== false)
    );
  }, [allTableColumns]);

  const [exportLoading, setExportLoading] = useState(false);
  return (
    <div className={containerClassName} style={containerStyle}>
      <TableContext.Provider value={{ fetchData }}>
        <div className="table-header">
          <div className="table-left-header">{headerLeftNode}</div>
          <div className="table-right-header">
            {headerRightNode}
            {onExport && (
              <Button
                icon={<DownloadOutlined />}
                loading={exportLoading}
                onClick={() => {
                  setExportLoading(true);
                  onExport?.({ page, pageSize, filterData }).finally(() => {
                    setExportLoading(false);
                  });
                }}
              />
            )}
            <ColumnSetting
              localStorageKey={localStorageKey}
              tableColumns={allTableColumns}
              setTableColumns={setAllTableColumns}
            />
            {!hiddenRefreshBtn && (
              <Button
                style={{ height: 30, marginLeft: 10 }}
                icon={<RefreshOutlined />}
                onClick={() => fetchData?.()}
              />
            )}
          </div>
        </div>
        <Search
          columns={searchColumns}
          filterData={filterData}
          setFilterData={setFilterData}
        />
        <AntdTable
          size="small"
          loading={loading}
          columns={tableColumns}
          dataSource={dataSource || innerDataSource}
          pagination={innerPagination}
          onChange={(pagination, filters, sorter: AnyObject) => {
            setSorter(sorter);
          }}
          {...otherTableProps}
        />
      </TableContext.Provider>
    </div>
  );
};

Table.defaultProps = {
  createFetch: false,
};

Table.useTable = useTable;
